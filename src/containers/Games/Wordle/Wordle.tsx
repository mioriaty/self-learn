import { Keyboard, WordRow } from 'components/WordleComponents';
import { usePrevious } from 'hooks/usePrevious';
import { useSuggest } from 'hooks/useSuggest';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { isValidWord, LETTER_LENGTH } from 'utils/wordHelper';
import { View } from 'wiloke-react-core';
import { GUESS_LENGTH, useAddGuessLetter, useResetNewGame, wordleSelector } from '..';

export const Wordle = () => {
  const [guess, setGuess, addGuessLetter] = useSuggest();
  const previousGuess = usePrevious(guess);
  const [showInvalidGuess, setInvalidGuess] = useState(false);
  const state = useSelector(wordleSelector);
  const addGuess = useAddGuessLetter();
  const newGame = useResetNewGame();

  useEffect(() => {
    let id: NodeJS.Timeout;
    if (showInvalidGuess) {
      id = setTimeout(() => setInvalidGuess(false), 2000);
    }
    return () => {
      clearTimeout(id);
    };
  }, [showInvalidGuess]);

  useEffect(() => {
    if (guess.length === 0 && previousGuess?.length === LETTER_LENGTH) {
      if (isValidWord(previousGuess)) {
        addGuess({ guess: previousGuess });
        setInvalidGuess(false);
      } else {
        setInvalidGuess(true);
        setGuess(previousGuess);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [guess]);

  let rows = [...state.rows];
  let currentRow = 0;

  if (rows.length < GUESS_LENGTH) {
    currentRow = rows.push({ guess }) - 1;
  }

  const numOfGuessesRemaining = GUESS_LENGTH - rows.length;

  const isGameOver = state.gameState !== 'playing';

  rows = rows.concat(Array(numOfGuessesRemaining).fill(''));

  return (
    <View>
      <View tagName="main" className="grid grid-rows-6 gap-4 mb-4">
        {rows.map(({ guess, result }, index) => (
          <WordRow key={index} letters={guess} result={result} className={showInvalidGuess && currentRow === index ? `animate-bounce` : ``} />
        ))}
      </View>

      <Keyboard
        onClick={letter => {
          addGuessLetter(letter);
        }}
        keyboardLetter={state.keyboardLetterState}
      />

      {isGameOver && (
        <div
          role="modal"
          className="absolute left-0 right-0 grid w-11/12 grid-rows-4 p-6 mx-auto text-center bg-black border border-gray-500 rounded-lg h-1/2 top-1/4"
        >
          {state.gameState === 'won' ? (
            <span className="pt-12 text-6xl font-semibold text-white">You Won!</span>
          ) : (
            <span className="text-4xl font-semibold text-white">Game Over!</span>
          )}

          {state.gameState === 'lost' && <WordRow letters={state.answer} className="items-center justify-items-center" />}

          <button
            className="absolute left-0 right-0 block p-2 mx-auto mt-4 font-bold text-white bg-green-500 border border-green-500 rounded top-56 hover:opacity-90 w-28"
            onClick={() => {
              newGame({});
              setGuess('');
            }}
          >
            NEW GAME
          </button>
        </div>
      )}
    </View>
  );
};
