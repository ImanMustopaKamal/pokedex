import { createSlice, Dispatch } from "@reduxjs/toolkit";
import axios from "axios";

interface Sprites {
  sprites: any
}

interface Type {
  pokemon_v2_type: any
}

interface Pokemon {
  name: string;
  url: string;
  pokemon_v2_pokemonsprites: Sprites[];
  pokemon_v2_pokemontypes: Type[];
}

// Define the interface for a Card
interface PokeAPIResponse {
  data: Pokemon[];
}

interface PokemonSprites {
  other: {
    dream_world: {
      front_default: string | null;
      front_female: string | null;
    };
  };
}

interface PokemonDetails {
  id: number;
  name: string;
  sprites: PokemonSprites;
}

interface PokemonState {
  pokemons: Pokemon[];
  pokemonDetail: PokemonDetails[];
}

const initialState: PokemonState = {
  pokemons: [],
  pokemonDetail: [],
};

const pokemonSlice = createSlice({
  name: "pokemon",
  initialState,
  reducers: {
    getPokemonSuccess(state, action) {
      const resources = action.payload.pokemons;
      state.pokemons = resources;
    },
  },
});

export const { getPokemonSuccess } =
  pokemonSlice.actions;

export default pokemonSlice.reducer;

export function getResources() {
  return async (dispatch: Dispatch) => {
    try {
      
      const response = await axios<PokeAPIResponse>({
        url: "https://beta.pokeapi.co/graphql/v1beta",
        method: "post",
        data: {
          query: `
          query samplePokeAPIquery {
            pokemons: pokemon_v2_pokemon(limit: 10, offset: 0, where: {}) {
              name
              id
              height
              pokemon_v2_pokemonsprites {
                sprites
              }
              pokemon_v2_pokemontypes {
                pokemon_v2_type {
                  name
                }
              }
            }
          }
            `,
        },
      })

      const data = response.data.data
      
      dispatch(getPokemonSuccess(data));
    } catch (error) {
      console.log(error);
    }
  };
}
