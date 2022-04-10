import { css, Theme } from 'wiloke-react-core';
import { RgbColors } from 'wiloke-react-core/dist/types/RgbColors';

export const container = css`
  debug: Navigation-container;
  display: flex;
  width: 100%;
  padding: 10px;
  overflow: hidden;
`;

export const link = ({ fonts }: Theme) => css`
  debug: Navigation-link;
  text-decoration: none;
  display: flex;
  align-items: center;
  width: 100%;
  font-size: 16px;
  line-height: 21px;
  font-weight: 500;
  padding: 10px 15px;
  border-radius: 6px;
  font-family: ${fonts.primary};
  border-width: 3px;
  border-color: transparent;
  transition: 0.1 all ease;
`;

export const active = (color: RgbColors) => css`
  debug: Navigation-active-link;
  color: rgb(${color.rgbPrimary}) !important;
  border-color: ${color.rgbPrimary} !important;
  border-radius: 95% 4% 97% 5%/4% 94% 3% 95% !important;
  transform: rotate(2deg);
`;

export const parent = css`
  position: relative;
  display: block;
  padding: 0px 10px;
`;

export const icon = css`
  line-height: 18px;
  margin-right: 20px;
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
`;
