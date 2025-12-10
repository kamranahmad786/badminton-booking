import PricingRule from "../models/PricingRule.js";

export async function calculatePrice(ctx) {
  const rules = await PricingRule.find({ enabled: true }).lean();

  const { court, date, startTime, endTime, equipmentItems, coach } = ctx;
  const durationHours =
    (timeToMinutes(endTime) - timeToMinutes(startTime)) / 60;

  const isWeekend = [0, 6].includes(date.getDay());
  const isPeakHour =
    withinInterval(startTime, "18:00", "21:00") ||
    withinInterval(endTime, "18:00", "21:00");

  let baseCourtRatePerHour = 0;
  const breakdown = {
    baseCourt: 0,
    peakSurcharge: 0,
    weekendSurcharge: 0,
    indoorPremium: 0,
    equipmentTotal: 0,
    coachFee: 0
  };

  for (const rule of rules) {
    const { type, conditions, amountType, amount } = rule;
    switch (type) {
      case "BASE_RATE":
        if (conditions.appliesTo === "COURT") {
          baseCourtRatePerHour = amount;
        }
        break;
      case "PEAK_HOUR":
        if (isPeakHour) {
          const value =
            amountType === "FLAT"
              ? amount * durationHours
              : (amount / 100) * baseCourtRatePerHour * durationHours;
          breakdown.peakSurcharge += value;
        }
        break;
      case "WEEKEND":
        if (isWeekend) {
          const base = baseCourtRatePerHour * durationHours;
          const value =
            amountType === "FLAT" ? amount : (amount / 100) * base;
          breakdown.weekendSurcharge += value;
        }
        break;
      case "INDOOR_PREMIUM":
        if (court.type === "INDOOR") {
          const base = baseCourtRatePerHour * durationHours;
          const value =
            amountType === "FLAT" ? amount : (amount / 100) * base;
          breakdown.indoorPremium += value;
        }
        break;
      case "EQUIPMENT_FEE":
        if (equipmentItems && equipmentItems.length) {
          const value =
            amountType === "FLAT"
              ? amount * totalEquipmentQty(equipmentItems) * durationHours
              : 0;
          breakdown.equipmentTotal += value;
        }
        break;
      case "COACH_FEE":
        if (coach) {
          const base = (coach.hourlyRateBase || 0) * durationHours;
          const value =
            amountType === "FLAT"
              ? amount * durationHours
              : (amount / 100) * base;
          breakdown.coachFee += base + value;
        }
        break;
      default:
        break;
    }
  }

  breakdown.baseCourt = baseCourtRatePerHour * durationHours;

  const totalPrice =
    breakdown.baseCourt +
    breakdown.peakSurcharge +
    breakdown.weekendSurcharge +
    breakdown.indoorPremium +
    breakdown.equipmentTotal +
    breakdown.coachFee;

  return { totalPrice: Math.round(totalPrice), breakdown };
}

function timeToMinutes(t) {
  const [h, m] = t.split(":").map(Number);
  return h * 60 + m;
}

function withinInterval(t, start, end) {
  const x = timeToMinutes(t);
  return x >= timeToMinutes(start) && x <= timeToMinutes(end);
}

function totalEquipmentQty(items) {
  return items.reduce((sum, i) => sum + (i.quantity || 0), 0);
}
