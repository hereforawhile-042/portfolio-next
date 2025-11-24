"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { useTheme } from "next-themes";

export function StarfieldBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const starsRef = useRef<
    {
      x: number;
      y: number;
      radius: number;
      opacity: number;
      twinkleSpeed: number;
      baseRadius: number;
      vx: number;
      vy: number;
    }[]
  >([]);
  const mouseRef = useRef({ x: 0, y: 0 });
  const animationFrameRef = useRef<number | null>(null);
  const { theme, systemTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Cancel any existing animation
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Determine current theme
    const currentTheme = theme === "system" ? systemTheme : theme;
    const isDark = currentTheme === "dark";

    // Set canvas size
    const setCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    setCanvasSize();

    const handleResize = () => {
      setCanvasSize();
    };
    window.addEventListener("resize", handleResize);

    // Create stars with subtle movement
    const createStars = (count: number) => {
      const stars = [];
      for (let i = 0; i < count; i++) {
        stars.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          radius: Math.random() * 2,
          opacity: Math.random(),
          twinkleSpeed: 0.5 + Math.random() * 2,
          baseRadius: Math.random() * 2,
          // Very subtle drift (75% slower than before)
          vx: (Math.random() - 0.5) * 0.05,
          vy: (Math.random() - 0.5) * 0.05,
        });
      }
      return stars;
    };

    starsRef.current = createStars(200);

    // Mouse move for pulse effect
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = {
        x: e.clientX,
        y: e.clientY,
      };
    };
    window.addEventListener("mousemove", handleMouseMove);

    // Kill all existing GSAP animations
    gsap.killTweensOf(starsRef.current);

    // Animate stars twinkling
    starsRef.current.forEach((star, i) => {
      gsap.to(star, {
        opacity: Math.random(),
        duration: star.twinkleSpeed,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: i * 0.01,
      });
    });

    // Animation loop
    const animate = () => {
      // Clear with theme-appropriate background fade
      ctx.fillStyle = isDark
        ? "rgba(10, 10, 10, 0.1)"
        : "rgba(224, 242, 254, 0.1)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw stars with pulse effect and subtle movement
      starsRef.current.forEach((star) => {
        // Calculate distance from mouse
        const dx = mouseRef.current.x - star.x;
        const dy = mouseRef.current.y - star.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        // Pulse effect: stars closer to mouse get bigger
        const maxDistance = 200;
        const pulseStrength = Math.max(0, 1 - distance / maxDistance);
        const radiusMultiplier = 1 + pulseStrength * 0.5;

        ctx.beginPath();
        ctx.arc(
          star.x,
          star.y,
          star.baseRadius * radiusMultiplier,
          0,
          Math.PI * 2
        );

        // Theme-appropriate star colors
        ctx.fillStyle = isDark
          ? `rgba(255, 255, 255, ${star.opacity})`
          : `rgba(100, 100, 100, ${star.opacity * 0.6})`;
        ctx.fill();

        // Very subtle movement
        star.x += star.vx;
        star.y += star.vy;

        // Wrap around screen
        if (star.x < 0) star.x = canvas.width;
        if (star.x > canvas.width) star.x = 0;
        if (star.y < 0) star.y = canvas.height;
        if (star.y > canvas.height) star.y = 0;
      });

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      gsap.killTweensOf(starsRef.current);
    };
  }, [theme, systemTheme, mounted]);

  if (!mounted) {
    return null;
  }

  const currentTheme = theme === "system" ? systemTheme : theme;
  const isDark = currentTheme === "dark";

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{
        background: isDark
          ? "radial-gradient(ellipse at bottom, #0a0a0a 0%, #000000 100%)"
          : "radial-gradient(ellipse at bottom, #f0f9ff 0%, #e0f2fe 100%)",
      }}
    />
  );
}
