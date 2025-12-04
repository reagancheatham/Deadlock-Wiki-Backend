import sequelizeInstance from "../database/sequelizeInstance.js";
import Character from "./character.model.js";
import CharacterInfo from "./characterInfo.model.js";
import Weapon from "./weapon.model.js";
import WeaponStats from "./weaponStats.model.js";
import VitalityStats from "./vitalityStats.model.js";

Character.hasOne(CharacterInfo, { foreignKey: "characterID" });
CharacterInfo.belongsTo(Character, { foreignKey: "characterID" });

Character.hasOne(VitalityStats, { foreignKey: "characterID" });
VitalityStats.belongsTo(Character, { foreignKey: "characterID" });

Weapon.hasOne(WeaponStats, { foreignKey: "weaponID" });
WeaponStats.belongsTo(Weapon, { foreignKey: "weaponID" });

let Database = {
    Character,
    CharacterInfo,
    SequelizeInstance: sequelizeInstance,
};

export default Database;
