const DEFAULT_DOWNLOADS = 5000;

export async function getDownloadsCount(): Promise<number> {
    try {
        const today = new Date().toISOString().split("T")[0];
        const url = `https://sourceforge.net/projects/project-ascp/files/stats/json?start_date=2024-01-01&end_date=${today}`;
        const res = await fetch(url);
        if (!res.ok) return DEFAULT_DOWNLOADS;
        const data: unknown = await res.json();
        if (
            data !== null &&
            typeof data === "object" &&
            "total" in data &&
            typeof (data as { total: unknown }).total === "number"
        ) {
            return (data as { total: number }).total;
        }
        return DEFAULT_DOWNLOADS;
    } catch (error) {
        console.error("[api] downloads count fetch error:", error);
        return DEFAULT_DOWNLOADS;
    }
}
