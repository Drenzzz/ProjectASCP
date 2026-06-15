import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

const BYTES_IN_MB = 1024 * 1024;
const BYTES_IN_GB = BYTES_IN_MB * 1024;

export function formatBytes(bytes: number): string {
    if (!Number.isFinite(bytes) || bytes < 0) return "0 B";
    if (bytes >= BYTES_IN_GB) {
        return (bytes / BYTES_IN_GB).toFixed(2) + " GB";
    }
    return (bytes / BYTES_IN_MB).toFixed(0) + " MB";
}

export function formatDate(input: string | number | Date): string {
    try {
        let date: Date;
        if (typeof input === "number") {
            date = new Date(input * 1000);
        } else if (typeof input === "string") {
            const trimmed = input.trim();
            // Unix seconds heuristic: 10+ digits, all numeric
            if (/^\d{10,}$/.test(trimmed)) {
                date = new Date(parseInt(trimmed, 10) * 1000);
            } else {
                date = new Date(trimmed);
            }
        } else {
            date = input;
        }
        if (Number.isNaN(date.getTime())) return "-";
        return date.toISOString().split("T")[0] ?? "-";
    } catch {
        return "-";
    }
}

export async function copyToClipboard(value: string): Promise<boolean> {
    if (typeof navigator === "undefined" || !navigator.clipboard) {
        return false;
    }
    try {
        await navigator.clipboard.writeText(value);
        return true;
    } catch (error) {
        console.error("[utils] copyToClipboard failed:", error);
        return false;
    }
}

export function slugify(input: string): string {
    return input
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "");
}
