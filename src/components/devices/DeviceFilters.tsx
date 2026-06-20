import { cn } from "@/lib/utils";

interface DeviceFiltersProps {
    brands: string[];
    activeBrand: string;
    onSelectBrand: (brand: string) => void;
}

function getBrandBgClass(brand: string) {
    const key = brand.toLowerCase();
    if (key === "all") return "bg-emerald-600 hover:bg-emerald-700";
    if (key === "xiaomi") return "bg-orange-600 hover:bg-orange-700";
    if (key === "nothing") return "bg-black hover:bg-zinc-900";
    if (key === "oneplus") return "bg-[#222222] hover:bg-[#333333]";
    if (key === "realme") return "bg-amber-500 hover:bg-amber-600";
    if (key === "google" || key === "samsung") return "bg-blue-600 hover:bg-blue-700";
    return "bg-emerald-600 hover:bg-emerald-700";
}

export function DeviceFilters({ brands, activeBrand, onSelectBrand }: DeviceFiltersProps) {
    return (
        <div className="flex flex-wrap justify-center gap-2.5">
            {brands.map((brand) => {
                const isActive = activeBrand === brand;
                return (
                    <button
                        key={brand}
                        type="button"
                        onClick={() => onSelectBrand(brand)}
                        className={cn(
                            "px-4.5 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 outline-none border-0",
                            "flex items-center justify-center cursor-pointer select-none",
                            "focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
                            isActive
                                ? cn("text-white shadow-sm", getBrandBgClass(brand))
                                : "bg-gray-100 text-gray-600 hover:bg-gray-200/80 hover:text-gray-900",
                        )}
                    >
                        {isActive && (
                            <svg
                                className="w-3 h-3 mr-1.5 shrink-0 text-white animate-[scaleIn_0.15s_ease-out]"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="3.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                aria-hidden="true"
                            >
                                <polyline points="20 6 9 17 4 12" />
                            </svg>
                        )}
                        {brand}
                    </button>
                );
            })}
        </div>
    );
}


