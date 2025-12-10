import React from "react";

export default function PriceSummary({ price }) {
  return (
    <div style={card}>
      <h2 style={title}>Price Summary</h2>

      {!price && (
        <p style={placeholder}>
          Select a court, date and time to see the price.
        </p>
      )}

      {price && (
        <>
          <div style={totalRow}>
            <span style={totalLabel}>Total</span>
            <span style={totalValue}>₹{price.totalPrice}</span>
          </div>

          <div style={divider} />

          <div style={breakdownList}>
            <BreakdownRow label="Base court" value={price.breakdown.baseCourt} />
            <BreakdownRow label="Peak surcharge" value={price.breakdown.peakSurcharge} />
            <BreakdownRow label="Weekend surcharge" value={price.breakdown.weekendSurcharge} />
            <BreakdownRow label="Indoor premium" value={price.breakdown.indoorPremium} />
            <BreakdownRow label="Equipment total" value={price.breakdown.equipmentTotal} />
            <BreakdownRow label="Coach fee" value={price.breakdown.coachFee} />
          </div>
        </>
      )}
    </div>
  );
}

function BreakdownRow({ label, value }) {
  return (
    <div style={row}>
      <span>{label}</span>
      <span style={amount}>₹{value}</span>
    </div>
  );
}

/* ---------------- STYLES ---------------- */

const card = {
  background: "white",
  padding: 20,
  borderRadius: 12,
  boxShadow: "0 2px 6px rgba(0,0,0,0.08)",
};

const title = {
  fontSize: 16,
  fontWeight: 700,
  marginBottom: 12,
  color: "#111827",
};

const placeholder = {
  fontSize: 14,
  color: "#6b7280",
};

const totalRow = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: 8,
};

const totalLabel = {
  fontSize: 15,
  fontWeight: 600,
  color: "#1f2937",
};

const totalValue = {
  fontSize: 24,
  fontWeight: 700,
  color: "#2563eb",
};

const divider = {
  height: 1,
  background: "#e5e7eb",
  margin: "12px 0",
};

const breakdownList = {
  display: "flex",
  flexDirection: "column",
  gap: 6,
};

const row = {
  display: "flex",
  justifyContent: "space-between",
  fontSize: 14,
  color: "#374151",
};

const amount = {
  fontWeight: 600,
};
