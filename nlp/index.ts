import OpenAI from "openai";
import { OUTPUT_FILE } from "../discord_fetcher/src/config.js";
import { makeEmbeddings } from "./embedding.js";
import { readEmbeddings } from "./utils.js";

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });


(async() => {
    
    // const embeddings = await makeEmbeddings()
  const { messages, embeddings } = readEmbeddings();
  console.log(`${messages.length} loaded msgs`);

  const question = "De quoi ai-je parlé avec cette personne ?";
  const { data } = await client.embeddings.create({
    model: "text-embedding-3-large",
    input: question,
  });

  console.log(data)

})();