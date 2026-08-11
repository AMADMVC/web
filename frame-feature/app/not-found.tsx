"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Lightbulb, RotateCcw, Trophy, ArrowUp, ArrowDown, Sparkles } from "lucide-react";

export default function NotFound() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [hasWon, setHasWon] = useState(false);
  const [isDead, setIsDead] = useState(false);
  const [score, setScore] = useState(0);

  // Key tracking refs for zero-latency game loop
  const keysRef = useRef<{
    left: boolean;
    right: boolean;
    up: boolean;
    down: boolean;
  }>({
    left: false,
    right: false,
    up: false,
    down: false,
  });

  // Restart trigger ref
  const restartRef = useRef<() => void>(() => {});

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;

    // Virtual game canvas resolution (fixed aspect ratio)
    const GAME_WIDTH = 900;
    const GAME_HEIGHT = 360;

    const resizeCanvas = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Game world coordinates and obstacles
    // Ground level Y = 280
    const GROUND_Y = 280;

    // Platforms and obstacles definition
    const platforms = [
      { x: 0, y: GROUND_Y, width: 220, height: 80 }, // Start platform
      { x: 320, y: GROUND_Y, width: 140, height: 80 }, // Middle landing platform
      { x: 500, y: 220, width: 90, height: 140 }, // Stone block platform
      { x: 630, y: GROUND_Y, width: 270, height: 80 }, // Final platform with barrier and flag
    ];

    // Gap / Hazards:
    // Gap 1: x 220 to 320 (Spikes & Water)
    // Gap 2: x 460 to 500
    // Gap 3: x 590 to 630
    const hazards = [
      { type: "spikes", x: 225, y: GROUND_Y + 15, width: 90, height: 40 },
      { type: "spikes", x: 462, y: GROUND_Y + 15, width: 35, height: 40 },
      { type: "spikes", x: 592, y: GROUND_Y + 15, width: 35, height: 40 },
    ];

    // Crawl Barrier (tunnel on final platform):
    // Hanging roof barrier from x: 690 to 760 at y: 215 with height 40 -> space below is y: 255 to 280 (height 25px)
    const crawlBarrier = {
      x: 690,
      y: 210,
      width: 70,
      height: 45,
    };

    // Finish Flag
    const finishFlag = {
      x: 830,
      y: GROUND_Y - 70,
      poleHeight: 70,
    };

    // Floating clouds
    const clouds = [
      { x: 50, y: 40, scale: 0.8, speed: 0.2 },
      { x: 300, y: 70, scale: 1.1, speed: 0.15 },
      { x: 600, y: 35, scale: 0.9, speed: 0.25 },
      { x: 800, y: 80, scale: 0.7, speed: 0.18 },
    ];

    // Stick figure player state
    const player = {
      x: 40,
      y: GROUND_Y,
      vx: 0,
      vy: 0,
      width: 20,
      standingHeight: 52,
      crawlingHeight: 22,
      isGrounded: true,
      isCrawling: false,
      facingRight: true,
      runAnimTimer: 0,
      respawnTimer: 0,
      reachedGoal: false,
    };

    // Confetti particles on victory
    type Particle = {
      x: number;
      y: number;
      vx: number;
      vy: number;
      color: string;
      size: number;
      rotation: number;
      rotSpeed: number;
    };
    const confetti: Particle[] = [];

    const spawnConfetti = () => {
      const colors = ["#FF5E14", "#FF7A1A", "#FFFFFF", "#FFB347", "#E64A00"];
      for (let i = 0; i < 70; i++) {
        confetti.push({
          x: finishFlag.x + 10,
          y: finishFlag.y + 15,
          vx: (Math.random() - 0.5) * 10,
          vy: -Math.random() * 8 - 3,
          color: colors[Math.floor(Math.random() * colors.length)],
          size: Math.random() * 6 + 4,
          rotation: Math.random() * 360,
          rotSpeed: (Math.random() - 0.5) * 10,
        });
      }
    };

    const resetGame = () => {
      player.x = 40;
      player.y = GROUND_Y;
      player.vx = 0;
      player.vy = 0;
      player.isGrounded = true;
      player.isCrawling = false;
      player.reachedGoal = false;
      player.respawnTimer = 0;
      setHasWon(false);
      setIsDead(false);
      confetti.length = 0;
    };
    restartRef.current = resetGame;

    // Keyboard event listeners
    const handleKeyDown = (e: KeyboardEvent) => {
      if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight", "Space"].includes(e.code)) {
        e.preventDefault();
      }
      if (e.code === "ArrowLeft" || e.code === "KeyA") keysRef.current.left = true;
      if (e.code === "ArrowRight" || e.code === "KeyD") keysRef.current.right = true;
      if (e.code === "ArrowUp" || e.code === "Space" || e.code === "KeyW") keysRef.current.up = true;
      if (e.code === "ArrowDown" || e.code === "KeyS") keysRef.current.down = true;
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.code === "ArrowLeft" || e.code === "KeyA") keysRef.current.left = false;
      if (e.code === "ArrowRight" || e.code === "KeyD") keysRef.current.right = false;
      if (e.code === "ArrowUp" || e.code === "Space" || e.code === "KeyW") keysRef.current.up = false;
      if (e.code === "ArrowDown" || e.code === "KeyS") keysRef.current.down = false;
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    // Main animation loop
    let lastTime = performance.now();

    const loop = (currentTime: number) => {
      const dt = Math.min((currentTime - lastTime) / 1000, 0.05);
      lastTime = currentTime;

      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      const scaleX = (rect.width * dpr) / GAME_WIDTH;
      const scaleY = (rect.height * dpr) / GAME_HEIGHT;

      // Update clouds
      clouds.forEach((cloud) => {
        cloud.x += cloud.speed;
        if (cloud.x > GAME_WIDTH + 80) cloud.x = -80;
      });

      // Physics & Player Logic if not dead / won
      if (!player.reachedGoal && player.respawnTimer <= 0) {
        const moveSpeed = player.isCrawling ? 2.2 : 3.8;
        const jumpForce = -9.5;
        const gravity = 22;

        // Crawl state
        player.isCrawling = keysRef.current.down;
        const currentHeight = player.isCrawling ? player.crawlingHeight : player.standingHeight;

        // Horizontal movement
        if (keysRef.current.left) {
          player.vx = -moveSpeed;
          player.facingRight = false;
          player.runAnimTimer += dt * 15;
        } else if (keysRef.current.right) {
          player.vx = moveSpeed;
          player.facingRight = true;
          player.runAnimTimer += dt * 15;
        } else {
          player.vx = 0;
          player.runAnimTimer = 0;
        }

        // Jump
        if (keysRef.current.up && player.isGrounded && !player.isCrawling) {
          player.vy = jumpForce;
          player.isGrounded = false;
        }

        // Apply gravity
        player.vy += gravity * dt;

        // Proposed new position
        const nextX = player.x + player.vx;
        const nextY = player.y + player.vy;

        // Check horizontal barrier collision (cannot walk through crawl barrier unless crawling)
        let blockedHorizontal = false;
        if (!player.isCrawling) {
          // Standing head position: top is nextY - standingHeight
          const headTop = nextY - player.standingHeight;
          if (
            nextX + 10 > crawlBarrier.x &&
            nextX - 10 < crawlBarrier.x + crawlBarrier.width &&
            headTop < crawlBarrier.y + crawlBarrier.height
          ) {
            blockedHorizontal = true;
          }
        }

        if (!blockedHorizontal) {
          player.x = Math.max(15, Math.min(GAME_WIDTH - 20, nextX));
        }

        // Platform vertical landing & collision
        player.y = nextY;
        player.isGrounded = false;

        // Check platform top surfaces
        for (const plat of platforms) {
          if (
            player.x + 8 >= plat.x &&
            player.x - 8 <= plat.x + plat.width &&
            player.y >= plat.y &&
            player.y - player.vy <= plat.y + 12
          ) {
            player.y = plat.y;
            player.vy = 0;
            player.isGrounded = true;
            break;
          }
        }

        // Check stone block side collision (stone block at x: 500, y: 220)
        const stone = platforms[2];
        if (
          player.x + 10 > stone.x &&
          player.x - 10 < stone.x + stone.width &&
          player.y > stone.y &&
          player.y - currentHeight < stone.y + stone.height
        ) {
          // Push player out horizontally
          if (player.vx > 0) {
            player.x = stone.x - 10;
          } else if (player.vx < 0) {
            player.x = stone.x + stone.width + 10;
          }
        }

        // Check death conditions (falling into pit or touching spikes)
        if (player.y > GAME_HEIGHT - 10) {
          // Fell into pit
          player.respawnTimer = 0.8;
          setIsDead(true);
        }

        for (const h of hazards) {
          if (
            player.x > h.x &&
            player.x < h.x + h.width &&
            player.y >= h.y
          ) {
            player.respawnTimer = 0.8;
            setIsDead(true);
            break;
          }
        }

        // Check Goal (Finish Flag reached)
        if (player.x >= finishFlag.x - 15 && player.isGrounded) {
          player.reachedGoal = true;
          setHasWon(true);
          setScore((s) => s + 1);
          spawnConfetti();
        }
      } else if (player.respawnTimer > 0) {
        player.respawnTimer -= dt;
        if (player.respawnTimer <= 0) {
          resetGame();
        }
      }

      // Update Confetti
      for (let i = confetti.length - 1; i >= 0; i--) {
        const p = confetti[i];
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 9.8 * dt * 0.8;
        p.rotation += p.rotSpeed;
        if (p.y > GAME_HEIGHT) {
          confetti.splice(i, 1);
        }
      }

      // ============================================
      // RENDER SCENE (Vector Black & White + Orange)
      // ============================================
      ctx.save();
      ctx.scale(scaleX, scaleY);
      ctx.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT);

      // Background Sky: Subtle warm light grey
      ctx.fillStyle = "#F8F9FA";
      ctx.fillRect(0, 0, GAME_WIDTH, GAME_HEIGHT);

      // Draw faint cloud outlines
      ctx.strokeStyle = "#E2E4E8";
      ctx.lineWidth = 1.5;
      ctx.fillStyle = "#FFFFFF";
      clouds.forEach((c) => {
        ctx.save();
        ctx.translate(c.x, c.y);
        ctx.scale(c.scale, c.scale);
        ctx.beginPath();
        ctx.arc(0, 0, 18, Math.PI * 0.5, Math.PI * 1.5);
        ctx.arc(20, -12, 22, Math.PI * 1, Math.PI * 1.85);
        ctx.arc(44, 0, 18, Math.PI * 1.5, Math.PI * 0.5);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
        ctx.restore();
      });

      // Draw dashed arc jump guides (visual hint)
      ctx.save();
      ctx.strokeStyle = "#FF5E14";
      ctx.setLineDash([4, 6]);
      ctx.lineWidth = 1.8;
      ctx.globalAlpha = 0.5;

      // Arc 1: Over first gap (x: 180 to 340)
      ctx.beginPath();
      ctx.moveTo(180, GROUND_Y);
      ctx.quadraticCurveTo(260, GROUND_Y - 90, 340, GROUND_Y);
      ctx.stroke();

      // Arc 2: Up onto stone block (x: 420 to 520)
      ctx.beginPath();
      ctx.moveTo(420, GROUND_Y);
      ctx.quadraticCurveTo(470, 170, 520, 220);
      ctx.stroke();

      ctx.restore();

      // Draw Hazards (Water & Spikes in pits)
      hazards.forEach((h) => {
        // Pit water backdrop
        ctx.fillStyle = "#E8EEF5";
        ctx.fillRect(h.x - 5, GROUND_Y + 5, h.width + 10, GAME_HEIGHT - GROUND_Y);

        // Water surface line
        ctx.strokeStyle = "#CBD5E1";
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(h.x - 5, GROUND_Y + 12);
        ctx.lineTo(h.x + h.width + 5, GROUND_Y + 12);
        ctx.stroke();

        // Sharp Spikes
        const spikeWidth = 14;
        const count = Math.floor(h.width / spikeWidth);
        ctx.fillStyle = "#1E2024";
        ctx.strokeStyle = "#1E2024";
        ctx.lineWidth = 1.5;

        for (let i = 0; i < count; i++) {
          const sx = h.x + i * spikeWidth;
          ctx.beginPath();
          ctx.moveTo(sx, GROUND_Y + 40);
          ctx.lineTo(sx + spikeWidth / 2, GROUND_Y + 14);
          ctx.lineTo(sx + spikeWidth, GROUND_Y + 40);
          ctx.closePath();
          ctx.fill();
          ctx.stroke();
        }
      });

      // Draw Platforms (Solid clean vector with top border line)
      platforms.forEach((plat, idx) => {
        // Main block fill
        ctx.fillStyle = idx === 2 ? "#18181B" : "#111215"; // Dark stone block
        ctx.fillRect(plat.x, plat.y, plat.width, plat.height);

        // Top edge accent line
        ctx.strokeStyle = idx === 2 ? "#FF5E14" : "#27272A";
        ctx.lineWidth = 2.5;
        ctx.beginPath();
        ctx.moveTo(plat.x, plat.y);
        ctx.lineTo(plat.x + plat.width, plat.y);
        ctx.stroke();

        // Platform side borders
        ctx.strokeStyle = "#3F3F46";
        ctx.lineWidth = 1;
        ctx.strokeRect(plat.x, plat.y, plat.width, plat.height);

        // Subtle grid hatch pattern inside ground
        ctx.strokeStyle = "rgba(255,255,255,0.06)";
        ctx.lineWidth = 1;
        for (let x = plat.x + 15; x < plat.x + plat.width; x += 20) {
          ctx.beginPath();
          ctx.moveTo(x, plat.y + 5);
          ctx.lineTo(x, plat.y + plat.height);
          ctx.stroke();
        }
      });

      // Draw Stone block label / icon
      ctx.fillStyle = "#A1A1AA";
      ctx.font = "bold 10px monospace";
      ctx.textAlign = "center";
      ctx.fillText("STEP", 545, 270);

      // Draw Crawl Barrier (Hanging Overhang)
      ctx.fillStyle = "#1E2024";
      ctx.fillRect(crawlBarrier.x, crawlBarrier.y, crawlBarrier.width, crawlBarrier.height);
      ctx.strokeStyle = "#FF5E14";
      ctx.lineWidth = 2;
      ctx.strokeRect(crawlBarrier.x, crawlBarrier.y, crawlBarrier.width, crawlBarrier.height);

      // Hazard diagonal stripes on barrier
      ctx.save();
      ctx.strokeStyle = "#FF7A1A";
      ctx.lineWidth = 3;
      for (let x = crawlBarrier.x - 20; x < crawlBarrier.x + crawlBarrier.width; x += 12) {
        ctx.beginPath();
        ctx.moveTo(Math.max(crawlBarrier.x, x), crawlBarrier.y + crawlBarrier.height);
        ctx.lineTo(
          Math.min(crawlBarrier.x + crawlBarrier.width, x + 15),
          crawlBarrier.y
        );
        ctx.stroke();
      }
      ctx.restore();

      // "CRAWL" label above barrier
      ctx.fillStyle = "#FF5E14";
      ctx.font = "bold 9px sans-serif";
      ctx.textAlign = "center";
      ctx.fillText("▼ CRAWL UNDER", crawlBarrier.x + crawlBarrier.width / 2, crawlBarrier.y - 8);

      // Draw Red Finish Flag
      ctx.save();
      // Flagpole
      ctx.strokeStyle = "#18181B";
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(finishFlag.x, finishFlag.y + finishFlag.poleHeight);
      ctx.lineTo(finishFlag.x, finishFlag.y);
      ctx.stroke();

      // Flag base
      ctx.fillStyle = "#18181B";
      ctx.beginPath();
      ctx.arc(finishFlag.x, finishFlag.y + finishFlag.poleHeight, 5, 0, Math.PI * 2);
      ctx.fill();

      // Red triangular cloth
      const wave = Math.sin(currentTime * 0.008) * 3;
      ctx.fillStyle = "#EF4444";
      ctx.beginPath();
      ctx.moveTo(finishFlag.x, finishFlag.y);
      ctx.lineTo(finishFlag.x + 35 + wave, finishFlag.y + 12);
      ctx.lineTo(finishFlag.x, finishFlag.y + 24);
      ctx.closePath();
      ctx.fill();

      // Flag pole tip
      ctx.fillStyle = "#F59E0B";
      ctx.beginPath();
      ctx.arc(finishFlag.x, finishFlag.y - 2, 3.5, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();

      // ============================================
      // DRAW STICK FIGURE PLAYER (Animated Vector)
      // ============================================
      ctx.save();
      ctx.translate(player.x, player.y);
      if (!player.facingRight) {
        ctx.scale(-1, 1);
      }

      ctx.strokeStyle = isDead ? "#EF4444" : "#111215";
      ctx.fillStyle = isDead ? "#EF4444" : "#111215";
      ctx.lineWidth = 2.5;
      ctx.lineCap = "round";
      ctx.lineJoin = "round";

      if (player.isCrawling) {
        // --- Crawling Pose (horizontal stick figure) ---
        // Head
        ctx.beginPath();
        ctx.arc(14, -10, 6, 0, Math.PI * 2);
        ctx.fill();

        // Spine
        ctx.beginPath();
        ctx.moveTo(8, -8);
        ctx.lineTo(-12, -8);
        ctx.stroke();

        // Arms forward
        ctx.beginPath();
        ctx.moveTo(5, -8);
        ctx.lineTo(12, 0);
        ctx.stroke();

        // Legs crawling
        const crawlLeg = Math.sin(player.runAnimTimer * 0.8) * 6;
        ctx.beginPath();
        ctx.moveTo(-12, -8);
        ctx.lineTo(-18, -4 + crawlLeg);
        ctx.lineTo(-24, 0);
        ctx.stroke();
      } else {
        // --- Standing / Running / Jumping Pose ---
        const headY = -44;
        const neckY = -38;
        const hipY = -18;

        // Head
        ctx.beginPath();
        ctx.arc(0, headY, 6.5, 0, Math.PI * 2);
        ctx.fill();

        // Torso
        ctx.beginPath();
        ctx.moveTo(0, neckY);
        ctx.lineTo(0, hipY);
        ctx.stroke();

        if (!player.isGrounded) {
          // In-air Jumping Pose
          // Arms raised up/forward
          ctx.beginPath();
          ctx.moveTo(0, neckY + 4);
          ctx.lineTo(10, neckY - 8);
          ctx.lineTo(16, neckY - 14);
          ctx.moveTo(0, neckY + 4);
          ctx.lineTo(-8, neckY - 4);
          ctx.stroke();

          // Tucked legs
          ctx.beginPath();
          ctx.moveTo(0, hipY);
          ctx.lineTo(10, hipY + 8);
          ctx.lineTo(6, hipY + 16);
          ctx.moveTo(0, hipY);
          ctx.lineTo(-6, hipY + 10);
          ctx.lineTo(-10, hipY + 15);
          ctx.stroke();
        } else if (Math.abs(player.vx) > 0.1) {
          // Running animation cycle
          const legAngle = Math.sin(player.runAnimTimer);
          const armAngle = -Math.sin(player.runAnimTimer);

          // Arms
          ctx.beginPath();
          ctx.moveTo(0, neckY + 4);
          ctx.lineTo(armAngle * 12, neckY + 14);
          ctx.moveTo(0, neckY + 4);
          ctx.lineTo(-armAngle * 12, neckY + 14);
          ctx.stroke();

          // Front Leg
          ctx.beginPath();
          ctx.moveTo(0, hipY);
          ctx.lineTo(legAngle * 10, hipY + 10);
          ctx.lineTo(legAngle * 14, 0);
          ctx.stroke();

          // Back Leg
          ctx.beginPath();
          ctx.moveTo(0, hipY);
          ctx.lineTo(-legAngle * 10, hipY + 10);
          ctx.lineTo(-legAngle * 14, 0);
          ctx.stroke();
        } else {
          // Idle Pose
          // Arms at side
          ctx.beginPath();
          ctx.moveTo(0, neckY + 4);
          ctx.lineTo(6, neckY + 16);
          ctx.moveTo(0, neckY + 4);
          ctx.lineTo(-6, neckY + 16);
          ctx.stroke();

          // Legs straight
          ctx.beginPath();
          ctx.moveTo(0, hipY);
          ctx.lineTo(5, 0);
          ctx.moveTo(0, hipY);
          ctx.lineTo(-5, 0);
          ctx.stroke();
        }
      }

      ctx.restore();

      // Render Confetti
      confetti.forEach((p) => {
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate((p.rotation * Math.PI) / 180);
        ctx.fillStyle = p.color;
        ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.6);
        ctx.restore();
      });

      ctx.restore();

      animationFrameId = requestAnimationFrame(loop);
    };

    animationFrameId = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  // UI Button press helpers for on-screen controls
  const handleButtonDown = (key: "left" | "right" | "up" | "down") => {
    keysRef.current[key] = true;
  };

  const handleButtonUp = (key: "left" | "right" | "up" | "down") => {
    keysRef.current[key] = false;
  };

  return (
    <div className="min-h-screen pt-28 pb-20 bg-[#0A0A0C] text-white flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8">
      {/* Outer Card Container */}
      <div className="w-full max-w-4xl bg-[#121316] rounded-3xl border border-white/10 shadow-2xl p-6 sm:p-10 flex flex-col items-center text-center relative overflow-hidden backdrop-blur-xl">
        {/* Ambient Top Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-28 bg-[#FF5E14]/15 blur-[90px] pointer-events-none" />

        {/* 1. TOP HEADER SECTION */}
        <div className="space-y-3 mb-8 z-10">
          <div className="text-7xl sm:text-9xl font-black tracking-tighter text-white select-none leading-none">
            404
          </div>

          <div className="inline-block px-3.5 py-1 rounded-full bg-[#FF5E14]/15 border border-[#FF5E14]/30 text-[#FF7A1A] text-xs sm:text-sm font-black uppercase tracking-widest">
            Page Not Found
          </div>

          <p className="text-zinc-400 text-sm sm:text-base max-w-md mx-auto pt-1 leading-relaxed">
            Looks like you took a wrong turn. Let&apos;s get you back on track!
          </p>

          <div className="pt-2">
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-black text-[#FF7A1A] hover:text-white border border-[#FF5E14]/40 hover:border-[#FF5E14] text-xs sm:text-sm font-bold uppercase tracking-wider shadow-lg hover:shadow-[0_0_20px_rgba(255,94,20,0.3)] transition-all duration-300 group"
            >
              <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
              <span>&larr; GO HOME</span>
            </Link>
          </div>
        </div>

        {/* 2. MIDDLE GROUND: 2D PLATFORMER GAME CANVAS */}
        <div className="w-full max-w-3xl relative rounded-2xl overflow-hidden border border-zinc-700/60 shadow-xl bg-[#F8F9FA] z-10">
          <canvas
            ref={canvasRef}
            className="w-full h-56 sm:h-72 block cursor-grab active:cursor-grabbing"
          />

          {/* Victory Overlay Modal */}
          {hasWon && (
            <div className="absolute inset-0 bg-black/75 backdrop-blur-sm flex flex-col items-center justify-center p-6 text-center animate-in fade-in zoom-in duration-200">
              <div className="w-12 h-12 rounded-full bg-[#FF5E14]/20 border border-[#FF5E14] text-[#FF5E14] flex items-center justify-center mb-3 shadow-[0_0_25px_rgba(255,94,20,0.5)]">
                <Trophy className="w-6 h-6" />
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-white">
                Course Cleared! You Made It!
              </h3>
              <p className="text-xs sm:text-sm text-zinc-300 max-w-xs mt-1 mb-5">
                You navigated all the obstacles and reached the finish line.
              </p>
              <div className="flex flex-wrap items-center gap-3">
                <Link
                  href="/"
                  className="px-5 py-2 rounded-xl bg-[#FF5E14] text-white text-xs font-bold uppercase tracking-wider hover:bg-[#E64A00] transition-colors shadow-lg"
                >
                  Return to Home
                </Link>
                <button
                  onClick={() => restartRef.current()}
                  className="px-4 py-2 rounded-xl bg-zinc-800 text-zinc-300 hover:text-white text-xs font-bold uppercase tracking-wider transition-colors flex items-center gap-1.5"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Play Again</span>
                </button>
              </div>
            </div>
          )}

          {/* Dead / Respawn Quick Alert */}
          {isDead && !hasWon && (
            <div className="absolute top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-red-500/90 text-white text-[11px] font-bold uppercase tracking-wider shadow-lg flex items-center gap-1.5 animate-bounce">
              <span>Ouch! Respawning...</span>
            </div>
          )}
        </div>

        {/* 3. DIRECTIONAL CONTROL BUTTONS */}
        <div className="w-full max-w-3xl mt-6 pt-5 border-t border-white/10 flex flex-wrap items-center justify-between gap-4 z-10">
          {/* Controls Cluster */}
          <div className="flex flex-wrap items-center gap-2.5 sm:gap-3 mx-auto sm:mx-0">
            {/* MOVE: Left & Right */}
            <div className="flex items-center gap-1 bg-zinc-900/80 p-1.5 rounded-2xl border border-white/10">
              <span className="text-[10px] font-extrabold text-zinc-400 uppercase px-2">MOVE</span>
              <button
                onMouseDown={() => handleButtonDown("left")}
                onMouseUp={() => handleButtonUp("left")}
                onTouchStart={() => handleButtonDown("left")}
                onTouchEnd={() => handleButtonUp("left")}
                className="w-10 h-10 rounded-xl bg-white text-black font-black flex items-center justify-center hover:bg-[#FF5E14] hover:text-white active:scale-95 transition-all shadow cursor-pointer select-none"
                aria-label="Move Left"
              >
                &larr;
              </button>
              <button
                onMouseDown={() => handleButtonDown("right")}
                onMouseUp={() => handleButtonUp("right")}
                onTouchStart={() => handleButtonDown("right")}
                onTouchEnd={() => handleButtonUp("right")}
                className="w-10 h-10 rounded-xl bg-white text-black font-black flex items-center justify-center hover:bg-[#FF5E14] hover:text-white active:scale-95 transition-all shadow cursor-pointer select-none"
                aria-label="Move Right"
              >
                &rarr;
              </button>
            </div>

            {/* JUMP: Up */}
            <div className="flex items-center gap-1.5 bg-zinc-900/80 p-1.5 rounded-2xl border border-white/10">
              <span className="text-[10px] font-extrabold text-zinc-400 uppercase px-2">JUMP</span>
              <button
                onMouseDown={() => handleButtonDown("up")}
                onMouseUp={() => handleButtonUp("up")}
                onTouchStart={() => handleButtonDown("up")}
                onTouchEnd={() => handleButtonUp("up")}
                className="w-10 h-10 rounded-xl bg-white text-black font-black flex items-center justify-center hover:bg-[#FF5E14] hover:text-white active:scale-95 transition-all shadow cursor-pointer select-none"
                aria-label="Jump Up"
              >
                <ArrowUp className="w-4 h-4" />
              </button>
            </div>

            {/* CRAWL: Down */}
            <div className="flex items-center gap-1.5 bg-zinc-900/80 p-1.5 rounded-2xl border border-white/10">
              <span className="text-[10px] font-extrabold text-zinc-400 uppercase px-2">CRAWL</span>
              <button
                onMouseDown={() => handleButtonDown("down")}
                onMouseUp={() => handleButtonUp("down")}
                onTouchStart={() => handleButtonDown("down")}
                onTouchEnd={() => handleButtonUp("down")}
                className="w-10 h-10 rounded-xl bg-white text-black font-black flex items-center justify-center hover:bg-[#FF5E14] hover:text-white active:scale-95 transition-all shadow cursor-pointer select-none"
                aria-label="Crawl Down"
              >
                <ArrowDown className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Reset button */}
          <button
            onClick={() => restartRef.current()}
            className="p-2.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-white/10 text-zinc-400 hover:text-white transition-colors cursor-pointer ml-auto"
            title="Restart Level"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>

        {/* 4. HELPER TIP AT BOTTOM */}
        <div className="mt-6 flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-zinc-900/50 border border-white/5 text-xs text-zinc-400 z-10">
          <Lightbulb className="w-4 h-4 text-[#FF7A1A] shrink-0" />
          <span>
            <strong className="text-zinc-200">Tip:</strong> Use arrows to move, jump and crawl to avoid obstacles.
          </span>
        </div>
      </div>
    </div>
  );
}
