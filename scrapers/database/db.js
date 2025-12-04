import { Sequelize } from "sequelize";
import databaseConfig from "./databaseConfig.js";

export default new Sequelize(
    databaseConfig.DATABASE_NAME,
    databaseConfig.USER,
    databaseConfig.PASSWORD,
    {
        host: "localhost",
        dialect: "mysql",
    }
);