import { z } from "zod";
import { fetchJSON } from "./client";

const downloadStatsSchema = z.record(z.string(), z.number());

let statsCache: Record<string, number> | null = null;

export async function getDownloadStats(): Promise<Record<string, number>> {
    if (statsCache) return statsCache;
    const data = await fetchJSON("/source/download_stats.json", downloadStatsSchema);
    statsCache = data ?? {};
    return statsCache;
}

export async function getDeviceDownloadCount(codename: string): Promise<number> {
    const stats = await getDownloadStats();
    return stats[codename] ?? 0;
}
