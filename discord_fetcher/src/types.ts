export interface DiscordUser {
  id: string;
  username: string;
  avatar?: string | null;
  discriminator?: string;
  public_flags?: number;
}

/**
 * i'll replace the any later, i have to check discord types
 */
export interface DiscordMessage {
  id: string;
  type: number;
  content: string;
  timestamp: string;
  edited_timestamp?: string | null;
  author: DiscordUser;
  attachments: any[];
  embeds: any[];
  mentions: any[];
  mention_roles: any[];
  pinned: boolean;
  mention_everyone: boolean;
  tts: boolean;
  flags: number;
  components: any[];
  [key: string]: any;
}
