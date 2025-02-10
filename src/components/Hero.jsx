import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from 'react-router-dom';

const Hero = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/login-register'); 
  };

  return (
    <section className="py-20 px-8 bg-white">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="container mx-auto flex flex-col md:flex-row justify-between items-center"
      >
        {/* Left Side */}
        <div className="text-left max-w-xl">
          <h1 className="text-5xl font-bold leading-tight text-gray-900">
            Event Management <span className="text-black">Simplified</span> and <span className="text-gray-700">Seamless</span>
          </h1>
          <p className="mt-6 text-gray-600">
            Organize and manage your events with ease using our all-in-one platform. From event creation to attendee management, we've got you covered.
          </p>
          <div className="mt-8 flex space-x-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleClick}
              className="bg-black hover:bg-gray-800 text-white px-6 py-3 rounded-lg font-medium transition-colors"
            >
              Get Started
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="border border-gray-500 hover:border-black text-gray-900 px-6 py-3 rounded-lg font-medium transition-colors"
            >
              <a href="#features">Learn More</a>
            </motion.button>
          </div>
        </div>
        
        {/* Right Side */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.3 }}
          className="mt-12 md:mt-0"
        >
          <div className="relative bg-gray-900 rounded-2xl p-6 shadow-xl max-w-lg mx-auto text-white">
            <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl opacity-80"></div>
            <div className="relative">
              <p className="text-lg text-gray-400">Upcoming Event</p>
              <h2 className="text-4xl font-semibold">
                Annual Tech Conference <span className="text-sm text-gray-400">2025</span>
              </h2>
              <div className="mt-4 space-y-2">
                <div className="flex justify-between bg-gray-800 p-3 rounded-lg">
                  <span className="text-gray-400">Date</span>
                  <span className="text-green-400">March 25, 2025</span>
                </div>
                <div className="flex justify-between bg-gray-800 p-3 rounded-lg">
                  <span className="text-gray-400">Location</span>
                  <span className="text-red-400">New York, USA</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
      
      {/* Stats at the bottom spaced evenly */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut", delay: 0.5 }}
        className="mt-16 flex justify-between text-center max-w-6xl mx-auto"
      >
        {["500+ Events Created", "200+ Venues", "10K+ Attendees", "99% Event Success Rate"].map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
            className="flex-1"
          >
            <h3 className="text-3xl font-bold text-gray-900">{stat.split(" ")[0]}</h3>
            <p className="text-gray-600">{stat.split(" ").slice(1).join(" ")}</p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default Hero;
