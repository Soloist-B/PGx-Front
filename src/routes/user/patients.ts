import { Router } from "express";
import { getPatients, createPatient, getPatientById, deletePatientById, updatePatientById } from "../../controllers/user/patients";

const router = Router();

router.get("/", getPatients);
router.post("/", createPatient);
router.get("/:id", getPatientById);
router.delete("/:id", deletePatientById)
router.put("/:id", updatePatientById)

export default router;
