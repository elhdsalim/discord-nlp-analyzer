import { readFile, writeFile } from "fs/promises";
import type { Company } from "./types.js";

export async function writeStartupsFile(startups : Company[]) {
    try {
        await writeFile('output.json', JSON.stringify(startups, null, 2), 'utf8');
        console.log('success');
    } catch (err) {
        console.error('error writing file:', err);
    }
}


export async function readStartupsFile() {
    try {
        const content = await readFile('output.json', 'utf-8');
        return JSON.parse(content);
    } catch (err) {
        console.error('error writing file:', err);
    }
}