import axios from "axios";
import * as cheerio from "cheerio";
import { Character, Quote } from "../models.js";

// --------------------
// Helpers
// --------------------
function cleanText(s) {
    if (!s) return "";
    return s
        .replace(/\[edit[^\]]*\]/gi, "")
        .replace(/\s+/g, " ")
        .trim();
}

function getGuestCharacter(transcription, mainCharacter) {
    if (!transcription) return null;
    const lines = transcription.split("\n");
    for (let line of lines) {
        const colonIndex = line.indexOf(":");
        if (colonIndex > -1) {
            const speaker = line.slice(0, colonIndex).trim();
            if (speaker && speaker !== mainCharacter) return speaker;
        }
    }
    return null;
}

function getContextForTable($, table) {
    let context = null;
    let prev = $(table).prev();
    while (prev.length) {
        if (prev.is("h2")) {
            context = cleanText(prev.text());
            break;
        }
        prev = prev.prev();
    }
    return context;
}

function getTableHeaders($, table) {
    const headers = [];
    const firstRow = $(table).find("tr").first();

    firstRow.find("th, td").each((_, cell) => {
        headers.push($(cell).text().trim().toLowerCase());
    });

    return headers;
}

// --------------------
// Scrape Quotes
// --------------------
async function scrapeQuotes(url) {
    const res = await axios.get(url);
    const $ = cheerio.load(res.data);

    const mainCharacter = $("h1").first().text().trim().replace(/\/.*$/, "");
    const quotes = [];

    $(".mw-parser-output table.wikitable").each((_, table) => {
        const tableContext = getContextForTable($, table);
        const headers = getTableHeaders($, table);

        $(table)
            .find("tr")
            .each((rowIndex, tr) => {
                if (rowIndex === 0) return;

                const tds = $(tr).find("td");
                if (tds.length === 0) return;

                const transcriptIndex = headers.findIndex(
                    (h) =>
                        h.includes("transcript") ||
                        h.includes("line") ||
                        h.includes("quote")
                );
                const heroIndex = headers.findIndex(
                    (h) => h.includes("hero") || h.includes("speaker")
                );
                const itemIndex = headers.findIndex((h) => h.includes("item"));
                const contextIndex = headers.findIndex((h) =>
                    h.includes("context")
                );

                const transcription =
                    transcriptIndex >= 0
                        ? cleanText($(tds[transcriptIndex]).text())
                        : cleanText($(tds[0]).text());
                if (!transcription) return;

                const guestCharacter =
                    heroIndex >= 0
                        ? cleanText($(tds[heroIndex]).text())
                        : getGuestCharacter(transcription, mainCharacter);

                const item =
                    itemIndex >= 0 ? cleanText($(tds[itemIndex]).text()) : null;
                const context =
                    contextIndex >= 0
                        ? cleanText($(tds[contextIndex]).text())
                        : null;

                quotes.push({
                    transcription,
                    context: tableContext + (context ? " - " + context : ""),
                    item,
                    guestCharacter,
                });
            });
    });

    console.log(`Extracted ${quotes.length} quotes from ${mainCharacter}`);
    return { quotes, mainCharacter };
}

// --------------------
// Import into DB (using characterID)
// --------------------
export async function importQuotes(urls) {
    try {
        await Promise.all(
            urls.map(async (url) => {
                try {
                    console.log(url);
                    const { quotes, mainCharacter } = await scrapeQuotes(url);

                    // Ensure main character exists
                    const [mainChar] = await Character.findOrCreate({
                        where: { name: mainCharacter },
                        defaults: { background: "" },
                    });

                    // Create guest characters in parallel and map name -> characterID
                    const guestNames = [
                        ...new Set(
                            quotes.map((q) => q.guestCharacter).filter(Boolean)
                        ),
                    ];
                    const guestChars = await Promise.all(
                        guestNames.map(async (name) => {
                            const char = await Character.findOne({
                                where: { name },
                            });
                            return char ? { name, id: char.id } : null;
                        })
                    );

                    // filter out nulls
                    const guestMap = Object.fromEntries(
                        guestChars.filter(Boolean).map((c) => [c.name, c.id])
                    );

                    // Insert quotes in parallel
                    await Promise.all(
                        quotes.map((q) =>
                            Quote.create({
                                transcript: q.transcription,
                                context: q.context,
                                item: q.item,
                                guestCharacterID: q.guestCharacter
                                    ? guestMap[q.guestCharacter]
                                    : null, // store guest character ID
                                characterID: mainChar.id, // main character ID
                            })
                        )
                    );

                    console.log(
                        `Quotes imported successfully for ${mainCharacter}.`
                    );
                } catch (err) {
                    console.error(`Error importing ${url}:`, err.message);
                }
            })
        );
    } catch (err) {
        console.error("Fatal error:", err.message);
    }
}
