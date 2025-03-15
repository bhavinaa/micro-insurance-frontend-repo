import { useState } from "react";
import "../theme.css";

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

      // Reset form
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
    <div className="crudWrapper">
      <h2 className="sectionTitle">Create New Policy</h2>
      <form onSubmit={handleSubmit} className="formGrid">
        {/* Policy ID */}
        <div className="formGroup">
          <label className="label">Policy ID:</label>
          <input
            type="text"
            name="policyID"
            value={form.policyID}
            onChange={handleChange}
            placeholder="Unique policy ID"
            className="input"
          />
        </div>

        {/* Farmer ID */}
        <div className="formGroup">
          <label className="label">Farmer ID:</label>
          <input
            type="text"
            name="farmerID"
            value={form.farmerID}
            onChange={handleChange}
            placeholder="Farmer123"
            className="input"
          />
        </div>

        {/* Farmer Name */}
        <div className="formGroup">
          <label className="label">Farmer Name:</label>
          <input
            type="text"
            name="farmerName"
            value={form.farmerName}
            onChange={handleChange}
            placeholder="John Doe"
            className="input"
          />
        </div>

        {/* Plan Name */}
        <div className="formGroup">
          <label className="label">Plan Name:</label>
          <input
            type="text"
            name="planName"
            value={form.planName}
            onChange={handleChange}
            placeholder="Basic Plan"
            className="input"
          />
        </div>

        {/* Condition */}
        <div className="formGroup">
          <label className="label">Condition:</label>
          <input
            type="text"
            name="condition"
            value={form.condition}
            onChange={handleChange}
            placeholder="Drought, flood, etc."
            className="input"
          />
        </div>

        {/* Coverage Amount */}
        <div className="formGroup">
          <label className="label">Coverage Amount:</label>
          <input
            type="number"
            name="coverageAmount"
            value={form.coverageAmount}
            onChange={handleChange}
            placeholder="10000"
            className="input"
          />
        </div>

        {/* Payout Amount */}
        <div className="formGroup">
          <label className="label">Payout Amount:</label>
          <input
            type="number"
            name="payoutAmount"
            value={form.payoutAmount}
            onChange={handleChange}
            placeholder="5000"
            className="input"
          />
        </div>

        {/* Premium Amount */}
        <div className="formGroup">
          <label className="label">Premium Amount:</label>
          <input
            type="number"
            name="premiumAmount"
            value={form.premiumAmount}
            onChange={handleChange}
            placeholder="200"
            className="input"
          />
        </div>

        {/* Status */}
        <div className="formGroup">
          <label className="label">Status:</label>
          <select
            name="status"
            value={form.status}
            onChange={handleChange}
            className="input"
          >
            <option value="active">Active</option>
            <option value="expired">Expired</option>
            <option value="claimed">Claimed</option>
          </select>
        </div>

        <button type="submit" className="primaryButton">
          Create
        </button>
      </form>
    </div>
  );
}

export default CreatePolicy;
