import Character from "../models/character.model.js";
import routesUtil from "../util/routesUtil.js";

export default {
    async create(req, res) {
        const characterInfo = req.body;

        console.log(
            `Creating character with info: ${JSON.stringify(characterInfo)}.`
        );

        await Character.create(characterInfo)
            .then((data) => {
                routesUtil.success(
                    res,
                    "Successfully created character.",
                    data
                );
            })
            .catch((err) => {
                routesUtil.error(res, `Error creating character: ${err}`);
            });
    },
    async update(req, res) {
        const characterInfo = req.body;

        console.log(
            `Updating character with info: ${JSON.stringify(characterInfo)}.`
        );

        await Character.update(characterInfo, {
            where: {
                id: characterInfo.id,
            },
        })
            .then((result) => {
                if (result == 1) {
                    routesUtil.success(
                        res,
                        "Successfully updated character.",
                        {}
                    );
                } else {
                    routesUtil.success(
                        res,
                        `Could not find character with name: ${characterInfo.name}`,
                        {}
                    );
                }
            })
            .catch((err) => {
                routesUtil.error(res, `Error updating character: ${err}`);
            });
    },
    async delete(req, res) {
        const id = req.params.id;

        console.log(`Deleting character: ${id}.`);

        await Character.destroy({
            where: {
                id,
            },
        })
            .then(() => {
                routesUtil.success(res, "Successfully deleted character.", {});
            })
            .catch((err) => {
                routesUtil.error(res, `Error deleting character: ${err}`);
            });
    },
    async find(req, res) {
        const id = req.params.id;

        console.log(`Finding character: ${id}.`);

        await Character.findByPk(id)
            .then((character) => {
                routesUtil.success(
                    res,
                    `Successfully found character: ${JSON.stringify(
                        character
                    )}.`,
                    character
                );
            })
            .catch((err) => {
                routesUtil.error(res, `Error finding character: ${err}`);
            });
    },
    async findAll(req, res) {
        await Character.findAll()
            .then((characters) => {
                routesUtil.success(
                    res,
                    "Successfully found all characters",
                    characters
                );
            })
            .catch((err) => {
                routesUtil.error(res, `Error finding all characters: ${err}`);
            });
    },
};
