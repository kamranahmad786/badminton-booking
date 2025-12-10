import mongoose from "mongoose";

const pricingRuleSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    type: {
      type: String,
      enum: [
        "BASE_RATE",
        "PEAK_HOUR",
        "WEEKEND",
        "INDOOR_PREMIUM",
        "EQUIPMENT_FEE",
        "COACH_FEE"
      ],
      required: true
    },
    enabled: { type: Boolean, default: true },
    conditions: {
      appliesTo: {
        type: String,
        enum: ["BOOKING", "COURT", "EQUIPMENT", "COACH"],
        default: "BOOKING"
      },
      isPeakHour: { type: Boolean, default: false },
      isWeekend: { type: Boolean, default: false },
      indoorOnly: { type: Boolean, default: false }
    },
    amountType: {
      type: String,
      enum: ["FLAT", "PERCENT"],
      default: "FLAT"
    },
    amount: { type: Number, required: true },
    metadata: {
      resource: { type: String }
    }
  },
  { timestamps: true }
);

const PricingRule = mongoose.model("PricingRule", pricingRuleSchema);
export default PricingRule;
