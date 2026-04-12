import { RefreshCw } from "lucide-react";

export default function Loading() {
  return (
    <div className="flex flex-col items-center justify-center py-32 space-y-6">
      <div className="relative p-4 bg-pk-red rounded-full animate-shake shadow-2xl">
         <div className="w-12 h-12 border-8 border-black/80 rounded-full flex items-center justify-center bg-white">
            <div className="w-2.5 h-2.5 bg-black/80 rounded-full" />
         </div>
      </div>
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-black italic text-pk-dark-blue font-luckiest-guy uppercase tracking-widest animate-pulse">
          Searching for your partner...
        </h2>
        <p className="text-[10px] font-black text-gray-400 tracking-[0.3em] uppercase">
          Tuning Pokédex Frequencies
        </p>
      </div>
    </div>
  );
}
