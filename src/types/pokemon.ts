export interface PokemonType {
  type: {
    name: string;
    url: string;
  };
}

export interface PokemonSprite {
  front_default: string;
  other: {
    "official-artwork": {
      front_default: string;
    };
  };
}

export interface PokemonAbility {
  ability: {
    name: string;
    url: string;
  };
  is_hidden: boolean;
}

export interface PokemonStat {
  base_stat: number;
  effort: number;
  stat: {
    name: string;
    url: string;
  };
}

export interface Pokemon {
  id: number;
  name: string;
  types: PokemonType[];
  sprites: PokemonSprite;
  abilities: PokemonAbility[];
  stats: PokemonStat[];
  height: number;
  weight: number;
}

export interface PokemonListItem {
  name: string;
  url: string;
}

export interface PokemonListResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: PokemonListItem[];
}

export interface PokemonTableData {
  id: number;
  name: string;
  types: string[];
  sprite: string;
}

export interface PokemonTypeResponse {
  name: string;
  pokemon: {
    pokemon: {
      name: string;
      url: string;
    };
  }[];
}
