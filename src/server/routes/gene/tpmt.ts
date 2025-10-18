import { Router } from "express";
import { createTPMT, deleteTPMTById, getTPMT, getTPMTById, updateTPMTById } from "../../controllers/gene/tpmt";


const router = Router();

router.get("/", getTPMT);
router.get("/:id", getTPMTById);
router.post("/", createTPMT);
router.put("/:id", updateTPMTById);
router.delete("/:id", deleteTPMTById);

export default router;
