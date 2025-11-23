"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

export function InteractiveOrb() {
  const containerRef = useRef<HTMLDivElement>(null);
  const orbsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const orbs = orbsRef.current;

    // Create timeline for continuous animation
    const tl = gsap.timeline({ repeat: -1 });

    // Animate each orb independently
    orbs.forEach((orb, index) => {
      gsap.to(orb, {
        x: () => gsap.utils.random(-50, 50),
        y: () => gsap.utils.random(-50, 50),
        scale: () => gsap.utils.random(0.8, 1.2),
        duration: gsap.utils.random(3, 5),
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: index * 0.2,
      });

      // Rotation animation
      gsap.to(orb, {
        rotation: 360,
        duration: gsap.utils.random(10, 15),
        repeat: -1,
        ease: "none",
      });
    });

    // Mouse move parallax effect
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;

      const xPos = (clientX / innerWidth - 0.5) * 50;
      const yPos = (clientY / innerHeight - 0.5) * 50;

      gsap.to(container, {
        x: xPos,
        y: yPos,
        duration: 0.5,
        ease: "power2.out",
      });
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      tl.kill();
    };
  }, []);

  const orbColors = [
    "from-blue-500/20 to-blue-600/40",
    "from-purple-500/20 to-purple-600/40",
    "from-pink-500/20 to-pink-600/40",
    "from-indigo-500/20 to-indigo-600/40",
    "from-cyan-500/20 to-cyan-600/40",
  ];

  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <div
        ref={containerRef}
        className="relative w-[400px] h-[400px] md:w-[500px] md:h-[500px]"
      >
        {/* Central glowing core */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-gradient-to-br from-primary/30 to-primary/10 rounded-full blur-3xl animate-pulse" />

        {/* Floating orbs */}
        {orbColors.map((gradient, i) => (
          <div
            key={i}
            ref={(el) => {
              if (el) orbsRef.current[i] = el;
            }}
            className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 md:w-32 md:h-32 bg-gradient-to-br ${gradient} rounded-full blur-xl`}
            style={{
              transformOrigin: `${gsap.utils.random(
                -100,
                100
              )}px ${gsap.utils.random(-100, 100)}px`,
            }}
          />
        ))}

        {/* Mesh/Grid overlay */}
        <div className="absolute inset-0 flex items-center justify-center">
          <svg
            className="w-full h-full opacity-20"
            viewBox="0 0 200 200"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <linearGradient
                id="meshGradient"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="100%"
              >
                <stop
                  offset="0%"
                  stopColor="currentColor"
                  className="text-primary"
                />
                <stop
                  offset="100%"
                  stopColor="currentColor"
                  className="text-primary/20"
                />
              </linearGradient>
            </defs>
            {[...Array(10)].map((_, i) => (
              <g key={i}>
                <line
                  x1="0"
                  y1={i * 20}
                  x2="200"
                  y2={i * 20}
                  stroke="url(#meshGradient)"
                  strokeWidth="0.5"
                  className="animate-pulse"
                  style={{ animationDelay: `${i * 0.1}s` }}
                />
                <line
                  x1={i * 20}
                  y1="0"
                  x2={i * 20}
                  y2="200"
                  stroke="url(#meshGradient)"
                  strokeWidth="0.5"
                  className="animate-pulse"
                  style={{ animationDelay: `${i * 0.1}s` }}
                />
              </g>
            ))}
          </svg>
        </div>

        {/* Rotating rings */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 md:w-80 md:h-80 border border-primary/10 rounded-full animate-spin-slow" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 md:w-60 md:h-60 border border-primary/20 rounded-full animate-spin-reverse-slow" />
      </div>
    </div>
  );
}
