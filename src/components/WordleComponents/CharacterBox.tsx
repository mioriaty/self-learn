import { LetterState } from 'utils/wordHelper';
import { Text } from 'wiloke-react-core';

interface CharacterBoxProps {
  value: string;
  state?: LetterState;
}

const characterStateStyles = {
  [LetterState.Miss]: 'bg-gray-800 border-gray-800',
  [LetterState.Present]: 'bg-yellow-500 border-yellow-500',
  [LetterState.Match]: 'bg-green-500 border-green-500',
};

export const CharacterBox = ({ value, state }: CharacterBoxProps) => {
  const stateStyles = state == null ? '' : characterStateStyles[state];

  return (
    <Text
      tagName="span"
      className={`character-box text-2xl font-bold text-center before:inline-block before:content-['_'] uppercase border border-gray-300 ${stateStyles}`}
      color="primary"
      css={{ height: '50px', padding: '16px', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}
    >
      {value}
    </Text>
  );
};
