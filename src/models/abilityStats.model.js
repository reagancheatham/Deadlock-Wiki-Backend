import { DataTypes } from "sequelize";
import sequelizeInstance from "../database/sequelizeInstance.js";
import Ability from "./ability.model.js";

const AbilityStats = sequelizeInstance.define(
    "abilityStats",
    {
        abilityID: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            references: {
                model: Ability,
                key: "id",
            },
            onDelete: "CASCADE",
        },
        range: {
            type: DataTypes.INTEGER,
            validate: {
                min: 0,
            },
        },
        duration: {
            type: DataTypes.INTEGER,
            validate: {
                min: 0,
            },
        },
        cooldown: {
            type: DataTypes.FLOAT,
            validate: {
                min: 0,
            },
        },
    },
    {
        timestamps: false,
    }
);

export default AbilityStats;
