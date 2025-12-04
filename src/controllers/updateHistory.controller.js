import UpdateHistory from "../models/updateHistory.model.js";
import routesUtil from "../util/routesUtil.js";

export default {
    async create(req, res) {
        const abilityInfo = req.body;

        console.log(
            `Creating update history with info: ${JSON.stringify(abilityInfo)}.`
        );

        await UpdateHistory.create(abilityInfo)
            .then((data) => {
                routesUtil.success(res, "Successfully created update history.", data);
            })
            .catch((err) => {
                routesUtil.error(res, `Error creating update history: ${err}`);
            });
    },
    async update(req, res) {
        const abilityInfo = req.body;

        console.log(
            `Updating update history with info: ${JSON.stringify(abilityInfo)}.`
        );

        await UpdateHistory.upsert(abilityInfo, { returning: true })
            .then((result) => {
                routesUtil.success(
                    res,
                    "Successfully updated update history.",
                    result[0]
                );
            })
            .catch((err) => {
                routesUtil.error(res, `Error updating update history: ${err}`);
            });
    },
    async delete(req, res) {
        const id = req.params.id;

        console.log(`Deleting update history: ${id}.`);

        await UpdateHistory.destroy({
            where: {
                id,
            },
        })
            .then(() => {
                routesUtil.success(res, "Successfully deleted update history.", {});
            })
            .catch((err) => {
                routesUtil.error(res, `Error deleting update history: ${err}`);
            });
    },
    async findAll(req, res) {
        await UpdateHistory.findAll()
            .then((updateHistory) => {
                console.log("updateHistory: " + JSON.stringify(updateHistory));

                routesUtil.success(
                    res,
                    "Successfully found all update history",
                    updateHistory
                );
            })
            .catch((err) => {
                routesUtil.error(res, `Error finding all update history: ${err}`);
            });
    },
};
