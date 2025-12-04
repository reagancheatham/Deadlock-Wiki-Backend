import Quote from "../models/quote.model.js";
import routesUtil from "../util/routesUtil.js";

export default {
    async create(req, res) {
        const abilityInfo = req.body;

        console.log(
            `Creating quote with info: ${JSON.stringify(abilityInfo)}.`
        );

        await Quote.create(abilityInfo)
            .then((data) => {
                routesUtil.success(res, "Successfully created quote.", data);
            })
            .catch((err) => {
                routesUtil.error(res, `Error creating quote: ${err}`);
            });
    },
    async update(req, res) {
        const abilityInfo = req.body;

        console.log(
            `Updating quote with info: ${JSON.stringify(abilityInfo)}.`
        );

        await Quote.upsert(abilityInfo, { returning: true })
            .then((result) => {
                routesUtil.success(
                    res,
                    "Successfully updated quote.",
                    result[0]
                );
            })
            .catch((err) => {
                routesUtil.error(res, `Error updating quote: ${err}`);
            });
    },
    async delete(req, res) {
        const id = req.params.id;

        console.log(`Deleting quote: ${id}.`);

        await Quote.destroy({
            where: {
                id,
            },
        })
            .then(() => {
                routesUtil.success(res, "Successfully deleted quote.", {});
            })
            .catch((err) => {
                routesUtil.error(res, `Error deleting quote: ${err}`);
            });
    },
    async findAll(req, res) {
        await Quote.findAll()
            .then((quotes) => {
                routesUtil.success(
                    res,
                    "Successfully found all quotes",
                    quotes
                );
            })
            .catch((err) => {
                routesUtil.error(res, `Error finding all quotes: ${err}`);
            });
    },
};
