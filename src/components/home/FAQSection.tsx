"use client";

import { useEffect, useRef, useState } from "react";

const FAQ_ITEMS = [
    {
        question: "What devices are supported?",
        answer:
            "ASCP supports a range of devices across multiple brands. Head to the Devices page for the full list — each entry includes build status and maintainer info.",
    },
    {
        question: "How does ASCP affect battery life?",
        answer:
            "Battery life depends on your kernel, usage patterns, and what's running in the background. Most users report performance on par with or better than stock — but your mileage may vary depending on the device and maintainer's kernel choices.",
    },
    {
        question: "Is ASCP safe to use?",
        answer:
            "ASCP ships with additional privacy toggles and merges upstream security patches within 24 hours of release. It passes SafetyNet and Play Integrity checks out of the box. Spoofing options are also available in Settings if needed.",
    },
    {
        question: "How do I install ASCP?",
        answer:
            "Download the build for your device from the Devices page, boot into a custom recovery (e.g. TWRP or OrangeFox), and flash the zip. Detailed step-by-step instructions are on each device's page.",
    },
];

export function FAQSection() {
    const sectionRef = useRef<HTMLElement>(null);
    const [visible, setVisible] = useState(false);
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    useEffect(() => {
        // Honour reduced-motion — skip the reveal animation
        const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        if (reduced) {
            setVisible(true);
            return;
        }

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry?.isIntersecting) {
                    setVisible(true);
                    observer.disconnect();
                }
            },
            { threshold: 0.1 },
        );

        if (sectionRef.current) observer.observe(sectionRef.current);
        return () => observer.disconnect();
    }, []);

    return (
        <section
            ref={sectionRef}
            className={[
                "py-24 transition-all duration-700 bg-white border-0",
                visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8",
            ].join(" ")}
        >
            <div className="container-wide max-w-3xl space-y-12 mx-auto">

                {/* Header */}
                <div className="text-center space-y-3">
                    <span className="inline-flex items-center px-4 py-1.5 rounded-full text-xs font-extrabold bg-primary text-white tracking-wider uppercase select-none border-0 mb-2">
                        Got questions?
                    </span>
                    <h2 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tight leading-none">
                        Frequently Asked Questions
                    </h2>
                    <p className="text-base text-gray-500 font-bold pt-1">
                        Common questions about ASCP.
                    </p>
                </div>

                {/* Accordion List */}
                <div className="space-y-4">
                    {FAQ_ITEMS.map((item, index) => {
                        const isOpen = openIndex === index;
                        return (
                            <div
                                key={index}
                                className="bento-card rounded-[28px] bg-[#f0f4f8] hover:bg-[#e4ebf3] transition-all duration-300 overflow-hidden border-0 shadow-none relative"
                            >
                                <button
                                    type="button"
                                    onClick={() => setOpenIndex(isOpen ? null : index)}
                                    className="w-full flex items-center justify-between p-6 text-left cursor-pointer select-none bg-transparent hover:bg-black/[0.01] transition-all duration-300 border-0 outline-none"
                                    aria-expanded={isOpen}
                                >
                                    <span className="text-lg font-black text-gray-900 tracking-tight pr-6">
                                        {item.question}
                                    </span>
                                    <div
                                        className="shrink-0 w-10 h-10 rounded-full bg-white flex items-center justify-center text-gray-600 shadow-xs border-0 transition-transform duration-300"
                                        style={{ transform: isOpen ? "rotate(180deg)" : "rotate(0deg)" }}
                                    >
                                        <svg
                                            className="w-4 h-4 stroke-[2.5]"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        >
                                            <polyline points="6 9 12 15 18 9" />
                                        </svg>
                                    </div>
                                </button>
                                <div
                                    className={`grid transition-all duration-300 ease-in-out ${
                                        isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                                    }`}
                                >
                                    <div className="overflow-hidden">
                                        <div className="px-6 pb-6 text-sm font-semibold text-gray-600 leading-relaxed">
                                            {item.answer}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>

            </div>
        </section>
    );
}
