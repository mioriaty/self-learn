import { computeGuess, getRandomWord, LetterState } from 'utils/wordHelper';
import { createSlice, handleAction } from 'wiloke-react-core/utils';
import { AddGuessLetter, ResetNewGame } from './actions';

export const GUESS_LENGTH = 6;

interface GuessRow {
  guess: string;
  result?: LetterState[];
}

type WordleActions = AddGuessLetter | ResetNewGame;

interface WordleState {
  answer: string;
  rows: GuessRow[];
  gameState: 'playing' | 'won' | 'lost';
  keyboardLetterState: { [letter: string]: LetterState };
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
  ],
});
