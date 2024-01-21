import { getPokemonById } from "../../src/js-foundation/06-promises";

describe("js-foundation/06-promises.ts", () => {
  test("getPokemonById should return a Pokemon", async () => {
    const pokemonName = await getPokemonById(1);

    expect(pokemonName).toBe("bulbasaur");
  });

  test("getPokemonById should return an error if pokemon does not exist", async () => {
    const pokemonId = 100000;
    try {
      const pokemonName = await getPokemonById(pokemonId);

      // expect(pokemonName).toBeUndefined();
    } catch (error) {
      expect(error).toBe(`Pokemon not found with id ${pokemonId}`);
    }
  });
});
