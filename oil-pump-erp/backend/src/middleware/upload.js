import multer from "multer";
import fs from "fs";
import path from "path";
import { env } from "../config/env.js";

const dir = env.UPLOAD_DIR;
if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, dir),
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, `${Date.now()}-${Math.round(Math.random()*1e9)}${ext}`);
  },
});

export const upload = multer({ storage });
