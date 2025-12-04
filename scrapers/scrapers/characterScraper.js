import axios from "axios";
import * as cheerio from "cheerio";
import { Character } from "../models.js";

// --------------------
// Helpers
// --------------------
function cleanText(s) {
  if (!s) return "";
  return s.replace(/\[edit[^\]]*\]/gi, "").replace(/\s+/g, " ").trim();
}

// --------------------
// Scrape & Import Character
// --------------------
export async function scrapeAndImportCharacter(url) {
  try {
    // Scrape page
    const res = await axios.get(url);
    const $ = cheerio.load(res.data);

    const characterName = $("h1").first().text().trim().replace(/\/.*$/, "");
    if (!characterName) {
      console.warn(`⚠ Could not find character name on ${url}`);
      return null;
    }

    // Background under <h2> "Background"
    let background = null;
    $("h2").each((_, h2) => {
      if ($(h2).text().toLowerCase().includes("background")) {
        const nextDiv = $(h2).next("div");
        if (nextDiv.length) background = cleanText(nextDiv.text());
      }
    });

    // Insert into DB
    const [character, created] = await Character.findOrCreate({
      where: { characterName },
      defaults: { background: background || "" },
    });

    // Update background if empty
    if (!created && (!character.background || character.background.trim() === "") && background) {
      character.background = background;
      await character.save();
      console.log(`✓ Updated background for "${character.characterName}" (ID: ${character.id})`);
    } else if (created) {
      console.log(`✓ Added "${character.characterName}" (ID: ${character.id})`);
    } else {
      console.log(`✓ Character "${character.characterName}" already exists with background`);
    }

    return character.id;
  } catch (err) {
    console.error(`❌ Error scraping/importing ${url}:`, err.message);
    return null;
  }
}

// --------------------
// Import multiple characters from URLs
// --------------------
export async function importCharacters(urls) {
  const results = [];

  for (let i = 0; i < urls.length; i += 32) {
    const batch = urls.slice(i, i + 32);
    const batchResults = await Promise.all(
      batch.map(url => scrapeAndImportCharacter(url))
    );

    results.push(...batchResults.filter(id => id !== null));
  }

  return results;
}