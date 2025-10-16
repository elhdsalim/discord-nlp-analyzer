import axios from "axios";
import type { Company } from "./types.js";
import { EURATECH_API_URL } from "./config.js";


async function getStartup(page : number) : Promise<{totalReferencedStartups: number, startups:Company[], startupsCount: number}> {
    const {data} = await axios.get(`${EURATECH_API_URL}&page=${page}`);
    const totalReferencedStartups = data['hydra:totalItems']

    const startups : Company[]= data['hydra:member']
    const startupsCount = startups.length;

    return {
        totalReferencedStartups,
        startups,
        startupsCount
    }
}

export async function getAllStartups() : Promise<Company[]> {
    const allStartups = [];
    const { totalReferencedStartups, startups, startupsCount } = await getStartup(1); // to get the count of startups, for pagination
    // we could do it without this first call, but it maybe would require a useless call.
    allStartups.push(...startups)

    for (let i = 2; i <= Math.ceil(totalReferencedStartups / startupsCount); i++) {
        const { startups } = await getStartup(i);
        allStartups.push(...startups);
    }

    return allStartups
};