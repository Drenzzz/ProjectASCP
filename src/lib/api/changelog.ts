import { fetchText } from "./client";

export async function getDeviceChangelog(codename: string): Promise<string | null> {
    return fetchText(`/full_changelogs/${codename}.md`);
}

export async function getDeviceShortChangelog(codename: string): Promise<string | null> {
    return fetchText(`/updater/changelogs/${codename}.md`);
}
