import "dotenv/config";

import fs from "fs";
import OpenAI from "openai";
import cosineSimilarity from "compute-cosine-similarity";

const client = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

const EMBEDDINGS_FILE = "chunk_embeddings.json";
const TOP_K = 5;

type Chunk = {
    chunk_text: string;
    message_ids: string[];
    start_ts: string;
    end_ts: string;
    embedding: number[];
};

async function search(question: string) {
    const raw = fs.readFileSync(EMBEDDINGS_FILE, "utf-8");
    const chunks: Chunk[] = JSON.parse(raw);

    const { data } = await client.embeddings.create({
        model: "text-embedding-3-large",
        input: question
    });

    const questionEmbedding = data[0]!.embedding;

    const scored = chunks.map(chunk => ({
        chunk,
        score: cosineSimilarity(chunk.embedding, questionEmbedding)
    }));

    scored.sort((a, b) => b.score! - a.score!);

    const top = scored.slice(0, TOP_K);

    console.log(`\nTop ${TOP_K} chunks for: "${question}"\n`);

    top.forEach((item, i) => {
        console.log(`--- RESULT ${i + 1} (score: ${item.score!.toFixed(3)}) ---`);
        console.log(`From ${item.chunk.start_ts} to ${item.chunk.end_ts}`);
        console.log(item.chunk.chunk_text);
        console.log("");
    });
}

const question = process.argv.slice(2).join(" ");

if (!question) {
    console.error("Please provide a question");
    process.exit(1);
}

search(question);
