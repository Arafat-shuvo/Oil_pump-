import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema({
  method: { type: String, enum: ["cash", "card", "mobile"], required: true },
  amount: { type: Number, required: true, min: 0 },
}, { _id: false });

const salesEntrySchema = new mongoose.Schema({
  date: { type: Date, default: Date.now },
  shift: { type: String, enum: ["morning", "evening", "night"], default: "morning" },
  product: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
  liters: { type: Number, required: true },
  pricePerLiter: { type: Number, required: true },
  totalAmount: { type: Number, required: true },
  meterOpening: Number,
  meterClosing: Number,
  nozzle: String,
  operator: { type: mongoose.Schema.Types.ObjectId, ref: "Employee" },
  payments: [paymentSchema],
  attachments: [String], // file paths
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
}, { timestamps: true });

export const SalesEntry = mongoose.model("SalesEntry", salesEntrySchema);
