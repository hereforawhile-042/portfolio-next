"use client";

import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function useScrollAnimations() {
  useEffect(() => {
    // Wait for DOM to be ready
    const ctx = gsap.context(() => {
      // Animate skill cards on scroll
      const skillCards = document.querySelectorAll(".skill-card");
      if (skillCards.length > 0) {
        gsap.fromTo(
          skillCards,
          {
            opacity: 0,
            y: 50,
            scale: 0.9,
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.6,
            ease: "back.out(1.7)",
            stagger: 0.05,
            scrollTrigger: {
              trigger: skillCards[0], // Trigger when the first card comes into view
              start: "top bottom-=100",
              toggleActions: "play none none reverse", // Allow re-playing
            },
          }
        );
      }

      // Parallax effect on sections
      const sections = document.querySelectorAll(".parallax-section");
      sections.forEach((section) => {
        gsap.to(section, {
          yPercent: -10,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top bottom",
            end: "bottom top",
            scrub: 1,
          },
        });
      });

      // Fade in CTA section
      const ctaSection = document.querySelector(".cta-section");
      if (ctaSection) {
        gsap.fromTo(
          ctaSection,
          {
            opacity: 0,
            y: 100,
          },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: ctaSection,
              start: "top bottom-=150",
              toggleActions: "play none none reverse", // Allow re-playing
            },
          }
        );
      }
    });

    return () => {
      ctx.revert(); // Clean up all GSAP animations created in this context
    };
  }, []);
}
