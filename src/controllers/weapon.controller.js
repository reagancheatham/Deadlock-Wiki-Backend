import Weapon from "../models/weapon.model.js";
import routesUtil from "../util/routesUtil.js";

export default {
    async create(req, res) {
        const weaponInfo = req.body;

        console.log(
            `Creating weapon with info: ${JSON.stringify(weaponInfo)}.`
        );

        await Weapon.create(weaponInfo)
            .then((data) => {
                routesUtil.success(res, "Successfully created weapon.", data);
            })
            .catch((err) => {
                routesUtil.error(res, `Error creating weapon: ${err}`);
            });
    },
    async update(req, res) {
        const weaponInfo = req.body;

        console.log(
            `Updating weapon with info: ${JSON.stringify(weaponInfo)}.`
        );

        await Weapon.upsert(weaponInfo, { returning: true })
            .then((result) => {
                routesUtil.success(res, "Successfully updated weapon.", result[0]);
            })
            .catch((err) => {
                routesUtil.error(res, `Error updating weapon: ${err}`);
            });
    },
    async delete(req, res) {
        const id = req.params.id;

        console.log(`Deleting weapon: ${id}.`);

        await Weapon.destroy({
            where: {
                id,
            },
        })
            .then(() => {
                routesUtil.success(res, "Successfully deleted weapon.", {});
            })
            .catch((err) => {
                routesUtil.error(res, `Error deleting weapon: ${err}`);
            });
    },
    async find(req, res) {
        const id = req.params.id;

        console.log(`Finding weapon: ${id}.`);

        await Weapon.findByPk(id)
            .then((weapon) => {
                routesUtil.success(
                    res,
                    `Successfully found weapon: ${JSON.stringify(weapon)}.`,
                    weapon
                );
            })
            .catch((err) => {
                routesUtil.error(res, `Error finding weapon: ${err}`);
            });
    },
    async findByCharacterID(req, res) {
        const characterID = req.params.characterID;

        console.log(`Finding character weapon: ${characterID}.`);

        await Weapon.findOne({ where: characterID })
            .then((weapon) => {
                routesUtil.success(
                    res,
                    `Successfully found weapon: ${JSON.stringify(weapon)}.`,
                    weapon
                );
            })
            .catch((err) => {
                routesUtil.error(res, `Error finding weapon: ${err}`);
            });
    },
    async findAll(req, res) {
        await Weapon.findAll()
            .then((weapons) => {
                routesUtil.success(
                    res,
                    "Successfully found all weapons",
                    weapons
                );
            })
            .catch((err) => {
                routesUtil.error(res, `Error finding all weapons: ${err}`);
            });
    },
};
