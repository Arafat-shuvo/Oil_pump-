import { LedgerEntry } from "../models/LedgerEntry.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const createExpense = asyncHandler(async (req, res) => {
  const { date, amount, memo, method = "cash" } = req.body;
  const debit = await LedgerEntry.create({
    date,
    account: "Expense",
    type: "debit",
    amount,
    memo,
    createdBy: req.user._id
  });
  const credit = await LedgerEntry.create({
    date,
    account: method === "cash" ? "Cash" : "Bank",
    type: "credit",
    amount,
    memo: memo ? `Paid: ${memo}` : "Expense payment",
    createdBy: req.user._id
  });
  res.status(201).json({ debit, credit });
});

export const listTransactions = asyncHandler(async (req, res) => {
  const { from, to, account } = req.query;
  const q = {};
  if (from || to) {
    q.date = {};
    if (from) q.date.$gte = new Date(from);
    if (to) q.date.$lte = new Date(to);
  }
  if (account) q.account = account;
  const tx = await LedgerEntry.find(q).sort({ date: -1, createdAt: -1 });
  res.json(tx);
});

export const trialBalance = asyncHandler(async (req, res) => {
  const { from, to } = req.query;
  const match = {};
  if (from || to) {
    match.date = {};
    if (from) match.date.$gte = new Date(from);
    if (to) match.date.$lte = new Date(to);
  }
  const agg = await LedgerEntry.aggregate([
    { $match: match },
    { $group: { _id: "$account", debit: { $sum: { $cond: [{ $eq: ["$type", "debit"] }, "$amount", 0] } }, credit: { $sum: { $cond: [{ $eq: ["$type", "credit"] }, "$amount", 0] } } } },
    { $project: { account: "$_id", _id: 0, debit: 1, credit: 1, balance: { $subtract: ["$debit", "$credit"] } } },
    { $sort: { account: 1 } }
  ]);
  res.json(agg);
});
