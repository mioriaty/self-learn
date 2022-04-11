import { FC } from 'react';
import { LetterState, LETTER_LENGTH } from 'utils/wordHelper';
import { View } from 'wiloke-react-core';
import { CharacterBox } from './CharacterBox';

export interface WordRowProps {
  letters: string;
  result?: LetterState[];
  className?: string;
}

export const WordRow: FC<WordRowProps> = ({ letters: letterProp = '', className = '', result = [] }) => {
  const letterRemaining = LETTER_LENGTH - letterProp.length;
  const letters = letterProp.split('').concat(Array(letterRemaining).fill(''));

  return (
    <View className={`grid grid-cols-5 gap-4 bg-green ${className}`}>
      {letters.map((char, index) => (
        <CharacterBox key={index} value={char} state={result[index]} />
      ))}
    </View>
  );
};
