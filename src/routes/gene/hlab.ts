import { Router } from "express";
import { createHLAB, deleteHLABById, getHLAB, getHLABById, updateHLABById } from "../../controllers/gene/hlab";


const router = Router();

router.get("/", getHLAB);
router.get("/:id", getHLABById);
router.post("/", createHLAB);
router.put("/:id", updateHLABById);
router.delete("/:id", deleteHLABById);

export default router;
