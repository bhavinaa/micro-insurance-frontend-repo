import React, { useState } from "react";
import Swal from "sweetalert2";

const LoginForm = ({ setIsAuthenticated }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Ensure default admin user is in localStorage
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
  );
};

export default LoginForm;
