import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Web3 from "web3";
import PatientRegistration from "../build/contracts/PatientRegistration.json";
import { useNavigate } from "react-router-dom";
import NavBar from "./NavBar";

const PatientRegistry = () => {
  const [formData, setFormData] = useState({
    walletAddress: "",
    name: "",
    dateOfBirth: "",
    gender: "",
    bloodGroup: "",
    homeAddress: "",
    hhNumber: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [web3, setWeb3] = useState(null);
  const [contract, setContract] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const init = async () => {
      if (window.ethereum) {
        const web3Instance = new Web3(window.ethereum);
        try {
          await window.ethereum.enable();
          setWeb3(web3Instance);

          const networkId = await web3Instance.eth.net.getId();
          const deployedNetwork = PatientRegistration.networks[networkId];
          const contractInstance = new web3Instance.eth.Contract(
            PatientRegistration.abi,
            deployedNetwork && deployedNetwork.address
          );

          setContract(contractInstance);
        } catch (error) {
          console.error("User denied access to accounts.");
        }
      } else {
        console.log("Please install MetaMask extension");
      }
    };

    init();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Clear specific error when user starts typing
    if (errors[name]) {
      const newErrors = {...errors};
      delete newErrors[name];
      setErrors(newErrors);
    }
  };

  const validateForm = () => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const hhNumberRegex = /^\d{6}$/;

    // Validate each field
    Object.entries(formData).forEach(([key, value]) => {
      if (!value) {
        newErrors[key] = `${key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())} is required`;
      }
    });

    // Specific validations
    if (formData.email && !emailRegex.test(formData.email)) {
      newErrors.email = "Invalid email address";
    }

    if (formData.hhNumber && !hhNumberRegex.test(formData.hhNumber)) {
      newErrors.hhNumber = "HH Number must be 6 digits";
    }

    if (formData.password && formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleRegister = async () => {
    if (!validateForm()) return;

    setIsLoading(true);
    try {
      const isRegPatient = await contract.methods.isRegisteredPatient(formData.hhNumber).call();
      if (isRegPatient) {
        setErrors(prev => ({
          ...prev,
          hhNumber: "Patient already registered"
        }));
        setIsLoading(false);
        return;
      }

      await contract.methods.registerPatient(
        formData.walletAddress, 
        formData.name, 
        formData.dateOfBirth, 
        formData.gender, 
        formData.bloodGroup, 
        formData.homeAddress, 
        formData.email, 
        formData.hhNumber, 
        formData.password
      ).send({ from: formData.walletAddress });

      alert("Patient registered successfully!");
      navigate("/");
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred while registering the patient.");
    } finally {
      setIsLoading(false);
    }
  };

  const cancelOperation = () => {
    navigate("/");
  };

  const formFields = [
    { name: "walletAddress", label: "Wallet Public Address", type: "text", placeholder: "Crypto Wallet's Public Address" },
    { name: "name", label: "Full Name", type: "text", placeholder: "Enter Full Name" },
    { name: "dateOfBirth", label: "Date of Birth", type: "date" },
    { 
      name: "gender", 
      label: "Gender", 
      type: "select", 
      options: ["", "Male", "Female", "Other"] 
    },
    { 
      name: "bloodGroup", 
      label: "Blood Group", 
      type: "select", 
      options: ["", "A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"] 
    },
    { name: "homeAddress", label: "Home Address", type: "text", placeholder: "Enter your Permanent Address" },
    { name: "hhNumber", label: "HH Number", type: "text", placeholder: "Enter your HH Number" },
    { name: "email", label: "Email Address", type: "email", placeholder: "Enter your Email-id" },
    { name: "password", label: "Password", type: "password", placeholder: "Enter your Password" },
    { name: "confirmPassword", label: "Confirm Password", type: "password", placeholder: "Confirm your Password" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900">
      <NavBar />
      
      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="container mx-auto px-4 py-16"
      >
        <motion.h1 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-4xl font-extrabold mb-8 text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600"
        >
          Patient Registration
        </motion.h1>

        <motion.form 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="max-w-4xl mx-auto bg-gray-800/50 p-8 rounded-2xl shadow-2xl backdrop-blur-sm grid grid-cols-1 sm:grid-cols-2 gap-6"
        >
          {formFields.map((field, index) => (
            <motion.div
              key={field.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="flex flex-col"
            >
              <label className="text-gray-300 mb-2">{field.label}</label>
              {field.type === "select" ? (
                <select
                  name={field.name}
                  value={formData[field.name]}
                 onChange={handleChange}
                  className={`p-3 rounded-lg bg-gray-700 text-white border border-gray-600 hover:bg-gray-800 transition duration-200 ${errors[field.name] ? 'border-red-500' : ''}`}
                >
                  {field.options.map((option, idx) => (
                    <option key={idx} value={option}>{option}</option>
                  ))}
                </select>
              ) : (
                <input
                  type={field.type}
                  name={field.name}
                  placeholder={field.placeholder}
                  value={formData[field.name]}
                  onChange={handleChange}
                  className={`p-3 rounded-lg bg-gray-700 text-white border border-gray-600 hover:bg-gray-800 transition duration-200 ${errors[field.name] ? 'border-red-500' : ''}`}
                />
              )}
              {errors[field.name] && (
                <p className="text-red-500 text-sm mt-1">{errors[field.name]}</p>
              )}
            </motion.div>
          ))}

          <div className="flex justify-center space-x-4 md:col-span-2 mt-6">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="button"
              onClick={handleRegister}
              disabled={isLoading || !contract}
              className="px-5 py-2.5 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold rounded-lg transition-all duration-300 ease-in-out hover:shadow-lg disabled:opacity-50"
            >
              {isLoading ? 'Registering...' : 'Register'}
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="button"
              onClick={cancelOperation}
              className="px-5 py-2.5 bg-gray-700 text-white font-bold rounded-lg transition-all duration-300 ease-in-out hover:bg-gray-600"
            >
              Close
            </motion.button>
          </div>
        </motion.form>
      </motion.div>
    </div>
  );
};

export default PatientRegistry;