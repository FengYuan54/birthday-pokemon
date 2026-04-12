"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export function HeroIllustration() {
  return (
    <div className="relative w-full max-w-2xl h-48 sm:h-64 mb-8 flex justify-center items-end">
      {/* Pikachu - Lying/Sitting Pose */}
      <motion.div
        initial={{ opacity: 0, x: -50, y: 20, rotate: -5 }}
        animate={{ opacity: 1, x: 0, y: 0, rotate: -10 }}
        transition={{ duration: 1.2, ease: "easeOut", delay: 0.2 }}
        className="relative w-40 h-40 sm:w-56 sm:h-56 -mr-12 z-20 drop-shadow-[0_10px_15px_rgba(255,203,5,0.4)]"
      >
        <Image
          src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png"
          alt="Pikachu"
          fill
          className="object-contain"
          priority
        />
      </motion.div>

      {/* Charmander - Lying/Sitting Pose */}
      <motion.div
        initial={{ opacity: 0, x: 50, y: 20, rotate: 5 }}
        animate={{ opacity: 1, x: 0, y: 0, rotate: 10 }}
        transition={{ duration: 1.2, ease: "easeOut", delay: 0.4 }}
        className="relative w-36 h-36 sm:w-52 sm:h-52 -ml-12 z-10 drop-shadow-[0_10px_15px_rgba(238,129,48,0.4)]"
      >
        <Image
          src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/4.png"
          alt="Charmander"
          fill
          className="object-contain"
          priority
        />
      </motion.div>

      {/* Soft Glow Background */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-3/4 h-12 bg-white/20 blur-3xl rounded-full -z-10" />
    </div>
  );
}
