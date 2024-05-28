import { createSlice, Dispatch } from "@reduxjs/toolkit";
import axios from "axios";

interface Pokemon {
  name: string;
  url: string;
}

// Define the interface for a Card
interface PokeAPIResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Pokemon[];
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
  // Define the fields you are interested in
  id: number;
  name: string;
  sprites: PokemonSprites;
  // Add more fields as necessary
}

// Define the interface for the state managed by this slice
interface PokemonState {
  pokemons: PokeAPIResponse;
  pokemonDetail: PokemonDetails[];
}

// Define the initial state for this slice
const initialState: PokemonState = {
  pokemons: {
    count: 0,
    next: null,
    previous: null,
    results: [],
  },
  pokemonDetail: [{
    id: 0,
    name: "",
    sprites: {
      other: {
        dream_world: {
          front_default: "",
          front_female: "",
        },
      },
    },
  }],
};

// Create a Redux slice for managing card data
const pokemonSlice = createSlice({
  name: "pokemon", // Name of the slice
  initialState, // Initial state
  reducers: {
    // Define a reducer for a successful resource fetch
    getPokemonSuccess(state, action) {
      const resources = action.payload;
      state.pokemons = resources;
    },
    getDetailPokemonSucces(state, action) {
      const resources = action.payload;
      state.pokemonDetail = resources;
    },
  },
});

// Export the action creator for getPokemonSuccess
export const { getPokemonSuccess, getDetailPokemonSucces } =
  pokemonSlice.actions;
// export const { getPokemonDetailsSuccess } = pokemonDetailSlice.actions;

// Export the reducer
export default pokemonSlice.reducer;

// Define an asynchronous action creator to fetch card resources from an API
export function getResources() {
  return async (dispatch: Dispatch) => {
    try {
      // Make an HTTP GET request to the API
      const response = await axios.get<PokeAPIResponse>(
        "https://pokeapi.co/api/v2/pokemon?limit=10&offset=0"
      );

      // console.log("response.data: ", response.data)
      // Extract card resources from the API response
      const resources: PokeAPIResponse = response.data;

      // Extract the Pokémon URLs from the response
      const pokemonUrls = response.data.results.map((pokemon) => pokemon.url);
      // console.log("🚀 ~ return ~ pokemonUrls:", pokemonUrls);

      // Fetch details for each Pokémon
      const pokemonDetailsPromises = pokemonUrls.map((url) =>
        axios.get<PokemonDetails>(url)
      );
      const pokemonDetailsResponses = await Promise.all(pokemonDetailsPromises);

      // Extract the data from each response
      const pokemonDetails = pokemonDetailsResponses.map((res) => res.data);
      // console.log("🚀 ~ return ~ pokemonDetails:", pokemonDetails);

      // Dispatch the getPokemonSuccess action to update the Redux state
      dispatch(getPokemonSuccess(resources));

      dispatch(getDetailPokemonSucces(pokemonDetails));
    } catch (error) {
      console.log(error);
    }
  };
}
