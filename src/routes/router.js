import { Router } from "express";
import characterRoutes from "./character.routes.js";
import characterInfoRoutes from "./characterInfo.routes.js";
import vitalityStatsRoutes from "./vitalityStats.routes.js";
import weaponRoutes from "./weapon.routes.js";
import weaponStatRoutes from "./weaponStats.routes.js";
import abilityRoutes from "./ability.routes.js";
import abilityStatsRoutes from "./abilityStats.routes.js";

const router = Router();

router.use((req, res, next) => {
    console.log("router received request " + req.url);

    next();
});

router.use("/characters", characterRoutes);
router.use("/characters/info", characterInfoRoutes);
router.use("/characters/vitality", vitalityStatsRoutes);
router.use("/weapons", weaponRoutes);
router.use("/weapons/stats", weaponStatRoutes);
router.use("/abilities", abilityRoutes);
router.use("/abilities/stats", abilityStatsRoutes);

export default router;
