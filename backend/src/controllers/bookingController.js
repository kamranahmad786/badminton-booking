import Booking from "../models/Booking.js";
import { createBookingAtomic } from "../services/bookingService.js";

export async function createBooking(req, res, next) {
  try {
    const result = await createBookingAtomic(req.body);
    return res.status(201).json(result);
  } catch (err) {
    if (err.code === 11000) {
      return res.status(409).json({ message: "Slot just got booked. Try another." });
    }
    next(err);
  }
}

export async function getBookingsForUser(req, res, next) {
  try {
    const { userName } = req.query;
    const bookings = await Booking.find(
      userName ? { userName } : {}
    )
      .populate("court")
      .populate("coach")
      .sort({ date: -1 })
      .lean();
    res.json(bookings);
  } catch (err) {
    next(err);
  }
}
