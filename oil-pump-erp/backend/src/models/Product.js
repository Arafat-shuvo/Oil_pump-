import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: { type: String, required: true }, // e.g., Petrol, Diesel, Octane
  pricePerLiter: { type: Number, required: true },
  active: { type: Boolean, default: true },
}, { timestamps: true });

export const Product = mongoose.model("Product", productSchema);
