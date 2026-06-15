import { cn } from "@/lib/utils";

interface DeviceFiltersProps {
    brands: string[];
    activeBrand: string;
    onSelectBrand: (brand: string) => void;
}

export function DeviceFilters({ brands, activeBrand, onSelectBrand }: DeviceFiltersProps) {
    return (
        <div className="w-full overflow-x-auto no-scrollbar pb-4 -mx-4 px-4 md:mx-0 md:px-0 md:pb-0">
            <div className="flex gap-2 min-w-max md:flex-wrap md:justify-center p-1.5 bg-white/[0.03] backdrop-blur-sm rounded-full border border-white/10 w-fit mx-auto">
                {brands.map((brand) => {
                    const isActive = activeBrand === brand;
                    return (
                        <button
                            key={brand}
                            type="button"
                            onClick={() => onSelectBrand(brand)}
                            className={cn(
                                "relative px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 outline-none focus-visible:ring-2 focus-visible:ring-primary",
                                isActive
                                    ? "text-primary-foreground bg-primary shadow-lg shadow-primary/25"
                                    : "text-muted-foreground hover:text-foreground hover:bg-white/5",
                            )}
                        >
                            {brand}
                        </button>
                    );
                })}
            </div>
        </div>
    );
}
