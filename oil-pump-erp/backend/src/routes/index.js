import { Router } from "express";
import authRoutes from "./authRoutes.js";
import employeeRoutes from "./employeeRoutes.js";
import salesRoutes from "./salesRoutes.js";
import accountingRoutes from "./accountingRoutes.js";
import reportRoutes from "./reportRoutes.js";
import uploadRoutes from "./uploadRoutes.js";

const router = Router();

router.use("/auth", authRoutes);
router.use("/employees", employeeRoutes);
router.use("/sales", salesRoutes);
router.use("/accounting", accountingRoutes);
router.use("/reports", reportRoutes);
router.use("/upload", uploadRoutes);

export default router;
