type TimeFraction = number;
type TimingFnc = (time: number) => number;

export function linear(timeFraction: TimeFraction) {
  return timeFraction;
}

export function quad(timeFraction: TimeFraction) {
  return Math.pow(timeFraction, 2);
}

export function circ(timeFraction: TimeFraction) {
  return 1 - Math.sin(Math.acos(timeFraction));
}

export function back(x: number, timeFraction: TimeFraction) {
  return Math.pow(timeFraction, 2) * ((x + 1) * timeFraction - x);
}

export function bounce(timeFraction: TimeFraction) {
  for (let a = 0, b = 1; 1; a += b, b /= 2) {
    if (timeFraction >= (7 - 4 * a) / 11) {
      const result = -Math.pow((11 - 6 * a - 11 * timeFraction) / 4, 2) + Math.pow(b, 2);

      return result;
    }
  }
}

export function elastic(x: number, timeFraction: TimeFraction) {
  return Math.pow(2, 10 * (timeFraction - 1)) * Math.cos(((20 * Math.PI * x) / 3) * timeFraction);
}
/**
 * Accepts a timing function, returns the transformed variant
 */

export function makeEaseOut(timing: TimingFnc) {
  return function (timeFraction: TimeFraction) {
    return 1 - timing(1 - timeFraction);
  };
}

export function makeEaseInOut(timing: TimingFnc) {
  return function (timeFraction: TimeFraction) {
    if (timeFraction < 0.5) return timing(2 * timeFraction) / 2;
    else return (2 - timing(2 * (1 - timeFraction))) / 2;
  };
}
/**
 * @param timing Là function tính toán tiến trình của animation. Nhận phân số thời gian(timeFraction) từ 0 đến 1, return tiến trình animation, thường là từ 0 đến 1.
 * @param duration the total animation time in ms.
 * @param draw the function to draw the animation.
 */
export function animate({ timing, draw, duration }: { duration: number; draw: (time: number) => void; timing: TimingFnc }) {
  const start = performance.now();

  requestAnimationFrame(function animate(time) {
    // phân số thời gian đi từ 0 đến 1
    let timeFraction = (time - start) / duration;
    if (timeFraction > 1) timeFraction = 1;

    // tính toán current animtion state
    const progress = timing(timeFraction);

    // draw the animation at the moment timePassed
    draw(progress);

    if (timeFraction < 1) {
      requestAnimationFrame(animate);
    }
  });
}
