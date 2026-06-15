import { fetchJSON } from "./client";
import {
    rawUpdaterResponseSchema,
    rawToBuildEntry,
    type BuildEntry,
} from "@/lib/schema/updater";

export async function getLatestBuild(codename: string): Promise<BuildEntry | null> {
    const data = await fetchJSON(
        `/updater/${codename}.json`,
        rawUpdaterResponseSchema,
    );
    const first = data?.response?.[0];
    return first ? rawToBuildEntry(first) : null;
}
