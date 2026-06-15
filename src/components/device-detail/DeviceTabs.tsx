"use client";

import { FileText, HardDrive, List } from "lucide-react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

interface DeviceTabsProps {
    instructionsHtml: string;
    changelogHtml: string;
}

interface TabEntry {
    value: string;
    label: string;
    icon: typeof FileText;
    content: string;
}

export function DeviceTabs({ instructionsHtml, changelogHtml }: DeviceTabsProps) {
    const tabs: TabEntry[] = [
        { value: "instructions", label: "Installation Guide", icon: FileText, content: instructionsHtml },
        { value: "changelog", label: "Changelog", icon: HardDrive, content: changelogHtml },
    ];

    return (
        <Tabs defaultValue="instructions" className="w-full space-y-6">
            <div className="flex p-1 bg-secondary/30 backdrop-blur-md rounded-2xl border border-white/5 w-fit mx-auto lg:mx-0">
                <TabsList>
                    {tabs.map((tab) => (
                        <TabsTrigger key={tab.value} value={tab.value}>
                            <tab.icon className="h-4 w-4" />
                            <span>{tab.label}</span>
                        </TabsTrigger>
                    ))}
                </TabsList>
            </div>

            {tabs.map((tab) => (
                <TabsContent key={tab.value} value={tab.value}>
                    {tab.content ? (
                        <div className="relative min-h-[200px] overflow-hidden rounded-3xl bg-secondary/10 border border-white/5 backdrop-blur-sm p-6 md:p-8">
                            <div
                                className="prose max-w-none"
                                dangerouslySetInnerHTML={{ __html: tab.content }}
                            />
                        </div>
                    ) : (
                        <div className="relative min-h-[200px] overflow-hidden rounded-3xl bg-secondary/10 border border-white/5 backdrop-blur-sm flex flex-col items-center justify-center py-12 text-muted-foreground">
                            <List className="h-10 w-10 mb-4 opacity-20" />
                            <p>No content available for this section.</p>
                        </div>
                    )}
                </TabsContent>
            ))}
        </Tabs>
    );
}
