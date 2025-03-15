import { useState } from "react";
import "../theme.css";

function UpdatePolicy({ onPolicyUpdated }) {
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
    <div className="crudWrapper">
      <h2 className="sectionTitle">Update Policy Status</h2>
      <form onSubmit={handleSubmit} className="formGrid">
        {/* Policy ID */}
        <div className="formGroup">
          <label className="label">Policy ID:</label>
          <input
            type="text"
            value={policyID}
            onChange={(e) => setPolicyID(e.target.value)}
            placeholder="Enter Policy ID"
            className="input"
          />
        </div>

        {/* New Status */}
        <div className="formGroup">
          <label className="label">New Status:</label>
          <input
            type="text"
            value={newStatus}
            onChange={(e) => setNewStatus(e.target.value)}
            placeholder="active, expired, claimed..."
            className="input"
          />
        </div>

        <button type="submit" className="primaryButton">
          Update
        </button>
      </form>
    </div>
  );
}

export default UpdatePolicy;
