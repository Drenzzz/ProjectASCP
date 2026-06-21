"use client";

import { useState } from "react";
import { Menu, X, Download } from "lucide-react";
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

interface MobileMenuProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    links: NavLink[];
}

function MobileMenu({ open, onOpenChange, links }: MobileMenuProps) {
    return (
        <div
            className={cn(
                "fixed inset-0 z-40 bg-white transition-opacity duration-300 md:hidden",
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
                                "text-3xl font-semibold text-gray-500 transition-all duration-300 hover:text-gray-900 hover:scale-108 active:scale-95 origin-center inline-block",
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
                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-8 py-3.5 text-xl font-bold text-white transition-colors hover:bg-primary/90 mt-4"
                >
                    <Download className="h-5 w-5" />
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
            <header className="sticky top-0 z-50 w-full bg-primary transition-all duration-300">
                <div className="container-wide h-16 md:h-20 flex items-center justify-between">
                    <a
                        href="/"
                        className="flex items-center gap-2 group transition-transform duration-200 active:scale-95"
                    >
                        <img
                            src="/logo/ASCP-nobg.png"
                            alt="ASCP"
                            width="32"
                            height="32"
                            className="h-8 w-8 transition-transform duration-300 group-hover:rotate-12"
                        />
                        <span className="font-bold text-xl text-white tracking-tight">
                            ASCP
                        </span>
                    </a>

                    <div className="hidden md:flex items-center gap-8">
                        <nav className="flex items-center gap-6">
                            {NAV_LINKS.map((link) => (
                                <a
                                    key={link.href}
                                    href={link.href}
                                    className="text-base font-medium text-white/70 transition-all duration-200 hover:text-white hover:scale-108 active:scale-95 origin-center inline-block"
                                >
                                    {link.label}
                                </a>
                            ))}
                        </nav>

                        <a
                            href="/devices"
                            className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-6 py-2.5 text-base font-bold text-primary transition-all duration-200 hover:bg-white/90 hover:scale-[1.03] active:scale-95 group"
                        >
                            <Download className="h-5 w-5 transition-transform duration-200 group-hover:translate-y-0.5" />
                            Download
                        </a>
                    </div>

                    <button
                        type="button"
                        onClick={() => setOpen((prev) => !prev)}
                        className="relative z-50 p-2 text-white md:hidden active:scale-90 transition-transform duration-200"
                        aria-label={open ? "Close menu" : "Open menu"}
                        aria-expanded={open}
                    >
                        {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                    </button>
                </div>
            </header>

            <MobileMenu open={open} onOpenChange={setOpen} links={NAV_LINKS} />
        </>
    );
}
