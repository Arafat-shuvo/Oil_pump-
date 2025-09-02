import { SalesEntry } from "../models/SalesEntry.js";
import { LedgerEntry } from "../models/LedgerEntry.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const dailySales = asyncHandler(async (req, res) => {
  const { date } = req.query;
  const day = date ? new Date(date) : new Date();
  const start = new Date(day); start.setHours(0,0,0,0);
  const end = new Date(day); end.setHours(23,59,59,999);

  const data = await SalesEntry.aggregate([
    { $match: { date: { $gte: start, $lte: end } } },
    { $lookup: { from: "products", localField: "product", foreignField: "_id", as: "product" } },
    { $unwind: "$product" },
    { $group: {
      _id: { product: "$product.name", shift: "$shift" },
      liters: { $sum: "$liters" },
      gross: { $sum: "$totalAmount" }
    }},
    { $group: {
      _id: "$_id.product",
      byShift: { $push: { shift: "$_id.shift", liters: "$liters", gross: "$gross" } },
      totalLiters: { $sum: "$liters" },
      totalGross: { $sum: "$gross" }
    }},
    { $project: { _id: 0, product: "$_id", byShift: 1, totalLiters: 1, totalGross: 1 } },
    { $sort: { product: 1 } }
  ]);

  res.json({ date: start.toISOString(), data });
});

export const periodSummary = asyncHandler(async (req, res) => {
  const { from, to } = req.query;
  const match = {};
  if (from || to) {
    match.date = {};
    if (from) match.date.$gte = new Date(from);
    if (to) match.date.$lte = new Date(to);
  }
  const data = await SalesEntry.aggregate([
    { $match: match },
    { $lookup: { from: "products", localField: "product", foreignField: "_id", as: "product" } },
    { $unwind: "$product" },
    { $group: {
      _id: "$product.name",
      liters: { $sum: "$liters" },
      gross: { $sum: "$totalAmount" },
      avgPPL: { $avg: "$pricePerLiter" }
    }},
    { $project: { _id: 0, product: "$_id", liters: 1, gross: 1, avgPPL: { $round: ["$avgPPL", 2] } } },
    { $sort: { product: 1 } }
  ]);
  res.json({ from, to, data });
});
