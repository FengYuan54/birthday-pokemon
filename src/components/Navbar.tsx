"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { User, LogOut, History, Gift, Circle } from "lucide-react";

export function Navbar() {
  const { data: session } = useSession();

  return (
    <nav className="sticky top-0 z-50 px-4 py-4">
      <div className="max-w-5xl mx-auto glass rounded-[2rem] px-6 py-3 shadow-xl shadow-black/5 border-b-4 border-black/5 flex justify-between items-center">
        <Link href="/" className="flex items-center group">
          <div className="relative p-1 bg-pk-red rounded-full group-hover:animate-shake mr-3">
             <div className="w-8 h-8 border-4 border-black/80 rounded-full flex items-center justify-center bg-white">
                <div className="w-1.5 h-1.5 bg-black/80 rounded-full" />
             </div>
          </div>
          <span className="text-xl font-black italic tracking-tighter text-pk-dark-blue">
            POKÉ<span className="text-pk-red">BDAY</span>
          </span>
        </Link>

        <div className="flex items-center space-x-2 sm:space-x-4">
          {session ? (
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
          ) : (
            <Link
              href="/login"
              className="bg-pk-blue text-white px-6 py-2 rounded-xl font-black italic tracking-tight hover:scale-105 active:scale-95 transition-all shadow-lg shadow-pk-blue/20"
            >
              LOGIN
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
