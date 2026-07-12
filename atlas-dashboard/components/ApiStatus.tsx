"use client";

import { useEffect, useState } from "react";

export default function ApiStatus() {
  const [online, setOnline] = useState(false);

  useEffect(() => {
    async function checkHealth() {
      try {
        const response = await fetch("http://localhost:8000/health");

        if (response.ok) {
          setOnline(true);
        } else {
          setOnline(false);
        }
      } catch {
        setOnline(false);
      }
    }

    checkHealth();
  }, []);

  return (
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
      {online ? (
        <p style={{ color: "#e6edf3", fontSize: "1rem", margin: 0 }}>🟢 API Online</p>
      ) : (
        <p style={{ color: "#e6edf3", fontWeight: 700, fontSize: "1rem", margin: 0 }}>🔴 API Offline</p>
      )}
    </div>
  );
}