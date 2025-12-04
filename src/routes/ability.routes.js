import Router from "express";
import abilityController from "../controllers/ability.controller.js";

const router = Router();

router.post("/", abilityController.create);
router.put("/", abilityController.update);
router.delete("/:id", abilityController.delete);
router.get("/character/:characterID", abilityController.findAllForCharacter);
router.get("/:id", abilityController.find);

export default router;
