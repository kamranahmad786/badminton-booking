import express from "express";
import cors from "cors";
import bookingRoutes from "./routes/bookingRoutes.js";
import metaRoutes from "./routes/metaRoutes.js";

const app = express();

app.use(cors({
  origin: process.env.CLIENT_URL || "http://localhost:5173"
}));
app.use(express.json());

app.get("/api/health", (req, res) => {
  res.json({ status: "ok" });
});

app.use("/api/bookings", bookingRoutes);
app.use("/api/meta", metaRoutes);

app.use((err, req, res, next) => {
  console.error("❌ Error:", err);
  res.status(500).json({ message: "Internal server error" });
});

export default app;
