import React, { useState, useEffect } from "react";
import Web3 from "web3";
import { motion } from "framer-motion";
import { useParams, useNavigate } from "react-router-dom";
import NavBar_Logout from "./NavBar_Logout";
import DiagnosticRegistration from "../build/contracts/DiagnosticRegistration.json";

const DiagnosticDashBoard = () => {
  const { hhNumber } = useParams();
  const navigate = useNavigate();
  const [contract, setContract] = useState(null);
  const [diagnosticDetails, setDiagnosticDetails] = useState(null);
  const [error, setError] = useState(null);

  const dashboardActions = [
    {
      title: "View Profile",
      icon: "fas fa-user-circle",
      onClick: () => navigate(`/diagnostic/${hhNumber}/viewdiagnosticprofile`),
      bgColor: "from-blue-500 to-indigo-600"
    },
    {
      title: "Create Report",
      icon: "fas fa-file-medical",
      onClick: () => navigate(`/diagnostic/${hhNumber}/diagnosticform`),
      bgColor: "from-green-500 to-teal-600"
    }
  ];

  useEffect(() => {
    const init = async () => {
      if (window.ethereum) {
        try {
          const web3Instance = new Web3(window.ethereum);
          const networkId = await web3Instance.eth.net.getId();
          const deployedNetwork = DiagnosticRegistration.networks[networkId];
          const contractInstance = new web3Instance.eth.Contract(
            DiagnosticRegistration.abi,
            deployedNetwork && deployedNetwork.address
          );
          setContract(contractInstance);

          const result = await contractInstance.methods.getDiagnosticDetails(hhNumber).call();
          setDiagnosticDetails(result);
        } catch (error) {
          console.error('Error initializing Web3 or fetching diagnostic details:', error);
          setError('Error initializing Web3 or fetching diagnostic details');
        }
      } else {
        console.error('Please install MetaMask extension');
        setError('Please install MetaMask extension');
      }
    };

    init();
  }, [hhNumber]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900">
      <NavBar_Logout />
      
      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="container mx-auto px-4 py-16"
      >
        <div className="text-center mb-16">
          <motion.h1 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="text-5xl font-extrabold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600"
          >
            Diagnostic Dashboard
          </motion.h1>
          {diagnosticDetails && (
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Welcome, <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-orange-600">{diagnosticDetails[1]}</span>
            </p>
          )}
        </div>

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

        {error && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center mt-8 text-red-500"
          >
            {error}
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default DiagnosticDashBoard;