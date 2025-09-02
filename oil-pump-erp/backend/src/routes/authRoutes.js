import { Router } from "express";
import { register, login, me } from "../controllers/authController.js";
import { protect, authorize } from "../middleware/auth.js";
const router = Router();

router.post("/register", protect, authorize("admin"), register);
router.post("/login", login);
router.get("/me", protect, me);

export default router;
