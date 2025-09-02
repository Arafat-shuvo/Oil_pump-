import { Employee } from "../models/Employee.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const createEmployee = asyncHandler(async (req, res) => {
  const emp = await Employee.create(req.body);
  res.status(201).json(emp);
});

export const listEmployees = asyncHandler(async (req, res) => {
  const q = {};
  if (req.query.status) q.status = req.query.status;
  const emps = await Employee.find(q).sort({ createdAt: -1 });
  res.json(emps);
});

export const updateEmployee = asyncHandler(async (req, res) => {
  const emp = await Employee.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!emp) return res.status(404).json({ message: "Not found" });
  res.json(emp);
});

export const deleteEmployee = asyncHandler(async (req, res) => {
  const emp = await Employee.findByIdAndDelete(req.params.id);
  if (!emp) return res.status(404).json({ message: "Not found" });
  res.json({ message: "Deleted" });
});
