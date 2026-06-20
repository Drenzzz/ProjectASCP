import { z } from "zod";
import { formatBytes, formatDate } from "@/lib/utils";

export type BuildType = "full" | "incremental";

export const rawBuildEntrySchema = z.object({
    datetime: z.string(),
    filename: z.string(),
    id: z.string(),
    md5: z.string().optional(),
    size: z.number(),
    url: z.string(),
    version: z.string(),
});

export const rawUpdaterResponseSchema = z.object({
    response: z.array(rawBuildEntrySchema),
});

export type RawBuildEntry = z.infer<typeof rawBuildEntrySchema>;
export type RawUpdaterResponse = z.infer<typeof rawUpdaterResponseSchema>;

export interface BuildEntry {
    filename: string;
    sha256: string;
    md5?: string;
    sizeBytes: number;
    sizeFormatted: string;
    downloadUrl: string;
    version: string;
    builtAt: string;
    builtDate: string;
}

export function rawToBuildEntry(raw: RawBuildEntry): BuildEntry {
    const unixSeconds = parseInt(raw.datetime, 10);
    const builtAt = Number.isFinite(unixSeconds)
        ? new Date(unixSeconds * 1000).toISOString()
        : "";
    return {
        filename: raw.filename,
        sha256: raw.id,
        md5: raw.md5,
        sizeBytes: raw.size,
        sizeFormatted: formatBytes(raw.size),
        downloadUrl: raw.url,
        version: raw.version,
        builtAt,
        builtDate: formatDate(raw.datetime),
    };
}
