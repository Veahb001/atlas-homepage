"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Sidebar from "@/components/Sidebar";
import StatCard from "@/components/StatCard";
import ServiceList from "@/components/ServiceList";

type DeviceStatus = "online" | "offline";

type Service = {
  name: string;
  status: string;
};

type Device = {
  id: string;
  name: string;
  role: string;
  status: DeviceStatus;
  cpu: number | null;
  memory: number | null;
  disk: number | null;
  uptime: string | null;

  // System information
  os?: string;
  cpu_model?: string;
  memory_total?: string;
  storage?: string;

  services: Service[];
};

export default function DevicePage() {
  const { id } = useParams<{ id: string }>();

  const [device, setDevice] = useState<Device | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    fetch(`http://localhost:8000/devices/${id}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Device not found");
        }

        return res.json();
      })
      .then((data: Device) => {
        console.log("Device:", data);
        setDevice(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setDevice(null);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <div
        style={{
          background: "#0d1117",
          color: "#e6edf3",
          minHeight: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontFamily: "monospace",
        }}
      >
        Loading device...
      </div>
    );
  }

  if (!device) {
    return (
      <div
        style={{
          display: "flex",
          minHeight: "100vh",
          background: "#0d1117",
        }}
      >
        <Sidebar />

        <main style={{ flex: 1, padding: "2rem" }}>
          <h2
            style={{
              color: "#f85149",
              fontFamily: "monospace",
            }}
          >
            Device not found
          </h2>
        </main>
      </div>
    );
  }

  return (
    <div
      style={{
        display: "flex",
        minHeight: "100vh",
        background: "#0d1117",
      }}
    >
      <Sidebar />

      <main
        style={{
          flex: 1,
          padding: "2rem",
          overflowY: "auto",
        }}
      >
        {/* Header */}
        <div className="mb-4">
          <p
            style={{
              color: "#58a6ff",
              fontFamily: "monospace",
              fontSize: "0.75rem",
              margin: 0,
            }}
          >
            OLYMPUS / {device.name.toUpperCase()}
          </p>

          <h1
            style={{
              color: "#e6edf3",
              fontWeight: 700,
              fontSize: "1.8rem",
              margin: 0,
            }}
          >
            {device.name}
          </h1>

          <p
            style={{
              color: "#8b949e",
              fontFamily: "monospace",
            }}
          >
            {device.role}
          </p>
        </div>

        {/* Telemetry */}
        <div className="row g-3 mb-4">
          <div className="col-6 col-lg-3">
            <StatCard
              label="CPU Usage"
              value={device.cpu !== null ? `${device.cpu}%` : "n/a"}
              sub={device.status}
            />
          </div>

          <div className="col-6 col-lg-3">
            <StatCard
              label="Memory"
              value={device.memory !== null ? `${device.memory}%` : "n/a"}
              sub="usage"
            />
          </div>

          <div className="col-6 col-lg-3">
            <StatCard
              label="Disk"
              value={device.disk !== null ? `${device.disk}%` : "n/a"}
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

        {/* System Information */}
        <div
          style={{
            background: "#161b22",
            border: "1px solid #30363d",
            borderRadius: "8px",
            padding: "1.5rem",
          }}
        >
          <h3
            style={{
              color: "#e6edf3",
              marginBottom: "1rem",
              fontFamily: "monospace",
            }}
          >
            System Information
          </h3>

          <div
            style={{
              display: "grid",
              gap: "0.75rem",
              color: "#c9d1d9",
              fontFamily: "monospace",
            }}
          >
            <div>
              <strong>Operating System:</strong>{" "}
              {device.os ?? "Unknown"}
            </div>

            <div>
              <strong>CPU:</strong>{" "}
              {device.cpu_model ?? "Unknown"}
            </div>

            <div>
              <strong>Memory:</strong>{" "}
              {device.memory_total ?? "Unknown"}
            </div>

            <div>
              <strong>Storage:</strong>{" "}
              {device.storage ?? "Unknown"}
            </div>
            /*Future feature: Service List*/
            {/* <ServiceList services={device.services ?? []} /> */}
          </div>
        </div>
      </main>
    </div>
  );
}