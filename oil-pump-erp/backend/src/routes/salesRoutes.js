import { Router } from "express";
import { createSale, listSales } from "../controllers/salesController.js";
import { protect } from "../middleware/auth.js";
import { upload } from "../middleware/upload.js";

const router = Router();
router.use(protect);

router.get("/", listSales);
router.post("/", upload.array("files", 5), createSale);

export default router;
