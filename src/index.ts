import {
  quad,
  back,
  circ,
  bounce,
  elastic,
  makeEaseOut,
  makeEaseInOut,
  animate
} from "./functions/animation";

function hasClass({
  element,
  className
}: {
  element: Element;
  className: string;
}) {
  return (" " + element.className + " ").indexOf(" " + className + " ") > -1;
}

const bricks = Array.from(document.querySelectorAll(".brick"));

bricks.forEach((brick) => {
  const _brick = brick as HTMLDivElement;

  if (hasClass({ className: "powerOfN", element: _brick })) {
    _brick.addEventListener("click", () => {
      animate({
        duration: 1000,
        timing: function (timeFraction) {
          return quad(timeFraction);
        },
        draw: function (progress) {
          _brick.style.left = progress * 500 + "px";
        }
      });
    });
  }

  if (hasClass({ className: "theArc", element: _brick })) {
    _brick.addEventListener("click", () => {
      animate({
        duration: 1000,
        timing: function (timeFraction) {
          return circ(timeFraction);
        },
        draw: function (progress) {
          _brick.style.left = progress * 500 + "px";
        }
      });
    });
  }

  if (hasClass({ className: "bowShooting", element: _brick })) {
    _brick.addEventListener("click", () => {
      animate({
        duration: 1000,
        timing: function (timeFraction) {
          return back(1.5, timeFraction);
        },
        draw: function (progress) {
          _brick.style.left = progress * 500 + "px";
        }
      });
    });
  }

  if (hasClass({ className: "bounce", element: _brick })) {
    _brick.addEventListener("click", () => {
      animate({
        duration: 1000,
        timing: function (timeFraction) {
          return bounce(timeFraction) ?? 0;
        },
        draw: function (progress) {
          _brick.style.left = progress * 500 + "px";
        }
      });
    });
  }

  if (hasClass({ className: "elastic", element: _brick })) {
    _brick.addEventListener("click", () => {
      animate({
        duration: 3000,
        timing: function (timeFraction) {
          return elastic(1.5, timeFraction);
        },
        draw: function (progress) {
          _brick.style.left = progress * 500 + "px";
        }
      });
    });
  }

  if (hasClass({ className: "easeOut", element: _brick })) {
    const bounceEaseOut = makeEaseOut((time) => bounce(time) ?? 0);

    _brick.addEventListener("click", () => {
      animate({
        duration: 1000,
        timing: bounceEaseOut,
        draw: function (progress) {
          _brick.style.left = progress * 500 + "px";
        }
      });
    });
  }

  if (hasClass({ className: "easeInOut", element: _brick })) {
    const bounceEaseOut = makeEaseInOut((time) => bounce(time) ?? 0);

    _brick.addEventListener("click", () => {
      animate({
        duration: 3000,
        timing: bounceEaseOut,
        draw: function (progress) {
          _brick.style.left = progress * 500 + "px";
        }
      });
    });
  }
});

const ball = document.getElementById("ball") as HTMLImageElement;
const field = document.getElementById("field") as HTMLDivElement;

ball.addEventListener("click", () => {
  const height = field.clientHeight - ball.clientHeight;
  const width = 100;

  const bounceEaseOut = makeEaseOut((time) => bounce(time) ?? 0);

  // animate top (bouncing)
  animate({
    duration: 2000,
    timing: bounceEaseOut,
    draw: function (progress) {
      ball.style.top = height * progress + "px";
    }
  });

  // animate left (moving to the right)
  animate({
    duration: 2000,
    timing: makeEaseOut(quad),
    draw: function (progress) {
      ball.style.left = width * progress + "px";
    }
  });
});
