import User from "../model/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
  const { email, password, name } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ success: false, message: "User already exists" });
    }

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);
    const newUser = new User({
      name,
      email,
      password: hash,
    });
    await newUser.save();
    res
      .status(201)
      .json({ success: true, message: "User created successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: "Error creating user",
      error: err.message,
    });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(400).json({ message: "Invalid password" });
    }

    const token = jwt.sign(
      { id: user._id, isAdmin: user.isAdmin },
      process.env.JWT_SECRET || "fallback_secret_key_123",
      { expiresIn: "24h" }
    );

    const { password: _, ...userWithoutPassword } = user._doc;

    res
      .cookie("access_token", token, {
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 24 * 60 * 60 * 1000,
      })
      .status(200)
      .json({
        success: true,
        user: userWithoutPassword,
        token,
      });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error logging in", error: err.message });
  }
};

export const logout = async (req, res) => {
  try {
    res
      .clearCookie("access_token")
      .status(200)
      .json({ message: "Logged out successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error logging out", error: err.message });
  }
};

export const verifyUser = async (req, res) => {
  try {
    const token = req.cookies.access_token;
    if (!token) {
      res.json({ status: false });
    }
    jwt.verify(token, process.env.JWT_SECRET, async (err, data) => {
      if (err) {
        res.json({ status: false });
      }
      const user = await User.findById(data.id);
      if (user) {
        res.json({ status: true, user: user.name, isAdmin: user.isAdmin });
      } else {
        res.json({ status: false });
      }
    });
  } catch (e) {
    console.error(e);
  }
};
