import Router from "express";
import quoteController from "../controllers/quote.controller.js";

const router = Router();

router.post("/", quoteController.create);
router.put("/", quoteController.update);
router.delete("/:id", quoteController.delete);
router.get("/", quoteController.findAll);

export default router;
