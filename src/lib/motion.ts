/**
 * ASCP Motion System
 * Progressive enhancement — content works without JS/animations.
 * All effects gated behind prefersReducedMotion check.
 */

export function prefersReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/**
 * Safe GSAP fromTo wrapper — skips animation if reduced-motion,
 * immediately sets final state instead.
 */
export async function safeFromTo(
  target: gsap.TweenTarget,
  fromVars: gsap.TweenVars,
  toVars: gsap.TweenVars,
): Promise<gsap.core.Tween | gsap.core.Timeline> {
  const { gsap } = await import("gsap");
  if (prefersReducedMotion()) {
    const { scrollTrigger, onComplete, delay, ...finalVars } = toVars as gsap.TweenVars & {
      scrollTrigger?: unknown;
    };
    return gsap.set(target, { ...finalVars, opacity: 1, y: 0, x: 0, scale: 1 });
  }
  return gsap.fromTo(target, fromVars, toVars);
}

/**
 * Count-up animation for a single element.
 * Reads data-count-target (number) and data-count-suffix.
 * Reduced-motion: sets final value immediately.
 */
export async function countUp(el: HTMLElement): Promise<void> {
  const target = parseFloat(el.dataset.countTarget ?? "0");
  const suffix = el.dataset.countSuffix ?? "";
  const decimals = el.dataset.countDecimals ? parseInt(el.dataset.countDecimals) : 0;

  if (prefersReducedMotion()) {
    el.textContent = formatCount(target, decimals) + suffix;
    return;
  }

  const { gsap } = await import("gsap");
  const obj = { val: 0 };
  gsap.to(obj, {
    val: target,
    duration: 2,
    ease: "power2.out",
    onUpdate() {
      el.textContent = formatCount(obj.val, decimals) + suffix;
    },
    onComplete() {
      el.textContent = formatCount(target, decimals) + suffix;
    },
  });
}

function formatCount(val: number, decimals: number): string {
  if (decimals === 0) {
    return new Intl.NumberFormat("en-US").format(Math.floor(val));
  }
  return val.toFixed(decimals);
}

/**
 * Scroll reveal observer.
 * Looks for [data-reveal] and [data-reveal-stagger] elements.
 * Reduced-motion: immediately makes everything visible.
 *
 * Usage:
 *   <div data-reveal>...</div>
 *   <div data-reveal-stagger="0.1">...children get staggered...</div>
 *   <div data-reveal data-reveal-delay="0.2">...</div>
 */
export async function registerRevealObserver(): Promise<void> {
  const reduced = prefersReducedMotion();

  // Collect all reveal targets
  const revealEls = Array.from(
    document.querySelectorAll<HTMLElement>("[data-reveal], [data-reveal-stagger]"),
  );

  if (reduced) {
    // Skip animation — just make everything visible
    revealEls.forEach((el) => {
      el.style.opacity = "1";
      el.style.transform = "none";
      const staggerChildren = el.querySelectorAll<HTMLElement>("[data-reveal-child]");
      staggerChildren.forEach((child) => {
        child.style.opacity = "1";
        child.style.transform = "none";
      });
    });
    return;
  }

  const { gsap } = await import("gsap");
  const { ScrollTrigger } = await import("gsap/ScrollTrigger");
  gsap.registerPlugin(ScrollTrigger);

  revealEls.forEach((el) => {
    const delay = parseFloat(el.dataset.revealDelay ?? "0");
    const isStagger = el.hasAttribute("data-reveal-stagger");
    const staggerVal = parseFloat(el.dataset.revealStagger ?? "0.1");

    if (isStagger) {
      const children = Array.from(el.querySelectorAll<HTMLElement>("[data-reveal-child]"));
      if (children.length === 0) return;

      // Set initial state
      gsap.set(children, { opacity: 0, y: 24 });

      ScrollTrigger.create({
        trigger: el,
        start: "top 85%",
        once: true,
        onEnter() {
          gsap.to(children, {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: "power3.out",
            stagger: staggerVal,
          });
        },
      });
    } else {
      gsap.set(el, { opacity: 0, y: 28 });

      ScrollTrigger.create({
        trigger: el,
        start: "top 88%",
        once: true,
        onEnter() {
          gsap.to(el, {
            opacity: 1,
            y: 0,
            duration: 0.65,
            ease: "power3.out",
            delay,
          });
        },
      });
    }
  });

  // Count-up: triggered by scroll
  const countEls = Array.from(document.querySelectorAll<HTMLElement>("[data-count-target]"));
  countEls.forEach((el) => {
    ScrollTrigger.create({
      trigger: el,
      start: "top 85%",
      once: true,
      onEnter() {
        countUp(el);
      },
    });
  });
}

/**
 * Initialize Lenis smooth scroll.
 * Skipped entirely if reduced-motion.
 */
export async function initLenis(): Promise<void> {
  if (prefersReducedMotion()) return;

  const { default: Lenis } = await import("lenis");
  const { gsap } = await import("gsap");
  const { ScrollTrigger } = await import("gsap/ScrollTrigger");
  gsap.registerPlugin(ScrollTrigger);

  const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  });

  lenis.on("scroll", ScrollTrigger.update);

  gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
  });
  gsap.ticker.lagSmoothing(0);
}
