"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";

interface Particle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  rotation: number;
  rotationSpeed: number;
  type: "pokeball" | "sparkle" | "bubble";
}

export function PokemonWall() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const pokemonIds = Array.from({ length: 64 }, (_, i) => i + 1);
  
  // Parallax Effect based on Scroll
  const { scrollYProgress } = useScroll();
  const wallY = useTransform(scrollYProgress, [0, 1], ["0%", "-10%"]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let particles: Particle[] = [];
    const particleCount = 100;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const createParticles = () => {
      particles = [];
      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 15 + 5,
          speedX: (Math.random() - 0.5) * 0.5,
          speedY: (Math.random() - 0.5) * 0.5,
          rotation: Math.random() * Math.PI * 2,
          rotationSpeed: (Math.random() - 0.5) * 0.02,
          type: Math.random() > 0.7 ? "pokeball" : Math.random() > 0.5 ? "sparkle" : "bubble"
        });
      }
    };

    const drawPokeball = (x: number, y: number, size: number, rotation: number) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(rotation);
      
      // Outer Circle
      ctx.beginPath();
      ctx.arc(0, 0, size, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(255, 255, 255, 0.15)";
      ctx.fill();
      ctx.strokeStyle = "rgba(0, 0, 0, 0.05)";
      ctx.lineWidth = 1;
      ctx.stroke();

      // Middle Line
      ctx.beginPath();
      ctx.moveTo(-size, 0);
      ctx.lineTo(size, 0);
      ctx.stroke();

      // Center Button
      ctx.beginPath();
      ctx.arc(0, 0, size * 0.3, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(255, 255, 255, 0.2)";
      ctx.fill();
      ctx.stroke();

      ctx.restore();
    };

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particles.forEach((p) => {
        p.x += p.speedX;
        p.y += p.speedY;
        p.rotation += p.rotationSpeed;

        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        if (p.type === "pokeball") {
          drawPokeball(p.x, p.y, p.size, p.rotation);
        } else {
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size / 2, 0, Math.PI * 2);
          ctx.fillStyle = p.type === "sparkle" ? "rgba(255, 203, 5, 0.1)" : "rgba(42, 117, 187, 0.1)";
          ctx.fill();
        }
      });

      animationFrameId = requestAnimationFrame(render);
    };

    window.addEventListener("resize", resize);
    resize();
    createParticles();
    render();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div ref={containerRef} className="fixed inset-0 -z-20 overflow-hidden pointer-events-none select-none bg-[#f8fbff]">
      {/* Layer 1: Animated Mesh Gradient */}
      <motion.div 
        animate={{ 
          scale: [1, 1.05, 1],
          rotate: [0, 2, 0]
        }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        className="absolute inset-0 bg-[length:200%_200%] bg-gradient-to-br from-pk-blue/15 via-pk-yellow/5 to-pk-red/15 animate-mesh" 
      />
      
      {/* Layer 2: WebGL/Canvas Particle System */}
      <canvas 
        ref={canvasRef} 
        className="absolute inset-0 opacity-60"
      />

      {/* Layer 3: High-Res Pokemon Grid with Parallax - Reduced blur, increased visibility */}
      <motion.div 
        style={{ y: wallY }}
        className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 xl:grid-cols-12 gap-6 sm:gap-10 p-8 w-[140%] -ml-[20%] -mt-[5%] rotate-[-8deg] opacity-[0.12]"
      >
        {pokemonIds.map((id, index) => (
          <div key={id} className="relative aspect-square">
            <Image
              src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`}
              alt="Pokemon Background"
              fill
              className="object-contain filter saturate-150 contrast-125 drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]"
              sizes="(max-width: 768px) 80px, 120px"
              loading={index < 12 ? "eager" : "lazy"}
            />
          </div>
        ))}
      </motion.div>
      
      {/* Final Vignette & Blending - More cartoonish feel */}
      <div className="absolute inset-0 bg-gradient-to-b from-pk-white/30 via-transparent to-pk-white/70" />
      <div className="absolute inset-0 shadow-[inset_0_0_100px_rgba(255,255,255,0.3)]" />
    </div>
  );
}
