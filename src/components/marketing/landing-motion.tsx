"use client";

import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const czk = new Intl.NumberFormat("cs-CZ", {
  style: "currency",
  currency: "CZK",
  maximumFractionDigits: 0,
});

/**
 * Orchestrates the landing page: a single load sequence for the hero, then
 * scroll-triggered reveals for everything below the fold. Mounted once, it
 * drives elements by data-attribute so the markup stays in server components.
 * Honours prefers-reduced-motion by leaving everything in its final state.
 */
export function LandingMotion() {
  useEffect(() => {
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    // Sticky-nav shadow — cheap, runs regardless of motion preference.
    const nav = document.querySelector<HTMLElement>(".lp-nav");
    const onScroll = () => {
      if (nav) nav.dataset.stuck = String(window.scrollY > 8);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    if (reduceMotion) {
      return () => window.removeEventListener("scroll", onScroll);
    }

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Hero load sequence. fromTo (not from) because the pre-hide CSS pins
      // these at opacity:0 — from would read that as the end state and never
      // reveal them.
      const heroBits = gsap.utils.toArray<HTMLElement>("[data-hero]");
      gsap.fromTo(
        heroBits,
        { y: 28, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          ease: "power3.out",
          stagger: 0.12,
          delay: 0.1,
        },
      );

      const card = document.querySelector<HTMLElement>("[data-hero-card]");
      if (card) {
        gsap.fromTo(
          card,
          { y: 40, opacity: 0, rotateX: 12, rotateZ: -4 },
          {
            y: 0,
            opacity: 1,
            rotateX: 0,
            rotateZ: 0,
            duration: 1.1,
            ease: "power3.out",
            delay: 0.35,
          },
        );
      }

      // Highlighter sweep under the hero keyword.
      const mark = document.querySelector<HTMLElement>(".lp-mark");
      if (mark) {
        gsap.fromTo(
          { v: 0 },
          { v: 0 },
          {
            v: 1,
            duration: 0.6,
            ease: "power2.out",
            delay: 0.85,
            onUpdate() {
              const v = (this.targets()[0] as { v: number }).v;
              mark.style.setProperty("--mark", String(v));
            },
          },
        );
      }

      // Hero amount counter.
      const amount = document.querySelector<HTMLElement>("[data-count]");
      if (amount) {
        const value = Number(amount.dataset.count || 0);
        const proxy = { v: 0 };
        gsap.to(proxy, {
          v: value,
          duration: 1.4,
          ease: "power2.out",
          delay: 0.5,
          onUpdate() {
            amount.textContent = czk.format(Math.round(proxy.v));
          },
        });
      }

      // Generic scroll reveals.
      gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((el) => {
        gsap.fromTo(
          el,
          { y: 32, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: el,
              start: "top 85%",
            },
          },
        );
      });

      // Staggered groups (steps, cards, quotes, prices).
      gsap.utils
        .toArray<HTMLElement>("[data-reveal-group]")
        .forEach((group) => {
          const items = group.children;
          gsap.fromTo(
            items,
            { y: 36, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.7,
              ease: "power3.out",
              stagger: 0.12,
              scrollTrigger: {
                trigger: group,
                start: "top 80%",
              },
            },
          );
        });
    });

    return () => {
      window.removeEventListener("scroll", onScroll);
      ctx.revert();
    };
  }, []);

  return null;
}
