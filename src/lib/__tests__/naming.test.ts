import { describe, it, expect } from "vitest";
import { getChineseName } from "../pokemonNames";

describe("Pokemon Naming Logic", () => {
  it("should prioritize mapped Chinese names", () => {
    expect(getChineseName(25, "Pikachu")).toBe("皮卡丘");
    expect(getChineseName(1, "Bulbasaur")).toBe("妙蛙种子");
    expect(getChineseName(1025, "Terapagos")).toBe("太乐巴戈斯");
  });

  it("should fallback to provided name if no mapping exists", () => {
    // 假设 999 号没有手动映射
    expect(getChineseName(999, "Guzzlord")).toBe("Guzzlord");
  });

  it("should handle all IDs from 1 to 1025 without crashing", () => {
    for (let i = 1; i <= 1025; i++) {
      const name = getChineseName(i, "Fallback");
      expect(typeof name).toBe("string");
    }
  });
});
