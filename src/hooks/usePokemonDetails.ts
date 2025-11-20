import { useQuery } from "@tanstack/react-query";
import { pokemonService } from "../services/pokemonService";

export const usePokemonDetails = (id: number) => {
  return useQuery({
    queryKey: ["pokemon", id],
    queryFn: () => pokemonService.pokemon.getById(id),
    staleTime: 1000 * 60 * 60, // 1 hour
    gcTime: 1000 * 60 * 60 * 24 * 7, // 7 days
  });
};

export const usePokemonByName = (name: string) => {
  return useQuery({
    queryKey: ["pokemon", name],
    queryFn: () => pokemonService.pokemon.getByName(name),
    enabled: !!name,
    staleTime: 1000 * 60 * 60, // 1 hour
    gcTime: 1000 * 60 * 60 * 24 * 7, // 7 days
  });
};
