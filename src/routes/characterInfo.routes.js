import Router from "express";
import characterInfoController from "../controllers/characterInfo.controller.js";

const router = Router();

router.post("/", characterInfoController.create);
router.put("/", characterInfoController.update);
router.delete("/:characterName", characterInfoController.delete);
router.get("/:characterName", characterInfoController.find);
router.get("/", characterInfoController.findAll);

export default router;
