import Router from "express";
import updateHistoryController from "../controllers/updateHistory.controller.js";

const router = Router();

router.post("/", updateHistoryController.create);
router.put("/", updateHistoryController.update);
router.delete("/:id", updateHistoryController.delete);
router.get("/", updateHistoryController.findAll);

export default router;
