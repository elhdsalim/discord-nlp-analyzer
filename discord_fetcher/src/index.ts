import { getMessagesUntilDate } from './discord/api.js';


(async() => {
  await getMessagesUntilDate();
})()