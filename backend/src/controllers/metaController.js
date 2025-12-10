import Court from "../models/Court.js";
import Equipment from "../models/Equipment.js";
import Coach from "../models/Coach.js";
import { calculatePrice } from "../services/pricingService.js";

export async function getAvailability(req, res, next) {
  try {
    const { date } = req.query;
    const dateObj = date ? new Date(date) : new Date();

    const [courts, equipment, coaches] = await Promise.all([
      Court.find({ isActive: true }).lean(),
      Equipment.find({ isActive: true }).lean(),
      Coach.find({ isActive: true }).lean()
    ]);

    res.json({
      date: dateObj.toISOString().slice(0, 10),
      courts,
      equipment,
      coaches
    });
  } catch (err) {
    next(err);
  }
}

export async function pricePreview(req, res, next) {
  try {
    const { courtId, coachId, equipmentItems, date, startTime, endTime } = req.body;
    if (!courtId || !date || !startTime || !endTime) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const [court, coach] = await Promise.all([
      Court.findById(courtId).lean(),
      coachId ? Coach.findById(coachId).lean() : null
    ]);

    if (!court) {
      return res.status(404).json({ message: "Court not found" });
    }

    const dateObj = new Date(date);

    const result = await calculatePrice({
      court,
      coach,
      equipmentItems: equipmentItems || [],
      date: dateObj,
      startTime,
      endTime
    });

    res.json(result);
  } catch (err) {
    next(err);
  }
}
