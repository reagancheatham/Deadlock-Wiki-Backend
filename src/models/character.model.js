import { DataTypes } from "sequelize";
import sequelizeInstance from "../database/sequelizeInstance.js";

const Character = sequelizeInstance.define(
    "Characters",
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        background: {
            type: DataTypes.STRING(2000),
            allowNull: true,
        },
    },
    {
        timestamps: false,
        indexes: [
            {
                unique: true,
                fields: ["id"],
            },
        ],
    }
);

export default Character;
