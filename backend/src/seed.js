import dotenv from "dotenv";
dotenv.config();

import { connectDB } from "./config/db.js";
import Court from "./models/Court.js";
import Equipment from "./models/Equipment.js";
import Coach from "./models/Coach.js";
import PricingRule from "./models/PricingRule.js";

async function seed() {
  await connectDB();

  await Promise.all([
    Court.deleteMany({}),
    Equipment.deleteMany({}),
    Coach.deleteMany({}),
    PricingRule.deleteMany({})
  ]);

  await Court.insertMany([
    { name: "Court 1", type: "INDOOR" },
    { name: "Court 2", type: "INDOOR" },
    { name: "Court 3", type: "OUTDOOR" },
    { name: "Court 4", type: "OUTDOOR" }
  ]);

  await Equipment.insertMany([
    { name: "Racket", totalQuantity: 12 },
    { name: "Shoes", totalQuantity: 8 }
  ]);

  await Coach.insertMany([
    {
      name: "Coach A",
      bio: "Beginner training specialist.",
      hourlyRateBase: 400,
      availability: [{ dayOfWeek: 5, startTime: "17:00", endTime: "21:00" }]
    },
    {
      name: "Coach B",
      bio: "Intermediate players.",
      hourlyRateBase: 500,
      availability: [{ dayOfWeek: 6, startTime: "16:00", endTime: "20:00" }]
    },
    {
      name: "Coach C",
      bio: "Advanced drills.",
      hourlyRateBase: 600,
      availability: [{ dayOfWeek: 0, startTime: "10:00", endTime: "14:00" }]
    }
  ]);

  await PricingRule.insertMany([
    {
      name: "Base court hourly rate",
      type: "BASE_RATE",
      conditions: { appliesTo: "COURT" },
      amountType: "FLAT",
      amount: 300
    },
    {
      name: "Peak hour surcharge",
      type: "PEAK_HOUR",
      conditions: { isPeakHour: true },
      amountType: "PERCENT",
      amount: 20
    },
    {
      name: "Weekend surcharge",
      type: "WEEKEND",
      conditions: { isWeekend: true },
      amountType: "PERCENT",
      amount: 30
    },
    {
      name: "Indoor premium",
      type: "INDOOR_PREMIUM",
      conditions: { indoorOnly: true },
      amountType: "FLAT",
      amount: 100
    },
    {
      name: "Equipment fee per unit/hour",
      type: "EQUIPMENT_FEE",
      conditions: { appliesTo: "EQUIPMENT" },
      amountType: "FLAT",
      amount: 50
    },
    {
      name: "Coach service fee",
      type: "COACH_FEE",
      conditions: { appliesTo: "COACH" },
      amountType: "PERCENT",
      amount: 10
    }
  ]);

  console.log("✅ Seed complete");
  process.exit(0);
}

seed().catch((e) => {
  console.error(e);
  process.exit(1);
});
