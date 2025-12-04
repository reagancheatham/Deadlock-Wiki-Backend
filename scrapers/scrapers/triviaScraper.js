import axios from "axios";
import * as cheerio from "cheerio";
import { sequelize, Character, Trivia } from "../models.js";

// --------------------
// Helpers
// --------------------
const clean = (s) => (s ? s.replace(/\s+/g, " ").trim() : "");

// --------------------
// Scrape Trivia
// --------------------
async function scrapeTrivia(url) {
  try {
    const res = await axios.get(url);
    const $ = cheerio.load(res.data);

    const characterName = $("h1").first().text().trim().replace(/\/.*$/, "");
    const triviaHeader = $("span#Trivia").closest("h2");

    if (!triviaHeader.length) {
      console.log(`[WARN] No Trivia section found for ${characterName}`);
      return { characterName, triviaItems: [] };
    }

    let triviaList = triviaHeader.next("ul");
    if (!triviaList.length) {
      console.log(`[WARN] No Trivia list found for ${characterName}`);
      return { characterName, triviaItems: [] };
    }

    const triviaItems = [];
    triviaList.find("li").each((_, li) => {
      const text = clean($(li).text());
      if (text) triviaItems.push(text);
    });

    console.log(`[OK] Found ${triviaItems.length} trivia items for ${characterName}`);
    return { characterName, triviaItems };
  } catch (err) {
    console.log(`[ERROR] Failed to scrape ${url}: ${err.message}`);
    return { characterName: null, triviaItems: [] };
  }
}

// --------------------
// Import Trivia using characterID
// --------------------
export async function importTrivia(urls) {
  for (const url of urls) {
    try {
      await scrapeAndInsertTrivia(url);
    } catch (err) {
      console.error(`[ERROR] Failed to scrape ${url}:`, err.message);
    }
  }
}

// Helper function for single URL
async function scrapeAndInsertTrivia(url) {
  const { characterName, triviaItems } = await scrapeTrivia(url);
  if (!characterName || !triviaItems.length) return;

  const [character] = await Character.findOrCreate({
    where: { characterName },
    defaults: { background: "" },
  });

  const triviaData = triviaItems.map(text => ({
    triviaText: text,
    characterID: character.characterID,
  }));

  // Avoid duplicates (optional)
  const existingTrivia = await Trivia.findAll({
    where: { characterID: character.characterID },
    attributes: ["triviaText"],
  });
  const existingTexts = new Set(existingTrivia.map(t => t.triviaText));
  const newTrivia = triviaData.filter(t => !existingTexts.has(t.triviaText));

  if (newTrivia.length > 0) {
    await Trivia.bulkCreate(newTrivia);
    console.log(`[DB] Inserted ${newTrivia.length} trivia items for ${characterName}`);
  }
}


