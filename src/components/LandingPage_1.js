import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  CheckCircleIcon, 
  RocketLaunchIcon, 
  ShieldCheckIcon,
  DocumentChartBarIcon,
  LightBulbIcon
} from "@heroicons/react/24/solid";

import NavBar from "./NavBar";
import lp_10 from "./lp_10.png";
import lp_12 from "./lp_12.png";
import lp_11 from "./lp_11.png";

const LandingPage = () => {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const images = [lp_10, lp_12, lp_11];

  const features = [
    {
      icon: ShieldCheckIcon,
      title: "Advanced Security",
      description: "Military-grade encryption and blockchain protection"
    },
    {
      icon: DocumentChartBarIcon,
      title: "Smart Analytics",
      description: "AI-powered insights for comprehensive health tracking"
    },
    {
      icon: RocketLaunchIcon,
      title: "Seamless Integration",
      description: "Connect with multiple healthcare platforms effortlessly"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-100">
      <NavBar />
      
      <div className="container mx-auto px-6 py-16 lg:py-24">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Image Section */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            className="relative"
          >
            <div className="bg-white/30 backdrop-blur-xl rounded-3xl p-6 shadow-2xl border border-white/40">
              <img 
                src={images[activeImageIndex]} 
                alt="Health Dashboard" 
                className="w-full h-[450px] object-contain transform hover:scale-105 transition-transform duration-500"
              />
            </div>

            {/* Image Navigation Dots */}
            <div className="flex justify-center mt-6 space-x-3">
              {images.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveImageIndex(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    activeImageIndex === index 
                      ? "bg-purple-600 w-8" 
                      : "bg-gray-300"
                  }`}
                />
              ))}
            </div>
          </motion.div>

          {/* Content Section */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            className="space-y-8"
          >
            <div>
              <h1 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-700 mb-4">
                Revolutionize Health Tracking
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                Empowering individuals with intelligent, secure health management solutions
              </p>
            </div>

            {/* Feature Grid */}
            <div className="grid md:grid-cols-3 gap-6">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.2 }}
                  className="bg-white rounded-2xl p-6 text-center shadow-lg hover:shadow-xl transition-all group"
                >
                  <feature.icon className="w-12 h-12 mx-auto text-purple-600 mb-4 group-hover:scale-110 transition-transform" />
                  <h3 className="font-bold text-lg mb-2">{feature.title}</h3>
                  <p className="text-sm text-gray-600">{feature.description}</p>
                </motion.div>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-purple-600 to-indigo-700 text-white px-8 py-3 rounded-full hover:shadow-xl transition-all"
              >
                Get Started
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="border border-purple-600 text-purple-600 px-8 py-3 rounded-full hover:bg-purple-50 transition-all"
              >
                Learn More
              </motion.button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;