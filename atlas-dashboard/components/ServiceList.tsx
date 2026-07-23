type Item = {
  name: string;
  status: string;
};

export default function itemList({
  title = "items",
  items = []
}: {
  title?: string;
  items?: Item[];
}) {
  return (
    <div
      style={{
        background: "#161b22",
        border: "1px solid #30363d",
        borderRadius: 8,
        padding: "1.5rem",
        marginTop: "2rem",
      }}
    >
      <h3
        style={{
          color: "#e6edf3",
          marginBottom: "1rem",
          fontFamily: "monospace",
        }}
      >
        {title}
      </h3>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "0.75rem",
        }}
      >
        {items.map((item) => (
          <div
            key={item.name}
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              fontFamily: "monospace",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
              }}
            >
              <span
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: "50%",
                  display: "inline-block",
                  background:
                    item.status === "running" ||
                    item.status === "available"
                      ? "#3fb950"
                      : "#f85149",
                }}
              />
              <span style={{ color: "#e6edf3" }}>
                {item.name}
              </span>
            </div>

            <span
              style={{
                color:
                  item.status === "running" ||
                  item.status === "available"
                    ? "#3fb950"
                    : "#f85149",
              }}
            >
              {item.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}