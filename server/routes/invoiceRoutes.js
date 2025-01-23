import express from "express";
import {
  createInvoice,
  updateInvoice,
  deleteInvoice,
  getAllInvoices,
  filterInvoices,
} from "../controllers/invoiceController.js";
import { isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();
router.use(isAuthenticated);
router.post("/", createInvoice);
router.put("/:invoiceNumber", updateInvoice);
router.delete("/:invoiceNumber", deleteInvoice);
router.get("/", getAllInvoices);
router.get("/filter", filterInvoices);

export default router;
