import Ability from "../models/ability.model.js";
import routesUtil from "../util/routesUtil.js";

export default {
    async create(req, res) {
        const abilityInfo = req.body;

        console.log(
            `Creating ability with info: ${JSON.stringify(abilityInfo)}.`
        );

        await Ability.create(abilityInfo)
            .then((data) => {
                routesUtil.success(res, "Successfully created ability.", data);
            })
            .catch((err) => {
                routesUtil.error(res, `Error creating ability: ${err}`);
            });
    },
    async update(req, res) {
        const abilityInfo = req.body;

        console.log(
            `Updating ability with info: ${JSON.stringify(abilityInfo)}.`
        );

        await Ability.upsert(abilityInfo, { returning: true })
            .then((result) => {
                routesUtil.success(
                    res,
                    "Successfully updated ability.",
                    result[0]
                );
            })
            .catch((err) => {
                routesUtil.error(res, `Error updating ability: ${err}`);
            });
    },
    async delete(req, res) {
        const id = req.params.id;

        console.log(`Deleting ability: ${id}.`);

        await Ability.destroy({
            where: {
                id,
            },
        })
            .then(() => {
                routesUtil.success(res, "Successfully deleted ability.", {});
            })
            .catch((err) => {
                routesUtil.error(res, `Error deleting ability: ${err}`);
            });
    },
    async find(req, res) {
        const id = req.params.id;

        console.log(`Finding ability: ${id}.`);

        await Ability.findByPk(id, { include: CharacterInfo })
            .then((ability) => {
                routesUtil.success(
                    res,
                    `Successfully found ability: ${JSON.stringify(ability)}.`,
                    ability
                );
            })
            .catch((err) => {
                routesUtil.error(res, `Error finding ability: ${err}`);
            });
    },
    async findAllForCharacter(req, res) {
        const characterID = req.params.characterID;

        await Ability.findAll({ where: { characterID } })
            .then((abilities) => {
                console.log("abilities: " + JSON.stringify(abilities));

                routesUtil.success(
                    res,
                    "Successfully found all abilities",
                    abilities
                );
            })
            .catch((err) => {
                routesUtil.error(res, `Error finding all abilities: ${err}`);
            });
    },
};
