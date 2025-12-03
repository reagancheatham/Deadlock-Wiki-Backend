import Router from "express";
import characterController from "../controllers/character.controller.js";

const router = Router();

router.post("/", characterController.create);
router.put("/", characterController.update);
router.delete("/:name", characterController.delete);
router.get("/:name", characterController.find);
router.get("/", characterController.findAll);

export default router;
