import axios from "axios";

export const TOTAL_POKEMON = 1025;

/**
 * 核心算法：将生日转换为宝可梦 ID
 * 方案：月份 * 100 + 日期，超过上限则取模
 */
export function getPokemonIdByBirthday(month: number, day: number): number {
  let id = month * 100 + day;
  if (id > TOTAL_POKEMON) {
    id = (id % TOTAL_POKEMON) + 1;
  }
  return id;
}

export interface PokemonDetails {
  id: number;
  name: string;
  types: string[];
  imageUrl: string;
  height: number;
  weight: number;
  description: string;
}

export async function fetchPokemonDetails(id: number): Promise<PokemonDetails> {
  try {
    const [pokemonRes, speciesRes] = await Promise.all([
      axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`),
      axios.get(`https://pokeapi.co/api/v2/pokemon-species/${id}`),
    ]);

    const pokemonData = pokemonRes.data;
    const speciesData = speciesRes.data;

    // 获取中文名称
    const chineseName = speciesData.names.find(
      (n: any) => n.language.name === "zh-Hans" || n.language.name === "zh-Hant"
    )?.name || pokemonData.name;

    // 获取中文描述
    const chineseDescription = speciesData.flavor_text_entries.find(
      (entry: any) => (entry.language.name === "zh-Hans" || entry.language.name === "zh-Hant")
    )?.flavor_text.replace(/\f/g, " ") || "这是一只神秘的宝可梦。";

    return {
      id: pokemonData.id,
      name: chineseName,
      types: pokemonData.types.map((t: any) => t.type.name),
      imageUrl: pokemonData.sprites.other["official-artwork"].front_default || pokemonData.sprites.front_default,
      height: pokemonData.height / 10, // 分米转米
      weight: pokemonData.weight / 10, // 100克转千克
      description: chineseDescription,
    };
  } catch (error) {
    console.error("Error fetching pokemon details:", error);
    throw new Error("无法获取宝可梦数据，请稍后再试。");
  }
}

export function generateBirthdayMessage(pokemonName: string, month: number, day: number): string {
  const messages = [
    `哇！你是 ${month}月${day}日 出生的，你的本命宝可梦是 ${pokemonName}！`,
    `命中注定！${month}月${day}日 与 ${pokemonName} 产生了神奇的羁绊！`,
    `在这个特别的日子里，${pokemonName} 来为你庆祝生日啦！`,
  ];
  return messages[Math.floor(Math.random() * messages.length)];
}
