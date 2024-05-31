import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./Login.css";

function LoginPage() {
  const navigate = useNavigate();
  // State variables to store form data
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  // Function to handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();

    // Send login credentials to the backend
    try {
      const response = await axios.post(
        "http://localhost:5000/api/user/login",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      // Check if login was successful (assuming the backend returns a token)
      const { token } = response.data;
      if (token) {
        console.log(token);
        // Store the token in local storage or cookies for authentication
        localStorage.setItem("token", token);

        // Redirect user to dashboard upon successful login
        // Replace "/dashboard" with the actual route to the dashboard
        navigate("/");
      } else {
        console.error("Login failed: Invalid credentials");
      }
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  // Function to update form data as user types
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <div className="login_container">
      {/* Login form */}
      <form onSubmit={handleSubmit}>
        <br />
        <br />
        <h2>Login</h2>
        <br />
        <br />
        <div className="email">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="password">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <button className="login_btn" type="submit">
          Login
        </button>
        <p>
          New User?{" "}
          <Link to="/signup" style={{ color: "black" }}>
            Sign Up
          </Link>{" "}
          Now!
        </p>
      </form>
    </div>
  );
}

export default LoginPage;
