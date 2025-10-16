import { readStartupsFile, writeStartupsFile } from "./utils.js";

(async()=> {

    // const startups = await getAllStartups();
    // await writeStartupsFile(startups);
    const startups = await readStartupsFile();

    console.log(startups)

})();