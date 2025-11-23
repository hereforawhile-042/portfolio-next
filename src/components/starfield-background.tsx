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
      vx: number;
      vy: number;
    }[]
  >([]);
  const shootingStarsRef = useRef<
    {
      x: number;
      y: number;
      length: number;
      speed: number;
      angle: number;
      opacity: number;
      active: boolean;
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

    // Create stars
    const createStars = (count: number) => {
      const stars = [];
      for (let i = 0; i < count; i++) {
        stars.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          radius: Math.random() * 2,
          opacity: Math.random(),
          twinkleSpeed: 0.5 + Math.random() * 2,
          vx: (Math.random() - 0.5) * 0.2,
          vy: (Math.random() - 0.5) * 0.2,
        });
      }
      return stars;
    };

    starsRef.current = createStars(200);

    // Create shooting star
    const createShootingStar = () => {
      return {
        x: Math.random() * canvas.width,
        y: (Math.random() * canvas.height) / 2,
        length: 80 + Math.random() * 100,
        speed: 10 + Math.random() * 10,
        angle: Math.PI / 4 + (Math.random() - 0.5) * 0.5,
        opacity: 1,
        active: true,
      };
    };

    // Mouse move parallax
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = {
        x: (e.clientX / window.innerWidth - 0.5) * 2,
        y: (e.clientY / window.innerHeight - 0.5) * 2,
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

    // Shooting star interval
    const addShootingStar = () => {
      if (shootingStarsRef.current.length < 3) {
        shootingStarsRef.current.push(createShootingStar());
      }
    };
    const shootingStarInterval = setInterval(() => {
      addShootingStar();
    }, 2000 + Math.random() * 3000);

    // Animation loop
    const animate = () => {
      // Clear with theme-appropriate background fade
      ctx.fillStyle = isDark
        ? "rgba(9, 15, 9, 0.05)"
        : "rgba(224, 242, 254, 0.05)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw stars with parallax
      starsRef.current.forEach((star) => {
        const parallaxX = mouseRef.current.x * star.radius * 0.5;
        const parallaxY = mouseRef.current.y * star.radius * 0.5;

        ctx.beginPath();
        ctx.arc(
          star.x + parallaxX,
          star.y + parallaxY,
          star.radius,
          0,
          Math.PI * 2
        );

        // Theme-appropriate star colors
        ctx.fillStyle = isDark
          ? `rgba(255, 255, 255, ${star.opacity})`
          : `rgba(100, 100, 100, ${star.opacity * 0.6})`;
        ctx.fill();

        // Slight movement
        star.x += star.vx;
        star.y += star.vy;

        // Wrap around screen
        if (star.x < 0) star.x = canvas.width;
        if (star.x > canvas.width) star.x = 0;
        if (star.y < 0) star.y = canvas.height;
        if (star.y > canvas.height) star.y = 0;
      });

      // Draw shooting stars
      shootingStarsRef.current.forEach((star, index) => {
        if (!star.active) return;

        const gradient = ctx.createLinearGradient(
          star.x,
          star.y,
          star.x - Math.cos(star.angle) * star.length,
          star.y - Math.sin(star.angle) * star.length
        );

        if (isDark) {
          gradient.addColorStop(0, `rgba(255, 255, 255, ${star.opacity})`);
          gradient.addColorStop(1, "rgba(255, 255, 255, 0)");
        } else {
          gradient.addColorStop(
            0,
            `rgba(100, 100, 100, ${star.opacity * 0.5})`
          );
          gradient.addColorStop(1, "rgba(100, 100, 100, 0)");
        }

        ctx.strokeStyle = gradient;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(star.x, star.y);
        ctx.lineTo(
          star.x - Math.cos(star.angle) * star.length,
          star.y - Math.sin(star.angle) * star.length
        );
        ctx.stroke();

        // Move shooting star
        star.x += Math.cos(star.angle) * star.speed;
        star.y += Math.sin(star.angle) * star.speed;
        star.opacity -= 0.01;

        // Remove if off screen or faded
        if (
          star.x > canvas.width ||
          star.y > canvas.height ||
          star.opacity <= 0
        ) {
          shootingStarsRef.current.splice(index, 1);
        }
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
      if (shootingStarInterval) {
        clearInterval(shootingStarInterval);
      }
      gsap.killTweensOf(starsRef.current);
      shootingStarsRef.current = [];
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
          ? "radial-gradient(ellipse at bottom, #1b351b 0%, #090f09 100%)"
          : "radial-gradient(ellipse at bottom, #f0f9ff 0%, #e0f2fe 100%)",
      }}
    />
  );
}
