import { useState } from "react";
import { cn } from "@/lib/utils";
import { StatusBadge } from "./StatusBadge";
import { API_BASE } from "@/lib/api/client";

interface DeviceCardProps {
    name: string;
    codename: string;
    maintainer: string;
    brand: string;
    active: boolean;
    imageUrl?: string;
    maintainerAvatar?: string;
    githubUsername?: string;
}

const BRAND_THEMES: Record<
    string,
    { bg: string; text: string; lightBg: string; accent: string }
> = {
    xiaomi: {
        bg: "bg-orange-50/40",
        text: "text-orange-600",
        lightBg: "from-orange-50 to-orange-100/30",
        accent: "text-orange-600/10",
    },
    google: {
        bg: "bg-blue-50/40",
        text: "text-blue-600",
        lightBg: "from-blue-50 to-blue-100/30",
        accent: "text-blue-600/10",
    },
    oneplus: {
        bg: "bg-zinc-100/50",
        text: "text-[#222222]",
        lightBg: "from-zinc-100 to-zinc-200/30",
        accent: "text-zinc-800/10",
    },
    realme: {
        bg: "bg-amber-50/40",
        text: "text-amber-600",
        lightBg: "from-amber-50 to-amber-100/30",
        accent: "text-amber-600/10",
    },
    nothing: {
        bg: "bg-slate-50/50",
        text: "text-slate-700",
        lightBg: "from-slate-50 to-slate-100/40",
        accent: "text-slate-600/10",
    },
    default: {
        bg: "bg-primary/5",
        text: "text-primary",
        lightBg: "from-primary/5 to-primary/10",
        accent: "text-primary/10",
    },
};

function getBrandTheme(brandName: string): { bg: string; text: string; lightBg: string; accent: string } {
    const key = brandName.toLowerCase();
    const theme = BRAND_THEMES[key] ?? BRAND_THEMES["default"];
    return theme!;
}

export function DeviceCard({
    name,
    codename,
    maintainer,
    brand,
    active,
    imageUrl,
    maintainerAvatar,
    githubUsername,
}: DeviceCardProps) {
    const theme = getBrandTheme(brand);
    const avatarUrl = maintainerAvatar || `https://github.com/${githubUsername || maintainer}.png`;

    const bannerUrl = `${API_BASE}/device/${codename}/banner/image.png`;
    const resolvedImageUrl = imageUrl || bannerUrl;
    const [imgError, setImgError] = useState(false);

    return (
        <a
            href={`/devices/${codename}`}
            className="block outline-none group h-full"
        >
            <div
                className={cn(
                    "flex flex-col h-full rounded-[24px] overflow-hidden transition-all duration-300 border-0 shadow-none",
                    "bg-[#f0f4f8] hover:bg-[#e4ebf3] hover:-translate-y-1",
                    "focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
                )}
            >
                {/* Image / Mockup area */}
                <div
                    className={cn(
                        "relative w-full h-56 flex items-center justify-center overflow-hidden transition-colors duration-300",
                        theme.bg
                    )}
                >

                    {resolvedImageUrl && !imgError ? (
                        <img
                            src={resolvedImageUrl}
                            alt={name}
                            className="h-[80%] w-auto object-contain drop-shadow-[0_12px_20px_rgba(0,0,0,0.10)] group-hover:scale-105 group-hover:-translate-y-1 transition-all duration-300 ease-out z-10"
                            loading="lazy"
                            onError={() => setImgError(true)}
                        />
                    ) : (
                        <div className="flex flex-col items-center justify-center gap-2 text-gray-300/80 z-10">
                            <svg
                                className="w-10 h-10 stroke-[1.5]"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                aria-hidden="true"
                            >
                                <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                                <circle cx="8.5" cy="8.5" r="1.5" />
                                <polyline points="21 15 16 10 5 21" />
                            </svg>
                            <span className="text-[9px] uppercase font-extrabold tracking-widest text-gray-400 select-none">
                                No Preview
                            </span>
                        </div>
                    )}

                    {brand && (
                        <span
                            className={cn(
                                "absolute top-3.5 right-3.5 text-[9px] font-extrabold tracking-wider px-2.5 py-0.5 rounded-full bg-white shadow-xs z-10 border-0",
                                theme.text
                            )}
                        >
                            {brand}
                        </span>
                    )}
                </div>

                <div className="p-5 flex-1 flex flex-col justify-between gap-4">
                    <div className="space-y-2">
                        {/* Codename Badge */}
                        <div className="flex items-center gap-2">
                            <code className="text-[11px] px-2.5 py-0.5 rounded-md font-mono font-bold bg-white text-gray-500 uppercase tracking-wider">
                                {codename}
                            </code>
                        </div>

                        {/* Device Name */}
                        <h3 className="font-bold text-lg text-gray-900 leading-snug line-clamp-2 group-hover:text-primary transition-colors duration-200">
                            {name}
                        </h3>
                    </div>

                    <div className="flex items-center justify-between gap-2 pt-0.5">
                        <div className="flex items-center gap-2 min-w-0">
                            <img
                                src={avatarUrl}
                                alt={maintainer}
                                onError={(e) => {
                                    e.currentTarget.src = `https://api.dicebear.com/7.x/initials/svg?seed=${maintainer}`;
                                }}
                                className="w-6 h-6 rounded-full bg-gray-100 object-cover shrink-0"
                                loading="lazy"
                            />
                            <span className="text-sm text-gray-600 font-semibold truncate">
                                {maintainer}
                            </span>
                        </div>

                        <StatusBadge status={active ? "Active" : "Inactive"} />
                    </div>
                </div>
            </div>
        </a>
    );
}


