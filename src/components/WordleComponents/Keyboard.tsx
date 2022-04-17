import Button from 'components/Button';
import { KeyboardLetterState } from 'containers/Games';
import { FC, MouseEvent } from 'react';
import { LetterState } from 'utils/wordHelper';
import { View } from 'wiloke-react-core';

const keyboardKeys = [
  ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
  ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'],
  ['Enter', 'z', 'x', 'c', 'v', 'b', 'n', 'm', 'Backspace'],
];

const backspace = (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.5"
      d="M12 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2M3 12l6.414 6.414a2 2 0 001.414.586H19a2 2 0 002-2V7a2 2 0 00-2-2h-8.172a2 2 0 00-1.414.586L3 12z"
    ></path>
  </svg>
);

const keyStateStyles = {
  [LetterState.Miss]: 'bg-gray-800',
  [LetterState.Present]: 'bg-yellow-500',
  [LetterState.Match]: 'bg-green-500',
};

export interface KeyboardProps {
  keyboardLetter: KeyboardLetterState;
  onClick?: (key: string) => void;
}

export const Keyboard: FC<KeyboardProps> = ({ onClick, keyboardLetter }) => {
  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    const { textContent } = e.currentTarget;

    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    // const returnProps = textContent!;
    // if (textContent !== innerHTML) {
    //   returnProps = 'Backspace';
    // }

    onClick?.(textContent ?? '');
  };

  const renderKeyboards = () => {
    return keyboardKeys.map((keyboardRow, rowIndex) => (
      <View key={rowIndex} className="flex justify-center space-x-1 text-white" css={{ margin: '2px 0' }}>
        {keyboardRow.map((key, index) => {
          let styles = 'rounded font-bold uppercase flex-1 py-2';
          const letterSpace = keyStateStyles[keyboardLetter[key]];

          if (letterSpace) {
            styles += 'text-white px-1' + letterSpace;
          } else if (key !== '') {
            styles += 'bg-gray-600';
          }
          if (key === '') {
            styles += 'pointer-events-none';
          } else {
            styles += 'px-1';
          }

          return (
            <Button key={key + index} onClick={handleClick} className={styles}>
              {key === 'delete' ? backspace : key}
            </Button>
          );
        })}
      </View>
    ));
  };

  return <View className={`flex flex-col`}>{renderKeyboards()}</View>;
};
