import { useQueries, useQuery } from "@tanstack/react-query";
import { pokemonService } from "../services/pokemonService";
import { useMemo } from "react";

export const useSearchPokemon = (
  searchQuery: string,
  currentPage: number,
  itemsPerPage: number
) => {
  const allNamesQuery = useQuery({
    queryKey: ["allPokemonNames"],
    queryFn: () => pokemonService.list.getAll(0, 10000),
    staleTime: Infinity,
    gcTime: 1000 * 60 * 60 * 24 * 30, // 30 days
  });

  const searchMatchedIds = useMemo(() => {
    if (!searchQuery || !allNamesQuery.data?.results) return [];

    const matches = allNamesQuery.data.results
      .filter((p) => p.name.toLowerCase().includes(searchQuery.toLowerCase()))
      .map((p) => {
        const id = parseInt(p.url.split("/").slice(-2, -1)[0]);
        return id;
      })
      .slice(0, 100);

    return matches;
  }, [searchQuery, allNamesQuery.data]);

  const { data, isLoading, isError } = useQueries({
    queries: searchMatchedIds
      .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
      .map((id) => ({
        queryKey: ["pokemon", id] as const,
        queryFn: () => pokemonService.pokemon.getById(id),
        staleTime: 1000 * 60 * 60,
        gcTime: 1000 * 60 * 60 * 24 * 7,
      })),
    combine: (results) => ({
      data: results
        .filter((q) => q.isSuccess && q.data)
        .map((q) => {
          const pokemon = q.data!;
          return {
            id: pokemon.id,
            name: pokemon.name,
            types: pokemon.types.map((t) => t.type.name),
            sprite: pokemon.sprites.front_default,
          };
        }),
      isLoading: results.some((q) => q.isPending),
      isError: results.some((q) => q.isError),
    }),
  });

  return {
    data,
    totalCount: searchMatchedIds.length,
    isLoading: allNamesQuery.isLoading || isLoading,
    isError: allNamesQuery.isError || isError,
  };
};
