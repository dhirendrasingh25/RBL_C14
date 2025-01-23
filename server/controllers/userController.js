import { TryCatch } from "../middlewares/error.js";
import { ErrorHandler } from "../utils/utility.js";
import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
import { sendToken } from "../utils/features.js";
import jwt from "jsonwebtoken";

// Register User
export const register = TryCatch(async (req, res, next) => {
  const { username, email, password, phone, company } = req.body;

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await User.create({
    username,
    email,
    password: hashedPassword,
    phone,
    company,
  });

  sendToken(res, user, 201, "User registered successfully");
});

// Login User
export const login = TryCatch(async (req, res, next) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    return next(new ErrorHandler("User Does not Exist", 400));
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return next(new ErrorHandler("Invalid credentials", 400));
  }

  sendToken(res, user, 200, "Login successful");
});

//get User
export const getUser = TryCatch(async (req, res, next) => {
  const token = req.cookies["user"];
  if (!token) {
    return next(new ErrorHandler("JWT token not found", 401));
  }

  try {
    const decodedData = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decodedData._id);

    if (!user) return next(new ErrorHandler("User not found", 404));

    sendToken(res, user, 200, `Welcome, ${user.name}`);
  } catch (error) {
    return next(new ErrorHandler("Invalid Token", 401));
  }
});
