import { z } from "zod";

export const rawTeamEntrySchema = z.object({
    name: z.string(),
    github: z.string(),
    telegram: z.string().optional(),
    XDA: z.string().optional(),
    role: z.string(),
    tagline: z.string().optional(),
});

export const rawTeamResponseSchema = z.object({
    team: z.array(rawTeamEntrySchema),
});

export type RawTeamEntry = z.infer<typeof rawTeamEntrySchema>;
export type RawTeamResponse = z.infer<typeof rawTeamResponseSchema>;

export interface Maintainer {
    name: string;
    role: string;
    githubUsername: string;
    githubUrl: string;
    telegram?: string;
    xdaUrl?: string;
    tagline?: string;
    avatarUrl: string;
}

export function rawToMaintainer(raw: RawTeamEntry): Maintainer {
    return {
        name: raw.name,
        role: raw.role,
        githubUsername: raw.github,
        githubUrl: `https://github.com/${raw.github}`,
        telegram: raw.telegram,
        xdaUrl: raw.XDA,
        tagline: raw.tagline,
        avatarUrl: `https://github.com/${raw.github}.png`,
    };
}
