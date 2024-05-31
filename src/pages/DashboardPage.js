import React, { useState } from "react";
import axios from "axios";
import "./Dashboard.css";

function Dashboard() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleChangePassword = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);

    // Validate new password
    if (newPassword !== confirmNewPassword) {
      setError("New passwords do not match.");
      return;
    }

    // Get the JWT token from local storage
    const token = localStorage.getItem("token");

    // Send request to backend to compare passwords and update if valid
    try {
      const response = await axios.put(
        "http://localhost:5000/api/user/changepassword",
        {
          currentPassword,
          newPassword,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Include the token in the Authorization header
          },
        }
      );

      if (response.status === 200) {
        console.log("Password Changed Successfully");
        setSuccess(true);
      } else {
        setError("Failed to change password. Please try again.");
        console.log(setError)
      }
    } catch (error) {
      setError("Failed to change password. Please try again.");
    }
  };

  return (
    <div className="passwordchange">
      <form className="changepasswordform" action="">
        <h2>Change Password</h2>
        <div className="pass">
          {error && <div style={{ color: "red" }}>{error}</div>}
          {success && (
            <div style={{ color: "green" }}>Password changed successfully.</div>
          )}
          <div className="curpassword">
            <label htmlFor="currentPassword">Current Password: </label>
            <input
              type="password"
              id="currentPassword"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
            />
          </div>
          <div className="newpassword">
            <label htmlFor="newPassword">New Password: </label>
            <input
              type="password"
              id="newPassword"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </div>
          <div className="confpassword">
            <label htmlFor="confirmNewPassword">Re-enter Password:</label>
            <input
              type="password"
              id="confirmNewPassword"
              value={confirmNewPassword}
              onChange={(e) => setConfirmNewPassword(e.target.value)}
            />
          </div>
        </div>
        <button className="subbtn" onClick={handleChangePassword}>Change Password</button>
      </form>
    </div>
  );
}

export default Dashboard;
