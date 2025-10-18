import { Router } from "express";
import {getMedTechs,getMedTechsWithStaff,getMedTechById,createMedTech,updateMedTechById,deleteMedTechById,}
from "../../controllers/user/medtech";

const router = Router();

// Read
router.get("/", getMedTechs);
router.get("/with-staff", getMedTechsWithStaff);
router.get("/:id", getMedTechById);

// Write
router.post("/", createMedTech);
router.put("/:id", updateMedTechById);
router.delete("/:id", deleteMedTechById);

export default router;
