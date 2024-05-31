import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import PersonIcon from "@mui/icons-material/Person";
import "./Header.css";

function Header() {
  const [menuOpen, setMenuOpen] = useState(false); // State to track menu visibility
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    // Add event listener to close menu when clicked outside
    function handleClickOutside(event) {
      if (menuOpen && !event.target.closest(".dropdown-menu")) {
        setMenuOpen(false);
      }
    }

    // Add event listener when component mounts
    document.addEventListener("mousedown", handleClickOutside);
    
    // Clean up event listener when component unmounts
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuOpen]);

  // Function to handle logout
  const handleLogout = () => {
    // Remove token from local storage
    localStorage.removeItem("token");
    // Close the menu
    setMenuOpen(false);
    // Redirect user to login page
    navigate("/login");
  };

  return (
    <div className="header">
      <div className="r1">
        <h1>LogicViz</h1>
      </div>
      <div className="r2">
        <ul>
          {/* Links to different pages */}
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/dashboard">Dashboard</Link>
          </li>
          <li>
            {/* Toggle menu visibility when PersonIcon is clicked */}
            {token ? (
              <PersonIcon
                style={{ color: "white", cursor: "pointer" }}
                onClick={() => setMenuOpen(!menuOpen)}
              />
            ) : (
              <Link to="/login">Sign In</Link>
            )}
            {/* Render menu if menuOpen is true */}
            {menuOpen && (
              <ul className="dropdown-menu">
                {/* Logout button */}
                <li className="listitem">
                  <button onClick={handleLogout}>Logout</button>
                </li>
              </ul>
            )}
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Header;
