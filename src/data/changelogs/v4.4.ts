import type { Changelog } from "./types";

export const v4_4: Changelog = {
    version: "v4.4",
    date: "2026-01-14",
    type: "Stable",
    title: "Project-ASCP v4.4 - Final QPR-1 Release",
    description: "January security patch, system stability improvements, new animations, and visual refinements.",
    content: [
        {
            name: "System",
            items: [
                "Updated security patch to January 2026.",
                "Updated the ASCP version to 4.4.",
                "Improvement in system stability and performance.",
                "Improvement in the overall haptics throughout the UI.",
                "Reduced touch slop for better responsiveness.",
                "Made UI rendering faster and smoother.",
                "Reduced background CPU overhead for better performance.",
                "Improved the UI smoothness by reducing down the frames delay.",
            ],
        },
        {
            name: "Bug fixes",
            items: [
                "Fixed the issue with few games/apps crashing.",
                "Fixed the issue with split qs tiles disappearing in landscape sometimes.",
                "Few minor fixes and improvements.",
                "Fixed vtservice cpu hogging causing high battery drain.",
                "Fixed bluetooth headset initial audio jank.",
                "Fixed connection/pairing related issue with bt in some scenarios.",
                "Fixed the audio cutting off sometime suddenly.",
                "Fixed unnecessary refresh rate drops.",
                "Fixed unnecessary heavy graphics processing to save performance and battery.",
                "Fixed issue with storage access in some apps.",
            ],
        },
        {
            name: "Visual Changes",
            items: [
                "Redesigned the Updater UI.",
                "Added back the pure black qs panel when blur is turned off.",
                "Restored the wifi icon positioning to left side of the network icon on statusbar.",
                "Enabled new auto select network UI.",
            ],
        },
        {
            name: "Features/Addons",
            items: [
                "Added option to hide Qs Panel from lockscreen.",
                "Added Sound Qs tile.",
                "Added hide ime space feature.",
                "Added toggle to enable force LTE_CA.",
                "Added toggle to show volume panel left side.",
            ],
        },
        {
            name: "Other Improvements",
            items: [
                "Restricted updating revanced yt/yt music even if user taps on update option in playstore.",
                "Protected (hide) more sensitive info from the about section.",
                "Improvement in app launch/close animation.",
                "Improved the media/audio playback for more smooth experience.",
            ],
        },
    ],
};
