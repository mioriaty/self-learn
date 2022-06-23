// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"functions/animation.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.animate = exports.makeEaseInOut = exports.makeEaseOut = exports.elastic = exports.bounce = exports.back = exports.circ = exports.quad = exports.linear = void 0;

function linear(timeFraction) {
  return timeFraction;
}

exports.linear = linear;

function quad(timeFraction) {
  return Math.pow(timeFraction, 2);
}

exports.quad = quad;

function circ(timeFraction) {
  return 1 - Math.sin(Math.acos(timeFraction));
}

exports.circ = circ;

function back(x, timeFraction) {
  return Math.pow(timeFraction, 2) * ((x + 1) * timeFraction - x);
}

exports.back = back;

function bounce(timeFraction) {
  for (var a = 0, b = 1; 1; a += b, b /= 2) {
    if (timeFraction >= (7 - 4 * a) / 11) {
      var result = -Math.pow((11 - 6 * a - 11 * timeFraction) / 4, 2) + Math.pow(b, 2);
      return result;
    }
  }
}

exports.bounce = bounce;

function elastic(x, timeFraction) {
  return Math.pow(2, 10 * (timeFraction - 1)) * Math.cos(20 * Math.PI * x / 3 * timeFraction);
}

exports.elastic = elastic;
/**
 * Accepts a timing function, returns the transformed variant
 */

function makeEaseOut(timing) {
  return function (timeFraction) {
    return 1 - timing(1 - timeFraction);
  };
}

exports.makeEaseOut = makeEaseOut;

function makeEaseInOut(timing) {
  return function (timeFraction) {
    if (timeFraction < 0.5) return timing(2 * timeFraction) / 2;else return (2 - timing(2 * (1 - timeFraction))) / 2;
  };
}

exports.makeEaseInOut = makeEaseInOut;
/**
 * @param timing the function to calculate animation progress. Gets a time fraction from 0 to 1, returns the animation progress, usually from 0 to 1.
 * @param duration the total animation time in ms.
 * @param draw the function to draw the animation.
 */

function animate(_a) {
  var timing = _a.timing,
      draw = _a.draw,
      duration = _a.duration;
  var start = performance.now();
  requestAnimationFrame(function animate(time) {
    // phân số thời gian đi từ 0 đến 1
    var timeFraction = (time - start) / duration;
    if (timeFraction > 1) timeFraction = 1; // tính toán current animtion state

    var progress = timing(timeFraction); // draw the animation at the moment timePassed

    draw(progress);

    if (timeFraction < 1) {
      requestAnimationFrame(animate);
    }
  });
}

exports.animate = animate;
},{}],"index.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var animation_1 = require("./functions/animation");

function hasClass(_a) {
  var element = _a.element,
      className = _a.className;
  return (" " + element.className + " ").indexOf(" " + className + " ") > -1;
}

var bricks = Array.from(document.querySelectorAll(".brick"));
bricks.forEach(function (brick) {
  var _brick = brick;

  if (hasClass({
    className: "powerOfN",
    element: _brick
  })) {
    _brick.addEventListener("click", function () {
      (0, animation_1.animate)({
        duration: 1000,
        timing: function timing(timeFraction) {
          return (0, animation_1.quad)(timeFraction);
        },
        draw: function draw(progress) {
          _brick.style.left = progress * 500 + "px";
        }
      });
    });
  }

  if (hasClass({
    className: "theArc",
    element: _brick
  })) {
    _brick.addEventListener("click", function () {
      (0, animation_1.animate)({
        duration: 1000,
        timing: function timing(timeFraction) {
          return (0, animation_1.circ)(timeFraction);
        },
        draw: function draw(progress) {
          _brick.style.left = progress * 500 + "px";
        }
      });
    });
  }

  if (hasClass({
    className: "bowShooting",
    element: _brick
  })) {
    _brick.addEventListener("click", function () {
      (0, animation_1.animate)({
        duration: 1000,
        timing: function timing(timeFraction) {
          return (0, animation_1.back)(1.5, timeFraction);
        },
        draw: function draw(progress) {
          _brick.style.left = progress * 500 + "px";
        }
      });
    });
  }

  if (hasClass({
    className: "bounce",
    element: _brick
  })) {
    _brick.addEventListener("click", function () {
      (0, animation_1.animate)({
        duration: 1000,
        timing: function timing(timeFraction) {
          var _a;

          return (_a = (0, animation_1.bounce)(timeFraction)) !== null && _a !== void 0 ? _a : 0;
        },
        draw: function draw(progress) {
          _brick.style.left = progress * 500 + "px";
        }
      });
    });
  }

  if (hasClass({
    className: "elastic",
    element: _brick
  })) {
    _brick.addEventListener("click", function () {
      (0, animation_1.animate)({
        duration: 3000,
        timing: function timing(timeFraction) {
          return (0, animation_1.elastic)(1.5, timeFraction);
        },
        draw: function draw(progress) {
          _brick.style.left = progress * 500 + "px";
        }
      });
    });
  }

  if (hasClass({
    className: "easeOut",
    element: _brick
  })) {
    var bounceEaseOut_1 = (0, animation_1.makeEaseOut)(function (time) {
      var _a;

      return (_a = (0, animation_1.bounce)(time)) !== null && _a !== void 0 ? _a : 0;
    });

    _brick.addEventListener("click", function () {
      (0, animation_1.animate)({
        duration: 1000,
        timing: bounceEaseOut_1,
        draw: function draw(progress) {
          _brick.style.left = progress * 500 + "px";
        }
      });
    });
  }

  if (hasClass({
    className: "easeInOut",
    element: _brick
  })) {
    var bounceEaseOut_2 = (0, animation_1.makeEaseInOut)(function (time) {
      var _a;

      return (_a = (0, animation_1.bounce)(time)) !== null && _a !== void 0 ? _a : 0;
    });

    _brick.addEventListener("click", function () {
      (0, animation_1.animate)({
        duration: 3000,
        timing: bounceEaseOut_2,
        draw: function draw(progress) {
          _brick.style.left = progress * 500 + "px";
        }
      });
    });
  }
});
var ball = document.getElementById("ball");
var field = document.getElementById("field");
ball.addEventListener("click", function () {
  var height = field.clientHeight - ball.clientHeight;
  var width = 100;
  var bounceEaseOut = (0, animation_1.makeEaseOut)(function (time) {
    var _a;

    return (_a = (0, animation_1.bounce)(time)) !== null && _a !== void 0 ? _a : 0;
  }); // animate top (bouncing)

  (0, animation_1.animate)({
    duration: 2000,
    timing: bounceEaseOut,
    draw: function draw(progress) {
      ball.style.top = height * progress + "px";
    }
  }); // animate left (moving to the right)

  (0, animation_1.animate)({
    duration: 2000,
    timing: (0, animation_1.makeEaseOut)(animation_1.quad),
    draw: function draw(progress) {
      ball.style.left = width * progress + "px";
    }
  });
});
},{"./functions/animation":"functions/animation.ts"}],"../node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "53156" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../node_modules/parcel-bundler/src/builtins/hmr-runtime.js","index.ts"], null)
//# sourceMappingURL=/src.77de5100.js.map