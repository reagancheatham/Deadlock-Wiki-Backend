import { DataTypes } from "sequelize";
import sequelizeInstance from "../database/sequelizeInstance.js";
import Character from "./character.model.js";

const Quote = sequelizeInstance.define(
    "quotes",
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        context: {
            type: DataTypes.STRING,
        },
        transcript: {
            type: DataTypes.TEXT,
        },
        item: {
            type: DataTypes.STRING,
        },
        guestCharacterID: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: Character,
                key: "id",
            },
            onDelete: "CASCADE",
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

export default Quote;
