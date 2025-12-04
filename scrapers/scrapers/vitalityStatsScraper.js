import axios from "axios";
import * as cheerio from "cheerio";
import { Character, VitalityStats } from "../models.js";

// --------------------
// Helpers
// --------------------
const clean = (s) => s.replace(/\s+/g, " ").trim();
const parseFloatSafe = (v) => {
  const n = parseFloat(v);
  return isNaN(n) ? null : n;
};
const parseIntSafe = (v) => {
  const n = parseInt(v);
  return isNaN(n) ? null : n;
};
const extractNumber = (str) => {
  if (!str) return null;
  const match = str.match(/[\d.]+/);
  return match ? parseFloat(match[0]) : null;
};

// --------------------
// Scrape Vitality Stats
// --------------------
async function scrapeVitalityStats(url) {
  try {
    const res = await axios.get(url);
    const $ = cheerio.load(res.data);

    const characterName = $("h1").first().text().trim().replace(/\/.*$/, "");
    const infobox = $("table.infobox").first();
    if (!infobox.length) {
      console.log(`[WARN] No infobox for ${characterName}`);
      return null;
    }

    const vitalTh = infobox
      .find("th")
      .filter((_, th) =>
        clean($(th).text()).toLowerCase().includes("vitality stats")
      )
      .first();

    if (!vitalTh.length) {
      console.log(`[WARN] No 'Vitality Stats' header for ${characterName}`);
      return null;
    }

    const stats = {
      health: null,
      healthRegen: null,
      moveSpeed: null,
      dashSpeed: null,
      stamina: null,
      staminaCooldown: null,
    };

    let row = vitalTh.parent();
    while (row.length) {
      row = row.next("tr");
      if (!row.length) break;

      const th = row.find("th[colspan]");
      if (th.length) break;

      const tds = row.find("td");
      if (tds.length !== 2) continue;

      const key = clean($(tds[0]).text().replace(":", "").toLowerCase());
      const valText = clean($(tds[1]).text()).replace(/\(.*?\)/g, "");

      if (key.includes("health regen")) stats.healthRegen = extractNumber(valText);
      else if (key === "health") stats.health = parseIntSafe(extractNumber(valText));
      else if (key.includes("move speed") || key === "speed")
        stats.moveSpeed = extractNumber(valText);
      else if (key.includes("dash speed") || key.includes("dash"))
        stats.dashSpeed = extractNumber(valText);
      else if (key.includes("stamina cooldown"))
        stats.staminaCooldown = extractNumber(valText);
      else if (key === "stamina") stats.stamina = parseIntSafe(extractNumber(valText));
    }

    return { characterName, ...stats };
  } catch (err) {
    console.log(`[ERROR] ${url}: ${err.message}`);
    return null;
  }
}

// --------------------
// Import All (with characterID)
// --------------------
export async function importVitalityStats(urls) {
  const scraped = await Promise.allSettled(urls.map(scrapeVitalityStats));
  const results = scraped
    .filter((r) => r.status === "fulfilled" && r.value)
    .map((r) => r.value)
    .sort((a, b) => a.characterName.localeCompare(b.characterName));

  for (const r of results) {
    // Ensure character exists
    const [character] = await Character.findOrCreate({
      where: { characterName: r.characterName },
      defaults: { background: "" },
    });

    // Attach characterID and insert vitality stats
    await VitalityStats.create({
      characterID: character.id,
      health: r.health,
      healthRegen: r.healthRegen,
      moveSpeed: r.moveSpeed,
      dashSpeed: r.dashSpeed,
      stamina: r.stamina,
      staminaCooldown: r.staminaCooldown,
    });

    console.log(`✓ Vitality stats imported for ${r.characterName} (ID: ${character.id})`);
  }

  console.log("\nAll vitality stats imported successfully.");

}

