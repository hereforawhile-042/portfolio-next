"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MagneticButton } from "@/components/magnetic-button";
import { Button } from "@/components/ui/button";
import { PROFILE, SKILLS } from "@/lib/data";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useScrollAnimations } from "@/hooks/useScrollAnimations";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Home() {
  const nameRef = useRef<HTMLHeadingElement>(null);

  useScrollAnimations();

  useEffect(() => {
    // Split text animation for name
    if (nameRef.current) {
      const words = nameRef.current.querySelectorAll(".word");

      gsap.fromTo(
        words,
        {
          opacity: 0,
          y: 30,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: "power3.out",
          delay: 0.2,
        }
      );
    }

    // Animate role and bio
    const roleEl = document.querySelector(".role-text");
    const ctaEl = document.querySelector(".cta-button");

    if (roleEl && ctaEl) {
      gsap.fromTo(
        [roleEl, ctaEl],
        {
          opacity: 0,
          y: 20,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.2,
          ease: "power2.out",
          delay: 0.6,
        }
      );
    }
  }, []);

  return (
    <div className="container mx-auto px-4 mt-18 md:px-8">
      {/* Hero Section - Ram's Style */}
      <section className="flex items-center justify-center min-h-[90vh] text-center">
        <div className="max-w-3xl space-y-8">
          <div className="space-y-4">
            <h1
              ref={nameRef}
              className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-tight"
            >
              <span className="font-[family-name:var(--font-poppins)]">
                Hey, I'm{" "}
                <span className="inline-block mr-3">
                  <span className="text-transparent bg-clip-text bg-gradient-to-br from-lime-400 via-green-500 to-emerald-600 drop-shadow-[0_0_10px_rgba(132,204,22,0.5)]">
                    J
                  </span>
                  {PROFILE.name.split(" ")[0].slice(1)}
                </span>
                <span className="inline-block">
                  {PROFILE.name.split(" ")[1]}
                </span>
              </span>
            </h1>
            <p className="role-text text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto">
              A{" "}
              <span className="text-foreground font-semibold">
                Result-Oriented {PROFILE.role}
              </span>{" "}
              building and managing Websites and Web Applications that leads to
              the success of the overall product
            </p>
          </div>

          <div className="cta-button flex flex-col sm:flex-row items-center justify-center gap-4">
            <MagneticButton>
              <Button
                asChild
                size="lg"
                className="rounded-full px-10 h-14 text-base font-semibold"
              >
                <Link href="/projects">
                  PROJECTS <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </MagneticButton>
            <MagneticButton>
              <Button
                asChild
                size="lg"
                className="rounded-full px-10 h-14 text-base font-semibold bg-primary text-primary-foreground hover:bg-primary/90 border-none shadow-[0_0_20px_rgba(132,204,22,0.4)] hover:shadow-[0_0_30px_rgba(132,204,22,0.6)]"
              >
                <a
                  href={`${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/portfolio/resume.pdf`}
                  target="_blank"
                  rel="noopener noreferrer"
                  download="Jeremiah_Egemonye_Resume.pdf"
                >
                  DOWNLOAD CV
                </a>
              </Button>
            </MagneticButton>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="py-12 md:py-24">
        <div className="mb-12 text-center">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
            My Skills
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Technologies and tools I use to bring products to life
          </p>
        </div>

        <div className="flex flex-wrap gap-3 justify-center max-w-4xl mx-auto">
          {SKILLS.map((skill) => (
            <div
              key={skill.name}
              className="skill-card inline-flex items-center gap-2 px-4 py-3 rounded-full bg-card/80 backdrop-blur-sm border border-border/50 hover:border-primary/50 transition-all hover:shadow-lg cursor-default"
            >
              <img
                src={`https://cdn.simpleicons.org/${
                  skill.icon
                }/${skill.color.replace("#", "")}`}
                alt={skill.name}
                className="w-5 h-5"
                onError={(e) => {
                  e.currentTarget.style.display = "none";
                }}
              />
              <span className="text-sm font-semibold text-foreground">
                {skill.name}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section py-24">
        <div className="max-w-3xl mx-auto text-center space-y-6">
          <h2 className="text-3xl md:text-4xl font-bold">
            Open to Job Opportunities
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            I'm open to Job opportunities where I can contribute, learn and
            grow. If you have a good opportunity that matches my skills and
            experience then don't hesitate to contact me.
          </p>
          <div className="pt-4">
            <MagneticButton>
              <Button
                size="lg"
                className="rounded-full px-10 h-14 text-base font-semibold"
              >
                <Link href="/about">CONTACT</Link>
              </Button>
            </MagneticButton>
          </div>
        </div>
      </section>
    </div>
  );
}
