import { Router } from "express";
import { dailySales, periodSummary } from "../controllers/reportController.js";
import { protect } from "../middleware/auth.js";
const router = Router();

router.use(protect);

router.get("/daily-sales", dailySales);
router.get("/period-summary", periodSummary);

export default router;
