import wordBank from 'data/wordle/word-bank.json';

export const getRandomWord = () => {
  const randomIndex = Math.floor(Math.random() * wordBank.valid.length);

  return wordBank.valid[randomIndex];
};

export const LETTER_LENGTH = 5;

export enum LetterState {
  Miss,
  Present,
  Match,
}

/**
 * It takes a guess and an answer, and returns an array of LetterState values that represent the state
 * of each letter in the guess
 * @param {string} guess - The user's guess
 * @param {string} answer - The answer to the puzzle.
 * @returns An array of LetterState
 */
export const computeGuess = (guess: string, answer: string): LetterState[] => {
  const result: LetterState[] = [];

  if (guess.length !== answer.length) {
    return result;
  }

  const guessArray = guess.split('');
  const answerArray = answer.split('');

  const match = guessArray.map(letter => ({
    letter: letter,
    state: LetterState.Miss,
  }));

  for (let i = guessArray.length - 1; i >= 0; i--) {
    if (answer[i] === guessArray[i]) {
      match[i].state = LetterState.Match;
      answerArray.splice(i, 1);
    }
  }

  guessArray.forEach((letter, i) => {
    if (answerArray.includes(letter) && match[i].state !== LetterState.Match) {
      match[i].state = LetterState.Present;
      answerArray.splice(answerArray.indexOf(letter), 1);
    }
  });

  match.forEach(letter => {
    result.push(letter.state);
  });

  return result;
};

export const isValidWord = (guess: string): boolean => {
  return wordBank.valid.concat(wordBank.invalid).includes(guess);
};
