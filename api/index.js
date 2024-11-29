import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import houseRouter from "./routes/house.router.js";
import userRouter from "./routes/user.route.js";
import authRouter from "./routes/auth.router.js";
import cookieParser from "cookie-parser";
import bookingRouter from "./routes/booking.router.js";
import cors from "cors";

const app = express();
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.use(express.json());
app.use(cookieParser());
app.use("/user", userRouter);
app.use("/auth", authRouter);
app.use("/house", houseRouter);
app.use("/booking", bookingRouter);

dotenv.config();

async function startApp() {
  try {
    await mongoose.connect(process.env.LINK);
    console.log("Connected to MongoDB");
    app.listen(process.env.PORT, () =>
      console.log(`Server started on port ${process.env.PORT}`)
    );
  } catch (e) {
    console.log(e);
  }
}

startApp();
