import fs from "fs";
import readline from "readline";
import { OUTPUT_FILE } from "../discord_fetcher/src/config.js";

const CHUNK_SIZE = 20;
const OVERLAP = 5;

const OUTPUT_CHUNKS_FILE = "chunks.ndjson";

async function chunkMessages() {
    const input = fs.createReadStream(OUTPUT_FILE);
    const rl = readline.createInterface({ input }); // read line per line

    const output = fs.createWriteStream(OUTPUT_CHUNKS_FILE, { flags: "w" });

    let buffer: any[] = [];

    for await (const line of rl) {
        if (!line.trim()) continue;

        const msg = JSON.parse(line);
        buffer.push(msg);

        if (buffer.length >= CHUNK_SIZE) {
            writeChunk(buffer, output);

            buffer = buffer.slice(CHUNK_SIZE - OVERLAP);
        }
    }

    if (buffer.length > 0) {
        writeChunk(buffer, output);
    }

    output.end();
    console.log("Chunking with overlap finished.");
}

function writeChunk(messages: any[], output: fs.WriteStream) {
    const chunk = {
        chunk_text: messages
            .map(m => `${m.author?.username ?? "inconnu"}: ${m.content}`)
            .join("\n"),
        message_ids: messages.map(m => m.id),
        start_ts: messages[0]?.timestamp,
        end_ts: messages[messages.length - 1]?.timestamp
    };

    output.write(JSON.stringify(chunk) + "\n");
}

chunkMessages();
