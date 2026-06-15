export interface ChangelogCategory {
    name: string;
    items: string[];
}

export interface Changelog {
    version: string;
    date: string;
    type: "Stable" | "Beta" | "Hotfix";
    title: string;
    description: string;
    content: ChangelogCategory[];
    note?: string;
}
