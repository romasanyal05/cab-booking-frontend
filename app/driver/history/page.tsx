"use client";

import { useEffect, useState } from "react";

export default function RideHistory() {
  const [rides, setRides] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/rides?status=completed")
      .then(res => res.json())
      .then(data => setRides(data));
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h2>📜 Ride History (Completed)</h2>

      {rides.length === 0 && <p>No completed rides yet.</p>}

      {rides.map((ride: any) => (
        <div
          key={ride.id}
          style={{
            border: "1px solid #ddd",
            borderRadius: "8px",
            padding: "12px",
            marginTop: "12px",
            background: "#f9fafb"
          }}
        >
          <p><b>Pickup:</b> {ride.pickup_location}</p>
          <p><b>Drop:</b> {ride.drop_location}</p>

          <span
            style={{
              display: "inline-block",
              marginTop: "6px",
              padding: "4px 8px",
              background: "#16a34a",
              color: "white",
              borderRadius: "4px",
              fontSize: "12px"
            }}
          >
            Completed
          </span>
        </div>
      ))}
    </div>
  );
}