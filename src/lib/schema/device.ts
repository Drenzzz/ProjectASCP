import { z } from "zod";

export const rawDeviceSchema = z.object({
    codename: z.string(),
    codename_alt: z.union([z.string(), z.array(z.string())]).optional(),
    vendor: z.string(),
    model: z.string(),
    maintainer_name: z.string(),
    github_username: z.string().optional(),
    image_url: z.string().optional(),
    donate_link: z.string().optional(),
    support_group: z.string().optional(),
    active: z.boolean(),
    frame: z.string().nullable().optional(),
    telegram_username: z.string().optional(),
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
    githubUsername?: string;
    donateLink?: string;
    supportGroup?: string;
}

export interface DeviceWithBuild extends Device {
    latestBuild: import("./updater").BuildEntry | null;
    downloadCount?: number;
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
    const githubUsername = raw.github_username ?? raw.maintainer_name;
    return {
        codename: raw.codename,
        codenames: normalizeCodenameAlt(raw.codename_alt),
        brand: raw.vendor,
        name: raw.model,
        maintainer: raw.maintainer_name,
        maintainerAvatar: `https://github.com/${githubUsername}.png`,
        active: raw.active,
        imageUrl: raw.image_url,
        githubUsername: raw.github_username,
        donateLink: raw.donate_link,
        supportGroup: raw.support_group,
    };
}
