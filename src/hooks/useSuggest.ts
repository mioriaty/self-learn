import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { LETTER_LENGTH } from 'utils/wordHelper';

type SuggestReturnType = [string, Dispatch<SetStateAction<string>>, (letter: string) => void];

export function useSuggest(): SuggestReturnType {
  const [guest, setGuest] = useState('');

  /**
   * It takes a letter as an argument, and if the letter is a single character and the guest's name is
   * not the maximum length, it adds the letter to the guest's name.
   * @param {string} letter - string - this is the letter that is being passed in from the keyboard.
   */
  const addGuestLetter = (letter: string) => {
    setGuest(prevGuest => {
      const newGuest = letter.length === 1 && prevGuest.length !== LETTER_LENGTH ? prevGuest + letter : prevGuest;

      switch (letter) {
        // If the letter is Backspace, remove the last character from the guest's name
        case 'Backspace':
          return newGuest.slice(0, -1);
        // If the letter is Enter, clear the guest's name if it is the maximum length
        case 'Enter':
          if (newGuest.length === LETTER_LENGTH) {
            return '';
          }
      }
      if (newGuest.length === LETTER_LENGTH) {
        return newGuest;
      }

      return newGuest;
    });
  };

  const handleKeyDown = (event: KeyboardEvent) => {
    const letter = event.key;
    addGuestLetter(letter);
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  });

  return [guest, setGuest, addGuestLetter];
}
