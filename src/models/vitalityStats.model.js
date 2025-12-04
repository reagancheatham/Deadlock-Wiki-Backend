import { DataTypes } from "sequelize";
import sequelizeInstance from "../database/sequelizeInstance.js";
import Character from "./character.model.js";

const VitalityStats = sequelizeInstance.define(
    "VitalityStats",
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        health: {
            type: DataTypes.INTEGER,
            validate: {
                min: 0,
            },
        },
        healthRegen: {
            type: DataTypes.FLOAT,
            validate: {
                min: 0,
            },
        },
        moveSpeed: {
            type: DataTypes.FLOAT,
            validate: {
                min: 0,
            },
        },
        dashSpeed: {
            type: DataTypes.FLOAT,
            validate: {
                min: 0,
            },
        },
        stamina: {
            type: DataTypes.INTEGER,
            validate: {
                min: 0,
            },
        },
        staminaCooldown: {
            type: DataTypes.FLOAT,
            validate: {
                min: 0,
            },
        },
        characterID: {
            type: DataTypes.INTEGER,
            unique: true,
            allowNull: false,
            references: {
                model: Character,
                key: "id",
            },
        },
    },
    {
        timestamps: false,
    }
);

export default VitalityStats;
