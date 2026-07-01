// "use client";

// import { useEffect, useState } from "react";

// export default function Home() {
//   const [cpu, setCpu] = useState(null);

//   useEffect(() => {
//     fetch("http://localhost:8000/cpu")
//       .then((res) => res.json())
//       .then((data) => setCpu(data.cpu));
//   }, []);

//   return (
//     <div style={{ padding: 40 }}>
//       <h1>Atlas</h1>
//       <p>CPU Usage: {cpu ?? "loading..."}%</p>
//     </div>
//   );
// }

"use client";

import { useEffect, useState } from "react";
import Sidebar from "@/components/Sidebar";
import StatCard from "@/components/StatCard";

export default function Home() {
  const [cpu, setCpu] = useState<number | null>(null);

  useEffect(() => {
    fetch("http://localhost:8000/cpu")
      .then((res) => res.json())
      .then((data) => setCpu(data.cpu));
  }, []);

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "#0d1117" }}>
      <Sidebar />

      <main style={{ flex: 1, padding: "2rem", overflowY: "auto" }}>
        {/* Header */}
        <div className="mb-4">
          <p style={{ color: "#58a6ff", fontFamily: "monospace", fontSize: "0.75rem", margin: 0 }}>
            OLYMPUS / DASHBOARD
          </p>
          <h1 style={{ color: "#e6edf3", fontWeight: 700, fontSize: "1.5rem", margin: 0 }}>
            System Overview
          </h1>
        </div>

        {/* Stat cards */}
        <div className="row g-3">
          <div className="col-6 col-lg-3">
            <StatCard
              label="CPU Usage"
              value={cpu ?? "—"}
              unit="%"
              percent={cpu ?? 0}
              status={cpu === null ? undefined : cpu > 80 ? "down" : cpu > 60 ? "warn" : "ok"}
              sub={cpu === null ? "loading..." : "live"}
            />
          </div>
        </div>
      </main>
    </div>
  );
}