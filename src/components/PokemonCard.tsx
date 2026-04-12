"use client";

import { PokemonDetails } from "@/lib/pokemon";
import { motion } from "framer-motion";
import { Ruler, Weight } from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";

const typeColors: Record<string, string> = {
  normal: "bg-[#A8A77A]",
  fire: "bg-[#EE8130]",
  water: "bg-[#6390F0]",
  electric: "bg-[#F7D02C]",
  grass: "bg-[#7AC74C]",
  ice: "bg-[#96D9D6]",
  fighting: "bg-[#C22E28]",
  poison: "bg-[#A33EA1]",
  ground: "bg-[#E2BF65]",
  flying: "bg-[#A98FF3]",
  psychic: "bg-[#F95587]",
  bug: "bg-[#A6B91A]",
  rock: "bg-[#B6A136]",
  ghost: "bg-[#735797]",
  dragon: "bg-[#6F35FC]",
  dark: "bg-[#705746]",
  steel: "bg-[#B7B7CE]",
  fairy: "bg-[#D685AD]",
};

export function PokemonCard({ pokemon, message }: { pokemon: PokemonDetails; message: string }) {
  const primaryType = pokemon.types[0];

  return (
    <motion.div
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className="max-w-md mx-auto relative group"
    >
      {/* Dynamic Glow Background */}
      <div className={cn(
        "absolute -inset-4 rounded-[4rem] blur-2xl opacity-30 group-hover:opacity-50 transition-opacity duration-700",
        typeColors[primaryType] || "bg-gray-400"
      )} />

      <div className="relative glass rounded-[3rem] overflow-hidden shadow-2xl border-b-[12px] border-black/5 bg-white/80">
        {/* Header with Type Gradient */}
        <div className={cn(
          "h-64 relative flex items-center justify-center p-8",
          typeColors[primaryType] || "bg-gray-100"
        )}>
          {/* Subtle Pattern Overlay */}
          <div className="absolute inset-0 opacity-15 pokeball-bg" />
          
          <motion.div 
            animate={{ y: [0, -12, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            className="relative w-56 h-56 z-10 drop-shadow-[0_20px_40px_rgba(0,0,0,0.4)]"
          >
            <Image
              src={pokemon.imageUrl}
              alt={pokemon.name}
              fill
              className="object-contain"
              priority
            />
          </motion.div>
          
          <div className="absolute top-6 right-8">
             <span className="text-6xl font-black text-black/15 tracking-tighter font-staatliches">
              #{pokemon.id.toString().padStart(4, "0")}
            </span>
          </div>
        </div>

        {/* Minimal Info Body */}
        <div className="p-8 pt-10 text-center space-y-6">
          <div className="flex justify-center gap-2">
            {pokemon.types.map((type) => (
              <span
                key={type}
                className={cn("type-badge px-4 py-1.5 rounded-xl", typeColors[type] || "bg-gray-400")}
              >
                {type}
              </span>
            ))}
          </div>

          {/* Bilingual Name Display with Adjusted Layout to prevent overlap */}
          <div className="flex flex-col items-center space-y-1">
            <h2 className="text-4xl sm:text-5xl font-normal text-gray-900 tracking-tight font-luckiest-guy leading-tight pokemon-font">
              {pokemon.name}
            </h2>
            <div className="h-px w-12 bg-gray-100" />
            <p className="text-lg sm:text-xl font-medium italic text-gray-400 uppercase tracking-[0.2em] font-staatliches leading-none pokemon-font">
              {pokemon.enName}
            </p>
          </div>

          <div className="bg-pk-yellow/15 border-2 border-pk-yellow/30 rounded-[2rem] p-5 transform -rotate-1 shadow-inner">
            <p className="text-pk-dark-blue font-bold italic tracking-tight leading-relaxed whitespace-pre-line">
              "{message}"
            </p>
          </div>

          {/* Grid Stats */}
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col items-center p-4 bg-white/50 rounded-2xl border-b-4 border-gray-100 shadow-sm">
              <Ruler size={18} className="text-pk-blue mb-1" />
              <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Height</span>
              <span className="text-xl font-black text-gray-800">{pokemon.height}m</span>
            </div>
            <div className="flex flex-col items-center p-4 bg-white/50 rounded-2xl border-b-4 border-gray-100 shadow-sm">
              <Weight size={18} className="text-pk-red mb-1" />
              <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Weight</span>
              <span className="text-xl font-black text-gray-800">{pokemon.weight}kg</span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
