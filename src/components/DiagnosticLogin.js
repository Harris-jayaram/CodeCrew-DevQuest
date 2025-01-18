import React, { useState } from "react";
import Web3 from "web3";
import { motion } from "framer-motion";
import DiagnosticRegistration from "../build/contracts/DiagnosticRegistration.json";
import { useNavigate } from "react-router-dom";
import NavBar from "./NavBar";

const DiagnosticLogin = () => {
  const navigate = useNavigate();
  const [hhNumberError, sethhNumberError] = useState("");
  const [hhNumber, sethhNumber] = useState("");
  const [password, setPassword] = useState("");
  const [isRegistered, setIsRegistered] = useState(false);
  const [diagnosticDetails, setDiagnosticDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handlehhNumberChange = (e) => {
    const inputhhNumber = e.target.value;
    const phoneRegex = /^\d{6}$/;
    if (phoneRegex.test(inputhhNumber)) {
      sethhNumber(inputhhNumber);
      sethhNumberError("");
    } else {
      sethhNumber(inputhhNumber);
      sethhNumberError("Please enter a 6-digit HH Number.");
    }
  };

  const handleCheckRegistration = async () => {
    setIsLoading(true);
    try {
      const web3 = new Web3(window.ethereum);
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = DiagnosticRegistration.networks[networkId];
      const contract = new web3.eth.Contract(
        DiagnosticRegistration.abi,
        deployedNetwork && deployedNetwork.address
      );

      const isRegisteredResult = await contract.methods
        .isRegisteredDiagnostic(hhNumber)
        .call();
      setIsRegistered(isRegisteredResult);

      if (isRegisteredResult) {
        const isValidPassword = await contract.methods
          .validatePassword(hhNumber, password)
          .call();

        if (isValidPassword) {
          const diagnostic = await contract.methods
            .getDiagnosticDetails(hhNumber)
            .call();
          setDiagnosticDetails(diagnostic);
          navigate("/diagnostic/" + hhNumber);
        } else {
          throw new Error("Incorrect password");
        }
      } else {
        throw new Error("Diagnostic not registered");
      }
    } catch (error) {
      console.error("Error checking registration:", error);
      alert(error.message);
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
              Diagnostic Login
            </h1>
            <p className="text-gray-400">
              Access your diagnostic center dashboard
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
                type="text"
                value={hhNumber}
                onChange={handlehhNumberChange}
                placeholder="Enter 6-digit HH Number"
                className={`
                  w-full p-3 rounded-lg 
                  bg-gray-700 text-white 
                  focus:ring-2 focus:ring-blue-500
                  transition-all duration-300
                  ${hhNumberError ? 'border-2 border-red-500' : ''}
                `}
                required
              />
              {hhNumberError && (
                <p className="text-red-500 text-sm mt-2">{hhNumberError}</p>
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
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="
                  w-full p-3 rounded-lg 
                  bg-gray-700 text-white 
                  focus:ring-2 focus:ring-blue-500
                  transition-all duration-300
                "
                required
              />
            </div>

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
                className="text-blue-500 ml-2 cursor-pointer hover:underline"
                onClick={() => navigate("/reset-password")}
              >
                Reset here
              </span>
            </p>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default DiagnosticLogin;