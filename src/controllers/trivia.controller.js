import Quote from "../models/trivia.model.js";
import routesUtil from "../util/routesUtil.js";

export default {
    async create(req, res) {
        const triviaInfo = req.body;

        console.log(
            `Creating trivia with info: ${JSON.stringify(triviaInfo)}.`
        );

        await Quote.create(triviaInfo)
            .then((data) => {
                routesUtil.success(res, "Successfully created trivia.", data);
            })
            .catch((err) => {
                routesUtil.error(res, `Error creating trivia: ${err}`);
            });
    },
    async update(req, res) {
        const triviaInfo = req.body;

        console.log(
            `Updating trivia with info: ${JSON.stringify(triviaInfo)}.`
        );

        await Quote.upsert(triviaInfo, { returning: true })
            .then((result) => {
                routesUtil.success(
                    res,
                    "Successfully updated trivia.",
                    result[0]
                );
            })
            .catch((err) => {
                routesUtil.error(res, `Error updating trivia: ${err}`);
            });
    },
    async delete(req, res) {
        const id = req.params.id;

        console.log(`Deleting trivia: ${id}.`);

        await Quote.destroy({
            where: {
                id,
            },
        })
            .then(() => {
                routesUtil.success(res, "Successfully deleted trivia.", {});
            })
            .catch((err) => {
                routesUtil.error(res, `Error deleting trivia: ${err}`);
            });
    },
    async findAll(req, res) {
        await Quote.findAll()
            .then((trivia) => {
                console.log("trivia: " + JSON.stringify(trivia));

                routesUtil.success(
                    res,
                    "Successfully found all trivia",
                    trivia
                );
            })
            .catch((err) => {
                routesUtil.error(res, `Error finding all trivia: ${err}`);
            });
    },
};
