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

  @media (max-width: 768px) {
    width: 100%;
    height: 50%;
  }
`;

export const light = ({ colors }: Theme) => css`
  position: absolute;
  right: 0;
  top: 0;
  height: 100%;
  width: 50%;
  background-color: ${colors.light};

  @media (max-width: 768px) {
    width: 100%;
    height: 50%;
    bottom: 0;
    top: unset;
  }
`;

export const intro = ({ colors }: Theme) => css`
  debug: intro-container;
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
  background-size: 100% 2px;

  display: flex;

  @media (max-width: 768px) {
    border-top: 2px solid rgb(${colors.rgbLight});
    border-bottom: 2px solid rgb(${colors.rgbDark});

    border-left: unset;
    border-right: unset;
  }
`;

export const introLeft = css`
  height: 100%;
  width: 50%;
`;

export const introRight = css`
  height: 100%;
  width: 50%;
`;
