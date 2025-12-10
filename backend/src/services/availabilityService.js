import Booking from "../models/Booking.js";
import Equipment from "../models/Equipment.js";

export async function isCourtAvailable({ courtId, date, startTime, endTime }) {
  const conflict = await Booking.findOne({
    court: courtId,
    date,
    status: "CONFIRMED",
    startTime: { $lt: endTime },
    endTime: { $gt: startTime }
  }).lean();
  return !conflict;
}

export async function equipmentAvailabilityOK({ equipmentItems, date, startTime, endTime }) {
  if (!equipmentItems || !equipmentItems.length) return true;

  for (const item of equipmentItems) {
    const equipment = await Equipment.findById(item.equipment).lean();
    if (!equipment || !equipment.isActive) return false;

    const bookings = await Booking.find({
      date,
      status: "CONFIRMED",
      "equipmentItems.equipment": equipment._id,
      startTime: { $lt: endTime },
      endTime: { $gt: startTime }
    }).lean();

    const alreadyBookedQty = bookings.reduce((sum, b) => {
      const match = (b.equipmentItems || []).find(
        (ei) => ei.equipment.toString() === equipment._id.toString()
      );
      return sum + (match ? match.quantity : 0);
    }, 0);

    if (alreadyBookedQty + item.quantity > equipment.totalQuantity) {
      return false;
    }
  }
  return true;
}
