// import { makeEmbeddings } from "./embedding.js";
import { readEmbeddings } from "./utils.js";
import cosineSimilarity from "compute-cosine-similarity";
import { createChat, createQuestionEmbedding } from "./openai.js";


async function getTopMessages(embeddings : any , messages:string[], questionEmbedding: number[]) {
    const results = embeddings.map((emb : number[], i : number) => ({
        message: messages[i],
        score: cosineSimilarity(emb, questionEmbedding),
    }));

    const topMessages = results
        .sort((a: { score: number }, b: { score: number }) => b.score - a.score)
        .slice(0, 50)
        .map((r:{ message: string }) => r.message)
        .join("\n");


    return topMessages
}

(async() => {
    // const embeddings = await makeEmbeddings()
    
    const { messages, embeddings } = readEmbeddings();
    console.log(`${messages.length} loaded msgs`);
    const question = "Question";

    const data = await createQuestionEmbedding(question);

    const questionEmbedding = data[0]?.embedding;
    if (!questionEmbedding) throw new Error("error with the questions embedding");

    const topMessages = await getTopMessages(embeddings, messages, questionEmbedding);

    const chat = await createChat(topMessages,question);

    console.log(chat)

})();