import { DataTypes } from "sequelize";
import sequelizeInstance from "../database/sequelizeInstance.js";

const Character = sequelizeInstance.define("Characters", {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true
    },
    background: {
        type: DataTypes.TEXT,
    },
});

export default Character;