
import { importCharacters } from "./scrapers/characterScraper.js";

import { importQuotes } from "./scrapers/quotesScraper.js";

import sequelize from "./database/db.js";

// --------------------
// CHARACTER URLS
// --------------------
const urls = [
  "https://deadlock.wiki/Abrams",
  "https://deadlock.wiki/Bebop",
  "https://deadlock.wiki/Billy",
  "https://deadlock.wiki/Calico",
  "https://deadlock.wiki/The_Doorman",
  "https://deadlock.wiki/Drifter",
  "https://deadlock.wiki/Dynamo",
  "https://deadlock.wiki/Grey_Talon",
  "https://deadlock.wiki/Haze",
  "https://deadlock.wiki/Holliday",
  "https://deadlock.wiki/Infernus",
  "https://deadlock.wiki/Ivy",
  "https://deadlock.wiki/Kelvin",
  "https://deadlock.wiki/Lady_Geist",
  "https://deadlock.wiki/Lash",
  "https://deadlock.wiki/McGinnis",
  "https://deadlock.wiki/Mina",
  "https://deadlock.wiki/Mirage",
  "https://deadlock.wiki/Mo_%26_Krill",
  "https://deadlock.wiki/Paige",
  "https://deadlock.wiki/Paradox",
  "https://deadlock.wiki/Pocket",
  "https://deadlock.wiki/Seven",
  "https://deadlock.wiki/Shiv",
  "https://deadlock.wiki/Sinclair",
  "https://deadlock.wiki/Victor",
  "https://deadlock.wiki/Vindicta",
  "https://deadlock.wiki/Viscous",
  "https://deadlock.wiki/Vyper",
  "https://deadlock.wiki/Warden",
  "https://deadlock.wiki/Wraith",
  "https://deadlock.wiki/Yamato"
];
const quoteUrls = [
    "https://deadlock.wiki/Abrams/Quotes",
    "https://deadlock.wiki/Bebop/Quotes",
    "https://deadlock.wiki/Billy/Quotes",
    "https://deadlock.wiki/Calico/Quotes",
    "https://deadlock.wiki/The_Doorman/Quotes",
    "https://deadlock.wiki/Drifter/Quotes",
    "https://deadlock.wiki/Dynamo/Quotes",
    "https://deadlock.wiki/Grey_Talon/Quotes",
    "https://deadlock.wiki/Haze/Quotes",
    "https://deadlock.wiki/Holliday/Quotes",
    "https://deadlock.wiki/Infernus/Quotes",
    "https://deadlock.wiki/Ivy/Quotes",
    "https://deadlock.wiki/Kelvin/Quotes",
    "https://deadlock.wiki/Lady_Geist/Quotes",
    "https://deadlock.wiki/Lash/Quotes",
    "https://deadlock.wiki/McGinnis/Quotes",
    "https://deadlock.wiki/Mina/Quotes",
    "https://deadlock.wiki/Mirage/Quotes",
    "https://deadlock.wiki/Mo_%26_Krill/Quotes",
    "https://deadlock.wiki/Paige/Quotes",
    "https://deadlock.wiki/Paradox/Quotes",
    "https://deadlock.wiki/Pocket/Quotes",
    "https://deadlock.wiki/Seven/Quotes",
    "https://deadlock.wiki/Shiv/Quotes",
    "https://deadlock.wiki/Sinclair/Quotes",
    "https://deadlock.wiki/Victor/Quotes",
    "https://deadlock.wiki/Vindicta/Quotes",
    "https://deadlock.wiki/Viscous/Quotes",
    "https://deadlock.wiki/Vyper/Quotes",
    "https://deadlock.wiki/Warden/Quotes",
    "https://deadlock.wiki/Wraith/Quotes",
    "https://deadlock.wiki/Yamato/Quotes"
  ];




async function initDB() {
  try {
    await sequelize.authenticate();
    console.log("✅ Database connected successfully.");
    await sequelize.sync();
    console.log("✅ All tables recreated successfully.");
  } catch (err) {
    console.error("❌ DB init error:", err);
    throw err;
  }
}

async function main() {
  await initDB(); // drops & recreates tables

  await importCharacters(urls);
  await importQuotes(quoteUrls);

  console.log("🎉 All imports done!");
  process.exit(0); // safely exit
}

main().catch(err => console.error(err));
