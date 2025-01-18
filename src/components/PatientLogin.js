import React, { useState } from "react";
import { motion } from "framer-motion";
import Web3 from "web3";
import PatientRegistration from "../build/contracts/PatientRegistration.json";
import { useNavigate } from "react-router-dom";
import NavBar from "./NavBar";

const PatientLogin = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    hhNumber: "",
    password: ""
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

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
    const hhNumberRegex = /^\d{6}$/;

    if (!formData.hhNumber) {
      newErrors.hhNumber = "HH Number is required";
    } else if (!hhNumberRegex.test(formData.hhNumber)) {
      newErrors.hhNumber = "HH Number must be 6 digits";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleCheckRegistration = async () => {
    if (!validateForm()) return;

    setIsLoading(true);
    try {
      const web3 = new Web3(window.ethereum);
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = PatientRegistration.networks[networkId];
      const contract = new web3.eth.Contract(
        PatientRegistration.abi,
        deployedNetwork && deployedNetwork.address
      );

      const isRegisteredResult = await contract.methods
        .isRegisteredPatient(formData.hhNumber)
        .call();

      if (!isRegisteredResult) {
        setErrors(prev => ({
          ...prev,
          hhNumber: "Patient not registered"
        }));
        setIsLoading(false);
        return;
      }

      const isValidPassword = await contract.methods
        .validatePassword(formData.hhNumber, formData.password)
        .call();

      if (!isValidPassword) {
        setErrors(prev => ({
          ...prev,
          password: "Incorrect password"
        }));
        setIsLoading(false);
        return;
      }

      // Successful login
      navigate(`/patient/${formData.hhNumber}`);
    } catch (error) {
      console.error("Error checking registration:", error);
      setErrors({
        general: "An error occurred while checking registration."
      });
    } finally {
      setIsLoading(false);
    }
  };

  const cancelOperation = () => {
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900">
      <NavBar />
      
      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="container mx-auto px-4 py-16 flex items-center justify-center"
      >
        <motion.div 
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md bg-gray-800/50 p-8 rounded-2xl shadow-2xl backdrop-blur-sm"
        >
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600">
              Patient Login
            </h1>
            <p className="text-gray-400">
              Access your personal health dashboard
            </p>
          </div>

          <form className="space-y-6">
            <div>
              <label 
                htmlFor="hhNumber" 
                className="block text-sm font-medium text-gray-300 mb-2"
              >
                HH Number
              </label>
              <input
                id="hhNumber"
                name="hhNumber"
                type="text"
                value={formData.hhNumber}
                onChange={handleChange}
                placeholder="Enter 6-digit HH Number"
                className={`
                  w-full p-3 rounded-lg 
                  bg-gray-700 text-white 
                  focus:ring-2 focus:ring-blue-500
                  transition-all duration-300
                  ${errors.hhNumber ? 'border-2 border-red-500' : ''}
                `}
                required
              />
              {errors.hhNumber && (
                <p className="text-red-500 text-sm mt-2">{errors.hhNumber}</p>
              )}
            </div>

            <div>
              <label 
                htmlFor="password" 
                className="block text-sm font-medium text-gray-300 mb-2"
              >
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                className={`
                  w-full p-3 rounded-lg 
                  bg-gray-700 text-white 
                  focus:ring-2 focus:ring-blue-500
                  transition-all duration-300
                  ${errors.password ? 'border-2 border-red-500' : ''}
                `}
                required
              />
              {errors.password && (
                <p className="text-red-500 text-sm mt-2">{errors.password}</p>
              )}
            </div>

            {errors.general && (
              <div className="text-red-500 text-sm text-center">
                {errors.general}
              </div>
            )}

            <div className="flex space-x-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="button"
                onClick={handleCheckRegistration}
                disabled={isLoading}
                className="
                  flex-1 p-3 rounded-lg 
                  bg-gradient-to-r from-blue-600 to-purple-600 
                  text-white font-semibold
                  hover:shadow-xl
                  transition-all duration-300
                  disabled:opacity-50 disabled:cursor-not-allowed
                "
              >
                {isLoading ? 'Logging in...' : 'Login'}
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="button"
                onClick={cancelOperation}
                className="
                  flex-1 p-3 rounded-lg 
                  bg-gray-700 text-white 
                  font-semibold
                  hover:bg-gray-600
                  transition-all duration-300
                "
              >
                Close
              </motion.button>
            </div>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-500 text-sm">
              Forgot your password? 
              <span 
                className="text-blue-500 ml-2 cursor-pointer hover:underline" onClick={() => alert("Password recovery feature coming soon!")}
              >
                Recover it
              </span>
            </p>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default PatientLogin;