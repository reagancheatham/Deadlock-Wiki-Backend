import Router from "express";
import weaponStatsController from "../controllers/weaponStats.controller.js";

const router = Router();

router.post("/", weaponStatsController.create);
router.put("/", weaponStatsController.update);
router.delete("/:id", weaponStatsController.delete);
router.get("/weapon/:weaponID", weaponStatsController.findByWeaponID);
router.get("/:id", weaponStatsController.find);
router.get("/", weaponStatsController.findAll);

export default router;
