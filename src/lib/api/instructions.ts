import { fetchText } from "./client";

export async function getDeviceInstructions(codename: string): Promise<string | null> {
    return fetchText(`/instructions/${codename}.md`);
}
