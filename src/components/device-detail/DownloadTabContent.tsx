import { Download, Calendar, HardDrive, File } from "lucide-react";
import type { BuildEntry } from "@/lib/schema/updater";

interface DownloadTabContentProps {
    build: BuildEntry | null;
    buildType: "full" | "incremental";
}

export function DownloadTabContent({ build, buildType }: DownloadTabContentProps) {
    if (!build) {
        return (
            <div className="flex flex-col items-center justify-center py-16 text-muted-foreground">
                <HardDrive className="h-10 w-10 mb-4 opacity-20" />
                <p className="text-sm">
                    {buildType === "incremental"
                        ? "No OTA update available for this device."
                        : "No build available yet."}
                </p>
            </div>
        );
    }

    const items = [
        { icon: HardDrive, label: "Version", value: build.version },
        { icon: Calendar, label: "Built", value: build.builtDate },
        { icon: File, label: "Size", value: build.sizeFormatted },
    ];

    return (
        <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {items.map((item) => (
                    <div
                        key={item.label}
                        className="flex items-center gap-3 p-4 rounded-2xl bg-white/[0.04] border border-white/5"
                    >
                        <div className="h-10 w-10 rounded-xl bg-white/5 flex items-center justify-center shrink-0">
                            <item.icon className="h-4 w-4 text-muted-foreground" />
                        </div>
                        <div className="min-w-0">
                            <p className="text-[10px] uppercase tracking-wider text-muted-foreground font-bold">
                                {item.label}
                            </p>
                            <p className="text-sm font-semibold truncate">{item.value}</p>
                        </div>
                    </div>
                ))}
            </div>

            <div className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.03] border border-white/5 font-mono text-xs text-muted-foreground truncate">
                <span className="shrink-0 text-[10px] uppercase font-bold text-primary/60">File</span>
                <span className="truncate">{build.filename}</span>
            </div>

            <a
                href={build.downloadUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 h-11 px-6 rounded-full bg-primary text-primary-foreground font-semibold text-sm hover:bg-primary/90 transition-colors"
            >
                <Download className="h-4 w-4" />
                Download {buildType === "incremental" ? "OTA" : "Full"} Build
            </a>
        </div>
    );
}
