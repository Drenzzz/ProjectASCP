"use client";

import { FileText, HardDrive, Wifi, List } from "lucide-react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { DownloadTabContent } from "./DownloadTabContent";
import type { BuildEntry } from "@/lib/schema/updater";

interface DeviceTabsProps {
    instructionsHtml: string;
    changelogHtml: string;
    fullBuild: BuildEntry | null;
    incrementalBuild: BuildEntry | null;
}

export function DeviceTabs({
    instructionsHtml,
    changelogHtml,
    fullBuild,
    incrementalBuild,
}: DeviceTabsProps) {
    const hasIncremental = Boolean(incrementalBuild);

    return (
        <Tabs defaultValue="instructions" className="w-full space-y-6">
            <div className="flex p-1 bg-secondary/30 backdrop-blur-md rounded-2xl border border-white/5 w-fit mx-auto lg:mx-0">
                <TabsList>
                    <TabsTrigger value="instructions">
                        <FileText className="h-4 w-4" />
                        <span>Installation Guide</span>
                    </TabsTrigger>
                    <TabsTrigger value="changelog">
                        <HardDrive className="h-4 w-4" />
                        <span>Changelog</span>
                    </TabsTrigger>
                    <TabsTrigger value="download" disabled={!hasIncremental}>
                        <Wifi className="h-4 w-4" />
                        <span>OTA Update</span>
                    </TabsTrigger>
                </TabsList>
            </div>

            <TabsContent value="instructions">
                {instructionsHtml ? (
                    <div
                        className="relative min-h-[200px] overflow-hidden rounded-3xl bg-secondary/10 border border-white/5 backdrop-blur-sm p-6 md:p-8"
                    >
                        <div
                            className="prose max-w-none"
                            dangerouslySetInnerHTML={{ __html: instructionsHtml }}
                        />
                    </div>
                ) : (
                    <EmptyContent message="No installation guide available." />
                )}
            </TabsContent>

            <TabsContent value="changelog">
                {changelogHtml ? (
                    <div
                        className="relative min-h-[200px] overflow-hidden rounded-3xl bg-secondary/10 border border-white/5 backdrop-blur-sm p-6 md:p-8"
                    >
                        <div
                            className="prose max-w-none"
                            dangerouslySetInnerHTML={{ __html: changelogHtml }}
                        />
                    </div>
                ) : (
                    <EmptyContent message="No changelog available." />
                )}
            </TabsContent>

            <TabsContent value="download">
                <div className="relative min-h-[200px] overflow-hidden rounded-3xl bg-secondary/10 border border-white/5 backdrop-blur-sm p-6 md:p-8">
                    <DownloadTabContent build={incrementalBuild} buildType="incremental" />
                </div>
            </TabsContent>
        </Tabs>
    );
}

function EmptyContent({ message }: { message: string }) {
    return (
        <div className="relative min-h-[200px] overflow-hidden rounded-3xl bg-secondary/10 border border-white/5 backdrop-blur-sm flex flex-col items-center justify-center py-12 text-muted-foreground">
            <List className="h-10 w-10 mb-4 opacity-20" />
            <p>{message}</p>
        </div>
    );
}
