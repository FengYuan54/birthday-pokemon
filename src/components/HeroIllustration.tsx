"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const iconicPokemon = [
  { id: 25, name: "Pikachu", x: "0%", y: "0%", z: 50, scale: 1.2, delay: 0.2 },
  { id: 4, name: "Charmander", x: "-25%", y: "10%", z: 40, scale: 0.9, delay: 0.4 },
  { id: 7, name: "Squirtle", x: "25%", y: "10%", z: 40, scale: 0.9, delay: 0.6 },
  { id: 1, name: "Bulbasaur", x: "-45%", y: "20%", z: 30, scale: 0.8, delay: 0.8 },
  { id: 52, name: "Meowth", x: "-60%", y: "30%", z: 20, scale: 0.7, delay: 1.2 },
  { id: 54, name: "Psyduck", x: "60%", y: "30%", z: 20, scale: 0.7, delay: 1.4 },
  { id: 133, name: "Eevee", x: "0%", y: "40%", z: 10, scale: 0.7, delay: 1.6 },
  { id: 175, name: "Togepi", x: "30%", y: "40%", z: 15, scale: 0.5, delay: 2.0 },
];

export function HeroIllustration() {
  return (
    <div className="relative w-full max-w-4xl h-64 sm:h-96 mb-16 flex justify-center items-end overflow-visible">
      {/* Background Glow */}
      <div className="absolute inset-0 bg-pk-yellow/5 blur-[120px] rounded-full -z-20" />
      
      {/* The Pokémon Crowd */}
      <div className="relative w-full h-full flex justify-center items-end">
        {iconicPokemon.map((poke) => (
          <motion.div
            key={poke.id}
            initial={{ opacity: 0, scale: 0, y: 50 }}
            animate={{ 
              opacity: 1, 
              scale: poke.scale, 
              y: 0,
              ...(poke.animate === "float" ? {
                y: [0, -20, 0],
                transition: {
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: poke.delay
                }
              } : {})
            }}
            transition={{ 
              delay: poke.delay, 
              type: "spring", 
              stiffness: 260, 
              damping: 20 
            }}
            style={{ 
              left: `calc(50% + ${poke.x})`, 
              bottom: poke.y,
              zIndex: poke.z
            }}
            className="absolute w-32 h-32 sm:w-48 sm:h-48"
          >
            <div className="relative w-full h-full group">
              <Image
                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${poke.id}.png`}
                alt={poke.name}
                fill
                className="object-contain drop-shadow-[0_10px_20px_rgba(0,0,0,0.3)] vibrant-pokemon group-hover:scale-110 transition-transform duration-300"
                priority
              />
              {/* Soft Shadow Under each Pokémon */}
              <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-1/2 h-4 bg-black/10 blur-lg rounded-full -z-10" />
            </div>
          </motion.div>
        ))}
      </div>

      {/* Main Ground Shadow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4/5 h-20 bg-black/5 blur-[60px] rounded-[50%] -z-10" />
    </div>
  );
}
