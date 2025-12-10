import React, { useEffect, useState } from "react";
import { fetchMeta, pricePreview } from "../api/meta.js";
import { createBooking, getBookingsForUser } from "../api/bookings.js";
import CourtSelector from "./CourtSelector.jsx";
import DateTimeSelector from "./DateTimeSelector.jsx";
import EquipmentSelector from "./EquipmentSelector.jsx";
import CoachSelector from "./CoachSelector.jsx";
import PriceSummary from "./PriceSummary.jsx";
import BookingHistory from "./BookingHistory.jsx";

export default function BookingPage() {
  const [date, setDate] = useState(() => new Date().toISOString().slice(0, 10));
  const [meta, setMeta] = useState(null);
  const [selectedCourtId, setSelectedCourtId] = useState("");
  const [startTime, setStartTime] = useState("18:00");
  const [endTime, setEndTime] = useState("19:00");
  const [equipmentItems, setEquipmentItems] = useState([]);
  const [selectedCoachId, setSelectedCoachId] = useState("");
  const [price, setPrice] = useState(null);
  const [userName, setUserName] = useState("demo-user");
  const [history, setHistory] = useState([]);

  useEffect(() => {
    fetchMeta(date)
      .then(setMeta)
      .catch(console.error);
  }, [date]);

  useEffect(() => {
    if (!selectedCourtId) {
      setPrice(null);
      return;
    }

    async function run() {
      try {
        const preview = await pricePreview({
          courtId: selectedCourtId,
          coachId: selectedCoachId || null,
          equipmentItems,
          date,
          startTime,
          endTime,
        });
        setPrice(preview);
      } catch (err) {
        console.error(err);
      }
    }
    run();
  }, [selectedCourtId, selectedCoachId, equipmentItems, date, startTime, endTime]);

  useEffect(() => {
    if (!userName) return;
    getBookingsForUser(userName)
      .then(setHistory)
      .catch(console.error);
  }, [userName]);

  const handleConfirm = async () => {
    try {
      const payload = {
        userName,
        courtId: selectedCourtId,
        coachId: selectedCoachId || null,
        equipmentItems,
        date,
        startTime,
        endTime,
      };
      const result = await createBooking(payload);
      if (result.waitlisted) {
        alert("Slot is full. You have been added to the waitlist.");
      } else {
        alert("Booking confirmed!");
        const updated = await getBookingsForUser(userName);
        setHistory(updated);
      }
    } catch (err) {
      alert(err.response?.data?.message || "Failed to create booking");
    }
  };

  const courts = meta?.courts || [];
  const equipment = meta?.equipment || [];
  const coaches = meta?.coaches || [];

  return (
    <div style={page}>
      <h1 style={heading}>🏸 Badminton Court Booking</h1>

      <div style={layout}>
        <div style={leftColumn}>
          <div style={card}>
            <div style={{ marginBottom: 12 }}>
              <label style={label}>
                Your Name
                <input
                  style={input}
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                />
              </label>
            </div>

            <DateTimeSelector
              date={date}
              setDate={setDate}
              startTime={startTime}
              setStartTime={setStartTime}
              endTime={endTime}
              setEndTime={setEndTime}
            />

            <CourtSelector
              courts={courts}
              selectedCourtId={selectedCourtId}
              onSelect={setSelectedCourtId}
            />

            <EquipmentSelector
              equipment={equipment}
              equipmentItems={equipmentItems}
              setEquipmentItems={setEquipmentItems}
            />

            <CoachSelector
              coaches={coaches}
              selectedCoachId={selectedCoachId}
              onSelect={setSelectedCoachId}
            />
          </div>

          <button
            onClick={handleConfirm}
            disabled={!selectedCourtId}
            style={{
              ...button,
              ...(selectedCourtId ? buttonPrimary : buttonDisabled),
            }}
          >
            Confirm Booking
          </button>
        </div>

        <div style={rightColumn}>
          <PriceSummary price={price} />
        </div>
      </div>

      <div style={{ marginTop: 32 }}>
        <BookingHistory bookings={history} />
      </div>
    </div>
  );
}

/* --------------------------- STYLES --------------------------- */

const page = {
  maxWidth: 1100,
  margin: "0 auto",
  padding: 24,
  fontFamily: "Inter, system-ui, sans-serif",
  color: "#111827",
};

const heading = {
  fontSize: 28,
  fontWeight: 700,
  marginBottom: 24,
};

const layout = {
  display: "grid",
  gridTemplateColumns: "2fr 1fr",
  gap: 24,
};

const leftColumn = {
  display: "flex",
  flexDirection: "column",
  gap: 16,
};

const rightColumn = {
  display: "flex",
  flexDirection: "column",
  gap: 16,
};

const card = {
  background: "white",
  padding: 20,
  borderRadius: 12,
  boxShadow: "0 2px 6px rgba(0,0,0,0.08)",
};

const label = {
  fontSize: 14,
  fontWeight: 500,
  color: "#374151",
};

const input = {
  display: "block",
  marginTop: 6,
  width: "100%",
  padding: 10,
  borderRadius: 8,
  border: "1px solid #d1d5db",
  fontSize: 14,
};

const button = {
  padding: "12px 20px",
  borderRadius: 999,
  border: "none",
  fontWeight: 600,
  fontSize: 15,
  cursor: "pointer",
  transition: "0.2s",
  maxWidth: 240,
  textAlign: "center",
};

const buttonPrimary = {
  background: "#1d4ed8",
  color: "white",
};

const buttonDisabled = {
  background: "#cbd5e1",
  color: "#64748b",
  cursor: "not-allowed",
};
