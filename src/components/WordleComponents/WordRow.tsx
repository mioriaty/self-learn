import { FC } from 'react';
import { LetterState, LETTER_LENGTH } from 'utils/wordHelper';
import { View, ViewProps } from 'wiloke-react-core';
import { CharacterBox } from './CharacterBox';

export interface WordRowProps {
  letters: string;
  result?: LetterState[];
  className?: string;
  css?: ViewProps['css'];
}

export const WordRow: FC<WordRowProps> = ({ letters: letterProp = '', className = '', result = [], css }) => {
  const letterRemaining = LETTER_LENGTH - letterProp.length;
  const letters = letterProp.split('').concat(Array(letterRemaining).fill(''));

  return (
    <View css={css} className={`word-row-container grid grid-cols-5 gap-4 bg-green ${className}`}>
      {letters.map((char, index) => (
        <CharacterBox key={index} value={char} state={result[index]} />
      ))}
    </View>
  );
};
