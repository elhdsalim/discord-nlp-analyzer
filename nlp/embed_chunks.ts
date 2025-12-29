import "dotenv/config";

import fs from "fs";
import readline from "readline";
import OpenAI from "openai";

const client = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

const INPUT_FILE = "chunks.ndjson";
const OUTPUT_FILE = "chunk_embeddings.json";
const BATCH_SIZE = 32;

async function embedChunks() {
    const input = fs.createReadStream(INPUT_FILE);
    const rl = readline.createInterface({ input });

    const chunks: any[] = [];
    const out: any[] = [];

    for await (const line of rl) {
        if (!line.trim()) continue;
        chunks.push(JSON.parse(line));
    }

    console.log(`Loaded ${chunks.length} chunks`);

    for (let i = 0; i < chunks.length; i += BATCH_SIZE) {
        const batch = chunks.slice(i, i + BATCH_SIZE);

        const texts = batch.map(c => c.chunk_text);

        const response = await client.embeddings.create({
            model: "text-embedding-3-large",
            input: texts
        });

        response.data.forEach((item, idx) => {
            out.push({
                ...batch[idx],
                embedding: item.embedding
            });
        });

        console.log(`Embedded ${Math.min(i + BATCH_SIZE, chunks.length)} / ${chunks.length}`);
    }

    fs.writeFileSync(OUTPUT_FILE, JSON.stringify(out, null, 2));
    console.log("Chunk embeddings written.");
}

embedChunks();
