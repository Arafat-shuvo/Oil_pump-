import mongoose from "mongoose";

const employeeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phone: String,
  nid: String,
  role: { type: String, default: "staff" }, // attendant, supervisor, accountant, etc.
  salary: { type: Number, default: 0 },
  joinedAt: { type: Date, default: Date.now },
  status: { type: String, enum: ["active", "inactive"], default: "active" },
}, { timestamps: true });

export const Employee = mongoose.model("Employee", employeeSchema);
