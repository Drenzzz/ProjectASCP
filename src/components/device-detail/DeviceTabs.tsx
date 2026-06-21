"use client";

import { useState, useEffect, useRef } from "react";
import { FileText, HardDrive, List } from "lucide-react";
import { cn } from "@/lib/utils";
import { gsap } from "gsap";

interface DeviceTabsProps {
    instructionsHtml: string;
    changelogHtml: string;
}

export function DeviceTabs({ instructionsHtml, changelogHtml }: DeviceTabsProps) {
    const [activeTab, setActiveTab] = useState("instructions");
    const contentRef = useRef<HTMLDivElement>(null);

    const tabs = [
        { value: "instructions", label: "Installation Guide", icon: FileText, content: instructionsHtml },
        { value: "changelog", label: "Changelog", icon: HardDrive, content: changelogHtml },
    ];

    const currentTab = tabs.find((t) => t.value === activeTab);

    useEffect(() => {
        if (contentRef.current) {
            gsap.fromTo(
                contentRef.current,
                { opacity: 0, y: 12 },
                { opacity: 1, y: 0, duration: 0.35, ease: "power2.out" }
            );
        }
    }, [activeTab]);

    return (
        <div className="w-full space-y-6">
            {/* Tab Switcher Bar */}
            <div className="flex p-1.5 bg-gray-100 rounded-full w-full border-0 select-none">
                <div className="grid grid-cols-2 gap-1.5 w-full">
                    {tabs.map((tab) => {
                        const Icon = tab.icon;
                        const isActive = activeTab === tab.value;
                        return (
                            <button
                                key={tab.value}
                                onClick={() => setActiveTab(tab.value)}
                                className={cn(
                                    "flex items-center justify-center gap-2 px-6 py-3 rounded-full text-sm font-extrabold transition-all border-0 shadow-none outline-none cursor-pointer w-full select-none",
                                    isActive
                                        ? "bg-primary text-white shadow-xs"
                                        : "text-gray-500 hover:text-gray-900"
                                )}
                            >
                                <Icon className="h-4.5 w-4.5 shrink-0" />
                                <span>{tab.label}</span>
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* Tab Content Panel */}
            <div 
                ref={contentRef}
                className="relative min-h-[200px] overflow-hidden rounded-[32px] bg-[#f0f4f8] p-6 md:p-8 border-0 shadow-none"
            >
                {currentTab?.content ? (
                    <div
                        className="prose max-w-none text-gray-700 prose-headings:text-gray-900 prose-headings:font-bold prose-code:bg-white/80 prose-code:text-primary prose-a:text-primary"
                        dangerouslySetInnerHTML={{ __html: currentTab.content }}
                    />
                ) : (
                    <div className="relative min-h-[200px] flex flex-col items-center justify-center py-12 text-gray-500">
                        <List className="h-10 w-10 mb-4 opacity-20 text-gray-400" />
                        <p className="font-medium text-sm">No content available for this section.</p>
                    </div>
                )}
            </div>
        </div>
    );
}
