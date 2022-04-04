import { css, Theme } from 'wiloke-react-core';

export const container = (active: boolean) => ({ colors }: Theme) => css`
  debug: Collapse_container;
  background-color: ${colors.light};
  border: 1px solid ${colors.gray3};
  border-radius: 6px;
  border-color: ${active ? colors.primary : colors.gray3};
`;
