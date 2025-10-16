import axios from "axios"
import type { Company } from "./types.js";

const URL = "https://www.euratechnologies.com/api/companies?itemsPerPage=12&tenant_or_accelerated=true&organisationType=enum.company-organisation-type.startup&campuses=1&"

async function getStartup(page : number) : Promise<{totalReferencedStartups: number, startups:Company[], startupsCount: number}> {
    const {data} = await axios.get(`${URL}&page=${page}`);
    const totalReferencedStartups = data['hydra:totalItems']

    const startups : Company[]= data['hydra:member']
    const startupsCount = startups.length;

    return {
        totalReferencedStartups,
        startups,
        startupsCount
    }
}

async function getAllStartups() : Promise<Company[]> {
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

(async() => {
    const startups = await getAllStartups()
    console.log(startups.length) // returns 58
})();