import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Web3 from "web3";
import { useParams, useNavigate } from "react-router-dom";
import NavBar_Logout from "./NavBar_Logout";
import PatientRegistration from "../build/contracts/PatientRegistration.json";

const DoctorViewPatient = () => {
  const { hhNumber } = useParams();
  const navigate = useNavigate();

  const [web3, setWeb3] = useState(null);
  const [contract, setContract] = useState(null);
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
          const result = await contractInstance.methods.getPatientDetails(hhNumber).call();
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
  }, [hhNumber]);

  const patientActions = [
    {
      title: "View Records",
      icon: "fas fa-file-medical-alt",
      onClick: () => navigate(`/patient/${hhNumber}/viewrecords`),
      bgColor: "from-blue-500 to-indigo-600"
    },
    {
      title: "Prescription",
      icon: "fas fa-prescription-bottle-alt",
      onClick: () => navigate(`/doctor/${hhNumber}/doctorform`),
      bgColor: "from-green-500 to-teal-600"
    }
  ];

  const cancelOperation = () => {
    navigate(-1);
  };

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
          className="text-4xl font-extrabold mb-8 text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600"
        >
          Patient Profile
        </motion.h1>

        {patientDetails && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="max-w-2xl mx-auto bg-gray-800/50 p-8 rounded-2xl shadow-2xl backdrop-blur-sm mb-8"
          >
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <h2 className="text-lg font-semibold text-gray-300">Name</h2>
                <p className="text-xl font-bold text-yellow-500">{patientDetails.name}</p>
              </div>
              <div>
                <h2 className="text-lg font-semibold text-gray-300">Date of Birth</h2>
                <p className="text-xl font-bold text-yellow-500">{patientDetails.dateOfBirth}</p>
              </div>
              <div>
                <h2 className="text-lg font-semibold text-gray-300">Gender</h2>
                <p className="text-xl font-bold text-yellow-500">{patientDetails.gender}</p>
              </div>
              <div>
                <h2 className="text-lg font-semibold text-gray-300">Blood Group</h2>
                <p className="text-xl font-bold text-yellow-500">{patientDetails.bloodGroup}</p>
              </div>
              <div className="md:col-span-2">
                <h2 className="text-lg font-semibold text-gray-300">Home Address</h2>
                <p className="text-xl font-bold text-yellow-500">{patientDetails.homeAddress}</p>
              </div>
              <div className="md:col-span-2">
                <h2 className="text-lg font-semibold text-gray-300">Email</h2>
                <p className="text-xl font-bold text-yellow-500">{patientDetails.email}</p>
              </div>
            </div>
          </motion.div>
        )}

        <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {patientActions.map((action, index) => (
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

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ 
              delay: 0.4,
              duration: 0.5
            }}
            whileHover={{ scale: 1.05 }}
            className="
              bg-gradient-to-br from-red-500 to-pink-600
              rounded-2xl p-6 text-white 
              shadow-2xl transform transition-all duration-300
              flex flex-col items-center justify-center
              hover:shadow-2xl
              md:col-span-3
            "
          >
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={cancelOperation}
              className="
                px-8 py-3 
                bg-white/20 hover:bg-white/30 
                rounded-full 
                flex items-center 
                transition-all duration-300
              "
            >
              Close
               <i className="fas fa-times ml-2"></i>
            </motion.button>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default DoctorViewPatient;