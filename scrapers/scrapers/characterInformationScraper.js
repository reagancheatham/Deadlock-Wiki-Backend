// scrapeAndImportFullCharacter.js
import axios from "axios";
import * as cheerio from "cheerio";
import { Character, CharacterInformation } from "../models.js";

// --------------------
// Helpers
// --------------------
function cleanText(s) {
  if (!s) return "";
  return s
    .replace(/\[edit[^\]]*\]/gi, "")
    .replace(/\s*\[[^\]]+\]\s*/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

function parseReleaseDateString(s) {
  if (!s) return null;
  const parsed = Date.parse(s);
  if (!isNaN(parsed)) return new Date(parsed).toISOString().split("T")[0];
  const m = s.match(/([A-Za-z]+ \d{1,2}, \d{4})/);
  if (m && !isNaN(Date.parse(m[1]))) return new Date(Date.parse(m[1])).toISOString().split("T")[0];
  return null;
}

// --------------------
// Scrape & import one character
// --------------------
async function scrapeAndImportOne(url) {
  try {
    const res = await axios.get(url);
    const $ = cheerio.load(res.data);

    // Character Name
    const characterName = $("h1").first().text().trim().replace(/\/.*/, "");
    if (!characterName) throw new Error("Character name not found");

    // Background under <h2> "Background"
    let background = null;
    $("h2").each((_, h2) => {
      if ($(h2).text().toLowerCase().includes("background")) {
        const nextDiv = $(h2).next("div");
        if (nextDiv.length) background = cleanText(nextDiv.text());
      }
    });

    // Infobox for additional info
    let info = { voiceActor: null, releaseDate: null, codenames: null };
    const box = $("table.infobox").first();
    if (box.length) {
      box.find("tr").each((_, tr) => {
        const tds = $(tr).find("td");
        if (tds.length < 2) return;
        const key = cleanText($(tds[0]).text()).toLowerCase();
        const value = cleanText($(tds[1]).text());
        if (/voice/i.test(key)) info.voiceActor = value;
        if (/release/i.test(key)) info.releaseDate = value;
        if (/codename|aka|aliases/i.test(key)) info.codenames = value;
      });
    }

    const normalizedDate = parseReleaseDateString(info.releaseDate);

    // --------------------
    // Upsert Character
    // --------------------
    const [character, created] = await Character.findOrCreate({
      where: { characterName },
      defaults: { background: background || "" }
    });

    if (!created && (!character.background || character.background.trim() === "") && background) {
      character.background = background;
      await character.save();
      console.log(`✓ Updated background for "${character.characterName}"`);
    } else if (created) {
      console.log(`✓ Added character "${character.characterName}"`);
    }

    // --------------------
    // Upsert CharacterInformation
    // --------------------
    await CharacterInformation.upsert({
      characterID: character.characterID,
      voiceActor: info.voiceActor || null,
      releaseDate: normalizedDate || null,
      codenames: info.codenames || null
    });

    console.log(`✓ Imported info for "${character.characterName}"`);
    return { characterName, success: true };
  } catch (err) {
    console.error(`❌ Error scraping/importing ${url}:`, err.message);
    return { url, success: false };
  }
}

// --------------------
// Scrape & import multiple characters in parallel (batched)
// --------------------
export async function importCharacterInformation(urls, batchSize = 32) {
  const results = [];

  for (let i = 0; i < urls.length; i += batchSize) {
    const batch = urls.slice(i, i + batchSize);
    const batchResults = await Promise.all(batch.map(scrapeAndImportOne));
    results.push(...batchResults);
  }

  const success = results.filter(r => r.success).length;
  const failed = results.length - success;

  console.log(`\n🎉 Finished! Success: ${success} | Failed: ${failed}`);
  return results;
}
