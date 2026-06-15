import { cn } from "@/lib/utils";
import { StatusBadge } from "./StatusBadge";

interface DeviceCardProps {
    name: string;
    codename: string;
    maintainer: string;
    brand: string;
    active: boolean;
    imageUrl?: string;
}

export function DeviceCard({
    name,
    codename,
    maintainer,
    brand,
    active,
    imageUrl,
}: DeviceCardProps) {
    return (
        <a
            href={`/devices/${codename}`}
            className="block outline-none group"
        >
            <div
                className={cn(
                    "flex items-center gap-5 p-5 rounded-2xl transition-all duration-300",
                    "bg-gradient-to-r from-white/[0.06] to-white/[0.02]",
                    "border border-white/10",
                    "hover:border-primary/40 hover:shadow-[0_0_30px_-10px] hover:shadow-primary/20",
                    "focus-visible:ring-2 focus-visible:ring-primary/50",
                )}
            >
                <div className="shrink-0 w-28 h-28 flex items-center justify-center">
                    {imageUrl ? (
                        <img
                            src={imageUrl}
                            alt={name}
                            width={100}
                            height={100}
                            className="object-contain group-hover:scale-110 transition-transform duration-300"
                        />
                    ) : (
                        <svg
                            className="h-10 w-10 text-muted-foreground/30"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            aria-hidden="true"
                        >
                            <rect width="14" height="20" x="5" y="2" rx="2" ry="2"></rect>
                            <path d="M12 18h.01"></path>
                        </svg>
                    )}
                </div>

                <div className="flex-1 min-w-0 space-y-1.5 overflow-hidden">
                    <div className="flex items-start justify-between gap-3">
                        <h3 className="flex-1 min-w-0 font-semibold text-base leading-tight truncate group-hover:text-primary transition-colors duration-300">
                            {name}
                        </h3>
                        {brand && (
                            <span className="shrink-0 text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-primary/20 text-primary border border-primary/30">
                                {brand}
                            </span>
                        )}
                    </div>
                    <p className="text-sm text-primary/70 font-mono">{codename}</p>
                    <p className="text-sm text-muted-foreground truncate">{maintainer}</p>
                    <div className="pt-1">
                        <StatusBadge status={active ? "Active" : "Inactive"} />
                    </div>
                </div>
            </div>
        </a>
    );
}
