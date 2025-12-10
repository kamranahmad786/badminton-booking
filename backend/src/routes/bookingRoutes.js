import express from "express";
import { createBooking, getBookingsForUser } from "../controllers/bookingController.js";

const router = express.Router();

router.post("/", createBooking);
router.get("/", getBookingsForUser);

export default router;
