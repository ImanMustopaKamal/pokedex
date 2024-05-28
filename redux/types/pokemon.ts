export interface Pokemon {
  name: string;
  url: string;
}

export interface PokeAPIResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Pokemon[];
}

export interface PokemonSprites {
  other: {
    dream_world: {
      front_default: string | null;
      front_female: string | null;
    };
  };
}

export interface PokemonDetails {
  id: number;
  name: string;
  sprites: PokemonSprites;
}

export interface PokemonState {
  pokemons: PokeAPIResponse;
}

export interface PokemonDetailsState {
  details: PokemonDetails[];
}
