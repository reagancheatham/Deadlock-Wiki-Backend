import axios from "axios";
import * as cheerio from "cheerio";
import { Character, UpdateHistory } from "../models.js";

// --------------------
// Helpers
// --------------------
const clean = (s) => (s ? s.replace(/\s+/g, " ").trim() : "");

const parseDate = (str) => {
  const dateMatch = str.match(/(\w+)\s+(\d{1,2}),\s+(\d{4})/);
  if (!dateMatch) return null;
  const [_, month, day, year] = dateMatch;
  return new Date(`${month} ${day}, ${year}`);
};

// --------------------
// Scrape a single URL
// --------------------
async function scrapeUpdateHistory(url) {
  try {

    const res = await axios.get(url);
    const $ = cheerio.load(res.data);

    const characterName = $("h1").first().text().trim().replace(/\/.*$/, "");

    const header = $("span#Update_history").parent();
    if (!header.length) {
      console.log(`[WARN] No Update History section for ${characterName}`);
      return { characterName, updates: [] };
    }

    const table = header.nextAll("table").first();
    if (!table.length) {
      console.log(`[WARN] No Update History table for ${characterName}`);
      return { characterName, updates: [] };
    }

    const updates = [];
    table.find("tbody > tr").each((_, row) => {
      const cells = $(row).find("td");
      if (cells.length !== 2) return; // Skip header row

      const dateText = clean($(cells[0]).text());
      const date = parseDate(dateText);
      if (!date) return;

      $(cells[1])
        .find("ul > li")
        .each((_, li) => {
          const changesText = clean($(li).text());
          if (changesText) {
            updates.push({ date, changes: changesText });
          }
        });
    });

    return { characterName, updates };
  } catch (err) {
    console.error(`[ERROR] Failed to scrape ${url}: ${err.message}`);
    return { characterName: null, updates: [] };
  }
}

// --------------------
// Import multiple URLs
// --------------------
export async function importUpdateHistories(urls) {
  try {

    // Fetch all URLs in parallel
    const results = await Promise.all(urls.map(scrapeUpdateHistory));

    for (const { characterName, updates } of results) {
      if (!characterName || !updates.length) continue;

      // Ensure character exists
      const [character] = await Character.findOrCreate({
        where: { characterName },
        defaults: { background: "" },
      });

      // Map updates to DB format
      const updatesData = updates.map(u => ({
        date: u.date,
        changes: u.changes,
        characterID: character.id,
      }));

      // Bulk insert
      await UpdateHistory.bulkCreate(updatesData);
      console.log(`[DB] Inserted ${updatesData.length} updates for ${characterName}`);
    }

  } catch (err) {
    console.error("❌ Fatal DB error:", err.message);
  } finally {
  }
}


