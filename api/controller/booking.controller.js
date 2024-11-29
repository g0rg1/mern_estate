import Booking from "../model/Booking.js";
import House from "../model/House.js";

export const createBooking = async (req, res) => {
  try {
    const { houseId, numberOfDays } = req.body;
    const userId = req.user.id;

    const house = await House.findById(houseId);
    if (!house) {
      return res
        .status(404)
        .json({ success: false, message: "House not found" });
    }

    if (house.owner.toString() === userId) {
      return res
        .status(400)
        .json({ success: false, message: "You cannot book your own property" });
    }

    const totalPrice = house.price * numberOfDays;

    const newBooking = await Booking.create({
      user: userId,
      house: houseId,
      numberOfDays,
      totalPrice,
    });

    res.status(201).json({
      success: true,
      message: "Booking created successfully",
      booking: newBooking,
    });
  } catch (e) {
    console.error(e);
    res
      .status(500)
      .json({ success: false, message: "Failed to create booking" });
  }
};

export const getUserBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user.id })
      .populate("house", "name images price location")
      .sort({ createdAt: -1 });

    res.status(200).json(bookings);
  } catch (e) {
    console.error(e);
    res.status(500).json({ success: false, message: "Failed to get bookings" });
  }
};

export const getBookings = async (req, res) => {
  try {
    const bookings = await Booking.find()
      .populate("house", "name images price location")
      .populate("user", "username email")
      .sort({ createdAt: -1 });
    res.status(200).json(bookings);
  } catch (e) {
    res.status(500).json({ success: false, message: "Failed to get bookings" });
  }
};
export const deleteBooking = async (req, res) => {
  try {
    const bookings = await Booking.findByIdAndDelete(req.params.id);
    res.status(200).json(bookings);
  } catch (e) {
    res.status(500).json({ success: false, message: "Failed to get bookings" });
  }
};
