import Router from "express";
import abilityStatsController from "../controllers/abilityStats.controller.js";

const router = Router();

router.post("/", abilityStatsController.create);
router.put("/", abilityStatsController.update);
router.delete("/:id", abilityStatsController.delete);
router.get("/ability/:abilityID", abilityStatsController.findByAbilityID);

export default router;
