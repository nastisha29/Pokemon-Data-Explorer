import { apiInstance } from "../utils/api";
import type {
  Pokemon,
  PokemonListResponse,
  PokemonTypeResponse,
} from "../types/pokemon";

const API_URL = "https://pokeapi.co/api/v2";

export const pokemonService = {
  list: {
    getAll: (offset: number = 0, limit: number = 20) =>
      apiInstance
        .get(`${API_URL}/pokemon?offset=${offset}&limit=${limit}`)
        .then((res) => {
          if (!res.ok) throw new Error("Failed to fetch Pokemon list");
          return res.json() as Promise<PokemonListResponse>;
        }),
  },

  pokemon: {
    getById: (id: number) =>
      apiInstance.get(`${API_URL}/pokemon/${id}`).then((res) => {
        if (!res.ok) throw new Error("Pokemon not found");
        return res.json() as Promise<Pokemon>;
      }),

    getByName: (name: string) =>
      apiInstance
        .get(`${API_URL}/pokemon/${name.toLowerCase()}`)
        .then((res) => {
          if (!res.ok) throw new Error("Pokemon not found");
          return res.json() as Promise<Pokemon>;
        }),
  },

  types: {
    getAll: () =>
      apiInstance.get(`${API_URL}/type`).then((res) => {
        if (!res.ok) throw new Error("Failed to fetch types");
        return res
          .json()
          .then((data) =>
            data.results.map((t: { name: string }) => t.name)
          ) as Promise<string[]>;
      }),

    getByName: (typeName: string) =>
      apiInstance
        .get(`${API_URL}/type/${typeName.toLowerCase()}`)
        .then(async (res) => {
          if (!res.ok) throw new Error("Failed to fetch type");
          const data: PokemonTypeResponse = await res.json();
          return {
            name: data.name,
            pokemon: data.pokemon.map((p) => ({
              name: p.pokemon.name,
              url: p.pokemon.url,
            })),
          };
        }),
  },
};
