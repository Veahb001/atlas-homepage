"use client";

import Sidebar from "@/components/Sidebar";
import StatCard from "@/components/StatCard";
import { useParams } from "next/navigation";

const deviceInfo: Record<string, { name: string; role: string }> = {
  atlas:   { name: "Atlas",   role: "Main Server" },
  apollo:  { name: "Apollo",  role: "Primary Workstation" },
  hyperion:{ name: "Hyperion",role: "Home PC" },
};

export default function DevicePage() {
  const { id } = useParams<{ id: string }>();
  const device = deviceInfo[id];

  if (!device) return (
    <div style={{ display: "flex", minHeight: "100vh", background: "#0d1117" }}>
      <Sidebar />
      <main style={{ flex: 1, padding: "2rem" }}>
        <p style={{ color: "#f85149", fontFamily: "monospace" }}>Device not found.</p>
      </main>
    </div>
  );

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "#0d1117" }}>
      <Sidebar />

      <main style={{ flex: 1, padding: "2rem", overflowY: "auto" }}>

        {/* Header */}
        <div className="mb-4">
          <p style={{ color: "#58a6ff", fontFamily: "monospace", fontSize: "0.75rem", margin: 0 }}>
            OLYMPUS / {device.name.toUpperCase()}
          </p>
          <h1 style={{ color: "#e6edf3", fontWeight: 700, fontSize: "1.5rem", margin: 0 }}>
            {device.name}
          </h1>
          <p style={{ color: "#484f58", fontFamily: "monospace", fontSize: "0.8rem", margin: 0 }}>
            {device.role}
          </p>
        </div>

        {/* Stat cards — all null until API is wired up */}
        <div className="row g-3">
          <div className="col-6 col-lg-3">
            <StatCard label="CPU Usage" value="n/a" sub="not connected" />
          </div>
          <div className="col-6 col-lg-3">
            <StatCard label="Memory" value="n/a" sub="not connected" />
          </div>
          <div className="col-6 col-lg-3">
            <StatCard label="Disk" value="n/a" sub="not connected" />
          </div>
          <div className="col-6 col-lg-3">
            <StatCard label="Uptime" value="n/a" sub="not connected" />
          </div>
        </div>

      </main>
    </div>
  );
}