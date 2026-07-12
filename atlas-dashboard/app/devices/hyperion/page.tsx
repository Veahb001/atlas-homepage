"use client";

import { useEffect, useState } from "react";
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

  const [device, setDevice] = useState<Device | null>(null);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    fetch("http://localhost:8000/devices")
      .then((res) => res.json())
      .then((devices: Device[]) => {
        console.log("API devices:", devices);
        console.log("URL id:", id);

        const found = devices.find((device) => device.id === id);
        console.log("Found device:", found);

        setDevice(found ?? null);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });

  }, [id]);
  if (loading) {
    return (
      <div
        style={{
          background:"#0d1117",
          color:"#e6edf3",
          minHeight:"100vh",
          display:"flex",
          alignItems:"center",
          justifyContent:"center",
          fontFamily:"monospace"
        }}
      >
        Loading device...
      </div>
    );
  }
  if (!device) {
    return (
      <div style={{ display:"flex", minHeight:"100vh", background:"#0d1117" }}>
        <Sidebar />

        <main style={{ flex:1, padding:"2rem" }}>
          <p style={{
            color:"#f85149",
            fontFamily:"monospace"
          }}>
            Device not found.
          </p>
        </main>

      </div>
    );
  }
  return (
    <div style={{
      display:"flex",
      minHeight:"100vh",
      background:"#0d1117"
    }}>

      <Sidebar />

      <main style={{
        flex:1,
        padding:"2rem",
        overflowY:"auto"
      }}>
        <div className="mb-4">

          <p style={{
            color:"#58a6ff",
            fontFamily:"monospace",
            fontSize:"0.75rem"
          }}>
            OLYMPUS / {device.name.toUpperCase()}
          </p>


          <h1 style={{
            color:"#e6edf3",
            fontWeight:700,
            fontSize:"1.5rem"
          }}>
            {device.name}
          </h1>
          <p style={{
            color:"#484f58",
            fontFamily:"monospace"
          }}>
            {device.role}
          </p>
        </div>
        <div className="row g-3">
          <div className="col-6 col-lg-3">
            <StatCard
              label="CPU Usage"
              value={device.cpu ? `${device.cpu}%` : "n/a"}
              sub={device.status}
            />
          </div>
          <div className="col-6 col-lg-3">
            <StatCard
              label="Memory"
              value={device.memory ? `${device.memory}%` : "n/a"}
              sub="usage"
            />
          </div>
          <div className="col-6 col-lg-3">
            <StatCard
              label="Disk"
              value={device.disk ? `${device.disk}%` : "n/a"}
              sub="storage"
            />
          </div>
          <div className="col-6 col-lg-3">
            <StatCard
              label="Uptime"
              value={device.uptime ?? "n/a"}
              sub="system"
            />
          </div>
        </div>
      </main>
    </div>
  );
}