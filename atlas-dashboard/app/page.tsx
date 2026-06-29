"use client";

import { useEffect, useState } from "react";

export default function Home() {
  const [cpu, setCpu] = useState(null);

  useEffect(() => {
    fetch("http://localhost:8000/cpu")
      .then((res) => res.json())
      .then((data) => setCpu(data.cpu));
  }, []);

  return (
    <div style={{ padding: 40 }}>
      <h1>Atlas</h1>
      <p>CPU Usage: {cpu ?? "loading..."}%</p>
    </div>
  );
}