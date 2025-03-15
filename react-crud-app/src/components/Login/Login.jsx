import React from "react";
import Notice from "./Notice";
import LoginInfo from "./LoginInfo";
import LoginForm from "./LoginForm";
import "./Login.css"; // Shared styling

const Login = ({ setIsAuthenticated }) => {
  return (
    <div className="login-container">
      {/* Banner */}
      <Notice />

      {/* Info Section */}
      <LoginInfo />

      {/* Form Section */}
      <LoginForm setIsAuthenticated={setIsAuthenticated} />
    </div>
  );
};

export default Login;
