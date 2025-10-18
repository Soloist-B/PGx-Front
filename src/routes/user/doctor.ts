import { Router } from "express";
import {
  getDoctors,
  getDoctorsWithStaff,
  getDoctorById,
  createDoctor,
  updateDoctorById,
  deleteDoctorById,
} from "../../controllers/user/doctor";

const router = Router();

// Read
router.get("/", getDoctors);
router.get("/with-staff", getDoctorsWithStaff);
router.get("/:id", getDoctorById);

// Write
router.post("/", createDoctor);
router.put("/:id", updateDoctorById);
router.delete("/:id", deleteDoctorById);

export default router;
