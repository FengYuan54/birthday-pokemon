import axios from "axios";
import { getChineseName } from "./pokemonNames";

export const TOTAL_POKEMON = 1025;

/**
 * 优化后的核心算法：
 * 1. 80% 概率：沿用基于月日的映射算法 (month * 100 + day)
 * 2. 20% 概率：触发隐藏彩蛋，随机匹配 1-100 号宝可梦
 * 3. 稳定性：使用生日（年/月/日）作为种子，确保同一用户匹配结果唯一且映射准确。
 */
export function getPokemonIdByBirthday(year: number, month: number, day: number): number {
  // 使用生日生成一个确定的“伪随机”因子 (0-99)
  const seed = (year * 31 + month * 12 + day) % 100;
  
  // 20% 概率触发彩蛋 (seed < 20)
  if (seed < 20) {
    // 确保编号严格落在 1-100 区间
    // 使用 seed 和年份进一步偏移，增加年份差异性
    let eggId = ((seed * year + month + day) % 100) + 1;
    // 确保映射准确
    return Math.max(1, Math.min(100, eggId));
  }

  // 80% 概率走原有逻辑
  let id = month * 100 + day;
  if (id > TOTAL_POKEMON) {
    id = (id % TOTAL_POKEMON) + 1;
  }
  
  // 即使在原有逻辑下，也加入年份微调（保持 80% 稳定性）
  if (year % 5 === 0) {
    id = (id + (year % 30)) % TOTAL_POKEMON || 1;
  }

  return id;
}

export interface PokemonDetails {
  id: number;
  name: string;
  enName: string;
  types: string[];
  imageUrl: string;
  height: number;
  weight: number;
  description: string;
}

export async function fetchPokemonDetails(id: number): Promise<PokemonDetails> {
  try {
    const api = axios.create({
      baseURL: "https://pokeapi.co/api/v2",
      timeout: 10000, // 10s timeout
    });

    const [pokemonRes, speciesRes] = await Promise.all([
      api.get(`/pokemon/${id}`),
      api.get(`/pokemon-species/${id}`),
    ]);

    const pokemonData = pokemonRes.data;
    const speciesData = speciesRes.data;

    // 获取中文名称：优先使用拦截器
    const apiChineseName = speciesData.names.find(
      (n: any) => n.language.name === "zh-Hans" || n.language.name === "zh-Hant"
    )?.name || pokemonData.name;

    const chineseName = getChineseName(id, apiChineseName);

    // 获取英文名称 (首字母大写)
    const englishName = pokemonData.name.charAt(0).toUpperCase() + pokemonData.name.slice(1);

    // 获取中文描述
    const chineseDescription = speciesData.flavor_text_entries.find(
      (entry: any) => (entry.language.name === "zh-Hans" || entry.language.name === "zh-Hant")
    )?.flavor_text.replace(/\f/g, " ") || "这是一只神秘的宝可梦。";

    return {
      id: pokemonData.id,
      name: chineseName,
      enName: englishName,
      types: pokemonData.types.map((t: any) => t.type.name),
      imageUrl: pokemonData.sprites.other["official-artwork"].front_default || pokemonData.sprites.front_default,
      height: pokemonData.height / 10,
      weight: pokemonData.weight / 10,
      description: chineseDescription,
    };
  } catch (error: any) {
    if (axios.isCancel(error)) {
      console.error(`[ERROR] Request for Pokemon #${id} was aborted.`);
    } else {
      console.error(`[ERROR] Failed to fetch Pokemon details for #${id}:`, error.message);
    }
    throw new Error("无法获取宝可梦数据，请稍后再试。");
  }
}

/**
 * 萌系主题文案：聚焦邂逅、缘分、契合度
 */
export function generateBirthdayMessage(pokemonName: string, month: number, day: number): string {
  const messages = [
    `✨ 叮咚！你与 ${pokemonName} 的波导频率完全一致，是命中注定的伙伴呢！`,
    `🌸 在这个交错的时空里，${pokemonName} 跨越山海只为与你相遇呀~`,
    `⭐ 捕捉到一枚超强缘分！感觉你和 ${pokemonName} 连性格都超级契合喔！`,
    `🌈 嘿嘿，发现啦！${pokemonName} 正在对你使出“甜甜香气”，看来它很喜欢你呢~`,
    `🍀 这种奇妙的亲密度，难道你就是 ${pokemonName} 一直在等的那个训练家吗？`,
    `🏮 羁绊的红线已经牵好啦！快和 ${pokemonName} 开启专属的冒险吧~`,
    `🍭 确认过眼神，${pokemonName} 觉得你散发着全世界最温柔的光芒喔！`,
    `🎨 你的灵魂颜色，和 ${pokemonName} 的属性磁场简直是绝配呀！`,
  ];
  return messages[Math.floor(Math.random() * messages.length)];
}
