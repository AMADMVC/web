"use client";

import React, { useEffect, useRef } from "react";

interface ParticleCanvasProps {
  className?: string;
  particleCount?: number;
}

interface Particle3D {
  x: number;
  y: number;
  z: number;
  vx: number;
  vy: number;
  vz: number;
  baseRadius: number;
  color: string;
}

export function ParticleCanvas({ className, particleCount = 70 }: ParticleCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth);
    let height = (canvas.height = canvas.parentElement?.clientHeight || window.innerHeight);

    const fov = 400;
    const particles: Particle3D[] = [];

    // Colors: Orange, White, Warm Amber, Soft Zinc
    const colors = [
      "#FF5E14",
      "#FF7A1A",
      "#FF9E42",
      "#FFFFFF",
      "#D4D4D8",
    ];

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: (Math.random() - 0.5) * width * 1.5,
        y: (Math.random() - 0.5) * height * 1.5,
        z: Math.random() * 800 - 400,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        vz: (Math.random() - 0.5) * 0.6,
        baseRadius: Math.random() * 2.2 + 1.2,
        color: colors[Math.floor(Math.random() * colors.length)],
      });
    }

    let mouseX = 0;
    let mouseY = 0;
    let targetRotX = 0;
    let targetRotY = 0;
    let currentRotX = 0;
    let currentRotY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left - width / 2;
      const y = e.clientY - rect.top - height / 2;
      targetRotY = (x / width) * 0.4;
      targetRotX = -(y / height) * 0.4;
    };

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("mousemove", handleMouseMove);

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Smooth camera dampening
      currentRotX += (targetRotX - currentRotX) * 0.05;
      currentRotY += (targetRotY - currentRotY) * 0.05;

      const cosX = Math.cos(currentRotX);
      const sinX = Math.sin(currentRotX);
      const cosY = Math.cos(currentRotY);
      const sinY = Math.sin(currentRotY);

      // Projected points storage for connecting lines
      const projected: { x: number; y: number; z: number; r: number; color: string }[] = [];

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Movement
        p.x += p.vx;
        p.y += p.vy;
        p.z += p.vz;

        // Boundaries
        const boundX = width * 0.9;
        const boundY = height * 0.9;
        if (p.x > boundX) p.x = -boundX;
        if (p.x < -boundX) p.x = boundX;
        if (p.y > boundY) p.y = -boundY;
        if (p.y < -boundY) p.y = boundY;
        if (p.z > 400) p.z = -400;
        if (p.z < -400) p.z = 400;

        // 3D rotation
        // Rotate Y
        let x1 = p.x * cosY + p.z * sinY;
        const z1 = -p.x * sinY + p.z * cosY;

        // Rotate X
        const y2 = p.y * cosX - z1 * sinX;
        const z2 = p.y * sinX + z1 * cosX;

        // Perspective projection
        const depth = fov / (fov + z2 + 500);
        if (depth > 0) {
          const px = x1 * depth + width / 2;
          const py = y2 * depth + height / 2;
          const radius = p.baseRadius * depth * 2.2;

          projected.push({ x: px, y: py, z: z2, r: radius, color: p.color });

          // Render Particle Node with Glow
          ctx.beginPath();
          ctx.arc(px, py, radius, 0, Math.PI * 2);
          ctx.fillStyle = p.color;
          ctx.shadowBlur = p.color.startsWith("#FF") ? 14 : 4;
          ctx.shadowColor = p.color.startsWith("#FF") ? "rgba(255, 94, 20, 0.8)" : "rgba(255, 255, 255, 0.3)";
          ctx.fill();
        }
      }

      // Draw connecting filaments between close nodes
      ctx.shadowBlur = 0;
      for (let i = 0; i < projected.length; i++) {
        for (let j = i + 1; j < projected.length; j++) {
          const p1 = projected[i];
          const p2 = projected[j];
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 110) {
            const alpha = (1 - dist / 110) * 0.22;
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(255, 94, 20, ${alpha})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, [particleCount]);

  return (
    <canvas
      ref={canvasRef}
      className={`pointer-events-none absolute inset-0 h-full w-full opacity-70 mix-blend-screen ${className || ""}`}
    />
  );
}
