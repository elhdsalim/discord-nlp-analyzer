import { TOKEN, CHANNEL_ID, LIMIT, OUTPUT_FILE, STOP_DATE } from "../config.js";
import type { DiscordMessage, FetchDiscordMessagesResult } from "../types.js";
import axios from "axios";
import * as fs from 'fs';

export async function getMessages(before : string | null = null) : Promise<DiscordMessage[]> {
  let url = `https://discord.com/api/v9/channels/${CHANNEL_ID}/messages?limit=${LIMIT}`
  if (before) url = `${url}&before=${before}`;

  try {

      if (!TOKEN) throw new Error("TOKEN is missing in config");

      const { data } = await axios.get<DiscordMessage[]>(url, {
        headers: { 'Authorization': TOKEN }
      });

      return data;
  } catch (error) {
    console.error("Error while fetching messages", error)
    return [];
  }
};

async function fetchMessages(file : fs.WriteStream, before : string|null) : Promise<FetchDiscordMessagesResult> {
  const batch : DiscordMessage[] = await getMessages(before);
  let stop : boolean = false
  let count = 0;
  if (batch.length === 0) return {stop : true, lastId : null, count};

  for (const msg of batch) {
    const timestamp = new Date(msg.timestamp);
    if (timestamp < STOP_DATE) {
      stop = true;
      break;
    }

    file.write(JSON.stringify(msg) + "\n");
    count++;
  }

  const lastId = batch.at(-1)?.id ?? null;
  return { stop, lastId, count};
}


export async function getMessagesUntilDate(): Promise<void> {
  const file = fs.createWriteStream(OUTPUT_FILE, { flags: "a" });

  let cursor: string | null = null;
  let totalMessages = 0;

  try {
    while (true) {
      const { count, lastId, stop } = await fetchMessages(file, cursor);

      totalMessages += count;

      if (stop || !lastId) {
        break;
      }

      cursor = lastId;
    }
  } finally {
    await new Promise<void>(resolve => file.end(resolve));
  }

  console.log(`Finished — ${totalMessages} messages written.`);
}
