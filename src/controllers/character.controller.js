import Character from "../models/character.model.js";

export default {
    create(req, res) {
        const characterInfo = req.body;

        console.log(
            `Creating character with info: ${JSON.stringify(characterInfo)}.`
        );

        Character.create(characterInfo)
            .then((data) => {
                console.log("Successfully created character.");
                res.status(200).send(data);
            })
            .catch((err) => {
                console.error(`Error creating character: ${err}`);
            });
    },
};
