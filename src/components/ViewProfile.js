import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Web3 from "web3";
import { useNavigate, useParams } from "react-router-dom";
import NavBar_Logout from "./NavBar_Logout";
import PatientRegistration from "../build/contracts/PatientRegistration.json";

const ViewProfile = () => {
  const { hhNumber } = useParams();
  const navigate = useNavigate();
  const [patientDetails, setPatientDetails] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPatientDetails = async () => {
      try {
        if (window.ethereum) {
          const web3Instance = new Web3(window.ethereum);
          const networkId = await web3Instance.eth.net.getId();
          const deployedNetwork = PatientRegistration.networks[networkId];
          const contract = new web3Instance.eth.Contract(
            PatientRegistration.abi,
            deployedNetwork && deployedNetwork.address
          );

          const result = await contract.methods.getPatientDetails(hhNumber).call();
          setPatientDetails(result);
          setIsLoading(false);
        } else {
          setError("Please install MetaMask extension");
          setIsLoading(false);
        }
      } catch (error) {
        console.error('Error retrieving patient details:', error);
        setError('Error retrieving patient details');
        setIsLoading(false);
      }
    };

    fetchPatientDetails();
  }, [hhNumber]);

  const cancelOperation = () => {
    navigate("/patient/" + hhNumber);
  };

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
            Loading patient profile...
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
                Patient Profile
              </h1>
              <p className="text-gray-400">
                Comprehensive patient information
              </p>
            </div>

            <div className="space-y-4">
              {patientDetails && (
                <>
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1, duration: 0.4 }}
                    className="flex justify-between items-center bg-gray-700 p-4 rounded-lg"
                  >
                    <span className="text-gray-300 font-medium">Name</span>
                    <span className="text-yellow-500 font-bold">{patientDetails.name}</span>
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2, duration: 0.4 }}
                    className="flex justify-between items-center bg-gray-700 p-4 rounded-lg"
                  >
                    <span className="text-gray-300 font-medium">Date of Birth</span>
                    <span className="text-yellow-500 font-bold">{patientDetails.dateOfBirth}</span>
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3, duration: 0.4 }}
                    className="flex justify-between items-center bg-gray-700 p-4 rounded-lg"
                  >
                    <span className="text-gray-300 font-medium">Gender</span>
                    <span className="text-yellow-500 font-bold">{patientDetails.gender}</span>
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4, duration: 0.4 }}
                    className="flex justify-between items-center bg-gray-700 p-4 rounded-lg"
                  >
                    <span className="text-gray-300 font-medium">Blood Group</span>
                    <span className="text-yellow-500 font-bold">{patientDetails.bloodGroup}</span>
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5, duration: 0.4 }}
                    className="flex justify-between items-center bg-gray-700 p-4 rounded-lg"
                  >
                    <span className="text-gray-300 font-medium">Home Address</span>
                    <span className="text-yellow-500 font-bold">{patientDetails.homeAddress}</span>
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.6, duration: 0.4 }}
                    className="flex justify-between items-center bg-gray-700 p-4 rounded-lg"
                  >
                    <span className="text-gray-300 font-medium">Email</span>
                    <span className="text-yellow-500 font-bold">{patientDetails.email}</span>
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.7, duration: 0.4 }}
                    className="flex justify-between items-center bg-gray-700 p-4 rounded-lg"
                  >
                    <span className="text-gray-300 font-medium">HH Number</span>
                    <span className="text-yellow-500 font-bold">{hhNumber}</span>
                  </motion.div>
                </>
              )}
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

export default ViewProfile;