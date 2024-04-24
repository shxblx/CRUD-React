import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";
import generateToken from "../utils/generateToken.js";
import cloudinary from "../utils/cloudinary.js";

const authAdmin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const admin = await User.findOne({ email });
  if (admin && admin.isAdmin && (await admin.matchPassword(password))) {
    generateToken(res, admin._id, "jwt");
    res.status(201).json({
      _id: admin._id,
      name: admin.name,
      email: admin.email,
    });
  } else {
    throw new Error("Invalid email or password");
  }
});

const adminLogout = asyncHandler(async (req, res) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });
  res.status(200).json({ message: "Admin Logged out" });
});

const getUsers = asyncHandler(async (req, res) => {
  const userData = await User.find({ isAdmin: { $ne: true } })
    .select("-password")
    .sort({ updatedAt: -1 });
  res.status(200).json(userData);
});

export { authAdmin, adminLogout, getUsers };
