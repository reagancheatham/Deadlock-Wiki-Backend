// models.js
import { Sequelize, DataTypes } from "sequelize";

// --------------------
// DB Connection
// --------------------
export const sequelize = new Sequelize(
  "deadlock_wiki",
  "root",
  "root",
  {
    host: "localhost",
    dialect: "mysql",
    logging: false,
  }
);

// --------------------
// Character Model
// --------------------
export const Character = sequelize.define(
  "Character",
  {
    characterID: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    characterName: { type: DataTypes.STRING(50), allowNull: false, unique: true },
    background: { type: DataTypes.STRING(2000), allowNull: true },
  },
  { tableName: "characters", timestamps: false }
);

// --------------------
// Trivia Model
// --------------------
export const Trivia = sequelize.define(
  "Trivia",
  {
    triviaID: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    triviaText: { type: DataTypes.STRING(1000), allowNull: false },
    characterID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: Character, key: "characterID" },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },
  },
  { tableName: "trivias", timestamps: false }
);

// --------------------
// Quote Model
// --------------------
export const Quote = sequelize.define(
  "Quote",
  {
    transcription: { type: DataTypes.TEXT, allowNull: false },
    context: { type: DataTypes.STRING(500), allowNull: true },
    item: { type: DataTypes.TEXT, allowNull: true },
    guestCharacter: { type: DataTypes.STRING(100), allowNull: true },
    characterID: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: { model: Character, key: "characterID" },
      onUpdate: "CASCADE",
      onDelete: "SET NULL",
    },
  },
  { tableName: "quotes", freezeTableName: true, timestamps: false }
);

// --------------------
// UpdateHistory Model
// --------------------
export const UpdateHistory = sequelize.define(
  "UpdateHistory",
  {
    updateID: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    date: { type: DataTypes.DATEONLY, allowNull: false },
    changes: { type: DataTypes.STRING(1000), allowNull: false },
    characterID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: Character, key: "characterID" },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },
  },
  { tableName: "updateHistory", timestamps: false }
);

// --------------------
// VitalityStats Model
// --------------------
export const VitalityStats = sequelize.define(
  "VitalityStats",
  {
    vitalityStatsID: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    characterID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: Character, key: "characterID" },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },
    health: DataTypes.INTEGER,
    healthRegen: DataTypes.FLOAT,
    moveSpeed: DataTypes.FLOAT,
    dashSpeed: DataTypes.FLOAT,
    stamina: DataTypes.INTEGER,
    staminaCooldown: DataTypes.FLOAT,
  },
  { tableName: "vitalityStats", timestamps: false }
);

// Weapon model
export const Weapon = sequelize.define(
  "Weapon",
  {
    weaponID: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    weaponName: { type: DataTypes.STRING(50), allowNull: false },
    characterID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: Character, key: "characterID" },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },
  },
  { tableName: "weapons", timestamps: false }
);

// WeaponStats model
export const WeaponStats = sequelize.define(
  "WeaponStats",
  {
    weaponStatsID: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    weaponID: {  // now FK references weaponID
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: Weapon, key: "weaponID" },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },
    dps: DataTypes.FLOAT,
    bulletDamage: DataTypes.FLOAT,
    ammo: DataTypes.INTEGER,
    reloadTime: DataTypes.FLOAT,
    bulletVelocity: DataTypes.INTEGER,
    lightMelee: DataTypes.FLOAT,
    fallOffMin: DataTypes.INTEGER,
    fallOffMax: DataTypes.INTEGER,
  },
  { tableName: "weaponStats", timestamps: false }
);

// --------------------
// Ability Model
// --------------------
export const Ability = sequelize.define(
  "Ability",
  {
    abilityID: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    characterID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: Character, key: "characterID" },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },
    abilitySlot: DataTypes.INTEGER,
    abilityName: { type: DataTypes.STRING(50), allowNull: false },
    abilityDescription: DataTypes.STRING(1000),
  },
  { tableName: "abilities", timestamps: false }
);

// --------------------
// AbilityStats Model
// --------------------
export const AbilityStats = sequelize.define(
  "AbilityStats",
  {
    abilityStatsID: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    abilityID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: Ability, key: "abilityID" },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },
    range: DataTypes.INTEGER,
    duration: DataTypes.INTEGER,
    cooldown: DataTypes.INTEGER,
  },
  { tableName: "abilityStats", timestamps: false }
);

// --------------------
// CharacterInformation Model
// --------------------
export const CharacterInformation = sequelize.define(
  "CharacterInformation",
  {
    characterInformationID: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    characterID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: Character, key: "characterID" },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },
    voiceActor: DataTypes.STRING(100),
    releaseDate: DataTypes.DATE,
    codenames: DataTypes.STRING(100),
  },
  { tableName: "characterInformation", timestamps: false }
);
