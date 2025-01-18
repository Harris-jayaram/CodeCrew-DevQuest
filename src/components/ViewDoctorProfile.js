import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import DoctorRegistration from "../build/contracts/DoctorRegistration.json";
import Web3 from "web3";
import { useNavigate, useParams } from "react-router-dom";
import NavBar_Logout from "./NavBar_Logout";

const ViewDoctorProfile = () => {
  const { hhNumber } = useParams();
  const navigate = useNavigate();
  const [doctorDetails, setDoctorDetails] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchDoctorDetails = async () => {
      try {
        if (window.ethereum) {
          const web3Instance = new Web3(window.ethereum);
          const networkId = await web3Instance.eth.net.getId();
          const deployedNetwork = DoctorRegistration.networks[networkId];
          const contract = new web3Instance.eth.Contract(
            DoctorRegistration.abi,
            deployedNetwork && deployedNetwork.address
          );

          const result = await contract.methods.getDoctorDetails(hhNumber).call();
          setDoctorDetails(result);
          setIsLoading(false);
        } else {
          setError("Please install MetaMask extension");
          setIsLoading(false);
        }
      } catch (error) {
        console.error('Error retrieving doctor details:', error);
        setError('Error retrieving doctor details');
        setIsLoading(false);
      }
    };

    fetchDoctorDetails();
  }, [hhNumber]);

  const cancelOperation = () => {
    navigate("/doctor/" + hhNumber);
  };
  
  const profileDetails = [
    { label: "Name", value: doctorDetails?.[1] },
    { label: "Date of Birth", value: doctorDetails?.[3] },
    { label: "Gender", value: doctorDetails?.[4] },
    { label: "Hospital Name", value: doctorDetails?.[2] },
    { label: "Specialization", value: doctorDetails?.[6] },
    { label: "Department", value: doctorDetails?.[7] },
    { label: "Designation", value: doctorDetails?.[8] },
    { label: "Work Experience", value: `${doctorDetails?.[9]} years` },
    { label: "Email", value: doctorDetails?.[5] },
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
            Loading doctor profile...
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
                Doctor's Profile
              </h1>
              <p className="text-gray-400">
                Comprehensive professional information
              </p>
            </div>

            <div className="space-y-4">
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
                  <span className="text-yellow-500 font-bold text-right">{detail.value}</span>
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

export default ViewDoctorProfile;