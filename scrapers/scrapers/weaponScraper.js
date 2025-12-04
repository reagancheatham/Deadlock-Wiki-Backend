import axios from "axios";
import * as cheerio from "cheerio";
import { Character, Weapon, WeaponStats } from "../models.js";

// --------------------
// Helpers
// --------------------
const clean = (s) => s.replace(/\s+/g, " ").trim();
const parseFloatSafe = (v) => (isNaN(parseFloat(v)) ? null : parseFloat(v));
const parseIntSafe = (v) => (isNaN(parseInt(v)) ? null : parseInt(v));

async function scrapePage(url) {
  const res = await axios.get(url);
  return cheerio.load(res.data);
}

// --------------------
// SCRAPE WEAPONS
// --------------------
function scrapeWeapons($) {
  const characterName = $("h1").first().text().trim().replace(/\/.*$/, "");
  const weapons = [];

  $("th:contains('Weapon') i").each((_, el) => {
    let name = clean($(el).text().replace(/["“”]/g, ""));
    if (name) weapons.push(name);
  });

  console.log(`Found ${weapons.length} weapon(s) for ${characterName}`);
  return { characterName, weapons };
}

// --------------------
// SCRAPE STATS
// --------------------
function scrapeWeaponStats($, weaponsList) {
  const statsOut = [];

  for (const weapon of weaponsList) {
    const table = $(`table:contains('${weapon}')`).first();
    if (!table.length) continue;

    const stats = {
      weaponName: weapon,
      dps: null,
      bulletDamage: null,
      ammo: null,
      reloadTime: null,
      bulletVelocity: null,
      lightMelee: null,
      fallOffMin: null,
      fallOffMax: null
    };

    table.find("tr").each((_, row) => {
      const tds = $(row).find("td");
      if (tds.length !== 2) return;

      const key = clean($(tds[0]).text().replace(":", "").toLowerCase());
      let val = clean($(tds[1]).text());
      val = val.replace(/\(.*?\)/g, "").replace(/[^\d\-–. ]/g, "").trim();

      if (key.includes("damage per second")) stats.dps = parseFloatSafe(val);
      else if (key.includes("bullet damage")) stats.bulletDamage = parseFloatSafe(val);
      else if (key === "ammo") stats.ammo = parseIntSafe(val);
      else if (key.includes("reload")) stats.reloadTime = parseFloatSafe(val);
      else if (key.includes("velocity")) stats.bulletVelocity = parseIntSafe(val);
      else if (key.includes("light melee")) stats.lightMelee = parseFloatSafe(val);
      else if (key.includes("falloff range")) {
        const nums = val.match(/\d+/g);
        if (nums && nums.length >= 2) {
          stats.fallOffMin = parseIntSafe(nums[0]);
          stats.fallOffMax = parseIntSafe(nums[1]);
        }
      }
    });

    statsOut.push(stats);
  }

  console.log(`Extracted stats for ${statsOut.length} weapon(s)`);
  return statsOut;
}

// --------------------
// IMPORT ONE CHARACTER
// --------------------
async function importOne(url) {
  try {
    const $ = await scrapePage(url);

    const { characterName, weapons } = scrapeWeapons($);

    // Ensure character exists
    const [character] = await Character.findOrCreate({
      where: { characterName },
      defaults: { background: "" }
    });

    for (const weaponName of weapons) {
  const [weapon] = await Weapon.findOrCreate({
    where: { weaponName, characterID: character.id },
    defaults: { characterID: character.id }
  });

  const stats = scrapeWeaponStats($, [weaponName]);
  for (const s of stats) {
    await WeaponStats.create({
      ...s,
      weaponID: weapon.weaponID
    });
  }
}

    console.log(`✔ Finished ${characterName} (ID: ${character.characterID})\n`);
  } catch (err) {
    console.error(`❌ Error importing ${url}:`, err.message);
  }
}

// --------------------
// MAIN IMPORT
// --------------------
async function chunk(arr, size) {
  const batches = [];
  for (let i = 0; i < arr.length; i += size) batches.push(arr.slice(i, i + size));
  return batches;
}

export async function importWeapons(urls) {
  const batches = await chunk(urls, 5); // process 5 at a time
  for (const group of batches) {
    await Promise.all(group.map(url => importOne(url)));
  }

  console.log("All done!");
}
