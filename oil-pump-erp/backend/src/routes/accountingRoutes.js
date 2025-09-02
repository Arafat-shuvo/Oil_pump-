import { Router } from "express";
import { createExpense, listTransactions, trialBalance } from "../controllers/accountingController.js";
import { protect, authorize } from "../middleware/auth.js";
const router = Router();

router.use(protect);

router.post("/expense", authorize("admin", "manager"), createExpense);
router.get("/transactions", listTransactions);
router.get("/trial-balance", trialBalance);

export default router;
