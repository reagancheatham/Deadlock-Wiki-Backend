import Router from "express";
import characterController from "../controllers/character.controller.js";
import vitalityStatsController from "../controllers/vitalityStats.controller.js";

const router = Router();
const VITALITY_PATH = "/vitality"

router.post("/", characterController.create);
router.put("/", characterController.update);
router.delete("/:id", characterController.delete);
router.get("/:id", characterController.find);
router.get("/", characterController.findAll);

export default router;
