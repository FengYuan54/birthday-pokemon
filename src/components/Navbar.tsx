"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { User, LogOut, History, Gift, Circle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function Navbar() {
  const { data: session } = useSession();

  return (
    <nav className="sticky top-0 z-50 px-6 py-6 flex justify-between items-center max-w-7xl mx-auto w-full">
      <Link href="/">
        <motion.div 
          whileHover={{ scale: 1.1, rotate: 2 }}
          whileTap={{ scale: 0.9, rotate: -2 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
          className="flex items-center group cursor-pointer"
        >
          {/* Hand-drawn style SVG Pokeball - High Res SVG */}
          <svg width="48" height="48" viewBox="0 0 100 100" className="mr-3 drop-shadow-[0_4px_8px_rgba(0,0,0,0.15)]">
            <defs>
              <filter id="hand-drawn" x="-10%" y="-10%" width="120%" height="120%">
                <feTurbulence type="fractalNoise" baseFrequency="0.05" numOctaves="2" result="noise" />
                <feDisplacementMap in="SourceGraphic" in2="noise" scale="2" />
              </filter>
            </defs>
            <g filter="url(#hand-drawn)">
              <circle cx="50" cy="50" r="45" fill="white" stroke="#1A1A1A" strokeWidth="5" />
              <path d="M5 50 A45 45 0 0 1 95 50 L5 50" fill="#FF5A5F" stroke="#1A1A1A" strokeWidth="5" />
              <circle cx="50" cy="50" r="12" fill="white" stroke="#1A1A1A" strokeWidth="5" />
              <circle cx="50" cy="50" r="4" fill="#1A1A1A" />
              <line x1="5" y1="50" x2="38" y2="50" stroke="#1A1A1A" strokeWidth="5" strokeLinecap="round" />
              <line x1="62" y1="50" x2="95" y2="50" stroke="#1A1A1A" strokeWidth="5" strokeLinecap="round" />
            </g>
          </svg>
          <div className="flex flex-col">
            <span className="text-2xl font-black italic tracking-tighter text-pk-dark-blue font-luckiest-guy leading-none pokemon-font">
              POKÉ<span className="text-pk-red">BDAY</span>
            </span>
            <span className="text-[8px] font-black tracking-[0.4em] text-gray-400 uppercase ml-1 pokemon-font">Partner Finder</span>
          </div>
        </motion.div>
      </Link>

      <div className="flex items-center space-x-2 sm:space-x-4">
        {session && (
          <>
            <Link
              href="/history"
              className="p-2 hover:bg-gray-100 rounded-xl transition-colors text-gray-400 hover:text-pk-blue"
              title="History"
            >
              <History className="w-6 h-6" />
            </Link>
            <div className="h-6 w-px bg-gray-200 mx-2 hidden sm:block" />
            <div className="flex items-center bg-gray-50 pl-3 pr-1 py-1 rounded-2xl border border-gray-100">
              <span className="text-xs font-black text-gray-500 mr-2 hidden sm:block truncate max-w-[80px]">
                {session.user?.name}
              </span>
              <button
                onClick={() => signOut()}
                className="p-2 bg-white text-gray-400 hover:text-pk-red rounded-xl shadow-sm transition-all"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          </>
        )}
      </div>
    </nav>
  );
}
