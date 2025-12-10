import React from "react";
import BookingPage from "./components/BookingPage.jsx";

export default function App() {
  return (
    <div style={page}>
      <header style={header}>
        <h1 style={title}>🏸 Badminton Booking System</h1>
      </header>

      <main style={main}>
        <BookingPage />
      </main>

      <footer style={footer}>
        <span style={footerText}>© {new Date().getFullYear()} All rights reserved.</span>
      </footer>
    </div>
  );
}

/* ---------------- STYLES ---------------- */

const page = {
  minHeight: "100vh",
  display: "flex",
  flexDirection: "column",
  background: "linear-gradient(to bottom right, #f9fafb, #e5e7eb)",
  fontFamily: "Inter, system-ui, sans-serif",
  color: "#111827",
};

const header = {
  background: "white",
  padding: "12px 24px",
  boxShadow: "0 1px 4px rgba(0,0,0,0.08)",
  position: "sticky",
  top: 0,
  zIndex: 10,
};

const title = {
  fontSize: 20,
  fontWeight: 700,
  margin: 0,
  color: "#1e3a8a",
};

const main = {
  flex: 1,
  maxWidth: 1200,
  width: "100%",
  margin: "0 auto",
  padding: "24px 16px",
};

const footer = {
  background: "white",
  padding: "10px 16px",
  borderTop: "1px solid #e5e7eb",
  textAlign: "center",
};

const footerText = {
  fontSize: 12,
  color: "#6b7280",
};
