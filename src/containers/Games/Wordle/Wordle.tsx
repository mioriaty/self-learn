import { Keyboard, WordRow } from 'components/WordleComponents';
import { usePrevious } from 'hooks/usePrevious';
import { useSuggest } from 'hooks/useSuggest';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { isValidWord, LETTER_LENGTH } from 'utils/wordHelper';
import { Text, View } from 'wiloke-react-core';
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
      <View css={{ textAlign: 'center' }}>
        <Text tagName="h1" fontFamily="secondary" size={25} color="primary" css={{ textTransform: 'uppercase' }}>
          The answer is
        </Text>
        <View borderColor="primary" borderStyle="dotted" borderWidth={2} className={`word-row-container grid grid-cols-5 gap-4 bg-green mb-4`}>
          {state.answer.split('').map((char, index) => {
            const hiddenChar = index === 1 || index === 2 || index === 3;
            return (
              <Text
                key={index}
                tagName="span"
                className={`character-box text-2xl font-bold text-center before:inline-block before:content-['_'] uppercase border border-gray-300`}
                color={hiddenChar ? 'transparent' : 'primary'}
                backgroundColor={hiddenChar ? 'secondary' : 'quaternary'}
                css={{ height: '50px', padding: '16px', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}
              >
                {hiddenChar ? '' : char}
              </Text>
            );
          })}
        </View>
      </View>
      <View tagName="main" className="grid grid-rows-6 gap-4 mb-4">
        {rows.map(({ guess, result }, index) => {
          const isWrong = showInvalidGuess && currentRow === index;
          return <WordRow key={index} letters={guess} result={result} className={isWrong ? `border-double border-4 border-indigo-600` : ``} />;
        })}
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
