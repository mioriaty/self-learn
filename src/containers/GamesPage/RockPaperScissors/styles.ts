import splashBg from 'assets/images/splash_bg.svg';
import { css } from 'wiloke-react-core';

export const container = css`
  debug: RPS-container;
  position: relative;
  overflow: hidden;
  min-height: 700px;
`;

export const top = css`
  debug: RPS-top;
  margin-left: 0;
`;

export const bottom = css`
  debug: RPS-bottom;
  position: absolute;
  bottom: -50px;
  right: 0;
`;

export const ui = css`
  debug: RPS-ui;
  width: 100%;
  display: flex;
  justify-content: center;
  position: absolute;
  bottom: 25px;
`;

export const uiBox = css`
  debug: RPS-ui-box;
  position: relative;
  width: 320px;

  img {
    cursor: pointer;
  }
`;

export const rock_icon = css`
  debug: RPS-rock-icon;
  position: absolute;
  bottom: 0px;
  left: 0;
  margin-bottom: 30px;
`;

export const paper_icon = css`
  debug: RPS-paper-icon;
  position: absolute;
  bottom: 0;
  left: 40%;
  margin-bottom: 80px;
`;

export const scissors_icon = css`
  debug: RPS-scissors-icon;
  position: absolute;
  bottom: 0;
  right: 0;
  margin-bottom: 30px;
`;

export const random_icon = css`
  debug: RPS-random-icon;
  position: absolute;
  bottom: -65px;
  left: 37%;
`;

export const score = css`
  debug: RPS-score;
  width: 100%;
`;

export const hpBoxUser = css`
  debug: RPS-hp-box-user;
  position: absolute;
  left: 120px;
  bottom: 35%;
`;

export const hpBoxInnerUser = css`
  debug: RPS-hp-box-inner-user;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const user_hp_avatar = css`
  debug: RPS-user-hp-avatar;
  position: absolute;
  top: 9vh;
`;

export const userHp = css`
  debug: RPS-user-hp;
  -webkit-appearance: none;
  appearance: none;
  height: 10px;
  transform: rotate(-90deg);

  &::-webkit-progress-bar {
    background-color: #232586;
    border-radius: 7px;
  }

  &::-webkit-progress-value {
    background-color: #ffb24c;
    border-radius: 7px;
  }
`;

export const cpu = css`
  debug: RPS-cpu;
  transform: rotate(90deg);

  &::-webkit-progress-value {
    background-color: #90c67b;
    border-radius: 7px;
  }
`;

export const hpBoxCpu = css`
  debug: RPS-hp-box-cpu;
  position: absolute !important;
  right: 120px;
  top: 20%;
`;

export const cpu_hp_avatar = css`
  debug: RPS-spu-hp-avatar;
  position: absolute;
  bottom: 9vh;
`;

export const result = css`
  debug: RPS-result;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 800px;
`;

export const resultMsg = css`
  debug: RPS-result-msg;
  font-weight: 700;
  font-size: 21px;
  color: #ffb24c;
  line-height: 25px;
  margin-top: 2rem;
`;

export const resultScore = css`
  debug: RPS-result-score;
  font-weight: 500;
  font-size: 41px;
  color: #ffb24c;
  line-height: 49px;
  margin-bottom: 2rem;
`;

export const splash = css`
  debug: RPS-splash;
  background-image: url(${splashBg});
  height: 700px;
  background-repeat: no-repeat;
  background-position: center;
  background-size: contain;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  background-color: #f5f7fb;
`;

export const button = css`
  debug: RPS-button;
  border: none;
  outline: none;
  background: #f1aa83;
  border-radius: 20px;
  font-weight: 700;
  font-size: 22px;
  line-height: 19px;
  text-transform: uppercase;
  color: #000000;
  width: 196px;
  height: 53px;
  margin-bottom: 10rem;
  box-shadow: 0px 6px 0px #ea9975;
`;
