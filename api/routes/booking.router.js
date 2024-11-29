import { Router } from "express";
import {
  createBooking,
  deleteBooking,
  getBookings,
  getUserBookings,
} from "../controller/booking.controller.js";
import { verifyToken } from "../middleware/auth.js";

const bookingRouter = new Router();

bookingRouter.post("/", verifyToken, createBooking);
bookingRouter.get("/user", verifyToken, getUserBookings);
bookingRouter.get("/", verifyToken, getBookings);
bookingRouter.delete("/:id", verifyToken, deleteBooking);

export default bookingRouter;
