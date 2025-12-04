import Router from "express";
import weaponController from "../controllers/weapon.controller.js";

const router = Router();

router.post("/", weaponController.create);
router.put("/", weaponController.update);
router.delete("/:id", weaponController.delete);
router.get("/character/:characterID", weaponController.findByCharacterID);
router.get("/:id", weaponController.find);
router.get("/", weaponController.findAll);

export default router;
