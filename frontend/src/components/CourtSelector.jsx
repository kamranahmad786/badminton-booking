import React from "react";

export default function CourtSelector({ courts, selectedCourtId, onSelect }) {
  const disabled = courts.length === 0;

  return (
    <div style={wrapper}>
      <label style={label}>Court</label>

      <select
        value={selectedCourtId}
        onChange={(e) => onSelect(e.target.value)}
        disabled={disabled}
        style={{
          ...selectStyle,
          ...(disabled ? disabledStyle : {}),
        }}
      >
        <option value="">Select a court</option>
        {courts.map((court) => (
          <option key={court._id} value={court._id}>
            {court.name} {court.type === "INDOOR" ? "🏠" : "🌤️"}
          </option>
        ))}
      </select>

      {disabled && (
        <p style={helperText}>No courts available for the selected date.</p>
      )}
    </div>
  );
}

/* ---------------------- STYLES ---------------------- */

const wrapper = {
  display: "flex",
  flexDirection: "column",
  marginBottom: 16,
};

const label = {
  fontSize: 14,
  fontWeight: 600,
  color: "#374151",
  marginBottom: 6,
};

const selectStyle = {
  width: "100%",
  padding: "10px 12px",
  borderRadius: 8,
  border: "1px solid #d1d5db",
  fontSize: 14,
  background: "white",
  cursor: "pointer",
  outline: "none",
  transition: "all 0.2s ease",

  // Hover & focus
  boxShadow: "0 0 0 0 rgba(0,0,0,0)",
};

const disabledStyle = {
  background: "#f3f4f6",
  color: "#9ca3af",
  cursor: "not-allowed",
};

const helperText = {
  marginTop: 6,
  fontSize: 12,
  color: "#6b7280",
};
