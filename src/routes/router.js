import { Router } from "express";
import characterRoutes from "./character.routes.js";
import characterInfoRoutes from "./characterInfo.routes.js";
import weaponRoutes from "./weapon.routes.js"

const router = Router();

router.use((req, res, next) => {
    console.log("router received request " + req.url);

    next();
});

router.use("/characters", characterRoutes);
router.use("/characterInfos", characterInfoRoutes);
router.use("/weapons", weaponRoutes);

export default router;
