import { fetchPokemonDetails, getPokemonIdByBirthday, generateBirthdayMessage } from "@/lib/pokemon";
import { PokemonCard } from "@/components/PokemonCard";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import Link from "next/link";
import { ArrowLeft, RefreshCw, AlertCircle } from "lucide-react";

export default async function ResultPage({
  searchParams,
}: {
  searchParams: Promise<{ y?: string; m?: string; d?: string }>;
}) {
  const { y, m, d } = await searchParams;

  if (!y || !m || !d) {
    return (
      <div className="text-center py-20 glass rounded-[3rem] max-w-sm mx-auto border-b-[12px] border-black/5">
        <AlertCircle className="w-12 h-12 text-pk-red mx-auto mb-4" />
        <h1 className="text-xl font-black italic tracking-tighter uppercase text-pk-dark-blue">Invalid Parameters</h1>
        <Link href="/" className="mt-6 inline-flex items-center space-x-2 text-gray-400 hover:text-pk-red font-black tracking-widest text-[10px] uppercase">
          <ArrowLeft className="w-3 h-3" />
          <span>GO BACK</span>
        </Link>
      </div>
    );
  }

  const year = parseInt(y);
  const month = parseInt(m);
  const day = parseInt(d);

  const pokemonId = getPokemonIdByBirthday(month, day);
  
  try {
    const pokemon = await fetchPokemonDetails(pokemonId);
    const message = generateBirthdayMessage(pokemon.name, month, day);

    // 保存到历史记录
    const session = await getServerSession(authOptions);
    if (session?.user?.email) {
      const user = await prisma.user.findUnique({
        where: { email: session.user.email },
      });

      if (user) {
        await prisma.pokemonHistory.create({
          data: {
            userId: user.id,
            birthday: new Date(year, month - 1, day),
            pokemonId: pokemon.id,
            pokemonName: pokemon.name,
            imageUrl: pokemon.imageUrl,
          },
        });
      }
    }

    return (
      <div className="space-y-12 pb-20 px-4">
        <div className="flex justify-between items-center max-w-md mx-auto">
          <Link href="/" className="group flex items-center space-x-2 text-[10px] font-black tracking-[0.2em] text-gray-400 hover:text-pk-red transition-all uppercase">
            <div className="p-2 glass rounded-xl group-hover:bg-pk-red group-hover:text-white transition-all shadow-sm">
              <ArrowLeft className="w-4 h-4" />
            </div>
            <span>RETRY</span>
          </Link>
          <Link href={`/result?y=${y}&m=${m}&d=${d}`} className="group flex items-center space-x-2 text-[10px] font-black tracking-[0.2em] text-gray-400 hover:text-pk-blue transition-all uppercase text-right">
            <span>NEW QUOTE</span>
            <div className="p-2 glass rounded-xl group-hover:bg-pk-blue group-hover:text-white transition-all shadow-sm">
              <RefreshCw className="w-4 h-4" />
            </div>
          </Link>
        </div>

        <PokemonCard pokemon={pokemon} message={message} />
      </div>
    );
  } catch (error) {
    return (
      <div className="text-center py-20 glass rounded-[3rem] shadow-xl max-w-sm mx-auto px-10 border-b-[12px] border-black/5">
        <div className="w-16 h-16 bg-pk-red/10 text-pk-red rounded-full flex items-center justify-center mx-auto mb-6">
          <RefreshCw className="w-8 h-8 animate-spin-slow" />
        </div>
        <h1 className="text-2xl font-black italic uppercase tracking-tighter text-pk-dark-blue">Connection Lost</h1>
        <p className="text-[10px] font-black text-gray-400 tracking-[0.1em] uppercase mt-2 mb-8">PokeAPI is taking a nap...</p>
        <Link href="/" className="w-full bg-pk-red text-white px-8 py-4 rounded-2xl font-black italic tracking-tight hover:scale-105 transition-all shadow-xl shadow-pk-red/20 inline-block uppercase">
          RETRY
        </Link>
      </div>
    );
  }
}
