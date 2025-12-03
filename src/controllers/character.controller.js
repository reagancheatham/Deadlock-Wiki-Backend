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
                name: characterInfo.name,
            },
        })
            .then((data) => {
                routesUtil.success(
                    res,
                    "Successfully updated character.",
                    data
                );
            })
            .catch((err) => {
                routesUtil.error(res, `Error updating character: ${err}`);
            });
    },
    async delete(req, res) {
        const name = req.params.name;

        console.log(`Deleting character: ${name}.`);

        await Character.destroy({
            where: {
                name,
            },
        })
            .then(() => {
                routesUtil.success(
                    res,
                    "Successfully deleted character.",
                    {}
                );
            })
            .catch((err) => {
                routesUtil.error(res, `Error deleting character: ${err}`);
            });
    },
    async find(req, res) {
        const name = req.params.name;

        console.log(`Finding character: ${name}.`);

        await Character.findByPk(name)
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
                console.log(`Characters: ${JSON.stringify(characters)}`);

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
