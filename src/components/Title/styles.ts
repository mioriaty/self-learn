import { Styles } from 'wiloke-react-core';

export const container: Styles = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  width: '100%',
};

export const item = (hasText: boolean): Styles => ({
  display: 'flex',
  alignItems: hasText ? 'flex-start' : 'center',
});
