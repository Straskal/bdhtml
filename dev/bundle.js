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

/***/ "./src/core/component.ts":
/*!*******************************!*\
  !*** ./src/core/component.ts ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
class Component {
    get owner() {
        return this._owner;
    }
    set owner(value) {
        this._owner = value;
    }
    loadResources(loader) { }
}
exports.Component = Component;


/***/ }),

/***/ "./src/core/components/sprite.ts":
/*!***************************************!*\
  !*** ./src/core/components/sprite.ts ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const component_1 = __webpack_require__(/*! ../component */ "./src/core/component.ts");
class Sprite extends component_1.Component {
    constructor(path) {
        super();
        this._path = path;
    }
    get img() {
        return this._img;
    }
    loadResources(loader) {
        loader.queue(this._path, img => this._img = img);
    }
}
exports.Sprite = Sprite;


/***/ }),

/***/ "./src/core/engine.ts":
/*!****************************!*\
  !*** ./src/core/engine.ts ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
class EngineConfiguration {
}
exports.EngineConfiguration = EngineConfiguration;
class Engine {
    constructor(params) {
        const { entry, logicSystems, renderSystems } = params;
        this.currentScene = entry;
        this.logicSystems = logicSystems;
        this.renderSystems = renderSystems;
        this.last = this.timestamp();
    }
    start() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.validateConfiguration()) {
                this.canvas = document.createElement('canvas');
                this.canvas.width = 800;
                this.canvas.height = 600;
                this.canvas.id = 'game';
                let c = this.canvas.getContext('2d');
                if (c != null) {
                    this.ctx = c;
                }
                document.body.insertBefore(this.canvas, document.body.childNodes[0]);
                yield this.currentScene.load();
                this.mainLoop();
            }
        });
    }
    mainLoop() {
        this.now = this.timestamp();
        this.dt = this.dt + Math.min(1, (this.now - this.last) / 1000);
        this.last = this.now;
        while (this.dt >= Engine.TIME_STEP) {
            this.dt = this.dt - Engine.TIME_STEP;
            this.fixedTick();
        }
        this.tick(this.dt);
        this.processEntityEvents();
        this.render();
        requestAnimationFrame(() => this.mainLoop());
    }
    timestamp() {
        return window.performance && window.performance.now ? window.performance.now() : new Date().getTime();
    }
    tick(dt) {
        for (let s of this.logicSystems) {
            s.tick(dt);
        }
    }
    fixedTick() {
        for (let s of this.logicSystems) {
            s.fixedTick();
        }
    }
    render() {
        for (let s of this.renderSystems) {
            s.draw(this.ctx);
        }
    }
    processEntityEvents() {
        let ev = this.currentScene.postTickEntityEvents();
        for (let e of ev.added) {
            this.logicSystems.forEach(s => s.onEntityAdded(e));
            this.renderSystems.forEach(s => s.onEntityAdded(e));
        }
        for (let e of ev.removed) {
            this.logicSystems.forEach(s => s.onEntityRemoved(e));
            this.renderSystems.forEach(s => s.onEntityRemoved(e));
        }
        for (let e of ev.modified) {
            this.logicSystems.forEach(s => s.onEntityModified(e));
            this.renderSystems.forEach(s => s.onEntityModified(e));
        }
    }
    validateConfiguration() {
        for (let i = 0; i < this.logicSystems.length - 1; i++) {
            let system = this.logicSystems[i];
            for (let j = i + 1; j < this.logicSystems.length - 1; j++) {
                let otherSystem = this.logicSystems[j];
                if (system.constructor.name === otherSystem.constructor.name) {
                    return false;
                }
            }
        }
        return true;
    }
}
Engine.TIME_STEP = 1 / 60;
exports.Engine = Engine;


/***/ }),

/***/ "./src/core/entity.ts":
/*!****************************!*\
  !*** ./src/core/entity.ts ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
class Entity {
    get id() {
        return this._id;
    }
    set id(value) {
        this._id = value;
    }
    get name() {
        return this._name;
    }
    get scene() {
        return this._scene;
    }
    set scene(value) {
        this.scene = value;
    }
    constructor(name, position, components) {
        this._name = name;
        this._transform.localPosition = position;
        this._components = components;
        this._components.forEach(c => c.owner = this);
    }
    loadResources(loader) {
        this._components.forEach(c => c.loadResources(loader));
    }
    getBehaviorOfType(tctor) {
        for (let b of this._components) {
            if (b instanceof tctor) {
                return b;
            }
        }
        return null;
    }
}
exports.Entity = Entity;


/***/ }),

/***/ "./src/core/scene.ts":
/*!***************************!*\
  !*** ./src/core/scene.ts ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const resource_loader_1 = __webpack_require__(/*! ../utils/resource-loader */ "./src/utils/resource-loader.ts");
const keyed_collection_1 = __webpack_require__(/*! ../utils/keyed-collection */ "./src/utils/keyed-collection.ts");
const id_generator_1 = __webpack_require__(/*! ../utils/id-generator */ "./src/utils/id-generator.ts");
class EntityEvents {
    constructor() {
        this.added = [];
        this.removed = [];
        this.modified = [];
    }
}
exports.EntityEvents = EntityEvents;
class Scene {
    constructor(name) {
        this._name = name;
        this._entitiesById = new keyed_collection_1.KeyedCollection();
        this._entitiesToAdd = [];
        this._entitiesToRemove = [];
        this._entitiesModified = new keyed_collection_1.KeyedCollection();
        this._resourceLoader = new resource_loader_1.ResourceLoader();
        this._idGenerator = new id_generator_1.IdGenerator();
    }
    load() {
        return new Promise((resolve, reject) => {
            this._entitiesById.values().forEach(e => e.loadResources(this._resourceLoader));
            this._resourceLoader.load(() => resolve());
        });
    }
    add(entity) {
        this._entitiesToAdd.push(entity);
    }
    postTickEntityEvents() {
        for (let e of this._entitiesToRemove) {
            this._entitiesById.remove(e.id);
            this._idGenerator.pushId(e.id);
        }
        for (let e of this._entitiesToAdd) {
            e.id = this._idGenerator.popId();
            this._entitiesById.add(e.id, e);
        }
        let results = {
            added: this._entitiesToAdd.length > 0 ? [...this._entitiesToAdd] : [],
            removed: this._entitiesToRemove.length > 0 ? [...this._entitiesToRemove] : [],
            modified: this._entitiesModified.count() > 0 ? [...this._entitiesModified.values()] : []
        };
        this._entitiesToAdd = [];
        this._entitiesToRemove = [];
        this._entitiesModified.clear();
        return results;
    }
}
exports.Scene = Scene;


/***/ }),

/***/ "./src/main.ts":
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const engine_1 = __webpack_require__(/*! ./core/engine */ "./src/core/engine.ts");
const scene_1 = __webpack_require__(/*! ./core/scene */ "./src/core/scene.ts");
const entity_1 = __webpack_require__(/*! ./core/entity */ "./src/core/entity.ts");
const vector2_1 = __webpack_require__(/*! ./math/vector2 */ "./src/math/vector2.ts");
const sprite_1 = __webpack_require__(/*! ./core/components/sprite */ "./src/core/components/sprite.ts");
window.onload = () => {
    let e = new entity_1.Entity("steve", vector2_1.Vector2.zero, [new sprite_1.Sprite("./assets/player.png")]);
    let engine = new engine_1.Engine({
        entry: new scene_1.Scene("level1"),
        logicSystems: [],
        renderSystems: []
    });
    engine.start();
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
class Vector2 {
    constructor(x, y) {
        this.x = x || 0;
        this.y = y || 0;
    }
    get length() {
        return Math.sqrt(Vector2.dot(this, this));
    }
    static get zero() {
        return new Vector2(0, 0);
    }
    static add(v1, v2) {
        return new Vector2(v1.x + v2.x, v1.y + v2.y);
    }
    static subtract(v1, v2) {
        return new Vector2(v1.x - v2.x, v1.y - v2.y);
    }
    static multiply(v, scalar) {
        return new Vector2(v.x * scalar, v.y * scalar);
    }
    static divide(v, scalar) {
        return new Vector2(v.x / scalar, v.y / scalar);
    }
    static dot(v1, v2) {
        return (v1.x * v2.x) + (v1.y * v2.y);
    }
}
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
class IdGenerator {
    constructor() {
        this._nextId = 0;
        this._availableIds = [];
    }
    popId() {
        if (this._availableIds.length === 0) {
            let id = this._nextId;
            this._nextId++;
            return id;
        }
        let id = this._availableIds.pop();
        return id;
    }
    pushId(id) {
        if (!this._availableIds.some(i => i === id)) {
            this._availableIds.push(id);
        }
    }
}
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
class KeyedCollection {
    constructor() {
        this._items = {};
        this._count = 0;
    }
    containsKey(key) {
        return this._items.hasOwnProperty(key);
    }
    count() {
        return this._count;
    }
    add(key, value) {
        if (!this._items.hasOwnProperty(key))
            this._count++;
        this._items[key] = value;
    }
    remove(key) {
        var val = this._items[key];
        delete this._items[key];
        this._count--;
        return val;
    }
    item(key) {
        return this._items[key];
    }
    values() {
        var values = [];
        for (var prop in this._items) {
            if (this._items.hasOwnProperty(prop)) {
                values.push(this._items[prop]);
            }
        }
        return values;
    }
    clear() {
        this._items = [];
    }
}
exports.KeyedCollection = KeyedCollection;
class StrKeyedCollection {
    constructor() {
        this._items = {};
        this._count = 0;
    }
    containsKey(key) {
        return this._items.hasOwnProperty(key);
    }
    count() {
        return this._count;
    }
    add(key, value) {
        if (!this._items.hasOwnProperty(key))
            this._count++;
        this._items[key] = value;
    }
    remove(key) {
        var val = this._items[key];
        delete this._items[key];
        this._count--;
        return val;
    }
    item(key) {
        return this._items[key];
    }
    keys() {
        var keySet = [];
        for (var prop in this._items) {
            if (this._items.hasOwnProperty(prop)) {
                keySet.push(prop);
            }
        }
        return keySet;
    }
    values() {
        var values = [];
        for (var prop in this._items) {
            if (this._items.hasOwnProperty(prop)) {
                values.push(this._items[prop]);
            }
        }
        return values;
    }
}
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
const keyed_collection_1 = __webpack_require__(/*! ./keyed-collection */ "./src/utils/keyed-collection.ts");
const path = __webpack_require__(/*! path */ "./node_modules/path-browserify/index.js");
const IMAGE_EXT = ['.jpg', '.png'];
class ResourceLoader {
    constructor() {
        this._loadCount = 0;
        this._loadedCount = 0;
        this._cache = new keyed_collection_1.StrKeyedCollection();
        this._queue = new keyed_collection_1.StrKeyedCollection();
    }
    getResource(path) {
        return this._cache.item(path);
    }
    queue(res, callback) {
        if (this._queue.containsKey(res)) {
            let resource = this._queue.item(res);
            resource.push(callback);
            return;
        }
        this._queue.add(res, [callback]);
    }
    load(onComplete) {
        let keys = this._queue.keys();
        this._loadCount = keys.length;
        for (let i = 0; i < keys.length; i++) {
            let key = keys[i];
            if (IMAGE_EXT.some(p => p === path.extname(key))) {
                let image = new Image();
                let that = this;
                image.onload = () => {
                    that._loadedCount += 1;
                    let callbacks = this._queue.item(key);
                    for (let c of callbacks) {
                        c(image);
                    }
                    if (that._loadedCount === that._loadCount) {
                        onComplete();
                    }
                };
                image.src = key;
                that._cache.add(key, image);
            }
        }
    }
}
exports.ResourceLoader = ResourceLoader;


/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3BhdGgtYnJvd3NlcmlmeS9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvcHJvY2Vzcy9icm93c2VyLmpzIiwid2VicGFjazovLy8uL3NyYy9jb3JlL2NvbXBvbmVudC50cyIsIndlYnBhY2s6Ly8vLi9zcmMvY29yZS9jb21wb25lbnRzL3Nwcml0ZS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvY29yZS9lbmdpbmUudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvcmUvZW50aXR5LnRzIiwid2VicGFjazovLy8uL3NyYy9jb3JlL3NjZW5lLnRzIiwid2VicGFjazovLy8uL3NyYy9tYWluLnRzIiwid2VicGFjazovLy8uL3NyYy9tYXRoL3ZlY3RvcjIudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3V0aWxzL2lkLWdlbmVyYXRvci50cyIsIndlYnBhY2s6Ly8vLi9zcmMvdXRpbHMva2V5ZWQtY29sbGVjdGlvbi50cyIsIndlYnBhY2s6Ly8vLi9zcmMvdXRpbHMvcmVzb3VyY2UtbG9hZGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGtEQUEwQyxnQ0FBZ0M7QUFDMUU7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxnRUFBd0Qsa0JBQWtCO0FBQzFFO0FBQ0EseURBQWlELGNBQWM7QUFDL0Q7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlEQUF5QyxpQ0FBaUM7QUFDMUUsd0hBQWdILG1CQUFtQixFQUFFO0FBQ3JJO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsbUNBQTJCLDBCQUEwQixFQUFFO0FBQ3ZELHlDQUFpQyxlQUFlO0FBQ2hEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDhEQUFzRCwrREFBK0Q7O0FBRXJIO0FBQ0E7OztBQUdBO0FBQ0E7Ozs7Ozs7Ozs7OztBQ2xGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0NBQWdDLFFBQVE7QUFDeEM7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLFVBQVUsTUFBTTtBQUNoQjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSw2QkFBNkIsSUFBSTtBQUNqQztBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxvQ0FBb0MsOEJBQThCO0FBQ2xFOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsVUFBVSxvQkFBb0I7QUFDOUI7QUFDQTs7QUFFQTtBQUNBLFVBQVUsVUFBVTtBQUNwQjtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxpQkFBaUIsWUFBWTtBQUM3QjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsK0JBQStCLHNCQUFzQjtBQUNyRDtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsbUJBQW1CLGVBQWU7QUFDbEM7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLGtDQUFrQztBQUNsQztBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7O0FDL05BO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7OztBQUlBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxL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QUssQ0FBQyxDQUFDO3FCQUNaO29CQUVELElBQUksSUFBSSxDQUFDLFlBQVksS0FBSyxJQUFJLENBQUMsVUFBVSxFQUFFO3dCQUN2QyxVQUFVLEVBQUUsQ0FBQztxQkFDaEI7Z0JBQ0wsQ0FBQztnQkFDRCxLQUFLLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQztnQkFDaEIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFLEtBQUssQ0FBQyxDQUFDO2FBQy9CO1NBQ0o7SUFDTCxDQUFDO0NBQ0o7QUF0REQsd0NBc0RDIiwiZmlsZSI6ImJ1bmRsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vc3JjL21haW4udHNcIik7XG4iLCIvLyBDb3B5cmlnaHQgSm95ZW50LCBJbmMuIGFuZCBvdGhlciBOb2RlIGNvbnRyaWJ1dG9ycy5cclxuLy9cclxuLy8gUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGFcclxuLy8gY29weSBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZVxyXG4vLyBcIlNvZnR3YXJlXCIpLCB0byBkZWFsIGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmdcclxuLy8gd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHMgdG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLFxyXG4vLyBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbCBjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0XHJcbi8vIHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXMgZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvIHRoZVxyXG4vLyBmb2xsb3dpbmcgY29uZGl0aW9uczpcclxuLy9cclxuLy8gVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWRcclxuLy8gaW4gYWxsIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXHJcbi8vXHJcbi8vIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1NcclxuLy8gT1IgSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRlxyXG4vLyBNRVJDSEFOVEFCSUxJVFksIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOXHJcbi8vIE5PIEVWRU5UIFNIQUxMIFRIRSBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLFxyXG4vLyBEQU1BR0VTIE9SIE9USEVSIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1JcclxuLy8gT1RIRVJXSVNFLCBBUklTSU5HIEZST00sIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRVxyXG4vLyBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU4gVEhFIFNPRlRXQVJFLlxyXG5cclxuLy8gcmVzb2x2ZXMgLiBhbmQgLi4gZWxlbWVudHMgaW4gYSBwYXRoIGFycmF5IHdpdGggZGlyZWN0b3J5IG5hbWVzIHRoZXJlXHJcbi8vIG11c3QgYmUgbm8gc2xhc2hlcywgZW1wdHkgZWxlbWVudHMsIG9yIGRldmljZSBuYW1lcyAoYzpcXCkgaW4gdGhlIGFycmF5XHJcbi8vIChzbyBhbHNvIG5vIGxlYWRpbmcgYW5kIHRyYWlsaW5nIHNsYXNoZXMgLSBpdCBkb2VzIG5vdCBkaXN0aW5ndWlzaFxyXG4vLyByZWxhdGl2ZSBhbmQgYWJzb2x1dGUgcGF0aHMpXHJcbmZ1bmN0aW9uIG5vcm1hbGl6ZUFycmF5KHBhcnRzLCBhbGxvd0Fib3ZlUm9vdCkge1xyXG4gIC8vIGlmIHRoZSBwYXRoIHRyaWVzIHRvIGdvIGFib3ZlIHRoZSByb290LCBgdXBgIGVuZHMgdXAgPiAwXHJcbiAgdmFyIHVwID0gMDtcclxuICBmb3IgKHZhciBpID0gcGFydHMubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIHtcclxuICAgIHZhciBsYXN0ID0gcGFydHNbaV07XHJcbiAgICBpZiAobGFzdCA9PT0gJy4nKSB7XHJcbiAgICAgIHBhcnRzLnNwbGljZShpLCAxKTtcclxuICAgIH0gZWxzZSBpZiAobGFzdCA9PT0gJy4uJykge1xyXG4gICAgICBwYXJ0cy5zcGxpY2UoaSwgMSk7XHJcbiAgICAgIHVwKys7XHJcbiAgICB9IGVsc2UgaWYgKHVwKSB7XHJcbiAgICAgIHBhcnRzLnNwbGljZShpLCAxKTtcclxuICAgICAgdXAtLTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8vIGlmIHRoZSBwYXRoIGlzIGFsbG93ZWQgdG8gZ28gYWJvdmUgdGhlIHJvb3QsIHJlc3RvcmUgbGVhZGluZyAuLnNcclxuICBpZiAoYWxsb3dBYm92ZVJvb3QpIHtcclxuICAgIGZvciAoOyB1cC0tOyB1cCkge1xyXG4gICAgICBwYXJ0cy51bnNoaWZ0KCcuLicpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcmV0dXJuIHBhcnRzO1xyXG59XHJcblxyXG4vLyBTcGxpdCBhIGZpbGVuYW1lIGludG8gW3Jvb3QsIGRpciwgYmFzZW5hbWUsIGV4dF0sIHVuaXggdmVyc2lvblxyXG4vLyAncm9vdCcgaXMganVzdCBhIHNsYXNoLCBvciBub3RoaW5nLlxyXG52YXIgc3BsaXRQYXRoUmUgPVxyXG4gICAgL14oXFwvP3wpKFtcXHNcXFNdKj8pKCg/OlxcLnsxLDJ9fFteXFwvXSs/fCkoXFwuW14uXFwvXSp8KSkoPzpbXFwvXSopJC87XHJcbnZhciBzcGxpdFBhdGggPSBmdW5jdGlvbihmaWxlbmFtZSkge1xyXG4gIHJldHVybiBzcGxpdFBhdGhSZS5leGVjKGZpbGVuYW1lKS5zbGljZSgxKTtcclxufTtcclxuXHJcbi8vIHBhdGgucmVzb2x2ZShbZnJvbSAuLi5dLCB0bylcclxuLy8gcG9zaXggdmVyc2lvblxyXG5leHBvcnRzLnJlc29sdmUgPSBmdW5jdGlvbigpIHtcclxuICB2YXIgcmVzb2x2ZWRQYXRoID0gJycsXHJcbiAgICAgIHJlc29sdmVkQWJzb2x1dGUgPSBmYWxzZTtcclxuXHJcbiAgZm9yICh2YXIgaSA9IGFyZ3VtZW50cy5sZW5ndGggLSAxOyBpID49IC0xICYmICFyZXNvbHZlZEFic29sdXRlOyBpLS0pIHtcclxuICAgIHZhciBwYXRoID0gKGkgPj0gMCkgPyBhcmd1bWVudHNbaV0gOiBwcm9jZXNzLmN3ZCgpO1xyXG5cclxuICAgIC8vIFNraXAgZW1wdHkgYW5kIGludmFsaWQgZW50cmllc1xyXG4gICAgaWYgKHR5cGVvZiBwYXRoICE9PSAnc3RyaW5nJykge1xyXG4gICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdBcmd1bWVudHMgdG8gcGF0aC5yZXNvbHZlIG11c3QgYmUgc3RyaW5ncycpO1xyXG4gICAgfSBlbHNlIGlmICghcGF0aCkge1xyXG4gICAgICBjb250aW51ZTtcclxuICAgIH1cclxuXHJcbiAgICByZXNvbHZlZFBhdGggPSBwYXRoICsgJy8nICsgcmVzb2x2ZWRQYXRoO1xyXG4gICAgcmVzb2x2ZWRBYnNvbHV0ZSA9IHBhdGguY2hhckF0KDApID09PSAnLyc7XHJcbiAgfVxyXG5cclxuICAvLyBBdCB0aGlzIHBvaW50IHRoZSBwYXRoIHNob3VsZCBiZSByZXNvbHZlZCB0byBhIGZ1bGwgYWJzb2x1dGUgcGF0aCwgYnV0XHJcbiAgLy8gaGFuZGxlIHJlbGF0aXZlIHBhdGhzIHRvIGJlIHNhZmUgKG1pZ2h0IGhhcHBlbiB3aGVuIHByb2Nlc3MuY3dkKCkgZmFpbHMpXHJcblxyXG4gIC8vIE5vcm1hbGl6ZSB0aGUgcGF0aFxyXG4gIHJlc29sdmVkUGF0aCA9IG5vcm1hbGl6ZUFycmF5KGZpbHRlcihyZXNvbHZlZFBhdGguc3BsaXQoJy8nKSwgZnVuY3Rpb24ocCkge1xyXG4gICAgcmV0dXJuICEhcDtcclxuICB9KSwgIXJlc29sdmVkQWJzb2x1dGUpLmpvaW4oJy8nKTtcclxuXHJcbiAgcmV0dXJuICgocmVzb2x2ZWRBYnNvbHV0ZSA/ICcvJyA6ICcnKSArIHJlc29sdmVkUGF0aCkgfHwgJy4nO1xyXG59O1xyXG5cclxuLy8gcGF0aC5ub3JtYWxpemUocGF0aClcclxuLy8gcG9zaXggdmVyc2lvblxyXG5leHBvcnRzLm5vcm1hbGl6ZSA9IGZ1bmN0aW9uKHBhdGgpIHtcclxuICB2YXIgaXNBYnNvbHV0ZSA9IGV4cG9ydHMuaXNBYnNvbHV0ZShwYXRoKSxcclxuICAgICAgdHJhaWxpbmdTbGFzaCA9IHN1YnN0cihwYXRoLCAtMSkgPT09ICcvJztcclxuXHJcbiAgLy8gTm9ybWFsaXplIHRoZSBwYXRoXHJcbiAgcGF0aCA9IG5vcm1hbGl6ZUFycmF5KGZpbHRlcihwYXRoLnNwbGl0KCcvJyksIGZ1bmN0aW9uKHApIHtcclxuICAgIHJldHVybiAhIXA7XHJcbiAgfSksICFpc0Fic29sdXRlKS5qb2luKCcvJyk7XHJcblxyXG4gIGlmICghcGF0aCAmJiAhaXNBYnNvbHV0ZSkge1xyXG4gICAgcGF0aCA9ICcuJztcclxuICB9XHJcbiAgaWYgKHBhdGggJiYgdHJhaWxpbmdTbGFzaCkge1xyXG4gICAgcGF0aCArPSAnLyc7XHJcbiAgfVxyXG5cclxuICByZXR1cm4gKGlzQWJzb2x1dGUgPyAnLycgOiAnJykgKyBwYXRoO1xyXG59O1xyXG5cclxuLy8gcG9zaXggdmVyc2lvblxyXG5leHBvcnRzLmlzQWJzb2x1dGUgPSBmdW5jdGlvbihwYXRoKSB7XHJcbiAgcmV0dXJuIHBhdGguY2hhckF0KDApID09PSAnLyc7XHJcbn07XHJcblxyXG4vLyBwb3NpeCB2ZXJzaW9uXHJcbmV4cG9ydHMuam9pbiA9IGZ1bmN0aW9uKCkge1xyXG4gIHZhciBwYXRocyA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3VtZW50cywgMCk7XHJcbiAgcmV0dXJuIGV4cG9ydHMubm9ybWFsaXplKGZpbHRlcihwYXRocywgZnVuY3Rpb24ocCwgaW5kZXgpIHtcclxuICAgIGlmICh0eXBlb2YgcCAhPT0gJ3N0cmluZycpIHtcclxuICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignQXJndW1lbnRzIHRvIHBhdGguam9pbiBtdXN0IGJlIHN0cmluZ3MnKTtcclxuICAgIH1cclxuICAgIHJldHVybiBwO1xyXG4gIH0pLmpvaW4oJy8nKSk7XHJcbn07XHJcblxyXG5cclxuLy8gcGF0aC5yZWxhdGl2ZShmcm9tLCB0bylcclxuLy8gcG9zaXggdmVyc2lvblxyXG5leHBvcnRzLnJlbGF0aXZlID0gZnVuY3Rpb24oZnJvbSwgdG8pIHtcclxuICBmcm9tID0gZXhwb3J0cy5yZXNvbHZlKGZyb20pLnN1YnN0cigxKTtcclxuICB0byA9IGV4cG9ydHMucmVzb2x2ZSh0bykuc3Vic3RyKDEpO1xyXG5cclxuICBmdW5jdGlvbiB0cmltKGFycikge1xyXG4gICAgdmFyIHN0YXJ0ID0gMDtcclxuICAgIGZvciAoOyBzdGFydCA8IGFyci5sZW5ndGg7IHN0YXJ0KyspIHtcclxuICAgICAgaWYgKGFycltzdGFydF0gIT09ICcnKSBicmVhaztcclxuICAgIH1cclxuXHJcbiAgICB2YXIgZW5kID0gYXJyLmxlbmd0aCAtIDE7XHJcbiAgICBmb3IgKDsgZW5kID49IDA7IGVuZC0tKSB7XHJcbiAgICAgIGlmIChhcnJbZW5kXSAhPT0gJycpIGJyZWFrO1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChzdGFydCA+IGVuZCkgcmV0dXJuIFtdO1xyXG4gICAgcmV0dXJuIGFyci5zbGljZShzdGFydCwgZW5kIC0gc3RhcnQgKyAxKTtcclxuICB9XHJcblxyXG4gIHZhciBmcm9tUGFydHMgPSB0cmltKGZyb20uc3BsaXQoJy8nKSk7XHJcbiAgdmFyIHRvUGFydHMgPSB0cmltKHRvLnNwbGl0KCcvJykpO1xyXG5cclxuICB2YXIgbGVuZ3RoID0gTWF0aC5taW4oZnJvbVBhcnRzLmxlbmd0aCwgdG9QYXJ0cy5sZW5ndGgpO1xyXG4gIHZhciBzYW1lUGFydHNMZW5ndGggPSBsZW5ndGg7XHJcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBsZW5ndGg7IGkrKykge1xyXG4gICAgaWYgKGZyb21QYXJ0c1tpXSAhPT0gdG9QYXJ0c1tpXSkge1xyXG4gICAgICBzYW1lUGFydHNMZW5ndGggPSBpO1xyXG4gICAgICBicmVhaztcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHZhciBvdXRwdXRQYXJ0cyA9IFtdO1xyXG4gIGZvciAodmFyIGkgPSBzYW1lUGFydHNMZW5ndGg7IGkgPCBmcm9tUGFydHMubGVuZ3RoOyBpKyspIHtcclxuICAgIG91dHB1dFBhcnRzLnB1c2goJy4uJyk7XHJcbiAgfVxyXG5cclxuICBvdXRwdXRQYXJ0cyA9IG91dHB1dFBhcnRzLmNvbmNhdCh0b1BhcnRzLnNsaWNlKHNhbWVQYXJ0c0xlbmd0aCkpO1xyXG5cclxuICByZXR1cm4gb3V0cHV0UGFydHMuam9pbignLycpO1xyXG59O1xyXG5cclxuZXhwb3J0cy5zZXAgPSAnLyc7XHJcbmV4cG9ydHMuZGVsaW1pdGVyID0gJzonO1xyXG5cclxuZXhwb3J0cy5kaXJuYW1lID0gZnVuY3Rpb24ocGF0aCkge1xyXG4gIHZhciByZXN1bHQgPSBzcGxpdFBhdGgocGF0aCksXHJcbiAgICAgIHJvb3QgPSByZXN1bHRbMF0sXHJcbiAgICAgIGRpciA9IHJlc3VsdFsxXTtcclxuXHJcbiAgaWYgKCFyb290ICYmICFkaXIpIHtcclxuICAgIC8vIE5vIGRpcm5hbWUgd2hhdHNvZXZlclxyXG4gICAgcmV0dXJuICcuJztcclxuICB9XHJcblxyXG4gIGlmIChkaXIpIHtcclxuICAgIC8vIEl0IGhhcyBhIGRpcm5hbWUsIHN0cmlwIHRyYWlsaW5nIHNsYXNoXHJcbiAgICBkaXIgPSBkaXIuc3Vic3RyKDAsIGRpci5sZW5ndGggLSAxKTtcclxuICB9XHJcblxyXG4gIHJldHVybiByb290ICsgZGlyO1xyXG59O1xyXG5cclxuXHJcbmV4cG9ydHMuYmFzZW5hbWUgPSBmdW5jdGlvbihwYXRoLCBleHQpIHtcclxuICB2YXIgZiA9IHNwbGl0UGF0aChwYXRoKVsyXTtcclxuICAvLyBUT0RPOiBtYWtlIHRoaXMgY29tcGFyaXNvbiBjYXNlLWluc2Vuc2l0aXZlIG9uIHdpbmRvd3M/XHJcbiAgaWYgKGV4dCAmJiBmLnN1YnN0cigtMSAqIGV4dC5sZW5ndGgpID09PSBleHQpIHtcclxuICAgIGYgPSBmLnN1YnN0cigwLCBmLmxlbmd0aCAtIGV4dC5sZW5ndGgpO1xyXG4gIH1cclxuICByZXR1cm4gZjtcclxufTtcclxuXHJcblxyXG5leHBvcnRzLmV4dG5hbWUgPSBmdW5jdGlvbihwYXRoKSB7XHJcbiAgcmV0dXJuIHNwbGl0UGF0aChwYXRoKVszXTtcclxufTtcclxuXHJcbmZ1bmN0aW9uIGZpbHRlciAoeHMsIGYpIHtcclxuICAgIGlmICh4cy5maWx0ZXIpIHJldHVybiB4cy5maWx0ZXIoZik7XHJcbiAgICB2YXIgcmVzID0gW107XHJcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHhzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgaWYgKGYoeHNbaV0sIGksIHhzKSkgcmVzLnB1c2goeHNbaV0pO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHJlcztcclxufVxyXG5cclxuLy8gU3RyaW5nLnByb3RvdHlwZS5zdWJzdHIgLSBuZWdhdGl2ZSBpbmRleCBkb24ndCB3b3JrIGluIElFOFxyXG52YXIgc3Vic3RyID0gJ2FiJy5zdWJzdHIoLTEpID09PSAnYidcclxuICAgID8gZnVuY3Rpb24gKHN0ciwgc3RhcnQsIGxlbikgeyByZXR1cm4gc3RyLnN1YnN0cihzdGFydCwgbGVuKSB9XHJcbiAgICA6IGZ1bmN0aW9uIChzdHIsIHN0YXJ0LCBsZW4pIHtcclxuICAgICAgICBpZiAoc3RhcnQgPCAwKSBzdGFydCA9IHN0ci5sZW5ndGggKyBzdGFydDtcclxuICAgICAgICByZXR1cm4gc3RyLnN1YnN0cihzdGFydCwgbGVuKTtcclxuICAgIH1cclxuO1xyXG4iLCIvLyBzaGltIGZvciB1c2luZyBwcm9jZXNzIGluIGJyb3dzZXJcclxudmFyIHByb2Nlc3MgPSBtb2R1bGUuZXhwb3J0cyA9IHt9O1xyXG5cclxuLy8gY2FjaGVkIGZyb20gd2hhdGV2ZXIgZ2xvYmFsIGlzIHByZXNlbnQgc28gdGhhdCB0ZXN0IHJ1bm5lcnMgdGhhdCBzdHViIGl0XHJcbi8vIGRvbid0IGJyZWFrIHRoaW5ncy4gIEJ1dCB3ZSBuZWVkIHRvIHdyYXAgaXQgaW4gYSB0cnkgY2F0Y2ggaW4gY2FzZSBpdCBpc1xyXG4vLyB3cmFwcGVkIGluIHN0cmljdCBtb2RlIGNvZGUgd2hpY2ggZG9lc24ndCBkZWZpbmUgYW55IGdsb2JhbHMuICBJdCdzIGluc2lkZSBhXHJcbi8vIGZ1bmN0aW9uIGJlY2F1c2UgdHJ5L2NhdGNoZXMgZGVvcHRpbWl6ZSBpbiBjZXJ0YWluIGVuZ2luZXMuXHJcblxyXG52YXIgY2FjaGVkU2V0VGltZW91dDtcclxudmFyIGNhY2hlZENsZWFyVGltZW91dDtcclxuXHJcbmZ1bmN0aW9uIGRlZmF1bHRTZXRUaW1vdXQoKSB7XHJcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ3NldFRpbWVvdXQgaGFzIG5vdCBiZWVuIGRlZmluZWQnKTtcclxufVxyXG5mdW5jdGlvbiBkZWZhdWx0Q2xlYXJUaW1lb3V0ICgpIHtcclxuICAgIHRocm93IG5ldyBFcnJvcignY2xlYXJUaW1lb3V0IGhhcyBub3QgYmVlbiBkZWZpbmVkJyk7XHJcbn1cclxuKGZ1bmN0aW9uICgpIHtcclxuICAgIHRyeSB7XHJcbiAgICAgICAgaWYgKHR5cGVvZiBzZXRUaW1lb3V0ID09PSAnZnVuY3Rpb24nKSB7XHJcbiAgICAgICAgICAgIGNhY2hlZFNldFRpbWVvdXQgPSBzZXRUaW1lb3V0O1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGNhY2hlZFNldFRpbWVvdXQgPSBkZWZhdWx0U2V0VGltb3V0O1xyXG4gICAgICAgIH1cclxuICAgIH0gY2F0Y2ggKGUpIHtcclxuICAgICAgICBjYWNoZWRTZXRUaW1lb3V0ID0gZGVmYXVsdFNldFRpbW91dDtcclxuICAgIH1cclxuICAgIHRyeSB7XHJcbiAgICAgICAgaWYgKHR5cGVvZiBjbGVhclRpbWVvdXQgPT09ICdmdW5jdGlvbicpIHtcclxuICAgICAgICAgICAgY2FjaGVkQ2xlYXJUaW1lb3V0ID0gY2xlYXJUaW1lb3V0O1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGNhY2hlZENsZWFyVGltZW91dCA9IGRlZmF1bHRDbGVhclRpbWVvdXQ7XHJcbiAgICAgICAgfVxyXG4gICAgfSBjYXRjaCAoZSkge1xyXG4gICAgICAgIGNhY2hlZENsZWFyVGltZW91dCA9IGRlZmF1bHRDbGVhclRpbWVvdXQ7XHJcbiAgICB9XHJcbn0gKCkpXHJcbmZ1bmN0aW9uIHJ1blRpbWVvdXQoZnVuKSB7XHJcbiAgICBpZiAoY2FjaGVkU2V0VGltZW91dCA9PT0gc2V0VGltZW91dCkge1xyXG4gICAgICAgIC8vbm9ybWFsIGVudmlyb21lbnRzIGluIHNhbmUgc2l0dWF0aW9uc1xyXG4gICAgICAgIHJldHVybiBzZXRUaW1lb3V0KGZ1biwgMCk7XHJcbiAgICB9XHJcbiAgICAvLyBpZiBzZXRUaW1lb3V0IHdhc24ndCBhdmFpbGFibGUgYnV0IHdhcyBsYXR0ZXIgZGVmaW5lZFxyXG4gICAgaWYgKChjYWNoZWRTZXRUaW1lb3V0ID09PSBkZWZhdWx0U2V0VGltb3V0IHx8ICFjYWNoZWRTZXRUaW1lb3V0KSAmJiBzZXRUaW1lb3V0KSB7XHJcbiAgICAgICAgY2FjaGVkU2V0VGltZW91dCA9IHNldFRpbWVvdXQ7XHJcbiAgICAgICAgcmV0dXJuIHNldFRpbWVvdXQoZnVuLCAwKTtcclxuICAgIH1cclxuICAgIHRyeSB7XHJcbiAgICAgICAgLy8gd2hlbiB3aGVuIHNvbWVib2R5IGhhcyBzY3Jld2VkIHdpdGggc2V0VGltZW91dCBidXQgbm8gSS5FLiBtYWRkbmVzc1xyXG4gICAgICAgIHJldHVybiBjYWNoZWRTZXRUaW1lb3V0KGZ1biwgMCk7XHJcbiAgICB9IGNhdGNoKGUpe1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIC8vIFdoZW4gd2UgYXJlIGluIEkuRS4gYnV0IHRoZSBzY3JpcHQgaGFzIGJlZW4gZXZhbGVkIHNvIEkuRS4gZG9lc24ndCB0cnVzdCB0aGUgZ2xvYmFsIG9iamVjdCB3aGVuIGNhbGxlZCBub3JtYWxseVxyXG4gICAgICAgICAgICByZXR1cm4gY2FjaGVkU2V0VGltZW91dC5jYWxsKG51bGwsIGZ1biwgMCk7XHJcbiAgICAgICAgfSBjYXRjaChlKXtcclxuICAgICAgICAgICAgLy8gc2FtZSBhcyBhYm92ZSBidXQgd2hlbiBpdCdzIGEgdmVyc2lvbiBvZiBJLkUuIHRoYXQgbXVzdCBoYXZlIHRoZSBnbG9iYWwgb2JqZWN0IGZvciAndGhpcycsIGhvcGZ1bGx5IG91ciBjb250ZXh0IGNvcnJlY3Qgb3RoZXJ3aXNlIGl0IHdpbGwgdGhyb3cgYSBnbG9iYWwgZXJyb3JcclxuICAgICAgICAgICAgcmV0dXJuIGNhY2hlZFNldFRpbWVvdXQuY2FsbCh0aGlzLCBmdW4sIDApO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcblxyXG59XHJcbmZ1bmN0aW9uIHJ1bkNsZWFyVGltZW91dChtYXJrZXIpIHtcclxuICAgIGlmIChjYWNoZWRDbGVhclRpbWVvdXQgPT09IGNsZWFyVGltZW91dCkge1xyXG4gICAgICAgIC8vbm9ybWFsIGVudmlyb21lbnRzIGluIHNhbmUgc2l0dWF0aW9uc1xyXG4gICAgICAgIHJldHVybiBjbGVhclRpbWVvdXQobWFya2VyKTtcclxuICAgIH1cclxuICAgIC8vIGlmIGNsZWFyVGltZW91dCB3YXNuJ3QgYXZhaWxhYmxlIGJ1dCB3YXMgbGF0dGVyIGRlZmluZWRcclxuICAgIGlmICgoY2FjaGVkQ2xlYXJUaW1lb3V0ID09PSBkZWZhdWx0Q2xlYXJUaW1lb3V0IHx8ICFjYWNoZWRDbGVhclRpbWVvdXQpICYmIGNsZWFyVGltZW91dCkge1xyXG4gICAgICAgIGNhY2hlZENsZWFyVGltZW91dCA9IGNsZWFyVGltZW91dDtcclxuICAgICAgICByZXR1cm4gY2xlYXJUaW1lb3V0KG1hcmtlcik7XHJcbiAgICB9XHJcbiAgICB0cnkge1xyXG4gICAgICAgIC8vIHdoZW4gd2hlbiBzb21lYm9keSBoYXMgc2NyZXdlZCB3aXRoIHNldFRpbWVvdXQgYnV0IG5vIEkuRS4gbWFkZG5lc3NcclxuICAgICAgICByZXR1cm4gY2FjaGVkQ2xlYXJUaW1lb3V0KG1hcmtlcik7XHJcbiAgICB9IGNhdGNoIChlKXtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICAvLyBXaGVuIHdlIGFyZSBpbiBJLkUuIGJ1dCB0aGUgc2NyaXB0IGhhcyBiZWVuIGV2YWxlZCBzbyBJLkUuIGRvZXNuJ3QgIHRydXN0IHRoZSBnbG9iYWwgb2JqZWN0IHdoZW4gY2FsbGVkIG5vcm1hbGx5XHJcbiAgICAgICAgICAgIHJldHVybiBjYWNoZWRDbGVhclRpbWVvdXQuY2FsbChudWxsLCBtYXJrZXIpO1xyXG4gICAgICAgIH0gY2F0Y2ggKGUpe1xyXG4gICAgICAgICAgICAvLyBzYW1lIGFzIGFib3ZlIGJ1dCB3aGVuIGl0J3MgYSB2ZXJzaW9uIG9mIEkuRS4gdGhhdCBtdXN0IGhhdmUgdGhlIGdsb2JhbCBvYmplY3QgZm9yICd0aGlzJywgaG9wZnVsbHkgb3VyIGNvbnRleHQgY29ycmVjdCBvdGhlcndpc2UgaXQgd2lsbCB0aHJvdyBhIGdsb2JhbCBlcnJvci5cclxuICAgICAgICAgICAgLy8gU29tZSB2ZXJzaW9ucyBvZiBJLkUuIGhhdmUgZGlmZmVyZW50IHJ1bGVzIGZvciBjbGVhclRpbWVvdXQgdnMgc2V0VGltZW91dFxyXG4gICAgICAgICAgICByZXR1cm4gY2FjaGVkQ2xlYXJUaW1lb3V0LmNhbGwodGhpcywgbWFya2VyKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG5cclxuXHJcbn1cclxudmFyIHF1ZXVlID0gW107XHJcbnZhciBkcmFpbmluZyA9IGZhbHNlO1xyXG52YXIgY3VycmVudFF1ZXVlO1xyXG52YXIgcXVldWVJbmRleCA9IC0xO1xyXG5cclxuZnVuY3Rpb24gY2xlYW5VcE5leHRUaWNrKCkge1xyXG4gICAgaWYgKCFkcmFpbmluZyB8fCAhY3VycmVudFF1ZXVlKSB7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG4gICAgZHJhaW5pbmcgPSBmYWxzZTtcclxuICAgIGlmIChjdXJyZW50UXVldWUubGVuZ3RoKSB7XHJcbiAgICAgICAgcXVldWUgPSBjdXJyZW50UXVldWUuY29uY2F0KHF1ZXVlKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgcXVldWVJbmRleCA9IC0xO1xyXG4gICAgfVxyXG4gICAgaWYgKHF1ZXVlLmxlbmd0aCkge1xyXG4gICAgICAgIGRyYWluUXVldWUoKTtcclxuICAgIH1cclxufVxyXG5cclxuZnVuY3Rpb24gZHJhaW5RdWV1ZSgpIHtcclxuICAgIGlmIChkcmFpbmluZykge1xyXG4gICAgICAgIHJldHVybjtcclxuICAgIH1cclxuICAgIHZhciB0aW1lb3V0ID0gcnVuVGltZW91dChjbGVhblVwTmV4dFRpY2spO1xyXG4gICAgZHJhaW5pbmcgPSB0cnVlO1xyXG5cclxuICAgIHZhciBsZW4gPSBxdWV1ZS5sZW5ndGg7XHJcbiAgICB3aGlsZShsZW4pIHtcclxuICAgICAgICBjdXJyZW50UXVldWUgPSBxdWV1ZTtcclxuICAgICAgICBxdWV1ZSA9IFtdO1xyXG4gICAgICAgIHdoaWxlICgrK3F1ZXVlSW5kZXggPCBsZW4pIHtcclxuICAgICAgICAgICAgaWYgKGN1cnJlbnRRdWV1ZSkge1xyXG4gICAgICAgICAgICAgICAgY3VycmVudFF1ZXVlW3F1ZXVlSW5kZXhdLnJ1bigpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHF1ZXVlSW5kZXggPSAtMTtcclxuICAgICAgICBsZW4gPSBxdWV1ZS5sZW5ndGg7XHJcbiAgICB9XHJcbiAgICBjdXJyZW50UXVldWUgPSBudWxsO1xyXG4gICAgZHJhaW5pbmcgPSBmYWxzZTtcclxuICAgIHJ1bkNsZWFyVGltZW91dCh0aW1lb3V0KTtcclxufVxyXG5cclxucHJvY2Vzcy5uZXh0VGljayA9IGZ1bmN0aW9uIChmdW4pIHtcclxuICAgIHZhciBhcmdzID0gbmV3IEFycmF5KGFyZ3VtZW50cy5sZW5ndGggLSAxKTtcclxuICAgIGlmIChhcmd1bWVudHMubGVuZ3RoID4gMSkge1xyXG4gICAgICAgIGZvciAodmFyIGkgPSAxOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGFyZ3NbaSAtIDFdID0gYXJndW1lbnRzW2ldO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHF1ZXVlLnB1c2gobmV3IEl0ZW0oZnVuLCBhcmdzKSk7XHJcbiAgICBpZiAocXVldWUubGVuZ3RoID09PSAxICYmICFkcmFpbmluZykge1xyXG4gICAgICAgIHJ1blRpbWVvdXQoZHJhaW5RdWV1ZSk7XHJcbiAgICB9XHJcbn07XHJcblxyXG4vLyB2OCBsaWtlcyBwcmVkaWN0aWJsZSBvYmplY3RzXHJcbmZ1bmN0aW9uIEl0ZW0oZnVuLCBhcnJheSkge1xyXG4gICAgdGhpcy5mdW4gPSBmdW47XHJcbiAgICB0aGlzLmFycmF5ID0gYXJyYXk7XHJcbn1cclxuSXRlbS5wcm90b3R5cGUucnVuID0gZnVuY3Rpb24gKCkge1xyXG4gICAgdGhpcy5mdW4uYXBwbHkobnVsbCwgdGhpcy5hcnJheSk7XHJcbn07XHJcbnByb2Nlc3MudGl0bGUgPSAnYnJvd3Nlcic7XHJcbnByb2Nlc3MuYnJvd3NlciA9IHRydWU7XHJcbnByb2Nlc3MuZW52ID0ge307XHJcbnByb2Nlc3MuYXJndiA9IFtdO1xyXG5wcm9jZXNzLnZlcnNpb24gPSAnJzsgLy8gZW1wdHkgc3RyaW5nIHRvIGF2b2lkIHJlZ2V4cCBpc3N1ZXNcclxucHJvY2Vzcy52ZXJzaW9ucyA9IHt9O1xyXG5cclxuZnVuY3Rpb24gbm9vcCgpIHt9XHJcblxyXG5wcm9jZXNzLm9uID0gbm9vcDtcclxucHJvY2Vzcy5hZGRMaXN0ZW5lciA9IG5vb3A7XHJcbnByb2Nlc3Mub25jZSA9IG5vb3A7XHJcbnByb2Nlc3Mub2ZmID0gbm9vcDtcclxucHJvY2Vzcy5yZW1vdmVMaXN0ZW5lciA9IG5vb3A7XHJcbnByb2Nlc3MucmVtb3ZlQWxsTGlzdGVuZXJzID0gbm9vcDtcclxucHJvY2Vzcy5lbWl0ID0gbm9vcDtcclxucHJvY2Vzcy5wcmVwZW5kTGlzdGVuZXIgPSBub29wO1xyXG5wcm9jZXNzLnByZXBlbmRPbmNlTGlzdGVuZXIgPSBub29wO1xyXG5cclxucHJvY2Vzcy5saXN0ZW5lcnMgPSBmdW5jdGlvbiAobmFtZSkgeyByZXR1cm4gW10gfVxyXG5cclxucHJvY2Vzcy5iaW5kaW5nID0gZnVuY3Rpb24gKG5hbWUpIHtcclxuICAgIHRocm93IG5ldyBFcnJvcigncHJvY2Vzcy5iaW5kaW5nIGlzIG5vdCBzdXBwb3J0ZWQnKTtcclxufTtcclxuXHJcbnByb2Nlc3MuY3dkID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gJy8nIH07XHJcbnByb2Nlc3MuY2hkaXIgPSBmdW5jdGlvbiAoZGlyKSB7XHJcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ3Byb2Nlc3MuY2hkaXIgaXMgbm90IHN1cHBvcnRlZCcpO1xyXG59O1xyXG5wcm9jZXNzLnVtYXNrID0gZnVuY3Rpb24oKSB7IHJldHVybiAwOyB9O1xyXG4iLCJpbXBvcnQgeyBSZXNvdXJjZUxvYWRlciB9IGZyb20gXCIuLi91dGlscy9yZXNvdXJjZS1sb2FkZXJcIjtcclxuaW1wb3J0IHsgRW50aXR5IH0gZnJvbSBcIi4vZW50aXR5XCI7XHJcblxyXG5leHBvcnQgY2xhc3MgQ29tcG9uZW50IHtcclxuXHJcbiAgICBwcml2YXRlIF9vd25lcjogRW50aXR5O1xyXG5cclxuICAgIGdldCBvd25lcigpOiBFbnRpdHkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9vd25lcjtcclxuICAgIH1cclxuXHJcbiAgICBzZXQgb3duZXIodmFsdWU6IEVudGl0eSkge1xyXG4gICAgICAgIHRoaXMuX293bmVyID0gdmFsdWU7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGxvYWRSZXNvdXJjZXMobG9hZGVyOiBSZXNvdXJjZUxvYWRlcik6IHZvaWQgeyB9XHJcbn0iLCJpbXBvcnQgeyBDb21wb25lbnQgfSBmcm9tIFwiLi4vY29tcG9uZW50XCI7XHJcbmltcG9ydCB7IFJlc291cmNlTG9hZGVyIH0gZnJvbSBcIi4uLy4uL3V0aWxzL3Jlc291cmNlLWxvYWRlclwiO1xyXG5cclxuZXhwb3J0IGNsYXNzIFNwcml0ZSBleHRlbmRzIENvbXBvbmVudCB7XHJcblxyXG4gICAgcHJpdmF0ZSBfcGF0aDogc3RyaW5nO1xyXG4gICAgcHJpdmF0ZSBfaW1nOiBIVE1MSW1hZ2VFbGVtZW50O1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKHBhdGg6IHN0cmluZykge1xyXG4gICAgICAgIHN1cGVyKCk7XHJcblxyXG4gICAgICAgIHRoaXMuX3BhdGggPSBwYXRoO1xyXG4gICAgfVxyXG5cclxuICAgIGdldCBpbWcoKTogSFRNTEltYWdlRWxlbWVudCB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2ltZztcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgbG9hZFJlc291cmNlcyhsb2FkZXI6IFJlc291cmNlTG9hZGVyKTogdm9pZCB7XHJcbiAgICAgICAgbG9hZGVyLnF1ZXVlKHRoaXMuX3BhdGgsIGltZyA9PiB0aGlzLl9pbWcgPSBpbWcpO1xyXG4gICAgfVxyXG59IiwiaW1wb3J0IHsgU2NlbmUgfSBmcm9tIFwiLi9zY2VuZVwiO1xyXG5pbXBvcnQgeyBJTG9naWNTeXN0ZW0gfSBmcm9tIFwiLi9pTG9naWNTeXN0ZW1cIjtcclxuaW1wb3J0IHsgSVJlbmRlclN5c3RlbSB9IGZyb20gXCIuL2lSZW5kZXJTeXN0ZW1cIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBFbmdpbmVDb25maWd1cmF0aW9uIHtcclxuXHJcbiAgICBlbnRyeTogU2NlbmU7XHJcbiAgICBsb2dpY1N5c3RlbXM6IElMb2dpY1N5c3RlbVtdO1xyXG4gICAgcmVuZGVyU3lzdGVtczogSVJlbmRlclN5c3RlbVtdO1xyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgRW5naW5lIHtcclxuXHJcbiAgICBwcml2YXRlIHN0YXRpYyByZWFkb25seSBUSU1FX1NURVA6IG51bWJlciA9IDEgLyA2MDtcclxuXHJcbiAgICBwcml2YXRlIGNhbnZhczogSFRNTENhbnZhc0VsZW1lbnQ7XHJcbiAgICBwcml2YXRlIGN0eDogQ2FudmFzUmVuZGVyaW5nQ29udGV4dDJEO1xyXG5cclxuICAgIHByaXZhdGUgY3VycmVudFNjZW5lOiBTY2VuZTtcclxuICAgIHByaXZhdGUgbG9naWNTeXN0ZW1zOiBJTG9naWNTeXN0ZW1bXTtcclxuICAgIHByaXZhdGUgcmVuZGVyU3lzdGVtczogSVJlbmRlclN5c3RlbVtdO1xyXG5cclxuICAgIHByaXZhdGUgbm93OiBudW1iZXI7XHJcbiAgICBwcml2YXRlIGR0OiBudW1iZXI7XHJcbiAgICBwcml2YXRlIGxhc3Q6IG51bWJlcjtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihwYXJhbXM6IEVuZ2luZUNvbmZpZ3VyYXRpb24pIHtcclxuICAgICAgICBjb25zdCB7IGVudHJ5LCBsb2dpY1N5c3RlbXMsIHJlbmRlclN5c3RlbXMgfSA9IHBhcmFtcztcclxuXHJcbiAgICAgICAgdGhpcy5jdXJyZW50U2NlbmUgPSBlbnRyeTtcclxuICAgICAgICB0aGlzLmxvZ2ljU3lzdGVtcyA9IGxvZ2ljU3lzdGVtcztcclxuICAgICAgICB0aGlzLnJlbmRlclN5c3RlbXMgPSByZW5kZXJTeXN0ZW1zO1xyXG5cclxuICAgICAgICB0aGlzLmxhc3QgPSB0aGlzLnRpbWVzdGFtcCgpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBhc3luYyBzdGFydCgpOiBQcm9taXNlPHZvaWQ+IHtcclxuICAgICAgICAvLyBUT0RPOiBsb2cgZXJyb3Igd2hlbiBub3QgdmFsaWRcclxuICAgICAgICAvLyBUT0RPIGxvZyBlcnJvciBpZiBubyBzeXN0ZW1zIGFyZSBwcm92aWRlZFxyXG4gICAgICAgIGlmICh0aGlzLnZhbGlkYXRlQ29uZmlndXJhdGlvbigpKSB7XHJcbiAgICAgICAgICAgIHRoaXMuY2FudmFzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnY2FudmFzJyk7XHJcbiAgICAgICAgICAgIHRoaXMuY2FudmFzLndpZHRoID0gODAwO1xyXG4gICAgICAgICAgICB0aGlzLmNhbnZhcy5oZWlnaHQgPSA2MDA7XHJcbiAgICAgICAgICAgIHRoaXMuY2FudmFzLmlkID0gJ2dhbWUnO1xyXG4gICAgXHJcbiAgICAgICAgICAgIC8vIFRPRE86IGxvZyBlcnJvciBpZiBjb250ZXh0IGlzIG51bGxcclxuICAgICAgICAgICAgbGV0IGMgPSB0aGlzLmNhbnZhcy5nZXRDb250ZXh0KCcyZCcpO1xyXG4gICAgICAgICAgICBpZiAoYyAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmN0eCA9IGM7XHJcbiAgICAgICAgICAgIH1cclxuICAgIFxyXG4gICAgICAgICAgICBkb2N1bWVudC5ib2R5Lmluc2VydEJlZm9yZSh0aGlzLmNhbnZhcywgZG9jdW1lbnQuYm9keS5jaGlsZE5vZGVzWzBdKTtcclxuICAgIFxyXG4gICAgICAgICAgICAvLyBUT0RPOiBzY2VuZSBtYW5hZ2VtZW50XHJcbiAgICAgICAgICAgIGF3YWl0IHRoaXMuY3VycmVudFNjZW5lLmxvYWQoKTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMubWFpbkxvb3AoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBtYWluTG9vcCgpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLm5vdyA9IHRoaXMudGltZXN0YW1wKCk7XHJcbiAgICAgICAgdGhpcy5kdCA9IHRoaXMuZHQgKyBNYXRoLm1pbigxLCAodGhpcy5ub3cgLSB0aGlzLmxhc3QpIC8gMTAwMCk7XHJcbiAgICAgICAgdGhpcy5sYXN0ID0gdGhpcy5ub3c7XHJcbiAgICAgICAgXHJcbiAgICAgICAgd2hpbGUgKHRoaXMuZHQgPj0gRW5naW5lLlRJTUVfU1RFUCkge1xyXG4gICAgICAgICAgICB0aGlzLmR0ID0gdGhpcy5kdCAtIEVuZ2luZS5USU1FX1NURVA7XHJcbiAgICAgICAgICAgIHRoaXMuZml4ZWRUaWNrKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLnRpY2sodGhpcy5kdCk7XHJcbiAgICAgICAgdGhpcy5wcm9jZXNzRW50aXR5RXZlbnRzKCk7XHJcblxyXG4gICAgICAgIHRoaXMucmVuZGVyKCk7XHJcblxyXG4gICAgICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZSgoKSA9PiB0aGlzLm1haW5Mb29wKCkpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgdGltZXN0YW1wKCk6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIHdpbmRvdy5wZXJmb3JtYW5jZSAmJiB3aW5kb3cucGVyZm9ybWFuY2Uubm93ID8gd2luZG93LnBlcmZvcm1hbmNlLm5vdygpIDogbmV3IERhdGUoKS5nZXRUaW1lKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSB0aWNrKGR0OiBudW1iZXIpOiB2b2lkIHtcclxuICAgICAgICBmb3IgKGxldCBzIG9mIHRoaXMubG9naWNTeXN0ZW1zKSB7XHJcbiAgICAgICAgICAgIHMudGljayhkdCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgZml4ZWRUaWNrKCk6IHZvaWQge1xyXG4gICAgICAgIGZvciAobGV0IHMgb2YgdGhpcy5sb2dpY1N5c3RlbXMpIHtcclxuICAgICAgICAgICAgcy5maXhlZFRpY2soKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSByZW5kZXIoKTogdm9pZCB7XHJcbiAgICAgICAgZm9yIChsZXQgcyBvZiB0aGlzLnJlbmRlclN5c3RlbXMpIHtcclxuICAgICAgICAgICAgcy5kcmF3KHRoaXMuY3R4KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBwcm9jZXNzRW50aXR5RXZlbnRzKCk6IHZvaWQge1xyXG4gICAgICAgIGxldCBldiA9IHRoaXMuY3VycmVudFNjZW5lLnBvc3RUaWNrRW50aXR5RXZlbnRzKCk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgZm9yIChsZXQgZSBvZiBldi5hZGRlZCkge1xyXG4gICAgICAgICAgICB0aGlzLmxvZ2ljU3lzdGVtcy5mb3JFYWNoKHMgPT4gcy5vbkVudGl0eUFkZGVkKGUpKTtcclxuICAgICAgICAgICAgdGhpcy5yZW5kZXJTeXN0ZW1zLmZvckVhY2gocyA9PiBzLm9uRW50aXR5QWRkZWQoZSkpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZm9yIChsZXQgZSBvZiBldi5yZW1vdmVkKSB7XHJcbiAgICAgICAgICAgIHRoaXMubG9naWNTeXN0ZW1zLmZvckVhY2gocyA9PiBzLm9uRW50aXR5UmVtb3ZlZChlKSk7XHJcbiAgICAgICAgICAgIHRoaXMucmVuZGVyU3lzdGVtcy5mb3JFYWNoKHMgPT4gcy5vbkVudGl0eVJlbW92ZWQoZSkpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZm9yIChsZXQgZSBvZiBldi5tb2RpZmllZCkge1xyXG4gICAgICAgICAgICB0aGlzLmxvZ2ljU3lzdGVtcy5mb3JFYWNoKHMgPT4gcy5vbkVudGl0eU1vZGlmaWVkKGUpKTtcclxuICAgICAgICAgICAgdGhpcy5yZW5kZXJTeXN0ZW1zLmZvckVhY2gocyA9PiBzLm9uRW50aXR5TW9kaWZpZWQoZSkpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHZhbGlkYXRlQ29uZmlndXJhdGlvbigpOiBib29sZWFuIHtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMubG9naWNTeXN0ZW1zLmxlbmd0aCAtIDE7IGkrKykge1xyXG4gICAgICAgICAgICBsZXQgc3lzdGVtID0gdGhpcy5sb2dpY1N5c3RlbXNbaV07XHJcblxyXG4gICAgICAgICAgICBmb3IgKGxldCBqID0gaSArIDE7IGogPCB0aGlzLmxvZ2ljU3lzdGVtcy5sZW5ndGggLSAxOyBqKyspIHtcclxuICAgICAgICAgICAgICAgIGxldCBvdGhlclN5c3RlbSA9IHRoaXMubG9naWNTeXN0ZW1zW2pdO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmICgoPGFueT5zeXN0ZW0uY29uc3RydWN0b3IpLm5hbWUgPT09ICg8YW55Pm90aGVyU3lzdGVtLmNvbnN0cnVjdG9yKS5uYW1lKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH1cclxufSIsImltcG9ydCB7IFJlc291cmNlTG9hZGVyIH0gZnJvbSBcIi4uL3V0aWxzL3Jlc291cmNlLWxvYWRlclwiO1xyXG5pbXBvcnQgeyBDb21wb25lbnQgfSBmcm9tIFwiLi9jb21wb25lbnRcIjtcclxuaW1wb3J0IHsgVmVjdG9yMiB9IGZyb20gXCIuLi9tYXRoL3ZlY3RvcjJcIjtcclxuaW1wb3J0IHsgVHJhbnNmb3JtIH0gZnJvbSBcIi4uL21hdGgvdHJhbnNmb3JtXCI7XHJcbmltcG9ydCB7IFNjZW5lIH0gZnJvbSBcIi4vc2NlbmVcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBFbnRpdHkge1xyXG5cclxuICAgIHByaXZhdGUgX3NjZW5lOiBTY2VuZTtcclxuXHJcbiAgICBwcml2YXRlIF9pZDogbnVtYmVyO1xyXG5cclxuICAgIHByaXZhdGUgcmVhZG9ubHkgX25hbWU6IHN0cmluZztcclxuICAgIHByaXZhdGUgcmVhZG9ubHkgX3RyYW5zZm9ybTogVHJhbnNmb3JtO1xyXG5cclxuICAgIHByaXZhdGUgX2NvbXBvbmVudHM6IENvbXBvbmVudFtdO1xyXG5cclxuICAgIGdldCBpZCgpOiBudW1iZXIge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9pZDtcclxuICAgIH1cclxuXHJcbiAgICBzZXQgaWQodmFsdWU6IG51bWJlcikge1xyXG4gICAgICAgIHRoaXMuX2lkID0gdmFsdWU7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IG5hbWUoKTogc3RyaW5nIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fbmFtZTtcclxuICAgIH1cclxuXHJcbiAgICBnZXQgc2NlbmUoKTogU2NlbmUge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9zY2VuZTtcclxuICAgIH1cclxuXHJcbiAgICBzZXQgc2NlbmUodmFsdWU6IFNjZW5lKSB7XHJcbiAgICAgICAgdGhpcy5zY2VuZSA9IHZhbHVlO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0cnVjdG9yKG5hbWU6IHN0cmluZywgcG9zaXRpb246IFZlY3RvcjIsIGNvbXBvbmVudHM6IENvbXBvbmVudFtdKSB7XHJcbiAgICAgICAgdGhpcy5fbmFtZSA9IG5hbWU7XHJcbiAgICAgICAgdGhpcy5fdHJhbnNmb3JtLmxvY2FsUG9zaXRpb24gPSBwb3NpdGlvbjtcclxuICAgICAgICB0aGlzLl9jb21wb25lbnRzID0gY29tcG9uZW50cztcclxuXHJcbiAgICAgICAgdGhpcy5fY29tcG9uZW50cy5mb3JFYWNoKGMgPT4gYy5vd25lciA9IHRoaXMpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBsb2FkUmVzb3VyY2VzKGxvYWRlcjogUmVzb3VyY2VMb2FkZXIpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLl9jb21wb25lbnRzLmZvckVhY2goYyA9PiBjLmxvYWRSZXNvdXJjZXMobG9hZGVyKSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldEJlaGF2aW9yT2ZUeXBlPFQgZXh0ZW5kcyBDb21wb25lbnQ+KHRjdG9yOiBuZXcgKC4uLmFyZ3M6IGFueVtdKSA9PiBUKTogVCB8IG51bGwge1xyXG4gICAgICAgIGZvciAobGV0IGIgb2YgdGhpcy5fY29tcG9uZW50cykge1xyXG4gICAgICAgICAgICBpZiAoYiBpbnN0YW5jZW9mIHRjdG9yKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gYiBhcyBUO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgfVxyXG59XHJcbiIsImltcG9ydCB7IFJlc291cmNlTG9hZGVyIH0gZnJvbSBcIi4uL3V0aWxzL3Jlc291cmNlLWxvYWRlclwiO1xyXG5pbXBvcnQgeyBLZXllZENvbGxlY3Rpb24gfSBmcm9tIFwiLi4vdXRpbHMva2V5ZWQtY29sbGVjdGlvblwiO1xyXG5pbXBvcnQgeyBFbnRpdHkgfSBmcm9tIFwiLi9lbnRpdHlcIjtcclxuaW1wb3J0IHsgSWRHZW5lcmF0b3IgfSBmcm9tIFwiLi4vdXRpbHMvaWQtZ2VuZXJhdG9yXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgRW50aXR5RXZlbnRzIHtcclxuXHJcbiAgICBwdWJsaWMgYWRkZWQ6IEVudGl0eVtdID0gW107XHJcbiAgICBwdWJsaWMgcmVtb3ZlZDogRW50aXR5W10gPSBbXTtcclxuICAgIHB1YmxpYyBtb2RpZmllZDogRW50aXR5W10gPSBbXTtcclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIFNjZW5lIHtcclxuXHJcbiAgICBwcml2YXRlIHJlYWRvbmx5IF9uYW1lOiBzdHJpbmc7XHJcblxyXG4gICAgcHJpdmF0ZSBfZW50aXRpZXNCeUlkOiBLZXllZENvbGxlY3Rpb248RW50aXR5PjtcclxuICAgIHByaXZhdGUgX2VudGl0aWVzVG9BZGQ6IEVudGl0eVtdO1xyXG4gICAgcHJpdmF0ZSBfZW50aXRpZXNUb1JlbW92ZTogRW50aXR5W107XHJcbiAgICBwcml2YXRlIF9lbnRpdGllc01vZGlmaWVkOiBLZXllZENvbGxlY3Rpb248RW50aXR5PjtcclxuICAgIFxyXG4gICAgcHJpdmF0ZSBfcmVzb3VyY2VMb2FkZXI6IFJlc291cmNlTG9hZGVyO1xyXG4gICAgcHJpdmF0ZSBfaWRHZW5lcmF0b3I6IElkR2VuZXJhdG9yO1xyXG4gICAgXHJcbiAgICBjb25zdHJ1Y3RvcihuYW1lOiBzdHJpbmcpIHtcclxuICAgICAgICB0aGlzLl9uYW1lID0gbmFtZTtcclxuXHJcbiAgICAgICAgdGhpcy5fZW50aXRpZXNCeUlkID0gbmV3IEtleWVkQ29sbGVjdGlvbjxFbnRpdHk+KCk7XHJcbiAgICAgICAgdGhpcy5fZW50aXRpZXNUb0FkZCA9IFtdO1xyXG4gICAgICAgIHRoaXMuX2VudGl0aWVzVG9SZW1vdmUgPSBbXTtcclxuICAgICAgICB0aGlzLl9lbnRpdGllc01vZGlmaWVkID0gbmV3IEtleWVkQ29sbGVjdGlvbjxFbnRpdHk+KCk7XHJcblxyXG4gICAgICAgIHRoaXMuX3Jlc291cmNlTG9hZGVyID0gbmV3IFJlc291cmNlTG9hZGVyKCk7XHJcbiAgICAgICAgdGhpcy5faWRHZW5lcmF0b3IgPSBuZXcgSWRHZW5lcmF0b3IoKTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBUT0RPOiBlcnJvciBoYW5kbGluZ1xyXG4gICAgcHVibGljIGxvYWQoKTogUHJvbWlzZTx2b2lkPiB7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlPHZvaWQ+KChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5fZW50aXRpZXNCeUlkLnZhbHVlcygpLmZvckVhY2goZSA9PiBlLmxvYWRSZXNvdXJjZXModGhpcy5fcmVzb3VyY2VMb2FkZXIpKTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuX3Jlc291cmNlTG9hZGVyLmxvYWQoKCkgPT4gcmVzb2x2ZSgpKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgYWRkKGVudGl0eTogRW50aXR5KTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5fZW50aXRpZXNUb0FkZC5wdXNoKGVudGl0eSk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gVE9ETzogZml4LiB0aGlzIHdvbnQgd29yayBhcyBleHBlY3RlZC4gZW50aXRpZXMgdGhhdCBhcmUgcmVtb3ZlZCBsb3NlIHRoZWlyIGlkIGJlZm9yZSBldmVudHMgYXJlIHByb2Nlc3NlZC5cclxuICAgIHB1YmxpYyBwb3N0VGlja0VudGl0eUV2ZW50cygpOiBFbnRpdHlFdmVudHMge1xyXG4gICAgICAgIGZvciAobGV0IGUgb2YgdGhpcy5fZW50aXRpZXNUb1JlbW92ZSkge1xyXG4gICAgICAgICAgICB0aGlzLl9lbnRpdGllc0J5SWQucmVtb3ZlKGUuaWQpO1xyXG4gICAgICAgICAgICB0aGlzLl9pZEdlbmVyYXRvci5wdXNoSWQoZS5pZCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBmb3IgKGxldCBlIG9mIHRoaXMuX2VudGl0aWVzVG9BZGQpIHtcclxuICAgICAgICAgICAgZS5pZCA9IHRoaXMuX2lkR2VuZXJhdG9yLnBvcElkKCk7XHJcbiAgICAgICAgICAgIHRoaXMuX2VudGl0aWVzQnlJZC5hZGQoZS5pZCwgZSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQgcmVzdWx0cyA9IHtcclxuICAgICAgICAgICAgYWRkZWQ6IHRoaXMuX2VudGl0aWVzVG9BZGQubGVuZ3RoID4gMCA/IFsuLi50aGlzLl9lbnRpdGllc1RvQWRkXSA6IFtdLFxyXG4gICAgICAgICAgICByZW1vdmVkOiB0aGlzLl9lbnRpdGllc1RvUmVtb3ZlLmxlbmd0aCA+IDAgPyBbLi4udGhpcy5fZW50aXRpZXNUb1JlbW92ZV0gOiBbXSxcclxuICAgICAgICAgICAgbW9kaWZpZWQ6IHRoaXMuX2VudGl0aWVzTW9kaWZpZWQuY291bnQoKSA+IDAgPyBbLi4udGhpcy5fZW50aXRpZXNNb2RpZmllZC52YWx1ZXMoKV0gOiBbXVxyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIHRoaXMuX2VudGl0aWVzVG9BZGQgPSBbXTtcclxuICAgICAgICB0aGlzLl9lbnRpdGllc1RvUmVtb3ZlID0gW107XHJcbiAgICAgICAgdGhpcy5fZW50aXRpZXNNb2RpZmllZC5jbGVhcigpO1xyXG5cclxuICAgICAgICByZXR1cm4gcmVzdWx0cztcclxuICAgIH1cclxufSIsImltcG9ydCB7IEVuZ2luZSB9IGZyb20gXCIuL2NvcmUvZW5naW5lXCI7XHJcbmltcG9ydCB7IFNjZW5lIH0gZnJvbSBcIi4vY29yZS9zY2VuZVwiO1xyXG5pbXBvcnQgeyBFbnRpdHkgfSBmcm9tIFwiLi9jb3JlL2VudGl0eVwiO1xyXG5pbXBvcnQgeyBWZWN0b3IyIH0gZnJvbSBcIi4vbWF0aC92ZWN0b3IyXCI7XHJcbmltcG9ydCB7IFNwcml0ZSB9IGZyb20gXCIuL2NvcmUvY29tcG9uZW50cy9zcHJpdGVcIjtcclxuXHJcbndpbmRvdy5vbmxvYWQgPSAoKSA9PiB7XHJcbiAgICBsZXQgZSA9IG5ldyBFbnRpdHkoXCJzdGV2ZVwiLCBWZWN0b3IyLnplcm8sIFtuZXcgU3ByaXRlKFwiLi9hc3NldHMvcGxheWVyLnBuZ1wiKV0pXHJcblxyXG4gICAgbGV0IGVuZ2luZSA9IG5ldyBFbmdpbmUoe1xyXG4gICAgICAgIGVudHJ5OiBuZXcgU2NlbmUoXCJsZXZlbDFcIiksXHJcbiAgICAgICAgbG9naWNTeXN0ZW1zOiBbXSxcclxuICAgICAgICByZW5kZXJTeXN0ZW1zOiBbXVxyXG4gICAgfSk7XHJcblxyXG4gICAgZW5naW5lLnN0YXJ0KCk7XHJcbn0iLCJleHBvcnQgY2xhc3MgVmVjdG9yMiB7XHJcblxyXG4gICAgLy8gY29tcG9uZW50c1xyXG4gICAgcHVibGljIHg6IG51bWJlcjtcclxuICAgIHB1YmxpYyB5OiBudW1iZXI7XHJcblxyXG4gICAgY29uc3RydWN0b3IoeD86IG51bWJlciwgeT86IG51bWJlcikge1xyXG4gICAgICAgIHRoaXMueCA9IHggfHwgMDtcclxuICAgICAgICB0aGlzLnkgPSB5IHx8IDA7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IGxlbmd0aCgpOiBudW1iZXIge1xyXG4gICAgICAgIHJldHVybiBNYXRoLnNxcnQoVmVjdG9yMi5kb3QodGhpcywgdGhpcykpO1xyXG4gICAgfVxyXG5cclxuICAgIHN0YXRpYyBnZXQgemVybygpOiBWZWN0b3IyIHtcclxuICAgICAgICByZXR1cm4gbmV3IFZlY3RvcjIoMCwgMCk7XHJcbiAgICB9XHJcblxyXG4gICAgc3RhdGljIGFkZCh2MTogVmVjdG9yMiwgdjI6IFZlY3RvcjIpOiBWZWN0b3IyIHtcclxuICAgICAgICByZXR1cm4gbmV3IFZlY3RvcjIodjEueCArIHYyLngsIHYxLnkgKyB2Mi55KTtcclxuICAgIH1cclxuXHJcbiAgICBzdGF0aWMgc3VidHJhY3QodjE6IFZlY3RvcjIsIHYyOiBWZWN0b3IyKTogVmVjdG9yMiB7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBWZWN0b3IyKHYxLnggLSB2Mi54LCB2MS55IC0gdjIueSk7XHJcbiAgICB9XHJcblxyXG4gICAgc3RhdGljIG11bHRpcGx5KHY6IFZlY3RvcjIsIHNjYWxhcjogbnVtYmVyKTogVmVjdG9yMiB7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBWZWN0b3IyKHYueCAqIHNjYWxhciwgdi55ICogc2NhbGFyKTtcclxuICAgIH1cclxuXHJcbiAgICBzdGF0aWMgZGl2aWRlKHY6IFZlY3RvcjIsIHNjYWxhcjogbnVtYmVyKTogVmVjdG9yMiB7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBWZWN0b3IyKHYueCAvIHNjYWxhciwgdi55IC8gc2NhbGFyKTtcclxuICAgIH1cclxuXHJcbiAgICBzdGF0aWMgZG90KHYxOiBWZWN0b3IyLCB2MjogVmVjdG9yMik6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuICh2MS54ICogdjIueCkgKyAodjEueSAqIHYyLnkpO1xyXG4gICAgfVxyXG59XHJcbiIsImV4cG9ydCBjbGFzcyBJZEdlbmVyYXRvciB7XHJcbiAgICBcclxuICAgIHByaXZhdGUgX25leHRJZDogbnVtYmVyID0gMDtcclxuICAgIHByaXZhdGUgX2F2YWlsYWJsZUlkczogbnVtYmVyW10gPSBbXTtcclxuXHJcbiAgICBwdWJsaWMgcG9wSWQoKTogbnVtYmVyIHtcclxuICAgICAgICBpZiAodGhpcy5fYXZhaWxhYmxlSWRzLmxlbmd0aCA9PT0gMCkge1xyXG4gICAgICAgICAgICBsZXQgaWQgPSB0aGlzLl9uZXh0SWQ7XHJcbiAgICAgICAgICAgIHRoaXMuX25leHRJZCsrO1xyXG4gICAgICAgICAgICByZXR1cm4gaWQ7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCBpZCA9IDxudW1iZXI+dGhpcy5fYXZhaWxhYmxlSWRzLnBvcCgpO1xyXG4gICAgICAgIHJldHVybiBpZDtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgcHVzaElkKGlkOiBudW1iZXIpOiB2b2lkIHtcclxuICAgICAgICBpZiAoIXRoaXMuX2F2YWlsYWJsZUlkcy5zb21lKGkgPT4gaSA9PT0gaWQpKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2F2YWlsYWJsZUlkcy5wdXNoKGlkKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn0iLCJleHBvcnQgaW50ZXJmYWNlIElLZXllZENvbGxlY3Rpb248VD4ge1xyXG4gICAgYWRkKGtleTogbnVtYmVyIHwgc3RyaW5nLCB2YWx1ZTogVCk6IHZvaWQ7XHJcbiAgICBjb250YWluc0tleShrZXk6IG51bWJlciB8IHN0cmluZyk6IGJvb2xlYW47XHJcbiAgICBjb3VudCgpOiBudW1iZXI7XHJcbiAgICBpdGVtKGtleTogbnVtYmVyIHwgc3RyaW5nKTogVDtcclxuICAgIHJlbW92ZShrZXk6IG51bWJlciB8IHN0cmluZyk6IFQ7XHJcbiAgICB2YWx1ZXMoKTogVFtdO1xyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgS2V5ZWRDb2xsZWN0aW9uPFQ+IGltcGxlbWVudHMgSUtleWVkQ29sbGVjdGlvbjxUPiB7XHJcbiAgICBwcml2YXRlIF9pdGVtczogeyBbaW5kZXg6IG51bWJlcl06IFQgfSA9IHt9O1xyXG4gXHJcbiAgICBwcml2YXRlIF9jb3VudDogbnVtYmVyID0gMDtcclxuIFxyXG4gICAgcHVibGljIGNvbnRhaW5zS2V5KGtleTogbnVtYmVyKTogYm9vbGVhbiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2l0ZW1zLmhhc093blByb3BlcnR5KGtleSk7XHJcbiAgICB9XHJcbiBcclxuICAgIHB1YmxpYyBjb3VudCgpOiBudW1iZXIge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9jb3VudDtcclxuICAgIH1cclxuIFxyXG4gICAgcHVibGljIGFkZChrZXk6IG51bWJlciwgdmFsdWU6IFQpIHtcclxuICAgICAgICBpZighdGhpcy5faXRlbXMuaGFzT3duUHJvcGVydHkoa2V5KSlcclxuICAgICAgICAgICAgIHRoaXMuX2NvdW50Kys7XHJcbiBcclxuICAgICAgICB0aGlzLl9pdGVtc1trZXldID0gdmFsdWU7XHJcbiAgICB9XHJcbiBcclxuICAgIHB1YmxpYyByZW1vdmUoa2V5OiBudW1iZXIpOiBUIHtcclxuICAgICAgICB2YXIgdmFsID0gdGhpcy5faXRlbXNba2V5XTtcclxuICAgICAgICBkZWxldGUgdGhpcy5faXRlbXNba2V5XTtcclxuICAgICAgICB0aGlzLl9jb3VudC0tO1xyXG4gICAgICAgIHJldHVybiB2YWw7XHJcbiAgICB9XHJcbiBcclxuICAgIHB1YmxpYyBpdGVtKGtleTogbnVtYmVyKTogVCB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2l0ZW1zW2tleV07XHJcbiAgICB9XHJcbiBcclxuICAgIHB1YmxpYyB2YWx1ZXMoKTogVFtdIHtcclxuICAgICAgICB2YXIgdmFsdWVzOiBUW10gPSBbXTtcclxuIFxyXG4gICAgICAgIGZvciAodmFyIHByb3AgaW4gdGhpcy5faXRlbXMpIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuX2l0ZW1zLmhhc093blByb3BlcnR5KHByb3ApKSB7XHJcbiAgICAgICAgICAgICAgICB2YWx1ZXMucHVzaCh0aGlzLl9pdGVtc1twcm9wXSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiBcclxuICAgICAgICByZXR1cm4gdmFsdWVzO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBjbGVhcigpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLl9pdGVtcyA9IFtdO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgU3RyS2V5ZWRDb2xsZWN0aW9uPFQ+IGltcGxlbWVudHMgSUtleWVkQ29sbGVjdGlvbjxUPiB7XHJcbiAgICBwcml2YXRlIF9pdGVtczogeyBbaW5kZXg6IHN0cmluZ106IFQgfSA9IHt9O1xyXG4gXHJcbiAgICBwcml2YXRlIF9jb3VudDogbnVtYmVyID0gMDtcclxuIFxyXG4gICAgcHVibGljIGNvbnRhaW5zS2V5KGtleTogc3RyaW5nKTogYm9vbGVhbiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2l0ZW1zLmhhc093blByb3BlcnR5KGtleSk7XHJcbiAgICB9XHJcbiBcclxuICAgIHB1YmxpYyBjb3VudCgpOiBudW1iZXIge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9jb3VudDtcclxuICAgIH1cclxuIFxyXG4gICAgcHVibGljIGFkZChrZXk6IHN0cmluZywgdmFsdWU6IFQpIHtcclxuICAgICAgICBpZighdGhpcy5faXRlbXMuaGFzT3duUHJvcGVydHkoa2V5KSlcclxuICAgICAgICAgICAgIHRoaXMuX2NvdW50Kys7XHJcbiBcclxuICAgICAgICB0aGlzLl9pdGVtc1trZXldID0gdmFsdWU7XHJcbiAgICB9XHJcbiBcclxuICAgIHB1YmxpYyByZW1vdmUoa2V5OiBzdHJpbmcpOiBUIHtcclxuICAgICAgICB2YXIgdmFsID0gdGhpcy5faXRlbXNba2V5XTtcclxuICAgICAgICBkZWxldGUgdGhpcy5faXRlbXNba2V5XTtcclxuICAgICAgICB0aGlzLl9jb3VudC0tO1xyXG4gICAgICAgIHJldHVybiB2YWw7XHJcbiAgICB9XHJcbiBcclxuICAgIHB1YmxpYyBpdGVtKGtleTogc3RyaW5nKTogVCB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2l0ZW1zW2tleV07XHJcbiAgICB9XHJcbiBcclxuICAgIHB1YmxpYyBrZXlzKCk6IHN0cmluZ1tdIHtcclxuICAgICAgICB2YXIga2V5U2V0OiBzdHJpbmdbXSA9IFtdO1xyXG4gXHJcbiAgICAgICAgZm9yICh2YXIgcHJvcCBpbiB0aGlzLl9pdGVtcykge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5faXRlbXMuaGFzT3duUHJvcGVydHkocHJvcCkpIHtcclxuICAgICAgICAgICAgICAgIGtleVNldC5wdXNoKHByb3ApO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gXHJcbiAgICAgICAgcmV0dXJuIGtleVNldDtcclxuICAgIH1cclxuIFxyXG4gICAgcHVibGljIHZhbHVlcygpOiBUW10ge1xyXG4gICAgICAgIHZhciB2YWx1ZXM6IFRbXSA9IFtdO1xyXG4gXHJcbiAgICAgICAgZm9yICh2YXIgcHJvcCBpbiB0aGlzLl9pdGVtcykge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5faXRlbXMuaGFzT3duUHJvcGVydHkocHJvcCkpIHtcclxuICAgICAgICAgICAgICAgIHZhbHVlcy5wdXNoKHRoaXMuX2l0ZW1zW3Byb3BdKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuIFxyXG4gICAgICAgIHJldHVybiB2YWx1ZXM7XHJcbiAgICB9XHJcbn1cclxuIiwiaW1wb3J0IHsgU3RyS2V5ZWRDb2xsZWN0aW9uIH0gZnJvbSBcIi4va2V5ZWQtY29sbGVjdGlvblwiO1xyXG5pbXBvcnQgKiBhcyBwYXRoIGZyb20gJ3BhdGgnO1xyXG5cclxuY29uc3QgSU1BR0VfRVhUID0gWycuanBnJywgJy5wbmcnXTtcclxuXHJcbmV4cG9ydCBjbGFzcyBSZXNvdXJjZUxvYWRlciB7XHJcblxyXG4gICAgcHJpdmF0ZSBfY2FjaGU6IFN0cktleWVkQ29sbGVjdGlvbjxhbnk+O1xyXG4gICAgcHJpdmF0ZSBfcXVldWU6IFN0cktleWVkQ29sbGVjdGlvbjxGdW5jdGlvbltdPjtcclxuICAgIHByaXZhdGUgX2xvYWRDb3VudDogbnVtYmVyID0gMDtcclxuICAgIHByaXZhdGUgX2xvYWRlZENvdW50OiBudW1iZXIgPSAwO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIHRoaXMuX2NhY2hlID0gbmV3IFN0cktleWVkQ29sbGVjdGlvbjxhbnk+KCk7XHJcbiAgICAgICAgdGhpcy5fcXVldWUgPSBuZXcgU3RyS2V5ZWRDb2xsZWN0aW9uPEZ1bmN0aW9uW10+KCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldFJlc291cmNlPFQgZXh0ZW5kcyBIVE1MSW1hZ2VFbGVtZW50IHwgSFRNTEF1ZGlvRWxlbWVudD4ocGF0aDogc3RyaW5nKTogVCB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2NhY2hlLml0ZW0ocGF0aCkgYXMgVDtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgcXVldWUocmVzOiBzdHJpbmcsIGNhbGxiYWNrOiAoaW1nOiBIVE1MSW1hZ2VFbGVtZW50KSA9PiB2b2lkKTogdm9pZCB7XHJcbiAgICAgICAgaWYgKHRoaXMuX3F1ZXVlLmNvbnRhaW5zS2V5KHJlcykpIHtcclxuICAgICAgICAgICAgbGV0IHJlc291cmNlID0gdGhpcy5fcXVldWUuaXRlbShyZXMpO1xyXG4gICAgICAgICAgICByZXNvdXJjZS5wdXNoKGNhbGxiYWNrKTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLl9xdWV1ZS5hZGQocmVzLCBbY2FsbGJhY2tdKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgbG9hZChvbkNvbXBsZXRlOiBGdW5jdGlvbikge1xyXG4gICAgICAgIGxldCBrZXlzID0gdGhpcy5fcXVldWUua2V5cygpO1xyXG5cclxuICAgICAgICB0aGlzLl9sb2FkQ291bnQgPSBrZXlzLmxlbmd0aDtcclxuXHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBrZXlzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGxldCBrZXkgPSBrZXlzW2ldO1xyXG5cclxuICAgICAgICAgICAgaWYgKElNQUdFX0VYVC5zb21lKHAgPT4gcCA9PT0gcGF0aC5leHRuYW1lKGtleSkpKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgaW1hZ2UgPSBuZXcgSW1hZ2UoKTtcclxuXHJcbiAgICAgICAgICAgICAgICBsZXQgdGhhdCA9IHRoaXM7XHJcbiAgICAgICAgICAgICAgICBpbWFnZS5vbmxvYWQgPSAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhhdC5fbG9hZGVkQ291bnQgKz0gMTtcclxuICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICBsZXQgY2FsbGJhY2tzID0gdGhpcy5fcXVldWUuaXRlbShrZXkpO1xyXG4gICAgICAgICAgICAgICAgICAgIGZvciAobGV0IGMgb2YgY2FsbGJhY2tzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGMoaW1hZ2UpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoYXQuX2xvYWRlZENvdW50ID09PSB0aGF0Ll9sb2FkQ291bnQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgb25Db21wbGV0ZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGltYWdlLnNyYyA9IGtleTtcclxuICAgICAgICAgICAgICAgIHRoYXQuX2NhY2hlLmFkZChrZXksIGltYWdlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxufSJdLCJzb3VyY2VSb290IjoiIn0=