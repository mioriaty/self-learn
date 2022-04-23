import { css, Theme } from 'wiloke-react-core';

export const container = css`
  width: 100vw;
  height: 100vh;

  position: relative;
  overflow: hidden;
`;

export const dark = ({ colors }: Theme) => css`
  position: absolute;
  left: 0;
  top: 0;
  height: 100%;
  width: 50%;
  background-color: ${colors.dark};
`;

export const light = ({ colors }: Theme) => css`
  position: absolute;
  right: 0;
  top: 0;
  height: 100%;
  width: 50%;
  background-color: ${colors.light};
`;

export const intro = ({ colors }: Theme) => css`
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  height: 55vh;
  width: 65vw;
  position: absolute;
  background: linear-gradient(to right, rgb(${colors.rgbLight}) 50%, rgb(${colors.rgbDark}) 50%) center bottom / 100% 2px no-repeat,
    linear-gradient(to right, rgb(${colors.rgbLight}) 50%, rgb(${colors.rgbDark}) 50%) center top;
  background-repeat: no-repeat;
  border-left: 2px solid rgb(${colors.rgbLight});
  border-right: 2px solid rgb(${colors.rgbDark});

  background-image: linear-gradient(to right, rgb(${colors.rgbLight}) 50%, rgb(${colors.rgbDark}) 50%),
    linear-gradient(to right, rgb(${colors.rgbLight}) 50%, rgb(${colors.rgbDark}) 50%);
  background-position-x: center, center;
  background-position-y: bottom, top;
  background-size: 100% 2px;
  background-repeat-x: no-repeat;
  background-repeat-y: no-repeat;
  background-attachment: initial, initial;
  background-origin: initial, initial;
  background-clip: initial, initial;
  background-color: initial;
  background-repeat: no-repeat;

  display: flex;
`;

export const introLeft = css`
  height: 100%;
  width: 50%;
`;

export const introRight = css`
  height: 100%;
  width: 50%;
`;
