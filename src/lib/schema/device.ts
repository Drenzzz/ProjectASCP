import { z } from "zod";

export const rawDeviceSchema = z.object({
    codename: z.string(),
    codename_alt: z.union([z.string(), z.array(z.string())]).optional(),
    vendor: z.string(),
    model: z.string(),
    maintainer_name: z.string(),
    frame: z.string().nullable().optional(),
    active: z.boolean(),
});

export const rawDevicesResponseSchema = z.object({
    devices: z.array(rawDeviceSchema),
});

export type RawDevice = z.infer<typeof rawDeviceSchema>;
export type RawDevicesResponse = z.infer<typeof rawDevicesResponseSchema>;

export interface Device {
    codename: string;
    codenames: string[];
    brand: string;
    name: string;
    maintainer: string;
    maintainerAvatar: string;
    active: boolean;
    imageUrl?: string;
    frame?: string | null;
}

export interface DeviceWithBuild extends Device {
    latestBuild: import("./updater").BuildEntry | null;
    changelogUrl: string;
    instructionUrl: string;
}

function normalizeCodenameAlt(alt: string | string[] | undefined): string[] {
    if (!alt) return [];
    if (Array.isArray(alt)) return alt;
    return alt
        .split("/")
        .map((s) => s.trim())
        .filter(Boolean);
}

export function rawToDevice(raw: RawDevice): Device {
    return {
        codename: raw.codename,
        codenames: normalizeCodenameAlt(raw.codename_alt),
        brand: raw.vendor,
        name: raw.model,
        maintainer: raw.maintainer_name,
        maintainerAvatar: `https://github.com/${raw.maintainer_name}.png`,
        active: raw.active,
        frame: raw.frame ?? null,
    };
}
