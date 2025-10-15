import "dotenv/config";

export const TOKEN = process.env.DISCORD_TOKEN;
export const CHANNEL_ID = process.env.CHANNEL_ID;
export const OUTPUT_FILE = "messages.ndjson";
export const STOP_DATE = new Date("2025-07-01T00:00:00Z");
export const LIMIT = 100;
export const OPENAI_API_KEY = process.env.OPENAI_API_KEY;