import React, { useState, useEffect } from "react";
import Login from "../Login";
// =====================
// 1) THE APP COMPONENT
// =====================
export default function App() {
  // Track authentication in state
  const [isAuthenticated, setIsAuthenticated] = useState(
    localStorage.getItem("is_authenticated") === "true"
  );

  // The rest of your state
  const [policies, setPolicies] = useState([]);
  const [menu, setMenu] = useState("read");

  // -- 1) On mount, optionally re-check or do nothing if we trust localStorage
  //        This is optional, because we already read from localStorage in useState.

  // -- 2) The fetch function
  const fetchPoliciesHandler = async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/query?channelid=mychannel&chaincodeid=basic&function=GetAllInsurancePolicys&_=${Date.now()}`
      );
      if (!response.ok) {
        throw new Error(`Fetch failed: ${response.status}`);
      }
      const text = await response.text();
      const jsonData = text.replace("Response: ", "");
      const data = JSON.parse(jsonData);
      setPolicies(data);
    } catch (error) {
      console.error("Error fetching policies:", error);
      alert("Failed to fetch policies. Check server connection.");
    }
  };

  // On initial load
  useEffect(() => {
    fetchPoliciesHandler();
  }, []);

  // If we switch to "read" again, re-fetch
  useEffect(() => {
    if (menu === "read") {
      fetchPoliciesHandler();
    }
  }, [menu]);

  // 3) A simple logout function (removes auth status)
  const handleLogout = () => {
    localStorage.removeItem("is_authenticated");
    setIsAuthenticated(false);
  };

  // 4) If NOT authenticated, show a simple login (or your real <Login />)
  if (!isAuthenticated) {
    return <Login setIsAuthenticated={setIsAuthenticated} />;
  }

  // 5) Otherwise, show the main dashboard UI with a logout button
  const menuItems = ["create", "read", "update", "delete", "analytics"];

  return (
    <div style={styles.pageWrapper}>
      {/* Header with Logout Button */}
      <header style={styles.header}>
        <h1 style={styles.title}>Microinsurance Dashboard</h1>
        <p style={styles.subtitle}>Powered by Hyperledger Fabric</p>
        <p style={styles.subtitle1}>made by bhavina SK</p>

        {/* Only show logout button if authenticated */}
        <button onClick={handleLogout} style={styles.logoutButton}>
          Logout
        </button>
      </header>

      {/* Navigation */}
      <nav style={styles.navBar}>
        {menuItems.map((item) => (
          <button
            key={item}
            onClick={() => setMenu(item)}
            style={{
              ...styles.navButton,
              backgroundColor: menu === item ? "#8e44ad" : "#bfa3cf",
            }}
          >
            {item.charAt(0).toUpperCase() + item.slice(1)}
          </button>
        ))}
      </nav>

      {/* Main container */}
      <div style={styles.container}>
        {menu === "create" && <CreatePolicy onPolicyCreated={fetchPoliciesHandler} />}
        {menu === "read" && <ReadPolicies policies={policies} />}
        {menu === "update" && <UpdatePolicy onPolicyUpdated={fetchPoliciesHandler} />}
        {menu === "delete" && <DeletePolicy onPolicyDeleted={fetchPoliciesHandler} />}
        {menu === "analytics" && <Analytics policies={policies} />}
      </div>
    </div>
  );
}

// ===========================
// 2) A SIMPLE LOGIN COMPONENT
// ===========================




// (The rest of your code: Dashboard snippet or embedded create/read/update/delete...)


// =====================
// 3) ANALYTICS COMPONENT
// =====================
function Analytics({ policies }) {
  // ... same as your original
  // (No changes needed)
  const [weatherData] = useState({
    location: "NUS Farm District",
    temperature: 29,
    condition: "Sunny",
    chanceOfRain: 15,
  });

  const totalPolicies = policies.length;
  const numericCoverage = policies.map((p) => Number(p.coverageAmount) || 0);
  const totalCoverage = numericCoverage.reduce((sum, val) => sum + val, 0);
  const activeCount = policies.filter((p) => p.status === "active").length;
  const expiredCount = policies.filter((p) => p.status === "expired").length;

  return (
    <div style={styles.analyticsWrapper}>
      <h2 style={styles.sectionTitle}>Analytics & Weather</h2>
      <div style={styles.analyticsCards}>
        <div style={styles.analyticsCard}>
          <h3 style={styles.cardHeading}>Current Weather</h3>
          <p style={styles.cardLine}>Location: {weatherData.location}</p>
          <p style={styles.cardLine}>
            Temperature: {weatherData.temperature}°C
          </p>
          <p style={styles.cardLine}>Condition: {weatherData.condition}</p>
          <p style={styles.cardLine}>
            Chance of Rain: {weatherData.chanceOfRain}%
          </p>
        </div>
        <div style={styles.analyticsCard}>
          <h3 style={styles.cardHeading}>Policy Stats</h3>
          <p style={styles.cardLine}>Total Policies: {totalPolicies}</p>
          <p style={styles.cardLine}>Active: {activeCount}</p>
          <p style={styles.cardLine}>Expired: {expiredCount}</p>
          <p style={styles.cardLine}>
            Coverage: ${totalCoverage.toLocaleString()}
          </p>
        </div>
      </div>
      <p style={styles.note}>
        <strong>Note:</strong> Weather data is mocked; stats are computed from
        loaded policies. Integrate a real weather API or additional analytics for
        deeper insights!
      </p>
    </div>
  );
}

// =====================
// 4) READPOLICIES ...
// =====================
function ReadPolicies({ policies }) {
  if (!policies || policies.length === 0) {
    return <p style={styles.noData}>No policies found.</p>;
  }
  return (
    <div style={styles.crudWrapper}>
      <h2 style={styles.sectionTitle}>All Insurance Policies</h2>
      <div style={styles.responsiveTableWrapper}>
        <table style={styles.table}>
          <thead>
            <tr style={styles.tableHeadRow}>
              <th style={styles.th}>Policy ID</th>
              <th style={styles.th}>Farmer ID</th>
              <th style={styles.th}>Farmer Name</th>
              <th style={styles.th}>Plan Name</th>
              <th style={styles.th}>Condition</th>
              <th style={styles.th}>Coverage</th>
              <th style={styles.th}>Payout</th>
              <th style={styles.th}>Premium</th>
              <th style={styles.th}>Status</th>
            </tr>
          </thead>
          <tbody>
            {policies.map((policy, index) => (
              <tr
                key={policy.policyID || index}
                style={{
                  backgroundColor: index % 2 === 0 ? "#f5f5f5" : "white",
                }}
              >
                <td style={styles.td}>{policy.policyID}</td>
                <td style={styles.td}>{policy.farmerID}</td>
                <td style={styles.td}>{policy.farmerName}</td>
                <td style={styles.td}>{policy.planName}</td>
                <td style={styles.td}>{policy.condition}</td>
                <td style={styles.td}>{policy.coverageAmount}</td>
                <td style={styles.td}>{policy.payoutAmount}</td>
                <td style={styles.td}>{policy.premiumAmount}</td>
                <td style={styles.td}>{policy.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// =====================
// 5) CREATEPOLICY ...
// =====================
function CreatePolicy({ onPolicyCreated }) {
  const [form, setForm] = useState({
    policyID: "",
    farmerID: "",
    farmerName: "",
    planName: "",
    condition: "",
    coverageAmount: "",
    payoutAmount: "",
    premiumAmount: "",
    status: "active",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.policyID.trim()) {
      return alert("Policy ID is required.");
    }
    if (isNaN(+form.coverageAmount)) {
      return alert("Coverage amount must be a valid number.");
    }

    const formData = new URLSearchParams();
    formData.append("args", form.policyID);
    formData.append("args", form.farmerID);
    formData.append("args", form.farmerName);
    formData.append("args", form.planName);
    formData.append("args", form.condition);
    formData.append("args", form.coverageAmount);
    formData.append("args", form.payoutAmount);
    formData.append("args", form.premiumAmount);
    formData.append("args", form.status);

    try {
      const response = await fetch(
        "http://localhost:3000/invoke?channelid=mychannel&chaincodeid=basic&function=CreateInsurancePolicy",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: formData.toString(),
        }
      );
      const text = await response.text();
      console.log("Create Policy Response:", text);

      if (
        !response.ok ||
        text.includes("Error endorsing txn") ||
        text.toLowerCase().includes("error")
      ) {
        alert("Chaincode Error:\n" + text);
        return;
      }
      alert("Policy created successfully!\n" + text);
      if (onPolicyCreated) onPolicyCreated();

      // reset
      setForm({
        policyID: "",
        farmerID: "",
        farmerName: "",
        planName: "",
        condition: "",
        coverageAmount: "",
        payoutAmount: "",
        premiumAmount: "",
        status: "active",
      });
    } catch (error) {
      console.error("Error creating policy:", error);
      alert("Error creating policy. See console.");
    }
  };

  return (
    <div style={styles.crudWrapper}>
      <h2 style={styles.sectionTitle}>Create New Policy</h2>
      <form onSubmit={handleSubmit} style={styles.formGrid}>
        {/* ...same fields as your code... */}
        <div style={styles.formGroup}>
          <label style={styles.label}>Policy ID:</label>
          <input
            type="text"
            name="policyID"
            value={form.policyID}
            onChange={handleChange}
            placeholder="unique policy ID"
            style={styles.input}
          />
        </div>
        {/* ...and so on for the rest of the fields... */}

        <button type="submit" style={styles.primaryButton}>
          Create
        </button>
      </form>
    </div>
  );
}

// =====================
// 6) UPDATEPOLICY ...
// =====================
function UpdatePolicy({ onPolicyUpdated }) {
  // ... same as your original ...
  // no changes needed for the logout logic

  const [policyID, setPolicyID] = useState("");
  const [newStatus, setNewStatus] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `http://localhost:3000/invoke?channelid=mychannel&chaincodeid=basic&function=UpdateInsurancePolicy`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ args: [policyID, newStatus] }),
        }
      );
      if (!response.ok) throw new Error("Failed to update policy.");
      const text = await response.text();
      console.log("Policy Updated:", text);
      alert(`Policy "${policyID}" Updated to: ${newStatus}`);
      onPolicyUpdated();
      setPolicyID("");
      setNewStatus("");
    } catch (error) {
      console.error("Error updating policy:", error);
      alert("Error updating policy.");
    }
  };

  return (
    <div style={styles.crudWrapper}>
      <h2 style={styles.sectionTitle}>Update Policy Status</h2>
      <form onSubmit={handleSubmit} style={styles.formGrid}>
        {/* same code as yours */}
        <div style={styles.formGroup}>
          <label style={styles.label}>Policy ID:</label>
          <input
            type="text"
            value={policyID}
            onChange={(e) => setPolicyID(e.target.value)}
            style={styles.input}
            placeholder="Policy ID"
          />
        </div>
        <div style={styles.formGroup}>
          <label style={styles.label}>New Status:</label>
          <input
            type="text"
            value={newStatus}
            onChange={(e) => setNewStatus(e.target.value)}
            style={styles.input}
            placeholder="active, expired, claimed..."
          />
        </div>
        <button type="submit" style={styles.primaryButton}>
          Update
        </button>
      </form>
    </div>
  );
}

// =====================
// 7) DELETEPOLICY ...
// =====================
function DeletePolicy({ onPolicyDeleted }) {
  // same as your original
  // no changes needed for the logout logic
  const [policyID, setPolicyID] = useState("");

  const handleDelete = async () => {
    if (!policyID.trim()) {
      alert("Enter a policy ID first.");
      return;
    }
    try {
      const url = `http://localhost:3000/invoke?channelid=mychannel&chaincodeid=basic&function=DeleteInsurancePolicy&args=${policyID}`;
      const response = await fetch(url, { method: "DELETE" });
      const text = await response.text();
      console.log("Delete Response:", text);
      if (
        !response.ok ||
        text.includes("Error endorsing txn") ||
        text.toLowerCase().includes("error")
      ) {
        alert("Chaincode Error:\n" + text);
        return;
      }
      alert(`Policy "${policyID}" Deleted Successfully!\n${text}`);
      if (onPolicyDeleted) onPolicyDeleted();
      setPolicyID("");
    } catch (error) {
      console.error("Error deleting policy:", error);
      alert("Error deleting policy.");
    }
  };

  return (
    <div style={styles.crudWrapper}>
      <h2 style={styles.sectionTitle}>Delete Policy</h2>
      <div style={styles.formGroup}>
        <label style={styles.label}>Policy ID:</label>
        <input
          type="text"
          value={policyID}
          onChange={(e) => setPolicyID(e.target.value)}
          placeholder="Policy ID"
          style={styles.input}
        />
      </div>
      <button
        onClick={handleDelete}
        style={{ ...styles.primaryButton, backgroundColor: "#e74c3c" }}
      >
        Delete
      </button>
    </div>
  );
}

// =====================
// 8) STYLES
// =====================
const styles = {
  pageWrapper: {
    fontFamily: '"Segoe UI", Roboto, sans-serif',
    backgroundColor: "#f8f9fa",
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center", // to center the header's logout button
  },
  header: {
    backgroundColor: "#D7BCE8",
    padding: "1.5rem",
    textAlign: "center",
    width: "100%",
    position: "relative",
  },
  title: { margin: 0, fontSize: "2rem", color: "#3b1456" },
  subtitle: { marginTop: "0.5rem", color: "#5e366a", fontWeight: "400" },
  subtitle1: { marginTop: "0.2rem", color: "#5e366a", fontWeight: "300" },
  logoutButton: {
    position: "absolute",
    top: "1.2rem",
    right: "2rem",
    padding: "8px 16px",
    border: "none",
    borderRadius: "4px",
    backgroundColor: "#e74c3c",
    color: "#fff",
    cursor: "pointer",
    fontSize: "1rem",
  },
  navBar: {
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap",
    gap: "0.5rem",
    backgroundColor: "#e9d6f2",
    padding: "0.75rem",
    width: "100%",
  },
  navButton: {
    cursor: "pointer",
    border: "none",
    borderRadius: "4px",
    padding: "0.5rem 1rem",
    color: "#fff",
    fontWeight: "500",
    minWidth: "80px",
  },
  container: {
    maxWidth: "1200px",
    width: "100%",
    margin: "1rem auto",
    padding: "1rem",
  },
  sectionTitle: {
    fontSize: "1.5rem",
    marginBottom: "1rem",
    color: "#3b1456",
    textAlign: "center",
  },
  noData: {
    textAlign: "center",
    fontStyle: "italic",
    marginTop: "2rem",
  },
  responsiveTableWrapper: {
    width: "100%",
    overflowX: "auto",
    boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
    borderRadius: "6px",
    backgroundColor: "#fff",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    minWidth: "600px",
  },
  tableHeadRow: { backgroundColor: "#ccc" },
  th: {
    padding: "12px",
    textAlign: "left",
    backgroundColor: "#e5e5e5",
    borderBottom: "2px solid #ddd",
  },
  td: { padding: "12px", borderBottom: "1px solid #ddd" },
  /* CRUD forms */
  crudWrapper: {
    backgroundColor: "#fff",
    padding: "1rem",
    borderRadius: "8px",
    boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
  },
  formGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "1rem",
  },
  formGroup: {
    display: "flex",
    flexDirection: "column",
  },
  label: { marginBottom: "0.25rem", fontWeight: "500", color: "#2d2d2d" },
  input: {
    padding: "0.5rem",
    borderRadius: "4px",
    border: "1px solid #ccc",
  },
  primaryButton: {
    gridColumn: "span 2",
    padding: "0.75rem 1.5rem",
    backgroundColor: "#8e44ad",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    fontWeight: "500",
    justifySelf: "center",
  },
  /* Analytics */
  analyticsWrapper: {
    backgroundColor: "#fff",
    padding: "1rem",
    borderRadius: "8px",
    boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
  },
  analyticsCards: {
    display: "flex",
    flexWrap: "wrap",
    gap: "1rem",
    justifyContent: "center",
  },
  analyticsCard: {
    backgroundColor: "#fefefe",
    border: "1px solid #ddd",
    borderRadius: "6px",
    padding: "1rem",
    minWidth: "200px",
    flex: "1 1 200px",
  },
  cardHeading: {
    marginTop: 0,
    marginBottom: "0.5rem",
    fontSize: "1.1rem",
    color: "#3b1456",
  },
  cardLine: { margin: "0.25rem 0", color: "#444" },
  note: {
    marginTop: "1rem",
    color: "#666",
    fontSize: "0.95rem",
    lineHeight: "1.4",
  },

  /* Simple login container styles */
  loginContainer: {
    backgroundColor: "#fff",
    padding: "2rem",
    borderRadius: "8px",
    boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
    marginTop: "3rem",
  },
  loginForm: {
    display: "grid",
    gap: "1rem",
  },

  /* Media queries for better responsiveness */
  "@media (maxWidth: 600px)": {
    formGrid: {
      gridTemplateColumns: "1fr !important",
    },
    container: {
      padding: "0.5rem",
    },
    navBar: {
      flexDirection: "column",
    },
  },
};
