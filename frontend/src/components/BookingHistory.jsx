import React from "react";

export default function BookingHistory({ bookings }) {
  return (
    <div
      style={{
        background: "white",
        padding: 20,
        borderRadius: 12,
        boxShadow: "0 2px 6px rgba(0,0,0,0.08)",
      }}
    >
      <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 12 }}>
        Booking History
      </h2>

      {bookings.length === 0 && (
        <p style={{ fontSize: 14, color: "#6b7280" }}>No bookings yet.</p>
      )}

      {bookings.length > 0 && (
        <div style={{ overflowX: "auto" }}>
          <table
            style={{
              width: "100%",
              fontSize: 14,
              borderCollapse: "separate",
              borderSpacing: 0,
              borderRadius: 8,
            }}
          >
            <thead>
              <tr style={{ background: "#f3f4f6" }}>
                <th style={headerCell}>Date</th>
                <th style={headerCell}>Time</th>
                <th style={headerCell}>Court</th>
                <th style={headerCell}>Coach</th>
                <th style={headerCell}>Total</th>
                <th style={headerCell}>Status</th>
              </tr>
            </thead>

            <tbody>
              {bookings.map((b, idx) => (
                <tr
                  key={b._id}
                  style={{
                    background: idx % 2 === 0 ? "#ffffff" : "#fafafa",
                    transition: "all 0.2s ease",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = "#e9f2ff")}
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.background =
                      idx % 2 === 0 ? "#ffffff" : "#fafafa")
                  }
                >
                  <td style={cell}>
                    {new Date(b.date).toISOString().slice(0, 10)}
                  </td>

                  <td style={cell}>
                    {b.startTime} – {b.endTime}
                  </td>

                  <td style={cell}>{b.court?.name || "-"}</td>

                  <td style={cell}>{b.coach?.name || "-"}</td>

                  <td style={cell}>₹{b.totalPrice}</td>

                  <td style={cell}>
                    <StatusBadge status={b.status} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

function StatusBadge({ status }) {
  const style = {
    CONFIRMED: {
      background: "#dcfce7",
      color: "#166534",
    },
    CANCELLED: {
      background: "#fee2e2",
      color: "#991b1b",
    },
  }[status] || {};

  return (
    <span
      style={{
        padding: "4px 10px",
        borderRadius: 12,
        fontSize: 12,
        fontWeight: 600,
        textTransform: "capitalize",
        ...style,
      }}
    >
      {status}
    </span>
  );
}

const headerCell = {
  textAlign: "left",
  padding: "10px 8px",
  fontWeight: 600,
  borderBottom: "2px solid #e5e7eb",
  whiteSpace: "nowrap",
};

const cell = {
  padding: "10px 8px",
  borderBottom: "1px solid #e5e7eb",
  whiteSpace: "nowrap",
};
