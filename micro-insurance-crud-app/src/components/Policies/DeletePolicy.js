import { useState } from "react";
import "../theme.css";

function DeletePolicy({ onPolicyDeleted }) {
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
    <div className="crudWrapper">
      <h2 className="sectionTitle">Delete Policy</h2>
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
      <button onClick={handleDelete} className="deleteButton">
        Delete
      </button>
    </div>
  );
}

export default DeletePolicy;
