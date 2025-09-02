import { Router } from "express";
import { createEmployee, listEmployees, updateEmployee, deleteEmployee } from "../controllers/employeeController.js";
import { protect, authorize } from "../middleware/auth.js";
const router = Router();

router.use(protect);

router.get("/", listEmployees);
router.post("/", authorize("admin", "manager"), createEmployee);
router.put("/:id", authorize("admin", "manager"), updateEmployee);
router.delete("/:id", authorize("admin"), deleteEmployee);

export default router;
