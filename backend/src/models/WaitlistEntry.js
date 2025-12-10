import mongoose from "mongoose";

const waitlistSchema = new mongoose.Schema(
  {
    userName: { type: String, required: true },
    court: { type: mongoose.Schema.Types.ObjectId, ref: "Court", required: true },
    date: { type: Date, required: true },
    startTime: { type: String, required: true },
    endTime: { type: String, required: true },
    notified: { type: Boolean, default: false }
  },
  { timestamps: true }
);

const WaitlistEntry = mongoose.model("WaitlistEntry", waitlistSchema);
export default WaitlistEntry;
