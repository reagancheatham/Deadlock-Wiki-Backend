import Ability from "../models/ability.model.js";
import routesUtil from "../util/routesUtil.js";

export default {
    async create(req, res) {
        const abilityInfo = req.body;

        console.log(
            `Creating abililty with info: ${JSON.stringify(abilityInfo)}.`
        );

        await Ability.create(abilityInfo)
            .then((data) => {
                routesUtil.success(res, "Successfully created abililty.", data);
            })
            .catch((err) => {
                routesUtil.error(res, `Error creating abililty: ${err}`);
            });
    },
    async update(req, res) {
        const abilityInfo = req.body;

        console.log(
            `Updating abililty with info: ${JSON.stringify(abilityInfo)}.`
        );

        await Ability.upsert(abilityInfo, { returning: true })
            .then((result) => {
                routesUtil.success(
                    res,
                    "Successfully updated abililty.",
                    result[0]
                );
            })
            .catch((err) => {
                routesUtil.error(res, `Error updating abililty: ${err}`);
            });
    },
    async delete(req, res) {
        const id = req.params.id;

        console.log(`Deleting abililty: ${id}.`);

        await Ability.destroy({
            where: {
                id,
            },
        })
            .then(() => {
                routesUtil.success(res, "Successfully deleted abililty.", {});
            })
            .catch((err) => {
                routesUtil.error(res, `Error deleting abililty: ${err}`);
            });
    },
    async find(req, res) {
        const id = req.params.id;

        console.log(`Finding abililty: ${id}.`);

        await Ability.findByPk(id, { include: CharacterInfo })
            .then((abililty) => {
                routesUtil.success(
                    res,
                    `Successfully found abililty: ${JSON.stringify(abililty)}.`,
                    abililty
                );
            })
            .catch((err) => {
                routesUtil.error(res, `Error finding abililty: ${err}`);
            });
    },
    async findAllForCharacter(req, res) {
        const characterID = req.params.characterID;

        await Ability.findAll({ where: { characterID } })
            .then((characters) => {
                routesUtil.success(
                    res,
                    "Successfully found all abilities",
                    characters
                );
            })
            .catch((err) => {
                routesUtil.error(res, `Error finding all abilities: ${err}`);
            });
    },
};
