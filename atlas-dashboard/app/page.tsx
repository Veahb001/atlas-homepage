"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Sidebar from "@/components/Sidebar";
import ApiStatus from "@/components/ApiStatus";
import SystemSummary from "@/components/SystemSummary";

type DeviceStatus = "online" | "offline";

type Device = {
  id: string;
  name: string;
  role: string;
  status: DeviceStatus;
  cpu: number | null;
  memory: number | null;
  disk: number | null;
  uptime: string | null;
};


function statusColor(value: number) {
  if (value === null) return "#484f58";
  return value > 80
    ? "#f85149"
    : value > 60
    ? "#d29922"
    : "#3fb950";
}

export default function Home() {
  const [devices, setDevices] = useState<Device[]>([]);
  const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     fetch("http://localhost:8000/devices")
//       .then((res) => res.json())
//       .then((data) => {
//       setDevices(data);
//       setLoading(false);
//     })
//     .catch((err) => {
//       console.error(err);
//       setLoading(false);
//     });
// }, []);

  useEffect(() => {
  const fetchDevices = () => {
    fetch("http://localhost:8000/devices")
      .then((res) => res.json())
      .then((data) => {
        setDevices(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  };

  fetchDevices();

  const interval = setInterval(fetchDevices, 5000);

  return () => clearInterval(interval);
}, []);

  if (loading) {
    return(
      <div
      style={{
        background: "#0d1117",
        color: "#e6edf3",
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontFamily: "monospace"
      }}
      >
        Loading devices...
      </div>
    )
  }

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "#0d1117" }}>
      <Sidebar />

      <main style={{ flex: 1, padding: "2rem", overflowY: "auto" }}>
        {/* Header */}
        <div className="mb-4">
          <p style={{ color: "#58a6ff", fontFamily: "monospace", fontSize: "0.75rem", margin: 0 }}>
            OLYMPUS / HOME
          </p>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <h1 style={{ color: "#e6edf3", fontWeight: 700, fontSize: "1.5rem", margin: 0 }}>
              All Devices
            </h1>

            <ApiStatus />
          </div>
        </div>
        <SystemSummary devices={devices} />

        {/* Device cards */}
        <div className="row g-4">
          {devices.map((device) => (
            <div key={device.id} className="col-12 col-md-6 col-xl-4">
              <div style={{
                background: "#161b22",
                border: `1px solid ${device.status === "offline" ? "#f85149" : "#30363d"}`,
                borderRadius: "8px",
                padding: "1.5rem",
                height: "100%",
                cursor: "pointer",
              }}>

                {/* Card Header*/}
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "1.25rem" }}>
                  <div>
                    <div style={{ color: "#e6edf3", fontFamily: "monospace", fontWeight: 700, fontSize: "1.1rem" }}>
                      {device.name}
                    </div>
                    <div style={{ color: "#484f58", fontFamily: "monospace", fontSize: "0.72rem", marginTop: "2px" }}>
                      {device.role}
                    </div>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
                    <span style={{
                      width: 8, height: 8, borderRadius: "50%",
                      background: device.status === "online" ? "#3fb950" : "#f85149",
                      display: "inline-block",
                    }} />
                    <span style={{
                      color: device.status === "online" ? "#3fb950" : "#f85149",
                      fontFamily: "monospace",
                      fontSize: "0.72rem",
                    }}>
                      {device.status}
                    </span>
                  </div>
                </div>

                {/* Offline state */}
                {device.status === "offline" ? (
                  <p style={{ color: "#484f58", fontFamily: "monospace", fontSize: "0.8rem", margin: 0 }}>
                    Device unreachable
                  </p>
                ) : (
                  <>
                    {/* Stat bars */}
                    <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem", marginBottom: "1.25rem" }}>
                      {[
                        { label: "CPU",    value: device.cpu },
                        { label: "Memory", value: device.memory },
                        { label: "Disk",   value: device.disk },
                      ].map(({ label, value }) => (
                        <div key={label}>
                          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "4px" }}>
                            <span style={{ color: "#8b949e", fontFamily: "monospace", fontSize: "0.72rem" }}>
                              {label}
                            </span>
                            <span style={{ color: statusColor(value), fontFamily: "monospace", fontSize: "0.72rem" }}>
                              {value === null ? "--" : `${value}%`}
                            </span>
                          </div>
                          <div style={{ background: "#21262d", borderRadius: "2px", height: "4px" }}>
                            <div style={{
                              width: `${value ?? 0}%`,
                              height: "100%",
                              background: statusColor(value),
                              borderRadius: "2px",
                              transition: "width 0.4s ease",
                            }} />
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Uptime */}
                    <div style={{
                      borderTop: "1px solid #21262d",
                      paddingTop: "0.75rem",
                      display: "flex",
                      justifyContent: "space-between",
                    }}>
                      <span style={{ color: "#484f58", fontFamily: "monospace", fontSize: "0.72rem" }}>Uptime</span>
                      <span style={{ color: "#8b949e", fontFamily: "monospace", fontSize: "0.72rem" }}>{device.uptime}</span>
                    </div>
                  </>
                )}
              </div>
            </div>
          ))}
          {/* <div className="col-6 col-lg-3">
            <StatCard
              label="CPU Usage"
              value={cpu ?? "—"}
              unit="%"
              percent={cpu ?? 0}
              status={cpu === null ? undefined : cpu > 80 ? "down" : cpu > 60 ? "warn" : "ok"}
              sub={cpu === null ? "loading..." : "live"}
            />
          </div> */}
        </div>
      </main>
            
    </div>
  );
}