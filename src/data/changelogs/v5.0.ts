import type { Changelog } from "./types";

export const v5_0: Changelog = {
    version: "v5.0",
    date: "2026-01-22",
    type: "Stable",
    title: "ASCP v5.0 – Android 16 QPR2",
    description: "ASCP v5.0 brings Android 16 QPR2 with the January 5, 2026 security patch. This update focuses on Pixel-style cleanliness with powerful custom features and smooth performance.",
    content: [
        {
            name: "UI & Experience",
            items: [
                "Enjoy a refreshed look with Gsans Flex as default font.",
                "Smoother animations.",
                "Pure black QS (when blur off).",
                "Wallpaper customizations.",
                "Display color controls.",
                "New Smartspace.",
                "Lockscreen carrier hide option.",
            ],
        },
        {
            name: "Power Features",
            items: [
                "Includes Gamespace, sidebar & freeform windows.",
                "App lock & clone.",
                "Circle to Search.",
                "Flashlight strength tile.",
                "Custom DNS.",
                "Refresh rate manager.",
                "Clipboard auto-clear.",
                "Network traffic indicator.",
                "Advanced reboot.",
                "Compact heads-up.",
                "Data disabled indicator.",
            ],
        },
        {
            name: "Privacy & Security",
            items: [
                "Hide screen capture status.",
                "Override mock location.",
                "Ignore window secure flag.",
                "Hide dev status.",
                "Per-app spoofing.",
                "Full spoofing support.",
            ],
        },
        {
            name: "Smart Add-ons",
            items: [
                "Face unlock.",
                "In-call vibration.",
                "Double tap to sleep.",
                "3-finger & partial screenshots.",
                "ReVanced support.",
            ],
        },
    ],
};
