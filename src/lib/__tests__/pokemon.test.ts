import { describe, it, expect } from "vitest";
import { getPokemonIdByBirthday, TOTAL_POKEMON } from "../pokemon";

describe("Pokemon Algorithm", () => {
  it("should return correct ID for normal dates", () => {
    // 1月5日 -> 105
    expect(getPokemonIdByBirthday(1, 5)).toBe(105);
    // 10月24日 -> 1024
    expect(getPokemonIdByBirthday(10, 24)).toBe(1024);
  });

  it("should handle overflow (results > TOTAL_POKEMON)", () => {
    // 12月31日 -> 1231
    // 1231 > 1025
    // 1231 % 1025 + 1 = 206 + 1 = 207
    expect(getPokemonIdByBirthday(12, 31)).toBe(207);
  });

  it("should always return an ID within the valid range", () => {
    for (let m = 1; m <= 12; m++) {
      for (let d = 1; d <= 31; d++) {
        const id = getPokemonIdByBirthday(m, d);
        expect(id).toBeGreaterThanOrEqual(1);
        expect(id).toBeLessThanOrEqual(TOTAL_POKEMON);
      }
    }
  });
});
