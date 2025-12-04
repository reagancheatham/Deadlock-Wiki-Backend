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
        const characterName = req.params.characterName;

        console.log(`Deleting character info: ${characterName}.`);

        await CharacterInfo.destroy({
            where: {
                characterName,
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
        const characterName = req.params.characterName;

        console.log(`Finding character info: ${characterName}.`);

        await CharacterInfo.findByPk(characterName)
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
