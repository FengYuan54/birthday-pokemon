"use client";

import { BirthdayForm } from "@/components/BirthdayForm";
import { PokemonWall } from "@/components/PokemonWall";
import { HeroIllustration } from "@/components/HeroIllustration";
import { PokemonTitle } from "@/components/PokemonTitle";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <div className="relative flex flex-col items-center justify-center min-h-[calc(100vh-160px)] px-4 overflow-hidden py-12">
      <PokemonWall />
      
      {/* Main Content */}
      <div className="relative z-10 w-full max-w-6xl flex flex-col items-center text-center space-y-12">
        <HeroIllustration />
        
        <PokemonTitle />

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.8, duration: 0.8 }}
          className="w-full flex justify-center pt-4"
        >
          <BirthdayForm />
        </motion.div>

        {/* Minimal Feature List */}
        <div className="flex flex-wrap justify-center gap-12 pt-8 opacity-40 grayscale hover:grayscale-0 transition-all duration-700">
          {["1025+ SPECIES", "OFFICIAL ART", "UNIQUE MESSAGE"].map((text) => (
            <span key={text} className="text-[10px] font-black tracking-[0.3em]">{text}</span>
          ))}
        </div>
      </div>
    </div>
  );
}
