import { DataTypes } from "sequelize";
import sequelizeInstance from "../database/sequelizeInstance.js";
import Weapon from "./weapon.model.js";

const WeaponStats = sequelizeInstance.define(
    "WeaponStats",
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
        },
        dps: {
            type: DataTypes.INTEGER,
            validate: {
                min: 0,
            },
        },
        bulletDamage: {
            type: DataTypes.FLOAT,
            validate: {
                min: 0,
            },
        },
        ammo: {
            type: DataTypes.INTEGER,
            validate: {
                min: 0,
            },
        },
        reloadTime: {
            type: DataTypes.FLOAT,
            validate: {
                min: 0,
            },
        },
        bulletVelocity: {
            type: DataTypes.INTEGER,
            validate: {
                min: 0,
            },
        },
        lightMelee: {
            type: DataTypes.INTEGER,
            validate: {
                min: 0,
            },
        },
        heavyMelee: {
            type: DataTypes.INTEGER,
            validate: {
                min: 0,
            },
        },
        fallOffMin: {
            type: DataTypes.INTEGER,
            validate: {
                min: 0,
            },
        },
        fallOffMax: {
            type: DataTypes.INTEGER,
            validate: {
                min: 0,
            },
        },
        weaponID: {
            type: DataTypes.INTEGER,
            allowNull: false,
            unique: true,
            references: {
                model: Weapon,
                key: "id"
            }
        }
    },
    {
        timestamps: false,
    }
);

export default WeaponStats;
