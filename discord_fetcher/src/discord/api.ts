import { TOKEN, CHANNEL_ID, LIMIT } from "../config.js";
import type { DiscordMessage } from "../types.js";
import axios from "axios";

export async function getMessages(before : string | null = null, limit = LIMIT) : Promise<DiscordMessage[]> {
  let url = `https://discord.com/api/v9/channels/${CHANNEL_ID}/messages?limit=${LIMIT}`
  if (before) url = `${url}&before=${before}`;

  const { data } = await axios.get<DiscordMessage[]>(url, {
    headers: { Authorization: TOKEN }
  })

  
  return data;
};

(async() => {
  const messages = await getMessages();
  console.log(messages)
})()