import React from "react";

export default function CoachSelector({ coaches, selectedCoachId, onSelect }) {
  const disabled = coaches.length === 0;

  return (
    <div style={wrapper}>
      <label style={label}>Coach (optional)</label>

      <select
        value={selectedCoachId}
        onChange={(e) => onSelect(e.target.value)}
        disabled={disabled}
        style={{
          ...selectStyle,
          ...(disabled ? disabledStyle : {}),
        }}
      >
        <option value="">No coach</option>
        {coaches.map((coach) => (
          <option key={coach._id} value={coach._id}>
            {coach.name}
          </option>
        ))}
      </select>

      {disabled && (
        <p style={helperText}>No coaches available for this date.</p>
      )}
    </div>
  );
}

/* ----------------------- STYLES ----------------------- */

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
  transition: "0.2s ease",
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
