import { DataTypes } from "sequelize";
import sequelizeInstance from "../database/sequelizeInstance.js";
import Character from "./character.model.js";

const Trivia = sequelizeInstance.define(
    "trivias",
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        text: {
            type: DataTypes.TEXT,
        },
        characterID: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: Character,
                key: "id",
            },
            onDelete: "CASCADE",
        },
    },
    {
        timestamps: false,
    }
);

export default Trivia;
