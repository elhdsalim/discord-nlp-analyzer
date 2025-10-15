import OpenAI from "openai";
import fs from "fs";
import { readMessages } from "./utils.js";
import { OPENAI_API_KEY } from "../discord_fetcher/src/config.js";
const client = new OpenAI({ apiKey: OPENAI_API_KEY });

async function batchEmbeddingRequest(contents : string[]) {
  const embeddings : number[][] = [];

  for (let i = 0; i < contents.length; i+=100) {
    const batch = contents.slice(i, i + 100);
      const response = await client.embeddings.create({
      model: "text-embedding-3-large",
      input: batch
    });

    const vectors = response.data.map(e => e.embedding);
    embeddings.push(...vectors);
  }

  return embeddings;
}

export async function makeEmbeddings() {
  const messages = readMessages();
  const contents = messages
    .map(m => m.content?.trim()) // remove spaces
    .filter(c => c && c.length > 0) // avoid undefined msgs, and should have at least 1 char

  const embeddings = await batchEmbeddingRequest(contents);

  fs.writeFileSync("embeddings.json", JSON.stringify({
    messages: contents,
    embeddings
  }));

  return embeddings;
}


