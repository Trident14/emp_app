import React, { useState } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const LoginRegister = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cookies, setCookies] = useCookies(["access_token"]);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const [isLogin, setIsLogin] = useState(true);

  const handleSignUpClick = async (event) => {
    event.preventDefault();
    setError(""); 

    try {
      const response = await axios.post("http://localhost:4080/api/auth/register", {
        email,
        password,
      });
      alert("Registration successful! Please login.");
      setIsLogin(true); 
    } catch (err) {
      setError(err.response?.data?.message || "An error occurred.");
    }
  };

  const handleSignInClick = async (event) => {
    event.preventDefault();
    setError(""); 

    try {
      const response = await axios.post("http://localhost:4080/api/auth/login", {
        email,
        password,
      });

      if (response.data.isAdmin) {
        alert("Welcome Admin!");
        navigate("/admin-dashboard");  // Redirect to the admin dashboard
      } else {
        setCookies("access_token", response.data.token);
        window.localStorage.setItem("email", response.data.email);
        alert("Welcome User!");
        navigate("/dashboard");  // Redirect to the user dashboard
      }
    } catch (err) {
      alert("An error occurred. Please try again.");
      setError(err.response?.data?.message || "An error occurred.");
    }
  };

  return (
    <div id="login-register" className="w-full min-h-screen flex flex-col lg:flex-row mt-16">
      {/* Left Panel */}
      <motion.div
        className="lg:w-1/2 w-full bg-gray-100 p-12 flex flex-col"
        style={{ gap: "5rem" }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div>
          <h1 className="text-3xl font-bold text-blue-600 mb-2">Eventify</h1>
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Welcome Back!</h2>
          <p className="text-gray-600">
            Manage your events seamlessly. Create, manage, and track your events in one place. Whether you are hosting or attending, we’ve got you covered.
          </p>
        </div>
        <div className="space-y-4">
          {/* Feature icons */}
        </div>
      </motion.div>

      {/* Right Panel */}
      <motion.div
        className="lg:w-1/2 w-full bg-white p-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {/* Tab Switching */}
        <div className="flex mb-8 border-b border-gray-200">
          <motion.button
            onClick={() => setIsLogin(true)}
            className={`flex-1 pb-4 font-medium ${isLogin ? "text-blue-600 border-b-2 border-blue-600" : "text-gray-500"}`}
            whileHover={{ scale: 1.1 }}
          >
            Login
          </motion.button>
          <motion.button
            onClick={() => setIsLogin(false)}
            className={`flex-1 pb-4 font-medium ${!isLogin ? "text-blue-600 border-b-2 border-blue-600" : "text-gray-500"}`}
            whileHover={{ scale: 1.1 }}
          >
            Register
          </motion.button>
        </div>

        {/* Error Message */}
        {error && <div className="text-red-600 text-sm mb-4">{error}</div>}

        {/* Login Form */}
        <form className="space-y-6" onSubmit={isLogin ? handleSignInClick : handleSignUpClick}>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
            <motion.input
              type="email"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-black"
              placeholder="Enter your Email"
              onChange={(e) => setEmail(e.target.value)}
              required
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
            <motion.input
              type="password"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-black"
              placeholder="Enter your Password"
              onChange={(e) => setPassword(e.target.value)}
              required
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            />
          </div>
          <motion.button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
          >
            {isLogin ? "Sign In" : "Create Account"}
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
};

export default LoginRegister;
