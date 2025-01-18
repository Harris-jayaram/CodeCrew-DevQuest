import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import NavBar from "./NavBar";

const LoginPage = () => {
  const navigate = useNavigate();
  const [hoveredCard, setHoveredCard] = useState(null);

  const loginOptions = [
    {
      title: "Doctor Portal",
      path: "/doctor_login",
      icon: "fas fa-user-md",
      description: "Secure access for healthcare professionals",
      bgColor: "from-blue-500 to-indigo-600",
      gradient: "bg-gradient-to-br from-blue-400 via-blue-500 to-indigo-600",
      shadowColor: "shadow-blue-500/50"
    },
    {
      title: "Patient Access",
      path: "/patient_login",
      icon: "fas fa-hospital-user",
      description: "Manage your health records safely",
      bgColor: "from-green-500 to-teal-600",
      gradient: "bg-gradient-to-br from-green-400 via-green-500 to-teal-600",
      shadowColor: "shadow-green-500/50"
    },
    {
      title: "Diagnostic Center",
      path: "/diagnostic_login",
      icon: "fas fa-microscope",
      description: "Streamlined login for diagnostic facilities",
      bgColor: "from-purple-500 to-pink-600",
      gradient: "bg-gradient-to-br from-purple-400 via-purple-500 to-pink-600",
      shadowColor: "shadow-purple-500/50"
    }
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
        <div className="text-center mb-16">
          <motion.h1 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="text-5xl font-extrabold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600"
          >
            Secure Access Portal
          </motion.h1>
          <p className="text-gray-400 text-xl max-w-2xl mx-auto">
            Choose your specific login pathway to access our comprehensive healthcare management system
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {loginOptions.map((option, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ 
                delay: index * 0.2,
                duration: 0.5
              }}
              onHoverStart={() => setHoveredCard(index)}
              onHoverEnd={() => setHoveredCard(null)}
              className={`
                relative overflow-hidden rounded-2xl p-6 text-white 
                ${option.gradient} 
                ${hoveredCard === index ? 'shadow-2xl scale-105' : 'shadow-xl'}
                transform transition-all duration-300
              `}
            >
              {/* Background Glow Effect */}
              <div 
                className="absolute inset-0 bg-white/10 opacity-0 hover:opacity-20 transition-opacity duration-300"
              />

              <div className="relative z-10 flex flex-col h-full">
                <div className="flex justify-between items-center mb-6">
                  <i className={`${option.icon} text-5xl opacity-70`}></i>
                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    onClick={() => navigate(option.path)}
                    className="
                      bg-white/20 hover:bg-white/30 
                      px-5 py-2 rounded-full 
                      flex items-center 
                      transition-all duration-300
                    "
                  >
                    Login
                    <i className="fas fa-sign-in-alt ml-2"></i>
                  </motion.button>
                </div>
                <h2 className="text-3xl font-bold mb-4">{option.title}</h2>
                <p className="text-white/80 flex-grow">{option.description}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <p className="text-gray-500 mb-6 text-lg">
              New to our platform? Create your account now
            </p>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate("/register")}
              className="
                bg-gradient-to-r from-purple-600 to-blue-600 
                text-white px-8 py-4 
                rounded-full 
                shadow-2xl hover:shadow-xl 
                transition-all duration-300 
                text-lg font-semibold
                flex items-center justify-center
                mx-auto
              "
            >
              Create New Account
              <i className="fas fa-user-plus ml-3"></i>
            </motion.button>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default LoginPage;