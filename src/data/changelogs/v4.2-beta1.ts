import type { Changelog } from "./types";

export const v4_2_beta1: Changelog = {
    version: "v4.2 - OPEN BETA",
    date: "2025-11-19",
    type: "Beta",
    title: "Android 16.0 QPR-1 Initial Release",
    description: "Introducing ASCP v4.2 - OPEN BETA based on Android Open Source Project (AOSP), Android 16.0 | QPR-1.",
    content: [
        {
            name: "System",
            items: [
                "Initial ASCP v4.2-OPEN BETA based on AOSP Android 16.0 Qpr1",
                "Integrated the November security patch",
                "Improved the overall stability on top of aosp base",
            ],
        },
        {
            name: "Animations",
            items: [
                "Enhanced the app open/close animations on top of aosp integration",
                "Reduced the notification chache",
                "Improved the media playing qs expansion animation",
            ],
        },
        {
            name: "Features/Addons",
            items: [
                "Added pixel launcher as default launcher",
                "Added X reality colour engine",
                "Added QPR2 style setup wizard",
                "HDR brightness customisation (available in display settings)",
                "Added AOD wallpaper customization",
                "Added the Smartspace feature",
                "Circle to search is available",
                "Added feature to import keybox (available in ascp lab)",
                "Added smart 5G feature",
            ],
        },
        {
            name: "Others",
            items: [
                "Added ASCP legacy boot animation",
                "Spoofed bootloader as locked",
                "Added gphotos spoofing",
            ],
        },
    ],
};
