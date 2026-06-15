import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface StatusBadgeProps {
    status: "Active" | "Inactive";
    className?: string;
}

const STATUS_STYLES: Record<StatusBadgeProps["status"], string> = {
    Active:
        "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20",
    Inactive:
        "bg-orange-500/10 text-orange-600 dark:text-orange-400 border-orange-500/20",
};

export function StatusBadge({ status, className }: StatusBadgeProps) {
    return (
        <Badge
            variant="outline"
            className={cn(
                "font-mono font-medium border px-2.5 py-0.5",
                STATUS_STYLES[status],
                className,
            )}
        >
            {status}
        </Badge>
    );
}
