import { useState } from "react";
import "../theme.css";

function Analytics({ policies }) {
  // Mock weather data
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
    <div className="analyticsWrapper">
      <h2 className="sectionTitle">Analytics & Weather</h2>
      <div className="analyticsCards">
        {/* Weather Card */}
        <div className="analyticsCard">
          <h3 className="cardHeading">Current Weather</h3>
          <p className="cardLine">Location: {weatherData.location}</p>
          <p className="cardLine">Temperature: {weatherData.temperature}°C</p>
          <p className="cardLine">Condition: {weatherData.condition}</p>
          <p className="cardLine">
            Chance of Rain: {weatherData.chanceOfRain}%
          </p>
        </div>

        {/* Policy Stats Card */}
        <div className="analyticsCard">
          <h3 className="cardHeading">Policy Stats</h3>
          <p className="cardLine">Total Policies: {totalPolicies}</p>
          <p className="cardLine">Active: {activeCount}</p>
          <p className="cardLine">Expired: {expiredCount}</p>
          <p className="cardLine">Coverage: ${totalCoverage.toLocaleString()}</p>
        </div>
      </div>
      <p className="analyticsNote">
        <strong>Note:</strong> Weather data is mocked; stats are computed from loaded policies.
        Integrate a real weather API or additional analytics for deeper insights!
      </p>
    </div>
  );
}

export default Analytics;
