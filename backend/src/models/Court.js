import mongoose from "mongoose";

const courtSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    type: { type: String, enum: ["INDOOR", "OUTDOOR"], required: true },
    isActive: { type: Boolean, default: true }
  },
  { timestamps: true }
);

const Court = mongoose.model("Court", courtSchema);
export default Court;
