import { combineReducers } from 'redux';

// import slices
import pokemonSlice from './slices/pokemon';
// import pokemonDetailSlice from './slices/pokemonDetail';

const rootReducer = combineReducers({
  pokemons: pokemonSlice,
  // pokemonDetails: pokemonDetailSlice,
});

export default rootReducer;