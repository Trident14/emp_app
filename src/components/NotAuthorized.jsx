import React from 'react';
import { useNavigate } from 'react-router-dom';

const NotAuthorized = () => {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-center h-screen bg-gray-800 text-white">
      <div className="text-center max-w-lg p-6">
        <h1 className="text-8xl font-bold text-red-500 mb-4">401</h1>
        <p className="text-2xl mb-6 text-gray-300">You are not authorized to access this page.</p>
        <div className="flex justify-center items-center mb-6">
          <svg
            className="w-16 h-16 text-red-500 animate-pulse"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="10" />
            <path d="M12 8v4l3 3" />
          </svg>
        </div>
        <button
          onClick={() => navigate('/')}
          className="bg-red-600 text-white py-2 px-6 rounded-lg hover:bg-red-700 transition-colors text-xl"
        >
          Go Back to Home
        </button>
      </div>
    </div>
  );
};

export default NotAuthorized;
