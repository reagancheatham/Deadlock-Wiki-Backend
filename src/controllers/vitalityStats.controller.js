import VitalityStats from "../models/vitalityStats.model.js";
import routesUtil from "../util/routesUtil.js";

export default {
    async create(req, res) {
        const vitalityInfo = req.body;

        console.log(
            `Creating vitality stats with info: ${JSON.stringify(vitalityInfo)}.`
        );

        await VitalityStats.create(vitalityInfo)
            .then((data) => {
                routesUtil.success(
                    res,
                    "Successfully created vitality stats.",
                    data
                );
            })
            .catch((err) => {
                routesUtil.error(res, `Error creating vitality stats: ${err}`);
            });
    },
    async update(req, res) {
        const vitalityInfo = req.body;

        console.log(
            `Updating vitality stats with info: ${JSON.stringify(vitalityInfo)}.`
        );

        await VitalityStats.update(vitalityInfo, {
            where: {
                id: vitalityInfo.id,
            },
        })
            .then((result) => {
                if (result == 1) {
                    routesUtil.success(res, "Successfully updated vitality.", {});
                } else {
                    routesUtil.success(
                        res,
                        `Could not find vitality stats with id: ${vitalityInfo.id}`,
                        {}
                    );
                }
            })
            .catch((err) => {
                routesUtil.error(res, `Error updating vitality stats: ${err}`);
            });
    },
    async deleteByCharacterID(req, res) {
        const characterID = req.params.characterID;

        console.log(`Deleting vitality stats from character: ${characterID}.`);

        await VitalityStats.destroy({
            where: {
                characterID
            }
        })
            .then(() => {
                routesUtil.success(
                    res,
                    "Successfully deleted vitality stats.",
                    {}
                );
            })
            .catch((err) => {
                routesUtil.error(res, `Error deleting vitality stats: ${err}`);
            })
    },
    async findByCharacterID(req, res) {
        const characterID = req.params.characterID;

        console.log(`Finding vitality stats: ${characterID}.`);

        await VitalityStats.find({
            where: {
                characterID,
            },
        })
            .then((vitalityStats) => {
                routesUtil.success(
                    res,
                    `Successfully found vitality stats: ${JSON.stringify(
                        vitalityStats
                    )}.`,
                    vitalityStats
                );
            })
            .catch((err) => {
                routesUtil.error(res, `Error finding vitality stats: ${err}`);
            });
    },
};
