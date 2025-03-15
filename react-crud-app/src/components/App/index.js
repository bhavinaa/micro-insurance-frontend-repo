
import React, { useState, useEffect } from "react";
import Login from "../Login";
import Dashboard from "../Dashboard";

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check if the user is already logged in when the app loads
  useEffect(() => {
    const authStatus = localStorage.getItem("is_authenticated");
    if (authStatus === "true") {
      setIsAuthenticated(true);
    }
  }, []);

  return (
    <div>
      {isAuthenticated ? (
        <Dashboard setIsAuthenticated={setIsAuthenticated} />
      ) : (
        <Login setIsAuthenticated={setIsAuthenticated} />
      )}
    </div>
  );
}
