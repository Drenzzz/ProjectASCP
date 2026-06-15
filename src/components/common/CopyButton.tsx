"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { copyToClipboard } from "@/lib/utils";

interface CopyButtonProps {
    value: string;
    className?: string;
}

export function CopyButton({ value, className }: CopyButtonProps) {
    const [hasCopied, setHasCopied] = useState(false);

    const onCopy = async () => {
        const success = await copyToClipboard(value);
        if (success) {
            setHasCopied(true);
            setTimeout(() => setHasCopied(false), 2000);
        }
    };

    return (
        <Button
            size="icon"
            variant="ghost"
            className={className}
            onClick={onCopy}
            title={hasCopied ? "Copied" : "Copy"}
            aria-label={hasCopied ? "Copied" : "Copy"}
        >
            {hasCopied ? (
                <Check className="h-3 w-3 text-emerald-500" />
            ) : (
                <Copy className="h-3 w-3 text-muted-foreground" />
            )}
            <span className="sr-only">{hasCopied ? "Copied" : "Copy"}</span>
        </Button>
    );
}
