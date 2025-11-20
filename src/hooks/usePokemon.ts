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

export const usePokemonTypes = () => {
  return useQuery({
    queryKey: ["pokemonTypes"],
    queryFn: pokemonService.types.getAll,
    staleTime: Infinity,
    gcTime: 1000 * 60 * 60 * 24 * 30, // 30 days
  });
};
