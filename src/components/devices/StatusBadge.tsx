import { cn } from "@/lib/utils";

interface StatusBadgeProps {
    status: "Active" | "Inactive";
    className?: string;
}

const STATUS_STYLES: Record<StatusBadgeProps["status"], string> = {
    Active:
        "bg-emerald-600 text-white shadow-xs",
    Inactive:
        "bg-gray-100 text-gray-500",
};

export function StatusBadge({ status, className }: StatusBadgeProps) {
    return (
        <span
            className={cn(
                "inline-flex items-center gap-1.5 h-5.5 w-fit shrink-0 px-2.5 py-0.5 text-xs font-bold rounded-full select-none",
                STATUS_STYLES[status],
                className,
            )}
        >
            {status}
        </span>
    );
}


