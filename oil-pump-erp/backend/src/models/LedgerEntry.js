import mongoose from "mongoose";

const ledgerEntrySchema = new mongoose.Schema({
  date: { type: Date, default: Date.now },
  account: { 
    type: String,
    enum: ["Cash", "Bank", "Sales", "Expense", "Inventory", "COGS", "Receivable", "Payable"],
    required: true
  },
  type: { type: String, enum: ["debit", "credit"], required: true },
  amount: { type: Number, required: true },
  memo: String,
  refModel: String,
  refId: { type: mongoose.Schema.Types.ObjectId },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
}, { timestamps: true });

export const LedgerEntry = mongoose.model("LedgerEntry", ledgerEntrySchema);
