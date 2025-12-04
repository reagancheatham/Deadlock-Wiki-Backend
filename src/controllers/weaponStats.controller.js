import WeaponStats from "../models/weaponStats.model.js";
import routesUtil from "../util/routesUtil.js";

export default {
    async create(req, res) {
        const weaponInfo = req.body;

        console.log(
            `Creating weapon stats with info: ${JSON.stringify(weaponInfo)}.`
        );

        await WeaponStats.create(weaponInfo)
            .then((data) => {
                routesUtil.success(
                    res,
                    "Successfully created weapon stats.",
                    data
                );
            })
            .catch((err) => {
                routesUtil.error(res, `Error creating weapon stats: ${err}`);
            });
    },
    async update(req, res) {
        const weaponInfo = req.body;

        console.log(
            `Updating weapon stats with info: ${JSON.stringify(weaponInfo)}.`
        );

        await WeaponStats.update(weaponInfo, {
            where: {
                id: weaponInfo.id,
            },
        })
            .then((result) => {
                if (result == 1) {
                    routesUtil.success(res, "Successfully updated weapon.", {});
                } else {
                    routesUtil.success(
                        res,
                        `Could not find weapon stats with id: ${weaponInfo.id}`,
                        {}
                    );
                }
            })
            .catch((err) => {
                routesUtil.error(res, `Error updating weapon stats: ${err}`);
            });
    },
    async delete(req, res) {
        const id = req.params.id;

        console.log(`Deleting weapon stats: ${id}.`);

        await WeaponStats.destroy({
            where: {
                id,
            },
        })
            .then(() => {
                routesUtil.success(
                    res,
                    "Successfully deleted weapon stats.",
                    {}
                );
            })
            .catch((err) => {
                routesUtil.error(res, `Error deleting weapon stats: ${err}`);
            });
    },
    async find(req, res) {
        const id = req.params.id;

        console.log(`Finding weapon stats: ${id}.`);

        await WeaponStats.findByPk(id)
            .then((weaponStats) => {
                routesUtil.success(
                    res,
                    `Successfully found weapon stats: ${JSON.stringify(
                        weaponStats
                    )}.`,
                    weaponStats
                );
            })
            .catch((err) => {
                routesUtil.error(res, `Error finding weapon stats: ${err}`);
            });
    },
    async findByWeaponID(req, res) {
        const weaponID = req.params.weaponID;

        console.log(`Finding weapon stats: ${weaponID}.`);

        await WeaponStats.find({
            where: {
                weaponID,
            },
        })
            .then((weaponStats) => {
                routesUtil.success(
                    res,
                    `Successfully found weapon stats: ${JSON.stringify(
                        weaponStats
                    )}.`,
                    weaponStats
                );
            })
            .catch((err) => {
                routesUtil.error(res, `Error finding weapon stats: ${err}`);
            });
    },
    async findAll(req, res) {
        await WeaponStats.findAll()
            .then((weapons) => {
                routesUtil.success(
                    res,
                    "Successfully found all weapon stats",
                    weapons
                );
            })
            .catch((err) => {
                routesUtil.error(res, `Error finding all weapon stats: ${err}`);
            });
    },
};
