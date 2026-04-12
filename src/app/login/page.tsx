"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Mail, Lock, LogIn, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        setError("AUTH FAILED");
      } else {
        router.push("/");
        router.refresh();
      }
    } catch (err) {
      setError("ERROR");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-200px)] px-4">
      <div className="w-full max-w-sm glass rounded-[3rem] shadow-2xl overflow-hidden border-b-[12px] border-black/5">
        <div className="p-10 space-y-8">
          <div className="text-center space-y-2">
            <div className="relative p-2 bg-pk-red rounded-full w-16 h-16 flex items-center justify-center mx-auto shadow-xl animate-float">
               <div className="w-10 h-10 border-4 border-black/80 rounded-full flex items-center justify-center bg-white">
                  <div className="w-2 h-2 bg-black/80 rounded-full" />
               </div>
            </div>
            <h1 className="text-4xl font-black italic tracking-tighter text-pk-dark-blue pt-4 uppercase">Trainer Login</h1>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1">
              <div className="relative group">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-6 py-4 bg-gray-50 border-none rounded-2xl focus:ring-4 focus:ring-pk-blue/20 outline-none transition-all font-black text-gray-700 text-center uppercase text-sm tracking-widest"
                  placeholder="EMAIL"
                />
              </div>
            </div>

            <div className="space-y-1">
              <div className="relative group">
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-6 py-4 bg-gray-50 border-none rounded-2xl focus:ring-4 focus:ring-pk-blue/20 outline-none transition-all font-black text-gray-700 text-center uppercase text-sm tracking-widest"
                  placeholder="PASSWORD"
                />
              </div>
            </div>

            {error && (
              <p className="text-[10px] font-black text-pk-red text-center tracking-widest animate-shake">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-pk-blue text-white py-4 rounded-2xl font-black italic tracking-tight text-xl hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-50 shadow-xl shadow-pk-blue/20 flex items-center justify-center space-x-2"
            >
              {loading ? (
                <div className="w-6 h-6 border-4 border-white/20 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  <LogIn className="w-5 h-5" />
                  <span>START JOURNEY</span>
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
