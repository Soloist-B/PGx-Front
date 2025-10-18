import { Router } from "express";
import {
  getAdmins,
  getAdminsWithStaff,
  getAdminById,
  createAdmin,
  updateAdminById,
  deleteAdminById,
} from "../../controllers/user/admin";

const router = Router();

router.get("/", getAdmins);
router.get("/with-staff", getAdminsWithStaff);
router.get("/:id", getAdminById);

router.post("/", createAdmin);
router.put("/:id", updateAdminById);
router.delete("/:id", deleteAdminById);

export default router;
