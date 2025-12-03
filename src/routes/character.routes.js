import Router from "express";
import characterController from "../controllers/character.controller.js";

const router = Router();

router.post("/", characterController.create);

export default router;