// associations.js
import {
  Character,
  Trivia,
  Quote,
  UpdateHistory,
  VitalityStats,
  Weapon,
  WeaponStats,
  Ability,
  AbilityStats,
  CharacterInformation,
} from "./models.js";

// --------------------
// Character -> Trivia
// --------------------
Character.hasMany(Trivia, { foreignKey: "characterID", onDelete: "CASCADE", onUpdate: "CASCADE" });
Trivia.belongsTo(Character, { foreignKey: "characterID" });

// --------------------
// Character -> Quote
// --------------------
Character.hasMany(Quote, { foreignKey: "characterID", onDelete: "CASCADE", onUpdate: "CASCADE" });
Quote.belongsTo(Character, { foreignKey: "characterID" });

// --------------------
// Character -> UpdateHistory
// --------------------
Character.hasMany(UpdateHistory, { foreignKey: "characterID", onDelete: "CASCADE", onUpdate: "CASCADE" });
UpdateHistory.belongsTo(Character, { foreignKey: "characterID" });

// --------------------
// Character -> VitalityStats
// --------------------
Character.hasOne(VitalityStats, { foreignKey: "characterID", onDelete: "CASCADE", onUpdate: "CASCADE" });
VitalityStats.belongsTo(Character, { foreignKey: "characterID" });

// --------------------
// Character -> Weapon
// --------------------
Character.hasMany(Weapon, { foreignKey: "characterID", onDelete: "CASCADE", onUpdate: "CASCADE" });
Weapon.belongsTo(Character, { foreignKey: "characterID" });

// --------------------
// Weapon -> WeaponStats
// --------------------
Weapon.hasOne(WeaponStats, { foreignKey: "weaponID", onDelete: "CASCADE", onUpdate: "CASCADE" });
WeaponStats.belongsTo(Weapon, { foreignKey: "weaponID" });

// --------------------
// Character -> Ability
// --------------------
Character.hasMany(Ability, { foreignKey: "characterID", onDelete: "CASCADE", onUpdate: "CASCADE" });
Ability.belongsTo(Character, { foreignKey: "characterID" });

// --------------------
// Ability -> AbilityStats
// --------------------
Ability.hasOne(AbilityStats, { foreignKey: "abilityID", onDelete: "CASCADE", onUpdate: "CASCADE" });
AbilityStats.belongsTo(Ability, { foreignKey: "abilityID" });

// --------------------
// Character -> CharacterInformation
// --------------------
Character.hasOne(CharacterInformation, { foreignKey: "characterID", onDelete: "CASCADE", onUpdate: "CASCADE" });
CharacterInformation.belongsTo(Character, { foreignKey: "characterID" });

export default {
  Character,
  Trivia,
  Quote,
  UpdateHistory,
  VitalityStats,
  Weapon,
  WeaponStats,
  Ability,
  AbilityStats,
  CharacterInformation,
};
