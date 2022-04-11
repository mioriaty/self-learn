import { combineReducers } from 'redux';
import { wordleSlice } from './Wordle/store/slice';

export * from './Wordle/store/slice';

export const gameReducers = combineReducers({
  wordle: wordleSlice.reducer,
});
