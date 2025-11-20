import { useQuery } from "@tanstack/react-query";
import { pokemonService } from "../services/pokemonService";

export const usePokemonList = (offset: number, limit: number) => {
  return useQuery({
    queryKey: ["pokemonList", offset, limit],
    queryFn: () => pokemonService.list.getAll(offset, limit),
    staleTime: 1000 * 60 * 60, // 1 hour
    gcTime: 1000 * 60 * 60 * 24, // 24 hours
  });
};
