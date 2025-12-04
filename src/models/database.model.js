import Character from "./character.model.js";
import CharacterInfo from "./characterInfo.model.js";
import sequelizeInstance from "../database/sequelizeInstance.js";

Character.hasOne(CharacterInfo, { foreignKey: "characterID" });
CharacterInfo.hasOne(Character, { foreignKey: "characterID" });

let Database = {
    Character,
    CharacterInfo,
    SequelizeInstance: sequelizeInstance,
};

export default Database;
