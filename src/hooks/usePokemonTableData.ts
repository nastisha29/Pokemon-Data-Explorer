import { useQueries } from "@tanstack/react-query";
import { pokemonService } from "../services/pokemonService";
import { useMemo } from "react";
import type { Pokemon, PokemonTableData } from "../types/pokemon";
import { usePokemonList } from "./usePokemonList";

export const usePokemonTableData = (offset: number, limit: number) => {
  const listQuery = usePokemonList(offset, limit);

  const pokemonIds = useMemo(() => {
    if (!listQuery.data?.results) return [];
    return listQuery.data.results.map((p) => {
      const id = parseInt(p.url.split("/").slice(-2, -1)[0]);
      return id;
    });
  }, [listQuery.data]);

  const pokemonQueries = useQueries({
    queries: pokemonIds.map((id) => ({
      queryKey: ["pokemon", id] as const,
      queryFn: () => pokemonService.pokemon.getById(id),
      staleTime: 1000 * 60 * 60, // 1 hour
      gcTime: 1000 * 60 * 60 * 24 * 7, // 7 days
      enabled: pokemonIds.length > 0,
    })),
    combine: (results) => {
      const data: PokemonTableData[] = results
        .filter((q) => q.isSuccess && q.data)
        .map((q) => {
          const pokemon = q.data as Pokemon;
          return {
            id: pokemon.id,
            name: pokemon.name,
            types: pokemon.types.map((t) => t.type.name),
            sprite: pokemon.sprites.front_default,
          };
        });

      return {
        data,
        isLoading: results.some((q) => q.isPending),
        isError: results.some((q) => q.isError),
        error: results.find((q) => q.error)?.error,
      };
    },
  });

  return {
    data: pokemonQueries.data || [],
    totalCount: listQuery.data?.count || 0,
    isLoading: listQuery.isLoading || pokemonQueries.isLoading,
    isError: listQuery.isError || pokemonQueries.isError,
    error: listQuery.error || pokemonQueries.error,
  };
};
