// import React, { useState, useEffect } from 'react';
// import Swal from 'sweetalert2';

// import Header from './Header';
// import Table from './Table';
// import Add from './Add';
// import Edit from './Edit';

// import { employeesData } from '../../data';

// const Dashboard = ({ setIsAuthenticated }) => {
//   const [employees, setEmployees] = useState(employeesData);
//   const [selectedEmployee, setSelectedEmployee] = useState(null);
//   const [isAdding, setIsAdding] = useState(false);
//   const [isEditing, setIsEditing] = useState(false);

//   useEffect(() => {
//     const data = JSON.parse(localStorage.getItem('employees_data'));
//     if (data !== null && Object.keys(data).length !== 0) setEmployees(data);
//   }, []);

//   const handleEdit = id => {
//     const [employee] = employees.filter(employee => employee.id === id);

//     setSelectedEmployee(employee);
//     setIsEditing(true);
//   };

//   const handleDelete = id => {
//     Swal.fire({
//       icon: 'warning',
//       title: 'Are you sure?',
//       text: "You won't be able to revert this!",
//       showCancelButton: true,
//       confirmButtonText: 'Yes, delete it!',
//       cancelButtonText: 'No, cancel!',
//     }).then(result => {
//       if (result.value) {
//         const [employee] = employees.filter(employee => employee.id === id);

//         Swal.fire({
//           icon: 'success',
//           title: 'Deleted!',
//           text: `${employee.firstName} ${employee.lastName}'s data has been deleted.`,
//           showConfirmButton: false,
//           timer: 1500,
//         });

//         const employeesCopy = employees.filter(employee => employee.id !== id);
//         localStorage.setItem('employees_data', JSON.stringify(employeesCopy));
//         setEmployees(employeesCopy);
//       }
//     });
//   };

//   return (
//     <div className="container">
//       {!isAdding && !isEditing && (
//         <>
//           <Header
//             setIsAdding={setIsAdding}
//             setIsAuthenticated={setIsAuthenticated}
//           />
//           <Table
//             employees={employees}
//             handleEdit={handleEdit}
//             handleDelete={handleDelete}
//           />
//         </>
//       )}
//       {isAdding && (
//         <Add
//           employees={employees}
//           setEmployees={setEmployees}
//           setIsAdding={setIsAdding}
//         />
//       )}
//       {isEditing && (
//         <Edit
//           employees={employees}
//           selectedEmployee={selectedEmployee}
//           setEmployees={setEmployees}
//           setIsEditing={setIsEditing}
//         />
//       )}
//     </div>
//   );
// };

// export default Dashboard;


import React, { useState, useEffect } from "react";
import "./App.css"; // Optional: Create your own CSS or remove this import

function App() {
  const [policies, setPolicies] = useState([]);
  const [menu, setMenu] = useState("read");

  // Fetch all policies from the Fabric network via the Go API
  const fetchPoliciesHandler = async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/query?channelid=mychannel&chaincodeid=basic&function=GetAllInsurancePolicys&_=${Date.now()}`
      );
      if (!response.ok) {
        throw new Error(`Fetch failed: ${response.status}`);
      }

      const text = await response.text();
      // The response might include "Response: " prefix; remove it
      const jsonData = text.replace("Response: ", "");
      const data = JSON.parse(jsonData);

      setPolicies(data);
    } catch (error) {
      console.error("Error fetching policies:", error);
      alert("Failed to fetch policies. Check server connection.");
    }
  };

  // On initial load, fetch the policies
  useEffect(() => {
    fetchPoliciesHandler();
  }, []);

  useEffect(() => {
    if (menu === 'read') {
      fetchPoliciesHandler();
    }
  }, [menu]);

  // Renders a simple menu to switch between CRUD operations
  return (
    <div className="app-container" style={{ padding: "20px", color: "white", backgroundColor: "#333", minHeight: "100vh" }}>
      <h1 style={{ color: "#4ade80", marginBottom: "20px" }}>
        Microinsurance Dashboard (Hyperledger Fabric)
      </h1>

      <nav style={{ marginBottom: "20px" }}>
        {["create", "read", "update", "delete"].map((item) => (
          <button
            key={item}
            onClick={() => setMenu(item)}
            style={{
              marginRight: "10px",
              padding: "8px 14px",
              borderRadius: "5px",
              backgroundColor: menu === item ? "#2563eb" : "#555",
              color: "white",
              border: "none",
              cursor: "pointer",
            }}
          >
            {item.charAt(0).toUpperCase() + item.slice(1)} Policy
          </button>
        ))}
      </nav>

      {menu === "create" && (
        <CreatePolicy
          onPolicyCreated={fetchPoliciesHandler}
        />
      )}
      {menu === "read" && (
        <ReadPolicies
          policies={policies}
        />
      )}
      {menu === "update" && (
        <UpdatePolicy
          onPolicyUpdated={fetchPoliciesHandler}
        />
      )}
      {menu === "delete" && (
        <DeletePolicy
          onPolicyDeleted={fetchPoliciesHandler}
        />
      )}
    </div>
  );
}

/* ---------------------------------------
   1) READ COMPONENT
--------------------------------------- */
function ReadPolicies({ policies }) {
  if (!policies || policies.length === 0) {
    return <p>No policies found.</p>;
  }

  return (
    <div style={{ maxWidth: "100%", overflowX: "auto" }}>
      <h2 style={{ color: "#93c5fd", marginBottom: "10px" }}>
        All Insurance Policies
      </h2>
      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          backgroundColor: "#444",
        }}
      >
        <thead>
          <tr style={{ backgroundColor: "#555" }}>
            <th style={thStyle}>Policy ID</th>
            <th style={thStyle}>Farmer ID</th>
            <th style={thStyle}>Farmer Name</th>
            <th style={thStyle}>Plan Name</th>
            <th style={thStyle}>Condition</th>
            <th style={thStyle}>Coverage</th>
            <th style={thStyle}>Payout</th>
            <th style={thStyle}>Premium</th>
            <th style={thStyle}>Status</th>
          </tr>
        </thead>
        <tbody>
        {policies.map((policy, index) => (
            <tr key={policy.policyID || index} style={{ backgroundColor: index % 2 === 0 ? "#555" : "#666" }}>
              <td>{policy.policyID}</td>
              <td>{policy.farmerID}</td>
              <td>{policy.farmerName}</td>
              <td>{policy.planName}</td>
              <td>{policy.condition}</td>
              <td>{policy.coverageAmount}</td>
              <td>{policy.payoutAmount}</td>
              <td>{policy.premiumAmount}</td>
              <td>{policy.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/* ---------------------------------------
   2) CREATE COMPONENT
--------------------------------------- */


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
    status: "active", // default
  });

  // We might want coverageAmount, payoutAmount, premiumAmount to be numeric
  // or date fields if your chaincode expects a date

  // If you want a date, do a separate field like "startDate" with type="date"

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Optional: Basic validation
    if (!form.policyID.trim()) {
      return alert("Policy ID is required.");
    }
    if (isNaN(+form.coverageAmount)) {
      return alert("Coverage amount must be a valid number.");
    }
    // etc. for other fields

    // We build the formData for x-www-form-urlencoded approach
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
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body: formData.toString(),
        }
      );

      const text = await response.text();
      console.log("Create Policy Response:", text);

      // check chaincode error
      if (!response.ok || text.includes("Error endorsing txn") || text.toLowerCase().includes("error")) {
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
    <div style={containerStyle}>
      <h2 style={{ color: "#93c5fd", marginBottom: "10px" }}>Create New Policy</h2>
      <form onSubmit={handleSubmit} style={{ display: "grid", gap: "10px" }}>
        {/* Policy ID */}
        <div style={fieldStyle}>
          <label>Policy ID:</label>
          <input
            type="text"
            name="policyID"
            value={form.policyID}
            onChange={handleChange}
            placeholder="Enter a unique policy ID"
          />
        </div>

        {/* Farmer ID */}
        <div style={fieldStyle}>
          <label>Farmer ID:</label>
          <input
            type="text"
            name="farmerID"
            value={form.farmerID}
            onChange={handleChange}
            placeholder="farmer123"
          />
        </div>

        {/* Farmer Name */}
        <div style={fieldStyle}>
          <label>Farmer Name:</label>
          <input
            type="text"
            name="farmerName"
            value={form.farmerName}
            onChange={handleChange}
            placeholder="Alice"
          />
        </div>

        {/* Plan Name */}
        <div style={fieldStyle}>
          <label>Plan Name:</label>
          <input
            type="text"
            name="planName"
            value={form.planName}
            onChange={handleChange}
            placeholder="Basic Plan"
          />
        </div>

        {/* Condition */}
        <div style={fieldStyle}>
          <label>Condition:</label>
          <input
            type="text"
            name="condition"
            value={form.condition}
            onChange={handleChange}
            placeholder="drought/insects/flood"
          />
        </div>

        {/* Coverage Amount (number) */}
        <div style={fieldStyle}>
          <label>Coverage Amount:</label>
          <input
            type="number" // ensures numeric input
            name="coverageAmount"
            value={form.coverageAmount}
            onChange={handleChange}
            placeholder="10000"
          />
        </div>

        {/* Payout Amount (number) */}
        <div style={fieldStyle}>
          <label>Payout Amount:</label>
          <input
            type="number"
            name="payoutAmount"
            value={form.payoutAmount}
            onChange={handleChange}
            placeholder="5000"
          />
        </div>

        {/* Premium Amount (number) */}
        <div style={fieldStyle}>
          <label>Premium Amount:</label>
          <input
            type="number"
            name="premiumAmount"
            value={form.premiumAmount}
            onChange={handleChange}
            placeholder="200"
          />
        </div>

        {/* Status (Dropdown) */}
        <div style={fieldStyle}>
          <label>Status:</label>
          <select name="status" value={form.status} onChange={handleChange}>
            <option value="active">active</option>
            <option value="expired">expired</option>
            <option value="claimed">claimed</option>
          </select>
        </div>

        <button type="submit" style={buttonStyle}>
          Create Policy
        </button>
      </form>
    </div>
  );
}

/* Example minimal styling: */

const containerStyle = {
  backgroundColor: "#444",
  padding: "20px",
  borderRadius: "8px",
  maxWidth: "600px",
};

const fieldStyle = {
  display: "flex",
  flexDirection: "column",
};


/* ---------------------------------------
   3) UPDATE COMPONENT
--------------------------------------- */
function UpdatePolicy({ onPolicyUpdated }) {
  const [policyID, setPolicyID] = useState("");
  const [newStatus, setNewStatus] = useState("");

  // PUT request to update existing policy
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // We'll call the /invoke?function=UpdateInsurancePolicy
      const response = await fetch(
        `http://localhost:3000/invoke?channelid=mychannel&chaincodeid=basic&function=UpdateInsurancePolicy`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            // chaincode expects an array of arguments
            args: [policyID, newStatus],
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update policy.");
      }
      const text = await response.text();
      console.log("Policy Updated:", text);

      alert(`Policy "${policyID}" Updated to status: ${newStatus}`);
      onPolicyUpdated(); // refresh policies
      setPolicyID("");
      setNewStatus("");
    } catch (error) {
      console.error("Error updating policy:", error);
      alert("Error updating policy. Check console.");
    }
  };

  return (
    <div
      style={{
        backgroundColor: "#444",
        padding: "20px",
        borderRadius: "8px",
        maxWidth: "600px",
      }}
    >
      <h2 style={{ color: "#93c5fd", marginBottom: "10px" }}>Update Policy Status</h2>
      <form onSubmit={handleSubmit} style={{ display: "grid", gap: "10px" }}>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <label>Policy ID:</label>
          <input
            type="text"
            value={policyID}
            onChange={(e) => setPolicyID(e.target.value)}
            style={inputStyle}
          />
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <label>New Status:</label>
          <input
            type="text"
            value={newStatus}
            onChange={(e) => setNewStatus(e.target.value)}
            style={inputStyle}
          />
        </div>
        <button type="submit" style={buttonStyle}>
          Update
        </button>
      </form>
    </div>
  );
}

/* ---------------------------------------
   4) DELETE COMPONENT
--------------------------------------- */
function DeletePolicy({ onPolicyDeleted }) {
  const [policyID, setPolicyID] = useState("");

  const handleDelete = async () => {
    if (!policyID.trim()) {
      alert("Please enter a policy ID.");
      return;
    }

    try {
      // The key is to put &args=<policyID> in the URL
      const url = `http://localhost:3000/invoke?channelid=mychannel&chaincodeid=basic&function=DeleteInsurancePolicy&args=${policyID}`;
      const response = await fetch(url, {
        method: "DELETE",
      });

      const text = await response.text();
      console.log("Delete Response:", text);

      // Check for chaincode error in the response text
      if (!response.ok || text.includes("Error endorsing txn") || text.toLowerCase().includes("error")) {
        alert("Chaincode Error:\n" + text);
        return;
      }

      alert(`Policy "${policyID}" Deleted Successfully!\n${text}`);

      // Optionally refresh the list in the parent
      if (onPolicyDeleted) {
        onPolicyDeleted();
      }

      // Clear the input
      setPolicyID("");
    } catch (error) {
      console.error("Error deleting policy:", error);
      alert("Error deleting policy. Check console logs.");
    }
  };

  return (
    <div style={deleteStyle}>
      <h2 style={{ color: "#93c5fd", marginBottom: "10px" }}>Delete Policy</h2>
      <div style={{ marginBottom: "10px" }}>
        <label style={{ display: "block", marginBottom: "4px" }}>Policy ID:</label>
        <input
          type="text"
          value={policyID}
          onChange={(e) => setPolicyID(e.target.value)}
          style={{
            padding: "8px",
            borderRadius: "4px",
            border: "1px solid #ccc",
            marginBottom: "4px",
            width: "200px",
          }}
        />
      </div>
      <button
        onClick={handleDelete}
        style={{
          padding: "10px 20px",
          borderRadius: "5px",
          backgroundColor: "#dc2626", // red
          color: "white",
          border: "none",
          cursor: "pointer",
        }}
      >
        Delete Policy
      </button>
    </div>
  );
}

const deleteStyle = {
  backgroundColor: "#444",
  padding: "20px",
  borderRadius: "8px",
  maxWidth: "400px",
};




/* ---------------------------------------
   STYLES
--------------------------------------- */

const thStyle = {
  padding: "8px",
  borderBottom: "1px solid #777",
  textAlign: "left",
};

const tdStyle = {
  padding: "8px",
  borderBottom: "1px solid #777",
};

const inputStyle = {
  padding: "8px",
  borderRadius: "4px",
  border: "1px solid #ccc",
  marginBottom: "4px",
};

const buttonStyle = {
  padding: "10px 20px",
  borderRadius: "5px",
  backgroundColor: "#2563eb",
  color: "white",
  border: "none",
  cursor: "pointer",
};

export default App;
