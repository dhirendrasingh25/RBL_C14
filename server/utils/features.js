import mongoose from "mongoose";
import jwt from "jsonwebtoken";
// import { v4 as uuid } from "uuid";

export const cookieOptions = {
  maxAge: 15 * 24 * 60 * 60 * 1000,
  sameSite: "strict",
  httpOnly: true,
  secure: false,
};

export const connectDB = (uri) => {
  mongoose
    .connect(uri, { dbName: "DataBase" })
    .then((data) => console.log(`Connected to DB : ${data.connection.host}`))
    .catch((err) => {
      throw err;
    });
};

export const sendToken = (res, user, code, message) => {
  const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "24h",
  });

  return res.status(code).cookie("user", token, cookieOptions).json({
    success: true,
    user,
    message,
  });
};
