import { OUTPUT_FILE } from "../discord_fetcher/src/config.js";
import type { DiscordMessage } from "../discord_fetcher/src/types.js";
import fs from 'fs';

/**
 * I need to read line by line because it reads a ndjson file, not a json
 * @returns 
 */
export function readMessages() : DiscordMessage[] {
    const content = fs.readFileSync(OUTPUT_FILE, "utf-8");
    // console.log(content)
    const lines = content.split("\n");
    const messages : DiscordMessage[] = [];
    
    for (const line of lines) {
        if (!line.trim()) continue; // if line is empty (or contains only spaces)

        try {
            const msg : DiscordMessage = JSON.parse(line);
            messages.push(msg);
        } catch (error) {
            console.error("Error", line, error)
        }
    }

    return messages;
}
