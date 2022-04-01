import { FC } from 'react';
import { ThemeProvider } from 'wiloke-react-core';
import { themeOverrides } from './themeOverrides';

export const AppProvider: FC = ({ children }) => {
  return <ThemeProvider themeOverrides={{ ...themeOverrides }}>{children}</ThemeProvider>;
};
