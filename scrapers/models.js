// models.js
import sequelizeInstance from "./database/db.js";
import { DataTypes } from "sequelize";
// --------------------
// Character Model
// --------------------
export const Character = sequelizeInstance.define(
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




// --------------------
// Quote Model
// --------------------
export const Quote = sequelizeInstance.define(
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

export default sequelizeInstance;
