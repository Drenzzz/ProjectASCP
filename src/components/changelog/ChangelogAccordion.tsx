import React, { useState } from "react";
import type { Changelog } from "@/data/changelogs/types";

export interface Props {
    data: Changelog[];
}

const getCategoryIcon = (name: string) => {
    const lowerName = name.toLowerCase();
    if (lowerName.includes("ui") || lowerName.includes("experience")) {
        return (
            <svg className="h-4.5 w-4.5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <rect width="20" height="14" x="2" y="3" rx="2" />
                <line x1="8" x2="16" y1="21" y2="21" />
                <line x1="12" x2="12" y1="17" y2="21" />
            </svg>
        );
    }
    if (lowerName.includes("power") || lowerName.includes("system") || lowerName.includes("cpu") || lowerName.includes("performance")) {
        return (
            <svg className="h-4.5 w-4.5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="4" y="4" width="16" height="16" rx="2" />
                <rect x="9" y="9" width="6" height="6" />
                <path d="M9 1v3" /><path d="M15 1v3" />
                <path d="M9 20v3" /><path d="M15 20v3" />
                <path d="M20 9h3" /><path d="M20 15h3" />
                <path d="M1 9h3" /><path d="M1 15h3" />
            </svg>
        );
    }
    if (lowerName.includes("privacy") || lowerName.includes("security") || lowerName.includes("lock") || lowerName.includes("spoof")) {
        return (
            <svg className="h-4.5 w-4.5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            </svg>
        );
    }

    return (
        <svg className="h-4.5 w-4.5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="m12 3-1.912 5.886H3.886L8.773 12.5l-1.912 5.886 4.886-3.614 4.886 3.614-1.912-5.886 4.887-3.614h-6.202L12 3z" />
        </svg>
    );
};

const formatReleaseDate = (dateStr: string) => {
    const date = new Date(dateStr);
    if (isNaN(date.getTime())) return dateStr;
    return date.toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
    });
};

export const ChangelogAccordion: React.FC<Props> = ({ data }) => {

    const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

    const toggleItem = (index: number) => {
        setExpandedIndex(expandedIndex === index ? null : index);
    };

    return (
        <div className="w-full space-y-6">
            {data.map((release, index) => {
                const isExpanded = expandedIndex === index;
                return (
                    <div
                        key={release.version}
                        className="bento-card rounded-[32px] bg-[#f0f4f8] hover:bg-[#e4ebf3] transition-all duration-300 overflow-hidden border-0 shadow-none relative"
                    >

                        <button
                            onClick={() => toggleItem(index)}
                            className="w-full flex items-center justify-between p-8 text-left cursor-pointer select-none bg-transparent hover:bg-black/[0.01] transition-all duration-300 border-0 outline-none"
                            aria-expanded={isExpanded}
                        >
                            <div className="space-y-2 flex-1 pr-6">
                                <div className="flex items-center gap-3">
                                    <h2 className="text-3xl font-black text-gray-900 tracking-tight leading-none">
                                        {release.version}
                                    </h2>
                                    <span
                                        className={`px-3.5 py-1 rounded-full text-xxs font-extrabold tracking-widest uppercase border-0 ${
                                            release.type.toLowerCase() === "stable"
                                                ? "bg-emerald-600 text-white"
                                                : "bg-amber-600 text-white"
                                        }`}
                                    >
                                        {release.type}
                                    </span>
                                </div>
                                <span className="flex items-center gap-1.5 text-xs font-bold text-gray-400 select-none">
                                    <svg
                                        className="w-3.5 h-3.5"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2.5"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        aria-hidden="true"
                                    >
                                        <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                                        <line x1="16" y1="2" x2="16" y2="6"></line>
                                        <line x1="8" y1="2" x2="8" y2="6"></line>
                                        <line x1="3" y1="10" x2="21" y2="10"></line>
                                    </svg>
                                    {formatReleaseDate(release.date)}
                                </span>
                                <p className="text-sm font-semibold text-gray-600 leading-relaxed italic pt-1 max-w-2xl">
                                    "{release.description}"
                                </p>
                            </div>


                            <div
                                className="shrink-0 w-12 h-12 rounded-full bg-white flex items-center justify-center text-gray-600 shadow-xs border-0 transition-transform duration-300"
                                style={{ transform: isExpanded ? "rotate(180deg)" : "rotate(0deg)" }}
                            >
                                <svg
                                    className="w-5 h-5 stroke-[2.5]"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <polyline points="6 9 12 15 18 9" />
                                </svg>
                            </div>
                        </button>


                        <div
                            className={`grid transition-all duration-300 ease-in-out ${
                                isExpanded ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                            }`}
                        >
                            <div className="overflow-hidden">
                                <div className="p-8 pt-0 border-t border-gray-200/50 mt-2">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-6">
                                        {release.content.map((category) => (
                                            <div key={category.name} className="space-y-3.5">
                                                <h4 className="flex items-center gap-2 text-xs font-black text-primary uppercase tracking-widest leading-none select-none">
                                                    {getCategoryIcon(category.name)}
                                                    {category.name}
                                                </h4>
                                                <ul className="space-y-2.5">
                                                    {category.items.map((item, itemIdx) => (
                                                        <li
                                                            key={itemIdx}
                                                            className="text-sm font-medium text-gray-700 pl-5 relative leading-relaxed hover:text-gray-900 transition-colors"
                                                        >
                                                            <span className="absolute left-1.5 top-2.5 w-1.5 h-1.5 rounded-full bg-primary/45"></span>
                                                            {item}
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        ))}
                                    </div>


                                        {release.note && (
                                        <div className="mt-8 pt-4 border-t border-gray-200/50">
                                            <div className="bg-primary/5 rounded-2xl p-4 border border-primary/10 flex gap-3 items-start select-none">
                                                <svg
                                                    className="w-4.5 h-4.5 text-primary shrink-0 mt-0.5"
                                                    viewBox="0 0 24 24"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    strokeWidth="2.5"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    aria-hidden="true"
                                                >
                                                    <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"></path>
                                                    <line x1="7" y1="7" x2="7.01" y2="7"></line>
                                                </svg>
                                                <p className="text-xs text-gray-600 leading-relaxed font-semibold">
                                                    {release.note}
                                                </p>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};
