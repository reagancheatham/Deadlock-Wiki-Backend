import sequelizeInstance from "../database/sequelizeInstance.js";
import Character from "./character.model.js";
import CharacterInfo from "./characterInfo.model.js";
import Weapon from "./weapon.model.js";
import WeaponStats from "./weaponStats.model.js";
import VitalityStats from "./vitalityStats.model.js";
import Ability from "./ability.model.js";
import AbilityStats from "./abilityStats.model.js";
import UpdateHistory from "./updateHistory.model.js";
import Quote from "./quote.model.js";

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
AbilityStats.belongsTo(Ability, {
    foreignKey: "abilityID",
    onDelete: "CASCADE",
});

Character.hasMany(UpdateHistory, {
    foreignKey: "characterID",
    onDelete: "CASCADE",
});

UpdateHistory.hasOne(Character, {
    foreignKey: "characterID",
    onDelete: "CASCADE",
});

Character.hasMany(Quote, {
    foreignKey: "characterID",
    onDelete: "CASCADE",
});

Character.hasMany(Quote, {
    foreignKey: "guestCharacterID",
    onDelete: "CASCADE",
});

Quote.hasOne(Character, {
    foreignKey: "characterID",
    onDelete: "CASCADE",
});

Quote.hasOne(Character, {
    foreignKey: "guestCharacterID",
    onDelete: "CASCADE",
});

let Database = {
    Character,
    CharacterInfo,
    SequelizeInstance: sequelizeInstance,
};

export default Database;
