import { computeGuess, getRandomWord, LetterState } from 'utils/wordHelper';
import { createDispatchAction, createSlice, handleAction } from 'wiloke-react-core/utils';
import { AddGuessLetter, ResetNewGame } from './actions';

export const GUESS_LENGTH = 6;

interface GuessRow {
  guess: string;
  result?: LetterState[];
}

type WordleActions = AddGuessLetter | ResetNewGame;

export type GameState = 'playing' | 'won' | 'lost';

export interface KeyboardLetterState {
  [letter: string]: LetterState;
}

interface WordleState {
  answer: string;
  rows: GuessRow[];
  gameState: GameState;
  keyboardLetterState: KeyboardLetterState;
}

export const wordleSlice = createSlice<WordleState, WordleActions>({
  initialState: {
    answer: getRandomWord(),
    rows: [],
    keyboardLetterState: {},
    gameState: 'playing',
  },
  name: '@Wordle',
  reducers: [
    handleAction('addGuessLetter', ({ state, action }) => {
      const { guess } = action.payload;
      const { answer, keyboardLetterState, rows } = state;
      const result = computeGuess(guess, answer);

      const didWin = result.every(letter => letter === LetterState.Match);

      const _rows = [...rows, { guess, result }];

      result.forEach((re, index) => {
        const resetGuessLetter = guess[index];
        const currentLetter = keyboardLetterState[resetGuessLetter];
        switch (currentLetter) {
          case LetterState.Match: {
            break;
          }
          case LetterState.Present: {
            if (re === LetterState.Miss) break;
            return;
          }
          default:
            keyboardLetterState[resetGuessLetter] = re;
            break;
        }
      });

      return {
        ...state,
        rows,
        keyboardLetterState: keyboardLetterState,
        gameState: didWin ? 'won' : _rows.length === GUESS_LENGTH ? 'lost' : 'playing',
      };
    }),
    handleAction('resetNewGame', ({ state }) => {
      return {
        ...state,
        rows: [],
        keyboardLetterState: {},
        gameState: 'playing',
        answer: getRandomWord(),
      };
    }),
  ],
});

export const { addGuessLetter, resetNewGame } = wordleSlice.actions;

export const useAddGuessLetter = createDispatchAction(addGuessLetter);
export const useResetNewGame = createDispatchAction(resetNewGame);
export const wordleSelector = (state: AppState) => state.games.wordle;
