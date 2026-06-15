import { fetchJSON } from "./client";
import {
    rawTeamResponseSchema,
    rawToMaintainer,
    type Maintainer,
} from "@/lib/schema/team";

export async function getTeamMembers(): Promise<Maintainer[]> {
    const data = await fetchJSON("/team.json", rawTeamResponseSchema);
    if (!data) return [];
    return data.team.map(rawToMaintainer);
}
