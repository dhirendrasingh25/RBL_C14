import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connectDB } from "./utils/features.js";
import invoiceRoutes from "./routes/invoiceRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import cookieParser from "cookie-parser";
import { errorMiddleware } from "./middlewares/error.js";

const app = express();
dotenv.config({
  path: "./.env",
});

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(cookieParser());

connectDB(process.env.MONGO_URI);
const PORT = process.env.PORT || 1000;

app.use("/api/v1/invoices", invoiceRoutes);
app.use("/api/v1/auth", userRoutes);

app.use(errorMiddleware);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
