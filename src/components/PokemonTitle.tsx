"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const characters = [
  { 
    name: "Pikachu", 
    src: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png", 
    x: "15%", 
    y: "-35%", 
    scale: 0.8,
    delay: 0.8 
  },
  { 
    name: "Squirtle", 
    src: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/7.png", 
    x: "30%", 
    y: "-30%", 
    scale: 0.6,
    delay: 1.0 
  },
  { 
    name: "Psyduck", 
    src: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/54.png", 
    x: "50%", 
    y: "-32%", 
    scale: 0.7,
    delay: 1.2 
  },
  { 
    name: "Charmander", 
    src: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/4.png", 
    x: "70%", 
    y: "-30%", 
    scale: 0.6,
    delay: 1.4 
  },
  { 
    name: "Eevee", 
    src: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/133.png", 
    x: "85%", 
    y: "-35%", 
    scale: 0.6,
    delay: 1.6 
  },
];

export function PokemonTitle() {
  return (
    <div className="relative flex flex-col items-center select-none pt-16 pb-8">
      {/* Secondary Line: MY BIRTHDAY */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="mb-[-1.5rem] z-10"
      >
        <h2 className="birthday-logo-style text-4xl sm:text-5xl md:text-6xl uppercase tracking-[0.2em]">
          My Birthday
        </h2>
      </motion.div>

      {/* Primary Line: POKÉMON with Characters Standing on it */}
      <div className="relative">
        {/* Characters standing on the letters */}
        {characters.map((char) => (
          <motion.div
            key={char.name}
            initial={{ opacity: 0, y: 20, scale: 0 }}
            animate={{ opacity: 1, y: 0, scale: char.scale }}
            transition={{ 
              delay: char.delay, 
              type: "spring", 
              stiffness: 260, 
              damping: 20 
            }}
            style={{ 
              left: char.x, 
              top: char.y,
              zIndex: 30
            }}
            className="absolute w-24 h-24 sm:w-32 sm:h-32 character-standing"
          >
            <div className="relative w-full h-full">
              <Image
                src={char.src}
                alt={char.name}
                fill
                className="object-contain drop-shadow-[0_5px_5px_rgba(0,0,0,0.3)]"
                priority
              />
            </div>
          </motion.div>
        ))}

        {/* The Main "POKÉMON" Text */}
        <motion.div
          initial={{ scale: 0.5, opacity: 0, rotateX: 45 }}
          animate={{ scale: 1, opacity: 1, rotateX: 0 }}
          transition={{ duration: 1, ease: "backOut" }}
          className="relative"
        >
          <h1 className="classic-pokemon-logo text-7xl sm:text-9xl md:text-[10rem] uppercase">
            POKÉMON
            <span className="classic-pokemon-logo-inner absolute top-0 left-0 w-full h-full">
              POKÉMON
            </span>
          </h1>
        </motion.div>
      </div>

      {/* Decorative Shine Effect */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-32 bg-pk-yellow/20 blur-[100px] -z-10 animate-pulse" />
    </div>
  );
}
