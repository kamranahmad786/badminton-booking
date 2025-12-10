import mongoose from "mongoose";

const equipmentItemSchema = new mongoose.Schema({
  equipment: { type: mongoose.Schema.Types.ObjectId, ref: "Equipment", required: true },
  quantity: { type: Number, required: true }
});

const bookingSchema = new mongoose.Schema(
  {
    userName: { type: String, required: true },
    date: { type: Date, required: true },
    startTime: { type: String, required: true },
    endTime: { type: String, required: true },
    court: { type: mongoose.Schema.Types.ObjectId, ref: "Court", required: true },
    equipmentItems: [equipmentItemSchema],
    coach: { type: mongoose.Schema.Types.ObjectId, ref: "Coach" },
    totalPrice: { type: Number, required: true },
    priceBreakdown: { type: Object, default: {} },
    status: {
      type: String,
      enum: ["CONFIRMED", "CANCELLED"],
      default: "CONFIRMED"
    }
  },
  { timestamps: true }
);

bookingSchema.index(
  { court: 1, date: 1, startTime: 1, endTime: 1, status: 1 },
  { unique: true, partialFilterExpression: { status: "CONFIRMED" } }
);

const Booking = mongoose.model("Booking", bookingSchema);
export default Booking;
