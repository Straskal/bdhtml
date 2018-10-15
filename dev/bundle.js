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
var scene_node_1 = __webpack_require__(/*! ./scene-node */ "./src/core/scene-node.ts");
var Entity = (function (_super) {
    __extends(Entity, _super);
    function Entity(opt) {
        var _this = _super.call(this) || this;
        _this._id = -1;
        _this._name = "";
        _this._behaviorsById = new keyed_collection_1.KeyedCollection();
        _this._behaviorsToUpdate = [];
        _this._idGen = new id_generator_1.IdGenerator();
        _this._name = opt.name;
        for (var _i = 0, _a = opt.behaviors; _i < _a.length; _i++) {
            var b = _a[_i];
            b._owner = _this;
            _this._behaviorsById.add(_this._idGen.getId(), b);
        }
        _this._position = opt.position;
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
    Level.prototype.preStart = function () {
        while (this._entitiesToAdd.length > 0) {
            var e = this._entitiesToAdd.pop();
            e._setLevel(this);
            e._setId(this._idGen.getId());
            e.preStart();
            this._entitiesById.add(e.id, e);
            for (var _i = 0, _a = this.game._modules; _i < _a.length; _i++) {
                var m = _a[_i];
                m.onEntityAdded(e);
            }
        }
    };
    Level.prototype.start = function () {
        for (var _i = 0, _a = this._entitiesById.values(); _i < _a.length; _i++) {
            var e = _a[_i];
            e.start();
        }
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
            for (var _i = 0, _a = this.game._modules; _i < _a.length; _i++) {
                var m = _a[_i];
                m.onEntityRemoved(e.id);
            }
            this._entitiesById.remove(eId);
        }
        for (var _b = 0, _c = this._entitiesToAdd; _b < _c.length; _b++) {
            var e = _c[_b];
            e._setLevel(this);
            e._setId(this._idGen.getId());
            e.preStart();
            this._entitiesById.add(e.id, e);
            for (var _d = 0, _e = this.game._modules; _d < _e.length; _d++) {
                var m = _e[_d];
                m.onEntityAdded(e);
            }
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
var resource_loader_1 = __webpack_require__(/*! ../utils/resource-loader */ "./src/utils/resource-loader.ts");
var MGame = (function () {
    function MGame(startOpts) {
        this.now = 0;
        this.dt = 0;
        this.last = this.timestamp();
        this.step = 1 / 60;
        this.currentLevel = startOpts.startLevel;
        this.currentLevel.game = this;
        this._modules = startOpts.modules;
    }
    MGame.prototype.initialize = function () {
        var _this = this;
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
        this.currentLevel.preStart();
        resource_loader_1.ResourceLoader.getInstance().load(function () {
            _this.currentLevel.start();
            _this.update();
        });
    };
    MGame.prototype.update = function () {
        keyboard_1.Keyboard.update();
        this.now = this.timestamp();
        this.dt = this.dt + Math.min(1, (this.now - this.last) / 1000);
        this.currentLevel.update(this.dt);
        for (var _i = 0, _a = this._modules; _i < _a.length; _i++) {
            var m = _a[_i];
            m.update(this.dt);
        }
        if (this.context !== null) {
            for (var _b = 0, _c = this._modules; _b < _c.length; _b++) {
                var m = _c[_b];
                m.draw(this.context);
            }
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

/***/ "./src/core/module.ts":
/*!****************************!*\
  !*** ./src/core/module.ts ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Module = (function () {
    function Module() {
    }
    Object.defineProperty(Module.prototype, "needsUpdate", {
        get: function () {
            return this._needsUpdate;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Module.prototype, "needsDraw", {
        get: function () {
            return this._needsDraw;
        },
        enumerable: true,
        configurable: true
    });
    Module.prototype.update = function (dt) { };
    Module.prototype.draw = function (ctx) { };
    Module.prototype.onEntityAdded = function (e) { };
    Module.prototype.onEntityRemoved = function (eId) { };
    return Module;
}());
exports.Module = Module;


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
        resource_loader_1.ResourceLoader.getInstance().queue([this._path]);
    };
    Sprite.prototype.start = function () {
        this._texture = resource_loader_1.ResourceLoader.getInstance().getResource(this._path);
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
var renderer_1 = __webpack_require__(/*! ./modules/renderer */ "./src/modules/renderer.ts");
var vector2_1 = __webpack_require__(/*! ./math/vector2 */ "./src/math/vector2.ts");
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
        if (keyboard_1.Keyboard.isKeyDown(keyboard_1.KeyCode.KEY_D)) {
            this._owner.position.x++;
        }
        if (keyboard_1.Keyboard.isKeyDown(keyboard_1.KeyCode.KEY_A)) {
            this._owner.position.x--;
        }
        if (keyboard_1.Keyboard.isKeyDown(keyboard_1.KeyCode.SPACE)) {
            this._owner.getLevel().addEntity(new entity_1.Entity({
                name: "steve",
                behaviors: [
                    new sprite_1.Sprite("assets/player.png")
                ],
                position: this._owner.position
            }));
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
        ],
        position: new vector2_1.Vector2()
    });
    level.addEntity(e);
    var game = new m_game_1.MGame({
        startLevel: level,
        modules: [
            new renderer_1.Renderer()
        ]
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

/***/ "./src/modules/renderer.ts":
/*!*********************************!*\
  !*** ./src/modules/renderer.ts ***!
  \*********************************/
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
var module_1 = __webpack_require__(/*! ../core/module */ "./src/core/module.ts");
var sprite_1 = __webpack_require__(/*! ../core/sprite */ "./src/core/sprite.ts");
var keyed_collection_1 = __webpack_require__(/*! ../utils/keyed-collection */ "./src/utils/keyed-collection.ts");
var Renderer = (function (_super) {
    __extends(Renderer, _super);
    function Renderer() {
        var _this = _super.call(this) || this;
        _this.spritesByEntityId = new keyed_collection_1.KeyedCollection();
        _this._needsDraw = true;
        return _this;
    }
    Renderer.prototype.onEntityAdded = function (e) {
        var s = e.getBehaviorOfType(sprite_1.Sprite);
        if (s !== null) {
            this.spritesByEntityId.add(e.id, s);
        }
    };
    Renderer.prototype.onEntityRemoved = function (eId) {
        this.spritesByEntityId.remove(eId);
    };
    Renderer.prototype.draw = function (ctx) {
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        ctx.fillStyle = "black";
        ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        for (var _i = 0, _a = this.spritesByEntityId.values(); _i < _a.length; _i++) {
            var s = _a[_i];
            var pos = s._owner.position;
            ctx.drawImage(s.texture, pos.x, pos.y);
        }
    };
    return Renderer;
}(module_1.Module));
exports.Renderer = Renderer;


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
        return this._instance || (this._instance = new ResourceLoader());
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
    ResourceLoader.prototype.load = function (onComplete) {
        var _this = this;
        this._loadCount = this._queue.length;
        var _loop_2 = function (qd) {
            console.log(path.extname(qd));
            if (this_2._imgExts.some(function (x) { return x === path.extname(qd); })) {
                var image = new Image();
                var that_1 = this_2;
                image.addEventListener("load", function () {
                    that_1._loadedCount++;
                    if (that_1._loadedCount === that_1._loadCount) {
                        onComplete();
                    }
                });
                image.src = qd;
                that_1._cache.add(qd, image);
            }
            if (this_2._audExts.some(function (x) { return x === path.extname(qd); })) {
                var audio = new Audio();
                audio.addEventListener("load", function () {
                    _this._loadedCount++;
                    if (_this._loadedCount === _this._loadCount) {
                        onComplete();
                    }
                });
                audio.src = qd;
                this_2._cache.add(qd, audio);
            }
        };
        var this_2 = this;
        for (var _i = 0, _a = this._queue; _i < _a.length; _i++) {
            var qd = _a[_i];
            _loop_2(qd);
        }
    };
    return ResourceLoader;
}());
exports.ResourceLoader = ResourceLoader;


/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3BhdGgtYnJvd3NlcmlmeS9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvcHJvY2Vzcy9icm93c2VyLmpzIiwid2VicGFjazovLy8uL3NyYy9jb3JlL2JlaGF2aW9yLnRzIiwid2VicGFjazovLy8uL3NyYy9jb3JlL2VudGl0eS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvY29yZS9sZXZlbC50cyIsIndlYnBhY2s6Ly8vLi9zcmMvY29yZS9tLWdhbWUudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvcmUvbW9kdWxlLnRzIiwid2VicGFjazovLy8uL3NyYy9jb3JlL3NjZW5lLW5vZGUudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvcmUvc3ByaXRlLnRzIiwid2VicGFjazovLy8uL3NyYy9pbnB1dC9rZXlib2FyZC50cyIsIndlYnBhY2s6Ly8vLi9zcmMvbWFpbi50cyIsIndlYnBhY2s6Ly8vLi9zcmMvbWF0aC92ZWN0b3IyLnRzIiwid2VicGFjazovLy8uL3NyYy9tb2R1bGVzL3JlbmRlcmVyLnRzIiwid2VicGFjazovLy8uL3NyYy91dGlscy9pZC1nZW5lcmF0b3IudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3V0aWxzL2tleWVkLWNvbGxlY3Rpb24udHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3V0aWxzL3Jlc291cmNlLWxvYWRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxrREFBMEMsZ0NBQWdDO0FBQzFFO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsZ0VBQXdELGtC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QUM7cUJBQ2hCO2dCQUNMLENBQUMsQ0FBQyxDQUFDO2dCQUNILEtBQUssQ0FBQyxHQUFHLEdBQUcsRUFBRSxDQUFDO2dCQUNmLE1BQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLEVBQUUsRUFBRSxLQUFLLENBQUMsQ0FBQzthQUM5QjtZQUNELElBQUksT0FBSyxRQUFRLENBQUMsSUFBSSxDQUFDLFdBQUMsSUFBSSxRQUFDLEtBQUssSUFBSSxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsRUFBdEIsQ0FBc0IsQ0FBQyxFQUFFO2dCQUNqRCxJQUFJLEtBQUssR0FBRyxJQUFJLEtBQUssRUFBRSxDQUFDO2dCQUN4QixLQUFLLENBQUMsZ0JBQWdCLENBQUMsTUFBTSxFQUFFO29CQUMzQixLQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7b0JBQ3BCLElBQUksS0FBSSxDQUFDLFlBQVksS0FBSyxLQUFJLENBQUMsVUFBVSxFQUFFO3dCQUN2QyxVQUFVLEVBQUUsQ0FBQztxQkFDaEI7Z0JBQ0wsQ0FBQyxDQUFDLENBQUM7Z0JBQ0gsS0FBSyxDQUFDLEdBQUcsR0FBRyxFQUFFLENBQUM7Z0JBQ2YsT0FBSyxNQUFNLENBQUMsR0FBRyxDQUFDLEVBQUUsRUFBRSxLQUFLLENBQUMsQ0FBQzthQUM5QjtRQUNMLENBQUM7O1FBekJELEtBQWUsVUFBVyxFQUFYLFNBQUksQ0FBQyxNQUFNLEVBQVgsY0FBVyxFQUFYLElBQVc7WUFBckIsSUFBSSxFQUFFO29CQUFGLEVBQUU7U0F5QlY7SUFDTCxDQUFDO0lBQ0wscUJBQUM7QUFBRCxDQUFDO0FBckVZLHdDQUFjIiwiZmlsZSI6ImJ1bmRsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vc3JjL21haW4udHNcIik7XG4iLCIvLyBDb3B5cmlnaHQgSm95ZW50LCBJbmMuIGFuZCBvdGhlciBOb2RlIGNvbnRyaWJ1dG9ycy5cclxuLy9cclxuLy8gUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGFcclxuLy8gY29weSBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZVxyXG4vLyBcIlNvZnR3YXJlXCIpLCB0byBkZWFsIGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmdcclxuLy8gd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHMgdG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLFxyXG4vLyBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbCBjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0XHJcbi8vIHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXMgZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvIHRoZVxyXG4vLyBmb2xsb3dpbmcgY29uZGl0aW9uczpcclxuLy9cclxuLy8gVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWRcclxuLy8gaW4gYWxsIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXHJcbi8vXHJcbi8vIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1NcclxuLy8gT1IgSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRlxyXG4vLyBNRVJDSEFOVEFCSUxJVFksIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOXHJcbi8vIE5PIEVWRU5UIFNIQUxMIFRIRSBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLFxyXG4vLyBEQU1BR0VTIE9SIE9USEVSIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1JcclxuLy8gT1RIRVJXSVNFLCBBUklTSU5HIEZST00sIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRVxyXG4vLyBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU4gVEhFIFNPRlRXQVJFLlxyXG5cclxuLy8gcmVzb2x2ZXMgLiBhbmQgLi4gZWxlbWVudHMgaW4gYSBwYXRoIGFycmF5IHdpdGggZGlyZWN0b3J5IG5hbWVzIHRoZXJlXHJcbi8vIG11c3QgYmUgbm8gc2xhc2hlcywgZW1wdHkgZWxlbWVudHMsIG9yIGRldmljZSBuYW1lcyAoYzpcXCkgaW4gdGhlIGFycmF5XHJcbi8vIChzbyBhbHNvIG5vIGxlYWRpbmcgYW5kIHRyYWlsaW5nIHNsYXNoZXMgLSBpdCBkb2VzIG5vdCBkaXN0aW5ndWlzaFxyXG4vLyByZWxhdGl2ZSBhbmQgYWJzb2x1dGUgcGF0aHMpXHJcbmZ1bmN0aW9uIG5vcm1hbGl6ZUFycmF5KHBhcnRzLCBhbGxvd0Fib3ZlUm9vdCkge1xyXG4gIC8vIGlmIHRoZSBwYXRoIHRyaWVzIHRvIGdvIGFib3ZlIHRoZSByb290LCBgdXBgIGVuZHMgdXAgPiAwXHJcbiAgdmFyIHVwID0gMDtcclxuICBmb3IgKHZhciBpID0gcGFydHMubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIHtcclxuICAgIHZhciBsYXN0ID0gcGFydHNbaV07XHJcbiAgICBpZiAobGFzdCA9PT0gJy4nKSB7XHJcbiAgICAgIHBhcnRzLnNwbGljZShpLCAxKTtcclxuICAgIH0gZWxzZSBpZiAobGFzdCA9PT0gJy4uJykge1xyXG4gICAgICBwYXJ0cy5zcGxpY2UoaSwgMSk7XHJcbiAgICAgIHVwKys7XHJcbiAgICB9IGVsc2UgaWYgKHVwKSB7XHJcbiAgICAgIHBhcnRzLnNwbGljZShpLCAxKTtcclxuICAgICAgdXAtLTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8vIGlmIHRoZSBwYXRoIGlzIGFsbG93ZWQgdG8gZ28gYWJvdmUgdGhlIHJvb3QsIHJlc3RvcmUgbGVhZGluZyAuLnNcclxuICBpZiAoYWxsb3dBYm92ZVJvb3QpIHtcclxuICAgIGZvciAoOyB1cC0tOyB1cCkge1xyXG4gICAgICBwYXJ0cy51bnNoaWZ0KCcuLicpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcmV0dXJuIHBhcnRzO1xyXG59XHJcblxyXG4vLyBTcGxpdCBhIGZpbGVuYW1lIGludG8gW3Jvb3QsIGRpciwgYmFzZW5hbWUsIGV4dF0sIHVuaXggdmVyc2lvblxyXG4vLyAncm9vdCcgaXMganVzdCBhIHNsYXNoLCBvciBub3RoaW5nLlxyXG52YXIgc3BsaXRQYXRoUmUgPVxyXG4gICAgL14oXFwvP3wpKFtcXHNcXFNdKj8pKCg/OlxcLnsxLDJ9fFteXFwvXSs/fCkoXFwuW14uXFwvXSp8KSkoPzpbXFwvXSopJC87XHJcbnZhciBzcGxpdFBhdGggPSBmdW5jdGlvbihmaWxlbmFtZSkge1xyXG4gIHJldHVybiBzcGxpdFBhdGhSZS5leGVjKGZpbGVuYW1lKS5zbGljZSgxKTtcclxufTtcclxuXHJcbi8vIHBhdGgucmVzb2x2ZShbZnJvbSAuLi5dLCB0bylcclxuLy8gcG9zaXggdmVyc2lvblxyXG5leHBvcnRzLnJlc29sdmUgPSBmdW5jdGlvbigpIHtcclxuICB2YXIgcmVzb2x2ZWRQYXRoID0gJycsXHJcbiAgICAgIHJlc29sdmVkQWJzb2x1dGUgPSBmYWxzZTtcclxuXHJcbiAgZm9yICh2YXIgaSA9IGFyZ3VtZW50cy5sZW5ndGggLSAxOyBpID49IC0xICYmICFyZXNvbHZlZEFic29sdXRlOyBpLS0pIHtcclxuICAgIHZhciBwYXRoID0gKGkgPj0gMCkgPyBhcmd1bWVudHNbaV0gOiBwcm9jZXNzLmN3ZCgpO1xyXG5cclxuICAgIC8vIFNraXAgZW1wdHkgYW5kIGludmFsaWQgZW50cmllc1xyXG4gICAgaWYgKHR5cGVvZiBwYXRoICE9PSAnc3RyaW5nJykge1xyXG4gICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdBcmd1bWVudHMgdG8gcGF0aC5yZXNvbHZlIG11c3QgYmUgc3RyaW5ncycpO1xyXG4gICAgfSBlbHNlIGlmICghcGF0aCkge1xyXG4gICAgICBjb250aW51ZTtcclxuICAgIH1cclxuXHJcbiAgICByZXNvbHZlZFBhdGggPSBwYXRoICsgJy8nICsgcmVzb2x2ZWRQYXRoO1xyXG4gICAgcmVzb2x2ZWRBYnNvbHV0ZSA9IHBhdGguY2hhckF0KDApID09PSAnLyc7XHJcbiAgfVxyXG5cclxuICAvLyBBdCB0aGlzIHBvaW50IHRoZSBwYXRoIHNob3VsZCBiZSByZXNvbHZlZCB0byBhIGZ1bGwgYWJzb2x1dGUgcGF0aCwgYnV0XHJcbiAgLy8gaGFuZGxlIHJlbGF0aXZlIHBhdGhzIHRvIGJlIHNhZmUgKG1pZ2h0IGhhcHBlbiB3aGVuIHByb2Nlc3MuY3dkKCkgZmFpbHMpXHJcblxyXG4gIC8vIE5vcm1hbGl6ZSB0aGUgcGF0aFxyXG4gIHJlc29sdmVkUGF0aCA9IG5vcm1hbGl6ZUFycmF5KGZpbHRlcihyZXNvbHZlZFBhdGguc3BsaXQoJy8nKSwgZnVuY3Rpb24ocCkge1xyXG4gICAgcmV0dXJuICEhcDtcclxuICB9KSwgIXJlc29sdmVkQWJzb2x1dGUpLmpvaW4oJy8nKTtcclxuXHJcbiAgcmV0dXJuICgocmVzb2x2ZWRBYnNvbHV0ZSA/ICcvJyA6ICcnKSArIHJlc29sdmVkUGF0aCkgfHwgJy4nO1xyXG59O1xyXG5cclxuLy8gcGF0aC5ub3JtYWxpemUocGF0aClcclxuLy8gcG9zaXggdmVyc2lvblxyXG5leHBvcnRzLm5vcm1hbGl6ZSA9IGZ1bmN0aW9uKHBhdGgpIHtcclxuICB2YXIgaXNBYnNvbHV0ZSA9IGV4cG9ydHMuaXNBYnNvbHV0ZShwYXRoKSxcclxuICAgICAgdHJhaWxpbmdTbGFzaCA9IHN1YnN0cihwYXRoLCAtMSkgPT09ICcvJztcclxuXHJcbiAgLy8gTm9ybWFsaXplIHRoZSBwYXRoXHJcbiAgcGF0aCA9IG5vcm1hbGl6ZUFycmF5KGZpbHRlcihwYXRoLnNwbGl0KCcvJyksIGZ1bmN0aW9uKHApIHtcclxuICAgIHJldHVybiAhIXA7XHJcbiAgfSksICFpc0Fic29sdXRlKS5qb2luKCcvJyk7XHJcblxyXG4gIGlmICghcGF0aCAmJiAhaXNBYnNvbHV0ZSkge1xyXG4gICAgcGF0aCA9ICcuJztcclxuICB9XHJcbiAgaWYgKHBhdGggJiYgdHJhaWxpbmdTbGFzaCkge1xyXG4gICAgcGF0aCArPSAnLyc7XHJcbiAgfVxyXG5cclxuICByZXR1cm4gKGlzQWJzb2x1dGUgPyAnLycgOiAnJykgKyBwYXRoO1xyXG59O1xyXG5cclxuLy8gcG9zaXggdmVyc2lvblxyXG5leHBvcnRzLmlzQWJzb2x1dGUgPSBmdW5jdGlvbihwYXRoKSB7XHJcbiAgcmV0dXJuIHBhdGguY2hhckF0KDApID09PSAnLyc7XHJcbn07XHJcblxyXG4vLyBwb3NpeCB2ZXJzaW9uXHJcbmV4cG9ydHMuam9pbiA9IGZ1bmN0aW9uKCkge1xyXG4gIHZhciBwYXRocyA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3VtZW50cywgMCk7XHJcbiAgcmV0dXJuIGV4cG9ydHMubm9ybWFsaXplKGZpbHRlcihwYXRocywgZnVuY3Rpb24ocCwgaW5kZXgpIHtcclxuICAgIGlmICh0eXBlb2YgcCAhPT0gJ3N0cmluZycpIHtcclxuICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignQXJndW1lbnRzIHRvIHBhdGguam9pbiBtdXN0IGJlIHN0cmluZ3MnKTtcclxuICAgIH1cclxuICAgIHJldHVybiBwO1xyXG4gIH0pLmpvaW4oJy8nKSk7XHJcbn07XHJcblxyXG5cclxuLy8gcGF0aC5yZWxhdGl2ZShmcm9tLCB0bylcclxuLy8gcG9zaXggdmVyc2lvblxyXG5leHBvcnRzLnJlbGF0aXZlID0gZnVuY3Rpb24oZnJvbSwgdG8pIHtcclxuICBmcm9tID0gZXhwb3J0cy5yZXNvbHZlKGZyb20pLnN1YnN0cigxKTtcclxuICB0byA9IGV4cG9ydHMucmVzb2x2ZSh0bykuc3Vic3RyKDEpO1xyXG5cclxuICBmdW5jdGlvbiB0cmltKGFycikge1xyXG4gICAgdmFyIHN0YXJ0ID0gMDtcclxuICAgIGZvciAoOyBzdGFydCA8IGFyci5sZW5ndGg7IHN0YXJ0KyspIHtcclxuICAgICAgaWYgKGFycltzdGFydF0gIT09ICcnKSBicmVhaztcclxuICAgIH1cclxuXHJcbiAgICB2YXIgZW5kID0gYXJyLmxlbmd0aCAtIDE7XHJcbiAgICBmb3IgKDsgZW5kID49IDA7IGVuZC0tKSB7XHJcbiAgICAgIGlmIChhcnJbZW5kXSAhPT0gJycpIGJyZWFrO1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChzdGFydCA+IGVuZCkgcmV0dXJuIFtdO1xyXG4gICAgcmV0dXJuIGFyci5zbGljZShzdGFydCwgZW5kIC0gc3RhcnQgKyAxKTtcclxuICB9XHJcblxyXG4gIHZhciBmcm9tUGFydHMgPSB0cmltKGZyb20uc3BsaXQoJy8nKSk7XHJcbiAgdmFyIHRvUGFydHMgPSB0cmltKHRvLnNwbGl0KCcvJykpO1xyXG5cclxuICB2YXIgbGVuZ3RoID0gTWF0aC5taW4oZnJvbVBhcnRzLmxlbmd0aCwgdG9QYXJ0cy5sZW5ndGgpO1xyXG4gIHZhciBzYW1lUGFydHNMZW5ndGggPSBsZW5ndGg7XHJcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBsZW5ndGg7IGkrKykge1xyXG4gICAgaWYgKGZyb21QYXJ0c1tpXSAhPT0gdG9QYXJ0c1tpXSkge1xyXG4gICAgICBzYW1lUGFydHNMZW5ndGggPSBpO1xyXG4gICAgICBicmVhaztcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHZhciBvdXRwdXRQYXJ0cyA9IFtdO1xyXG4gIGZvciAodmFyIGkgPSBzYW1lUGFydHNMZW5ndGg7IGkgPCBmcm9tUGFydHMubGVuZ3RoOyBpKyspIHtcclxuICAgIG91dHB1dFBhcnRzLnB1c2goJy4uJyk7XHJcbiAgfVxyXG5cclxuICBvdXRwdXRQYXJ0cyA9IG91dHB1dFBhcnRzLmNvbmNhdCh0b1BhcnRzLnNsaWNlKHNhbWVQYXJ0c0xlbmd0aCkpO1xyXG5cclxuICByZXR1cm4gb3V0cHV0UGFydHMuam9pbignLycpO1xyXG59O1xyXG5cclxuZXhwb3J0cy5zZXAgPSAnLyc7XHJcbmV4cG9ydHMuZGVsaW1pdGVyID0gJzonO1xyXG5cclxuZXhwb3J0cy5kaXJuYW1lID0gZnVuY3Rpb24ocGF0aCkge1xyXG4gIHZhciByZXN1bHQgPSBzcGxpdFBhdGgocGF0aCksXHJcbiAgICAgIHJvb3QgPSByZXN1bHRbMF0sXHJcbiAgICAgIGRpciA9IHJlc3VsdFsxXTtcclxuXHJcbiAgaWYgKCFyb290ICYmICFkaXIpIHtcclxuICAgIC8vIE5vIGRpcm5hbWUgd2hhdHNvZXZlclxyXG4gICAgcmV0dXJuICcuJztcclxuICB9XHJcblxyXG4gIGlmIChkaXIpIHtcclxuICAgIC8vIEl0IGhhcyBhIGRpcm5hbWUsIHN0cmlwIHRyYWlsaW5nIHNsYXNoXHJcbiAgICBkaXIgPSBkaXIuc3Vic3RyKDAsIGRpci5sZW5ndGggLSAxKTtcclxuICB9XHJcblxyXG4gIHJldHVybiByb290ICsgZGlyO1xyXG59O1xyXG5cclxuXHJcbmV4cG9ydHMuYmFzZW5hbWUgPSBmdW5jdGlvbihwYXRoLCBleHQpIHtcclxuICB2YXIgZiA9IHNwbGl0UGF0aChwYXRoKVsyXTtcclxuICAvLyBUT0RPOiBtYWtlIHRoaXMgY29tcGFyaXNvbiBjYXNlLWluc2Vuc2l0aXZlIG9uIHdpbmRvd3M/XHJcbiAgaWYgKGV4dCAmJiBmLnN1YnN0cigtMSAqIGV4dC5sZW5ndGgpID09PSBleHQpIHtcclxuICAgIGYgPSBmLnN1YnN0cigwLCBmLmxlbmd0aCAtIGV4dC5sZW5ndGgpO1xyXG4gIH1cclxuICByZXR1cm4gZjtcclxufTtcclxuXHJcblxyXG5leHBvcnRzLmV4dG5hbWUgPSBmdW5jdGlvbihwYXRoKSB7XHJcbiAgcmV0dXJuIHNwbGl0UGF0aChwYXRoKVszXTtcclxufTtcclxuXHJcbmZ1bmN0aW9uIGZpbHRlciAoeHMsIGYpIHtcclxuICAgIGlmICh4cy5maWx0ZXIpIHJldHVybiB4cy5maWx0ZXIoZik7XHJcbiAgICB2YXIgcmVzID0gW107XHJcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHhzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgaWYgKGYoeHNbaV0sIGksIHhzKSkgcmVzLnB1c2goeHNbaV0pO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHJlcztcclxufVxyXG5cclxuLy8gU3RyaW5nLnByb3RvdHlwZS5zdWJzdHIgLSBuZWdhdGl2ZSBpbmRleCBkb24ndCB3b3JrIGluIElFOFxyXG52YXIgc3Vic3RyID0gJ2FiJy5zdWJzdHIoLTEpID09PSAnYidcclxuICAgID8gZnVuY3Rpb24gKHN0ciwgc3RhcnQsIGxlbikgeyByZXR1cm4gc3RyLnN1YnN0cihzdGFydCwgbGVuKSB9XHJcbiAgICA6IGZ1bmN0aW9uIChzdHIsIHN0YXJ0LCBsZW4pIHtcclxuICAgICAgICBpZiAoc3RhcnQgPCAwKSBzdGFydCA9IHN0ci5sZW5ndGggKyBzdGFydDtcclxuICAgICAgICByZXR1cm4gc3RyLnN1YnN0cihzdGFydCwgbGVuKTtcclxuICAgIH1cclxuO1xyXG4iLCIvLyBzaGltIGZvciB1c2luZyBwcm9jZXNzIGluIGJyb3dzZXJcclxudmFyIHByb2Nlc3MgPSBtb2R1bGUuZXhwb3J0cyA9IHt9O1xyXG5cclxuLy8gY2FjaGVkIGZyb20gd2hhdGV2ZXIgZ2xvYmFsIGlzIHByZXNlbnQgc28gdGhhdCB0ZXN0IHJ1bm5lcnMgdGhhdCBzdHViIGl0XHJcbi8vIGRvbid0IGJyZWFrIHRoaW5ncy4gIEJ1dCB3ZSBuZWVkIHRvIHdyYXAgaXQgaW4gYSB0cnkgY2F0Y2ggaW4gY2FzZSBpdCBpc1xyXG4vLyB3cmFwcGVkIGluIHN0cmljdCBtb2RlIGNvZGUgd2hpY2ggZG9lc24ndCBkZWZpbmUgYW55IGdsb2JhbHMuICBJdCdzIGluc2lkZSBhXHJcbi8vIGZ1bmN0aW9uIGJlY2F1c2UgdHJ5L2NhdGNoZXMgZGVvcHRpbWl6ZSBpbiBjZXJ0YWluIGVuZ2luZXMuXHJcblxyXG52YXIgY2FjaGVkU2V0VGltZW91dDtcclxudmFyIGNhY2hlZENsZWFyVGltZW91dDtcclxuXHJcbmZ1bmN0aW9uIGRlZmF1bHRTZXRUaW1vdXQoKSB7XHJcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ3NldFRpbWVvdXQgaGFzIG5vdCBiZWVuIGRlZmluZWQnKTtcclxufVxyXG5mdW5jdGlvbiBkZWZhdWx0Q2xlYXJUaW1lb3V0ICgpIHtcclxuICAgIHRocm93IG5ldyBFcnJvcignY2xlYXJUaW1lb3V0IGhhcyBub3QgYmVlbiBkZWZpbmVkJyk7XHJcbn1cclxuKGZ1bmN0aW9uICgpIHtcclxuICAgIHRyeSB7XHJcbiAgICAgICAgaWYgKHR5cGVvZiBzZXRUaW1lb3V0ID09PSAnZnVuY3Rpb24nKSB7XHJcbiAgICAgICAgICAgIGNhY2hlZFNldFRpbWVvdXQgPSBzZXRUaW1lb3V0O1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGNhY2hlZFNldFRpbWVvdXQgPSBkZWZhdWx0U2V0VGltb3V0O1xyXG4gICAgICAgIH1cclxuICAgIH0gY2F0Y2ggKGUpIHtcclxuICAgICAgICBjYWNoZWRTZXRUaW1lb3V0ID0gZGVmYXVsdFNldFRpbW91dDtcclxuICAgIH1cclxuICAgIHRyeSB7XHJcbiAgICAgICAgaWYgKHR5cGVvZiBjbGVhclRpbWVvdXQgPT09ICdmdW5jdGlvbicpIHtcclxuICAgICAgICAgICAgY2FjaGVkQ2xlYXJUaW1lb3V0ID0gY2xlYXJUaW1lb3V0O1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGNhY2hlZENsZWFyVGltZW91dCA9IGRlZmF1bHRDbGVhclRpbWVvdXQ7XHJcbiAgICAgICAgfVxyXG4gICAgfSBjYXRjaCAoZSkge1xyXG4gICAgICAgIGNhY2hlZENsZWFyVGltZW91dCA9IGRlZmF1bHRDbGVhclRpbWVvdXQ7XHJcbiAgICB9XHJcbn0gKCkpXHJcbmZ1bmN0aW9uIHJ1blRpbWVvdXQoZnVuKSB7XHJcbiAgICBpZiAoY2FjaGVkU2V0VGltZW91dCA9PT0gc2V0VGltZW91dCkge1xyXG4gICAgICAgIC8vbm9ybWFsIGVudmlyb21lbnRzIGluIHNhbmUgc2l0dWF0aW9uc1xyXG4gICAgICAgIHJldHVybiBzZXRUaW1lb3V0KGZ1biwgMCk7XHJcbiAgICB9XHJcbiAgICAvLyBpZiBzZXRUaW1lb3V0IHdhc24ndCBhdmFpbGFibGUgYnV0IHdhcyBsYXR0ZXIgZGVmaW5lZFxyXG4gICAgaWYgKChjYWNoZWRTZXRUaW1lb3V0ID09PSBkZWZhdWx0U2V0VGltb3V0IHx8ICFjYWNoZWRTZXRUaW1lb3V0KSAmJiBzZXRUaW1lb3V0KSB7XHJcbiAgICAgICAgY2FjaGVkU2V0VGltZW91dCA9IHNldFRpbWVvdXQ7XHJcbiAgICAgICAgcmV0dXJuIHNldFRpbWVvdXQoZnVuLCAwKTtcclxuICAgIH1cclxuICAgIHRyeSB7XHJcbiAgICAgICAgLy8gd2hlbiB3aGVuIHNvbWVib2R5IGhhcyBzY3Jld2VkIHdpdGggc2V0VGltZW91dCBidXQgbm8gSS5FLiBtYWRkbmVzc1xyXG4gICAgICAgIHJldHVybiBjYWNoZWRTZXRUaW1lb3V0KGZ1biwgMCk7XHJcbiAgICB9IGNhdGNoKGUpe1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIC8vIFdoZW4gd2UgYXJlIGluIEkuRS4gYnV0IHRoZSBzY3JpcHQgaGFzIGJlZW4gZXZhbGVkIHNvIEkuRS4gZG9lc24ndCB0cnVzdCB0aGUgZ2xvYmFsIG9iamVjdCB3aGVuIGNhbGxlZCBub3JtYWxseVxyXG4gICAgICAgICAgICByZXR1cm4gY2FjaGVkU2V0VGltZW91dC5jYWxsKG51bGwsIGZ1biwgMCk7XHJcbiAgICAgICAgfSBjYXRjaChlKXtcclxuICAgICAgICAgICAgLy8gc2FtZSBhcyBhYm92ZSBidXQgd2hlbiBpdCdzIGEgdmVyc2lvbiBvZiBJLkUuIHRoYXQgbXVzdCBoYXZlIHRoZSBnbG9iYWwgb2JqZWN0IGZvciAndGhpcycsIGhvcGZ1bGx5IG91ciBjb250ZXh0IGNvcnJlY3Qgb3RoZXJ3aXNlIGl0IHdpbGwgdGhyb3cgYSBnbG9iYWwgZXJyb3JcclxuICAgICAgICAgICAgcmV0dXJuIGNhY2hlZFNldFRpbWVvdXQuY2FsbCh0aGlzLCBmdW4sIDApO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcblxyXG59XHJcbmZ1bmN0aW9uIHJ1bkNsZWFyVGltZW91dChtYXJrZXIpIHtcclxuICAgIGlmIChjYWNoZWRDbGVhclRpbWVvdXQgPT09IGNsZWFyVGltZW91dCkge1xyXG4gICAgICAgIC8vbm9ybWFsIGVudmlyb21lbnRzIGluIHNhbmUgc2l0dWF0aW9uc1xyXG4gICAgICAgIHJldHVybiBjbGVhclRpbWVvdXQobWFya2VyKTtcclxuICAgIH1cclxuICAgIC8vIGlmIGNsZWFyVGltZW91dCB3YXNuJ3QgYXZhaWxhYmxlIGJ1dCB3YXMgbGF0dGVyIGRlZmluZWRcclxuICAgIGlmICgoY2FjaGVkQ2xlYXJUaW1lb3V0ID09PSBkZWZhdWx0Q2xlYXJUaW1lb3V0IHx8ICFjYWNoZWRDbGVhclRpbWVvdXQpICYmIGNsZWFyVGltZW91dCkge1xyXG4gICAgICAgIGNhY2hlZENsZWFyVGltZW91dCA9IGNsZWFyVGltZW91dDtcclxuICAgICAgICByZXR1cm4gY2xlYXJUaW1lb3V0KG1hcmtlcik7XHJcbiAgICB9XHJcbiAgICB0cnkge1xyXG4gICAgICAgIC8vIHdoZW4gd2hlbiBzb21lYm9keSBoYXMgc2NyZXdlZCB3aXRoIHNldFRpbWVvdXQgYnV0IG5vIEkuRS4gbWFkZG5lc3NcclxuICAgICAgICByZXR1cm4gY2FjaGVkQ2xlYXJUaW1lb3V0KG1hcmtlcik7XHJcbiAgICB9IGNhdGNoIChlKXtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICAvLyBXaGVuIHdlIGFyZSBpbiBJLkUuIGJ1dCB0aGUgc2NyaXB0IGhhcyBiZWVuIGV2YWxlZCBzbyBJLkUuIGRvZXNuJ3QgIHRydXN0IHRoZSBnbG9iYWwgb2JqZWN0IHdoZW4gY2FsbGVkIG5vcm1hbGx5XHJcbiAgICAgICAgICAgIHJldHVybiBjYWNoZWRDbGVhclRpbWVvdXQuY2FsbChudWxsLCBtYXJrZXIpO1xyXG4gICAgICAgIH0gY2F0Y2ggKGUpe1xyXG4gICAgICAgICAgICAvLyBzYW1lIGFzIGFib3ZlIGJ1dCB3aGVuIGl0J3MgYSB2ZXJzaW9uIG9mIEkuRS4gdGhhdCBtdXN0IGhhdmUgdGhlIGdsb2JhbCBvYmplY3QgZm9yICd0aGlzJywgaG9wZnVsbHkgb3VyIGNvbnRleHQgY29ycmVjdCBvdGhlcndpc2UgaXQgd2lsbCB0aHJvdyBhIGdsb2JhbCBlcnJvci5cclxuICAgICAgICAgICAgLy8gU29tZSB2ZXJzaW9ucyBvZiBJLkUuIGhhdmUgZGlmZmVyZW50IHJ1bGVzIGZvciBjbGVhclRpbWVvdXQgdnMgc2V0VGltZW91dFxyXG4gICAgICAgICAgICByZXR1cm4gY2FjaGVkQ2xlYXJUaW1lb3V0LmNhbGwodGhpcywgbWFya2VyKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG5cclxuXHJcbn1cclxudmFyIHF1ZXVlID0gW107XHJcbnZhciBkcmFpbmluZyA9IGZhbHNlO1xyXG52YXIgY3VycmVudFF1ZXVlO1xyXG52YXIgcXVldWVJbmRleCA9IC0xO1xyXG5cclxuZnVuY3Rpb24gY2xlYW5VcE5leHRUaWNrKCkge1xyXG4gICAgaWYgKCFkcmFpbmluZyB8fCAhY3VycmVudFF1ZXVlKSB7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG4gICAgZHJhaW5pbmcgPSBmYWxzZTtcclxuICAgIGlmIChjdXJyZW50UXVldWUubGVuZ3RoKSB7XHJcbiAgICAgICAgcXVldWUgPSBjdXJyZW50UXVldWUuY29uY2F0KHF1ZXVlKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgcXVldWVJbmRleCA9IC0xO1xyXG4gICAgfVxyXG4gICAgaWYgKHF1ZXVlLmxlbmd0aCkge1xyXG4gICAgICAgIGRyYWluUXVldWUoKTtcclxuICAgIH1cclxufVxyXG5cclxuZnVuY3Rpb24gZHJhaW5RdWV1ZSgpIHtcclxuICAgIGlmIChkcmFpbmluZykge1xyXG4gICAgICAgIHJldHVybjtcclxuICAgIH1cclxuICAgIHZhciB0aW1lb3V0ID0gcnVuVGltZW91dChjbGVhblVwTmV4dFRpY2spO1xyXG4gICAgZHJhaW5pbmcgPSB0cnVlO1xyXG5cclxuICAgIHZhciBsZW4gPSBxdWV1ZS5sZW5ndGg7XHJcbiAgICB3aGlsZShsZW4pIHtcclxuICAgICAgICBjdXJyZW50UXVldWUgPSBxdWV1ZTtcclxuICAgICAgICBxdWV1ZSA9IFtdO1xyXG4gICAgICAgIHdoaWxlICgrK3F1ZXVlSW5kZXggPCBsZW4pIHtcclxuICAgICAgICAgICAgaWYgKGN1cnJlbnRRdWV1ZSkge1xyXG4gICAgICAgICAgICAgICAgY3VycmVudFF1ZXVlW3F1ZXVlSW5kZXhdLnJ1bigpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHF1ZXVlSW5kZXggPSAtMTtcclxuICAgICAgICBsZW4gPSBxdWV1ZS5sZW5ndGg7XHJcbiAgICB9XHJcbiAgICBjdXJyZW50UXVldWUgPSBudWxsO1xyXG4gICAgZHJhaW5pbmcgPSBmYWxzZTtcclxuICAgIHJ1bkNsZWFyVGltZW91dCh0aW1lb3V0KTtcclxufVxyXG5cclxucHJvY2Vzcy5uZXh0VGljayA9IGZ1bmN0aW9uIChmdW4pIHtcclxuICAgIHZhciBhcmdzID0gbmV3IEFycmF5KGFyZ3VtZW50cy5sZW5ndGggLSAxKTtcclxuICAgIGlmIChhcmd1bWVudHMubGVuZ3RoID4gMSkge1xyXG4gICAgICAgIGZvciAodmFyIGkgPSAxOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGFyZ3NbaSAtIDFdID0gYXJndW1lbnRzW2ldO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHF1ZXVlLnB1c2gobmV3IEl0ZW0oZnVuLCBhcmdzKSk7XHJcbiAgICBpZiAocXVldWUubGVuZ3RoID09PSAxICYmICFkcmFpbmluZykge1xyXG4gICAgICAgIHJ1blRpbWVvdXQoZHJhaW5RdWV1ZSk7XHJcbiAgICB9XHJcbn07XHJcblxyXG4vLyB2OCBsaWtlcyBwcmVkaWN0aWJsZSBvYmplY3RzXHJcbmZ1bmN0aW9uIEl0ZW0oZnVuLCBhcnJheSkge1xyXG4gICAgdGhpcy5mdW4gPSBmdW47XHJcbiAgICB0aGlzLmFycmF5ID0gYXJyYXk7XHJcbn1cclxuSXRlbS5wcm90b3R5cGUucnVuID0gZnVuY3Rpb24gKCkge1xyXG4gICAgdGhpcy5mdW4uYXBwbHkobnVsbCwgdGhpcy5hcnJheSk7XHJcbn07XHJcbnByb2Nlc3MudGl0bGUgPSAnYnJvd3Nlcic7XHJcbnByb2Nlc3MuYnJvd3NlciA9IHRydWU7XHJcbnByb2Nlc3MuZW52ID0ge307XHJcbnByb2Nlc3MuYXJndiA9IFtdO1xyXG5wcm9jZXNzLnZlcnNpb24gPSAnJzsgLy8gZW1wdHkgc3RyaW5nIHRvIGF2b2lkIHJlZ2V4cCBpc3N1ZXNcclxucHJvY2Vzcy52ZXJzaW9ucyA9IHt9O1xyXG5cclxuZnVuY3Rpb24gbm9vcCgpIHt9XHJcblxyXG5wcm9jZXNzLm9uID0gbm9vcDtcclxucHJvY2Vzcy5hZGRMaXN0ZW5lciA9IG5vb3A7XHJcbnByb2Nlc3Mub25jZSA9IG5vb3A7XHJcbnByb2Nlc3Mub2ZmID0gbm9vcDtcclxucHJvY2Vzcy5yZW1vdmVMaXN0ZW5lciA9IG5vb3A7XHJcbnByb2Nlc3MucmVtb3ZlQWxsTGlzdGVuZXJzID0gbm9vcDtcclxucHJvY2Vzcy5lbWl0ID0gbm9vcDtcclxucHJvY2Vzcy5wcmVwZW5kTGlzdGVuZXIgPSBub29wO1xyXG5wcm9jZXNzLnByZXBlbmRPbmNlTGlzdGVuZXIgPSBub29wO1xyXG5cclxucHJvY2Vzcy5saXN0ZW5lcnMgPSBmdW5jdGlvbiAobmFtZSkgeyByZXR1cm4gW10gfVxyXG5cclxucHJvY2Vzcy5iaW5kaW5nID0gZnVuY3Rpb24gKG5hbWUpIHtcclxuICAgIHRocm93IG5ldyBFcnJvcigncHJvY2Vzcy5iaW5kaW5nIGlzIG5vdCBzdXBwb3J0ZWQnKTtcclxufTtcclxuXHJcbnByb2Nlc3MuY3dkID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gJy8nIH07XHJcbnByb2Nlc3MuY2hkaXIgPSBmdW5jdGlvbiAoZGlyKSB7XHJcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ3Byb2Nlc3MuY2hkaXIgaXMgbm90IHN1cHBvcnRlZCcpO1xyXG59O1xyXG5wcm9jZXNzLnVtYXNrID0gZnVuY3Rpb24oKSB7IHJldHVybiAwOyB9O1xyXG4iLCJpbXBvcnQgeyBFbnRpdHkgfSBmcm9tIFwiLi9lbnRpdHlcIjtcclxuXHJcbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBCZWhhdmlvciB7XHJcblxyXG4gICAgcHJvdGVjdGVkIF9uZWVkc1VwZGF0ZTogYm9vbGVhbiA9IGZhbHNlO1xyXG5cclxuICAgIHB1YmxpYyBfb3duZXI6IEVudGl0eTtcclxuXHJcbiAgICBnZXQgbmVlZHNVcGRhdGUoKTogYm9vbGVhbiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX25lZWRzVXBkYXRlO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBwcmVTdGFydCgpOiB2b2lkIHsgfVxyXG4gICAgcHVibGljIHN0YXJ0KCk6IHZvaWQgeyB9XHJcbiAgICBwdWJsaWMgdXBkYXRlKGR0OiBudW1iZXIpOiB2b2lkIHsgfVxyXG4gICAgcHVibGljIGVuZCgpOiB2b2lkIHsgfVxyXG59XHJcbiIsImltcG9ydCB7IEJlaGF2aW9yIH0gZnJvbSBcIi4vYmVoYXZpb3JcIjtcclxuaW1wb3J0IHsgSWRHZW5lcmF0b3IgfSBmcm9tIFwiLi4vdXRpbHMvaWQtZ2VuZXJhdG9yXCI7XHJcbmltcG9ydCB7IEtleWVkQ29sbGVjdGlvbiB9IGZyb20gXCIuLi91dGlscy9rZXllZC1jb2xsZWN0aW9uXCI7XHJcbmltcG9ydCB7IFZlY3RvcjIgfSBmcm9tIFwiLi4vbWF0aC92ZWN0b3IyXCI7XHJcbmltcG9ydCB7IExldmVsIH0gZnJvbSBcIi4vbGV2ZWxcIjtcclxuaW1wb3J0IHsgU2NlbmVOb2RlIH0gZnJvbSBcIi4vc2NlbmUtbm9kZVwiO1xyXG5cclxuZXhwb3J0IGludGVyZmFjZSBJRW50aXR5T3B0aW9ucyB7XHJcbiAgICBuYW1lOiBzdHJpbmc7XHJcbiAgICBiZWhhdmlvcnM6IEJlaGF2aW9yW107XHJcbiAgICBwb3NpdGlvbjogVmVjdG9yMjtcclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIEVudGl0eSBleHRlbmRzIFNjZW5lTm9kZSB7XHJcblxyXG4gICAgcHJpdmF0ZSBfaWQ6IG51bWJlciA9IC0xO1xyXG4gICAgcHJpdmF0ZSBfbmFtZTogc3RyaW5nID0gXCJcIjtcclxuICAgIHByaXZhdGUgX3Bvc2l0aW9uOiBWZWN0b3IyO1xyXG5cclxuICAgIHByaXZhdGUgX2JlaGF2aW9yc0J5SWQ6IEtleWVkQ29sbGVjdGlvbjxCZWhhdmlvcj4gPSBuZXcgS2V5ZWRDb2xsZWN0aW9uPEJlaGF2aW9yPigpO1xyXG4gICAgcHJpdmF0ZSBfYmVoYXZpb3JzVG9VcGRhdGU6IEJlaGF2aW9yW10gPSBbXTtcclxuXHJcbiAgICBwcml2YXRlIF9pZEdlbjogSWRHZW5lcmF0b3IgPSBuZXcgSWRHZW5lcmF0b3IoKTtcclxuXHJcbiAgICBwcml2YXRlIF9sZXZlbDogTGV2ZWw7XHJcblxyXG4gICAgZ2V0IGlkKCk6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2lkO1xyXG4gICAgfVxyXG4gICAgZ2V0IG5hbWUoKTogc3RyaW5nIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fbmFtZTtcclxuICAgIH1cclxuICAgIGdldCBwb3NpdGlvbigpOiBWZWN0b3IyIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fcG9zaXRpb247XHJcbiAgICB9XHJcbiAgICBnZXQgYmVoYXZpb3JDb3VudCgpOiBudW1iZXIge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9iZWhhdmlvcnNCeUlkLmNvdW50KCk7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3RydWN0b3Iob3B0OiBJRW50aXR5T3B0aW9ucykge1xyXG4gICAgICAgIHN1cGVyKCk7XHJcblxyXG4gICAgICAgIHRoaXMuX25hbWUgPSBvcHQubmFtZTtcclxuXHJcbiAgICAgICAgZm9yIChsZXQgYiBvZiBvcHQuYmVoYXZpb3JzKSB7XHJcbiAgICAgICAgICAgIGIuX293bmVyID0gdGhpcztcclxuICAgICAgICAgICAgdGhpcy5fYmVoYXZpb3JzQnlJZC5hZGQodGhpcy5faWRHZW4uZ2V0SWQoKSwgYik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLl9wb3NpdGlvbiA9IG9wdC5wb3NpdGlvbjtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgX3NldElkKGlkOiBudW1iZXIpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLl9pZCA9IGlkO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBfc2V0TGV2ZWwobGV2ZWw6IExldmVsKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5fbGV2ZWwgPSBsZXZlbDtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0TGV2ZWwoKTogTGV2ZWwge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9sZXZlbDtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0QmVoYXZpb3JCeUlkKGlkOiBudW1iZXIpOiBCZWhhdmlvciB8IG51bGwge1xyXG4gICAgICAgIGlmICh0aGlzLl9iZWhhdmlvcnNCeUlkLml0ZW0oaWQpKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9iZWhhdmlvcnNCeUlkLml0ZW0oaWQpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0QmVoYXZpb3JPZlR5cGU8VCBleHRlbmRzIEJlaGF2aW9yPih0Y3RvcjogbmV3ICguLi5hcmdzOiBhbnlbXSkgPT4gVCk6IFQgfCBudWxsIHtcclxuICAgICAgICBmb3IgKGxldCBiIG9mIHRoaXMuX2JlaGF2aW9yc0J5SWQudmFsdWVzKCkpIHtcclxuICAgICAgICAgICAgaWYgKGIgaW5zdGFuY2VvZiB0Y3Rvcikge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGIgYXMgVDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgcHJlU3RhcnQoKTogdm9pZCB7XHJcbiAgICAgICAgLy8gTk9USUNFOiBDYWxsaW5nIC52YWx1ZXMoKSBtdWx0aXBsZSB0aW1lcyBwZXIgZnJhbWVcclxuICAgICAgICBmb3IgKGxldCBiIG9mIHRoaXMuX2JlaGF2aW9yc0J5SWQudmFsdWVzKCkpIHtcclxuICAgICAgICAgICAgaWYgKGIubmVlZHNVcGRhdGUpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX2JlaGF2aW9yc1RvVXBkYXRlLnB1c2goYik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgYi5wcmVTdGFydCgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc3RhcnQoKTogdm9pZCB7XHJcbiAgICAgICAgZm9yIChsZXQgYiBvZiB0aGlzLl9iZWhhdmlvcnNCeUlkLnZhbHVlcygpKSB7XHJcbiAgICAgICAgICAgIGIuc3RhcnQoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHVwZGF0ZShkdDogbnVtYmVyKTogdm9pZCB7XHJcbiAgICAgICAgZm9yIChsZXQgYiBvZiB0aGlzLl9iZWhhdmlvcnNUb1VwZGF0ZSkge1xyXG4gICAgICAgICAgICBiLnVwZGF0ZShkdCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBlbmQoKTogdm9pZCB7XHJcbiAgICAgICAgZm9yIChsZXQgYiBvZiB0aGlzLl9iZWhhdmlvcnNCeUlkLnZhbHVlcygpKSB7XHJcbiAgICAgICAgICAgIGIuZW5kKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbiIsImltcG9ydCB7IEtleWVkQ29sbGVjdGlvbiB9IGZyb20gXCIuLi91dGlscy9rZXllZC1jb2xsZWN0aW9uXCI7XHJcbmltcG9ydCB7IEVudGl0eSB9IGZyb20gXCIuL2VudGl0eVwiO1xyXG5pbXBvcnQgeyBJZEdlbmVyYXRvciB9IGZyb20gXCIuLi91dGlscy9pZC1nZW5lcmF0b3JcIjtcclxuaW1wb3J0IHsgU3ByaXRlIH0gZnJvbSBcIi4vc3ByaXRlXCI7XHJcbmltcG9ydCB7IE1HYW1lIH0gZnJvbSBcIi4vbS1nYW1lXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgTGV2ZWwge1xyXG5cclxuICAgIHByaXZhdGUgX2VudGl0aWVzQnlJZDogS2V5ZWRDb2xsZWN0aW9uPEVudGl0eT47XHJcbiAgICBwcml2YXRlIF9lbnRpdGllc1RvQWRkOiBFbnRpdHlbXTtcclxuICAgIHByaXZhdGUgX2VudGl0aWVzVG9SZW1vdmU6IG51bWJlcltdO1xyXG5cclxuICAgIHByaXZhdGUgX2lkR2VuOiBJZEdlbmVyYXRvcjtcclxuXHJcbiAgICBwdWJsaWMgZ2FtZTogTUdhbWU7XHJcblxyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgdGhpcy5fZW50aXRpZXNCeUlkID0gbmV3IEtleWVkQ29sbGVjdGlvbjxFbnRpdHk+KCk7XHJcbiAgICAgICAgdGhpcy5fZW50aXRpZXNUb0FkZCA9IFtdO1xyXG4gICAgICAgIHRoaXMuX2VudGl0aWVzVG9SZW1vdmUgPSBbXTtcclxuXHJcbiAgICAgICAgdGhpcy5faWRHZW4gPSBuZXcgSWRHZW5lcmF0b3IoKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgYWRkRW50aXR5KGU6IEVudGl0eSk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuX2VudGl0aWVzVG9BZGQucHVzaChlKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0RW50aXR5QnlJZChpZDogbnVtYmVyKTogRW50aXR5IHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fZW50aXRpZXNCeUlkLml0ZW0oaWQpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBwcmVTdGFydCgpOiB2b2lkIHtcclxuICAgICAgICB3aGlsZSAodGhpcy5fZW50aXRpZXNUb0FkZC5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgIGxldCBlID0gPEVudGl0eT50aGlzLl9lbnRpdGllc1RvQWRkLnBvcCgpO1xyXG4gICAgICAgICAgICBlLl9zZXRMZXZlbCh0aGlzKTtcclxuICAgICAgICAgICAgZS5fc2V0SWQodGhpcy5faWRHZW4uZ2V0SWQoKSk7XHJcbiAgICAgICAgICAgIGUucHJlU3RhcnQoKTtcclxuICAgICAgICAgICAgdGhpcy5fZW50aXRpZXNCeUlkLmFkZChlLmlkLCBlKTtcclxuICAgICAgICAgICAgZm9yIChsZXQgbSBvZiB0aGlzLmdhbWUuX21vZHVsZXMpIHtcclxuICAgICAgICAgICAgICAgIG0ub25FbnRpdHlBZGRlZChlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc3RhcnQoKTogdm9pZCB7XHJcbiAgICAgICAgZm9yIChsZXQgZSBvZiB0aGlzLl9lbnRpdGllc0J5SWQudmFsdWVzKCkpIHtcclxuICAgICAgICAgICAgZS5zdGFydCgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgdXBkYXRlKGR0OiBudW1iZXIpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLl91cGRhdGVFbnRpdHlMaXN0cygpO1xyXG5cclxuICAgICAgICBmb3IgKGxldCBlIG9mIHRoaXMuX2VudGl0aWVzQnlJZC52YWx1ZXMoKSkge1xyXG4gICAgICAgICAgICBlLnVwZGF0ZShkdCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBkcmF3KGN0eDogQ2FudmFzUmVuZGVyaW5nQ29udGV4dDJEKTogdm9pZCB7XHJcbiAgICAgICAgZm9yIChsZXQgZSBvZiB0aGlzLl9lbnRpdGllc0J5SWQudmFsdWVzKCkpIHtcclxuICAgICAgICAgICAgbGV0IHMgPSBlLmdldEJlaGF2aW9yT2ZUeXBlKFNwcml0ZSk7XHJcbiAgICAgICAgICAgIGlmIChzICE9IG51bGwpIHtcclxuICAgICAgICAgICAgICAgIGN0eC5kcmF3SW1hZ2Uocy50ZXh0dXJlLCBlLnBvc2l0aW9uLngsIGUucG9zaXRpb24ueSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGVuZCgpOiB2b2lkIHtcclxuICAgICAgICBmb3IgKGxldCBlIG9mIHRoaXMuX2VudGl0aWVzQnlJZC52YWx1ZXMoKSkge1xyXG4gICAgICAgICAgICBlLmVuZCgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIF91cGRhdGVFbnRpdHlMaXN0cygpOiB2b2lkIHtcclxuICAgICAgICB3aGlsZSAodGhpcy5fZW50aXRpZXNUb1JlbW92ZS5sZW5ndGggIT09IDApIHtcclxuICAgICAgICAgICAgbGV0IGVJZCA9IDxudW1iZXI+dGhpcy5fZW50aXRpZXNUb1JlbW92ZS5wb3AoKTtcclxuICAgICAgICAgICAgbGV0IGUgPSB0aGlzLmdldEVudGl0eUJ5SWQoZUlkKTtcclxuICAgICAgICAgICAgZS5lbmQoKTtcclxuICAgICAgICAgICAgZm9yIChsZXQgbSBvZiB0aGlzLmdhbWUuX21vZHVsZXMpIHtcclxuICAgICAgICAgICAgICAgIG0ub25FbnRpdHlSZW1vdmVkKGUuaWQpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMuX2VudGl0aWVzQnlJZC5yZW1vdmUoZUlkKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGZvciAobGV0IGUgb2YgdGhpcy5fZW50aXRpZXNUb0FkZCkge1xyXG4gICAgICAgICAgICBlLl9zZXRMZXZlbCh0aGlzKTtcclxuICAgICAgICAgICAgZS5fc2V0SWQodGhpcy5faWRHZW4uZ2V0SWQoKSk7XHJcbiAgICAgICAgICAgIGUucHJlU3RhcnQoKTtcclxuICAgICAgICAgICAgdGhpcy5fZW50aXRpZXNCeUlkLmFkZChlLmlkLCBlKTtcclxuICAgICAgICAgICAgZm9yIChsZXQgbSBvZiB0aGlzLmdhbWUuX21vZHVsZXMpIHtcclxuICAgICAgICAgICAgICAgIG0ub25FbnRpdHlBZGRlZChlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgd2hpbGUgKHRoaXMuX2VudGl0aWVzVG9BZGQubGVuZ3RoICE9PSAwKSB7XHJcbiAgICAgICAgICAgIGxldCBlID0gPEVudGl0eT50aGlzLl9lbnRpdGllc1RvQWRkLnBvcCgpO1xyXG4gICAgICAgICAgICBlLnN0YXJ0KCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbiIsImltcG9ydCB7IEtleWJvYXJkIH0gZnJvbSBcIi4uL2lucHV0L2tleWJvYXJkXCI7XHJcbmltcG9ydCB7IExldmVsIH0gZnJvbSBcIi4vbGV2ZWxcIjtcclxuaW1wb3J0IHsgUmVzb3VyY2VMb2FkZXIgfSBmcm9tIFwiLi4vdXRpbHMvcmVzb3VyY2UtbG9hZGVyXCI7XHJcbmltcG9ydCB7IE1vZHVsZSB9IGZyb20gXCIuL21vZHVsZVwiO1xyXG5cclxuZXhwb3J0IGludGVyZmFjZSBNR2FtZVN0YXJ0T3B0aW9ucyB7XHJcbiAgICBzdGFydExldmVsOiBMZXZlbDtcclxuICAgIG1vZHVsZXM6IE1vZHVsZVtdO1xyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgTUdhbWUge1xyXG4gICAgcHVibGljIGNhbnZhczogSFRNTENhbnZhc0VsZW1lbnQ7XHJcbiAgICBwdWJsaWMgY29udGV4dDogQ2FudmFzUmVuZGVyaW5nQ29udGV4dDJEIHwgbnVsbDtcclxuXHJcbiAgICBwcml2YXRlIG5vdzogbnVtYmVyO1xyXG4gICAgcHJpdmF0ZSBkdDogbnVtYmVyO1xyXG4gICAgcHJpdmF0ZSBsYXN0OiBudW1iZXI7XHJcbiAgICBwcml2YXRlIHN0ZXA6IG51bWJlcjtcclxuXHJcbiAgICBwcml2YXRlIGludGVydmFsOiBudW1iZXI7XHJcblxyXG4gICAgcHVibGljIF9tb2R1bGVzOiBNb2R1bGVbXTtcclxuXHJcbiAgICBwcml2YXRlIGN1cnJlbnRMZXZlbDogTGV2ZWw7XHJcblxyXG4gICAgY29uc3RydWN0b3Ioc3RhcnRPcHRzOiBNR2FtZVN0YXJ0T3B0aW9ucykge1xyXG4gICAgICAgIHRoaXMubm93ID0gMDtcclxuICAgICAgICB0aGlzLmR0ID0gMDtcclxuICAgICAgICB0aGlzLmxhc3QgPSB0aGlzLnRpbWVzdGFtcCgpO1xyXG4gICAgICAgIHRoaXMuc3RlcCA9IDEgLyA2MDtcclxuXHJcbiAgICAgICAgdGhpcy5jdXJyZW50TGV2ZWwgPSBzdGFydE9wdHMuc3RhcnRMZXZlbDtcclxuICAgICAgICB0aGlzLmN1cnJlbnRMZXZlbC5nYW1lID0gdGhpcztcclxuICAgICAgICB0aGlzLl9tb2R1bGVzID0gc3RhcnRPcHRzLm1vZHVsZXM7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGluaXRpYWxpemUoKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5jYW52YXMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiY2FudmFzXCIpO1xyXG4gICAgICAgIHRoaXMuY2FudmFzLndpZHRoID0gODAwO1xyXG4gICAgICAgIHRoaXMuY2FudmFzLmhlaWdodCA9IDYwMDtcclxuICAgICAgICB0aGlzLmNhbnZhcy5pZCA9IFwiZ2FtZVwiO1xyXG4gICAgICAgIHRoaXMuY29udGV4dCA9IHRoaXMuY2FudmFzLmdldENvbnRleHQoXCIyZFwiKTtcclxuXHJcbiAgICAgICAgS2V5Ym9hcmQuaW5pdGlhbGl6ZSgpO1xyXG5cclxuICAgICAgICBkb2N1bWVudC5ib2R5Lmluc2VydEJlZm9yZSh0aGlzLmNhbnZhcywgZG9jdW1lbnQuYm9keS5jaGlsZE5vZGVzWzBdKTsgIFxyXG5cclxuICAgICAgICBsZXQgcmVzRGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcclxuICAgICAgICByZXNEaXYuaWQgPSBcInJlc291cmNlc1wiO1xyXG4gICAgICAgIFxyXG4gICAgICAgIGRvY3VtZW50LmJvZHkuaW5zZXJ0QmVmb3JlKHJlc0RpdiwgZG9jdW1lbnQuYm9keS5jaGlsZE5vZGVzWzBdKTtcclxuXHJcbiAgICAgICAgdGhpcy5jdXJyZW50TGV2ZWwucHJlU3RhcnQoKTtcclxuICAgICAgICBSZXNvdXJjZUxvYWRlci5nZXRJbnN0YW5jZSgpLmxvYWQoKCkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLmN1cnJlbnRMZXZlbC5zdGFydCgpO1xyXG4gICAgICAgICAgICB0aGlzLnVwZGF0ZSgpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgdXBkYXRlKCk6IHZvaWQge1xyXG4gICAgICAgIEtleWJvYXJkLnVwZGF0ZSgpO1xyXG5cclxuICAgICAgICB0aGlzLm5vdyA9IHRoaXMudGltZXN0YW1wKCk7XHJcbiAgICAgICAgdGhpcy5kdCA9IHRoaXMuZHQgKyBNYXRoLm1pbigxLCAodGhpcy5ub3cgLSB0aGlzLmxhc3QpIC8gMTAwMCk7XHJcblxyXG4gICAgICAgIHRoaXMuY3VycmVudExldmVsLnVwZGF0ZSh0aGlzLmR0KTtcclxuXHJcbiAgICAgICAgZm9yIChsZXQgbSBvZiB0aGlzLl9tb2R1bGVzKSB7XHJcbiAgICAgICAgICAgIG0udXBkYXRlKHRoaXMuZHQpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgICAgICBpZiAodGhpcy5jb250ZXh0ICE9PSBudWxsKSB7XHJcbiAgICAgICAgICAgIGZvciAobGV0IG0gb2YgdGhpcy5fbW9kdWxlcykge1xyXG4gICAgICAgICAgICAgICAgbS5kcmF3KHRoaXMuY29udGV4dCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMubGFzdCA9IHRoaXMubm93O1xyXG5cclxuICAgICAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUodGhpcy51cGRhdGUuYmluZCh0aGlzKSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSB0aW1lc3RhbXAoKTogbnVtYmVyIHtcclxuICAgICAgICByZXR1cm4gd2luZG93LnBlcmZvcm1hbmNlICYmIHdpbmRvdy5wZXJmb3JtYW5jZS5ub3cgPyB3aW5kb3cucGVyZm9ybWFuY2Uubm93KCkgOiBuZXcgRGF0ZSgpLmdldFRpbWUoKTtcclxuICAgIH1cclxufVxyXG4iLCJpbXBvcnQgeyBFbnRpdHkgfSBmcm9tIFwiLi9lbnRpdHlcIjtcclxuXHJcbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBNb2R1bGUge1xyXG5cclxuICAgIHByb3RlY3RlZCBfbmVlZHNVcGRhdGU6IGJvb2xlYW47XHJcbiAgICBwcm90ZWN0ZWQgX25lZWRzRHJhdzogYm9vbGVhbjtcclxuXHJcbiAgICBnZXQgbmVlZHNVcGRhdGUoKTogYm9vbGVhbiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX25lZWRzVXBkYXRlO1xyXG4gICAgfVxyXG4gICAgZ2V0IG5lZWRzRHJhdygpOiBib29sZWFuIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fbmVlZHNEcmF3O1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyB1cGRhdGUoZHQ6IG51bWJlcik6IHZvaWQgeyB9XHJcbiAgICBwdWJsaWMgZHJhdyhjdHg6IENhbnZhc1JlbmRlcmluZ0NvbnRleHQyRCk6IHZvaWQgeyB9XHJcblxyXG4gICAgcHVibGljIG9uRW50aXR5QWRkZWQoZTogRW50aXR5KTogdm9pZCB7IH1cclxuICAgIHB1YmxpYyBvbkVudGl0eVJlbW92ZWQoZUlkOiBudW1iZXIpOiB2b2lkIHsgfVxyXG59XHJcbiIsImV4cG9ydCBjbGFzcyBTY2VuZU5vZGUge1xyXG4gICAgXHJcbiAgICBwcm90ZWN0ZWQgX3BhcmVudDogU2NlbmVOb2RlIHwgbnVsbDtcclxuICAgIHByb3RlY3RlZCBfY2hpbGRyZW46IFNjZW5lTm9kZVtdO1xyXG5cclxuICAgIGdldCBwYXJlbnQoKTogU2NlbmVOb2RlIHwgbnVsbHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fcGFyZW50O1xyXG4gICAgfVxyXG4gICAgc2V0IHBhcmVudCh2YWx1ZTogU2NlbmVOb2RlIHwgbnVsbCkge1xyXG4gICAgICAgIHRoaXMuX3BhcmVudCA9IHZhbHVlO1xyXG4gICAgfVxyXG4gICAgZ2V0IGNoaWxkcmVuKCk6IFNjZW5lTm9kZVtdIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fY2hpbGRyZW47XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGFkZENoaWxkKGNoaWxkOiBTY2VuZU5vZGUpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLl9jaGlsZHJlbi5wdXNoKGNoaWxkKTtcclxuICAgIH1cclxufSIsImltcG9ydCB7IEJlaGF2aW9yIH0gZnJvbSBcIi4vYmVoYXZpb3JcIjtcclxuaW1wb3J0IHsgUmVzb3VyY2VMb2FkZXIgfSBmcm9tIFwiLi4vdXRpbHMvcmVzb3VyY2UtbG9hZGVyXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgU3ByaXRlIGV4dGVuZHMgQmVoYXZpb3Ige1xyXG5cclxuICAgIHByaXZhdGUgX3RleHR1cmU6IEhUTUxJbWFnZUVsZW1lbnQ7XHJcbiAgICBwcml2YXRlIF9wYXRoOiBzdHJpbmc7XHJcblxyXG4gICAgY29uc3RydWN0b3IocGF0aDogc3RyaW5nKSB7XHJcbiAgICAgICAgc3VwZXIoKTtcclxuXHJcbiAgICAgICAgdGhpcy5fcGF0aCA9IHBhdGg7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IHRleHR1cmUoKTogSFRNTEltYWdlRWxlbWVudCB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3RleHR1cmU7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHByZVN0YXJ0KCk6IHZvaWQge1xyXG4gICAgICAgIFJlc291cmNlTG9hZGVyLmdldEluc3RhbmNlKCkucXVldWUoW3RoaXMuX3BhdGhdKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc3RhcnQoKSB7XHJcbiAgICAgICAgdGhpcy5fdGV4dHVyZSA9IFJlc291cmNlTG9hZGVyLmdldEluc3RhbmNlKCkuZ2V0UmVzb3VyY2U8SFRNTEltYWdlRWxlbWVudD4odGhpcy5fcGF0aCk7XHJcbiAgICB9XHJcbn1cclxuIiwiZXhwb3J0IGVudW0gS2V5Q29kZSB7XHJcbiAgICBCQUNLU1BBQ0UgPSA4LFxyXG4gICAgVEFCID0gOSxcclxuICAgIEVOVEVSID0gMTMsXHJcbiAgICBTSElGVCA9IDE2LFxyXG4gICAgQ1RSTCA9IDE3LFxyXG4gICAgQUxUID0gMTgsXHJcbiAgICBQQVVTRSA9IDE5LFxyXG4gICAgQ0FQU19MT0NLID0gMjAsXHJcbiAgICBFU0NBUEUgPSAyNyxcclxuICAgIFNQQUNFID0gMzIsXHJcbiAgICBQQUdFX1VQID0gMzMsXHJcbiAgICBQQUdFX0RPV04gPSAzNCxcclxuICAgIEVORCA9IDM1LFxyXG4gICAgSE9NRSA9IDM2LFxyXG4gICAgTEVGVF9BUlJPVyA9IDM3LFxyXG4gICAgVVBfQVJST1cgPSAzOCxcclxuICAgIFJJR0hUX0FSUk9XID0gMzksXHJcbiAgICBET1dOX0FSUk9XID0gNDAsXHJcbiAgICBJTlNFUlQgPSA0NSxcclxuICAgIERFTEVURSA9IDQ2LFxyXG4gICAgS0VZXzAgPSA0OCxcclxuICAgIEtFWV8xID0gNDksXHJcbiAgICBLRVlfMiA9IDUwLFxyXG4gICAgS0VZXzMgPSA1MSxcclxuICAgIEtFWV80ID0gNTIsXHJcbiAgICBLRVlfNSA9IDUzLFxyXG4gICAgS0VZXzYgPSA1NCxcclxuICAgIEtFWV83ID0gNTUsXHJcbiAgICBLRVlfOCA9IDU2LFxyXG4gICAgS0VZXzkgPSA1NyxcclxuICAgIEtFWV9BID0gNjUsXHJcbiAgICBLRVlfQiA9IDY2LFxyXG4gICAgS0VZX0MgPSA2NyxcclxuICAgIEtFWV9EID0gNjgsXHJcbiAgICBLRVlfRSA9IDY5LFxyXG4gICAgS0VZX0YgPSA3MCxcclxuICAgIEtFWV9HID0gNzEsXHJcbiAgICBLRVlfSCA9IDcyLFxyXG4gICAgS0VZX0kgPSA3MyxcclxuICAgIEtFWV9KID0gNzQsXHJcbiAgICBLRVlfSyA9IDc1LFxyXG4gICAgS0VZX0wgPSA3NixcclxuICAgIEtFWV9NID0gNzcsXHJcbiAgICBLRVlfTiA9IDc4LFxyXG4gICAgS0VZX08gPSA3OSxcclxuICAgIEtFWV9QID0gODAsXHJcbiAgICBLRVlfUSA9IDgxLFxyXG4gICAgS0VZX1IgPSA4MixcclxuICAgIEtFWV9TID0gODMsXHJcbiAgICBLRVlfVCA9IDg0LFxyXG4gICAgS0VZX1UgPSA4NSxcclxuICAgIEtFWV9WID0gODYsXHJcbiAgICBLRVlfVyA9IDg3LFxyXG4gICAgS0VZX1ggPSA4OCxcclxuICAgIEtFWV9ZID0gODksXHJcbiAgICBLRVlfWiA9IDkwLFxyXG4gICAgTEVGVF9NRVRBID0gOTEsXHJcbiAgICBSSUdIVF9NRVRBID0gOTIsXHJcbiAgICBTRUxFQ1QgPSA5MyxcclxuICAgIE5VTVBBRF8wID0gOTYsXHJcbiAgICBOVU1QQURfMSA9IDk3LFxyXG4gICAgTlVNUEFEXzIgPSA5OCxcclxuICAgIE5VTVBBRF8zID0gOTksXHJcbiAgICBOVU1QQURfNCA9IDEwMCxcclxuICAgIE5VTVBBRF81ID0gMTAxLFxyXG4gICAgTlVNUEFEXzYgPSAxMDIsXHJcbiAgICBOVU1QQURfNyA9IDEwMyxcclxuICAgIE5VTVBBRF84ID0gMTA0LFxyXG4gICAgTlVNUEFEXzkgPSAxMDUsXHJcbiAgICBNVUxUSVBMWSA9IDEwNixcclxuICAgIEFERCA9IDEwNyxcclxuICAgIFNVQlRSQUNUID0gMTA5LFxyXG4gICAgREVDSU1BTCA9IDExMCxcclxuICAgIERJVklERSA9IDExMSxcclxuICAgIEYxID0gMTEyLFxyXG4gICAgRjIgPSAxMTMsXHJcbiAgICBGMyA9IDExNCxcclxuICAgIEY0ID0gMTE1LFxyXG4gICAgRjUgPSAxMTYsXHJcbiAgICBGNiA9IDExNyxcclxuICAgIEY3ID0gMTE4LFxyXG4gICAgRjggPSAxMTksXHJcbiAgICBGOSA9IDEyMCxcclxuICAgIEYxMCA9IDEyMSxcclxuICAgIEYxMSA9IDEyMixcclxuICAgIEYxMiA9IDEyMyxcclxuICAgIE5VTV9MT0NLID0gMTQ0LFxyXG4gICAgU0NST0xMX0xPQ0sgPSAxNDUsXHJcbiAgICBTRU1JQ09MT04gPSAxODYsXHJcbiAgICBFUVVBTFMgPSAxODcsXHJcbiAgICBDT01NQSA9IDE4OCxcclxuICAgIERBU0ggPSAxODksXHJcbiAgICBQRVJJT0QgPSAxOTAsXHJcbiAgICBGT1JXQVJEX1NMQVNIID0gMTkxLFxyXG4gICAgR1JBVkVfQUNDRU5UID0gMTkyLFxyXG4gICAgT1BFTl9CUkFDS0VUID0gMjE5LFxyXG4gICAgQkFDS19TTEFTSCA9IDIyMCxcclxuICAgIENMT1NFX0JSQUNLRVQgPSAyMjEsXHJcbiAgICBTSU5HTEVfUVVPVEUgPSAyMjJcclxufTtcclxuXHJcbmV4cG9ydCBjbGFzcyBLZXlib2FyZCB7XHJcbiAgICBwcml2YXRlIHN0YXRpYyBwcmV2S2V5czogYm9vbGVhbltdID0gW107XHJcbiAgICBwcml2YXRlIHN0YXRpYyBrZXlzOiBib29sZWFuW10gPSBbXTtcclxuXHJcbiAgICBzdGF0aWMgaW5pdGlhbGl6ZSgpOiB2b2lkIHtcclxuICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcImtleWRvd25cIiwgZSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMua2V5c1tlLmtleUNvZGVdID0gdHJ1ZTtcclxuICAgICAgICB9KTtcclxuICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcImtleXVwXCIsIGUgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLmtleXNbZS5rZXlDb2RlXSA9IGZhbHNlO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHN0YXRpYyB1cGRhdGUoKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5wcmV2S2V5cyA9IHRoaXMua2V5cztcclxuICAgIH1cclxuXHJcbiAgICBzdGF0aWMgaXNLZXlEb3duKGNvZGU6IEtleUNvZGUpOiBib29sZWFuIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5rZXlzW2NvZGVdO1xyXG4gICAgfVxyXG5cclxuICAgIHN0YXRpYyBpc0tleVVwKGNvZGU6IEtleUNvZGUpOiBib29sZWFuIHtcclxuICAgICAgICByZXR1cm4gIXRoaXMua2V5c1tjb2RlXTtcclxuICAgIH1cclxuXHJcbiAgICBzdGF0aWMgaXNLZXlQcmVzc2VkKGNvZGU6IEtleUNvZGUpOiBib29sZWFuIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5rZXlzW2NvZGVdICYmICF0aGlzLnByZXZLZXlzW2NvZGVdO1xyXG4gICAgfVxyXG5cclxuICAgIHN0YXRpYyBpc0tleVJlbGVhc2VkKGNvZGU6IEtleUNvZGUpOiBib29sZWFuIHtcclxuICAgICAgICByZXR1cm4gIXRoaXMua2V5c1tjb2RlXSAmJiB0aGlzLnByZXZLZXlzW2NvZGVdO1xyXG4gICAgfVxyXG59XHJcbiIsImltcG9ydCB7IE1HYW1lIH0gZnJvbSBcIi4vY29yZS9tLWdhbWVcIjtcclxuaW1wb3J0IHsgTGV2ZWwgfSBmcm9tIFwiLi9jb3JlL2xldmVsXCI7XHJcbmltcG9ydCB7IEVudGl0eSB9IGZyb20gXCIuL2NvcmUvZW50aXR5XCI7XHJcbmltcG9ydCB7IEJlaGF2aW9yIH0gZnJvbSBcIi4vY29yZS9iZWhhdmlvclwiO1xyXG5pbXBvcnQgeyBLZXlib2FyZCwgS2V5Q29kZSB9IGZyb20gXCIuL2lucHV0L2tleWJvYXJkXCI7XHJcbmltcG9ydCB7IFNwcml0ZSB9IGZyb20gXCIuL2NvcmUvc3ByaXRlXCI7XHJcbmltcG9ydCB7IFJlbmRlcmVyIH0gZnJvbSBcIi4vbW9kdWxlcy9yZW5kZXJlclwiO1xyXG5pbXBvcnQgeyBWZWN0b3IyIH0gZnJvbSBcIi4vbWF0aC92ZWN0b3IyXCI7XHJcblxyXG5jbGFzcyBUZXN0QmVoYXZpb3IgZXh0ZW5kcyBCZWhhdmlvciB7XHJcblxyXG4gICAgcHJvdGVjdGVkIF9uZWVkc1VwZGF0ZTogYm9vbGVhbiA9IHRydWU7XHJcblxyXG4gICAgcHVibGljIHByZVN0YXJ0KCk6IHZvaWQge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiYmVoYXZpb3IgcHJlIHN0YXJ0ZWQhXCIpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzdGFydCgpOiB2b2lkIHtcclxuICAgICAgICBjb25zb2xlLmxvZyhcImJlaGF2aW9yIHN0YXJ0ZWQhXCIpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyB1cGRhdGUoZHQ6IG51bWJlcik6IHZvaWQge1xyXG4gICAgICAgIGlmIChLZXlib2FyZC5pc0tleURvd24oS2V5Q29kZS5LRVlfVykpIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJXIHByZXNzZWQhXCIpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKEtleWJvYXJkLmlzS2V5RG93bihLZXlDb2RlLktFWV9EKSkge1xyXG4gICAgICAgICAgICB0aGlzLl9vd25lci5wb3NpdGlvbi54Kys7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChLZXlib2FyZC5pc0tleURvd24oS2V5Q29kZS5LRVlfQSkpIHtcclxuICAgICAgICAgICAgdGhpcy5fb3duZXIucG9zaXRpb24ueC0tO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoS2V5Ym9hcmQuaXNLZXlEb3duKEtleUNvZGUuU1BBQ0UpKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX293bmVyLmdldExldmVsKCkuYWRkRW50aXR5KG5ldyBFbnRpdHkoe1xyXG4gICAgICAgICAgICAgICAgbmFtZTogXCJzdGV2ZVwiLFxyXG4gICAgICAgICAgICAgICAgYmVoYXZpb3JzOiBbXHJcbiAgICAgICAgICAgICAgICAgICAgbmV3IFNwcml0ZShcImFzc2V0cy9wbGF5ZXIucG5nXCIpXHJcbiAgICAgICAgICAgICAgICBdLFxyXG4gICAgICAgICAgICAgICAgcG9zaXRpb246IHRoaXMuX293bmVyLnBvc2l0aW9uXHJcbiAgICAgICAgICAgIH0pKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuXHJcbndpbmRvdy5vbmxvYWQgPSAoKSA9PiB7XHJcbiAgICBsZXQgbGV2ZWwgPSBuZXcgTGV2ZWwoKTtcclxuICAgIGxldCBlID0gbmV3IEVudGl0eSh7XHJcbiAgICAgICAgbmFtZTogXCJzdGV2ZVwiLFxyXG4gICAgICAgIGJlaGF2aW9yczogW1xyXG4gICAgICAgICAgICBuZXcgVGVzdEJlaGF2aW9yKCksXHJcbiAgICAgICAgICAgIG5ldyBTcHJpdGUoXCJhc3NldHMvcGxheWVyLnBuZ1wiKVxyXG4gICAgICAgIF0sXHJcbiAgICAgICAgcG9zaXRpb246IG5ldyBWZWN0b3IyKClcclxuICAgIH0pO1xyXG4gICAgbGV2ZWwuYWRkRW50aXR5KGUpO1xyXG5cclxuICAgIGxldCBnYW1lID0gbmV3IE1HYW1lKHtcclxuICAgICAgICBzdGFydExldmVsOiBsZXZlbCxcclxuICAgICAgICBtb2R1bGVzOiBbXHJcbiAgICAgICAgICAgIG5ldyBSZW5kZXJlcigpXHJcbiAgICAgICAgXVxyXG4gICAgfSk7XHJcbiAgICBnYW1lLmluaXRpYWxpemUoKTtcclxufVxyXG4iLCJleHBvcnQgY2xhc3MgVmVjdG9yMiB7XHJcblxyXG4gICAgLy8gY29tcG9uZW50c1xyXG4gICAgcHVibGljIHg6IG51bWJlcjtcclxuICAgIHB1YmxpYyB5OiBudW1iZXI7XHJcblxyXG4gICAgY29uc3RydWN0b3IoeD86IG51bWJlciwgeT86IG51bWJlcikge1xyXG4gICAgICAgIHRoaXMueCA9IHggfHwgMDtcclxuICAgICAgICB0aGlzLnkgPSB5IHx8IDA7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IGxlbmd0aCgpOiBudW1iZXIge1xyXG4gICAgICAgIHJldHVybiBNYXRoLnNxcnQoVmVjdG9yMi5kb3QodGhpcywgdGhpcykpO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIHN0YXRpYyBvcGVyYXRpb25zXHJcbiAgICBzdGF0aWMgYWRkKHYxOiBWZWN0b3IyLCB2MjogVmVjdG9yMik6IFZlY3RvcjIge1xyXG4gICAgICAgIHJldHVybiBuZXcgVmVjdG9yMih2MS54ICsgdjIueCwgdjEueSArIHYyLnkpO1xyXG4gICAgfVxyXG5cclxuICAgIHN0YXRpYyBzdWJ0cmFjdCh2MTogVmVjdG9yMiwgdjI6IFZlY3RvcjIpOiBWZWN0b3IyIHtcclxuICAgICAgICByZXR1cm4gbmV3IFZlY3RvcjIodjEueCAtIHYyLngsIHYxLnkgLSB2Mi55KTtcclxuICAgIH1cclxuXHJcbiAgICBzdGF0aWMgbXVsdGlwbHkodjogVmVjdG9yMiwgc2NhbGFyOiBudW1iZXIpOiBWZWN0b3IyIHtcclxuICAgICAgICByZXR1cm4gbmV3IFZlY3RvcjIodi54ICogc2NhbGFyLCB2LnkgKiBzY2FsYXIpO1xyXG4gICAgfVxyXG5cclxuICAgIHN0YXRpYyBkaXZpZGUodjogVmVjdG9yMiwgc2NhbGFyOiBudW1iZXIpOiBWZWN0b3IyIHtcclxuICAgICAgICByZXR1cm4gbmV3IFZlY3RvcjIodi54IC8gc2NhbGFyLCB2LnkgLyBzY2FsYXIpO1xyXG4gICAgfVxyXG5cclxuICAgIHN0YXRpYyBkb3QodjE6IFZlY3RvcjIsIHYyOiBWZWN0b3IyKTogbnVtYmVyIHtcclxuICAgICAgICByZXR1cm4gKHYxLnggKiB2Mi54KSArICh2MS55ICogdjIueSk7XHJcbiAgICB9XHJcbn1cclxuIiwiaW1wb3J0IHsgTW9kdWxlIH0gZnJvbSBcIi4uL2NvcmUvbW9kdWxlXCI7XHJcbmltcG9ydCB7IEVudGl0eSB9IGZyb20gXCIuLi9jb3JlL2VudGl0eVwiO1xyXG5pbXBvcnQgeyBTcHJpdGUgfSBmcm9tIFwiLi4vY29yZS9zcHJpdGVcIjtcclxuaW1wb3J0IHsgS2V5ZWRDb2xsZWN0aW9uIH0gZnJvbSBcIi4uL3V0aWxzL2tleWVkLWNvbGxlY3Rpb25cIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBSZW5kZXJlciBleHRlbmRzIE1vZHVsZSB7XHJcblxyXG4gICAgcHJpdmF0ZSBzcHJpdGVzQnlFbnRpdHlJZDogS2V5ZWRDb2xsZWN0aW9uPFNwcml0ZT4gPSBuZXcgS2V5ZWRDb2xsZWN0aW9uPFNwcml0ZT4oKTtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICBzdXBlcigpO1xyXG5cclxuICAgICAgICB0aGlzLl9uZWVkc0RyYXcgPSB0cnVlO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBvbkVudGl0eUFkZGVkKGU6IEVudGl0eSk6IHZvaWQge1xyXG4gICAgICAgIGxldCBzID0gZS5nZXRCZWhhdmlvck9mVHlwZShTcHJpdGUpO1xyXG4gICAgICAgIGlmIChzICE9PSBudWxsKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc3ByaXRlc0J5RW50aXR5SWQuYWRkKGUuaWQsIHMpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgb25FbnRpdHlSZW1vdmVkKGVJZDogbnVtYmVyKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5zcHJpdGVzQnlFbnRpdHlJZC5yZW1vdmUoZUlkKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZHJhdyhjdHg6IENhbnZhc1JlbmRlcmluZ0NvbnRleHQyRCk6IHZvaWQge1xyXG4gICAgICAgIGN0eC5jbGVhclJlY3QoMCwgMCwgY3R4LmNhbnZhcy53aWR0aCwgY3R4LmNhbnZhcy5oZWlnaHQpO1xyXG4gICAgICAgIGN0eC5maWxsU3R5bGUgPSBcImJsYWNrXCI7XHJcbiAgICAgICAgY3R4LmZpbGxSZWN0KDAsIDAsIGN0eC5jYW52YXMud2lkdGgsIGN0eC5jYW52YXMuaGVpZ2h0KTtcclxuXHJcbiAgICAgICAgZm9yIChsZXQgcyBvZiB0aGlzLnNwcml0ZXNCeUVudGl0eUlkLnZhbHVlcygpKSB7XHJcbiAgICAgICAgICAgIGxldCBwb3MgPSBzLl9vd25lci5wb3NpdGlvbjtcclxuICAgICAgICAgICAgY3R4LmRyYXdJbWFnZShzLnRleHR1cmUsIHBvcy54LCBwb3MueSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbiIsImV4cG9ydCBjbGFzcyBJZEdlbmVyYXRvciB7XHJcbiAgICBwcml2YXRlIF9uZXh0SWQ6IG51bWJlciA9IDA7XHJcbiAgICBwcml2YXRlIF9hdmFpbGFibGVJZHM6IG51bWJlcltdID0gW107XHJcblxyXG4gICAgcHVibGljIGdldElkKCk6IG51bWJlciB7XHJcbiAgICAgICAgaWYgKHRoaXMuX2F2YWlsYWJsZUlkcy5sZW5ndGggPT09IDApIHtcclxuICAgICAgICAgICAgbGV0IGlkID0gdGhpcy5fbmV4dElkO1xyXG4gICAgICAgICAgICB0aGlzLl9uZXh0SWQrKztcclxuICAgICAgICAgICAgcmV0dXJuIGlkO1xyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgaWQgPSA8bnVtYmVyPnRoaXMuX2F2YWlsYWJsZUlkcy5wb3AoKTtcclxuICAgICAgICByZXR1cm4gaWQ7XHJcbiAgICB9XHJcbn0iLCJleHBvcnQgaW50ZXJmYWNlIElLZXllZENvbGxlY3Rpb248VD4ge1xyXG4gICAgYWRkKGtleTogbnVtYmVyIHwgc3RyaW5nLCB2YWx1ZTogVCk6IHZvaWQ7XHJcbiAgICBjb250YWluc0tleShrZXk6IG51bWJlciB8IHN0cmluZyk6IGJvb2xlYW47XHJcbiAgICBjb3VudCgpOiBudW1iZXI7XHJcbiAgICBpdGVtKGtleTogbnVtYmVyIHwgc3RyaW5nKTogVDtcclxuICAgIHJlbW92ZShrZXk6IG51bWJlciB8IHN0cmluZyk6IFQ7XHJcbiAgICB2YWx1ZXMoKTogVFtdO1xyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgS2V5ZWRDb2xsZWN0aW9uPFQ+IGltcGxlbWVudHMgSUtleWVkQ29sbGVjdGlvbjxUPiB7XHJcbiAgICBwcml2YXRlIF9pdGVtczogeyBbaW5kZXg6IG51bWJlcl06IFQgfSA9IHt9O1xyXG4gXHJcbiAgICBwcml2YXRlIF9jb3VudDogbnVtYmVyID0gMDtcclxuIFxyXG4gICAgcHVibGljIGNvbnRhaW5zS2V5KGtleTogbnVtYmVyKTogYm9vbGVhbiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2l0ZW1zLmhhc093blByb3BlcnR5KGtleSk7XHJcbiAgICB9XHJcbiBcclxuICAgIHB1YmxpYyBjb3VudCgpOiBudW1iZXIge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9jb3VudDtcclxuICAgIH1cclxuIFxyXG4gICAgcHVibGljIGFkZChrZXk6IG51bWJlciwgdmFsdWU6IFQpIHtcclxuICAgICAgICBpZighdGhpcy5faXRlbXMuaGFzT3duUHJvcGVydHkoa2V5KSlcclxuICAgICAgICAgICAgIHRoaXMuX2NvdW50Kys7XHJcbiBcclxuICAgICAgICB0aGlzLl9pdGVtc1trZXldID0gdmFsdWU7XHJcbiAgICB9XHJcbiBcclxuICAgIHB1YmxpYyByZW1vdmUoa2V5OiBudW1iZXIpOiBUIHtcclxuICAgICAgICB2YXIgdmFsID0gdGhpcy5faXRlbXNba2V5XTtcclxuICAgICAgICBkZWxldGUgdGhpcy5faXRlbXNba2V5XTtcclxuICAgICAgICB0aGlzLl9jb3VudC0tO1xyXG4gICAgICAgIHJldHVybiB2YWw7XHJcbiAgICB9XHJcbiBcclxuICAgIHB1YmxpYyBpdGVtKGtleTogbnVtYmVyKTogVCB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2l0ZW1zW2tleV07XHJcbiAgICB9XHJcbiBcclxuICAgIHB1YmxpYyB2YWx1ZXMoKTogVFtdIHtcclxuICAgICAgICB2YXIgdmFsdWVzOiBUW10gPSBbXTtcclxuIFxyXG4gICAgICAgIGZvciAodmFyIHByb3AgaW4gdGhpcy5faXRlbXMpIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuX2l0ZW1zLmhhc093blByb3BlcnR5KHByb3ApKSB7XHJcbiAgICAgICAgICAgICAgICB2YWx1ZXMucHVzaCh0aGlzLl9pdGVtc1twcm9wXSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiBcclxuICAgICAgICByZXR1cm4gdmFsdWVzO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgU3RyS2V5ZWRDb2xsZWN0aW9uPFQ+IGltcGxlbWVudHMgSUtleWVkQ29sbGVjdGlvbjxUPiB7XHJcbiAgICBwcml2YXRlIF9pdGVtczogeyBbaW5kZXg6IHN0cmluZ106IFQgfSA9IHt9O1xyXG4gXHJcbiAgICBwcml2YXRlIF9jb3VudDogbnVtYmVyID0gMDtcclxuIFxyXG4gICAgcHVibGljIGNvbnRhaW5zS2V5KGtleTogc3RyaW5nKTogYm9vbGVhbiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2l0ZW1zLmhhc093blByb3BlcnR5KGtleSk7XHJcbiAgICB9XHJcbiBcclxuICAgIHB1YmxpYyBjb3VudCgpOiBudW1iZXIge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9jb3VudDtcclxuICAgIH1cclxuIFxyXG4gICAgcHVibGljIGFkZChrZXk6IHN0cmluZywgdmFsdWU6IFQpIHtcclxuICAgICAgICBpZighdGhpcy5faXRlbXMuaGFzT3duUHJvcGVydHkoa2V5KSlcclxuICAgICAgICAgICAgIHRoaXMuX2NvdW50Kys7XHJcbiBcclxuICAgICAgICB0aGlzLl9pdGVtc1trZXldID0gdmFsdWU7XHJcbiAgICB9XHJcbiBcclxuICAgIHB1YmxpYyByZW1vdmUoa2V5OiBzdHJpbmcpOiBUIHtcclxuICAgICAgICB2YXIgdmFsID0gdGhpcy5faXRlbXNba2V5XTtcclxuICAgICAgICBkZWxldGUgdGhpcy5faXRlbXNba2V5XTtcclxuICAgICAgICB0aGlzLl9jb3VudC0tO1xyXG4gICAgICAgIHJldHVybiB2YWw7XHJcbiAgICB9XHJcbiBcclxuICAgIHB1YmxpYyBpdGVtKGtleTogc3RyaW5nKTogVCB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2l0ZW1zW2tleV07XHJcbiAgICB9XHJcbiBcclxuICAgIHB1YmxpYyBrZXlzKCk6IG51bWJlcltdIHtcclxuICAgICAgICB2YXIga2V5U2V0OiBudW1iZXJbXSA9IFtdO1xyXG4gXHJcbiAgICAgICAgZm9yICh2YXIgcHJvcCBpbiB0aGlzLl9pdGVtcykge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5faXRlbXMuaGFzT3duUHJvcGVydHkocHJvcCkpIHtcclxuICAgICAgICAgICAgICAgIGtleVNldC5wdXNoKCtwcm9wKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuIFxyXG4gICAgICAgIHJldHVybiBrZXlTZXQ7XHJcbiAgICB9XHJcbiBcclxuICAgIHB1YmxpYyB2YWx1ZXMoKTogVFtdIHtcclxuICAgICAgICB2YXIgdmFsdWVzOiBUW10gPSBbXTtcclxuIFxyXG4gICAgICAgIGZvciAodmFyIHByb3AgaW4gdGhpcy5faXRlbXMpIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuX2l0ZW1zLmhhc093blByb3BlcnR5KHByb3ApKSB7XHJcbiAgICAgICAgICAgICAgICB2YWx1ZXMucHVzaCh0aGlzLl9pdGVtc1twcm9wXSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiBcclxuICAgICAgICByZXR1cm4gdmFsdWVzO1xyXG4gICAgfVxyXG59XHJcbiIsImltcG9ydCB7IFN0cktleWVkQ29sbGVjdGlvbiB9IGZyb20gXCIuL2tleWVkLWNvbGxlY3Rpb25cIjtcclxuaW1wb3J0ICogYXMgcGF0aCBmcm9tICdwYXRoJztcclxuXHJcbmV4cG9ydCBjbGFzcyBSZXNvdXJjZUxvYWRlciB7XHJcblxyXG4gICAgcHJpdmF0ZSBfY2FjaGU6IFN0cktleWVkQ29sbGVjdGlvbjxhbnk+ID0gbmV3IFN0cktleWVkQ29sbGVjdGlvbjxhbnk+KCk7XHJcbiAgICBwcml2YXRlIF9xdWV1ZTogQXJyYXk8c3RyaW5nPiA9IFtdO1xyXG4gICAgcHJpdmF0ZSBfbG9hZENvdW50OiBudW1iZXIgPSAwO1xyXG4gICAgcHJpdmF0ZSBfbG9hZGVkQ291bnQ6IG51bWJlciA9IDA7XHJcblxyXG4gICAgcHJpdmF0ZSBfaW1nRXh0czogc3RyaW5nW10gPSBbXHJcbiAgICAgICAgXCIuanBnXCIsXHJcbiAgICAgICAgXCIucG5nXCJcclxuICAgIF07XHJcbiAgICBwcml2YXRlIF9hdWRFeHRzOiBzdHJpbmdbXSA9IFtcclxuICAgICAgICBcIi53YXZcIlxyXG4gICAgXTtcclxuXHJcbiAgICBnZXQgaXNEb25lKCk6IGJvb2xlYW4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9sb2FkZWRDb3VudCA9PT0gdGhpcy5fbG9hZENvdW50O1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgc3RhdGljIF9pbnN0YW5jZTogUmVzb3VyY2VMb2FkZXI7XHJcblxyXG4gICAgcHJpdmF0ZSBjb25zdHJ1Y3RvcigpIHsgfVxyXG5cclxuICAgIHB1YmxpYyBzdGF0aWMgZ2V0SW5zdGFuY2UoKTogUmVzb3VyY2VMb2FkZXIge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9pbnN0YW5jZSB8fCAodGhpcy5faW5zdGFuY2UgPSBuZXcgUmVzb3VyY2VMb2FkZXIoKSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldFJlc291cmNlPFQgZXh0ZW5kcyBIVE1MSW1hZ2VFbGVtZW50IHwgSFRNTEF1ZGlvRWxlbWVudD4ocGF0aDogc3RyaW5nKTogVCB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2NhY2hlLml0ZW0ocGF0aCkgYXMgVDtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgcXVldWUocmVzOiBzdHJpbmdbXSk6IHZvaWQge1xyXG4gICAgICAgIGZvciAobGV0IGkgb2YgcmVzKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLl9pbWdFeHRzLnNvbWUoeCA9PiB4ID09PSBpKSkge1xyXG4gICAgICAgICAgICAgICAgY29udGludWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5fcXVldWUucHVzaChpKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGxvYWQob25Db21wbGV0ZTogRnVuY3Rpb24pIHtcclxuICAgICAgICB0aGlzLl9sb2FkQ291bnQgPSB0aGlzLl9xdWV1ZS5sZW5ndGg7XHJcbiAgICAgICAgZm9yIChsZXQgcWQgb2YgdGhpcy5fcXVldWUpIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2cocGF0aC5leHRuYW1lKHFkKSk7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLl9pbWdFeHRzLnNvbWUoeCA9PiB4ID09PSBwYXRoLmV4dG5hbWUocWQpKSkge1xyXG4gICAgICAgICAgICAgICAgbGV0IGltYWdlID0gbmV3IEltYWdlKCk7XHJcbiAgICAgICAgICAgICAgICBsZXQgdGhhdCA9IHRoaXM7XHJcbiAgICAgICAgICAgICAgICBpbWFnZS5hZGRFdmVudExpc3RlbmVyKFwibG9hZFwiLCAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhhdC5fbG9hZGVkQ291bnQrKztcclxuICAgICAgICAgICAgICAgICAgICBpZiAodGhhdC5fbG9hZGVkQ291bnQgPT09IHRoYXQuX2xvYWRDb3VudCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBvbkNvbXBsZXRlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICBpbWFnZS5zcmMgPSBxZDtcclxuICAgICAgICAgICAgICAgIHRoYXQuX2NhY2hlLmFkZChxZCwgaW1hZ2UpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmICh0aGlzLl9hdWRFeHRzLnNvbWUoeCA9PiB4ID09PSBwYXRoLmV4dG5hbWUocWQpKSkge1xyXG4gICAgICAgICAgICAgICAgbGV0IGF1ZGlvID0gbmV3IEF1ZGlvKCk7XHJcbiAgICAgICAgICAgICAgICBhdWRpby5hZGRFdmVudExpc3RlbmVyKFwibG9hZFwiLCAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fbG9hZGVkQ291bnQrKztcclxuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5fbG9hZGVkQ291bnQgPT09IHRoaXMuX2xvYWRDb3VudCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBvbkNvbXBsZXRlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICBhdWRpby5zcmMgPSBxZDtcclxuICAgICAgICAgICAgICAgIHRoaXMuX2NhY2hlLmFkZChxZCwgYXVkaW8pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59Il0sInNvdXJjZVJvb3QiOiIifQ==