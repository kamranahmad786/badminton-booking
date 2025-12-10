import React from "react";

export default function DateTimeSelector({
  date,
  setDate,
  startTime,
  setStartTime,
  endTime,
  setEndTime
}) {
  return (
    <div style={wrapper}>
      <label style={title}>Date & Time</label>

      <div style={grid}>
        {/* DATE */}
        <div style={field}>
          <label style={label}>Date</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            style={input}
          />
        </div>

        {/* START */}
        <div style={field}>
          <label style={label}>Start Time</label>
          <input
            type="time"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
            style={input}
          />
        </div>

        {/* END */}
        <div style={field}>
          <label style={label}>End Time</label>
          <input
            type="time"
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
            style={input}
          />
        </div>
      </div>
    </div>
  );
}

/* ---------------- STYLES ---------------- */

const wrapper = {
  display: "flex",
  flexDirection: "column",
  marginBottom: 16,
};

const title = {
  fontSize: 16,
  fontWeight: 600,
  marginBottom: 10,
  color: "#111827",
};

const grid = {
  display: "flex",
  gap: 12,
  flexWrap: "wrap",
};

const field = {
  flex: "1 1 150px",
  display: "flex",
  flexDirection: "column",
};

const label = {
  fontSize: 13,
  fontWeight: 500,
  color: "#374151",
  marginBottom: 4,
};

const input = {
  padding: "10px 12px",
  borderRadius: 8,
  border: "1px solid #d1d5db",
  fontSize: 14,
  outline: "none",
  transition: "0.2s ease",
  background: "white",
  boxShadow: "0 0 0 0 rgba(0,0,0,0)",
  cursor: "pointer",
};
