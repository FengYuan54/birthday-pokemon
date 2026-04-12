"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, RefreshCw } from "lucide-react";

export function ResultNav({ y, m, d }: { y: string; m: string; d: string }) {
  return (
    <div className="flex justify-between items-center max-w-md mx-auto">
      <Link href="/" className="group flex items-center space-x-2 text-[10px] font-black tracking-[0.2em] text-gray-400 hover:text-pk-red transition-all uppercase">
        <motion.div 
          whileHover={{ x: -4 }}
          whileTap={{ scale: 0.9 }}
          className="p-2 glass rounded-xl group-hover:bg-pk-red group-hover:text-white transition-all shadow-sm bg-white/50"
        >
          <ArrowLeft className="w-4 h-4" />
        </motion.div>
        <span>RETRY</span>
      </Link>
      <Link href={`/result?y=${y}&m=${m}&d=${d}`} className="group flex items-center space-x-2 text-[10px] font-black tracking-[0.2em] text-gray-400 hover:text-pk-blue transition-all uppercase text-right">
        <span>NEW QUOTE</span>
        <motion.div 
          whileHover={{ rotate: 180 }}
          whileTap={{ scale: 0.9 }}
          className="p-2 glass rounded-xl group-hover:bg-pk-blue group-hover:text-white transition-all shadow-sm bg-white/50"
        >
          <RefreshCw className="w-4 h-4" />
        </motion.div>
      </Link>
    </div>
  );
}
