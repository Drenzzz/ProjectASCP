import type { Changelog } from "./types";

export const v4_3: Changelog = {
    version: "v4.3",
    date: "2025-12-28",
    type: "Stable",
    title: "Project ASCP v4.3 - Refined Experience",
    description: "Update focused on security, smoothness, spoofing improvements, and smartspace implementation.",
    content: [
        {
            name: "System",
            items: [
                "Updated security patch to December 2025",
                "Enhanced the overall ui smoothness and performance",
                "Added new ascp exclusive wallpaper to match with our update cycle",
                "Added ASCP version entry into about section",
                "Added about rom section into about phone",
            ],
        },
        {
            name: "Bug fixes",
            items: [
                "Fixed the issue with updater showing same update even after its installed",
                "Fixed the issue with keyboard not showing while using gamespace",
                "Fixed the flickering issue in streaming video cases",
                "Fixed the sound cracking issues in some cases",
                "Fixed 5g icon desaparecer in some scenarios",
            ],
        },
        {
            name: "Animations",
            items: [
                "Enhanced the qs expansion animation",
                "Optimized home to desktop transition",
                "Optimized the response speed of recents panel animation",
                "Optimized the download/upload animations",
                "Refined overall animations throughout UI, app open/close etc",
            ],
        },
        {
            name: "Features/Addons",
            items: [
                "Added option to disable data indicator icon (available in statusbar tunner)",
                "Added feature to hide carrier name on lockscreen",
                "Added feature to allow suppress notifications sound/vibration if screen is ON (annoying notification)",
                "Added compact headsup notification feature",
                "Re-added the youtube/music revanced support",
                "Added Quick Tap feature",
                "Added Per App spoofing property support (spoof your apps as per your requirements)",
                "Added better implementation for network traffic indicator feature",
                "Added support for inbuilt pif json fetching system",
                "Added Ambient AOD toggle (to switch bettwen old style aod vs new ambient aod)",
                "Added smartspace implementation",
                "Added option to disable all integrity spoof in case user wanted to use root method or modules",
            ],
        },
        {
            name: "Other Improvements",
            items: [
                "Implemented default ask pin/pass for poweroff/reboot device",
                "Shortened the time period for device shutdown",
                "Improvement in statusbar tunner",
                "Spoofed device to show as locked bootloader",
                "Improved the overall spoofing section with better compatibility and efficiency",
                "Many more under the hood changes and improvements",
                "All the spoofing related things are placed under apps section",
            ],
        },
    ],
};
