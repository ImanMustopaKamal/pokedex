// pokemonDetailsSlice.ts

import { createSlice, Dispatch } from "@reduxjs/toolkit";
import axios from "axios";
import { PokemonDetails, PokemonDetailsState } from "@/redux/types/pokemon";

// Define the initial state for this slice
const initialState: PokemonDetailsState = {
  details: [],
};

// Create a Redux slice for managing Pokémon details
const pokemonDetailsSlice = createSlice({
  name: "pokemonDetails", // Name of the slice
  initialState, // Initial state
  reducers: {
    // Define a reducer for a successful detail fetch
    getPokemonDetailsSuccess(state, action) {
      state.details = action.payload;
    },
  },
});

// Export the action creator for getPokemonDetailsSuccess
export const { getPokemonDetailsSuccess } = pokemonDetailsSlice.actions;

// Export the reducer
export default pokemonDetailsSlice.reducer;

// Define an asynchronous action creator to fetch Pokémon details from URLs
export function fetchPokemonDetails(urls: string[]) {
  return async (dispatch: Dispatch) => {
    try {
      // Fetch details for each Pokémon
      const pokemonDetailsPromises = urls.map(url => axios.get<PokemonDetails>(url));
      const pokemonDetailsResponses = await Promise.all(pokemonDetailsPromises);

      // Extract the data from each response
      const pokemonDetails = pokemonDetailsResponses.map(res => res.data);

      // Dispatch the getPokemonDetailsSuccess action to update the Redux state
      dispatch(getPokemonDetailsSuccess(pokemonDetails));
    } catch (error) {
      console.log(error);
    }
  };
}