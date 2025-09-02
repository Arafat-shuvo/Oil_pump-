import { Router } from "express";
import { upload } from "../middleware/upload.js";
import { uploadDone } from "../controllers/uploadController.js";
import { protect } from "../middleware/auth.js";

const router = Router();

router.post("/", protect, upload.array("files", 5), uploadDone);

export default router;
