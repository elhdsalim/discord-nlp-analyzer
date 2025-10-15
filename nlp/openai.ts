import OpenAI from "openai";

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function createQuestionEmbedding(question : string) {
    const { data } = await client.embeddings.create({
        model: "text-embedding-3-large",
        input: question,
    });

    return data;
}

export async function createChat(topMessages : string, question : string) : Promise<string> {
    const summary = await client.chat.completions.create({
        model: "gpt-5-mini",
        messages: [
            {
                role: "system",
                content: "Tu es un assistant qui répond uniquement à partir des messages fournis en faisant un résumé de tout les conseils. Si la réponse n'est pas dans les messages, dis 'Je ne sais pas'.",
            },
            {
                role: "user",
                content: `Voici les messages :\n${topMessages}\n\nRéponds à la question : ${question}`,
            },
        ],
    });

    return summary.choices[0]?.message?.content ?? "error : no answer.";
}