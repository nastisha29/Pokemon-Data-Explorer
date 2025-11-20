import { useQueries, useQuery } from "@tanstack/react-query";
import { pokemonService } from "../services/pokemonService";
import { useMemo } from "react";
import type { PokemonTableData } from "../types/pokemon";

export const usePokemonTypes = () => {
  return useQuery({
    queryKey: ["pokemonTypes"],
    queryFn: pokemonService.types.getAll,
    staleTime: Infinity,
    gcTime: 1000 * 60 * 60 * 24 * 30, // 30 days
  });
};

export const usePokemonByType = (typeName: string) => {
  return useQuery({
    queryKey: ["pokemonByType", typeName],
    queryFn: () => pokemonService.types.getByName(typeName),
    enabled: !!typeName,
    staleTime: Infinity,
    gcTime: 1000 * 60 * 60 * 24 * 30, // 30 days
  });
};

export const usePokemonByTypeData = (
  typeName: string,
  currentPage: number,
  itemsPerPage: number
) => {
  const typeQuery = usePokemonByType(typeName);

  const typePokemonIds = useMemo(() => {
    if (!typeQuery.data?.pokemon) return [];
    return typeQuery.data.pokemon
      .map((p) => {
        const id = parseInt(p.url.split("/").slice(-2, -1)[0]);
        return id;
      })
      .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
  }, [typeQuery.data, currentPage, itemsPerPage]);

  const typePokemonQueries = useQueries({
    queries: typePokemonIds.map((id) => ({
      queryKey: ["pokemon", id] as const,
      queryFn: () => pokemonService.pokemon.getById(id),
      staleTime: 1000 * 60 * 60,
      gcTime: 1000 * 60 * 60 * 24 * 7,
    })),
    combine: (results) => {
      const data: PokemonTableData[] = results
        .filter((q) => q.isSuccess && q.data)
        .map((q) => {
          const pokemon = q.data!;
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
      };
    },
  });

  return {
    data: typePokemonQueries.data,
    totalCount: typeQuery.data?.pokemon.length || 0,
    isLoading: typeQuery.isLoading || typePokemonQueries.isLoading,
    isError: typeQuery.isError || typePokemonQueries.isError,
  };
};
