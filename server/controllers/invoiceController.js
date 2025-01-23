import { TryCatch } from "../middlewares/error.js";
import { ErrorHandler } from "../utils/utility.js";
import { sendToken } from "../utils/features.js";
import Invoice from "../models/invoiceModel.js";
import User from "../models/userModel.js";

// Create Invoice
export const createInvoice = TryCatch(async (req, res, next) => {
  const { invoiceNumber, invoiceDate, invoiceAmount, userId } = req.body;

  const user = await User.findById(userId);
  if (!user) {
    return next(new ErrorHandler("User not found", 404));
  }

  const date = new Date(invoiceDate);
  const year = date.getFullYear();
  const month = date.getMonth();
  const financialYear =
    month >= 3 ? `${year}-${year + 1}` : `${year - 1}-${year}`;

  const existingInvoice = await Invoice.findOne({
    invoiceNumber,
    financialYear,
    user: userId,
  });

  if (existingInvoice) {
    return next(
      new ErrorHandler(
        "Invoice number already exists for this financial year",
        400
      )
    );
  }

  const prevInvoice = await Invoice.findOne({
    financialYear,
    user: userId,
  }).sort({
    invoiceDate: -1,
  });
  const nextInvoice = await Invoice.findOne({
    financialYear,
    user: userId,
  }).sort({
    invoiceDate: 1,
  });

  if (
    (prevInvoice && new Date(invoiceDate) < prevInvoice.invoiceDate) ||
    (nextInvoice && new Date(invoiceDate) > nextInvoice.invoiceDate)
  ) {
    return next(
      new ErrorHandler(
        "Invoice date does not align with other invoices in the financial year",
        400
      )
    );
  }

  const newInvoice = await Invoice.create({
    invoiceNumber,
    invoiceDate,
    invoiceAmount,
    financialYear,
    user: userId,
  });

  sendToken(res, newInvoice, 201, "Invoice created successfully");
});

// Update Invoice
export const updateInvoice = TryCatch(async (req, res, next) => {
  const { invoiceNumber } = req.params;
  const { userId } = req.body;

  const updatedInvoice = await Invoice.findOneAndUpdate(
    { invoiceNumber, user: userId },
    req.body,
    { new: true }
  );

  if (!updatedInvoice) {
    return next(new ErrorHandler("Invoice not found", 404));
  }

  sendToken(res, updatedInvoice, 200, "Invoice updated successfully");
});

// Delete Invoice
export const deleteInvoice = TryCatch(async (req, res, next) => {
  const { invoiceNumber } = req.params;
  const { userId } = req.body;

  const deletedInvoice = await Invoice.findOneAndDelete({
    invoiceNumber,
    user: userId,
  });

  if (!deletedInvoice) {
    return next(new ErrorHandler("Invoice not found", 404));
  }

  res
    .status(200)
    .json({ success: true, message: "Invoice deleted successfully" });
});

// Get All Invoices for a User
export const getAllInvoices = TryCatch(async (req, res, next) => {
  const { userId } = req.params;
  const invoices = await Invoice.find({ user: userId });

  sendToken(res, invoices, 200, "Invoices fetched successfully");
});

// Filter Invoices for a User
export const filterInvoices = TryCatch(async (req, res, next) => {
  const { userId, financialYear, invoiceNumber, startDate, endDate } =
    req.query;
  let query = { user: userId };

  if (financialYear) query.financialYear = financialYear;
  if (invoiceNumber)
    query.invoiceNumber = { $regex: invoiceNumber, $options: "i" };
  if (startDate && endDate) {
    query.invoiceDate = { $gte: new Date(startDate), $lte: new Date(endDate) };
  }

  const invoices = await Invoice.find(query);

  sendToken(res, invoices, 200, "Filtered invoices fetched successfully");
});
