import { Router } from "express";
import { createBooking, getBookings, getBookingById } from "../controllers/bookingController.js";

const router = Router();

router.post("/", createBooking);   // Create a new booking
router.get("/", getBookings);      // Get all bookings
router.get("/:id", getBookingById);  // Get a booking by ID

export default router;
