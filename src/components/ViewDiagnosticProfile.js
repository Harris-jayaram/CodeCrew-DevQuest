import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import DiagnosticRegistration from "../build/contracts/DiagnosticRegistration.json";
import Web3 from "web3";
import { useNavigate, useParams } from "react-router-dom";
import NavBar_Logout from "./NavBar_Logout";

const ViewDiagnosticProfile = () => {
  const { hhNumber } = useParams();
  const navigate = useNavigate();
  const [diagnosticDetails, setDiagnosticDetails] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchDiagnosticDetails = async () => {
      try {
        if (window.ethereum) {
          const web3Instance = new Web3(window.ethereum);
          const networkId = await web3Instance.eth.net.getId();
          const deployedNetwork = DiagnosticRegistration.networks[networkId];
          const contract = new web3Instance.eth.Contract(
            DiagnosticRegistration.abi,
            deployedNetwork && deployedNetwork.address
          );

          const result = await contract.methods.getDiagnosticDetails(hhNumber).call();
          setDiagnosticDetails(result);
          setIsLoading(false);
        } else {
          setError("Please install MetaMask extension");
          setIsLoading(false);
        }
      } catch (error) {
        console.error('Error retrieving diagnostic details:', error);
        setError('Error retrieving diagnostic details');
        setIsLoading(false);
      }
    };

    fetchDiagnosticDetails();
  }, [hhNumber]);

  const cancelOperation = () => {
    navigate("/diagnostic/" + hhNumber);
  };
  
  const profileDetails = [
    { label: "Diagnostic Center Name", value: diagnosticDetails?.[1] },
    { label: "Hospital Name", value: diagnosticDetails?.[2] },
    { label: "Location", value: diagnosticDetails?.[3] },
    { label: "Email-Id", value: diagnosticDetails?.[4] },
    { label: "HH Number", value: hhNumber }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900">
      <NavBar_Logout />
      
      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="container mx-auto px-4 py-16 flex items-center justify-center"
      >
        {isLoading ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-white text-2xl"
          >
            Loading...
          </motion.div>
        ) : error ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-red-500 text-2xl"
          >
            {error}
          </motion.div>
        ) : (
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="w-full max-w-2xl bg-gray-800/50 p-8 rounded-2xl shadow-2xl backdrop-blur-sm"
          >
            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600">
                Diagnostic Profile
              </h1>
              <p className="text-gray-400">
                Detailed information about the diagnostic center
              </p>
            </div>

            <div className="space-y-6">
              {profileDetails.map((detail, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ 
                    delay: index * 0.1,
                    duration: 0.4
                  }}
                  className="flex justify-between items-center bg-gray-700 p-4 rounded-lg"
                >
                  <span className="text-gray-300 font-medium">{detail.label}</span>
                  <span className="text-yellow-500 font-bold">{detail.value}</span>
                </motion.div>
              ))}
            </div>

            <div className="flex justify-center mt-8">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={cancelOperation}
                className="
                  px-8 py-3 
                  bg-gradient-to-r from-red-500 to-pink-600
                  text-white font-semibold 
                  rounded-full 
                  hover:shadow-xl
                  transition-all duration-300
                "
              >
                Close
              </motion.button>
            </div>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default ViewDiagnosticProfile;