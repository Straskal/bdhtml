/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/main.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/path-browserify/index.js":
/*!***********************************************!*\
  !*** ./node_modules/path-browserify/index.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(process) {// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

// resolves . and .. elements in a path array with directory names there
// must be no slashes, empty elements, or device names (c:\) in the array
// (so also no leading and trailing slashes - it does not distinguish
// relative and absolute paths)
function normalizeArray(parts, allowAboveRoot) {
  // if the path tries to go above the root, `up` ends up > 0
  var up = 0;
  for (var i = parts.length - 1; i >= 0; i--) {
    var last = parts[i];
    if (last === '.') {
      parts.splice(i, 1);
    } else if (last === '..') {
      parts.splice(i, 1);
      up++;
    } else if (up) {
      parts.splice(i, 1);
      up--;
    }
  }

  // if the path is allowed to go above the root, restore leading ..s
  if (allowAboveRoot) {
    for (; up--; up) {
      parts.unshift('..');
    }
  }

  return parts;
}

// Split a filename into [root, dir, basename, ext], unix version
// 'root' is just a slash, or nothing.
var splitPathRe =
    /^(\/?|)([\s\S]*?)((?:\.{1,2}|[^\/]+?|)(\.[^.\/]*|))(?:[\/]*)$/;
var splitPath = function(filename) {
  return splitPathRe.exec(filename).slice(1);
};

// path.resolve([from ...], to)
// posix version
exports.resolve = function() {
  var resolvedPath = '',
      resolvedAbsolute = false;

  for (var i = arguments.length - 1; i >= -1 && !resolvedAbsolute; i--) {
    var path = (i >= 0) ? arguments[i] : process.cwd();

    // Skip empty and invalid entries
    if (typeof path !== 'string') {
      throw new TypeError('Arguments to path.resolve must be strings');
    } else if (!path) {
      continue;
    }

    resolvedPath = path + '/' + resolvedPath;
    resolvedAbsolute = path.charAt(0) === '/';
  }

  // At this point the path should be resolved to a full absolute path, but
  // handle relative paths to be safe (might happen when process.cwd() fails)

  // Normalize the path
  resolvedPath = normalizeArray(filter(resolvedPath.split('/'), function(p) {
    return !!p;
  }), !resolvedAbsolute).join('/');

  return ((resolvedAbsolute ? '/' : '') + resolvedPath) || '.';
};

// path.normalize(path)
// posix version
exports.normalize = function(path) {
  var isAbsolute = exports.isAbsolute(path),
      trailingSlash = substr(path, -1) === '/';

  // Normalize the path
  path = normalizeArray(filter(path.split('/'), function(p) {
    return !!p;
  }), !isAbsolute).join('/');

  if (!path && !isAbsolute) {
    path = '.';
  }
  if (path && trailingSlash) {
    path += '/';
  }

  return (isAbsolute ? '/' : '') + path;
};

// posix version
exports.isAbsolute = function(path) {
  return path.charAt(0) === '/';
};

// posix version
exports.join = function() {
  var paths = Array.prototype.slice.call(arguments, 0);
  return exports.normalize(filter(paths, function(p, index) {
    if (typeof p !== 'string') {
      throw new TypeError('Arguments to path.join must be strings');
    }
    return p;
  }).join('/'));
};


// path.relative(from, to)
// posix version
exports.relative = function(from, to) {
  from = exports.resolve(from).substr(1);
  to = exports.resolve(to).substr(1);

  function trim(arr) {
    var start = 0;
    for (; start < arr.length; start++) {
      if (arr[start] !== '') break;
    }

    var end = arr.length - 1;
    for (; end >= 0; end--) {
      if (arr[end] !== '') break;
    }

    if (start > end) return [];
    return arr.slice(start, end - start + 1);
  }

  var fromParts = trim(from.split('/'));
  var toParts = trim(to.split('/'));

  var length = Math.min(fromParts.length, toParts.length);
  var samePartsLength = length;
  for (var i = 0; i < length; i++) {
    if (fromParts[i] !== toParts[i]) {
      samePartsLength = i;
      break;
    }
  }

  var outputParts = [];
  for (var i = samePartsLength; i < fromParts.length; i++) {
    outputParts.push('..');
  }

  outputParts = outputParts.concat(toParts.slice(samePartsLength));

  return outputParts.join('/');
};

exports.sep = '/';
exports.delimiter = ':';

exports.dirname = function(path) {
  var result = splitPath(path),
      root = result[0],
      dir = result[1];

  if (!root && !dir) {
    // No dirname whatsoever
    return '.';
  }

  if (dir) {
    // It has a dirname, strip trailing slash
    dir = dir.substr(0, dir.length - 1);
  }

  return root + dir;
};


exports.basename = function(path, ext) {
  var f = splitPath(path)[2];
  // TODO: make this comparison case-insensitive on windows?
  if (ext && f.substr(-1 * ext.length) === ext) {
    f = f.substr(0, f.length - ext.length);
  }
  return f;
};


exports.extname = function(path) {
  return splitPath(path)[3];
};

function filter (xs, f) {
    if (xs.filter) return xs.filter(f);
    var res = [];
    for (var i = 0; i < xs.length; i++) {
        if (f(xs[i], i, xs)) res.push(xs[i]);
    }
    return res;
}

// String.prototype.substr - negative index don't work in IE8
var substr = 'ab'.substr(-1) === 'b'
    ? function (str, start, len) { return str.substr(start, len) }
    : function (str, start, len) {
        if (start < 0) start = str.length + start;
        return str.substr(start, len);
    }
;

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../process/browser.js */ "./node_modules/process/browser.js")))

/***/ }),

/***/ "./node_modules/process/browser.js":
/*!*****************************************!*\
  !*** ./node_modules/process/browser.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };


/***/ }),

/***/ "./src/core/behavior.ts":
/*!******************************!*\
  !*** ./src/core/behavior.ts ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Behavior = (function () {
    function Behavior() {
        this._needsUpdate = false;
    }
    Object.defineProperty(Behavior.prototype, "needsUpdate", {
        get: function () {
            return this._needsUpdate;
        },
        enumerable: true,
        configurable: true
    });
    Behavior.prototype.preStart = function () { };
    Behavior.prototype.start = function () { };
    Behavior.prototype.update = function (dt) { };
    Behavior.prototype.end = function () { };
    return Behavior;
}());
exports.Behavior = Behavior;


/***/ }),

/***/ "./src/core/entity.ts":
/*!****************************!*\
  !*** ./src/core/entity.ts ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var id_generator_1 = __webpack_require__(/*! ../utils/id-generator */ "./src/utils/id-generator.ts");
var keyed_collection_1 = __webpack_require__(/*! ../utils/keyed-collection */ "./src/utils/keyed-collection.ts");
var vector2_1 = __webpack_require__(/*! ../math/vector2 */ "./src/math/vector2.ts");
var scene_node_1 = __webpack_require__(/*! ./scene-node */ "./src/core/scene-node.ts");
var Entity = (function (_super) {
    __extends(Entity, _super);
    function Entity(opt) {
        var _this = _super.call(this) || this;
        _this._id = -1;
        _this._name = "";
        _this._position = new vector2_1.Vector2(0, 0);
        _this._behaviorsById = new keyed_collection_1.KeyedCollection();
        _this._behaviorsToUpdate = [];
        _this._idGen = new id_generator_1.IdGenerator();
        _this._name = opt.name;
        for (var _i = 0, _a = opt.behaviors; _i < _a.length; _i++) {
            var b = _a[_i];
            b._owner = _this;
            _this._behaviorsById.add(_this._idGen.getId(), b);
        }
        return _this;
    }
    Object.defineProperty(Entity.prototype, "id", {
        get: function () {
            return this._id;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Entity.prototype, "name", {
        get: function () {
            return this._name;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Entity.prototype, "position", {
        get: function () {
            return this._position;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Entity.prototype, "behaviorCount", {
        get: function () {
            return this._behaviorsById.count();
        },
        enumerable: true,
        configurable: true
    });
    Entity.prototype._setId = function (id) {
        this._id = id;
    };
    Entity.prototype._setLevel = function (level) {
        this._level = level;
    };
    Entity.prototype.getLevel = function () {
        return this._level;
    };
    Entity.prototype.getBehaviorById = function (id) {
        if (this._behaviorsById.item(id)) {
            return this._behaviorsById.item(id);
        }
        return null;
    };
    Entity.prototype.getBehaviorOfType = function (tctor) {
        for (var _i = 0, _a = this._behaviorsById.values(); _i < _a.length; _i++) {
            var b = _a[_i];
            if (b instanceof tctor) {
                return b;
            }
        }
        return null;
    };
    Entity.prototype.preStart = function () {
        for (var _i = 0, _a = this._behaviorsById.values(); _i < _a.length; _i++) {
            var b = _a[_i];
            if (b.needsUpdate) {
                this._behaviorsToUpdate.push(b);
            }
            b.preStart();
        }
    };
    Entity.prototype.start = function () {
        for (var _i = 0, _a = this._behaviorsById.values(); _i < _a.length; _i++) {
            var b = _a[_i];
            b.start();
        }
    };
    Entity.prototype.update = function (dt) {
        for (var _i = 0, _a = this._behaviorsToUpdate; _i < _a.length; _i++) {
            var b = _a[_i];
            b.update(dt);
        }
    };
    Entity.prototype.end = function () {
        for (var _i = 0, _a = this._behaviorsById.values(); _i < _a.length; _i++) {
            var b = _a[_i];
            b.end();
        }
    };
    return Entity;
}(scene_node_1.SceneNode));
exports.Entity = Entity;


/***/ }),

/***/ "./src/core/level.ts":
/*!***************************!*\
  !*** ./src/core/level.ts ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var keyed_collection_1 = __webpack_require__(/*! ../utils/keyed-collection */ "./src/utils/keyed-collection.ts");
var id_generator_1 = __webpack_require__(/*! ../utils/id-generator */ "./src/utils/id-generator.ts");
var sprite_1 = __webpack_require__(/*! ./sprite */ "./src/core/sprite.ts");
var Level = (function () {
    function Level() {
        this._entitiesById = new keyed_collection_1.KeyedCollection();
        this._entitiesToAdd = [];
        this._entitiesToRemove = [];
        this._idGen = new id_generator_1.IdGenerator();
    }
    Level.prototype.addEntity = function (e) {
        this._entitiesToAdd.push(e);
    };
    Level.prototype.getEntityById = function (id) {
        return this._entitiesById.item(id);
    };
    Level.prototype.start = function () {
        this._updateEntityLists();
    };
    Level.prototype.update = function (dt) {
        this._updateEntityLists();
        for (var _i = 0, _a = this._entitiesById.values(); _i < _a.length; _i++) {
            var e = _a[_i];
            e.update(dt);
        }
    };
    Level.prototype.draw = function (ctx) {
        for (var _i = 0, _a = this._entitiesById.values(); _i < _a.length; _i++) {
            var e = _a[_i];
            var s = e.getBehaviorOfType(sprite_1.Sprite);
            if (s != null) {
                ctx.drawImage(s.texture, e.position.x, e.position.y);
            }
        }
    };
    Level.prototype.end = function () {
        for (var _i = 0, _a = this._entitiesById.values(); _i < _a.length; _i++) {
            var e = _a[_i];
            e.end();
        }
    };
    Level.prototype._updateEntityLists = function () {
        while (this._entitiesToRemove.length !== 0) {
            var eId = this._entitiesToRemove.pop();
            var e = this.getEntityById(eId);
            e.end();
            this._entitiesById.remove(eId);
        }
        for (var _i = 0, _a = this._entitiesToAdd; _i < _a.length; _i++) {
            var e = _a[_i];
            e._setLevel(this);
            e._setId(this._idGen.getId());
            e.preStart();
            this._entitiesById.add(e.id, e);
        }
        while (this._entitiesToAdd.length !== 0) {
            var e = this._entitiesToAdd.pop();
            e.start();
        }
    };
    return Level;
}());
exports.Level = Level;


/***/ }),

/***/ "./src/core/m-game.ts":
/*!****************************!*\
  !*** ./src/core/m-game.ts ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var keyboard_1 = __webpack_require__(/*! ../input/keyboard */ "./src/input/keyboard.ts");
var MGame = (function () {
    function MGame(startOpts) {
        this.now = 0;
        this.dt = 0;
        this.last = this.timestamp();
        this.step = 1 / 60;
        this.currentLevel = startOpts.startLevel;
    }
    MGame.prototype.initialize = function () {
        this.canvas = document.createElement("canvas");
        this.canvas.width = 800;
        this.canvas.height = 600;
        this.canvas.id = "game";
        this.context = this.canvas.getContext("2d");
        keyboard_1.Keyboard.initialize();
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        var resDiv = document.createElement("div");
        resDiv.id = "resources";
        document.body.insertBefore(resDiv, document.body.childNodes[0]);
        this.currentLevel.start();
        this.update();
    };
    MGame.prototype.update = function () {
        keyboard_1.Keyboard.update();
        this.now = this.timestamp();
        this.dt = this.dt + Math.min(1, (this.now - this.last) / 1000);
        this.currentLevel.update(this.dt);
        if (this.context !== null) {
            this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
            this.context.fillStyle = "black";
            this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
            this.currentLevel.draw(this.context);
        }
        this.last = this.now;
        requestAnimationFrame(this.update.bind(this));
    };
    MGame.prototype.timestamp = function () {
        return window.performance && window.performance.now ? window.performance.now() : new Date().getTime();
    };
    return MGame;
}());
exports.MGame = MGame;


/***/ }),

/***/ "./src/core/scene-node.ts":
/*!********************************!*\
  !*** ./src/core/scene-node.ts ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var SceneNode = (function () {
    function SceneNode() {
    }
    Object.defineProperty(SceneNode.prototype, "parent", {
        get: function () {
            return this._parent;
        },
        set: function (value) {
            this._parent = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SceneNode.prototype, "children", {
        get: function () {
            return this._children;
        },
        enumerable: true,
        configurable: true
    });
    SceneNode.prototype.addChild = function (child) {
        this._children.push(child);
    };
    return SceneNode;
}());
exports.SceneNode = SceneNode;


/***/ }),

/***/ "./src/core/sprite.ts":
/*!****************************!*\
  !*** ./src/core/sprite.ts ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var behavior_1 = __webpack_require__(/*! ./behavior */ "./src/core/behavior.ts");
var resource_loader_1 = __webpack_require__(/*! ../utils/resource-loader */ "./src/utils/resource-loader.ts");
var Sprite = (function (_super) {
    __extends(Sprite, _super);
    function Sprite(path) {
        var _this = _super.call(this) || this;
        _this._path = path;
        return _this;
    }
    Object.defineProperty(Sprite.prototype, "texture", {
        get: function () {
            return this._texture;
        },
        enumerable: true,
        configurable: true
    });
    Sprite.prototype.preStart = function () {
        resource_loader_1.ResourceLoader.getInstance().queue(["res/player.png"]);
    };
    Sprite.prototype.start = function () {
        this._texture = resource_loader_1.ResourceLoader.getInstance().getResource("assets/player.png");
    };
    return Sprite;
}(behavior_1.Behavior));
exports.Sprite = Sprite;


/***/ }),

/***/ "./src/input/keyboard.ts":
/*!*******************************!*\
  !*** ./src/input/keyboard.ts ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var KeyCode;
(function (KeyCode) {
    KeyCode[KeyCode["BACKSPACE"] = 8] = "BACKSPACE";
    KeyCode[KeyCode["TAB"] = 9] = "TAB";
    KeyCode[KeyCode["ENTER"] = 13] = "ENTER";
    KeyCode[KeyCode["SHIFT"] = 16] = "SHIFT";
    KeyCode[KeyCode["CTRL"] = 17] = "CTRL";
    KeyCode[KeyCode["ALT"] = 18] = "ALT";
    KeyCode[KeyCode["PAUSE"] = 19] = "PAUSE";
    KeyCode[KeyCode["CAPS_LOCK"] = 20] = "CAPS_LOCK";
    KeyCode[KeyCode["ESCAPE"] = 27] = "ESCAPE";
    KeyCode[KeyCode["SPACE"] = 32] = "SPACE";
    KeyCode[KeyCode["PAGE_UP"] = 33] = "PAGE_UP";
    KeyCode[KeyCode["PAGE_DOWN"] = 34] = "PAGE_DOWN";
    KeyCode[KeyCode["END"] = 35] = "END";
    KeyCode[KeyCode["HOME"] = 36] = "HOME";
    KeyCode[KeyCode["LEFT_ARROW"] = 37] = "LEFT_ARROW";
    KeyCode[KeyCode["UP_ARROW"] = 38] = "UP_ARROW";
    KeyCode[KeyCode["RIGHT_ARROW"] = 39] = "RIGHT_ARROW";
    KeyCode[KeyCode["DOWN_ARROW"] = 40] = "DOWN_ARROW";
    KeyCode[KeyCode["INSERT"] = 45] = "INSERT";
    KeyCode[KeyCode["DELETE"] = 46] = "DELETE";
    KeyCode[KeyCode["KEY_0"] = 48] = "KEY_0";
    KeyCode[KeyCode["KEY_1"] = 49] = "KEY_1";
    KeyCode[KeyCode["KEY_2"] = 50] = "KEY_2";
    KeyCode[KeyCode["KEY_3"] = 51] = "KEY_3";
    KeyCode[KeyCode["KEY_4"] = 52] = "KEY_4";
    KeyCode[KeyCode["KEY_5"] = 53] = "KEY_5";
    KeyCode[KeyCode["KEY_6"] = 54] = "KEY_6";
    KeyCode[KeyCode["KEY_7"] = 55] = "KEY_7";
    KeyCode[KeyCode["KEY_8"] = 56] = "KEY_8";
    KeyCode[KeyCode["KEY_9"] = 57] = "KEY_9";
    KeyCode[KeyCode["KEY_A"] = 65] = "KEY_A";
    KeyCode[KeyCode["KEY_B"] = 66] = "KEY_B";
    KeyCode[KeyCode["KEY_C"] = 67] = "KEY_C";
    KeyCode[KeyCode["KEY_D"] = 68] = "KEY_D";
    KeyCode[KeyCode["KEY_E"] = 69] = "KEY_E";
    KeyCode[KeyCode["KEY_F"] = 70] = "KEY_F";
    KeyCode[KeyCode["KEY_G"] = 71] = "KEY_G";
    KeyCode[KeyCode["KEY_H"] = 72] = "KEY_H";
    KeyCode[KeyCode["KEY_I"] = 73] = "KEY_I";
    KeyCode[KeyCode["KEY_J"] = 74] = "KEY_J";
    KeyCode[KeyCode["KEY_K"] = 75] = "KEY_K";
    KeyCode[KeyCode["KEY_L"] = 76] = "KEY_L";
    KeyCode[KeyCode["KEY_M"] = 77] = "KEY_M";
    KeyCode[KeyCode["KEY_N"] = 78] = "KEY_N";
    KeyCode[KeyCode["KEY_O"] = 79] = "KEY_O";
    KeyCode[KeyCode["KEY_P"] = 80] = "KEY_P";
    KeyCode[KeyCode["KEY_Q"] = 81] = "KEY_Q";
    KeyCode[KeyCode["KEY_R"] = 82] = "KEY_R";
    KeyCode[KeyCode["KEY_S"] = 83] = "KEY_S";
    KeyCode[KeyCode["KEY_T"] = 84] = "KEY_T";
    KeyCode[KeyCode["KEY_U"] = 85] = "KEY_U";
    KeyCode[KeyCode["KEY_V"] = 86] = "KEY_V";
    KeyCode[KeyCode["KEY_W"] = 87] = "KEY_W";
    KeyCode[KeyCode["KEY_X"] = 88] = "KEY_X";
    KeyCode[KeyCode["KEY_Y"] = 89] = "KEY_Y";
    KeyCode[KeyCode["KEY_Z"] = 90] = "KEY_Z";
    KeyCode[KeyCode["LEFT_META"] = 91] = "LEFT_META";
    KeyCode[KeyCode["RIGHT_META"] = 92] = "RIGHT_META";
    KeyCode[KeyCode["SELECT"] = 93] = "SELECT";
    KeyCode[KeyCode["NUMPAD_0"] = 96] = "NUMPAD_0";
    KeyCode[KeyCode["NUMPAD_1"] = 97] = "NUMPAD_1";
    KeyCode[KeyCode["NUMPAD_2"] = 98] = "NUMPAD_2";
    KeyCode[KeyCode["NUMPAD_3"] = 99] = "NUMPAD_3";
    KeyCode[KeyCode["NUMPAD_4"] = 100] = "NUMPAD_4";
    KeyCode[KeyCode["NUMPAD_5"] = 101] = "NUMPAD_5";
    KeyCode[KeyCode["NUMPAD_6"] = 102] = "NUMPAD_6";
    KeyCode[KeyCode["NUMPAD_7"] = 103] = "NUMPAD_7";
    KeyCode[KeyCode["NUMPAD_8"] = 104] = "NUMPAD_8";
    KeyCode[KeyCode["NUMPAD_9"] = 105] = "NUMPAD_9";
    KeyCode[KeyCode["MULTIPLY"] = 106] = "MULTIPLY";
    KeyCode[KeyCode["ADD"] = 107] = "ADD";
    KeyCode[KeyCode["SUBTRACT"] = 109] = "SUBTRACT";
    KeyCode[KeyCode["DECIMAL"] = 110] = "DECIMAL";
    KeyCode[KeyCode["DIVIDE"] = 111] = "DIVIDE";
    KeyCode[KeyCode["F1"] = 112] = "F1";
    KeyCode[KeyCode["F2"] = 113] = "F2";
    KeyCode[KeyCode["F3"] = 114] = "F3";
    KeyCode[KeyCode["F4"] = 115] = "F4";
    KeyCode[KeyCode["F5"] = 116] = "F5";
    KeyCode[KeyCode["F6"] = 117] = "F6";
    KeyCode[KeyCode["F7"] = 118] = "F7";
    KeyCode[KeyCode["F8"] = 119] = "F8";
    KeyCode[KeyCode["F9"] = 120] = "F9";
    KeyCode[KeyCode["F10"] = 121] = "F10";
    KeyCode[KeyCode["F11"] = 122] = "F11";
    KeyCode[KeyCode["F12"] = 123] = "F12";
    KeyCode[KeyCode["NUM_LOCK"] = 144] = "NUM_LOCK";
    KeyCode[KeyCode["SCROLL_LOCK"] = 145] = "SCROLL_LOCK";
    KeyCode[KeyCode["SEMICOLON"] = 186] = "SEMICOLON";
    KeyCode[KeyCode["EQUALS"] = 187] = "EQUALS";
    KeyCode[KeyCode["COMMA"] = 188] = "COMMA";
    KeyCode[KeyCode["DASH"] = 189] = "DASH";
    KeyCode[KeyCode["PERIOD"] = 190] = "PERIOD";
    KeyCode[KeyCode["FORWARD_SLASH"] = 191] = "FORWARD_SLASH";
    KeyCode[KeyCode["GRAVE_ACCENT"] = 192] = "GRAVE_ACCENT";
    KeyCode[KeyCode["OPEN_BRACKET"] = 219] = "OPEN_BRACKET";
    KeyCode[KeyCode["BACK_SLASH"] = 220] = "BACK_SLASH";
    KeyCode[KeyCode["CLOSE_BRACKET"] = 221] = "CLOSE_BRACKET";
    KeyCode[KeyCode["SINGLE_QUOTE"] = 222] = "SINGLE_QUOTE";
})(KeyCode = exports.KeyCode || (exports.KeyCode = {}));
;
var Keyboard = (function () {
    function Keyboard() {
    }
    Keyboard.initialize = function () {
        var _this = this;
        window.addEventListener("keydown", function (e) {
            _this.keys[e.keyCode] = true;
        });
        window.addEventListener("keyup", function (e) {
            _this.keys[e.keyCode] = false;
        });
    };
    Keyboard.update = function () {
        this.prevKeys = this.keys;
    };
    Keyboard.isKeyDown = function (code) {
        return this.keys[code];
    };
    Keyboard.isKeyUp = function (code) {
        return !this.keys[code];
    };
    Keyboard.isKeyPressed = function (code) {
        return this.keys[code] && !this.prevKeys[code];
    };
    Keyboard.isKeyReleased = function (code) {
        return !this.keys[code] && this.prevKeys[code];
    };
    Keyboard.prevKeys = [];
    Keyboard.keys = [];
    return Keyboard;
}());
exports.Keyboard = Keyboard;


/***/ }),

/***/ "./src/main.ts":
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var m_game_1 = __webpack_require__(/*! ./core/m-game */ "./src/core/m-game.ts");
var level_1 = __webpack_require__(/*! ./core/level */ "./src/core/level.ts");
var entity_1 = __webpack_require__(/*! ./core/entity */ "./src/core/entity.ts");
var behavior_1 = __webpack_require__(/*! ./core/behavior */ "./src/core/behavior.ts");
var keyboard_1 = __webpack_require__(/*! ./input/keyboard */ "./src/input/keyboard.ts");
var sprite_1 = __webpack_require__(/*! ./core/sprite */ "./src/core/sprite.ts");
var TestBehavior = (function (_super) {
    __extends(TestBehavior, _super);
    function TestBehavior() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._needsUpdate = true;
        return _this;
    }
    TestBehavior.prototype.preStart = function () {
        console.log("behavior pre started!");
    };
    TestBehavior.prototype.start = function () {
        console.log("behavior started!");
    };
    TestBehavior.prototype.update = function (dt) {
        if (keyboard_1.Keyboard.isKeyDown(keyboard_1.KeyCode.KEY_W)) {
            console.log("W pressed!");
        }
    };
    return TestBehavior;
}(behavior_1.Behavior));
window.onload = function () {
    var level = new level_1.Level();
    var e = new entity_1.Entity({
        name: "steve",
        behaviors: [
            new TestBehavior(),
            new sprite_1.Sprite("assets/player.png")
        ]
    });
    level.addEntity(e);
    var game = new m_game_1.MGame({
        startLevel: level
    });
    game.initialize();
};


/***/ }),

/***/ "./src/math/vector2.ts":
/*!*****************************!*\
  !*** ./src/math/vector2.ts ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Vector2 = (function () {
    function Vector2(x, y) {
        this.x = x || 0;
        this.y = y || 0;
    }
    Object.defineProperty(Vector2.prototype, "length", {
        get: function () {
            return Math.sqrt(Vector2.dot(this, this));
        },
        enumerable: true,
        configurable: true
    });
    Vector2.add = function (v1, v2) {
        return new Vector2(v1.x + v2.x, v1.y + v2.y);
    };
    Vector2.subtract = function (v1, v2) {
        return new Vector2(v1.x - v2.x, v1.y - v2.y);
    };
    Vector2.multiply = function (v, scalar) {
        return new Vector2(v.x * scalar, v.y * scalar);
    };
    Vector2.divide = function (v, scalar) {
        return new Vector2(v.x / scalar, v.y / scalar);
    };
    Vector2.dot = function (v1, v2) {
        return (v1.x * v2.x) + (v1.y * v2.y);
    };
    return Vector2;
}());
exports.Vector2 = Vector2;


/***/ }),

/***/ "./src/utils/id-generator.ts":
/*!***********************************!*\
  !*** ./src/utils/id-generator.ts ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var IdGenerator = (function () {
    function IdGenerator() {
        this._nextId = 0;
        this._availableIds = [];
    }
    IdGenerator.prototype.getId = function () {
        if (this._availableIds.length === 0) {
            var id_1 = this._nextId;
            this._nextId++;
            return id_1;
        }
        var id = this._availableIds.pop();
        return id;
    };
    return IdGenerator;
}());
exports.IdGenerator = IdGenerator;


/***/ }),

/***/ "./src/utils/keyed-collection.ts":
/*!***************************************!*\
  !*** ./src/utils/keyed-collection.ts ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var KeyedCollection = (function () {
    function KeyedCollection() {
        this._items = {};
        this._count = 0;
    }
    KeyedCollection.prototype.containsKey = function (key) {
        return this._items.hasOwnProperty(key);
    };
    KeyedCollection.prototype.count = function () {
        return this._count;
    };
    KeyedCollection.prototype.add = function (key, value) {
        if (!this._items.hasOwnProperty(key))
            this._count++;
        this._items[key] = value;
    };
    KeyedCollection.prototype.remove = function (key) {
        var val = this._items[key];
        delete this._items[key];
        this._count--;
        return val;
    };
    KeyedCollection.prototype.item = function (key) {
        return this._items[key];
    };
    KeyedCollection.prototype.values = function () {
        var values = [];
        for (var prop in this._items) {
            if (this._items.hasOwnProperty(prop)) {
                values.push(this._items[prop]);
            }
        }
        return values;
    };
    return KeyedCollection;
}());
exports.KeyedCollection = KeyedCollection;
var StrKeyedCollection = (function () {
    function StrKeyedCollection() {
        this._items = {};
        this._count = 0;
    }
    StrKeyedCollection.prototype.containsKey = function (key) {
        return this._items.hasOwnProperty(key);
    };
    StrKeyedCollection.prototype.count = function () {
        return this._count;
    };
    StrKeyedCollection.prototype.add = function (key, value) {
        if (!this._items.hasOwnProperty(key))
            this._count++;
        this._items[key] = value;
    };
    StrKeyedCollection.prototype.remove = function (key) {
        var val = this._items[key];
        delete this._items[key];
        this._count--;
        return val;
    };
    StrKeyedCollection.prototype.item = function (key) {
        return this._items[key];
    };
    StrKeyedCollection.prototype.keys = function () {
        var keySet = [];
        for (var prop in this._items) {
            if (this._items.hasOwnProperty(prop)) {
                keySet.push(+prop);
            }
        }
        return keySet;
    };
    StrKeyedCollection.prototype.values = function () {
        var values = [];
        for (var prop in this._items) {
            if (this._items.hasOwnProperty(prop)) {
                values.push(this._items[prop]);
            }
        }
        return values;
    };
    return StrKeyedCollection;
}());
exports.StrKeyedCollection = StrKeyedCollection;


/***/ }),

/***/ "./src/utils/resource-loader.ts":
/*!**************************************!*\
  !*** ./src/utils/resource-loader.ts ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var keyed_collection_1 = __webpack_require__(/*! ./keyed-collection */ "./src/utils/keyed-collection.ts");
var path = __webpack_require__(/*! path */ "./node_modules/path-browserify/index.js");
var ResourceLoader = (function () {
    function ResourceLoader() {
        this._cache = new keyed_collection_1.StrKeyedCollection();
        this._queue = [];
        this._loadCount = 0;
        this._loadedCount = 0;
        this._imgExts = [
            ".jpg",
            ".png"
        ];
        this._audExts = [
            ".wav"
        ];
    }
    Object.defineProperty(ResourceLoader.prototype, "isDone", {
        get: function () {
            return this._loadedCount === this._loadCount;
        },
        enumerable: true,
        configurable: true
    });
    ResourceLoader.getInstance = function () {
        return this._instance;
    };
    ResourceLoader.prototype.getResource = function (path) {
        return this._cache.item(path);
    };
    ResourceLoader.prototype.queue = function (res) {
        var _loop_1 = function (i) {
            if (this_1._imgExts.some(function (x) { return x === i; })) {
                return "continue";
            }
            this_1._queue.push(i);
        };
        var this_1 = this;
        for (var _i = 0, res_1 = res; _i < res_1.length; _i++) {
            var i = res_1[_i];
            _loop_1(i);
        }
    };
    ResourceLoader.prototype.load = function () {
        var _this = this;
        this._loadCount = this._queue.length;
        var _loop_2 = function (qd) {
            if (this_2._imgExts.some(function (x) { return x === path.extname(qd); })) {
                var image = new Image();
                image.addEventListener("load", function () {
                    _this._loadedCount++;
                });
                image.src = qd;
                this_2._cache.add(qd, image);
            }
            if (this_2._audExts.some(function (x) { return x === path.extname(qd); })) {
                var audio = new Audio();
                audio.addEventListener("load", function () {
                    _this._loadedCount++;
                });
                audio.src = qd;
                this_2._cache.add(qd, audio);
            }
        };
        var this_2 = this;
        for (var qd in this._queue) {
            _loop_2(qd);
        }
    };
    return ResourceLoader;
}());
exports.ResourceLoader = ResourceLoader;


/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3BhdGgtYnJvd3NlcmlmeS9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvcHJvY2Vzcy9icm93c2VyLmpzIiwid2VicGFjazovLy8uL3NyYy9jb3JlL2JlaGF2aW9yLnRzIiwid2VicGFjazovLy8uL3NyYy9jb3JlL2VudGl0eS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvY29yZS9sZXZlbC50cyIsIndlYnBhY2s6Ly8vLi9zcmMvY29yZS9tLWdhbWUudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvcmUvc2NlbmUtbm9kZS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvY29yZS9zcHJpdGUudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2lucHV0L2tleWJvYXJkLnRzIiwid2VicGFjazovLy8uL3NyYy9tYWluLnRzIiwid2VicGFjazovLy8uL3NyYy9tYXRoL3ZlY3RvcjIudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3V0aWxzL2lkLWdlbmVyYXRvci50cyIsIndlYnBhY2s6Ly8vLi9zcmMvdXRpbHMva2V5ZWQtY29sbGVjdGlvbi50cyIsIndlYnBhY2s6Ly8vLi9zcmMvdXRpbHMvcmVzb3VyY2UtbG9hZGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGtEQUEwQyxnQ0FBZ0M7QUFDMUU7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxnRUFBd0Qsa0JBQWtCO0FBQzFFO0FBQ0EseURBQWlELGNBQWM7QUFDL0Q7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlEQUF5QyxpQ0FBaUM7QUFDMUUsd0hBQWdILG1CQUFtQixFQUFFO0FBQ3JJO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsbUNBQTJCLDBCQUEwQixFQUFFO0FBQ3ZELHlDQUFpQyxlQUFlO0FBQ2hEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDhEQUFzRCwrREFBK0Q7O0FBRXJIO0FBQ0E7OztBQUdBO0FBQ0E7Ozs7Ozs7Ozs7OztBQ2xGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0NBQWdDLFFBQVE7QUFDeEM7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLFVBQVUsTUFBTTtBQUNoQjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSw2QkFBNkIsSUFBSTtBQUNqQztBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxvQ0FBb0MsOEJBQThCO0FBQ2xFOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsVUFBVSxvQkFBb0I7QUFDOUI7QUFDQTs7QUFFQTtBQUNBLFVBQVUsVUFBVTtBQUNwQjtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxpQkFBaUIsWUFBWTtBQUM3QjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsK0JBQStCLHNCQUFzQjtBQUNyRDtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsbUJBQW1CLGVBQWU7QUFDbEM7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLGtDQUFrQztBQUNsQztBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7O0FDL05BO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7OztBQUlB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QUMsTUFBTSxDQUFDO2dDQUM1QixFQUFFO1lBQ1AsSUFBSSxPQUFLLFFBQVEsQ0FBQyxJQUFJLENBQUMsV0FBQyxJQUFJLFFBQUMsS0FBSyxJQUFJLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxFQUF0QixDQUFzQixDQUFDLEVBQUU7Z0JBQ2pELElBQUksS0FBSyxHQUFHLElBQUksS0FBSyxFQUFFLENBQUM7Z0JBQ3hCLEtBQUssQ0FBQyxnQkFBZ0IsQ0FBQyxNQUFNLEVBQUU7b0JBQzNCLEtBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQztnQkFDeEIsQ0FBQyxDQUFDLENBQUM7Z0JBQ0gsS0FBSyxDQUFDLEdBQUcsR0FBRyxFQUFFLENBQUM7Z0JBQ2YsT0FBSyxNQUFNLENBQUMsR0FBRyxDQUFDLEVBQUUsRUFBRSxLQUFLLENBQUMsQ0FBQzthQUM5QjtZQUNELElBQUksT0FBSyxRQUFRLENBQUMsSUFBSSxDQUFDLFdBQUMsSUFBSSxRQUFDLEtBQUssSUFBSSxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsRUFBdEIsQ0FBc0IsQ0FBQyxFQUFFO2dCQUNqRCxJQUFJLEtBQUssR0FBRyxJQUFJLEtBQUssRUFBRSxDQUFDO2dCQUN4QixLQUFLLENBQUMsZ0JBQWdCLENBQUMsTUFBTSxFQUFFO29CQUMzQixLQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7Z0JBQ3hCLENBQUMsQ0FBQyxDQUFDO2dCQUNILEtBQUssQ0FBQyxHQUFHLEdBQUcsRUFBRSxDQUFDO2dCQUNmLE9BQUssTUFBTSxDQUFDLEdBQUcsQ0FBQyxFQUFFLEVBQUUsS0FBSyxDQUFDLENBQUM7YUFDOUI7UUFDTCxDQUFDOztRQWpCRCxLQUFLLElBQUksRUFBRSxJQUFJLElBQUksQ0FBQyxNQUFNO29CQUFqQixFQUFFO1NBaUJWO0lBQ0wsQ0FBQztJQUNMLHFCQUFDO0FBQUQsQ0FBQztBQTNEWSx3Q0FBYyIsImZpbGUiOiJidW5kbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuL3NyYy9tYWluLnRzXCIpO1xuIiwiLy8gQ29weXJpZ2h0IEpveWVudCwgSW5jLiBhbmQgb3RoZXIgTm9kZSBjb250cmlidXRvcnMuXHJcbi8vXHJcbi8vIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhXHJcbi8vIGNvcHkgb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGVcclxuLy8gXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbCBpbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nXHJcbi8vIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCxcclxuLy8gZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGwgY29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdFxyXG4vLyBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzIGZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0byB0aGVcclxuLy8gZm9sbG93aW5nIGNvbmRpdGlvbnM6XHJcbi8vXHJcbi8vIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkXHJcbi8vIGluIGFsbCBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxyXG4vL1xyXG4vLyBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTXHJcbi8vIE9SIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0ZcclxuLy8gTUVSQ0hBTlRBQklMSVRZLCBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTlxyXG4vLyBOTyBFVkVOVCBTSEFMTCBUSEUgQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSxcclxuLy8gREFNQUdFUyBPUiBPVEhFUiBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SXHJcbi8vIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLCBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEVcclxuLy8gVVNFIE9SIE9USEVSIERFQUxJTkdTIElOIFRIRSBTT0ZUV0FSRS5cclxuXHJcbi8vIHJlc29sdmVzIC4gYW5kIC4uIGVsZW1lbnRzIGluIGEgcGF0aCBhcnJheSB3aXRoIGRpcmVjdG9yeSBuYW1lcyB0aGVyZVxyXG4vLyBtdXN0IGJlIG5vIHNsYXNoZXMsIGVtcHR5IGVsZW1lbnRzLCBvciBkZXZpY2UgbmFtZXMgKGM6XFwpIGluIHRoZSBhcnJheVxyXG4vLyAoc28gYWxzbyBubyBsZWFkaW5nIGFuZCB0cmFpbGluZyBzbGFzaGVzIC0gaXQgZG9lcyBub3QgZGlzdGluZ3Vpc2hcclxuLy8gcmVsYXRpdmUgYW5kIGFic29sdXRlIHBhdGhzKVxyXG5mdW5jdGlvbiBub3JtYWxpemVBcnJheShwYXJ0cywgYWxsb3dBYm92ZVJvb3QpIHtcclxuICAvLyBpZiB0aGUgcGF0aCB0cmllcyB0byBnbyBhYm92ZSB0aGUgcm9vdCwgYHVwYCBlbmRzIHVwID4gMFxyXG4gIHZhciB1cCA9IDA7XHJcbiAgZm9yICh2YXIgaSA9IHBhcnRzLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XHJcbiAgICB2YXIgbGFzdCA9IHBhcnRzW2ldO1xyXG4gICAgaWYgKGxhc3QgPT09ICcuJykge1xyXG4gICAgICBwYXJ0cy5zcGxpY2UoaSwgMSk7XHJcbiAgICB9IGVsc2UgaWYgKGxhc3QgPT09ICcuLicpIHtcclxuICAgICAgcGFydHMuc3BsaWNlKGksIDEpO1xyXG4gICAgICB1cCsrO1xyXG4gICAgfSBlbHNlIGlmICh1cCkge1xyXG4gICAgICBwYXJ0cy5zcGxpY2UoaSwgMSk7XHJcbiAgICAgIHVwLS07XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvLyBpZiB0aGUgcGF0aCBpcyBhbGxvd2VkIHRvIGdvIGFib3ZlIHRoZSByb290LCByZXN0b3JlIGxlYWRpbmcgLi5zXHJcbiAgaWYgKGFsbG93QWJvdmVSb290KSB7XHJcbiAgICBmb3IgKDsgdXAtLTsgdXApIHtcclxuICAgICAgcGFydHMudW5zaGlmdCgnLi4nKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHJldHVybiBwYXJ0cztcclxufVxyXG5cclxuLy8gU3BsaXQgYSBmaWxlbmFtZSBpbnRvIFtyb290LCBkaXIsIGJhc2VuYW1lLCBleHRdLCB1bml4IHZlcnNpb25cclxuLy8gJ3Jvb3QnIGlzIGp1c3QgYSBzbGFzaCwgb3Igbm90aGluZy5cclxudmFyIHNwbGl0UGF0aFJlID1cclxuICAgIC9eKFxcLz98KShbXFxzXFxTXSo/KSgoPzpcXC57MSwyfXxbXlxcL10rP3wpKFxcLlteLlxcL10qfCkpKD86W1xcL10qKSQvO1xyXG52YXIgc3BsaXRQYXRoID0gZnVuY3Rpb24oZmlsZW5hbWUpIHtcclxuICByZXR1cm4gc3BsaXRQYXRoUmUuZXhlYyhmaWxlbmFtZSkuc2xpY2UoMSk7XHJcbn07XHJcblxyXG4vLyBwYXRoLnJlc29sdmUoW2Zyb20gLi4uXSwgdG8pXHJcbi8vIHBvc2l4IHZlcnNpb25cclxuZXhwb3J0cy5yZXNvbHZlID0gZnVuY3Rpb24oKSB7XHJcbiAgdmFyIHJlc29sdmVkUGF0aCA9ICcnLFxyXG4gICAgICByZXNvbHZlZEFic29sdXRlID0gZmFsc2U7XHJcblxyXG4gIGZvciAodmFyIGkgPSBhcmd1bWVudHMubGVuZ3RoIC0gMTsgaSA+PSAtMSAmJiAhcmVzb2x2ZWRBYnNvbHV0ZTsgaS0tKSB7XHJcbiAgICB2YXIgcGF0aCA9IChpID49IDApID8gYXJndW1lbnRzW2ldIDogcHJvY2Vzcy5jd2QoKTtcclxuXHJcbiAgICAvLyBTa2lwIGVtcHR5IGFuZCBpbnZhbGlkIGVudHJpZXNcclxuICAgIGlmICh0eXBlb2YgcGF0aCAhPT0gJ3N0cmluZycpIHtcclxuICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignQXJndW1lbnRzIHRvIHBhdGgucmVzb2x2ZSBtdXN0IGJlIHN0cmluZ3MnKTtcclxuICAgIH0gZWxzZSBpZiAoIXBhdGgpIHtcclxuICAgICAgY29udGludWU7XHJcbiAgICB9XHJcblxyXG4gICAgcmVzb2x2ZWRQYXRoID0gcGF0aCArICcvJyArIHJlc29sdmVkUGF0aDtcclxuICAgIHJlc29sdmVkQWJzb2x1dGUgPSBwYXRoLmNoYXJBdCgwKSA9PT0gJy8nO1xyXG4gIH1cclxuXHJcbiAgLy8gQXQgdGhpcyBwb2ludCB0aGUgcGF0aCBzaG91bGQgYmUgcmVzb2x2ZWQgdG8gYSBmdWxsIGFic29sdXRlIHBhdGgsIGJ1dFxyXG4gIC8vIGhhbmRsZSByZWxhdGl2ZSBwYXRocyB0byBiZSBzYWZlIChtaWdodCBoYXBwZW4gd2hlbiBwcm9jZXNzLmN3ZCgpIGZhaWxzKVxyXG5cclxuICAvLyBOb3JtYWxpemUgdGhlIHBhdGhcclxuICByZXNvbHZlZFBhdGggPSBub3JtYWxpemVBcnJheShmaWx0ZXIocmVzb2x2ZWRQYXRoLnNwbGl0KCcvJyksIGZ1bmN0aW9uKHApIHtcclxuICAgIHJldHVybiAhIXA7XHJcbiAgfSksICFyZXNvbHZlZEFic29sdXRlKS5qb2luKCcvJyk7XHJcblxyXG4gIHJldHVybiAoKHJlc29sdmVkQWJzb2x1dGUgPyAnLycgOiAnJykgKyByZXNvbHZlZFBhdGgpIHx8ICcuJztcclxufTtcclxuXHJcbi8vIHBhdGgubm9ybWFsaXplKHBhdGgpXHJcbi8vIHBvc2l4IHZlcnNpb25cclxuZXhwb3J0cy5ub3JtYWxpemUgPSBmdW5jdGlvbihwYXRoKSB7XHJcbiAgdmFyIGlzQWJzb2x1dGUgPSBleHBvcnRzLmlzQWJzb2x1dGUocGF0aCksXHJcbiAgICAgIHRyYWlsaW5nU2xhc2ggPSBzdWJzdHIocGF0aCwgLTEpID09PSAnLyc7XHJcblxyXG4gIC8vIE5vcm1hbGl6ZSB0aGUgcGF0aFxyXG4gIHBhdGggPSBub3JtYWxpemVBcnJheShmaWx0ZXIocGF0aC5zcGxpdCgnLycpLCBmdW5jdGlvbihwKSB7XHJcbiAgICByZXR1cm4gISFwO1xyXG4gIH0pLCAhaXNBYnNvbHV0ZSkuam9pbignLycpO1xyXG5cclxuICBpZiAoIXBhdGggJiYgIWlzQWJzb2x1dGUpIHtcclxuICAgIHBhdGggPSAnLic7XHJcbiAgfVxyXG4gIGlmIChwYXRoICYmIHRyYWlsaW5nU2xhc2gpIHtcclxuICAgIHBhdGggKz0gJy8nO1xyXG4gIH1cclxuXHJcbiAgcmV0dXJuIChpc0Fic29sdXRlID8gJy8nIDogJycpICsgcGF0aDtcclxufTtcclxuXHJcbi8vIHBvc2l4IHZlcnNpb25cclxuZXhwb3J0cy5pc0Fic29sdXRlID0gZnVuY3Rpb24ocGF0aCkge1xyXG4gIHJldHVybiBwYXRoLmNoYXJBdCgwKSA9PT0gJy8nO1xyXG59O1xyXG5cclxuLy8gcG9zaXggdmVyc2lvblxyXG5leHBvcnRzLmpvaW4gPSBmdW5jdGlvbigpIHtcclxuICB2YXIgcGF0aHMgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmd1bWVudHMsIDApO1xyXG4gIHJldHVybiBleHBvcnRzLm5vcm1hbGl6ZShmaWx0ZXIocGF0aHMsIGZ1bmN0aW9uKHAsIGluZGV4KSB7XHJcbiAgICBpZiAodHlwZW9mIHAgIT09ICdzdHJpbmcnKSB7XHJcbiAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ0FyZ3VtZW50cyB0byBwYXRoLmpvaW4gbXVzdCBiZSBzdHJpbmdzJyk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gcDtcclxuICB9KS5qb2luKCcvJykpO1xyXG59O1xyXG5cclxuXHJcbi8vIHBhdGgucmVsYXRpdmUoZnJvbSwgdG8pXHJcbi8vIHBvc2l4IHZlcnNpb25cclxuZXhwb3J0cy5yZWxhdGl2ZSA9IGZ1bmN0aW9uKGZyb20sIHRvKSB7XHJcbiAgZnJvbSA9IGV4cG9ydHMucmVzb2x2ZShmcm9tKS5zdWJzdHIoMSk7XHJcbiAgdG8gPSBleHBvcnRzLnJlc29sdmUodG8pLnN1YnN0cigxKTtcclxuXHJcbiAgZnVuY3Rpb24gdHJpbShhcnIpIHtcclxuICAgIHZhciBzdGFydCA9IDA7XHJcbiAgICBmb3IgKDsgc3RhcnQgPCBhcnIubGVuZ3RoOyBzdGFydCsrKSB7XHJcbiAgICAgIGlmIChhcnJbc3RhcnRdICE9PSAnJykgYnJlYWs7XHJcbiAgICB9XHJcblxyXG4gICAgdmFyIGVuZCA9IGFyci5sZW5ndGggLSAxO1xyXG4gICAgZm9yICg7IGVuZCA+PSAwOyBlbmQtLSkge1xyXG4gICAgICBpZiAoYXJyW2VuZF0gIT09ICcnKSBicmVhaztcclxuICAgIH1cclxuXHJcbiAgICBpZiAoc3RhcnQgPiBlbmQpIHJldHVybiBbXTtcclxuICAgIHJldHVybiBhcnIuc2xpY2Uoc3RhcnQsIGVuZCAtIHN0YXJ0ICsgMSk7XHJcbiAgfVxyXG5cclxuICB2YXIgZnJvbVBhcnRzID0gdHJpbShmcm9tLnNwbGl0KCcvJykpO1xyXG4gIHZhciB0b1BhcnRzID0gdHJpbSh0by5zcGxpdCgnLycpKTtcclxuXHJcbiAgdmFyIGxlbmd0aCA9IE1hdGgubWluKGZyb21QYXJ0cy5sZW5ndGgsIHRvUGFydHMubGVuZ3RoKTtcclxuICB2YXIgc2FtZVBhcnRzTGVuZ3RoID0gbGVuZ3RoO1xyXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgbGVuZ3RoOyBpKyspIHtcclxuICAgIGlmIChmcm9tUGFydHNbaV0gIT09IHRvUGFydHNbaV0pIHtcclxuICAgICAgc2FtZVBhcnRzTGVuZ3RoID0gaTtcclxuICAgICAgYnJlYWs7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICB2YXIgb3V0cHV0UGFydHMgPSBbXTtcclxuICBmb3IgKHZhciBpID0gc2FtZVBhcnRzTGVuZ3RoOyBpIDwgZnJvbVBhcnRzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICBvdXRwdXRQYXJ0cy5wdXNoKCcuLicpO1xyXG4gIH1cclxuXHJcbiAgb3V0cHV0UGFydHMgPSBvdXRwdXRQYXJ0cy5jb25jYXQodG9QYXJ0cy5zbGljZShzYW1lUGFydHNMZW5ndGgpKTtcclxuXHJcbiAgcmV0dXJuIG91dHB1dFBhcnRzLmpvaW4oJy8nKTtcclxufTtcclxuXHJcbmV4cG9ydHMuc2VwID0gJy8nO1xyXG5leHBvcnRzLmRlbGltaXRlciA9ICc6JztcclxuXHJcbmV4cG9ydHMuZGlybmFtZSA9IGZ1bmN0aW9uKHBhdGgpIHtcclxuICB2YXIgcmVzdWx0ID0gc3BsaXRQYXRoKHBhdGgpLFxyXG4gICAgICByb290ID0gcmVzdWx0WzBdLFxyXG4gICAgICBkaXIgPSByZXN1bHRbMV07XHJcblxyXG4gIGlmICghcm9vdCAmJiAhZGlyKSB7XHJcbiAgICAvLyBObyBkaXJuYW1lIHdoYXRzb2V2ZXJcclxuICAgIHJldHVybiAnLic7XHJcbiAgfVxyXG5cclxuICBpZiAoZGlyKSB7XHJcbiAgICAvLyBJdCBoYXMgYSBkaXJuYW1lLCBzdHJpcCB0cmFpbGluZyBzbGFzaFxyXG4gICAgZGlyID0gZGlyLnN1YnN0cigwLCBkaXIubGVuZ3RoIC0gMSk7XHJcbiAgfVxyXG5cclxuICByZXR1cm4gcm9vdCArIGRpcjtcclxufTtcclxuXHJcblxyXG5leHBvcnRzLmJhc2VuYW1lID0gZnVuY3Rpb24ocGF0aCwgZXh0KSB7XHJcbiAgdmFyIGYgPSBzcGxpdFBhdGgocGF0aClbMl07XHJcbiAgLy8gVE9ETzogbWFrZSB0aGlzIGNvbXBhcmlzb24gY2FzZS1pbnNlbnNpdGl2ZSBvbiB3aW5kb3dzP1xyXG4gIGlmIChleHQgJiYgZi5zdWJzdHIoLTEgKiBleHQubGVuZ3RoKSA9PT0gZXh0KSB7XHJcbiAgICBmID0gZi5zdWJzdHIoMCwgZi5sZW5ndGggLSBleHQubGVuZ3RoKTtcclxuICB9XHJcbiAgcmV0dXJuIGY7XHJcbn07XHJcblxyXG5cclxuZXhwb3J0cy5leHRuYW1lID0gZnVuY3Rpb24ocGF0aCkge1xyXG4gIHJldHVybiBzcGxpdFBhdGgocGF0aClbM107XHJcbn07XHJcblxyXG5mdW5jdGlvbiBmaWx0ZXIgKHhzLCBmKSB7XHJcbiAgICBpZiAoeHMuZmlsdGVyKSByZXR1cm4geHMuZmlsdGVyKGYpO1xyXG4gICAgdmFyIHJlcyA9IFtdO1xyXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCB4cy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgIGlmIChmKHhzW2ldLCBpLCB4cykpIHJlcy5wdXNoKHhzW2ldKTtcclxuICAgIH1cclxuICAgIHJldHVybiByZXM7XHJcbn1cclxuXHJcbi8vIFN0cmluZy5wcm90b3R5cGUuc3Vic3RyIC0gbmVnYXRpdmUgaW5kZXggZG9uJ3Qgd29yayBpbiBJRThcclxudmFyIHN1YnN0ciA9ICdhYicuc3Vic3RyKC0xKSA9PT0gJ2InXHJcbiAgICA/IGZ1bmN0aW9uIChzdHIsIHN0YXJ0LCBsZW4pIHsgcmV0dXJuIHN0ci5zdWJzdHIoc3RhcnQsIGxlbikgfVxyXG4gICAgOiBmdW5jdGlvbiAoc3RyLCBzdGFydCwgbGVuKSB7XHJcbiAgICAgICAgaWYgKHN0YXJ0IDwgMCkgc3RhcnQgPSBzdHIubGVuZ3RoICsgc3RhcnQ7XHJcbiAgICAgICAgcmV0dXJuIHN0ci5zdWJzdHIoc3RhcnQsIGxlbik7XHJcbiAgICB9XHJcbjtcclxuIiwiLy8gc2hpbSBmb3IgdXNpbmcgcHJvY2VzcyBpbiBicm93c2VyXHJcbnZhciBwcm9jZXNzID0gbW9kdWxlLmV4cG9ydHMgPSB7fTtcclxuXHJcbi8vIGNhY2hlZCBmcm9tIHdoYXRldmVyIGdsb2JhbCBpcyBwcmVzZW50IHNvIHRoYXQgdGVzdCBydW5uZXJzIHRoYXQgc3R1YiBpdFxyXG4vLyBkb24ndCBicmVhayB0aGluZ3MuICBCdXQgd2UgbmVlZCB0byB3cmFwIGl0IGluIGEgdHJ5IGNhdGNoIGluIGNhc2UgaXQgaXNcclxuLy8gd3JhcHBlZCBpbiBzdHJpY3QgbW9kZSBjb2RlIHdoaWNoIGRvZXNuJ3QgZGVmaW5lIGFueSBnbG9iYWxzLiAgSXQncyBpbnNpZGUgYVxyXG4vLyBmdW5jdGlvbiBiZWNhdXNlIHRyeS9jYXRjaGVzIGRlb3B0aW1pemUgaW4gY2VydGFpbiBlbmdpbmVzLlxyXG5cclxudmFyIGNhY2hlZFNldFRpbWVvdXQ7XHJcbnZhciBjYWNoZWRDbGVhclRpbWVvdXQ7XHJcblxyXG5mdW5jdGlvbiBkZWZhdWx0U2V0VGltb3V0KCkge1xyXG4gICAgdGhyb3cgbmV3IEVycm9yKCdzZXRUaW1lb3V0IGhhcyBub3QgYmVlbiBkZWZpbmVkJyk7XHJcbn1cclxuZnVuY3Rpb24gZGVmYXVsdENsZWFyVGltZW91dCAoKSB7XHJcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ2NsZWFyVGltZW91dCBoYXMgbm90IGJlZW4gZGVmaW5lZCcpO1xyXG59XHJcbihmdW5jdGlvbiAoKSB7XHJcbiAgICB0cnkge1xyXG4gICAgICAgIGlmICh0eXBlb2Ygc2V0VGltZW91dCA9PT0gJ2Z1bmN0aW9uJykge1xyXG4gICAgICAgICAgICBjYWNoZWRTZXRUaW1lb3V0ID0gc2V0VGltZW91dDtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBjYWNoZWRTZXRUaW1lb3V0ID0gZGVmYXVsdFNldFRpbW91dDtcclxuICAgICAgICB9XHJcbiAgICB9IGNhdGNoIChlKSB7XHJcbiAgICAgICAgY2FjaGVkU2V0VGltZW91dCA9IGRlZmF1bHRTZXRUaW1vdXQ7XHJcbiAgICB9XHJcbiAgICB0cnkge1xyXG4gICAgICAgIGlmICh0eXBlb2YgY2xlYXJUaW1lb3V0ID09PSAnZnVuY3Rpb24nKSB7XHJcbiAgICAgICAgICAgIGNhY2hlZENsZWFyVGltZW91dCA9IGNsZWFyVGltZW91dDtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBjYWNoZWRDbGVhclRpbWVvdXQgPSBkZWZhdWx0Q2xlYXJUaW1lb3V0O1xyXG4gICAgICAgIH1cclxuICAgIH0gY2F0Y2ggKGUpIHtcclxuICAgICAgICBjYWNoZWRDbGVhclRpbWVvdXQgPSBkZWZhdWx0Q2xlYXJUaW1lb3V0O1xyXG4gICAgfVxyXG59ICgpKVxyXG5mdW5jdGlvbiBydW5UaW1lb3V0KGZ1bikge1xyXG4gICAgaWYgKGNhY2hlZFNldFRpbWVvdXQgPT09IHNldFRpbWVvdXQpIHtcclxuICAgICAgICAvL25vcm1hbCBlbnZpcm9tZW50cyBpbiBzYW5lIHNpdHVhdGlvbnNcclxuICAgICAgICByZXR1cm4gc2V0VGltZW91dChmdW4sIDApO1xyXG4gICAgfVxyXG4gICAgLy8gaWYgc2V0VGltZW91dCB3YXNuJ3QgYXZhaWxhYmxlIGJ1dCB3YXMgbGF0dGVyIGRlZmluZWRcclxuICAgIGlmICgoY2FjaGVkU2V0VGltZW91dCA9PT0gZGVmYXVsdFNldFRpbW91dCB8fCAhY2FjaGVkU2V0VGltZW91dCkgJiYgc2V0VGltZW91dCkge1xyXG4gICAgICAgIGNhY2hlZFNldFRpbWVvdXQgPSBzZXRUaW1lb3V0O1xyXG4gICAgICAgIHJldHVybiBzZXRUaW1lb3V0KGZ1biwgMCk7XHJcbiAgICB9XHJcbiAgICB0cnkge1xyXG4gICAgICAgIC8vIHdoZW4gd2hlbiBzb21lYm9keSBoYXMgc2NyZXdlZCB3aXRoIHNldFRpbWVvdXQgYnV0IG5vIEkuRS4gbWFkZG5lc3NcclxuICAgICAgICByZXR1cm4gY2FjaGVkU2V0VGltZW91dChmdW4sIDApO1xyXG4gICAgfSBjYXRjaChlKXtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICAvLyBXaGVuIHdlIGFyZSBpbiBJLkUuIGJ1dCB0aGUgc2NyaXB0IGhhcyBiZWVuIGV2YWxlZCBzbyBJLkUuIGRvZXNuJ3QgdHJ1c3QgdGhlIGdsb2JhbCBvYmplY3Qgd2hlbiBjYWxsZWQgbm9ybWFsbHlcclxuICAgICAgICAgICAgcmV0dXJuIGNhY2hlZFNldFRpbWVvdXQuY2FsbChudWxsLCBmdW4sIDApO1xyXG4gICAgICAgIH0gY2F0Y2goZSl7XHJcbiAgICAgICAgICAgIC8vIHNhbWUgYXMgYWJvdmUgYnV0IHdoZW4gaXQncyBhIHZlcnNpb24gb2YgSS5FLiB0aGF0IG11c3QgaGF2ZSB0aGUgZ2xvYmFsIG9iamVjdCBmb3IgJ3RoaXMnLCBob3BmdWxseSBvdXIgY29udGV4dCBjb3JyZWN0IG90aGVyd2lzZSBpdCB3aWxsIHRocm93IGEgZ2xvYmFsIGVycm9yXHJcbiAgICAgICAgICAgIHJldHVybiBjYWNoZWRTZXRUaW1lb3V0LmNhbGwodGhpcywgZnVuLCAwKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG5cclxufVxyXG5mdW5jdGlvbiBydW5DbGVhclRpbWVvdXQobWFya2VyKSB7XHJcbiAgICBpZiAoY2FjaGVkQ2xlYXJUaW1lb3V0ID09PSBjbGVhclRpbWVvdXQpIHtcclxuICAgICAgICAvL25vcm1hbCBlbnZpcm9tZW50cyBpbiBzYW5lIHNpdHVhdGlvbnNcclxuICAgICAgICByZXR1cm4gY2xlYXJUaW1lb3V0KG1hcmtlcik7XHJcbiAgICB9XHJcbiAgICAvLyBpZiBjbGVhclRpbWVvdXQgd2Fzbid0IGF2YWlsYWJsZSBidXQgd2FzIGxhdHRlciBkZWZpbmVkXHJcbiAgICBpZiAoKGNhY2hlZENsZWFyVGltZW91dCA9PT0gZGVmYXVsdENsZWFyVGltZW91dCB8fCAhY2FjaGVkQ2xlYXJUaW1lb3V0KSAmJiBjbGVhclRpbWVvdXQpIHtcclxuICAgICAgICBjYWNoZWRDbGVhclRpbWVvdXQgPSBjbGVhclRpbWVvdXQ7XHJcbiAgICAgICAgcmV0dXJuIGNsZWFyVGltZW91dChtYXJrZXIpO1xyXG4gICAgfVxyXG4gICAgdHJ5IHtcclxuICAgICAgICAvLyB3aGVuIHdoZW4gc29tZWJvZHkgaGFzIHNjcmV3ZWQgd2l0aCBzZXRUaW1lb3V0IGJ1dCBubyBJLkUuIG1hZGRuZXNzXHJcbiAgICAgICAgcmV0dXJuIGNhY2hlZENsZWFyVGltZW91dChtYXJrZXIpO1xyXG4gICAgfSBjYXRjaCAoZSl7XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgLy8gV2hlbiB3ZSBhcmUgaW4gSS5FLiBidXQgdGhlIHNjcmlwdCBoYXMgYmVlbiBldmFsZWQgc28gSS5FLiBkb2Vzbid0ICB0cnVzdCB0aGUgZ2xvYmFsIG9iamVjdCB3aGVuIGNhbGxlZCBub3JtYWxseVxyXG4gICAgICAgICAgICByZXR1cm4gY2FjaGVkQ2xlYXJUaW1lb3V0LmNhbGwobnVsbCwgbWFya2VyKTtcclxuICAgICAgICB9IGNhdGNoIChlKXtcclxuICAgICAgICAgICAgLy8gc2FtZSBhcyBhYm92ZSBidXQgd2hlbiBpdCdzIGEgdmVyc2lvbiBvZiBJLkUuIHRoYXQgbXVzdCBoYXZlIHRoZSBnbG9iYWwgb2JqZWN0IGZvciAndGhpcycsIGhvcGZ1bGx5IG91ciBjb250ZXh0IGNvcnJlY3Qgb3RoZXJ3aXNlIGl0IHdpbGwgdGhyb3cgYSBnbG9iYWwgZXJyb3IuXHJcbiAgICAgICAgICAgIC8vIFNvbWUgdmVyc2lvbnMgb2YgSS5FLiBoYXZlIGRpZmZlcmVudCBydWxlcyBmb3IgY2xlYXJUaW1lb3V0IHZzIHNldFRpbWVvdXRcclxuICAgICAgICAgICAgcmV0dXJuIGNhY2hlZENsZWFyVGltZW91dC5jYWxsKHRoaXMsIG1hcmtlcik7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuXHJcblxyXG59XHJcbnZhciBxdWV1ZSA9IFtdO1xyXG52YXIgZHJhaW5pbmcgPSBmYWxzZTtcclxudmFyIGN1cnJlbnRRdWV1ZTtcclxudmFyIHF1ZXVlSW5kZXggPSAtMTtcclxuXHJcbmZ1bmN0aW9uIGNsZWFuVXBOZXh0VGljaygpIHtcclxuICAgIGlmICghZHJhaW5pbmcgfHwgIWN1cnJlbnRRdWV1ZSkge1xyXG4gICAgICAgIHJldHVybjtcclxuICAgIH1cclxuICAgIGRyYWluaW5nID0gZmFsc2U7XHJcbiAgICBpZiAoY3VycmVudFF1ZXVlLmxlbmd0aCkge1xyXG4gICAgICAgIHF1ZXVlID0gY3VycmVudFF1ZXVlLmNvbmNhdChxdWV1ZSk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIHF1ZXVlSW5kZXggPSAtMTtcclxuICAgIH1cclxuICAgIGlmIChxdWV1ZS5sZW5ndGgpIHtcclxuICAgICAgICBkcmFpblF1ZXVlKCk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGRyYWluUXVldWUoKSB7XHJcbiAgICBpZiAoZHJhaW5pbmcpIHtcclxuICAgICAgICByZXR1cm47XHJcbiAgICB9XHJcbiAgICB2YXIgdGltZW91dCA9IHJ1blRpbWVvdXQoY2xlYW5VcE5leHRUaWNrKTtcclxuICAgIGRyYWluaW5nID0gdHJ1ZTtcclxuXHJcbiAgICB2YXIgbGVuID0gcXVldWUubGVuZ3RoO1xyXG4gICAgd2hpbGUobGVuKSB7XHJcbiAgICAgICAgY3VycmVudFF1ZXVlID0gcXVldWU7XHJcbiAgICAgICAgcXVldWUgPSBbXTtcclxuICAgICAgICB3aGlsZSAoKytxdWV1ZUluZGV4IDwgbGVuKSB7XHJcbiAgICAgICAgICAgIGlmIChjdXJyZW50UXVldWUpIHtcclxuICAgICAgICAgICAgICAgIGN1cnJlbnRRdWV1ZVtxdWV1ZUluZGV4XS5ydW4oKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBxdWV1ZUluZGV4ID0gLTE7XHJcbiAgICAgICAgbGVuID0gcXVldWUubGVuZ3RoO1xyXG4gICAgfVxyXG4gICAgY3VycmVudFF1ZXVlID0gbnVsbDtcclxuICAgIGRyYWluaW5nID0gZmFsc2U7XHJcbiAgICBydW5DbGVhclRpbWVvdXQodGltZW91dCk7XHJcbn1cclxuXHJcbnByb2Nlc3MubmV4dFRpY2sgPSBmdW5jdGlvbiAoZnVuKSB7XHJcbiAgICB2YXIgYXJncyA9IG5ldyBBcnJheShhcmd1bWVudHMubGVuZ3RoIC0gMSk7XHJcbiAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA+IDEpIHtcclxuICAgICAgICBmb3IgKHZhciBpID0gMTsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBhcmdzW2kgLSAxXSA9IGFyZ3VtZW50c1tpXTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBxdWV1ZS5wdXNoKG5ldyBJdGVtKGZ1biwgYXJncykpO1xyXG4gICAgaWYgKHF1ZXVlLmxlbmd0aCA9PT0gMSAmJiAhZHJhaW5pbmcpIHtcclxuICAgICAgICBydW5UaW1lb3V0KGRyYWluUXVldWUpO1xyXG4gICAgfVxyXG59O1xyXG5cclxuLy8gdjggbGlrZXMgcHJlZGljdGlibGUgb2JqZWN0c1xyXG5mdW5jdGlvbiBJdGVtKGZ1biwgYXJyYXkpIHtcclxuICAgIHRoaXMuZnVuID0gZnVuO1xyXG4gICAgdGhpcy5hcnJheSA9IGFycmF5O1xyXG59XHJcbkl0ZW0ucHJvdG90eXBlLnJ1biA9IGZ1bmN0aW9uICgpIHtcclxuICAgIHRoaXMuZnVuLmFwcGx5KG51bGwsIHRoaXMuYXJyYXkpO1xyXG59O1xyXG5wcm9jZXNzLnRpdGxlID0gJ2Jyb3dzZXInO1xyXG5wcm9jZXNzLmJyb3dzZXIgPSB0cnVlO1xyXG5wcm9jZXNzLmVudiA9IHt9O1xyXG5wcm9jZXNzLmFyZ3YgPSBbXTtcclxucHJvY2Vzcy52ZXJzaW9uID0gJyc7IC8vIGVtcHR5IHN0cmluZyB0byBhdm9pZCByZWdleHAgaXNzdWVzXHJcbnByb2Nlc3MudmVyc2lvbnMgPSB7fTtcclxuXHJcbmZ1bmN0aW9uIG5vb3AoKSB7fVxyXG5cclxucHJvY2Vzcy5vbiA9IG5vb3A7XHJcbnByb2Nlc3MuYWRkTGlzdGVuZXIgPSBub29wO1xyXG5wcm9jZXNzLm9uY2UgPSBub29wO1xyXG5wcm9jZXNzLm9mZiA9IG5vb3A7XHJcbnByb2Nlc3MucmVtb3ZlTGlzdGVuZXIgPSBub29wO1xyXG5wcm9jZXNzLnJlbW92ZUFsbExpc3RlbmVycyA9IG5vb3A7XHJcbnByb2Nlc3MuZW1pdCA9IG5vb3A7XHJcbnByb2Nlc3MucHJlcGVuZExpc3RlbmVyID0gbm9vcDtcclxucHJvY2Vzcy5wcmVwZW5kT25jZUxpc3RlbmVyID0gbm9vcDtcclxuXHJcbnByb2Nlc3MubGlzdGVuZXJzID0gZnVuY3Rpb24gKG5hbWUpIHsgcmV0dXJuIFtdIH1cclxuXHJcbnByb2Nlc3MuYmluZGluZyA9IGZ1bmN0aW9uIChuYW1lKSB7XHJcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ3Byb2Nlc3MuYmluZGluZyBpcyBub3Qgc3VwcG9ydGVkJyk7XHJcbn07XHJcblxyXG5wcm9jZXNzLmN3ZCA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuICcvJyB9O1xyXG5wcm9jZXNzLmNoZGlyID0gZnVuY3Rpb24gKGRpcikge1xyXG4gICAgdGhyb3cgbmV3IEVycm9yKCdwcm9jZXNzLmNoZGlyIGlzIG5vdCBzdXBwb3J0ZWQnKTtcclxufTtcclxucHJvY2Vzcy51bWFzayA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gMDsgfTtcclxuIiwiaW1wb3J0IHsgRW50aXR5IH0gZnJvbSBcIi4vZW50aXR5XCI7XHJcblxyXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgQmVoYXZpb3Ige1xyXG5cclxuICAgIHByb3RlY3RlZCBfbmVlZHNVcGRhdGU6IGJvb2xlYW4gPSBmYWxzZTtcclxuXHJcbiAgICBwdWJsaWMgX293bmVyOiBFbnRpdHk7XHJcblxyXG4gICAgZ2V0IG5lZWRzVXBkYXRlKCk6IGJvb2xlYW4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9uZWVkc1VwZGF0ZTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgcHJlU3RhcnQoKTogdm9pZCB7IH1cclxuICAgIHB1YmxpYyBzdGFydCgpOiB2b2lkIHsgfVxyXG4gICAgcHVibGljIHVwZGF0ZShkdDogbnVtYmVyKTogdm9pZCB7IH1cclxuICAgIHB1YmxpYyBlbmQoKTogdm9pZCB7IH1cclxufVxyXG4iLCJpbXBvcnQgeyBCZWhhdmlvciB9IGZyb20gXCIuL2JlaGF2aW9yXCI7XHJcbmltcG9ydCB7IElkR2VuZXJhdG9yIH0gZnJvbSBcIi4uL3V0aWxzL2lkLWdlbmVyYXRvclwiO1xyXG5pbXBvcnQgeyBLZXllZENvbGxlY3Rpb24gfSBmcm9tIFwiLi4vdXRpbHMva2V5ZWQtY29sbGVjdGlvblwiO1xyXG5pbXBvcnQgeyBWZWN0b3IyIH0gZnJvbSBcIi4uL21hdGgvdmVjdG9yMlwiO1xyXG5pbXBvcnQgeyBMZXZlbCB9IGZyb20gXCIuL2xldmVsXCI7XHJcbmltcG9ydCB7IFNjZW5lTm9kZSB9IGZyb20gXCIuL3NjZW5lLW5vZGVcIjtcclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgSUVudGl0eU9wdGlvbnMge1xyXG4gICAgbmFtZTogc3RyaW5nO1xyXG4gICAgYmVoYXZpb3JzOiBCZWhhdmlvcltdO1xyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgRW50aXR5IGV4dGVuZHMgU2NlbmVOb2RlIHtcclxuXHJcbiAgICBwcml2YXRlIF9pZDogbnVtYmVyID0gLTE7XHJcbiAgICBwcml2YXRlIF9uYW1lOiBzdHJpbmcgPSBcIlwiO1xyXG4gICAgcHJpdmF0ZSBfcG9zaXRpb246IFZlY3RvcjIgPSBuZXcgVmVjdG9yMigwLCAwKTtcclxuXHJcbiAgICBwcml2YXRlIF9iZWhhdmlvcnNCeUlkOiBLZXllZENvbGxlY3Rpb248QmVoYXZpb3I+ID0gbmV3IEtleWVkQ29sbGVjdGlvbjxCZWhhdmlvcj4oKTtcclxuICAgIHByaXZhdGUgX2JlaGF2aW9yc1RvVXBkYXRlOiBCZWhhdmlvcltdID0gW107XHJcblxyXG4gICAgcHJpdmF0ZSBfaWRHZW46IElkR2VuZXJhdG9yID0gbmV3IElkR2VuZXJhdG9yKCk7XHJcblxyXG4gICAgcHJpdmF0ZSBfbGV2ZWw6IExldmVsO1xyXG5cclxuICAgIGdldCBpZCgpOiBudW1iZXIge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9pZDtcclxuICAgIH1cclxuICAgIGdldCBuYW1lKCk6IHN0cmluZyB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX25hbWU7XHJcbiAgICB9XHJcbiAgICBnZXQgcG9zaXRpb24oKTogVmVjdG9yMiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3Bvc2l0aW9uO1xyXG4gICAgfVxyXG4gICAgZ2V0IGJlaGF2aW9yQ291bnQoKTogbnVtYmVyIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fYmVoYXZpb3JzQnlJZC5jb3VudCgpO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0cnVjdG9yKG9wdDogSUVudGl0eU9wdGlvbnMpIHtcclxuICAgICAgICBzdXBlcigpO1xyXG5cclxuICAgICAgICB0aGlzLl9uYW1lID0gb3B0Lm5hbWU7XHJcblxyXG4gICAgICAgIGZvciAobGV0IGIgb2Ygb3B0LmJlaGF2aW9ycykge1xyXG4gICAgICAgICAgICBiLl9vd25lciA9IHRoaXM7XHJcbiAgICAgICAgICAgIHRoaXMuX2JlaGF2aW9yc0J5SWQuYWRkKHRoaXMuX2lkR2VuLmdldElkKCksIGIpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgX3NldElkKGlkOiBudW1iZXIpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLl9pZCA9IGlkO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBfc2V0TGV2ZWwobGV2ZWw6IExldmVsKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5fbGV2ZWwgPSBsZXZlbDtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0TGV2ZWwoKTogTGV2ZWwge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9sZXZlbDtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0QmVoYXZpb3JCeUlkKGlkOiBudW1iZXIpOiBCZWhhdmlvciB8IG51bGwge1xyXG4gICAgICAgIGlmICh0aGlzLl9iZWhhdmlvcnNCeUlkLml0ZW0oaWQpKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9iZWhhdmlvcnNCeUlkLml0ZW0oaWQpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0QmVoYXZpb3JPZlR5cGU8VCBleHRlbmRzIEJlaGF2aW9yPih0Y3RvcjogbmV3ICguLi5hcmdzOiBhbnlbXSkgPT4gVCk6IFQgfCBudWxsIHtcclxuICAgICAgICBmb3IgKGxldCBiIG9mIHRoaXMuX2JlaGF2aW9yc0J5SWQudmFsdWVzKCkpIHtcclxuICAgICAgICAgICAgaWYgKGIgaW5zdGFuY2VvZiB0Y3Rvcikge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGIgYXMgVDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgcHJlU3RhcnQoKTogdm9pZCB7XHJcbiAgICAgICAgLy8gTk9USUNFOiBDYWxsaW5nIC52YWx1ZXMoKSBtdWx0aXBsZSB0aW1lcyBwZXIgZnJhbWVcclxuICAgICAgICBmb3IgKGxldCBiIG9mIHRoaXMuX2JlaGF2aW9yc0J5SWQudmFsdWVzKCkpIHtcclxuICAgICAgICAgICAgaWYgKGIubmVlZHNVcGRhdGUpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX2JlaGF2aW9yc1RvVXBkYXRlLnB1c2goYik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgYi5wcmVTdGFydCgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc3RhcnQoKTogdm9pZCB7XHJcbiAgICAgICAgZm9yIChsZXQgYiBvZiB0aGlzLl9iZWhhdmlvcnNCeUlkLnZhbHVlcygpKSB7XHJcbiAgICAgICAgICAgIGIuc3RhcnQoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHVwZGF0ZShkdDogbnVtYmVyKTogdm9pZCB7XHJcbiAgICAgICAgZm9yIChsZXQgYiBvZiB0aGlzLl9iZWhhdmlvcnNUb1VwZGF0ZSkge1xyXG4gICAgICAgICAgICBiLnVwZGF0ZShkdCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBlbmQoKTogdm9pZCB7XHJcbiAgICAgICAgZm9yIChsZXQgYiBvZiB0aGlzLl9iZWhhdmlvcnNCeUlkLnZhbHVlcygpKSB7XHJcbiAgICAgICAgICAgIGIuZW5kKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbiIsImltcG9ydCB7IEtleWVkQ29sbGVjdGlvbiB9IGZyb20gXCIuLi91dGlscy9rZXllZC1jb2xsZWN0aW9uXCI7XHJcbmltcG9ydCB7IEVudGl0eSB9IGZyb20gXCIuL2VudGl0eVwiO1xyXG5pbXBvcnQgeyBJZEdlbmVyYXRvciB9IGZyb20gXCIuLi91dGlscy9pZC1nZW5lcmF0b3JcIjtcclxuaW1wb3J0IHsgU3ByaXRlIH0gZnJvbSBcIi4vc3ByaXRlXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgTGV2ZWwge1xyXG5cclxuICAgIHByaXZhdGUgX2VudGl0aWVzQnlJZDogS2V5ZWRDb2xsZWN0aW9uPEVudGl0eT47XHJcbiAgICBwcml2YXRlIF9lbnRpdGllc1RvQWRkOiBFbnRpdHlbXTtcclxuICAgIHByaXZhdGUgX2VudGl0aWVzVG9SZW1vdmU6IG51bWJlcltdO1xyXG5cclxuICAgIHByaXZhdGUgX2lkR2VuOiBJZEdlbmVyYXRvcjtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICB0aGlzLl9lbnRpdGllc0J5SWQgPSBuZXcgS2V5ZWRDb2xsZWN0aW9uPEVudGl0eT4oKTtcclxuICAgICAgICB0aGlzLl9lbnRpdGllc1RvQWRkID0gW107XHJcbiAgICAgICAgdGhpcy5fZW50aXRpZXNUb1JlbW92ZSA9IFtdO1xyXG5cclxuICAgICAgICB0aGlzLl9pZEdlbiA9IG5ldyBJZEdlbmVyYXRvcigpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBhZGRFbnRpdHkoZTogRW50aXR5KTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5fZW50aXRpZXNUb0FkZC5wdXNoKGUpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXRFbnRpdHlCeUlkKGlkOiBudW1iZXIpOiBFbnRpdHkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9lbnRpdGllc0J5SWQuaXRlbShpZCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHN0YXJ0KCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuX3VwZGF0ZUVudGl0eUxpc3RzKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHVwZGF0ZShkdDogbnVtYmVyKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5fdXBkYXRlRW50aXR5TGlzdHMoKTtcclxuXHJcbiAgICAgICAgZm9yIChsZXQgZSBvZiB0aGlzLl9lbnRpdGllc0J5SWQudmFsdWVzKCkpIHtcclxuICAgICAgICAgICAgZS51cGRhdGUoZHQpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZHJhdyhjdHg6IENhbnZhc1JlbmRlcmluZ0NvbnRleHQyRCk6IHZvaWQge1xyXG4gICAgICAgIGZvcihsZXQgZSBvZiB0aGlzLl9lbnRpdGllc0J5SWQudmFsdWVzKCkpIHtcclxuICAgICAgICAgICAgbGV0IHMgPSBlLmdldEJlaGF2aW9yT2ZUeXBlKFNwcml0ZSk7XHJcbiAgICAgICAgICAgIGlmIChzICE9IG51bGwpIHtcclxuICAgICAgICAgICAgICAgIGN0eC5kcmF3SW1hZ2Uocy50ZXh0dXJlLCBlLnBvc2l0aW9uLngsIGUucG9zaXRpb24ueSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGVuZCgpOiB2b2lkIHtcclxuICAgICAgICBmb3IgKGxldCBlIG9mIHRoaXMuX2VudGl0aWVzQnlJZC52YWx1ZXMoKSkge1xyXG4gICAgICAgICAgICBlLmVuZCgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIF91cGRhdGVFbnRpdHlMaXN0cygpOiB2b2lkIHtcclxuICAgICAgICB3aGlsZSAodGhpcy5fZW50aXRpZXNUb1JlbW92ZS5sZW5ndGggIT09IDApIHtcclxuICAgICAgICAgICAgbGV0IGVJZCA9IDxudW1iZXI+dGhpcy5fZW50aXRpZXNUb1JlbW92ZS5wb3AoKTtcclxuICAgICAgICAgICAgbGV0IGUgPSB0aGlzLmdldEVudGl0eUJ5SWQoZUlkKTtcclxuICAgICAgICAgICAgZS5lbmQoKTtcclxuICAgICAgICAgICAgdGhpcy5fZW50aXRpZXNCeUlkLnJlbW92ZShlSWQpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZm9yIChsZXQgZSBvZiB0aGlzLl9lbnRpdGllc1RvQWRkKSB7XHJcbiAgICAgICAgICAgIGUuX3NldExldmVsKHRoaXMpO1xyXG4gICAgICAgICAgICBlLl9zZXRJZCh0aGlzLl9pZEdlbi5nZXRJZCgpKTtcclxuICAgICAgICAgICAgZS5wcmVTdGFydCgpO1xyXG4gICAgICAgICAgICB0aGlzLl9lbnRpdGllc0J5SWQuYWRkKGUuaWQsIGUpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgd2hpbGUgKHRoaXMuX2VudGl0aWVzVG9BZGQubGVuZ3RoICE9PSAwKSB7XHJcbiAgICAgICAgICAgIGxldCBlID0gPEVudGl0eT50aGlzLl9lbnRpdGllc1RvQWRkLnBvcCgpO1xyXG4gICAgICAgICAgICBlLnN0YXJ0KCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbiIsImltcG9ydCB7IEtleWJvYXJkIH0gZnJvbSBcIi4uL2lucHV0L2tleWJvYXJkXCI7XHJcbmltcG9ydCB7IExldmVsIH0gZnJvbSBcIi4vbGV2ZWxcIjtcclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgTUdhbWVTdGFydE9wdGlvbnMge1xyXG4gICAgc3RhcnRMZXZlbDogTGV2ZWw7XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBNR2FtZSB7XHJcbiAgICBwdWJsaWMgY2FudmFzOiBIVE1MQ2FudmFzRWxlbWVudDtcclxuICAgIHB1YmxpYyBjb250ZXh0OiBDYW52YXNSZW5kZXJpbmdDb250ZXh0MkQgfCBudWxsO1xyXG5cclxuICAgIHByaXZhdGUgbm93OiBudW1iZXI7XHJcbiAgICBwcml2YXRlIGR0OiBudW1iZXI7XHJcbiAgICBwcml2YXRlIGxhc3Q6IG51bWJlcjtcclxuICAgIHByaXZhdGUgc3RlcDogbnVtYmVyO1xyXG5cclxuICAgIHByaXZhdGUgaW50ZXJ2YWw6IG51bWJlcjtcclxuXHJcbiAgICBwcml2YXRlIGN1cnJlbnRMZXZlbDogTGV2ZWw7XHJcblxyXG4gICAgY29uc3RydWN0b3Ioc3RhcnRPcHRzOiBNR2FtZVN0YXJ0T3B0aW9ucykge1xyXG4gICAgICAgIHRoaXMubm93ID0gMDtcclxuICAgICAgICB0aGlzLmR0ID0gMDtcclxuICAgICAgICB0aGlzLmxhc3QgPSB0aGlzLnRpbWVzdGFtcCgpO1xyXG4gICAgICAgIHRoaXMuc3RlcCA9IDEgLyA2MDtcclxuXHJcbiAgICAgICAgdGhpcy5jdXJyZW50TGV2ZWwgPSBzdGFydE9wdHMuc3RhcnRMZXZlbDtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgaW5pdGlhbGl6ZSgpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLmNhbnZhcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJjYW52YXNcIik7XHJcbiAgICAgICAgdGhpcy5jYW52YXMud2lkdGggPSA4MDA7XHJcbiAgICAgICAgdGhpcy5jYW52YXMuaGVpZ2h0ID0gNjAwO1xyXG4gICAgICAgIHRoaXMuY2FudmFzLmlkID0gXCJnYW1lXCI7XHJcbiAgICAgICAgdGhpcy5jb250ZXh0ID0gdGhpcy5jYW52YXMuZ2V0Q29udGV4dChcIjJkXCIpO1xyXG5cclxuICAgICAgICBLZXlib2FyZC5pbml0aWFsaXplKCk7XHJcblxyXG4gICAgICAgIGRvY3VtZW50LmJvZHkuaW5zZXJ0QmVmb3JlKHRoaXMuY2FudmFzLCBkb2N1bWVudC5ib2R5LmNoaWxkTm9kZXNbMF0pOyAgXHJcblxyXG4gICAgICAgIGxldCByZXNEaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xyXG4gICAgICAgIHJlc0Rpdi5pZCA9IFwicmVzb3VyY2VzXCI7XHJcbiAgICAgICAgXHJcbiAgICAgICAgZG9jdW1lbnQuYm9keS5pbnNlcnRCZWZvcmUocmVzRGl2LCBkb2N1bWVudC5ib2R5LmNoaWxkTm9kZXNbMF0pO1xyXG5cclxuICAgICAgICB0aGlzLmN1cnJlbnRMZXZlbC5zdGFydCgpO1xyXG5cclxuICAgICAgICB0aGlzLnVwZGF0ZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgdXBkYXRlKCk6IHZvaWQge1xyXG4gICAgICAgIEtleWJvYXJkLnVwZGF0ZSgpO1xyXG5cclxuICAgICAgICB0aGlzLm5vdyA9IHRoaXMudGltZXN0YW1wKCk7XHJcbiAgICAgICAgdGhpcy5kdCA9IHRoaXMuZHQgKyBNYXRoLm1pbigxLCAodGhpcy5ub3cgLSB0aGlzLmxhc3QpIC8gMTAwMCk7XHJcblxyXG4gICAgICAgIHRoaXMuY3VycmVudExldmVsLnVwZGF0ZSh0aGlzLmR0KTtcclxuICAgICAgICBcclxuICAgICAgICBpZiAodGhpcy5jb250ZXh0ICE9PSBudWxsKSB7XHJcbiAgICAgICAgICAgIHRoaXMuY29udGV4dC5jbGVhclJlY3QoMCwgMCwgdGhpcy5jYW52YXMud2lkdGgsIHRoaXMuY2FudmFzLmhlaWdodCk7XHJcbiAgICAgICAgICAgIHRoaXMuY29udGV4dC5maWxsU3R5bGUgPSBcImJsYWNrXCI7XHJcbiAgICAgICAgICAgIHRoaXMuY29udGV4dC5maWxsUmVjdCgwLCAwLCB0aGlzLmNhbnZhcy53aWR0aCwgdGhpcy5jYW52YXMuaGVpZ2h0KTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuY3VycmVudExldmVsLmRyYXcodGhpcy5jb250ZXh0KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMubGFzdCA9IHRoaXMubm93O1xyXG5cclxuICAgICAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUodGhpcy51cGRhdGUuYmluZCh0aGlzKSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSB0aW1lc3RhbXAoKTogbnVtYmVyIHtcclxuICAgICAgICByZXR1cm4gd2luZG93LnBlcmZvcm1hbmNlICYmIHdpbmRvdy5wZXJmb3JtYW5jZS5ub3cgPyB3aW5kb3cucGVyZm9ybWFuY2Uubm93KCkgOiBuZXcgRGF0ZSgpLmdldFRpbWUoKTtcclxuICAgIH1cclxufVxyXG4iLCJleHBvcnQgY2xhc3MgU2NlbmVOb2RlIHtcclxuICAgIFxyXG4gICAgcHJvdGVjdGVkIF9wYXJlbnQ6IFNjZW5lTm9kZSB8IG51bGw7XHJcbiAgICBwcm90ZWN0ZWQgX2NoaWxkcmVuOiBTY2VuZU5vZGVbXTtcclxuXHJcbiAgICBnZXQgcGFyZW50KCk6IFNjZW5lTm9kZSB8IG51bGx7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3BhcmVudDtcclxuICAgIH1cclxuICAgIHNldCBwYXJlbnQodmFsdWU6IFNjZW5lTm9kZSB8IG51bGwpIHtcclxuICAgICAgICB0aGlzLl9wYXJlbnQgPSB2YWx1ZTtcclxuICAgIH1cclxuICAgIGdldCBjaGlsZHJlbigpOiBTY2VuZU5vZGVbXSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2NoaWxkcmVuO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBhZGRDaGlsZChjaGlsZDogU2NlbmVOb2RlKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5fY2hpbGRyZW4ucHVzaChjaGlsZCk7XHJcbiAgICB9XHJcbn0iLCJpbXBvcnQgeyBCZWhhdmlvciB9IGZyb20gXCIuL2JlaGF2aW9yXCI7XHJcbmltcG9ydCB7IFJlc291cmNlTG9hZGVyIH0gZnJvbSBcIi4uL3V0aWxzL3Jlc291cmNlLWxvYWRlclwiO1xyXG5cclxuZXhwb3J0IGNsYXNzIFNwcml0ZSBleHRlbmRzIEJlaGF2aW9yIHtcclxuXHJcbiAgICBwcml2YXRlIF90ZXh0dXJlOiBIVE1MSW1hZ2VFbGVtZW50O1xyXG4gICAgcHJpdmF0ZSBfcGF0aDogc3RyaW5nO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKHBhdGg6IHN0cmluZykge1xyXG4gICAgICAgIHN1cGVyKCk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgdGhpcy5fcGF0aCA9IHBhdGg7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IHRleHR1cmUoKTogSFRNTEltYWdlRWxlbWVudCB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3RleHR1cmU7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHByZVN0YXJ0KCk6IHZvaWQge1xyXG4gICAgICAgIFJlc291cmNlTG9hZGVyLmdldEluc3RhbmNlKCkucXVldWUoW1wicmVzL3BsYXllci5wbmdcIl0pO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzdGFydCgpIHtcclxuICAgICAgICB0aGlzLl90ZXh0dXJlID0gUmVzb3VyY2VMb2FkZXIuZ2V0SW5zdGFuY2UoKS5nZXRSZXNvdXJjZTxIVE1MSW1hZ2VFbGVtZW50PihcImFzc2V0cy9wbGF5ZXIucG5nXCIpO1xyXG4gICAgfVxyXG59XHJcbiIsImV4cG9ydCBlbnVtIEtleUNvZGUge1xyXG4gICAgQkFDS1NQQUNFID0gOCxcclxuICAgIFRBQiA9IDksXHJcbiAgICBFTlRFUiA9IDEzLFxyXG4gICAgU0hJRlQgPSAxNixcclxuICAgIENUUkwgPSAxNyxcclxuICAgIEFMVCA9IDE4LFxyXG4gICAgUEFVU0UgPSAxOSxcclxuICAgIENBUFNfTE9DSyA9IDIwLFxyXG4gICAgRVNDQVBFID0gMjcsXHJcbiAgICBTUEFDRSA9IDMyLFxyXG4gICAgUEFHRV9VUCA9IDMzLFxyXG4gICAgUEFHRV9ET1dOID0gMzQsXHJcbiAgICBFTkQgPSAzNSxcclxuICAgIEhPTUUgPSAzNixcclxuICAgIExFRlRfQVJST1cgPSAzNyxcclxuICAgIFVQX0FSUk9XID0gMzgsXHJcbiAgICBSSUdIVF9BUlJPVyA9IDM5LFxyXG4gICAgRE9XTl9BUlJPVyA9IDQwLFxyXG4gICAgSU5TRVJUID0gNDUsXHJcbiAgICBERUxFVEUgPSA0NixcclxuICAgIEtFWV8wID0gNDgsXHJcbiAgICBLRVlfMSA9IDQ5LFxyXG4gICAgS0VZXzIgPSA1MCxcclxuICAgIEtFWV8zID0gNTEsXHJcbiAgICBLRVlfNCA9IDUyLFxyXG4gICAgS0VZXzUgPSA1MyxcclxuICAgIEtFWV82ID0gNTQsXHJcbiAgICBLRVlfNyA9IDU1LFxyXG4gICAgS0VZXzggPSA1NixcclxuICAgIEtFWV85ID0gNTcsXHJcbiAgICBLRVlfQSA9IDY1LFxyXG4gICAgS0VZX0IgPSA2NixcclxuICAgIEtFWV9DID0gNjcsXHJcbiAgICBLRVlfRCA9IDY4LFxyXG4gICAgS0VZX0UgPSA2OSxcclxuICAgIEtFWV9GID0gNzAsXHJcbiAgICBLRVlfRyA9IDcxLFxyXG4gICAgS0VZX0ggPSA3MixcclxuICAgIEtFWV9JID0gNzMsXHJcbiAgICBLRVlfSiA9IDc0LFxyXG4gICAgS0VZX0sgPSA3NSxcclxuICAgIEtFWV9MID0gNzYsXHJcbiAgICBLRVlfTSA9IDc3LFxyXG4gICAgS0VZX04gPSA3OCxcclxuICAgIEtFWV9PID0gNzksXHJcbiAgICBLRVlfUCA9IDgwLFxyXG4gICAgS0VZX1EgPSA4MSxcclxuICAgIEtFWV9SID0gODIsXHJcbiAgICBLRVlfUyA9IDgzLFxyXG4gICAgS0VZX1QgPSA4NCxcclxuICAgIEtFWV9VID0gODUsXHJcbiAgICBLRVlfViA9IDg2LFxyXG4gICAgS0VZX1cgPSA4NyxcclxuICAgIEtFWV9YID0gODgsXHJcbiAgICBLRVlfWSA9IDg5LFxyXG4gICAgS0VZX1ogPSA5MCxcclxuICAgIExFRlRfTUVUQSA9IDkxLFxyXG4gICAgUklHSFRfTUVUQSA9IDkyLFxyXG4gICAgU0VMRUNUID0gOTMsXHJcbiAgICBOVU1QQURfMCA9IDk2LFxyXG4gICAgTlVNUEFEXzEgPSA5NyxcclxuICAgIE5VTVBBRF8yID0gOTgsXHJcbiAgICBOVU1QQURfMyA9IDk5LFxyXG4gICAgTlVNUEFEXzQgPSAxMDAsXHJcbiAgICBOVU1QQURfNSA9IDEwMSxcclxuICAgIE5VTVBBRF82ID0gMTAyLFxyXG4gICAgTlVNUEFEXzcgPSAxMDMsXHJcbiAgICBOVU1QQURfOCA9IDEwNCxcclxuICAgIE5VTVBBRF85ID0gMTA1LFxyXG4gICAgTVVMVElQTFkgPSAxMDYsXHJcbiAgICBBREQgPSAxMDcsXHJcbiAgICBTVUJUUkFDVCA9IDEwOSxcclxuICAgIERFQ0lNQUwgPSAxMTAsXHJcbiAgICBESVZJREUgPSAxMTEsXHJcbiAgICBGMSA9IDExMixcclxuICAgIEYyID0gMTEzLFxyXG4gICAgRjMgPSAxMTQsXHJcbiAgICBGNCA9IDExNSxcclxuICAgIEY1ID0gMTE2LFxyXG4gICAgRjYgPSAxMTcsXHJcbiAgICBGNyA9IDExOCxcclxuICAgIEY4ID0gMTE5LFxyXG4gICAgRjkgPSAxMjAsXHJcbiAgICBGMTAgPSAxMjEsXHJcbiAgICBGMTEgPSAxMjIsXHJcbiAgICBGMTIgPSAxMjMsXHJcbiAgICBOVU1fTE9DSyA9IDE0NCxcclxuICAgIFNDUk9MTF9MT0NLID0gMTQ1LFxyXG4gICAgU0VNSUNPTE9OID0gMTg2LFxyXG4gICAgRVFVQUxTID0gMTg3LFxyXG4gICAgQ09NTUEgPSAxODgsXHJcbiAgICBEQVNIID0gMTg5LFxyXG4gICAgUEVSSU9EID0gMTkwLFxyXG4gICAgRk9SV0FSRF9TTEFTSCA9IDE5MSxcclxuICAgIEdSQVZFX0FDQ0VOVCA9IDE5MixcclxuICAgIE9QRU5fQlJBQ0tFVCA9IDIxOSxcclxuICAgIEJBQ0tfU0xBU0ggPSAyMjAsXHJcbiAgICBDTE9TRV9CUkFDS0VUID0gMjIxLFxyXG4gICAgU0lOR0xFX1FVT1RFID0gMjIyXHJcbn07XHJcblxyXG5leHBvcnQgY2xhc3MgS2V5Ym9hcmQge1xyXG4gICAgcHJpdmF0ZSBzdGF0aWMgcHJldktleXM6IGJvb2xlYW5bXSA9IFtdO1xyXG4gICAgcHJpdmF0ZSBzdGF0aWMga2V5czogYm9vbGVhbltdID0gW107XHJcblxyXG4gICAgc3RhdGljIGluaXRpYWxpemUoKTogdm9pZCB7XHJcbiAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJrZXlkb3duXCIsIGUgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLmtleXNbZS5rZXlDb2RlXSA9IHRydWU7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJrZXl1cFwiLCBlID0+IHtcclxuICAgICAgICAgICAgdGhpcy5rZXlzW2Uua2V5Q29kZV0gPSBmYWxzZTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBzdGF0aWMgdXBkYXRlKCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMucHJldktleXMgPSB0aGlzLmtleXM7XHJcbiAgICB9XHJcblxyXG4gICAgc3RhdGljIGlzS2V5RG93bihjb2RlOiBLZXlDb2RlKTogYm9vbGVhbiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMua2V5c1tjb2RlXTtcclxuICAgIH1cclxuXHJcbiAgICBzdGF0aWMgaXNLZXlVcChjb2RlOiBLZXlDb2RlKTogYm9vbGVhbiB7XHJcbiAgICAgICAgcmV0dXJuICF0aGlzLmtleXNbY29kZV07XHJcbiAgICB9XHJcblxyXG4gICAgc3RhdGljIGlzS2V5UHJlc3NlZChjb2RlOiBLZXlDb2RlKTogYm9vbGVhbiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMua2V5c1tjb2RlXSAmJiAhdGhpcy5wcmV2S2V5c1tjb2RlXTtcclxuICAgIH1cclxuXHJcbiAgICBzdGF0aWMgaXNLZXlSZWxlYXNlZChjb2RlOiBLZXlDb2RlKTogYm9vbGVhbiB7XHJcbiAgICAgICAgcmV0dXJuICF0aGlzLmtleXNbY29kZV0gJiYgdGhpcy5wcmV2S2V5c1tjb2RlXTtcclxuICAgIH1cclxufVxyXG4iLCJpbXBvcnQgeyBNR2FtZSB9IGZyb20gXCIuL2NvcmUvbS1nYW1lXCI7XHJcbmltcG9ydCB7IExldmVsIH0gZnJvbSBcIi4vY29yZS9sZXZlbFwiO1xyXG5pbXBvcnQgeyBFbnRpdHkgfSBmcm9tIFwiLi9jb3JlL2VudGl0eVwiO1xyXG5pbXBvcnQgeyBCZWhhdmlvciB9IGZyb20gXCIuL2NvcmUvYmVoYXZpb3JcIjtcclxuaW1wb3J0IHsgS2V5Ym9hcmQsIEtleUNvZGUgfSBmcm9tIFwiLi9pbnB1dC9rZXlib2FyZFwiO1xyXG5pbXBvcnQgeyBTcHJpdGUgfSBmcm9tIFwiLi9jb3JlL3Nwcml0ZVwiO1xyXG5cclxuY2xhc3MgVGVzdEJlaGF2aW9yIGV4dGVuZHMgQmVoYXZpb3Ige1xyXG5cclxuICAgIHByb3RlY3RlZCBfbmVlZHNVcGRhdGU6IGJvb2xlYW4gPSB0cnVlO1xyXG5cclxuICAgIHB1YmxpYyBwcmVTdGFydCgpOiB2b2lkIHtcclxuICAgICAgICBjb25zb2xlLmxvZyhcImJlaGF2aW9yIHByZSBzdGFydGVkIVwiKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc3RhcnQoKTogdm9pZCB7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJiZWhhdmlvciBzdGFydGVkIVwiKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgdXBkYXRlKGR0OiBudW1iZXIpOiB2b2lkIHtcclxuICAgICAgICBpZiAoS2V5Ym9hcmQuaXNLZXlEb3duKEtleUNvZGUuS0VZX1cpKSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiVyBwcmVzc2VkIVwiKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuXHJcbndpbmRvdy5vbmxvYWQgPSAoKSA9PiB7XHJcbiAgICBsZXQgbGV2ZWwgPSBuZXcgTGV2ZWwoKTtcclxuICAgIGxldCBlID0gbmV3IEVudGl0eSh7XHJcbiAgICAgICAgbmFtZTogXCJzdGV2ZVwiLFxyXG4gICAgICAgIGJlaGF2aW9yczogW1xyXG4gICAgICAgICAgICBuZXcgVGVzdEJlaGF2aW9yKCksXHJcbiAgICAgICAgICAgIG5ldyBTcHJpdGUoXCJhc3NldHMvcGxheWVyLnBuZ1wiKVxyXG4gICAgICAgIF1cclxuICAgIH0pO1xyXG4gICAgbGV2ZWwuYWRkRW50aXR5KGUpO1xyXG5cclxuICAgIGxldCBnYW1lID0gbmV3IE1HYW1lKHtcclxuICAgICAgICBzdGFydExldmVsOiBsZXZlbFxyXG4gICAgfSk7XHJcbiAgICBnYW1lLmluaXRpYWxpemUoKTtcclxufVxyXG4iLCJleHBvcnQgY2xhc3MgVmVjdG9yMiB7XHJcblxyXG4gICAgLy8gY29tcG9uZW50c1xyXG4gICAgcHVibGljIHg6IG51bWJlcjtcclxuICAgIHB1YmxpYyB5OiBudW1iZXI7XHJcblxyXG4gICAgY29uc3RydWN0b3IoeD86IG51bWJlciwgeT86IG51bWJlcikge1xyXG4gICAgICAgIHRoaXMueCA9IHggfHwgMDtcclxuICAgICAgICB0aGlzLnkgPSB5IHx8IDA7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IGxlbmd0aCgpOiBudW1iZXIge1xyXG4gICAgICAgIHJldHVybiBNYXRoLnNxcnQoVmVjdG9yMi5kb3QodGhpcywgdGhpcykpO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIHN0YXRpYyBvcGVyYXRpb25zXHJcbiAgICBzdGF0aWMgYWRkKHYxOiBWZWN0b3IyLCB2MjogVmVjdG9yMik6IFZlY3RvcjIge1xyXG4gICAgICAgIHJldHVybiBuZXcgVmVjdG9yMih2MS54ICsgdjIueCwgdjEueSArIHYyLnkpO1xyXG4gICAgfVxyXG5cclxuICAgIHN0YXRpYyBzdWJ0cmFjdCh2MTogVmVjdG9yMiwgdjI6IFZlY3RvcjIpOiBWZWN0b3IyIHtcclxuICAgICAgICByZXR1cm4gbmV3IFZlY3RvcjIodjEueCAtIHYyLngsIHYxLnkgLSB2Mi55KTtcclxuICAgIH1cclxuXHJcbiAgICBzdGF0aWMgbXVsdGlwbHkodjogVmVjdG9yMiwgc2NhbGFyOiBudW1iZXIpOiBWZWN0b3IyIHtcclxuICAgICAgICByZXR1cm4gbmV3IFZlY3RvcjIodi54ICogc2NhbGFyLCB2LnkgKiBzY2FsYXIpO1xyXG4gICAgfVxyXG5cclxuICAgIHN0YXRpYyBkaXZpZGUodjogVmVjdG9yMiwgc2NhbGFyOiBudW1iZXIpOiBWZWN0b3IyIHtcclxuICAgICAgICByZXR1cm4gbmV3IFZlY3RvcjIodi54IC8gc2NhbGFyLCB2LnkgLyBzY2FsYXIpO1xyXG4gICAgfVxyXG5cclxuICAgIHN0YXRpYyBkb3QodjE6IFZlY3RvcjIsIHYyOiBWZWN0b3IyKTogbnVtYmVyIHtcclxuICAgICAgICByZXR1cm4gKHYxLnggKiB2Mi54KSArICh2MS55ICogdjIueSk7XHJcbiAgICB9XHJcbn1cclxuIiwiZXhwb3J0IGNsYXNzIElkR2VuZXJhdG9yIHtcclxuICAgIHByaXZhdGUgX25leHRJZDogbnVtYmVyID0gMDtcclxuICAgIHByaXZhdGUgX2F2YWlsYWJsZUlkczogbnVtYmVyW10gPSBbXTtcclxuXHJcbiAgICBwdWJsaWMgZ2V0SWQoKTogbnVtYmVyIHtcclxuICAgICAgICBpZiAodGhpcy5fYXZhaWxhYmxlSWRzLmxlbmd0aCA9PT0gMCkge1xyXG4gICAgICAgICAgICBsZXQgaWQgPSB0aGlzLl9uZXh0SWQ7XHJcbiAgICAgICAgICAgIHRoaXMuX25leHRJZCsrO1xyXG4gICAgICAgICAgICByZXR1cm4gaWQ7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCBpZCA9IDxudW1iZXI+dGhpcy5fYXZhaWxhYmxlSWRzLnBvcCgpO1xyXG4gICAgICAgIHJldHVybiBpZDtcclxuICAgIH1cclxufSIsImV4cG9ydCBpbnRlcmZhY2UgSUtleWVkQ29sbGVjdGlvbjxUPiB7XHJcbiAgICBhZGQoa2V5OiBudW1iZXIgfCBzdHJpbmcsIHZhbHVlOiBUKTogdm9pZDtcclxuICAgIGNvbnRhaW5zS2V5KGtleTogbnVtYmVyIHwgc3RyaW5nKTogYm9vbGVhbjtcclxuICAgIGNvdW50KCk6IG51bWJlcjtcclxuICAgIGl0ZW0oa2V5OiBudW1iZXIgfCBzdHJpbmcpOiBUO1xyXG4gICAgcmVtb3ZlKGtleTogbnVtYmVyIHwgc3RyaW5nKTogVDtcclxuICAgIHZhbHVlcygpOiBUW107XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBLZXllZENvbGxlY3Rpb248VD4gaW1wbGVtZW50cyBJS2V5ZWRDb2xsZWN0aW9uPFQ+IHtcclxuICAgIHByaXZhdGUgX2l0ZW1zOiB7IFtpbmRleDogbnVtYmVyXTogVCB9ID0ge307XHJcbiBcclxuICAgIHByaXZhdGUgX2NvdW50OiBudW1iZXIgPSAwO1xyXG4gXHJcbiAgICBwdWJsaWMgY29udGFpbnNLZXkoa2V5OiBudW1iZXIpOiBib29sZWFuIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5faXRlbXMuaGFzT3duUHJvcGVydHkoa2V5KTtcclxuICAgIH1cclxuIFxyXG4gICAgcHVibGljIGNvdW50KCk6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2NvdW50O1xyXG4gICAgfVxyXG4gXHJcbiAgICBwdWJsaWMgYWRkKGtleTogbnVtYmVyLCB2YWx1ZTogVCkge1xyXG4gICAgICAgIGlmKCF0aGlzLl9pdGVtcy5oYXNPd25Qcm9wZXJ0eShrZXkpKVxyXG4gICAgICAgICAgICAgdGhpcy5fY291bnQrKztcclxuIFxyXG4gICAgICAgIHRoaXMuX2l0ZW1zW2tleV0gPSB2YWx1ZTtcclxuICAgIH1cclxuIFxyXG4gICAgcHVibGljIHJlbW92ZShrZXk6IG51bWJlcik6IFQge1xyXG4gICAgICAgIHZhciB2YWwgPSB0aGlzLl9pdGVtc1trZXldO1xyXG4gICAgICAgIGRlbGV0ZSB0aGlzLl9pdGVtc1trZXldO1xyXG4gICAgICAgIHRoaXMuX2NvdW50LS07XHJcbiAgICAgICAgcmV0dXJuIHZhbDtcclxuICAgIH1cclxuIFxyXG4gICAgcHVibGljIGl0ZW0oa2V5OiBudW1iZXIpOiBUIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5faXRlbXNba2V5XTtcclxuICAgIH1cclxuIFxyXG4gICAgcHVibGljIHZhbHVlcygpOiBUW10ge1xyXG4gICAgICAgIHZhciB2YWx1ZXM6IFRbXSA9IFtdO1xyXG4gXHJcbiAgICAgICAgZm9yICh2YXIgcHJvcCBpbiB0aGlzLl9pdGVtcykge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5faXRlbXMuaGFzT3duUHJvcGVydHkocHJvcCkpIHtcclxuICAgICAgICAgICAgICAgIHZhbHVlcy5wdXNoKHRoaXMuX2l0ZW1zW3Byb3BdKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuIFxyXG4gICAgICAgIHJldHVybiB2YWx1ZXM7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBTdHJLZXllZENvbGxlY3Rpb248VD4gaW1wbGVtZW50cyBJS2V5ZWRDb2xsZWN0aW9uPFQ+IHtcclxuICAgIHByaXZhdGUgX2l0ZW1zOiB7IFtpbmRleDogc3RyaW5nXTogVCB9ID0ge307XHJcbiBcclxuICAgIHByaXZhdGUgX2NvdW50OiBudW1iZXIgPSAwO1xyXG4gXHJcbiAgICBwdWJsaWMgY29udGFpbnNLZXkoa2V5OiBzdHJpbmcpOiBib29sZWFuIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5faXRlbXMuaGFzT3duUHJvcGVydHkoa2V5KTtcclxuICAgIH1cclxuIFxyXG4gICAgcHVibGljIGNvdW50KCk6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2NvdW50O1xyXG4gICAgfVxyXG4gXHJcbiAgICBwdWJsaWMgYWRkKGtleTogc3RyaW5nLCB2YWx1ZTogVCkge1xyXG4gICAgICAgIGlmKCF0aGlzLl9pdGVtcy5oYXNPd25Qcm9wZXJ0eShrZXkpKVxyXG4gICAgICAgICAgICAgdGhpcy5fY291bnQrKztcclxuIFxyXG4gICAgICAgIHRoaXMuX2l0ZW1zW2tleV0gPSB2YWx1ZTtcclxuICAgIH1cclxuIFxyXG4gICAgcHVibGljIHJlbW92ZShrZXk6IHN0cmluZyk6IFQge1xyXG4gICAgICAgIHZhciB2YWwgPSB0aGlzLl9pdGVtc1trZXldO1xyXG4gICAgICAgIGRlbGV0ZSB0aGlzLl9pdGVtc1trZXldO1xyXG4gICAgICAgIHRoaXMuX2NvdW50LS07XHJcbiAgICAgICAgcmV0dXJuIHZhbDtcclxuICAgIH1cclxuIFxyXG4gICAgcHVibGljIGl0ZW0oa2V5OiBzdHJpbmcpOiBUIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5faXRlbXNba2V5XTtcclxuICAgIH1cclxuIFxyXG4gICAgcHVibGljIGtleXMoKTogbnVtYmVyW10ge1xyXG4gICAgICAgIHZhciBrZXlTZXQ6IG51bWJlcltdID0gW107XHJcbiBcclxuICAgICAgICBmb3IgKHZhciBwcm9wIGluIHRoaXMuX2l0ZW1zKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLl9pdGVtcy5oYXNPd25Qcm9wZXJ0eShwcm9wKSkge1xyXG4gICAgICAgICAgICAgICAga2V5U2V0LnB1c2goK3Byb3ApO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gXHJcbiAgICAgICAgcmV0dXJuIGtleVNldDtcclxuICAgIH1cclxuIFxyXG4gICAgcHVibGljIHZhbHVlcygpOiBUW10ge1xyXG4gICAgICAgIHZhciB2YWx1ZXM6IFRbXSA9IFtdO1xyXG4gXHJcbiAgICAgICAgZm9yICh2YXIgcHJvcCBpbiB0aGlzLl9pdGVtcykge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5faXRlbXMuaGFzT3duUHJvcGVydHkocHJvcCkpIHtcclxuICAgICAgICAgICAgICAgIHZhbHVlcy5wdXNoKHRoaXMuX2l0ZW1zW3Byb3BdKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuIFxyXG4gICAgICAgIHJldHVybiB2YWx1ZXM7XHJcbiAgICB9XHJcbn1cclxuIiwiaW1wb3J0IHsgU3RyS2V5ZWRDb2xsZWN0aW9uIH0gZnJvbSBcIi4va2V5ZWQtY29sbGVjdGlvblwiO1xyXG5pbXBvcnQgKiBhcyBwYXRoIGZyb20gJ3BhdGgnO1xyXG5cclxuZXhwb3J0IGNsYXNzIFJlc291cmNlTG9hZGVyIHtcclxuXHJcbiAgICBwcml2YXRlIF9jYWNoZTogU3RyS2V5ZWRDb2xsZWN0aW9uPGFueT4gPSBuZXcgU3RyS2V5ZWRDb2xsZWN0aW9uPGFueT4oKTtcclxuICAgIHByaXZhdGUgX3F1ZXVlOiBBcnJheTxzdHJpbmc+ID0gW107XHJcbiAgICBwcml2YXRlIF9sb2FkQ291bnQ6IG51bWJlciA9IDA7XHJcbiAgICBwcml2YXRlIF9sb2FkZWRDb3VudDogbnVtYmVyID0gMDtcclxuXHJcbiAgICBwcml2YXRlIF9pbWdFeHRzOiBzdHJpbmdbXSA9IFtcclxuICAgICAgICBcIi5qcGdcIixcclxuICAgICAgICBcIi5wbmdcIlxyXG4gICAgXTtcclxuICAgIHByaXZhdGUgX2F1ZEV4dHM6IHN0cmluZ1tdID0gW1xyXG4gICAgICAgIFwiLndhdlwiXHJcbiAgICBdO1xyXG5cclxuICAgIGdldCBpc0RvbmUoKTogYm9vbGVhbiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2xvYWRlZENvdW50ID09PSB0aGlzLl9sb2FkQ291bnQ7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBzdGF0aWMgX2luc3RhbmNlOiBSZXNvdXJjZUxvYWRlcjtcclxuXHJcbiAgICBzdGF0aWMgZ2V0SW5zdGFuY2UoKTogUmVzb3VyY2VMb2FkZXIge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9pbnN0YW5jZTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0UmVzb3VyY2U8VCBleHRlbmRzIEhUTUxJbWFnZUVsZW1lbnQgfCBIVE1MQXVkaW9FbGVtZW50PihwYXRoOiBzdHJpbmcpOiBUIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fY2FjaGUuaXRlbShwYXRoKSBhcyBUO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBxdWV1ZShyZXM6IHN0cmluZ1tdKTogdm9pZCB7XHJcbiAgICAgICAgZm9yIChsZXQgaSBvZiByZXMpIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuX2ltZ0V4dHMuc29tZSh4ID0+IHggPT09IGkpKSB7XHJcbiAgICAgICAgICAgICAgICBjb250aW51ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLl9xdWV1ZS5wdXNoKGkpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgbG9hZCgpIHtcclxuICAgICAgICB0aGlzLl9sb2FkQ291bnQgPSB0aGlzLl9xdWV1ZS5sZW5ndGg7XHJcbiAgICAgICAgZm9yIChsZXQgcWQgaW4gdGhpcy5fcXVldWUpIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuX2ltZ0V4dHMuc29tZSh4ID0+IHggPT09IHBhdGguZXh0bmFtZShxZCkpKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgaW1hZ2UgPSBuZXcgSW1hZ2UoKTtcclxuICAgICAgICAgICAgICAgIGltYWdlLmFkZEV2ZW50TGlzdGVuZXIoXCJsb2FkXCIsICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9sb2FkZWRDb3VudCsrO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICBpbWFnZS5zcmMgPSBxZDtcclxuICAgICAgICAgICAgICAgIHRoaXMuX2NhY2hlLmFkZChxZCwgaW1hZ2UpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmICh0aGlzLl9hdWRFeHRzLnNvbWUoeCA9PiB4ID09PSBwYXRoLmV4dG5hbWUocWQpKSkge1xyXG4gICAgICAgICAgICAgICAgbGV0IGF1ZGlvID0gbmV3IEF1ZGlvKCk7XHJcbiAgICAgICAgICAgICAgICBhdWRpby5hZGRFdmVudExpc3RlbmVyKFwibG9hZFwiLCAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fbG9hZGVkQ291bnQrKztcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgYXVkaW8uc3JjID0gcWQ7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9jYWNoZS5hZGQocWQsIGF1ZGlvKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxufSJdLCJzb3VyY2VSb290IjoiIn0=