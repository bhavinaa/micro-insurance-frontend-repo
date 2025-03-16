import React, { useState } from "react";
import Swal from "sweetalert2";
import "./Login.css"; // Import CSS for styling

const Login = ({ setIsAuthenticated }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Set up default admin credentials in local storage if not already present
  if (!localStorage.getItem("adminUser")) {
    localStorage.setItem(
      "adminUser",
      JSON.stringify({ email: "admin@example.com", password: "qwerty" })
    );
  }

  const handleLogin = (e) => {
    e.preventDefault();
    const storedAdmin = JSON.parse(localStorage.getItem("adminUser"));

    if (storedAdmin && email === storedAdmin.email && password === storedAdmin.password) {
      localStorage.setItem("is_authenticated", "true");
      setIsAuthenticated(true);

      Swal.fire({
        icon: "success",
        title: "Login Successful!",
        text: "Welcome to the Microinsurance Admin Dashboard.",
        timer: 1500,
        showConfirmButton: false,
      });
    } else {
      Swal.fire({
        icon: "error",
        title: "Access Denied",
        text: "Invalid credentials. Only admin access is allowed.",
        confirmButtonText: "Retry",
      });
    }
  };

  return (
    <div className="login-container">
      {/* Notice: Localhost MVP Admin Access Only */}
      <div className="notice">
        <p>
          ⚠️ <strong>MVP Admin Access Only:</strong> This prototype runs on <strong>localhost</strong> without a backend. Future versions will integrate smart contracts for real-time insurance payouts.
        </p>
      </div>

      {/* About the Platform */}
      <div className="login-info">
        <h1>Microinsurance for Farmers</h1>
        <p>
          This platform provides affordable insurance coverage for farmers, helping them mitigate risks from crop failure, natural disasters, and market fluctuations.
        </p>
        <p>
          Our vision is to enable <strong>real-time insurance payouts</strong> based on <strong>weather data</strong> and <strong>blockchain smart contracts</strong>. 
          The current MVP allows <strong>admin access only</strong> for testing and configuration.
        </p>
      </div>

      {/* Admin Login Form */}
      <div className="login-box">
        <h2>Admin Login</h2>
        <form onSubmit={handleLogin}>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            placeholder="Enter admin email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            placeholder="Enter admin password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
