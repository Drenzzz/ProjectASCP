/// <reference types="astro/client" />
import type { z } from "zod";

const BASE_HOST =
    import.meta.env.PUBLIC_API_BASE_URL ??
    "https://raw.githubusercontent.com/Pixelify-AOSP/official_devices";
const BRANCH = import.meta.env.PUBLIC_API_BRANCH ?? "main";

export const API_BASE = `${BASE_HOST}/${BRANCH}`;

export async function fetchJSON<T>(
    endpoint: string,
    schema: z.ZodType<T>,
): Promise<T | null> {
    try {
        const res = await fetch(`${API_BASE}${endpoint}`);
        if (!res.ok) {
            console.error(`[api] ${endpoint} returned HTTP ${res.status}`);
            return null;
        }
        const json: unknown = await res.json();
        const parsed = schema.safeParse(json);
        if (!parsed.success) {
            console.error(`[api] ${endpoint} schema validation failed:`, parsed.error.message);
            return null;
        }
        return parsed.data;
    } catch (error) {
        console.error(`[api] ${endpoint} fetch error:`, error);
        return null;
    }
}

export async function fetchText(endpoint: string): Promise<string | null> {
    try {
        const res = await fetch(`${API_BASE}${endpoint}`);
        if (!res.ok) {
            console.error(`[api] ${endpoint} returned HTTP ${res.status}`);
            return null;
        }
        return await res.text();
    } catch (error) {
        console.error(`[api] ${endpoint} fetch error:`, error);
        return null;
    }
}
