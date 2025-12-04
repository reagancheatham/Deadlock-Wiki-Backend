import { DataTypes } from "sequelize";
import sequelizeInstance from "../database/sequelizeInstance.js";
import Character from "./character.model.js";

const Ability = sequelizeInstance.define(
    "abilities",
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        slot: {
            type: DataTypes.INTEGER,
            validate: {
                min: 0,
                max: 4,
            },
            defaultValue: 0,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        description: {
            type: DataTypes.STRING,
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

export default Ability;
