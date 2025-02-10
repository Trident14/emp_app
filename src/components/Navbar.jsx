import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useCookies } from "react-cookie";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [cookies, , removeCookie] = useCookies(["token"]);

  const token = cookies['access_token'];


  // Function to handle logout
  const handleLogout = () => {
    navigate('/login-register'); 
    setTimeout(() => {
      removeCookie('access_token', { path: '/' }); 
      window.localStorage.removeItem('username'); 
    }, 100); 
  };

  // Function to handle navigation to a specific section or page
  const handleNavigation = (section) => {
    const currentPath = location.pathname;

    if (currentPath === "/" && section !== "home") {
      const target = document.getElementById(section);
      if (target) {
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    } else if (currentPath === "/") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      navigate("/");
      setTimeout(() => {
        const target = document.getElementById(section);
        if (target) {
          target.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }, 100);
    }
  };

  return (
    <nav className="fixed top-0 left-0 w-full bg-gray-950 text-white py-4 px-8 shadow-lg z-50">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold">
          <button
            onClick={() => handleNavigation("home")}
            className="hover:text-blue-400 transition"
          >
            Emp app
          </button>
        </h1>
        <ul className="hidden md:flex space-x-6">
          <li>
            <button
              onClick={() => handleNavigation("home")}
              className="hover:text-blue-400 transition"
            >
              Home
            </button>
          </li>

        </ul>
        <div>
          {token ? (
            <button
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-600 px-5 py-2 rounded-lg font-medium transition"
            >
              Logout
            </button>
          ) : (
            <button
              onClick={() => navigate("/login-register")}
              className="bg-blue-500 hover:bg-blue-600 px-5 py-2 rounded-lg font-medium transition"
            >
              Login / Register
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
