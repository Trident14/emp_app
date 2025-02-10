import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'; // Correct import
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import PrivateRoute from "./components/PrivateRoute";
import LoginRegister from './components/LoginRegister';
import Dashboard from './components/Dashboard'; // Your Dashboard component

import './App.css';

const AppContent = () => {
  return (
    <>
      {/* Navbar component */}
      <Navbar />

      <Routes>
        {/* Home Page */}
        <Route
          path="/"
          element={
            <>
              {/* Hero Section */}
              <section className="bg-white py-24 px-6 sm:px-12 lg:px-24 text-center">
                <Hero />
              </section>
            </>
          }
        />

        {/* Login/Register Page */}
        <Route path="/login-register" element={<LoginRegister />} />

        {/* Protected Dashboard Route */}
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
      </Routes>
    </>
  );
}

const App = () => {
  const queryClient = new QueryClient(); 

  return (
    <QueryClientProvider client={queryClient}> 
      <Router>
        <AppContent />
      </Router>
    </QueryClientProvider>
  );
};

export default App;
