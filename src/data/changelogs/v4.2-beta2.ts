import type { Changelog } from "./types";

export const v4_2_beta2: Changelog = {
    version: "v4.2 - OPEN BETA 2",
    date: "2025-11-23",
    type: "Beta",
    title: "Bug Fixes & Feature Additions",
    description: "Introducing ASCP v4.2 - OPEN BETA 2 with some bug fixes and few good features.",
    content: [
        {
            name: "System",
            items: [
                "Fixed the charging not indicating on status bar",
                "Fixed the crash of few apps",
                "Fixed the spoofing (some reported its broken)",
                "Fixed the animation jitters in some scenarios",
                "Fixed the ui freeze issues in some circunstâncias",
            ],
        },
        {
            name: "Animations",
            items: [
                "Refined the app open/close animation",
                "Improved the recents animations for more snappier experience",
                "Fixed the scroll animation (earlier a bit jitter)",
            ],
        },
        {
            name: "Features/Addons",
            items: [
                "Added the three finger screenshot feature",
                "Added gameproputils for game spoofing",
                "Added ambient wake options",
                "Added color adjustment customizations from CLO",
                "Added the Pure Dark mode feature",
                "Added option to import keybox along with custom pif json importer",
                "Integrated the YT/YT music Revanced feature (Available in system>power house)",
                "Added Wifi timeout feature",
                "Added Double tap to sleep feature",
                "Added qs torch strenght",
            ],
        },
    ],
    note: "Releases for both F5 and F6 will start soon 👍",
};
