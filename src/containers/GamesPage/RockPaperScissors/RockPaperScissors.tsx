import cpu_hp_avatar from 'assets/images/cpu_hp_avatar.svg';
import femaleIdle from 'assets/images/female_idle.svg';
import female_paper from 'assets/images/female_paper.svg';
import female_rock from 'assets/images/female_rock.svg';
import female_scissors from 'assets/images/female_scissors.svg';
import maleIdle from 'assets/images/male_idle.svg';
import male_paper from 'assets/images/male_paper.svg';
import male_rock from 'assets/images/male_rock.svg';
import male_scissors from 'assets/images/male_scissors.svg';
import paper_icon from 'assets/images/paper_icon.svg';
import random_icon from 'assets/images/random_icon.svg';
import restart from 'assets/images/restart.svg';
import result_cpu from 'assets/images/result_cpu.svg';
import result_user from 'assets/images/result_user.svg';
import rock_icon from 'assets/images/rock_icon.svg';
import scissors_icon from 'assets/images/scissors_icon.svg';
import user_hp_avatar from 'assets/images/user_hp_avatar.svg';

import confetti_sound from 'assets/sounds/confetti.mp3';
import lose_sound from 'assets/sounds/lose.mp3';
import rock_sound from 'assets/sounds/rock.mp3';
import scissors_sound from 'assets/sounds/scissors.mp3';
import paper_sound from 'assets/sounds/slap.mp3';
import start_sound from 'assets/sounds/start.mp3';
import { motion } from 'framer-motion/dist/framer-motion';
import { FC, useEffect, useState } from 'react';
import { useStyleSheet, View } from 'wiloke-react-core';
import * as _styles from './styles';

type Choice = 'rock' | 'paper' | 'scissors';

export const RockPaperScissors: FC = () => {
  const rock_sfx = new Audio(rock_sound);
  const paper_sfx = new Audio(paper_sound);
  const scissors_sfx = new Audio(scissors_sound);
  const confetti_sfx = new Audio(confetti_sound);
  const start_sfx = new Audio(start_sound);
  const lose_sfx = new Audio(lose_sound);
  const choices: Choice[] = ['rock', 'paper', 'scissors'];

  const [userChoice, setUserChoice] = useState(maleIdle);
  const [computerChoice, setComputerChoice] = useState(femaleIdle);
  const [userPoints, setUserPoints] = useState(0);
  const [computerPoints, setComputerPoints] = useState(0);
  const [maleImg, setMaleImg] = useState(maleIdle);
  const [femaleImg, setFemaleImg] = useState(femaleIdle);
  const [result, setResult] = useState("Let's see who wins");
  const [gameOver, setGameOver] = useState(false);
  const [splash, setSplash] = useState(false);

  const randomChoice = choices[Math.floor(Math.random() * choices.length)];

  const { styles } = useStyleSheet();

  useEffect(() => {
    const comboMoves = userChoice + computerChoice;
    if (userPoints <= 4 && computerPoints <= 4) {
      if (comboMoves === 'scissorspaper' || comboMoves === 'rockscissors' || comboMoves === 'paperrock') {
        const updatedUserPoints = userPoints + 1;
        setUserPoints(updatedUserPoints);

        if (updatedUserPoints === 5) {
          setResult('You Win');
          const gameOff = true;
          setTimeout(() => {
            setGameOver(gameOff);
            confetti_sfx.play();
          }, 1000);
        }
      }

      if (comboMoves === 'paperscissors' || comboMoves === 'scissorsrock' || comboMoves === 'rockpaper') {
        // computerPoints.current += 1
        const updatedComputerPoints = computerPoints + 1;
        setComputerPoints(updatedComputerPoints);

        if (updatedComputerPoints === 5) {
          setResult('You Lose');
          const gameOff = true;
          setTimeout(() => {
            setGameOver(gameOff);
            lose_sfx.play();
          }, 1000);
        }
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [computerChoice, userChoice]);

  const generateComputerChoice = () => {
    setComputerChoice(randomChoice);
    console.log('cpu ' + randomChoice);
    if (randomChoice === 'scissors') {
      setFemaleImg(female_scissors);
    } else if (randomChoice === 'rock') {
      setFemaleImg(female_rock);
    } else {
      setFemaleImg(female_paper);
    }
  };

  const handleClick = (value: Choice) => {
    setUserChoice(value);
    generateComputerChoice();
    if (value === 'scissors') {
      setMaleImg(male_scissors);
      if (randomChoice === 'rock') {
        rock_sfx.play();
      } else if (randomChoice === 'paper') {
        scissors_sfx.play();
      }
    } else if (value === 'rock') {
      setMaleImg(male_rock);
      if (randomChoice === 'paper') {
        paper_sfx.play();
      } else if (randomChoice === 'scissors') {
        rock_sfx.play();
      }
    } else {
      setMaleImg(male_paper);
      if (randomChoice === 'scissors') {
        scissors_sfx.play();
      } else if (randomChoice === 'rock') {
        paper_sfx.play();
      }
    }
    console.log('choice user: ' + value);
  };

  const handleReset = () => {
    start_sfx.play();
    setGameOver(false);
    setUserPoints(0);
    setComputerPoints(0);
    setMaleImg(maleIdle);
    setFemaleImg(femaleIdle);
  };

  const randomClick = () => {
    const randomClick = choices[Math.floor(Math.random() * choices.length)];
    setUserChoice(randomClick);
    generateComputerChoice();
    if (randomClick === 'scissors') {
      setMaleImg(male_scissors);
      if (randomChoice === 'rock') {
        rock_sfx.play();
      } else if (randomChoice === 'paper') {
        scissors_sfx.play();
      }
    } else if (randomClick === 'rock') {
      setMaleImg(male_rock);
      if (randomChoice === 'paper') {
        paper_sfx.play();
      } else if (randomChoice === 'scissors') {
        rock_sfx.play();
      }
    } else {
      setMaleImg(male_paper);
      if (randomChoice === 'scissors') {
        scissors_sfx.play();
      } else if (randomChoice === 'rock') {
        paper_sfx.play();
      }
    }
    console.log('random user: ' + randomClick);
  };

  return (
    <View css={_styles.container} borderColor="primary" borderStyle="solid" borderWidth={2}>
      {splash && (
        <>
          {!gameOver && (
            <>
              <View>
                <View className={styles(_styles.top)}>
                  <motion.img
                    key={computerChoice}
                    src={femaleImg}
                    alt=""
                    transition={{
                      ease: 'easeOut',
                      duration: 0.5,
                    }}
                    initial={{ y: -200 }}
                    animate={{ y: -50 }}
                  />{' '}
                </View>
                <View className={styles(_styles.bottom)}>
                  <motion.img
                    src={maleImg}
                    key={userChoice}
                    alt=""
                    transition={{ ease: 'easeOut', duration: 0.5 }}
                    initial={{ y: 200 }}
                    animate={{ y: 50 }}
                  />
                </View>
                <View className={styles(_styles.ui)}>
                  <View className={styles(_styles.uiBox)}>
                    <img src={rock_icon} className={styles(_styles.rock_icon)} onClick={() => handleClick(choices[0])} />
                    <img src={paper_icon} className={styles(_styles.paper_icon)} onClick={() => handleClick(choices[1])} />
                    <img src={scissors_icon} className={styles(_styles.scissors_icon)} onClick={() => handleClick(choices[2])} />
                    <img src={random_icon} className={styles(_styles.random_icon)} onClick={() => randomClick()} />
                  </View>
                </View>
              </View>

              <View className={styles(_styles.score)}>
                {gameOver && <p>{result}</p>}
                <View className={styles(_styles.hpBoxUser)}>
                  <View className={styles(_styles.hpBoxInnerUser)}>
                    <View tagName="progress" className={styles(_styles.userHp)} value={5 - computerPoints} max="5" />
                    <motion.img
                      src={user_hp_avatar}
                      className={styles(_styles.user_hp_avatar)}
                      alt=""
                      key={computerPoints}
                      animate={{
                        rotate: [0, 0, 20, 20, 0, 20, 20, 0],
                      }}
                      transition={{ duration: 0.5 }}
                    />
                  </View>
                </View>
                <View className={styles(_styles.hpBoxCpu)}>
                  <View className={styles(_styles.hpBoxInnerUser)}>
                    <View tagName="progress" className={styles(_styles.userHp, _styles.cpu)} value={5 - userPoints} max="5" />
                    <motion.img
                      src={cpu_hp_avatar}
                      className={styles(_styles.cpu_hp_avatar)}
                      alt=""
                      key={userPoints}
                      animate={{
                        rotate: [0, 0, 20, 20, 0, 20, 20, 0],
                      }}
                      transition={{ duration: 0.5 }}
                    />
                  </View>
                </View>
              </View>
            </>
          )}
          {gameOver && (
            <motion.div
              className={styles(_styles.result)}
              animate={{ scale: 1.3 }}
              transition={{
                duration: 0.5,
              }}
            >
              {result === 'You Win' && <View>Được vl bạn ơi</View>}
              <motion.img
                src={result === 'You Lose' ? result_user : result_cpu}
                alt=""
                animate={{
                  scale: [1, 1.5, 1.5, 1, 1],
                  rotate: [0, 0, 270, 270, 0],
                }}
                transition={{ duration: 1 }}
              />
              <View tagName="p" className={styles(_styles.resultMsg)}>
                {result}
              </View>
              <View tagName="p" className={styles(_styles.resultScore)}>
                {computerPoints} - {userPoints}
              </View>
              <motion.img
                src={restart}
                alt=""
                onClick={handleReset}
                animate={{ scale: [1, 1.2, 1.2, 1, 1] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
              />
            </motion.div>
          )}
        </>
      )}
      {!splash && (
        <motion.div className={styles(_styles.splash)} initial={{ y: 1000 }} transition={{ duration: 1 }} animate={{ y: 0 }}>
          <motion.button
            className={styles(_styles.button)}
            onClick={() => {
              setSplash(true);
              start_sfx.play();
            }}
            animate={{
              rotate: [0, 0, 10, -10, 0],
            }}
            transition={{ repeat: Infinity, duration: 1.2, delay: 1 }}
          >
            Chơi đê
          </motion.button>
        </motion.div>
      )}
    </View>
  );
};
