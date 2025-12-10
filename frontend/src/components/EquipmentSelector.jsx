import React from "react";

export default function EquipmentSelector({
  equipment,
  equipmentItems,
  setEquipmentItems,
}) {
  const handleQtyChange = (id, qty) => {
    const num = Number(qty);

    if (!num || num <= 0) {
      setEquipmentItems(equipmentItems.filter((i) => i.equipment !== id));
    } else {
      const existing = equipmentItems.find((i) => i.equipment === id);

      if (existing) {
        setEquipmentItems(
          equipmentItems.map((i) =>
            i.equipment === id ? { ...i, quantity: num } : i
          )
        );
      } else {
        setEquipmentItems([...equipmentItems, { equipment: id, quantity: num }]);
      }
    }
  };

  const getQty = (id) =>
    equipmentItems.find((i) => i.equipment === id)?.quantity || "";

  const disabled = equipment.length === 0;

  return (
    <div style={wrapper}>
      <label style={title}>Equipment (optional)</label>

      {disabled && (
        <p style={helperText}>No equipment available.</p>
      )}

      {!disabled && (
        <div style={list}>
          {equipment.map((eq) => (
            <div key={eq._id} style={row}>
              <div>
                <span style={name}>{eq.name}</span>
                <span style={availability}>Available: {eq.totalQuantity}</span>
              </div>

              <input
                type="number"
                min="0"
                value={getQty(eq._id)}
                onChange={(e) => handleQtyChange(eq._id, e.target.value)}
                style={input}
              />
            </div>
          ))}
        </div>
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

const title = {
  fontSize: 16,
  fontWeight: 600,
  color: "#1f2937",
  marginBottom: 10,
};

const helperText = {
  fontSize: 14,
  color: "#6b7280",
};

const list = {
  display: "flex",
  flexDirection: "column",
  gap: 8,
};

const row = {
  background: "#ffffff",
  border: "1px solid #e5e7eb",
  borderRadius: 8,
  padding: "10px 12px",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  transition: "0.2s ease",
};

const name = {
  fontSize: 14,
  fontWeight: 500,
  marginBottom: 2,
  display: "block",
};

const availability = {
  fontSize: 12,
  color: "#6b7280",
};

const input = {
  width: 70,
  padding: "8px 10px",
  borderRadius: 8,
  border: "1px solid #d1d5db",
  fontSize: 14,
  outline: "none",
  transition: "0.2s ease",
};
