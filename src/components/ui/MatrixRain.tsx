"use client";

import { useEffect, useRef } from "react";

export function MatrixRain() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const setCanvasDimensions = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };

    setCanvasDimensions();
    window.addEventListener("resize", setCanvasDimensions);

    const chars = "アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズブヅプエェケセテネヘメレゲゼデベペオォコソトノホモヨョロゴゾドボポヴッン0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const fontSize = 14;
    // We need to recalculate columns if window resizes, but for simplicity we initialize a large array
    // To handle resize better, we dynamically check columns in the draw loop
    let drops: number[] = [];
    const initDrops = () => {
      const columns = Math.floor(canvas.width / fontSize) + 1;
      drops = [];
      for (let x = 0; x < columns; x++) {
        drops[x] = Math.random() * -100; // start off-screen randomly
      }
    };
    initDrops();

    let animationFrameId: number;
    let lastDrawTime = 0;

    const draw = (timestamp: number) => {
      animationFrameId = requestAnimationFrame(draw);

      // Throttle frame rate for the classic choppy matrix look (slower)
      if (timestamp - lastDrawTime < 90) return;
      lastDrawTime = timestamp;

      ctx.fillStyle = "rgba(0, 0, 0, 0.1)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = "#0F0";
      ctx.font = `${fontSize}px monospace`;

      const columns = Math.floor(canvas.width / fontSize) + 1;
      // If canvas grew, add more drops
      while (drops.length < columns) {
        drops.push(Math.random() * -100);
      }

      for (let i = 0; i < columns; i++) {
        const text = chars[Math.floor(Math.random() * chars.length)];
        const x = i * fontSize;
        const y = drops[i] * fontSize;

        // Subtle opacity
        ctx.globalAlpha = 0.6;
        ctx.fillText(text, x, y);
        ctx.globalAlpha = 1.0;

        if (y > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }

        drops[i]++;
      }
    };

    animationFrameId = requestAnimationFrame(draw);

    return () => {
      window.removeEventListener("resize", setCanvasDimensions);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none opacity-50 mix-blend-screen"
      style={{ zIndex: 0 }}
    />
  );
}
