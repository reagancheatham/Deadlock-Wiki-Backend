import Router from "express";
import triviaController from "../controllers/trivia.controller.js";

const router = Router();

router.post("/", triviaController.create);
router.put("/", triviaController.update);
router.delete("/:id", triviaController.delete);
router.get("/", triviaController.findAll);

export default router;
