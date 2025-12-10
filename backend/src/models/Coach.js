import mongoose from "mongoose";

const availabilitySlotSchema = new mongoose.Schema({
  dayOfWeek: { type: Number, min: 0, max: 6, required: true }, // 0 = Sunday
  startTime: { type: String, required: true },  // "17:00"
  endTime: { type: String, required: true }     // "19:00"
});

const coachSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    bio: String,
    hourlyRateBase: { type: Number, default: 0 },
    availability: [availabilitySlotSchema],
    isActive: { type: Boolean, default: true }
  },
  { timestamps: true }
);

const Coach = mongoose.model("Coach", coachSchema);
export default Coach;
