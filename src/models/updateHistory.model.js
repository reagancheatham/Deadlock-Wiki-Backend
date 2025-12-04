import { DataTypes } from "sequelize";
import sequelizeInstance from "../database/sequelizeInstance.js";
import Character from "./character.model.js";

const UpdateHistory = sequelizeInstance.define(
    "updateHistories",
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        date: {
            type: DataTypes.DATEONLY,
            allowNull: false,
        },
        changes: {
            type: DataTypes.TEXT,
        },
        characterID: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: Character,
                key: "id",
            },
            onDelete: "CASCADE"
        },
    },
    {
        timestamps: false,
    }
);

export default UpdateHistory;
