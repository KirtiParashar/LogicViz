import React, { useState } from "react";
import "./Signup.css";
import axios from "axios";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function SignUpPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("Form data:", formData); // Log form data entered by the user
    try {
      const response = await axios.post(
        "http://localhost:5000/api/user",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.data) {
        // Redirect user to dashboard upon successful registration
        // Replace "/dashboard" with the actual route to the dashboard
        // window.location.href = "/dashboard";
        navigate("/login");
      } else {
        console.error("Failed to register user");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="signup_container">
      <form className="signup_form" onSubmit={handleSubmit}>
      <br />
      <br />
        <h2>Sign Up</h2>
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
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            minLength={8}
            required
          />
        </div>
        <div className="cpassword">
          <label htmlFor="cpassword">Confirm Password:</label>
          <input
            type="password"
            id="cpassword"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            minLength={8}
            required
          />
        </div>
        <button className="signup_btn" type="submit">
          Sign Up
        </button>
        <p>
          Have an account? <Link to="/login" style={{color: "black"}}>Login</Link> Here!
        </p>
      </form>
    </div>
  );
}

export default SignUpPage;
