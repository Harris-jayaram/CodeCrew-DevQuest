import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Web3 from "web3";
import DoctorRegistration from "../build/contracts/DoctorRegistration.json";
import { useNavigate } from "react-router-dom";
import NavBar from "./NavBar";

const DoctorRegistry = () => {
  const [formData, setFormData] = useState({
    doctorAddress: "",
    doctorName: "",
    hospitalName: "",
    hospitalLocation: "",
    dateOfBirth: "",
    gender: "",
    email: "",
    hhNumber: "",
    specialization: "",
    department: "",
    designation: "",
    workExperience: "",
    password: "",
    confirmPassword: ""
  });

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const init = async () => {
      if (window.ethereum) {
        const web3Instance = new Web3(window.ethereum);
        try {
          await window.ethereum.enable();
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
      const web3 = new Web3(window.ethereum);
      const networkId = await web3.eth.net.getId();
      const contract = new web3.eth.Contract(
        DoctorRegistration.abi,
        DoctorRegistration.networks[networkId].address
      );

      const isRegDoc = await contract.methods
        .isRegisteredDoctor(formData.hhNumber)
        .call();

      if (isRegDoc) {
        setErrors(prev => ({
          ...prev,
          hhNumber: "Doctor already registered"
        }));
        setIsLoading(false);
        return;
      }

      await contract.methods
        .registerDoctor(
          formData.doctorName,
          formData.hospitalName,
          formData.dateOfBirth,
          formData.gender,
          formData.email,
          formData.hhNumber,
          formData.specialization,
          formData.department,
          formData.designation,
          formData.workExperience,
          formData.password
        )
        .send({ from: formData.doctorAddress });

      alert("Doctor registered successfully!");
      navigate("/");
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred while registering the doctor.");
    } finally {
      setIsLoading(false);
    }
  };

  const cancelOperation = () => {
    navigate("/");
  };

  const formFields = [
    { name: "doctorAddress", label: "Wallet Public Address", type: "text", placeholder: "Crypto Wallet's Public Address" },
    { name: "doctorName", label: "Full Name", type: "text", placeholder: "Enter Full Name" },
    { name: "hospitalName", label: "Hospital Name", type: "text", placeholder: "Enter Hospital Name" },
    { name: "hospitalLocation", label: "Hospital Location", type: "text", placeholder: "Enter Hospital Location" },
    { name: "dateOfBirth", label: "Date of Birth", type: "date" },
    { 
      name: "gender", 
      label: "Gender", 
      type: "select", 
      options: ["", "Male", "Female", "Other"] 
    },
    { name: "email", label: "Email Address", type: "email", placeholder: "Enter your Email-id" },
    { name: "hhNumber", label: "HH Number", type: "text", placeholder: "Enter your HH Number" },
    { 
      name: "specialization", 
      label: "Specialization", 
      type: "select", 
      options: [
        "", "Cardiology", "Neurology", "Oncology", 
        "Gynecology", "Dermatology", "Ophthalmology", 
        "Psychiatry", "Radiology", "Other"
      ] 
    },
    { 
      name: "department", 
      label: "Department", 
      type: "select", 
      options: ["", "Casualty", "Surgery", "Consultancy", "Other"] 
    },
    { 
      name: "designation", 
      label: "Designation", 
      type: "select", 
      options: ["", "Doctor", "Surgeon", "Nurse", "Other"] 
    },
    { name: "workExperience", label: "Work Experience", type: "number", placeholder: "Years" },
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
          Doctor Registration
        </motion.h1>

        <motion.form 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="max-w-4xl mx-auto bg-gray-800/50 p-8 rounded-2xl shadow-2xl backdrop-blur-sm grid grid-cols-1 sm:grid-cols-2 gap-6"
        >
          {formFields.map((field) => (
            <div key={field.name} className="mb-4">
              <label className="block font-bold text-white" htmlFor={field.name}>
                {field.label}
              </label>
              {field.type === "select" ? (
                <select
                  id={field.name}
                  name={field.name}
                  required
                  value={formData[field.name]}
                  onChange={handleChange}
                  className="mt-2 p-2 w-full text-white bg-gray-700 border border-gray-600 rounded-md hover:bg-gray-800 transition duration-200"
                >
                  {field.options.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              ) : (
                <input
                  id={field.name}
                  name={field.name}
                  type={field.type}
                  required
                  placeholder={field.placeholder}
                  value={formData[field.name]}
                  onChange={handleChange}
                  className={`mt-2 p-2 w-full text-white bg-gray-700 border border-gray-600 rounded-md hover:bg-gray-800 transition duration-200 ${
                    errors[field.name] && "border-red-500"
                  }`}
                />
              )}
              {errors[field.name] && (
                <p className="text-red-500 text-sm mt-1">{errors[field.name]}</p>
              )}
            </div>
          ))}

          <div className="space-x-4 text-center mt-6">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="button"
              onClick={handleRegister}
              disabled={isLoading}
              className="
                py-3 px-4 bg-gradient-to-r from-blue-600 to-purple-600 
                text-white rounded-md font-medium 
                hover:shadow-xl transition-all duration-300 
                disabled:opacity-50 disabled:cursor-not-allowed
              "
            >
              {isLoading ? 'Registering...' : 'Register'}
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="button"
              onClick={cancelOperation}
              className="
                py-3 px-4 bg-gray-700 text-white rounded-md font-medium 
                hover:bg-gray-600 transition-all duration-300
              "
            >
              Close
            </motion.button>
          </div>
        </motion.form>
      </motion.div>
    </div>
  );
};

export default DoctorRegistry;