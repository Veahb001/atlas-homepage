"use client";

type Device = {
  id: string;
  name: string;
  status: "online" | "offline";
  cpu: number | null;
  memory: number | null;
};

export default function SystemSummary({ devices }: { devices: Device[] }) {

  const online =
    devices.filter((device) => device.status === "online").length;

  const offline =
    devices.filter((device) => device.status === "offline").length;


  const averageCPU =
    devices.length > 0
      ? Math.round(
          devices
            .filter((d) => d.cpu !== null)
            .reduce((sum, d) => sum + (d.cpu ?? 0), 0) /
          devices.filter((d) => d.cpu !== null).length
        )
      : 0;


  const averageMemory =
    devices.length > 0
      ? Math.round(
          devices
            .filter((d) => d.memory !== null)
            .reduce((sum, d) => sum + (d.memory ?? 0), 0) /
          devices.filter((d) => d.memory !== null).length
        )
      : 0;


  const stats = [
    {
      label: "Devices Online",
      value: online,
      color: "#3fb950",
    },
    {
      label: "Devices Offline",
      value: offline,
      color: offline > 0 ? "#f85149" : "#8b949e",
    },
    {
      label: "Average CPU",
      value: `${averageCPU}%`,
      color: "#58a6ff",
    },
    {
      label: "Average Memory",
      value: `${averageMemory}%`,
      color: "#58a6ff",
    },
  ];


  return (
    <div
      style={{
        background: "#161b22",
        border: "1px solid #30363d",
        borderRadius: "8px",
        padding: "1.25rem",
        marginBottom: "1.5rem",
      }}
    >

      <div
        style={{
          color: "#e6edf3",
          fontFamily: "monospace",
          fontWeight: 700,
          fontSize: "1rem",
          marginBottom: "1rem",
        }}
      >
        System Summary
      </div>


      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
          gap: "1rem",
        }}
      >

        {stats.map((stat) => (
          <div
            key={stat.label}
            style={{
              background: "#0d1117",
              border: "1px solid #21262d",
              borderRadius: "6px",
              padding: "1rem",
            }}
          >

            <div
              style={{
                color: "#8b949e",
                fontFamily: "monospace",
                fontSize: "0.72rem",
                marginBottom: "0.5rem",
              }}
            >
              {stat.label}
            </div>


            <div
              style={{
                color: stat.color,
                fontFamily: "monospace",
                fontWeight: 700,
                fontSize: "1.5rem",
              }}
            >
              {stat.value}
            </div>

          </div>
        ))}

      </div>

    </div>
  );
}