"use client";

import { useEffect, useRef, useState } from "react";
import {
    Accordion,
    AccordionItem,
    AccordionTrigger,
    AccordionContent,
} from "@/components/ui/accordion";

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

    useEffect(() => {
        // Honour reduced-motion — skip the reveal animation
        const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        if (reduced) {
            setVisible(true);
            return;
        }

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
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
                "py-24 transition-all duration-700",
                visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8",
            ].join(" ")}
        >
            <div className="container-wide max-w-3xl space-y-12">

                {/* Header */}
                <div className="text-center space-y-4">
                    <p className="text-xs font-semibold tracking-widest uppercase text-gray-400">
                        Got questions?
                    </p>
                    <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-gray-900">
                        Frequently Asked Questions
                    </h2>
                    <p className="text-lg text-gray-500">
                        Common questions about ASCP.
                    </p>
                </div>

                {/* Accordion */}
                <Accordion className="rounded-2xl border border-gray-200 bg-white overflow-hidden divide-y divide-gray-100">
                    {FAQ_ITEMS.map((item, index) => (
                        <AccordionItem
                            key={item.question}
                            value={item.question}
                            className={index === FAQ_ITEMS.length - 1 ? "border-b-0" : ""}
                        >
                            <AccordionTrigger className="text-left text-base font-semibold text-gray-900 px-6 py-5 hover:bg-gray-50 transition-colors [&[data-state=open]]:text-primary">
                                {item.question}
                            </AccordionTrigger>
                            <AccordionContent className="px-6 pb-5">
                                <p className="text-sm text-gray-500 leading-relaxed">
                                    {item.answer}
                                </p>
                            </AccordionContent>
                        </AccordionItem>
                    ))}
                </Accordion>

            </div>
        </section>
    );
}
