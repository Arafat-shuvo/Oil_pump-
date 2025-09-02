import { SalesEntry } from "../models/SalesEntry.js";
import { Product } from "../models/Product.js";
import { LedgerEntry } from "../models/LedgerEntry.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const createSale = asyncHandler(async (req, res) => {
  const { product: productId, liters, pricePerLiter, payments = [], date, shift, meterOpening, meterClosing, nozzle, operator } = req.body;

  const product = await Product.findById(productId);
  if (!product) return res.status(400).json({ message: "Invalid product" });

  const ppl = pricePerLiter ?? product.pricePerLiter;
  const totalAmount = Math.round((Number(liters) * Number(ppl)) * 100) / 100;

  const files = (req.files || []).map(f => `/uploads/${f.filename}`);

  const sale = await SalesEntry.create({
    date,
    shift,
    product: productId,
    liters,
    pricePerLiter: ppl,
    totalAmount,
    meterOpening,
    meterClosing,
    nozzle,
    operator,
    payments,
    attachments: files,
    createdBy: req.user._id
  });

  // Simple ledger postings: credit Sales, debit Cash/Bank by payment methods
  const legs = [];
  for (const p of payments) {
    const account = p.method === "cash" ? "Cash" : "Bank";
    legs.push({
      date: sale.date,
      account,
      type: "debit",
      amount: p.amount,
      memo: `Sale ${sale._id} ${p.method}`,
      refModel: "SalesEntry",
      refId: sale._id,
      createdBy: req.user._id
    });
  }
  legs.push({
    date: sale.date,
    account: "Sales",
    type: "credit",
    amount: totalAmount,
    memo: `Fuel sale ${sale._id}`,
    refModel: "SalesEntry",
    refId: sale._id,
    createdBy: req.user._id
  });
  await LedgerEntry.insertMany(legs);

  res.status(201).json(sale);
});

export const listSales = asyncHandler(async (req, res) => {
  const { from, to, product } = req.query;
  const q = {};
  if (from || to) {
    q.date = {};
    if (from) q.date.$gte = new Date(from);
    if (to) q.date.$lte = new Date(to);
  }
  if (product) q.product = product;
  const sales = await SalesEntry.find(q).populate("product").populate("operator").sort({ date: -1, createdAt: -1 });
  res.json(sales);
});
