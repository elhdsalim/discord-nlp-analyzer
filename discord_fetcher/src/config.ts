import "dotenv/config";

export const TOKEN = process.env.DISCORD_TOKEN ?? "TOKEN";
export const CHANNEL_ID = process.env.CHANNEL_ID;
export const OUTPUT_FILE = "messages.ndjson";
export const STOP_DATE = new Date("2025-10-01T00:00:00Z");
export const LIMIT = 100;
