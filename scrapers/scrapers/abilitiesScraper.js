import { Character, Ability, AbilityStats } from "../models.js";
import fs from "fs/promises";

// --------------------
// Helpers
// --------------------
async function loadJSON(filePath) {
  const data = await fs.readFile(filePath, "utf-8");
  return JSON.parse(data);
}

// --------------------
// Import one character's abilities
// --------------------
async function importCharacterAbilities(charObj) {
  try {
    const characterName = charObj.character;

    // Get characterID
    const character = await Character.findOne({ where: { characterName } });
    if (!character) {
      console.warn(`⚠ Character not found: ${characterName}`);
      return 0;
    }
    const characterID = character.id;

    let inserted = 0;

    for (const ability of charObj.abilities) {
      // Upsert Ability
      const [ab] = await Ability.findOrCreate({
        where: { characterID, abilitySlot: ability.abilitySlot },
        defaults: {
          characterID,
          abilitySlot: ability.abilitySlot,
          abilityName: ability.abilityName,
          abilityDescription: ability.abilityDescription
        }
      });

      // Upsert stats if exists
      if (ability.stats && Object.keys(ability.stats).length) {
        await AbilityStats.upsert({
          abilityID: ab.id,
          ...ability.stats
        });
      }

      inserted++;
    }

    console.log(`✔ Imported ${inserted} abilities for ${characterName}`);
    return inserted;
  } catch (err) {
    console.error(`❌ Error importing abilities for ${charObj.character}:`, err.message);
    return 0;
  }
}

// --------------------
// Import all characters in parallel
// --------------------
export async function importAbilities(jsonFilePath) {
  try {

    const data = await loadJSON(jsonFilePath);
    const characters = data.characters;

    // Run in parallel
    const results = await Promise.allSettled(
      characters.map(importCharacterAbilities)
    );

    const success = results
      .filter(r => r.status === "fulfilled")
      .reduce((sum, r) => sum + r.value, 0);

    console.log(`\nAll done! Total abilities inserted/updated: ${success}`);
  } catch (err) {
    console.error("Fatal error:", err.message);
  } 
}
