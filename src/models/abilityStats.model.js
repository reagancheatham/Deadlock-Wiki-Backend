import { DataTypes } from "sequelize";
import sequelizeInstance from "../database/sequelizeInstance.js";
import Ability from "./ability.model.js";

const AbilityStats = sequelizeInstance.define(
    "abilityStats",
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
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
        abilityID: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: Ability,
                key: "id",
            },
            onDelete: "CASCADE",
        },
    },
    {
        timestamps: false,
    }
);

export default AbilityStats;
