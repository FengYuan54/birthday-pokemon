import Image from "next/image";

export function PokemonWall() {
  // 生成前 60 个宝可梦的高清艺术图 URL
  const pokemonIds = Array.from({ length: 64 }, (_, i) => i + 1);
  
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden opacity-[0.03] pointer-events-none select-none">
      <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 xl:grid-cols-12 gap-8 sm:gap-12 p-8 w-[140%] -ml-[20%] -mt-[10%] rotate-[-12deg]">
        {pokemonIds.map((id) => (
          <div key={id} className="relative aspect-square transform transition-transform duration-1000 hover:scale-110">
            <Image
              src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`}
              alt="Pokemon Background"
              fill
              className="object-contain grayscale contrast-125"
              sizes="(max-width: 768px) 100px, 200px"
            />
          </div>
        ))}
      </div>
      {/* 渐变遮罩，确保内容可读性 */}
      <div className="absolute inset-0 bg-gradient-to-b from-white via-transparent to-white" />
    </div>
  );
}
