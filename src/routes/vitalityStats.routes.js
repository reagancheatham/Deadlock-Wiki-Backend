import Router from "express";
import vitalityStatsController from "../controllers/vitalityStats.controller.js";

const router = Router();

router.post("/", vitalityStatsController.create);
router.put("/", vitalityStatsController.update);
router.delete("/:characterID", vitalityStatsController.deleteByCharacterID);
router.get("/:characterID", vitalityStatsController.findByCharacterID);

export default router;