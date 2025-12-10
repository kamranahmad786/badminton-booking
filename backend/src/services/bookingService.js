import mongoose from "mongoose";
import Court from "../models/Court.js";
import Coach from "../models/Coach.js";
import Booking from "../models/Booking.js";
import WaitlistEntry from "../models/WaitlistEntry.js";
import { calculatePrice } from "./pricingService.js";
import { isCourtAvailable, equipmentAvailabilityOK } from "./availabilityService.js";

export async function createBookingAtomic(payload) {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { userName, courtId, coachId, equipmentItems, date, startTime, endTime } =
      payload;

    const dateObj = new Date(date);

    const court = await Court.findById(courtId).session(session);
    if (!court || !court.isActive) {
      throw new Error("Court not available");
    }

    const coach = coachId
      ? await Coach.findById(coachId).session(session)
      : null;

    const courtFree = await isCourtAvailable({
      courtId,
      date: dateObj,
      startTime,
      endTime
    });

    const equipmentOK = await equipmentAvailabilityOK({
      equipmentItems: equipmentItems || [],
      date: dateObj,
      startTime,
      endTime
    });

    if (!courtFree || !equipmentOK) {
      await WaitlistEntry.create(
        [
          {
            userName,
            court: courtId,
            date: dateObj,
            startTime,
            endTime
          }
        ],
        { session }
      );
      await session.abortTransaction();
      session.endSession();
      return { waitlisted: true };
    }

    const { totalPrice, breakdown } = await calculatePrice({
      court,
      coach,
      equipmentItems: equipmentItems || [],
      date: dateObj,
      startTime,
      endTime
    });

    const bookingDocs = await Booking.create(
      [
        {
          userName,
          court: court._id,
          coach: coach ? coach._id : undefined,
          equipmentItems: equipmentItems || [],
          date: dateObj,
          startTime,
          endTime,
          totalPrice,
          priceBreakdown: breakdown
        }
      ],
      { session }
    );

    await session.commitTransaction();
    session.endSession();

    return { booking: bookingDocs[0], waitlisted: false };
  } catch (err) {
    await session.abortTransaction();
    session.endSession();
    throw err;
  }
}
