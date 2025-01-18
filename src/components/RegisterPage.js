import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import NavBar from "./NavBar";

const RegisterPage = () => {
  const navigate = useNavigate();

  const registrationOptions = [
    {
      title: "Doctor Registration",
      path: "/doctor_registration",
      icon: "fas fa-user-md",
      description: "For healthcare professionals",
      bgColor: "from-blue-500 to-purple-600"
    },
    {
      title: "Patient Registration",
      path: "/patient_registration", 
      icon: "fas fa-hospital-user",
      description: "Create your patient profile",
      bgColor: "from-green-500 to-teal-600"
    },
    {
      title: "Diagnostics Registration",
      path: "/diagnostic_registration",
      icon: "fas fa-microscope",
      description: "For diagnostic centers",
      bgColor: "from-red-500 to-pink-600"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black">
      <NavBar />
      
      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="container mx-auto px-4 py-16"
      >
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600">
            Registration Portal
          </h1>
          <p className="text-gray-400 text-lg">
            Choose your registration type to get started
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {registrationOptions.map((option, index) => (
            <motion.div
              key={index}
              whileHover={{ 
                scale: 1.05,
                boxShadow: "0 0 20px rgba(0,0,0,0.3)"
              }}
              className={`bg-gradient-to-br ${option.bgColor} rounded-2xl p-6 text-white shadow-2xl transform transition-all duration-300 hover:rotate-3`}
            >
              <div className="flex justify-between items-center mb-4">
                <i className={`${option.icon} text-4xl`}></i>
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={() => navigate(option.path)}
                  className="bg-white/20 hover:bg-white/30 px-4 py-2 rounded-full flex items-center"
                >
                  Register
                  <i className="fas fa-arrow-right ml-2"></i>
                </motion.button>
              </div>
              <h2 className="text-2xl font-bold mb-2">{option.title}</h2>
              <p className="text-white/80">{option.description}</p>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-gray-500 mb-4">
            Already have an account?
          </p>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate("/login")}
            className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
          >
            Login Here
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
};

export default RegisterPage;