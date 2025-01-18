import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import logo from "./logo.png";

const NavBar_Logout = () => {
  const navigate = useNavigate();

  return (
    <motion.nav 
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-gradient-to-r from-black via-gray-900 to-black text-white shadow-lg h-24"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="pt-4 flex items-center justify-between h-full">
          {/* Logo and Title Container */}
          <div className="flex items-center">
            <motion.img
              whileHover={{ scale: 1.1 }}
              onClick={() => navigate("/")}
              src={logo}
              alt="Logo"
              className="h-16 w-16 rounded-full cursor-pointer mr-4 transition-transform"
            />
            <motion.h1
              whileHover={{ scale: 1.05 }}
              onClick={() => navigate("/")}
              className="text-2xl sm:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600 cursor-pointer"
            >
              CodeCrew
            </motion.h1>
          </div>

          {/* Logout Button */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate("/")}
            className="px-6 py-2 bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-full text-lg font-medium shadow-lg hover:shadow-xl transition-all duration-300 transform"
          >
            Logout
          </motion.button>
        </div>
      </div>
    </motion.nav>
  );
};

export default NavBar_Logout;