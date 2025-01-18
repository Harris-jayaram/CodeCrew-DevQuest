import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Web3 from "web3";
import { useParams, useNavigate } from "react-router-dom";
import NavBar_Logout from "./NavBar_Logout";
import PatientRegistration from "../build/contracts/PatientRegistration.json";

const PatientDashBoard = () => {
  const { hhNumber } = useParams();
  const navigate = useNavigate();
  
  const [web3, setWeb3] = useState(null);
  const [contract, setContract] = useState(null);
  const [patientPhoneNo, setPatientPhoneNo] = useState(hhNumber);
  const [patientDetails, setPatientDetails] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const init = async () => {
      if (window.ethereum) {
        const web3Instance = new Web3(window.ethereum);
        setWeb3(web3Instance);

        const networkId = await web3Instance.eth.net.getId();
        const deployedNetwork = PatientRegistration.networks[networkId];
        const contractInstance = new web3Instance.eth.Contract(
          PatientRegistration.abi,
          deployedNetwork && deployedNetwork.address,
        );
        setContract(contractInstance);
        
        try {
          const result = await contractInstance.methods.getPatientDetails(patientPhoneNo).call();
          setPatientDetails(result);
        } catch (error) {
          console.error('Error retrieving patient details:', error);
          setError('Error retrieving patient details');
        }
      } else {
        console.log('Please install MetaMask extension');
        setError('Please install MetaMask extension');
      }
    };

    init();
  }, [patientPhoneNo]);

  const dashboardActions = [
    {
      title: "View Profile",
      icon: "fas fa-user-circle",
      onClick: () => navigate(`/patient/${hhNumber}/viewprofile`),
      bgColor: "from-blue-500 to-indigo-600"
    },
    {
      title: "Upload Data",
      icon: "fas fa-cloud-upload-alt",
      onClick: () => navigate("/upload_patient"),
      bgColor: "from-green-500 to-teal-600"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900">
      <NavBar_Logout />
      
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
          className="text-5xl font-extrabold mb-8 text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600"
        >
          Patient Dashboard
        </motion.h1>

        {error && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center mb-8 text-red-500"
          >
            {error}
          </motion.div>
        )}

        {patientDetails && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-center mb-16"
          >
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Welcome, <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-orange-600">{patientDetails.name}</span>
            </p>
          </motion.div>
        )}

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {dashboardActions.map((action, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ 
                delay: index * 0.2,
                duration: 0.5
              }}
              whileHover={{ scale: 1.05 }}
              className={`
                bg-gradient-to-br ${action.bgColor} 
                rounded-2xl p-6 text-white 
                shadow-2xl transform transition-all duration-300
                flex flex-col items-center justify-center
                hover:shadow-2xl
              `}
            >
              <i className={`${action.icon} text-6xl mb-6 opacity-80`}></i>
              <h2 className="text-3xl font-bold mb-4">{action.title}</h2>
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={action.onClick}
                className="
                  mt-4 px-8 py-3 
                  bg-white/20 hover:bg-white/30 
                  rounded-full 
                  flex items-center 
                  transition-all duration-300
                "
              >
                Proceed
                <i className="fas fa-arrow-right ml-2"></i>
              </motion.button>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default PatientDashBoard;