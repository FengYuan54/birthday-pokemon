import type { Metadata } from "next";
import { Luckiest_Guy, Staatliches, Inter, Quicksand, DotGothic16 } from "next/font/google";

const quicksand = Quicksand({
  variable: "--font-quicksand",
  subsets: ["latin"],
});

const dotGothic = DotGothic16({
  variable: "--font-dot-gothic",
  weight: "400",
  subsets: ["latin"],
});
import "./globals.css";
import { AuthProvider } from "@/components/AuthProvider";
import { Navbar } from "@/components/Navbar";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const luckiestGuy = Luckiest_Guy({
  variable: "--font-luckiest-guy",
  weight: "400",
  subsets: ["latin"],
});

const staatliches = Staatliches({
  variable: "--font-staatliches",
  weight: "400",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "生日宝可梦 - 寻找你的命中注定",
  description: "根据生日匹配你的本命宝可梦，探索属于你的神奇羁绊！",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="zh-CN"
      className={`${inter.variable} ${luckiestGuy.variable} ${staatliches.variable} ${quicksand.variable} ${dotGothic.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col text-gray-900">
        <AuthProvider>
          <Navbar />
          <main className="flex-1 max-w-7xl mx-auto w-full px-4 py-8 sm:px-6 lg:px-8">
            {children}
          </main>
          <footer className="py-8 text-center text-sm text-gray-500 border-t border-gray-100 bg-white">
            <p>© 2026 birth-pokemon. Powered by PokeAPI. -stillFY</p>
          </footer>
        </AuthProvider>
      </body>
    </html>
  );
}
