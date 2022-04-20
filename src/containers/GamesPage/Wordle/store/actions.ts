export interface AddGuessLetter {
  type: 'addGuessLetter';
  payload: {
    guess: string;
  };
}

export interface ResetNewGame {
  type: 'resetNewGame';
  payload: {
    initialGuess?: string[];
  };
}
