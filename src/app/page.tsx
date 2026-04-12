import { BirthdayForm } from "@/components/BirthdayForm";
import { PokemonWall } from "@/components/PokemonWall";
import { Sparkles, Zap, Flame, Droplets } from "lucide-react";

export default function Home() {
  return (
    <div className="relative flex flex-col items-center justify-center min-h-[calc(100vh-160px)] px-4 overflow-hidden">
      <PokemonWall />
      
      {/* Background Decor */}
      <div className="absolute top-20 left-10 text-pk-yellow opacity-10 -rotate-12 animate-float">
        <Zap size={120} />
      </div>
      <div className="absolute bottom-20 right-10 text-pk-blue opacity-10 rotate-12 animate-float" style={{ animationDelay: '1s' }}>
        <Droplets size={140} />
      </div>
      <div className="absolute top-1/2 right-20 text-pk-red opacity-10 -rotate-45 animate-float" style={{ animationDelay: '2s' }}>
        <Flame size={100} />
      </div>

      {/* Main Content */}
      <div className="relative z-10 w-full max-w-4xl flex flex-col items-center text-center space-y-12">
        <div className="space-y-4">
          <div className="inline-flex items-center space-x-2 px-3 py-1 bg-pk-red/10 text-pk-red rounded-full text-xs font-black tracking-[0.2em] uppercase border border-pk-red/20 shadow-sm font-staatliches">
            <Sparkles className="w-3 h-3" />
            <span>Discover Your Partner</span>
          </div>
          
          <h1 className="text-6xl sm:text-8xl font-black tracking-tighter leading-none font-luckiest-guy">
            <span className="text-pk-dark-blue">MY BIRTHDAY</span> <br />
            <span className="bg-gradient-to-r from-pk-red via-pk-yellow to-pk-blue bg-clip-text text-transparent drop-shadow-sm">
              POKÉMON
            </span>
          </h1>
        </div>

        <div className="w-full flex justify-center pt-4">
          <BirthdayForm />
        </div>

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
