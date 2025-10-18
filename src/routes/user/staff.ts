import { Router } from "express";
import {getStaff,getStaffById,createStaff,updateStaffById,deleteStaffById,}
from "../../controllers/user/staff";

const router = Router();

router.get("/", getStaff);
router.get("/:id", getStaffById);
router.post("/", createStaff);
router.put("/:id", updateStaffById);
router.delete("/:id", deleteStaffById);

export default router;
