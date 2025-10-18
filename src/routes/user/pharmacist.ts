import { Router } from "express";
import { createPharmacist, deletePharmacistById, getPharmacistById, getPharmacists, getPharmacistsWithStaff, updatePharmacistById } from "../../controllers/user/pharmacist";


const router = Router();

// Read
router.get("/", getPharmacists);
router.get("/with-staff", getPharmacistsWithStaff);
router.get("/:id", getPharmacistById);

// Write
router.post("/", createPharmacist);
router.put("/:id", updatePharmacistById);
router.delete("/:id", deletePharmacistById);

export default router;
