"use client";

import { useState } from "react";
import { Menu, X, Download } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface NavLink {
    href: string;
    label: string;
}

const NAV_LINKS: NavLink[] = [
    { href: "/", label: "Home" },
    { href: "/changelog", label: "Changelog" },
    { href: "/about", label: "About" },
];

function GitHubIcon({ className }: { className?: string }) {
    return (
        <svg
            className={className}
            viewBox="0 0 24 24"
            fill="currentColor"
            aria-hidden="true"
        >
            <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.4 3-.405 1.02.005 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
        </svg>
    );
}

interface MobileMenuProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    links: NavLink[];
}

function MobileMenu({ open, onOpenChange, links }: MobileMenuProps) {
    return (
        <div
            className={cn(
                "fixed inset-0 z-40 bg-background/95 backdrop-blur-xl transition-opacity duration-300 md:hidden",
                open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none",
            )}
            aria-hidden={!open}
        >
            <div className="flex h-full flex-col items-center justify-center gap-8">
                <nav className="flex flex-col items-center gap-6">
                    {links.map((link, index) => (
                        <a
                            key={link.href}
                            href={link.href}
                            onClick={() => onOpenChange(false)}
                            className={cn(
                                "text-2xl font-semibold text-muted-foreground transition-all duration-300 hover:text-foreground",
                                open ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0",
                            )}
                            style={{ transitionDelay: open ? `${index * 60}ms` : "0ms" }}
                        >
                            {link.label}
                        </a>
                    ))}
                </nav>
                <a
                    href="/devices"
                    onClick={() => onOpenChange(false)}
                    className={buttonVariants({ size: "lg", className: "rounded-full px-8 font-bold" })}
                >
                    <Download className="mr-2 h-4 w-4" />
                    Download
                </a>
            </div>
        </div>
    );
}

export function Navbar() {
    const [open, setOpen] = useState(false);

    return (
        <>
            <div className="fixed top-0 left-0 right-0 z-50 flex justify-center px-4 pt-4">
                <header className="relative flex w-full max-w-6xl items-center justify-between rounded-full border border-white/10 bg-background/80 px-6 py-3 shadow-lg shadow-black/10 backdrop-blur-xl">
                    <a
                        href="/"
                        className="flex items-center gap-2 font-bold text-lg tracking-tighter"
                    >
                        <span className="text-lg">
                            PROJECT <span className="text-primary">ASCP</span>
                        </span>
                    </a>

                    <nav className="hidden md:flex items-center gap-6">
                        {NAV_LINKS.map((link) => (
                            <a
                                key={link.href}
                                href={link.href}
                                className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
                            >
                                {link.label}
                            </a>
                        ))}
                    </nav>

                    <div className="hidden md:flex items-center gap-2">
                        <a
                            href="https://github.com/Pixelify-AOSP"
                            target="_blank"
                            rel="noreferrer"
                            aria-label="GitHub"
                            className={buttonVariants({ variant: "ghost", size: "icon-sm", className: "rounded-full" })}
                        >
                            <GitHubIcon className="h-4 w-4" />
                        </a>
                        <a
                            href="/devices"
                            className={buttonVariants({ size: "sm", className: "rounded-full font-bold shadow-lg shadow-primary/20" })}
                        >
                            <Download className="mr-2 h-4 w-4" />
                            Download
                        </a>
                    </div>

                    <Button
                        type="button"
                        variant="ghost"
                        size="icon-sm"
                        onClick={() => setOpen((prev) => !prev)}
                        className="relative z-50 rounded-full md:hidden"
                        aria-label={open ? "Close menu" : "Open menu"}
                        aria-expanded={open}
                    >
                        {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                    </Button>
                </header>
            </div>

            <MobileMenu open={open} onOpenChange={setOpen} links={NAV_LINKS} />
        </>
    );
}
