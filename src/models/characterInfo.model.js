import { DataTypes } from "sequelize";
import sequelizeInstance from "../database/sequelizeInstance.js";
import Character from "./character.model.js";

const CharacterInfo = sequelizeInstance.define(
    "CharacterInfos",
    {
        characterName: {
            type: DataTypes.STRING,
            allowNull: false,
            primaryKey: true,
            references: {
                model: Character,
                key: "name",
            },
        },
        voiceActor: {
            type: DataTypes.STRING,
        },
        releaseDate: {
            type: DataTypes.DATE,
            validate: {
                isAfter: "2015-01-01",
            },
        },
        codeNames: {
            type: DataTypes.STRING,
        },
    },
    {
        timestamps: false,
    }
);

export default CharacterInfo;
