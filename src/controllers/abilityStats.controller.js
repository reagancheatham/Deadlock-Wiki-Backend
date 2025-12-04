import AbilityStats from "../models/abilityStats.model.js";
import routesUtil from "../util/routesUtil.js";

export default {
    async create(req, res) {
        const abilityInfo = req.body;

        console.log(
            `Creating ability stats with info: ${JSON.stringify(abilityInfo)}.`
        );

        await AbilityStats.create(abilityInfo)
            .then((data) => {
                routesUtil.success(
                    res,
                    "Successfully created ability stats.",
                    data
                );
            })
            .catch((err) => {
                routesUtil.error(res, `Error creating ability stats: ${err}`);
            });
    },
    async update(req, res) {
        const abilityInfo = req.body;

        console.log(
            `Updating ability stats with info: ${JSON.stringify(abilityInfo)}.`
        );

        await AbilityStats.upsert(abilityInfo, { returning: true })
            .then((result) => {
                routesUtil.success(
                    res,
                    "Successfully updated ability stats.",
                    result[0]
                );
            })
            .catch((err) => {
                routesUtil.error(res, `Error updating ability stats: ${err}`);
            });
    },
    async delete(req, res) {
        const id = req.params.id;

        console.log(`Deleting ability stats: ${id}.`);

        await AbilityStats.destroy({
            where: {
                id,
            },
        })
            .then(() => {
                routesUtil.success(
                    res,
                    "Successfully deleted ability stats.",
                    {}
                );
            })
            .catch((err) => {
                routesUtil.error(res, `Error deleting ability stats: ${err}`);
            });
    },
    async findByAbilityID(req, res) {
        const abilityID = req.params.abilityID;

        await AbilityStats.findOne({ where: { abilityID } })
            .then((stats) => {
                routesUtil.success(
                    res,
                    "Successfully found ability stats",
                    stats
                );
            })
            .catch((err) => {
                routesUtil.error(res, `Error finding ability stats: ${err}`);
            });
    },
};
