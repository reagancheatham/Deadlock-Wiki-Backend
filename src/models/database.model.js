import sequelizeInstance from "../database/sequelizeInstance.js";
import Character from "./character.model.js";
import CharacterInfo from "./characterInfo.model.js";
import Weapon from "./weapon.model.js";
import WeaponStats from "./weaponStats.model.js";
import VitalityStats from "./vitalityStats.model.js";
import Ability from "./ability.model.js";
import AbilityStats from "./abilityStats.model.js";

Character.hasOne(CharacterInfo, {
    foreignKey: "characterID",
    onDelete: "CASCADE",
});
CharacterInfo.belongsTo(Character, {
    foreignKey: "characterID",
    onDelete: "CASCADE",
});

Character.hasOne(VitalityStats, {
    foreignKey: "characterID",
    onDelete: "CASCADE",
});
VitalityStats.belongsTo(Character, {
    foreignKey: "characterID",
    onDelete: "CASCADE",
});

Character.hasMany(Weapon, {
    foreignKey: "characterID",
    onDelete: "CASCADE",
});

Weapon.hasOne(WeaponStats, {
    foreignKey: "weaponID",
    onDelete: "CASCADE",
});
WeaponStats.belongsTo(Weapon, {
    foreignKey: "weaponID",
    onDelete: "CASCADE",
});

Ability.hasOne(AbilityStats, {
    foreignKey: "abilityID",
    onDelete: "CASCADE",
});
AbilityStats.hasOne(Ability, {
    foreignKey: "abilityID",
    onDelete: "CASCADE",
});

let Database = {
    Character,
    CharacterInfo,
    SequelizeInstance: sequelizeInstance,
};

export default Database;
