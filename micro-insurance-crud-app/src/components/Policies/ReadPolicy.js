import "../theme.css";
import { useState, useEffect } from "react";

// =====================
// 4) READPOLICIES ...
// =====================
function ReadPolicies({ policies }) {
  if (!policies || policies.length === 0) {
    return <p className="noData">No policies found.</p>;
  }
  return (
    <div className="crudWrapper">
      <h2 className="sectionTitle">All Insurance Policies</h2>
      <div className="responsiveTableWrapper">
        <table className="table">
          <thead>
            <tr className="tableHeadRow">
              <th className="th">Policy ID</th>
              <th className="th">Farmer ID</th>
              <th className="th">Farmer Name</th>
              <th className="th">Plan Name</th>
              <th className="th">Condition</th>
              <th className="th">Coverage</th>
              <th className="th">Payout</th>
              <th className="th">Premium</th>
              <th className="th">Status</th>
            </tr>
          </thead>
          <tbody>
            {policies.map((policy, index) => (
              <tr
                key={policy.policyID || index}
                className={index % 2 === 0 ? "tableRowEven" : "tableRowOdd"}
              >
                <td className="td">{policy.policyID}</td>
                <td className="td">{policy.farmerID}</td>
                <td className="td">{policy.farmerName}</td>
                <td className="td">{policy.planName}</td>
                <td className="td">{policy.condition}</td>
                <td className="td">{policy.coverageAmount}</td>
                <td className="td">{policy.payoutAmount}</td>
                <td className="td">{policy.premiumAmount}</td>
                <td className="td">{policy.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ReadPolicies;
