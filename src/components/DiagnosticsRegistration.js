import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Web3 from "web3";
import DiagnosticRegistration from "../build/contracts/DiagnosticRegistration.json";
import { useNavigate } from "react-router-dom";
import NavBar from "./NavBar";

const DiagnosticRegistry = () => {
  const [formData, setFormData] = useState({
    diagnosticAddress: "",
    diagnosticName: "",
    hospitalName: "",
    diagnosticLocation: "",
    email: "",
    hhNumber: "",
    password: "",
    confirmPassword: ""
  });

  const [errors, setErrors] = useState({});
  const [web3, setWeb3] = useState(null);
  const [contract, setContract] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const init = async () => {
      if (window.ethereum) {
        const web3Instance = new Web3(window.ethereum);
        try {
          await window.ethereum.enable();
          setWeb3(web3Instance);

          const networkId = await web3Instance.eth.net.getId();
          const deployedNetwork = DiagnosticRegistration.networks[networkId];
          const contractInstance = new web3Instance.eth.Contract(
            DiagnosticRegistration.abi,
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

    // Clear specific field error when user starts typing
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = {...prev};
        delete newErrors[name];
        return newErrors;
      });
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
      const networkId = await web3.eth.net.getId();
      const contract = new web3.eth.Contract(
        DiagnosticRegistration.abi,
        DiagnosticRegistration.networks[networkId].address
      );

      const isRegDoc = await contract.methods
        .isRegisteredDiagnostic(formData.hhNumber)
        .call();

      if (isRegDoc) {
        setErrors(prev => ({
          ...prev,
          hhNumber: "Diagnostic center already registered"
        }));
        setIsLoading(false);
        return;
      }

      await contract.methods
        .registerDiagnostic(
          formData.diagnosticName,
          formData.hospitalName,
          formData.diagnosticLocation,
          formData.email,
          formData.hhNumber,
          formData.password
        )
        .send({ from: formData.diagnosticAddress });

      alert("Diagnostic registered successfully!");
      navigate("/");
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred while registering the diagnostic.");
    } finally {
      setIsLoading(false);
    }
  };

  const cancelOperation = () => {
    navigate("/");
  };

  const formFields = [
    { name: "diagnosticAddress", label: "Wallet Public Address", type: "text", placeholder: "Crypto Wallet Public Address" },
    { name: "diagnosticName", label: "Diagnostic Center Name", type: "text", placeholder: "Enter Diagnostic's Center Full Name" },
    { name: "hospitalName", label: "Hospital Name", type: "text", placeholder: "Enter Hospital Name" },
    { name: "diagnosticLocation", label: "Location", type: "text", placeholder: "Enter the location of Diagnostic center" },
    { name: "email", label: "Email Address", type: "email", placeholder: "Enter your Email-id" },
    { name: "hhNumber", label: "HH Number", type: "text", placeholder: "HH Number" },
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
          Diagnostic Registration
        </motion.h1>

        <motion.form 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="max-w-4xl mx-auto bg-gray-800/50 p-8 rounded-2xl shadow-2xl backdrop-blur-sm"
        >
          <div className="grid md:grid-cols-2 gap-6">
            {formFields.map((field, index) => (
              <motion.div
                key={field.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="flex flex-col"
              >
                <label className="text-gray-300 mb-2">{field.label}</label>
                <input
                  type={field.type}
                  name={field.name}
                  placeholder={field.placeholder}
                  value={formData[field.name]}
                  onChange={handleChange}
                  className={`
                    p-3 rounded-lg 
                    bg-gray-700 text-white 
                    focus:ring-2 focus:ring-blue-500 
                    focus:outline-none 
                    ${errors[field.name] ? 'border border-red-500' : 'border border-gray-600'}
                  `}
                />
                {errors[field.name] && (
                  <p className="text-red-500 text-sm mt-1">{errors[field.name]}</p>
                )}
              </motion.div>
            ))}
          </div>

          <div className="flex justify-center mt-6">
            <button
              type="button"
              onClick={handleRegister}
              className={`py-3 px-6 bg-teal-500 text-white rounded-md font-medium hover:bg-teal-600 transition duration-200 ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
              disabled={isLoading}
            >
              {isLoading ? 'Registering...' : 'Register'}
            </button>
            <button
              onClick={cancelOperation}
              className="py-3 px-6 ml-4 bg-red-500 text-white rounded-md font-medium hover:bg-red-600 transition duration-200"
            >
              Close
            </button>
          </div>
        </motion.form>
      </motion.div>
    </div>
  );
};

export default DiagnosticRegistry;