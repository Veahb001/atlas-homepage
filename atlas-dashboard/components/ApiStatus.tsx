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
    <div>
      {online ? (
        <p>🟢 API Online</p>
      ) : (
        <p>🔴 API Offline</p>
      )}
    </div>
  );
}