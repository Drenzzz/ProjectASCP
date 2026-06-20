"use client";

import { useState, useMemo, useCallback } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { Device } from "@/lib/schema/device";
import { DeviceCard } from "./DeviceCard";
import { DeviceFilters } from "./DeviceFilters";
import { useDebounce } from "@/hooks/use-debounce";

interface DeviceListProps {
    initialDevices: Device[];
    initialQuery: string;
    initialBrand: string;
}

export function DeviceList({ initialDevices, initialQuery, initialBrand }: DeviceListProps) {
    const [query, setQuery] = useState(initialQuery);
    const [activeBrand, setActiveBrand] = useState(initialBrand);
    const [isRetrying, setIsRetrying] = useState(false);

    const debouncedQuery = useDebounce(query, 300);

    const updateUrl = useCallback((newQuery: string, newBrand: string) => {
        if (typeof window === "undefined") return;
        const params = new URLSearchParams();
        if (newQuery) params.set("q", newQuery);
        if (newBrand && newBrand !== "All") params.set("brand", newBrand);
        const queryString = params.toString();
        const newUrl = queryString
            ? `${window.location.pathname}?${queryString}`
            : window.location.pathname;
        window.history.replaceState({}, "", newUrl);
    }, []);

    const handleQueryChange = (value: string) => {
        setQuery(value);
        updateUrl(value, activeBrand);
    };

    const handleBrandChange = (brand: string) => {
        setActiveBrand(brand);
        updateUrl(query, brand);
    };

    const handleClearSearch = () => {
        setQuery("");
        setActiveBrand("All");
        if (typeof window !== "undefined") {
            window.history.replaceState({}, "", window.location.pathname);
        }
    };

    const handleRetry = () => {
        setIsRetrying(true);
        if (typeof window !== "undefined") {
            window.location.reload();
        }
    };

    const brands = useMemo(() => {
        const uniqueBrands = new Set(initialDevices.map((d) => d.brand).filter(Boolean));
        return ["All", ...Array.from(uniqueBrands).sort()];
    }, [initialDevices]);

    const filteredDevices = useMemo(() => {
        const searchContent = debouncedQuery.toLowerCase();
        return initialDevices.filter((device) => {
            const matchesBrand = activeBrand === "All" || device.brand === activeBrand;
            const matchesSearch =
                device.name.toLowerCase().includes(searchContent) ||
                device.codename.toLowerCase().includes(searchContent) ||
                device.maintainer.toLowerCase().includes(searchContent);
            return matchesBrand && matchesSearch;
        });
    }, [initialDevices, activeBrand, debouncedQuery]);

    if (initialDevices.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-24 text-center space-y-6">
                <div className="p-4 rounded-2xl bg-gray-100">
                    <svg
                        className="h-10 w-10 text-gray-400"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        aria-hidden="true"
                    >
                        <path d="m2 2 20 20"></path>
                        <path d="M16.72 11.06A10.94 10.94 0 0 1 19 12.55"></path>
                        <path d="M5 12.55a10.94 10.94 0 0 1 5.17-2.39"></path>
                        <path d="M10.71 5.05A16 16 0 0 1 22.58 9"></path>
                        <path d="M1.42 9a15.91 15.91 0 0 1 4.7-2.88"></path>
                        <path d="M8.53 16.11a6 6 0 0 1 6.95 0"></path>
                        <line x1="12" y1="20" x2="12.01" y2="20"></line>
                    </svg>
                </div>
                <div className="space-y-2 max-w-md mx-auto px-4">
                    <h3 className="text-xl font-bold text-gray-900">Unable to load devices</h3>
                    <p className="text-gray-500">
                        We couldn&apos;t fetch the device list from the server. Check your
                        connection or try again later.
                    </p>
                </div>
                <Button
                    onClick={handleRetry}
                    disabled={isRetrying}
                    size="lg"
                    className="rounded-xl font-bold"
                >
                    <svg
                        className={cn("mr-2 h-4 w-4", isRetrying && "animate-spin")}
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        aria-hidden="true"
                    >
                        <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"></path>
                        <path d="M3 3v5h5"></path>
                    </svg>
                    {isRetrying ? "Retrying..." : "Retry Connection"}
                </Button>
            </div>
        );
    }

    return (
        <div className="space-y-8">
            <div className="space-y-6">
                <div className="relative max-w-md mx-auto">
                    <svg
                        className="absolute left-4.5 top-1/2 h-4.5 w-4.5 -translate-y-1/2 text-gray-400 pointer-events-none"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-hidden="true"
                    >
                        <circle cx="11" cy="11" r="8"></circle>
                        <path d="m21 21-4.3-4.3"></path>
                    </svg>
                    <Input
                        type="search"
                        placeholder="Search device, codename, or maintainer..."
                        value={query}
                        onChange={(e) => handleQueryChange(e.target.value)}
                        className="pl-12 h-12 rounded-full bg-gray-100/70 hover:bg-gray-100 border-0 focus-visible:bg-white focus-visible:ring-4 focus-visible:ring-primary/10 shadow-xs focus-visible:shadow-md transition-all placeholder:text-gray-400 text-sm outline-none"
                    />
                </div>

                <DeviceFilters
                    brands={brands}
                    activeBrand={activeBrand}
                    onSelectBrand={handleBrandChange}
                />
            </div>

            <div className="min-h-[300px]">
                {filteredDevices.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-20 text-center space-y-4">
                        <div className="p-4 rounded-2xl bg-gray-100">
                            <svg
                                className="h-8 w-8 text-gray-400"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                stroke-width="1.5"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                aria-hidden="true"
                            >
                                <circle cx="11" cy="11" r="8"></circle>
                                <path d="m21 21-4.3-4.3"></path>
                            </svg>
                        </div>
                        <div className="space-y-1">
                            <p className="text-lg font-medium text-gray-900">No devices found</p>
                            <p className="text-gray-500">
                                Try adjusting your search or filter criteria.
                            </p>
                        </div>
                        <Button
                            variant="outline"
                            onClick={handleClearSearch}
                            className="mt-4 rounded-xl"
                        >
                            Clear Search
                        </Button>
                    </div>
                ) : (
                    <div key={activeBrand} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredDevices.map((device, index) => (
                            <div
                                key={device.codename}
                                className="animate-fade-in-up"
                                style={{
                                    animationDelay: `${index * 40}ms`,
                                }}
                            >
                                <DeviceCard
                                    name={device.name}
                                    codename={device.codename}
                                    maintainer={device.maintainer}
                                    maintainerAvatar={device.maintainerAvatar}
                                    githubUsername={device.githubUsername}
                                    brand={device.brand}
                                    active={device.active}
                                    imageUrl={device.imageUrl}
                                />
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
