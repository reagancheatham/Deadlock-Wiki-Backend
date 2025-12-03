import express from "express";
import characterRoutes from "./character.routes.js";

const router = express.Router();

router.use("/characters", characterRoutes);

export default router;
