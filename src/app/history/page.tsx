import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { formatDate } from "@/lib/utils";
import { History, ArrowRight, Gift } from "lucide-react";

export default async function HistoryPage() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    redirect("/login");
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    include: {
      history: {
        orderBy: { createdAt: "desc" },
      },
    },
  });

  if (!user || user.history.length === 0) {
    return (
      <div className="text-center py-20 glass rounded-[3rem] shadow-xl max-w-sm mx-auto p-10 space-y-8 border-b-[12px] border-black/5">
        <div className="relative p-2 bg-pk-red/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto">
          <History className="w-8 h-8 text-pk-red" />
        </div>
        <div className="space-y-1">
          <h1 className="text-2xl font-black italic uppercase tracking-tighter text-pk-dark-blue">No Data</h1>
          <p className="text-[10px] font-black text-gray-400 tracking-[0.2em] uppercase">Catch 'em all first!</p>
        </div>
        <Link
          href="/"
          className="w-full bg-pk-red text-white px-8 py-4 rounded-2xl font-black italic tracking-tight hover:scale-105 transition-all shadow-xl shadow-pk-red/20 inline-block uppercase"
        >
          START
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-10 pb-20 max-w-5xl mx-auto px-4">
      <div className="flex items-center space-x-4">
        <div className="p-3 bg-pk-red text-white rounded-2xl shadow-xl shadow-pk-red/20">
          <History className="w-6 h-6" />
        </div>
        <div>
          <h1 className="text-4xl font-black italic tracking-tighter text-pk-dark-blue uppercase">LOGS</h1>
          <p className="text-[10px] font-black text-gray-400 tracking-[0.3em] uppercase">Your Pokémon Journey</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {user.history.map((item) => (
          <Link
            key={item.id}
            href={`/result?y=${item.birthday.getFullYear()}&m=${item.birthday.getMonth() + 1}&d=${item.birthday.getDate()}`}
            className="group relative glass p-6 rounded-[2.5rem] shadow-sm hover:shadow-2xl transition-all border-b-[8px] border-black/5 flex flex-col items-center text-center hover:-translate-y-2"
          >
            <div className="absolute top-4 right-6 opacity-5 font-black italic text-4xl">
              #{item.pokemonId.toString().padStart(4, "0")}
            </div>
            
            <div className="relative w-32 h-32 mb-4 drop-shadow-xl group-hover:scale-110 transition-transform duration-500">
              <Image
                src={item.imageUrl}
                alt={item.pokemonName}
                fill
                className="object-contain"
              />
            </div>
            
            <div className="space-y-2 w-full">
              <p className="text-[10px] font-black text-pk-blue uppercase tracking-widest bg-pk-blue/5 py-1 px-3 rounded-full inline-block">
                {formatDate(item.birthday)}
              </p>
              <div className="flex flex-col items-center">
                <h2 className="text-2xl font-normal text-gray-900 tracking-tighter uppercase italic font-luckiest-guy">
                  {item.pokemonName.split(" / ")[0]}
                </h2>
                {item.pokemonName.includes(" / ") && (
                  <p className="text-xs font-black text-gray-400 uppercase tracking-widest font-staatliches">
                    {item.pokemonName.split(" / ")[1]}
                  </p>
                )}
              </div>
              <div className="pt-4 border-t border-gray-50 flex items-center justify-center text-[10px] font-black text-gray-400 group-hover:text-pk-red transition-colors tracking-widest uppercase">
                <span>View Details</span>
                <ArrowRight className="w-3 h-3 ml-1 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
