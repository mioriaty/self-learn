import { css } from 'wiloke-react-core';

export const top = css`
  margin-left: 3rem;
`;

export const bottom = css`
  position: absolute;
  bottom: -50px;
  right: 3rem;
`;

export const ui = css`
  width: 100%;
  display: flex;
  justify-content: center;
  position: absolute;
  bottom: 25px;
`;

export const uiBox = css`
  position: relative;
  width: 320px;
`;

export const rock_icon = css`
  position: absolute;
  bottom: 0px;
  left: 0;
  margin-bottom: 30px;
`;

export const paper_icon = css`
  position: absolute;
  bottom: 0;
  left: 40%;
  margin-bottom: 80px;
`;

export const scissors_icon = css`
  position: absolute;
  bottom: 0;
  right: 0;
  margin-bottom: 30px;
`;
export const random_icon = css`
  position: absolute;
  bottom: -65px;
  left: 37%;
`;

export const score = css`
  width: 100%;
`;
export const hpBoxUser = css`
  position: absolute;
  left: 30px;
  bottom: 35%;
`;

export const hpBoxInnerUser = css`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const user_hp_avatar = css`
  position: absolute;
  top: 9vh;
`;
export const userHp = css`
  -webkit-appearance: none;
  appearance: none;
  height: 10px;
  transform: rotate(-90deg);
`;
export const cpu = css`
  transform: rotate(90deg);
`;
export const hpBoxCpu = css`
  position: absolute !important;
  right: 30px;
  top: 20%;
`;
export const cpu_hp_avatar = css`
  position: absolute;
  bottom: 9vh;
`;
//   .user-hp::-webkit-progress-bar {
//     background-color: #232586;
//     border-radius: 7px;
//   }

//   .user-hp::-webkit-progress-value {
//     background-color: #ffb24c;
//     border-radius: 7px;
//   }
//   .cpu::-webkit-progress-value {
//     background-color: #90c67b;
//     border-radius: 7px;
//   }
//   .user-hp::-moz-progress-bar {
//     background-color: #232586;
//     border-radius: 7px;
//   }
//   .user-hp::-moz-progress-value {
//     background-color: #ffb24c;
//     border-radius: 7px;
//   }

export const result = css`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 100vh;
`;
export const resultMsg = css`
  font-weight: 700;
  font-size: 21px;
  color: #ffb24c;
  line-height: 25px;
  margin-top: 2rem;
`;
export const resultScore = css`
  font-weight: 500;
  font-size: 41px;
  color: #ffffff;
  line-height: 49px;
  margin-bottom: 2rem;
`;

export const splash = css`
  background-image: url('./assets/img/splash_bg.svg');
  height: 100vh;
  background-repeat: no-repeat;
  background-position: center;
  background-size: contain;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  background-color: #f5f7fb;
`;

export const button = css`
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

  &:hover {
    box-shadow: initial;
  }
`;

//   @media screen and (max-width: 600px) {
//     .splash {
//       background-size: cover;
//     }
//     .top {
//       margin-left: 3rem;
//     }

//     .hp-box-cpu {
//       right: -30px;
//     }

//     .hp-box-user {
//       left: -30px;
//     }
//   }

//   @media screen and (max-height: 700px) {
//     .top {
//       margin-left: 3rem;
//     }

//     .splash button {
//       margin-bottom: 5rem;
//       width: calc(196px - 10%);
//       height: calc(53px - 10px);
//     }
//     .rock_icon,
//     .scissors_icon {
//       margin-bottom: 25px;
//     }
//     .bottom img {
//       width: 90%;
//     }
//     .top img {
//       width: 45%;
//     }
//     .user_hp_avatar {
//       top: 12vh;
//     }
//     .cpu_hp_avatar {
//       bottom: 12vh;
//     }
//     .rock_icon {
//       left: 50px;
//     }
//     .scissors_icon {
//       right: 40px;
//     }
//   }
