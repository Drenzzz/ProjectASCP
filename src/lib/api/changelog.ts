import { fetchText } from "./client";

export async function getDeviceChangelog(codename: string): Promise<string | null> {
    return fetchText(`/device/${codename}/changelogs/his_changelog.md`);
}

export async function getDeviceShortChangelog(codename: string): Promise<string | null> {
    return fetchText(`/device/${codename}/changelogs/changelog.md`);
}
