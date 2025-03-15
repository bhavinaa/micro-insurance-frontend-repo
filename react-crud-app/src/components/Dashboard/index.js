import React, { useState, useEffect } from "react";
import Login from "../Login";
import ReadPolicies from "../Policies/ReadPolicy";
import CreatePolicy from "../Policies/CreatePolicy";
import UpdatePolicy from "../Policies/UpdatePolicy";
import DeletePolicy from "../Policies/DeletePolicy";
import Analytics from "./Analytics"; // Ensure Analytics is imported
import "../theme.css"; // Import external styles

export default function App() {
  // Track authentication in state
  const [isAuthenticated, setIsAuthenticated] = useState(
    localStorage.getItem("is_authenticated") === "true"
  );

  const [policies, setPolicies] = useState([]);
  const [menu, setMenu] = useState("read");

  // Fetch policies from blockchain network
  const fetchPoliciesHandler = async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/query?channelid=mychannel&chaincodeid=basic&function=GetAllInsurancePolicys&_=${Date.now()}`
      );
      if (!response.ok) throw new Error(`Fetch failed: ${response.status}`);

      const text = await response.text();
      const jsonData = text.replace("Response: ", "");
      const data = JSON.parse(jsonData);
      setPolicies(data);
    } catch (error) {
      console.error("Error fetching policies:", error);
      alert("Failed to fetch policies. Check server connection.");
    }
  };

  // Fetch policies on component mount
  useEffect(() => {
    fetchPoliciesHandler();
  }, []);

  // Refetch when menu switches to "read"
  useEffect(() => {
    if (menu === "read") fetchPoliciesHandler();
  }, [menu]);

  // Logout function
  const handleLogout = () => {
    localStorage.removeItem("is_authenticated");
    setIsAuthenticated(false);
  };

  // If not authenticated, show the login screen
  if (!isAuthenticated) {
    return <Login setIsAuthenticated={setIsAuthenticated} />;
  }

  const menuItems = ["create", "read", "update", "delete", "analytics"];

  return (
    <div className="pageWrapper">
      {/* Header with Logout Button */}
      <header className="header">
        <h1 className="title">Microinsurance Dashboard</h1>
        <p className="subtitle">Powered by Hyperledger Fabric</p>
        <p className="subtitle1">made by Bhavina SK</p>
        <button onClick={handleLogout} className="logoutButton">Logout</button>
      </header>

      {/* Navigation */}
      <nav className="navBar">
        {menuItems.map((item) => (
          <button
            key={item}
            onClick={() => setMenu(item)}
            className={`navButton ${menu === item ? "active" : ""}`}
          >
            {item.charAt(0).toUpperCase() + item.slice(1)}
          </button>
        ))}
      </nav>

      {/* Main container */}
      <div className="container">
        {menu === "create" && <CreatePolicy onPolicyCreated={fetchPoliciesHandler} />}
        {menu === "read" && <ReadPolicies policies={policies} />}
        {menu === "update" && <UpdatePolicy onPolicyUpdated={fetchPoliciesHandler} />}
        {menu === "delete" && <DeletePolicy onPolicyDeleted={fetchPoliciesHandler} />}
        {menu === "analytics" && <Analytics policies={policies} />}
      </div>
    </div>
  );
}
