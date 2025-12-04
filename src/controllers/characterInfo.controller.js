import CharacterInfo from "../models/characterInfo.model.js";
import routesUtil from "../util/routesUtil.js";

export default {
    async create(req, res) {
        const characterInfo = req.body;

        console.log(
            `Creating character info :${JSON.stringify(characterInfo)}.`
        );

        await CharacterInfo.create(characterInfo)
            .then((data) => {
                routesUtil.success(
                    res,
                    `Successfully created character info: ${JSON.stringify(
                        data
                    )}.`,
                    data
                );
            })
            .catch((err) => {
                routesUtil.error(res, `Error creating character info: ${err}`);
            });
    },
    async update(req, res) {
        const characterInfo = req.body;

        console.log(
            `Updating character info: ${JSON.stringify(characterInfo)}.`
        );

        await CharacterInfo.update(characterInfo, {
            where: { characterName: characterInfo.characterName },
        })
            .then((data) => {
                routesUtil.success(
                    res,
                    `Successfully updated character info: ${JSON.stringify(
                        data
                    )}.`,
                    data
                );
            })
            .catch((err) => {
                routesUtil.error(
                    res,
                    `Error updating character info: ${JSON.stringify(err)}`
                );
            });
    },
    async delete(req, res) {
        const characterID = req.params.characterID;

        console.log(`Deleting character info: ${characterID}.`);

        await CharacterInfo.destroy({
            where: {
                characterID,
            },
        })
            .then((response) => {
                routesUtil.success(
                    res,
                    "Successfully deleted character info.",
                    response
                );
            })
            .catch((err) => {
                routesUtil.error(res, `Error deleting character info: ${err}`);
            });
    },
    async find(req, res) {
        const characterID = req.params.characterID;

        console.log(`Finding character info: ${characterID}.`);

        await CharacterInfo.findByPk(characterID)
            .then((data) => {
                routesUtil.success(
                    res,
                    `Successfully found character info: ${data}.`,
                    data
                );
            })
            .catch((err) => {
                routesUtil.error(res, `Error finding character info: ${err}`);
            });
    },
    async findAll(req, res) {
        console.log("Finding all character info.");

        await CharacterInfo.findAll()
            .then((data) => {
                routesUtil.success(
                    res,
                    "Successfully found all character info.",
                    data
                );
            })
            .catch((err) => {
                routesUtil.error(
                    res,
                    `Error finding all character info: ${err}`
                );
            });
    },
};
