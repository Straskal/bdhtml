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

/***/ "./node_modules/events/events.js":
/*!***************************************!*\
  !*** ./node_modules/events/events.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports) {

// Copyright Joyent, Inc. and other Node contributors.
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

function EventEmitter() {
  this._events = this._events || {};
  this._maxListeners = this._maxListeners || undefined;
}
module.exports = EventEmitter;

// Backwards-compat with node 0.10.x
EventEmitter.EventEmitter = EventEmitter;

EventEmitter.prototype._events = undefined;
EventEmitter.prototype._maxListeners = undefined;

// By default EventEmitters will print a warning if more than 10 listeners are
// added to it. This is a useful default which helps finding memory leaks.
EventEmitter.defaultMaxListeners = 10;

// Obviously not all Emitters should be limited to 10. This function allows
// that to be increased. Set to zero for unlimited.
EventEmitter.prototype.setMaxListeners = function(n) {
  if (!isNumber(n) || n < 0 || isNaN(n))
    throw TypeError('n must be a positive number');
  this._maxListeners = n;
  return this;
};

EventEmitter.prototype.emit = function(type) {
  var er, handler, len, args, i, listeners;

  if (!this._events)
    this._events = {};

  // If there is no 'error' event listener then throw.
  if (type === 'error') {
    if (!this._events.error ||
        (isObject(this._events.error) && !this._events.error.length)) {
      er = arguments[1];
      if (er instanceof Error) {
        throw er; // Unhandled 'error' event
      } else {
        // At least give some kind of context to the user
        var err = new Error('Uncaught, unspecified "error" event. (' + er + ')');
        err.context = er;
        throw err;
      }
    }
  }

  handler = this._events[type];

  if (isUndefined(handler))
    return false;

  if (isFunction(handler)) {
    switch (arguments.length) {
      // fast cases
      case 1:
        handler.call(this);
        break;
      case 2:
        handler.call(this, arguments[1]);
        break;
      case 3:
        handler.call(this, arguments[1], arguments[2]);
        break;
      // slower
      default:
        args = Array.prototype.slice.call(arguments, 1);
        handler.apply(this, args);
    }
  } else if (isObject(handler)) {
    args = Array.prototype.slice.call(arguments, 1);
    listeners = handler.slice();
    len = listeners.length;
    for (i = 0; i < len; i++)
      listeners[i].apply(this, args);
  }

  return true;
};

EventEmitter.prototype.addListener = function(type, listener) {
  var m;

  if (!isFunction(listener))
    throw TypeError('listener must be a function');

  if (!this._events)
    this._events = {};

  // To avoid recursion in the case that type === "newListener"! Before
  // adding it to the listeners, first emit "newListener".
  if (this._events.newListener)
    this.emit('newListener', type,
              isFunction(listener.listener) ?
              listener.listener : listener);

  if (!this._events[type])
    // Optimize the case of one listener. Don't need the extra array object.
    this._events[type] = listener;
  else if (isObject(this._events[type]))
    // If we've already got an array, just append.
    this._events[type].push(listener);
  else
    // Adding the second element, need to change to array.
    this._events[type] = [this._events[type], listener];

  // Check for listener leak
  if (isObject(this._events[type]) && !this._events[type].warned) {
    if (!isUndefined(this._maxListeners)) {
      m = this._maxListeners;
    } else {
      m = EventEmitter.defaultMaxListeners;
    }

    if (m && m > 0 && this._events[type].length > m) {
      this._events[type].warned = true;
      console.error('(node) warning: possible EventEmitter memory ' +
                    'leak detected. %d listeners added. ' +
                    'Use emitter.setMaxListeners() to increase limit.',
                    this._events[type].length);
      if (typeof console.trace === 'function') {
        // not supported in IE 10
        console.trace();
      }
    }
  }

  return this;
};

EventEmitter.prototype.on = EventEmitter.prototype.addListener;

EventEmitter.prototype.once = function(type, listener) {
  if (!isFunction(listener))
    throw TypeError('listener must be a function');

  var fired = false;

  function g() {
    this.removeListener(type, g);

    if (!fired) {
      fired = true;
      listener.apply(this, arguments);
    }
  }

  g.listener = listener;
  this.on(type, g);

  return this;
};

// emits a 'removeListener' event iff the listener was removed
EventEmitter.prototype.removeListener = function(type, listener) {
  var list, position, length, i;

  if (!isFunction(listener))
    throw TypeError('listener must be a function');

  if (!this._events || !this._events[type])
    return this;

  list = this._events[type];
  length = list.length;
  position = -1;

  if (list === listener ||
      (isFunction(list.listener) && list.listener === listener)) {
    delete this._events[type];
    if (this._events.removeListener)
      this.emit('removeListener', type, listener);

  } else if (isObject(list)) {
    for (i = length; i-- > 0;) {
      if (list[i] === listener ||
          (list[i].listener && list[i].listener === listener)) {
        position = i;
        break;
      }
    }

    if (position < 0)
      return this;

    if (list.length === 1) {
      list.length = 0;
      delete this._events[type];
    } else {
      list.splice(position, 1);
    }

    if (this._events.removeListener)
      this.emit('removeListener', type, listener);
  }

  return this;
};

EventEmitter.prototype.removeAllListeners = function(type) {
  var key, listeners;

  if (!this._events)
    return this;

  // not listening for removeListener, no need to emit
  if (!this._events.removeListener) {
    if (arguments.length === 0)
      this._events = {};
    else if (this._events[type])
      delete this._events[type];
    return this;
  }

  // emit removeListener for all listeners on all events
  if (arguments.length === 0) {
    for (key in this._events) {
      if (key === 'removeListener') continue;
      this.removeAllListeners(key);
    }
    this.removeAllListeners('removeListener');
    this._events = {};
    return this;
  }

  listeners = this._events[type];

  if (isFunction(listeners)) {
    this.removeListener(type, listeners);
  } else if (listeners) {
    // LIFO order
    while (listeners.length)
      this.removeListener(type, listeners[listeners.length - 1]);
  }
  delete this._events[type];

  return this;
};

EventEmitter.prototype.listeners = function(type) {
  var ret;
  if (!this._events || !this._events[type])
    ret = [];
  else if (isFunction(this._events[type]))
    ret = [this._events[type]];
  else
    ret = this._events[type].slice();
  return ret;
};

EventEmitter.prototype.listenerCount = function(type) {
  if (this._events) {
    var evlistener = this._events[type];

    if (isFunction(evlistener))
      return 1;
    else if (evlistener)
      return evlistener.length;
  }
  return 0;
};

EventEmitter.listenerCount = function(emitter, type) {
  return emitter.listenerCount(type);
};

function isFunction(arg) {
  return typeof arg === 'function';
}

function isNumber(arg) {
  return typeof arg === 'number';
}

function isObject(arg) {
  return typeof arg === 'object' && arg !== null;
}

function isUndefined(arg) {
  return arg === void 0;
}


/***/ }),

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
const events_1 = __webpack_require__(/*! events */ "./node_modules/events/events.js");
class Component extends events_1.EventEmitter {
    get owner() {
        return this._owner;
    }
    loadResources(loader) { }
}
exports.Component = Component;


/***/ }),

/***/ "./src/core/components/boxCollider.ts":
/*!********************************************!*\
  !*** ./src/core/components/boxCollider.ts ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const component_1 = __webpack_require__(/*! ../component */ "./src/core/component.ts");
const rect_1 = __webpack_require__(/*! ../../math/rect */ "./src/math/rect.ts");
class BoxCollider extends component_1.Component {
    constructor(x, y, w, h) {
        super();
        this.rect = new rect_1.Rect(x || 0, y || 0, w || 0, h || 0);
    }
}
exports.BoxCollider = BoxCollider;


/***/ }),

/***/ "./src/core/components/movement.ts":
/*!*****************************************!*\
  !*** ./src/core/components/movement.ts ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const component_1 = __webpack_require__(/*! ../component */ "./src/core/component.ts");
const vector2_1 = __webpack_require__(/*! ../../math/vector2 */ "./src/math/vector2.ts");
class Movement extends component_1.Component {
    constructor(x, y) {
        super();
        this.velocity = new vector2_1.Vector2(x || 0, y || 0);
    }
    loadResources(loader) { }
}
exports.Movement = Movement;


/***/ }),

/***/ "./src/core/components/player.ts":
/*!***************************************!*\
  !*** ./src/core/components/player.ts ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const component_1 = __webpack_require__(/*! ../component */ "./src/core/component.ts");
class Player extends component_1.Component {
    constructor(speed, maxSpeed) {
        super();
        this.speed = speed;
        this.maxSpeed = maxSpeed;
    }
}
exports.Player = Player;


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
const keyboard_1 = __webpack_require__(/*! ../input/keyboard */ "./src/input/keyboard.ts");
class EngineConfiguration {
}
exports.EngineConfiguration = EngineConfiguration;
class Engine {
    constructor(params) {
        const { entry, logicSystems, renderSystems } = params;
        this._currentScene = entry;
        this._logicSystems = logicSystems;
        this._renderSystems = renderSystems;
        this._now = 0;
        this._dt = 0;
        this._last = this.timestamp();
    }
    start() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.validateConfiguration()) {
                this._canvas = document.createElement('canvas');
                this._canvas.width = 800;
                this._canvas.height = 600;
                this._canvas.id = 'game';
                let c = this._canvas.getContext('2d');
                if (c != null) {
                    this._ctx = c;
                }
                document.body.insertBefore(this._canvas, document.body.childNodes[0]);
                keyboard_1.Keyboard.initialize();
                this.processEntityEvents();
                yield this._currentScene.load();
                this.mainLoop();
            }
        });
    }
    mainLoop() {
        this._now = this.timestamp();
        this._dt = this._dt + Math.min(1, (this._now - this._last) / 1000);
        this._last = this._now;
        keyboard_1.Keyboard.tick();
        while (this._dt >= Engine.TIME_STEP) {
            this._dt = this._dt - Engine.TIME_STEP;
            this.fixedTick();
        }
        this.tick(this._dt);
        this.processEntityEvents();
        this.render();
        requestAnimationFrame(() => this.mainLoop());
    }
    timestamp() {
        return window.performance && window.performance.now ? window.performance.now() : new Date().getTime();
    }
    tick(dt) {
        for (let s of this._logicSystems) {
            s.tick(dt);
        }
    }
    fixedTick() {
        for (let s of this._logicSystems) {
            s.fixedTick();
        }
    }
    render() {
        for (let s of this._renderSystems) {
            s.draw(this._ctx);
        }
    }
    processEntityEvents() {
        let ev = this._currentScene.postTickEntityEvents();
        for (let e of ev.added) {
            this._logicSystems.forEach(s => s.onEntityAdded(e));
            this._renderSystems.forEach(s => s.onEntityAdded(e));
        }
        for (let e of ev.removed) {
            this._logicSystems.forEach(s => s.onEntityRemoved(e));
            this._renderSystems.forEach(s => s.onEntityRemoved(e));
        }
        for (let e of ev.modified) {
            this._logicSystems.forEach(s => s.onEntityModified(e));
            this._renderSystems.forEach(s => s.onEntityModified(e));
        }
    }
    validateConfiguration() {
        for (let i = 0; i < this._logicSystems.length - 1; i++) {
            let system = this._logicSystems[i];
            for (let j = i + 1; j < this._logicSystems.length - 1; j++) {
                let otherSystem = this._logicSystems[j];
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
const transform_1 = __webpack_require__(/*! ../math/transform */ "./src/math/transform.ts");
class Entity {
    get uid() {
        return this._id;
    }
    get name() {
        return this._name;
    }
    get transform() {
        return this._transform;
    }
    get scene() {
        return this._scene;
    }
    constructor(name, position, components) {
        this._name = name;
        this._transform = new transform_1.Transform();
        this._transform.localPosition = position;
        this._components = components;
        this._id = -1;
        this._scene = null;
        this._components.forEach(c => c._owner = this);
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
        this._entitiesByTag = new keyed_collection_1.StrKeyedCollection();
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
        entity._scene = this;
        entity._uid = this._idGenerator.popId();
        entity.loadResources(this._resourceLoader);
        this._entitiesToAdd.push(entity);
    }
    tagEntity(e, tag) {
        if (this._entitiesByTag.containsKey(tag)) {
            let taggedIds = this._entitiesByTag.item(tag);
            taggedIds.push(e.uid);
        }
        else {
            this._entitiesByTag.add(tag, [e.uid]);
        }
    }
    postTickEntityEvents() {
        for (let e of this._entitiesToRemove) {
            this._entitiesById.remove(e.uid);
            this._idGenerator.pushId(e.uid);
        }
        for (let e of this._entitiesToAdd) {
            this._entitiesById.add(e.uid, e);
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

/***/ "./src/core/systems/bruteForceCollisionSystem.ts":
/*!*******************************************************!*\
  !*** ./src/core/systems/bruteForceCollisionSystem.ts ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const keyed_collection_1 = __webpack_require__(/*! ../../utils/keyed-collection */ "./src/utils/keyed-collection.ts");
const boxCollider_1 = __webpack_require__(/*! ../components/boxCollider */ "./src/core/components/boxCollider.ts");
const movement_1 = __webpack_require__(/*! ../components/movement */ "./src/core/components/movement.ts");
class CollisionPair {
    constructor(coll1, coll2) {
        this.coll1 = coll1;
        this.coll2 = coll2;
    }
}
class BruteForceCollisionSystem {
    constructor() {
        this._colliders = [];
        this._pairs = new keyed_collection_1.StrKeyedCollection();
    }
    tick(dt) {
    }
    fixedTick() {
        this.detect();
    }
    detect() {
        let cs = this._colliders;
        for (let i = 0; i <= cs.length - 1; i++) {
            let coll = cs[i];
            let pos = coll.owner.transform.localPosition;
            coll.rect.x = pos.x;
            coll.rect.y = pos.y;
            for (let j = i + 1; j <= cs.length - 1; j++) {
                let oColl = cs[j];
                let oPos = oColl.owner.transform.localPosition;
                oColl.rect.x = oPos.x;
                oColl.rect.y = oPos.y;
                let rect1 = coll.rect;
                let rect2 = oColl.rect;
                let pair = `${coll.owner.uid}:${oColl.owner.uid}`;
                if (rect1.overlaps(rect2)) {
                    if (this._pairs.containsKey(pair)) {
                    }
                    else {
                        coll.emit("collision", oColl);
                        oColl.emit("collision", coll);
                        let p = new CollisionPair(coll, oColl);
                        this._pairs.add(pair, p);
                    }
                }
                else if (this._pairs.containsKey(pair)) {
                    this._pairs.remove(pair);
                }
            }
        }
    }
    resolve() {
        for (let p of this._pairs.values()) {
            let m = p.coll1.owner.getBehaviorOfType(movement_1.Movement);
            let m2 = p.coll2.owner.getBehaviorOfType(movement_1.Movement);
            if (m) {
                let rect1 = p.coll1.rect;
                let rect2 = p.coll2.rect;
                p.coll1.owner.transform.localPosition.x -= m.velocity.x;
                p.coll1.rect.x -= m.velocity.x;
                if (rect1.overlaps(rect2)) {
                    p.coll1.owner.transform.localPosition.y -= m.velocity.y;
                    p.coll1.rect.y -= m.velocity.y;
                    p.coll1.owner.transform.localPosition.x += m.velocity.x;
                    p.coll1.rect.x += m.velocity.x;
                }
            }
            else if (m2) {
                let rect1 = p.coll1.rect;
                let rect2 = p.coll2.rect;
                if (rect1.overlaps(rect2)) {
                    p.coll2.owner.transform.localPosition.x -= m2.velocity.x;
                    p.coll2.rect.x -= m2.velocity.x;
                    if (rect1.overlaps(rect2)) {
                        p.coll2.owner.transform.localPosition.y -= m2.velocity.y;
                        p.coll2.rect.y -= m2.velocity.y;
                        p.coll2.owner.transform.localPosition.x += m2.velocity.x;
                        p.coll2.rect.x += m2.velocity.x;
                    }
                }
            }
        }
    }
    onEntityAdded(entity) {
        let c = entity.getBehaviorOfType(boxCollider_1.BoxCollider);
        if (c != null) {
            this._colliders[entity.uid] = c;
        }
    }
    onEntityRemoved(entity) {
        if (this._colliders[entity.uid]) {
            this._colliders.splice(entity.uid, 1);
        }
    }
    onEntityModified(entity) {
    }
}
exports.BruteForceCollisionSystem = BruteForceCollisionSystem;


/***/ }),

/***/ "./src/core/systems/movementSystem.ts":
/*!********************************************!*\
  !*** ./src/core/systems/movementSystem.ts ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const movement_1 = __webpack_require__(/*! ../components/movement */ "./src/core/components/movement.ts");
const keyed_collection_1 = __webpack_require__(/*! ../../utils/keyed-collection */ "./src/utils/keyed-collection.ts");
const vector2_1 = __webpack_require__(/*! ../../math/vector2 */ "./src/math/vector2.ts");
class MovementSystem {
    constructor() {
        this._movementsById = new keyed_collection_1.KeyedCollection();
    }
    tick(dt) { }
    fixedTick() {
        for (let m of this._movementsById.values()) {
            let transform = m.owner.transform;
            transform.localPosition = vector2_1.Vector2.add(transform.localPosition, m.velocity);
        }
    }
    onEntityAdded(entity) {
        let s = entity.getBehaviorOfType(movement_1.Movement);
        if (s != null) {
            this._movementsById.add(s.owner.uid, s);
        }
    }
    onEntityRemoved(entity) {
    }
    onEntityModified(entity) {
    }
}
exports.MovementSystem = MovementSystem;


/***/ }),

/***/ "./src/core/systems/playerControllerSystem.ts":
/*!****************************************************!*\
  !*** ./src/core/systems/playerControllerSystem.ts ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const entity_1 = __webpack_require__(/*! ../entity */ "./src/core/entity.ts");
const player_1 = __webpack_require__(/*! ../components/player */ "./src/core/components/player.ts");
const keyboard_1 = __webpack_require__(/*! ../../input/keyboard */ "./src/input/keyboard.ts");
const movement_1 = __webpack_require__(/*! ../components/movement */ "./src/core/components/movement.ts");
const vector2_1 = __webpack_require__(/*! ../../math/vector2 */ "./src/math/vector2.ts");
const boxCollider_1 = __webpack_require__(/*! ../components/boxCollider */ "./src/core/components/boxCollider.ts");
const sprite_1 = __webpack_require__(/*! ../components/sprite */ "./src/core/components/sprite.ts");
class PlayerControllerSystem {
    constructor() {
        this._lastFrameShooting = false;
    }
    tick(dt) {
        if (!this._player)
            return;
        let s = this._player.speed;
        let v = this._playerMovement.velocity;
        v.x = 0;
        v.y = 0;
        if (keyboard_1.Keyboard.isKeyDown(keyboard_1.KeyCode.KEY_W)) {
            v.y -= s;
        }
        if (keyboard_1.Keyboard.isKeyDown(keyboard_1.KeyCode.KEY_A)) {
            v.x -= s;
        }
        if (keyboard_1.Keyboard.isKeyDown(keyboard_1.KeyCode.KEY_S)) {
            v.y += s;
        }
        if (keyboard_1.Keyboard.isKeyDown(keyboard_1.KeyCode.KEY_D)) {
            v.x += s;
        }
        if (!this._lastFrameShooting && keyboard_1.Keyboard.isKeyDown(keyboard_1.KeyCode.SPACE)) {
            let scene = this._player.owner.scene;
            let e = new entity_1.Entity("bullet", vector2_1.Vector2.add(this._player.owner.transform.localPosition, new vector2_1.Vector2(0, -64)), [
                new sprite_1.Sprite("./assets/player.png"),
                new movement_1.Movement(0, -10),
                new boxCollider_1.BoxCollider(0, 0, 40, 50)
            ]);
            scene.add(e);
            scene.tagEntity(e, "bullet");
            this._lastFrameShooting = true;
        }
        else if (keyboard_1.Keyboard.isKeyUp(keyboard_1.KeyCode.SPACE)) {
            this._lastFrameShooting = false;
        }
    }
    fixedTick() { }
    onEntityAdded(entity) {
        if (this._player == null) {
            let p = entity.getBehaviorOfType(player_1.Player);
            if (p !== null) {
                this._player = p;
                this._playerMovement = entity.getBehaviorOfType(movement_1.Movement);
                this._playerCollider = entity.getBehaviorOfType(boxCollider_1.BoxCollider);
                this._playerCollider.on("collision", o => {
                    console.log("collision with " + o);
                });
            }
        }
    }
    onEntityRemoved(entity) {
    }
    onEntityModified(entity) {
    }
}
exports.PlayerControllerSystem = PlayerControllerSystem;


/***/ }),

/***/ "./src/core/systems/renderSystem.ts":
/*!******************************************!*\
  !*** ./src/core/systems/renderSystem.ts ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const keyed_collection_1 = __webpack_require__(/*! ../../utils/keyed-collection */ "./src/utils/keyed-collection.ts");
const sprite_1 = __webpack_require__(/*! ../components/sprite */ "./src/core/components/sprite.ts");
class RenderSystem {
    constructor() {
        this._spritesById = new keyed_collection_1.KeyedCollection();
    }
    draw(ctx) {
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        ctx.fillStyle = 'black';
        ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        for (let s of this._spritesById.values()) {
            let pos = s.owner.transform.localPosition;
            ctx.drawImage(s.img, Math.floor(pos.x), Math.floor(pos.y));
        }
    }
    onEntityAdded(entity) {
        let s = entity.getBehaviorOfType(sprite_1.Sprite);
        if (s != null) {
            this._spritesById.add(s.owner.uid, s);
        }
    }
    onEntityRemoved(entity) {
    }
    onEntityModified(entity) {
    }
}
exports.RenderSystem = RenderSystem;


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
class Keyboard {
    static initialize() {
        window.addEventListener("keydown", e => {
            this.keys[e.keyCode] = true;
        });
        window.addEventListener("keyup", e => {
            this.keys[e.keyCode] = false;
        });
        window.addEventListener("keypress", e => {
            this.pressed[e.keyCode] = true;
        });
    }
    static tick() {
        this.pressed.length = 0;
    }
    static isKeyDown(code) {
        return this.keys[code];
    }
    static isKeyUp(code) {
        return !this.keys[code];
    }
    static isKeyPressed(code) {
        return this.pressed[code];
    }
}
Keyboard.keys = [];
Keyboard.pressed = [];
exports.Keyboard = Keyboard;


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
const renderSystem_1 = __webpack_require__(/*! ./core/systems/renderSystem */ "./src/core/systems/renderSystem.ts");
const movement_1 = __webpack_require__(/*! ./core/components/movement */ "./src/core/components/movement.ts");
const movementSystem_1 = __webpack_require__(/*! ./core/systems/movementSystem */ "./src/core/systems/movementSystem.ts");
const player_1 = __webpack_require__(/*! ./core/components/player */ "./src/core/components/player.ts");
const playerControllerSystem_1 = __webpack_require__(/*! ./core/systems/playerControllerSystem */ "./src/core/systems/playerControllerSystem.ts");
const bruteForceCollisionSystem_1 = __webpack_require__(/*! ./core/systems/bruteForceCollisionSystem */ "./src/core/systems/bruteForceCollisionSystem.ts");
const boxCollider_1 = __webpack_require__(/*! ./core/components/boxCollider */ "./src/core/components/boxCollider.ts");
window.onload = () => {
    let e = new entity_1.Entity("steve", vector2_1.Vector2.zero, [
        new sprite_1.Sprite("./assets/player.png"),
        new movement_1.Movement(),
        new player_1.Player(3, 30),
        new boxCollider_1.BoxCollider(0, 0, 40, 50)
    ]);
    let e2 = new entity_1.Entity("poo", new vector2_1.Vector2(100, 100), [
        new sprite_1.Sprite("./assets/player.png"),
        new boxCollider_1.BoxCollider(0, 0, 40, 50)
    ]);
    let s = new scene_1.Scene("level1");
    s.add(e);
    s.add(e2);
    let engine = new engine_1.Engine({
        entry: s,
        logicSystems: [
            new playerControllerSystem_1.PlayerControllerSystem(),
            new movementSystem_1.MovementSystem(),
            new bruteForceCollisionSystem_1.BruteForceCollisionSystem()
        ],
        renderSystems: [
            new renderSystem_1.RenderSystem()
        ]
    });
    engine.start();
};


/***/ }),

/***/ "./src/math/rect.ts":
/*!**************************!*\
  !*** ./src/math/rect.ts ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
class Rect {
    constructor(x, y, w, h) {
        this.x = x || 0;
        this.y = y || 0;
        this.width = w || 0;
        this.height = h || 0;
    }
    overlaps(rect) {
        return this.x < rect.x + rect.width
            && this.x + this.width > rect.x
            && this.y < rect.y + rect.height
            && this.y + this.height > rect.y;
    }
}
exports.Rect = Rect;


/***/ }),

/***/ "./src/math/transform.ts":
/*!*******************************!*\
  !*** ./src/math/transform.ts ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const vector2_1 = __webpack_require__(/*! ./vector2 */ "./src/math/vector2.ts");
class Transform {
    constructor() {
        this._localPosition = vector2_1.Vector2.zero;
        this._localRotation = 0;
        this._localScale = 1;
    }
    get localPosition() {
        return this._localPosition;
    }
    set localPosition(value) {
        this._localPosition = value;
    }
}
exports.Transform = Transform;


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
        this._loaded = false;
        this._cache = new keyed_collection_1.StrKeyedCollection();
        this._queue = new keyed_collection_1.StrKeyedCollection();
    }
    getResource(path) {
        return this._cache.item(path);
    }
    queue(res, callback) {
        if (this._loaded) {
            callback(this._cache.item(res));
            return;
        }
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
                        that._loaded = true;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2V2ZW50cy9ldmVudHMuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3BhdGgtYnJvd3NlcmlmeS9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvcHJvY2Vzcy9icm93c2VyLmpzIiwid2VicGFjazovLy8uL3NyYy9jb3JlL2NvbXBvbmVudC50cyIsIndlYnBhY2s6Ly8vLi9zcmMvY29yZS9jb21wb25lbnRzL2JveENvbGxpZGVyLnRzIiwid2VicGFjazovLy8uL3NyYy9jb3JlL2NvbXBvbmVudHMvbW92ZW1lbnQudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvcmUvY29tcG9uZW50cy9wbGF5ZXIudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvcmUvY29tcG9uZW50cy9zcHJpdGUudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvcmUvZW5naW5lLnRzIiwid2VicGFjazovLy8uL3NyYy9jb3JlL2VudGl0eS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvY29yZS9zY2VuZS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvY29yZS9zeXN0ZW1zL2JydXRlRm9yY2VDb2xsaXNpb25TeXN0ZW0udHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvcmUvc3lzdGVtcy9tb3ZlbWVudFN5c3RlbS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvY29yZS9zeXN0ZW1zL3BsYXllckNvbnRyb2xsZXJTeXN0ZW0udHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvcmUvc3lzdGVtcy9yZW5kZXJTeXN0ZW0udHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2lucHV0L2tleWJvYXJkLnRzIiwid2VicGFjazovLy8uL3NyYy9tYWluLnRzIiwid2VicGFjazovLy8uL3NyYy9tYXRoL3JlY3QudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL21hdGgvdHJhbnNmb3JtLnRzIiwid2VicGFjazovLy8uL3NyYy9tYXRoL3ZlY3RvcjIudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3V0aWxzL2lkLWdlbmVyYXRvci50cyIsIndlYnBhY2s6Ly8vLi9zcmMvdXRpbHMva2V5ZWQtY29sbGVjdGlvbi50cyIsIndlYnBhY2s6Ly8vLi9zcmMvdXRpbHMvcmVzb3VyY2UtbG9hZGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGtEQUEwQyxnQ0FBZ0M7QUFDMUU7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxnRUFBd0Qsa0JBQWtCO0FBQzFFO0FBQ0EseURBQWlELGNBQWM7QUFDL0Q7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlEQUF5QyxpQ0FBaUM7QUFDMUUsd0hBQWdILG1CQUFtQixFQUFFO0FBQ3JJO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsbUNBQTJCLDBCQUEwQixFQUFFO0FBQ3ZELHlDQUFpQyxlQUFlO0FBQ2hEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDhEQUFzRCwrREFBK0Q7O0FBRXJIO0FBQ0E7OztBQUdBO0FBQ0E7Ozs7Ozs7Ozs7OztBQ2xGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakIsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQSxlQUFlLFNBQVM7QUFDeEI7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLEdBQUc7QUFDSCxvQkFBb0IsU0FBUztBQUM3QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7O0FDN1NBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnQ0FBZ0MsUUFBUTtBQUN4QztBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsVUFBVSxNQUFNO0FBQ2hCO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLDZCQUE2QixJQUFJO0FBQ2pDO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLG9DQUFvQyw4QkFBOEI7QUFDbEU7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNB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SSxDQUFDLENBQUM7b0JBRXZCLElBQUksU0FBUyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO29CQUN0QyxLQUFLLElBQUksQ0FBQyxJQUFJLFNBQVMsRUFBRTt3QkFDckIsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDO3FCQUNaO29CQUVELElBQUksSUFBSSxDQUFDLFlBQVksS0FBSyxJQUFJLENBQUMsVUFBVSxFQUFFO3dCQUN2QyxVQUFVLEVBQUUsQ0FBQzt3QkFDYixJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQztxQkFDdkI7Z0JBQ0wsQ0FBQztnQkFDRCxLQUFLLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQztnQkFDaEIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFLEtBQUssQ0FBQyxDQUFDO2FBQy9CO1NBQ0o7SUFDTCxDQUFDO0NBQ0o7QUE3REQsd0NBNkRDIiwiZmlsZSI6ImJ1bmRsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vc3JjL21haW4udHNcIik7XG4iLCIvLyBDb3B5cmlnaHQgSm95ZW50LCBJbmMuIGFuZCBvdGhlciBOb2RlIGNvbnRyaWJ1dG9ycy5cclxuLy9cclxuLy8gUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGFcclxuLy8gY29weSBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZVxyXG4vLyBcIlNvZnR3YXJlXCIpLCB0byBkZWFsIGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmdcclxuLy8gd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHMgdG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLFxyXG4vLyBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbCBjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0XHJcbi8vIHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXMgZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvIHRoZVxyXG4vLyBmb2xsb3dpbmcgY29uZGl0aW9uczpcclxuLy9cclxuLy8gVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWRcclxuLy8gaW4gYWxsIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXHJcbi8vXHJcbi8vIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1NcclxuLy8gT1IgSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRlxyXG4vLyBNRVJDSEFOVEFCSUxJVFksIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOXHJcbi8vIE5PIEVWRU5UIFNIQUxMIFRIRSBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLFxyXG4vLyBEQU1BR0VTIE9SIE9USEVSIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1JcclxuLy8gT1RIRVJXSVNFLCBBUklTSU5HIEZST00sIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRVxyXG4vLyBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU4gVEhFIFNPRlRXQVJFLlxyXG5cclxuZnVuY3Rpb24gRXZlbnRFbWl0dGVyKCkge1xyXG4gIHRoaXMuX2V2ZW50cyA9IHRoaXMuX2V2ZW50cyB8fCB7fTtcclxuICB0aGlzLl9tYXhMaXN0ZW5lcnMgPSB0aGlzLl9tYXhMaXN0ZW5lcnMgfHwgdW5kZWZpbmVkO1xyXG59XHJcbm1vZHVsZS5leHBvcnRzID0gRXZlbnRFbWl0dGVyO1xyXG5cclxuLy8gQmFja3dhcmRzLWNvbXBhdCB3aXRoIG5vZGUgMC4xMC54XHJcbkV2ZW50RW1pdHRlci5FdmVudEVtaXR0ZXIgPSBFdmVudEVtaXR0ZXI7XHJcblxyXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLl9ldmVudHMgPSB1bmRlZmluZWQ7XHJcbkV2ZW50RW1pdHRlci5wcm90b3R5cGUuX21heExpc3RlbmVycyA9IHVuZGVmaW5lZDtcclxuXHJcbi8vIEJ5IGRlZmF1bHQgRXZlbnRFbWl0dGVycyB3aWxsIHByaW50IGEgd2FybmluZyBpZiBtb3JlIHRoYW4gMTAgbGlzdGVuZXJzIGFyZVxyXG4vLyBhZGRlZCB0byBpdC4gVGhpcyBpcyBhIHVzZWZ1bCBkZWZhdWx0IHdoaWNoIGhlbHBzIGZpbmRpbmcgbWVtb3J5IGxlYWtzLlxyXG5FdmVudEVtaXR0ZXIuZGVmYXVsdE1heExpc3RlbmVycyA9IDEwO1xyXG5cclxuLy8gT2J2aW91c2x5IG5vdCBhbGwgRW1pdHRlcnMgc2hvdWxkIGJlIGxpbWl0ZWQgdG8gMTAuIFRoaXMgZnVuY3Rpb24gYWxsb3dzXHJcbi8vIHRoYXQgdG8gYmUgaW5jcmVhc2VkLiBTZXQgdG8gemVybyBmb3IgdW5saW1pdGVkLlxyXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLnNldE1heExpc3RlbmVycyA9IGZ1bmN0aW9uKG4pIHtcclxuICBpZiAoIWlzTnVtYmVyKG4pIHx8IG4gPCAwIHx8IGlzTmFOKG4pKVxyXG4gICAgdGhyb3cgVHlwZUVycm9yKCduIG11c3QgYmUgYSBwb3NpdGl2ZSBudW1iZXInKTtcclxuICB0aGlzLl9tYXhMaXN0ZW5lcnMgPSBuO1xyXG4gIHJldHVybiB0aGlzO1xyXG59O1xyXG5cclxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5lbWl0ID0gZnVuY3Rpb24odHlwZSkge1xyXG4gIHZhciBlciwgaGFuZGxlciwgbGVuLCBhcmdzLCBpLCBsaXN0ZW5lcnM7XHJcblxyXG4gIGlmICghdGhpcy5fZXZlbnRzKVxyXG4gICAgdGhpcy5fZXZlbnRzID0ge307XHJcblxyXG4gIC8vIElmIHRoZXJlIGlzIG5vICdlcnJvcicgZXZlbnQgbGlzdGVuZXIgdGhlbiB0aHJvdy5cclxuICBpZiAodHlwZSA9PT0gJ2Vycm9yJykge1xyXG4gICAgaWYgKCF0aGlzLl9ldmVudHMuZXJyb3IgfHxcclxuICAgICAgICAoaXNPYmplY3QodGhpcy5fZXZlbnRzLmVycm9yKSAmJiAhdGhpcy5fZXZlbnRzLmVycm9yLmxlbmd0aCkpIHtcclxuICAgICAgZXIgPSBhcmd1bWVudHNbMV07XHJcbiAgICAgIGlmIChlciBpbnN0YW5jZW9mIEVycm9yKSB7XHJcbiAgICAgICAgdGhyb3cgZXI7IC8vIFVuaGFuZGxlZCAnZXJyb3InIGV2ZW50XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgLy8gQXQgbGVhc3QgZ2l2ZSBzb21lIGtpbmQgb2YgY29udGV4dCB0byB0aGUgdXNlclxyXG4gICAgICAgIHZhciBlcnIgPSBuZXcgRXJyb3IoJ1VuY2F1Z2h0LCB1bnNwZWNpZmllZCBcImVycm9yXCIgZXZlbnQuICgnICsgZXIgKyAnKScpO1xyXG4gICAgICAgIGVyci5jb250ZXh0ID0gZXI7XHJcbiAgICAgICAgdGhyb3cgZXJyO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBoYW5kbGVyID0gdGhpcy5fZXZlbnRzW3R5cGVdO1xyXG5cclxuICBpZiAoaXNVbmRlZmluZWQoaGFuZGxlcikpXHJcbiAgICByZXR1cm4gZmFsc2U7XHJcblxyXG4gIGlmIChpc0Z1bmN0aW9uKGhhbmRsZXIpKSB7XHJcbiAgICBzd2l0Y2ggKGFyZ3VtZW50cy5sZW5ndGgpIHtcclxuICAgICAgLy8gZmFzdCBjYXNlc1xyXG4gICAgICBjYXNlIDE6XHJcbiAgICAgICAgaGFuZGxlci5jYWxsKHRoaXMpO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBjYXNlIDI6XHJcbiAgICAgICAgaGFuZGxlci5jYWxsKHRoaXMsIGFyZ3VtZW50c1sxXSk7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGNhc2UgMzpcclxuICAgICAgICBoYW5kbGVyLmNhbGwodGhpcywgYXJndW1lbnRzWzFdLCBhcmd1bWVudHNbMl0pO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICAvLyBzbG93ZXJcclxuICAgICAgZGVmYXVsdDpcclxuICAgICAgICBhcmdzID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJndW1lbnRzLCAxKTtcclxuICAgICAgICBoYW5kbGVyLmFwcGx5KHRoaXMsIGFyZ3MpO1xyXG4gICAgfVxyXG4gIH0gZWxzZSBpZiAoaXNPYmplY3QoaGFuZGxlcikpIHtcclxuICAgIGFyZ3MgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmd1bWVudHMsIDEpO1xyXG4gICAgbGlzdGVuZXJzID0gaGFuZGxlci5zbGljZSgpO1xyXG4gICAgbGVuID0gbGlzdGVuZXJzLmxlbmd0aDtcclxuICAgIGZvciAoaSA9IDA7IGkgPCBsZW47IGkrKylcclxuICAgICAgbGlzdGVuZXJzW2ldLmFwcGx5KHRoaXMsIGFyZ3MpO1xyXG4gIH1cclxuXHJcbiAgcmV0dXJuIHRydWU7XHJcbn07XHJcblxyXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLmFkZExpc3RlbmVyID0gZnVuY3Rpb24odHlwZSwgbGlzdGVuZXIpIHtcclxuICB2YXIgbTtcclxuXHJcbiAgaWYgKCFpc0Z1bmN0aW9uKGxpc3RlbmVyKSlcclxuICAgIHRocm93IFR5cGVFcnJvcignbGlzdGVuZXIgbXVzdCBiZSBhIGZ1bmN0aW9uJyk7XHJcblxyXG4gIGlmICghdGhpcy5fZXZlbnRzKVxyXG4gICAgdGhpcy5fZXZlbnRzID0ge307XHJcblxyXG4gIC8vIFRvIGF2b2lkIHJlY3Vyc2lvbiBpbiB0aGUgY2FzZSB0aGF0IHR5cGUgPT09IFwibmV3TGlzdGVuZXJcIiEgQmVmb3JlXHJcbiAgLy8gYWRkaW5nIGl0IHRvIHRoZSBsaXN0ZW5lcnMsIGZpcnN0IGVtaXQgXCJuZXdMaXN0ZW5lclwiLlxyXG4gIGlmICh0aGlzLl9ldmVudHMubmV3TGlzdGVuZXIpXHJcbiAgICB0aGlzLmVtaXQoJ25ld0xpc3RlbmVyJywgdHlwZSxcclxuICAgICAgICAgICAgICBpc0Z1bmN0aW9uKGxpc3RlbmVyLmxpc3RlbmVyKSA/XHJcbiAgICAgICAgICAgICAgbGlzdGVuZXIubGlzdGVuZXIgOiBsaXN0ZW5lcik7XHJcblxyXG4gIGlmICghdGhpcy5fZXZlbnRzW3R5cGVdKVxyXG4gICAgLy8gT3B0aW1pemUgdGhlIGNhc2Ugb2Ygb25lIGxpc3RlbmVyLiBEb24ndCBuZWVkIHRoZSBleHRyYSBhcnJheSBvYmplY3QuXHJcbiAgICB0aGlzLl9ldmVudHNbdHlwZV0gPSBsaXN0ZW5lcjtcclxuICBlbHNlIGlmIChpc09iamVjdCh0aGlzLl9ldmVudHNbdHlwZV0pKVxyXG4gICAgLy8gSWYgd2UndmUgYWxyZWFkeSBnb3QgYW4gYXJyYXksIGp1c3QgYXBwZW5kLlxyXG4gICAgdGhpcy5fZXZlbnRzW3R5cGVdLnB1c2gobGlzdGVuZXIpO1xyXG4gIGVsc2VcclxuICAgIC8vIEFkZGluZyB0aGUgc2Vjb25kIGVsZW1lbnQsIG5lZWQgdG8gY2hhbmdlIHRvIGFycmF5LlxyXG4gICAgdGhpcy5fZXZlbnRzW3R5cGVdID0gW3RoaXMuX2V2ZW50c1t0eXBlXSwgbGlzdGVuZXJdO1xyXG5cclxuICAvLyBDaGVjayBmb3IgbGlzdGVuZXIgbGVha1xyXG4gIGlmIChpc09iamVjdCh0aGlzLl9ldmVudHNbdHlwZV0pICYmICF0aGlzLl9ldmVudHNbdHlwZV0ud2FybmVkKSB7XHJcbiAgICBpZiAoIWlzVW5kZWZpbmVkKHRoaXMuX21heExpc3RlbmVycykpIHtcclxuICAgICAgbSA9IHRoaXMuX21heExpc3RlbmVycztcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIG0gPSBFdmVudEVtaXR0ZXIuZGVmYXVsdE1heExpc3RlbmVycztcclxuICAgIH1cclxuXHJcbiAgICBpZiAobSAmJiBtID4gMCAmJiB0aGlzLl9ldmVudHNbdHlwZV0ubGVuZ3RoID4gbSkge1xyXG4gICAgICB0aGlzLl9ldmVudHNbdHlwZV0ud2FybmVkID0gdHJ1ZTtcclxuICAgICAgY29uc29sZS5lcnJvcignKG5vZGUpIHdhcm5pbmc6IHBvc3NpYmxlIEV2ZW50RW1pdHRlciBtZW1vcnkgJyArXHJcbiAgICAgICAgICAgICAgICAgICAgJ2xlYWsgZGV0ZWN0ZWQuICVkIGxpc3RlbmVycyBhZGRlZC4gJyArXHJcbiAgICAgICAgICAgICAgICAgICAgJ1VzZSBlbWl0dGVyLnNldE1heExpc3RlbmVycygpIHRvIGluY3JlYXNlIGxpbWl0LicsXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fZXZlbnRzW3R5cGVdLmxlbmd0aCk7XHJcbiAgICAgIGlmICh0eXBlb2YgY29uc29sZS50cmFjZSA9PT0gJ2Z1bmN0aW9uJykge1xyXG4gICAgICAgIC8vIG5vdCBzdXBwb3J0ZWQgaW4gSUUgMTBcclxuICAgICAgICBjb25zb2xlLnRyYWNlKCk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcblxyXG4gIHJldHVybiB0aGlzO1xyXG59O1xyXG5cclxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5vbiA9IEV2ZW50RW1pdHRlci5wcm90b3R5cGUuYWRkTGlzdGVuZXI7XHJcblxyXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLm9uY2UgPSBmdW5jdGlvbih0eXBlLCBsaXN0ZW5lcikge1xyXG4gIGlmICghaXNGdW5jdGlvbihsaXN0ZW5lcikpXHJcbiAgICB0aHJvdyBUeXBlRXJyb3IoJ2xpc3RlbmVyIG11c3QgYmUgYSBmdW5jdGlvbicpO1xyXG5cclxuICB2YXIgZmlyZWQgPSBmYWxzZTtcclxuXHJcbiAgZnVuY3Rpb24gZygpIHtcclxuICAgIHRoaXMucmVtb3ZlTGlzdGVuZXIodHlwZSwgZyk7XHJcblxyXG4gICAgaWYgKCFmaXJlZCkge1xyXG4gICAgICBmaXJlZCA9IHRydWU7XHJcbiAgICAgIGxpc3RlbmVyLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBnLmxpc3RlbmVyID0gbGlzdGVuZXI7XHJcbiAgdGhpcy5vbih0eXBlLCBnKTtcclxuXHJcbiAgcmV0dXJuIHRoaXM7XHJcbn07XHJcblxyXG4vLyBlbWl0cyBhICdyZW1vdmVMaXN0ZW5lcicgZXZlbnQgaWZmIHRoZSBsaXN0ZW5lciB3YXMgcmVtb3ZlZFxyXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLnJlbW92ZUxpc3RlbmVyID0gZnVuY3Rpb24odHlwZSwgbGlzdGVuZXIpIHtcclxuICB2YXIgbGlzdCwgcG9zaXRpb24sIGxlbmd0aCwgaTtcclxuXHJcbiAgaWYgKCFpc0Z1bmN0aW9uKGxpc3RlbmVyKSlcclxuICAgIHRocm93IFR5cGVFcnJvcignbGlzdGVuZXIgbXVzdCBiZSBhIGZ1bmN0aW9uJyk7XHJcblxyXG4gIGlmICghdGhpcy5fZXZlbnRzIHx8ICF0aGlzLl9ldmVudHNbdHlwZV0pXHJcbiAgICByZXR1cm4gdGhpcztcclxuXHJcbiAgbGlzdCA9IHRoaXMuX2V2ZW50c1t0eXBlXTtcclxuICBsZW5ndGggPSBsaXN0Lmxlbmd0aDtcclxuICBwb3NpdGlvbiA9IC0xO1xyXG5cclxuICBpZiAobGlzdCA9PT0gbGlzdGVuZXIgfHxcclxuICAgICAgKGlzRnVuY3Rpb24obGlzdC5saXN0ZW5lcikgJiYgbGlzdC5saXN0ZW5lciA9PT0gbGlzdGVuZXIpKSB7XHJcbiAgICBkZWxldGUgdGhpcy5fZXZlbnRzW3R5cGVdO1xyXG4gICAgaWYgKHRoaXMuX2V2ZW50cy5yZW1vdmVMaXN0ZW5lcilcclxuICAgICAgdGhpcy5lbWl0KCdyZW1vdmVMaXN0ZW5lcicsIHR5cGUsIGxpc3RlbmVyKTtcclxuXHJcbiAgfSBlbHNlIGlmIChpc09iamVjdChsaXN0KSkge1xyXG4gICAgZm9yIChpID0gbGVuZ3RoOyBpLS0gPiAwOykge1xyXG4gICAgICBpZiAobGlzdFtpXSA9PT0gbGlzdGVuZXIgfHxcclxuICAgICAgICAgIChsaXN0W2ldLmxpc3RlbmVyICYmIGxpc3RbaV0ubGlzdGVuZXIgPT09IGxpc3RlbmVyKSkge1xyXG4gICAgICAgIHBvc2l0aW9uID0gaTtcclxuICAgICAgICBicmVhaztcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGlmIChwb3NpdGlvbiA8IDApXHJcbiAgICAgIHJldHVybiB0aGlzO1xyXG5cclxuICAgIGlmIChsaXN0Lmxlbmd0aCA9PT0gMSkge1xyXG4gICAgICBsaXN0Lmxlbmd0aCA9IDA7XHJcbiAgICAgIGRlbGV0ZSB0aGlzLl9ldmVudHNbdHlwZV07XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBsaXN0LnNwbGljZShwb3NpdGlvbiwgMSk7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKHRoaXMuX2V2ZW50cy5yZW1vdmVMaXN0ZW5lcilcclxuICAgICAgdGhpcy5lbWl0KCdyZW1vdmVMaXN0ZW5lcicsIHR5cGUsIGxpc3RlbmVyKTtcclxuICB9XHJcblxyXG4gIHJldHVybiB0aGlzO1xyXG59O1xyXG5cclxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5yZW1vdmVBbGxMaXN0ZW5lcnMgPSBmdW5jdGlvbih0eXBlKSB7XHJcbiAgdmFyIGtleSwgbGlzdGVuZXJzO1xyXG5cclxuICBpZiAoIXRoaXMuX2V2ZW50cylcclxuICAgIHJldHVybiB0aGlzO1xyXG5cclxuICAvLyBub3QgbGlzdGVuaW5nIGZvciByZW1vdmVMaXN0ZW5lciwgbm8gbmVlZCB0byBlbWl0XHJcbiAgaWYgKCF0aGlzLl9ldmVudHMucmVtb3ZlTGlzdGVuZXIpIHtcclxuICAgIGlmIChhcmd1bWVudHMubGVuZ3RoID09PSAwKVxyXG4gICAgICB0aGlzLl9ldmVudHMgPSB7fTtcclxuICAgIGVsc2UgaWYgKHRoaXMuX2V2ZW50c1t0eXBlXSlcclxuICAgICAgZGVsZXRlIHRoaXMuX2V2ZW50c1t0eXBlXTtcclxuICAgIHJldHVybiB0aGlzO1xyXG4gIH1cclxuXHJcbiAgLy8gZW1pdCByZW1vdmVMaXN0ZW5lciBmb3IgYWxsIGxpc3RlbmVycyBvbiBhbGwgZXZlbnRzXHJcbiAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPT09IDApIHtcclxuICAgIGZvciAoa2V5IGluIHRoaXMuX2V2ZW50cykge1xyXG4gICAgICBpZiAoa2V5ID09PSAncmVtb3ZlTGlzdGVuZXInKSBjb250aW51ZTtcclxuICAgICAgdGhpcy5yZW1vdmVBbGxMaXN0ZW5lcnMoa2V5KTtcclxuICAgIH1cclxuICAgIHRoaXMucmVtb3ZlQWxsTGlzdGVuZXJzKCdyZW1vdmVMaXN0ZW5lcicpO1xyXG4gICAgdGhpcy5fZXZlbnRzID0ge307XHJcbiAgICByZXR1cm4gdGhpcztcclxuICB9XHJcblxyXG4gIGxpc3RlbmVycyA9IHRoaXMuX2V2ZW50c1t0eXBlXTtcclxuXHJcbiAgaWYgKGlzRnVuY3Rpb24obGlzdGVuZXJzKSkge1xyXG4gICAgdGhpcy5yZW1vdmVMaXN0ZW5lcih0eXBlLCBsaXN0ZW5lcnMpO1xyXG4gIH0gZWxzZSBpZiAobGlzdGVuZXJzKSB7XHJcbiAgICAvLyBMSUZPIG9yZGVyXHJcbiAgICB3aGlsZSAobGlzdGVuZXJzLmxlbmd0aClcclxuICAgICAgdGhpcy5yZW1vdmVMaXN0ZW5lcih0eXBlLCBsaXN0ZW5lcnNbbGlzdGVuZXJzLmxlbmd0aCAtIDFdKTtcclxuICB9XHJcbiAgZGVsZXRlIHRoaXMuX2V2ZW50c1t0eXBlXTtcclxuXHJcbiAgcmV0dXJuIHRoaXM7XHJcbn07XHJcblxyXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLmxpc3RlbmVycyA9IGZ1bmN0aW9uKHR5cGUpIHtcclxuICB2YXIgcmV0O1xyXG4gIGlmICghdGhpcy5fZXZlbnRzIHx8ICF0aGlzLl9ldmVudHNbdHlwZV0pXHJcbiAgICByZXQgPSBbXTtcclxuICBlbHNlIGlmIChpc0Z1bmN0aW9uKHRoaXMuX2V2ZW50c1t0eXBlXSkpXHJcbiAgICByZXQgPSBbdGhpcy5fZXZlbnRzW3R5cGVdXTtcclxuICBlbHNlXHJcbiAgICByZXQgPSB0aGlzLl9ldmVudHNbdHlwZV0uc2xpY2UoKTtcclxuICByZXR1cm4gcmV0O1xyXG59O1xyXG5cclxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5saXN0ZW5lckNvdW50ID0gZnVuY3Rpb24odHlwZSkge1xyXG4gIGlmICh0aGlzLl9ldmVudHMpIHtcclxuICAgIHZhciBldmxpc3RlbmVyID0gdGhpcy5fZXZlbnRzW3R5cGVdO1xyXG5cclxuICAgIGlmIChpc0Z1bmN0aW9uKGV2bGlzdGVuZXIpKVxyXG4gICAgICByZXR1cm4gMTtcclxuICAgIGVsc2UgaWYgKGV2bGlzdGVuZXIpXHJcbiAgICAgIHJldHVybiBldmxpc3RlbmVyLmxlbmd0aDtcclxuICB9XHJcbiAgcmV0dXJuIDA7XHJcbn07XHJcblxyXG5FdmVudEVtaXR0ZXIubGlzdGVuZXJDb3VudCA9IGZ1bmN0aW9uKGVtaXR0ZXIsIHR5cGUpIHtcclxuICByZXR1cm4gZW1pdHRlci5saXN0ZW5lckNvdW50KHR5cGUpO1xyXG59O1xyXG5cclxuZnVuY3Rpb24gaXNGdW5jdGlvbihhcmcpIHtcclxuICByZXR1cm4gdHlwZW9mIGFyZyA9PT0gJ2Z1bmN0aW9uJztcclxufVxyXG5cclxuZnVuY3Rpb24gaXNOdW1iZXIoYXJnKSB7XHJcbiAgcmV0dXJuIHR5cGVvZiBhcmcgPT09ICdudW1iZXInO1xyXG59XHJcblxyXG5mdW5jdGlvbiBpc09iamVjdChhcmcpIHtcclxuICByZXR1cm4gdHlwZW9mIGFyZyA9PT0gJ29iamVjdCcgJiYgYXJnICE9PSBudWxsO1xyXG59XHJcblxyXG5mdW5jdGlvbiBpc1VuZGVmaW5lZChhcmcpIHtcclxuICByZXR1cm4gYXJnID09PSB2b2lkIDA7XHJcbn1cclxuIiwiLy8gQ29weXJpZ2h0IEpveWVudCwgSW5jLiBhbmQgb3RoZXIgTm9kZSBjb250cmlidXRvcnMuXHJcbi8vXHJcbi8vIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhXHJcbi8vIGNvcHkgb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGVcclxuLy8gXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbCBpbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nXHJcbi8vIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCxcclxuLy8gZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGwgY29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdFxyXG4vLyBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzIGZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0byB0aGVcclxuLy8gZm9sbG93aW5nIGNvbmRpdGlvbnM6XHJcbi8vXHJcbi8vIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkXHJcbi8vIGluIGFsbCBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxyXG4vL1xyXG4vLyBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTXHJcbi8vIE9SIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0ZcclxuLy8gTUVSQ0hBTlRBQklMSVRZLCBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTlxyXG4vLyBOTyBFVkVOVCBTSEFMTCBUSEUgQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSxcclxuLy8gREFNQUdFUyBPUiBPVEhFUiBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SXHJcbi8vIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLCBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEVcclxuLy8gVVNFIE9SIE9USEVSIERFQUxJTkdTIElOIFRIRSBTT0ZUV0FSRS5cclxuXHJcbi8vIHJlc29sdmVzIC4gYW5kIC4uIGVsZW1lbnRzIGluIGEgcGF0aCBhcnJheSB3aXRoIGRpcmVjdG9yeSBuYW1lcyB0aGVyZVxyXG4vLyBtdXN0IGJlIG5vIHNsYXNoZXMsIGVtcHR5IGVsZW1lbnRzLCBvciBkZXZpY2UgbmFtZXMgKGM6XFwpIGluIHRoZSBhcnJheVxyXG4vLyAoc28gYWxzbyBubyBsZWFkaW5nIGFuZCB0cmFpbGluZyBzbGFzaGVzIC0gaXQgZG9lcyBub3QgZGlzdGluZ3Vpc2hcclxuLy8gcmVsYXRpdmUgYW5kIGFic29sdXRlIHBhdGhzKVxyXG5mdW5jdGlvbiBub3JtYWxpemVBcnJheShwYXJ0cywgYWxsb3dBYm92ZVJvb3QpIHtcclxuICAvLyBpZiB0aGUgcGF0aCB0cmllcyB0byBnbyBhYm92ZSB0aGUgcm9vdCwgYHVwYCBlbmRzIHVwID4gMFxyXG4gIHZhciB1cCA9IDA7XHJcbiAgZm9yICh2YXIgaSA9IHBhcnRzLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XHJcbiAgICB2YXIgbGFzdCA9IHBhcnRzW2ldO1xyXG4gICAgaWYgKGxhc3QgPT09ICcuJykge1xyXG4gICAgICBwYXJ0cy5zcGxpY2UoaSwgMSk7XHJcbiAgICB9IGVsc2UgaWYgKGxhc3QgPT09ICcuLicpIHtcclxuICAgICAgcGFydHMuc3BsaWNlKGksIDEpO1xyXG4gICAgICB1cCsrO1xyXG4gICAgfSBlbHNlIGlmICh1cCkge1xyXG4gICAgICBwYXJ0cy5zcGxpY2UoaSwgMSk7XHJcbiAgICAgIHVwLS07XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvLyBpZiB0aGUgcGF0aCBpcyBhbGxvd2VkIHRvIGdvIGFib3ZlIHRoZSByb290LCByZXN0b3JlIGxlYWRpbmcgLi5zXHJcbiAgaWYgKGFsbG93QWJvdmVSb290KSB7XHJcbiAgICBmb3IgKDsgdXAtLTsgdXApIHtcclxuICAgICAgcGFydHMudW5zaGlmdCgnLi4nKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHJldHVybiBwYXJ0cztcclxufVxyXG5cclxuLy8gU3BsaXQgYSBmaWxlbmFtZSBpbnRvIFtyb290LCBkaXIsIGJhc2VuYW1lLCBleHRdLCB1bml4IHZlcnNpb25cclxuLy8gJ3Jvb3QnIGlzIGp1c3QgYSBzbGFzaCwgb3Igbm90aGluZy5cclxudmFyIHNwbGl0UGF0aFJlID1cclxuICAgIC9eKFxcLz98KShbXFxzXFxTXSo/KSgoPzpcXC57MSwyfXxbXlxcL10rP3wpKFxcLlteLlxcL10qfCkpKD86W1xcL10qKSQvO1xyXG52YXIgc3BsaXRQYXRoID0gZnVuY3Rpb24oZmlsZW5hbWUpIHtcclxuICByZXR1cm4gc3BsaXRQYXRoUmUuZXhlYyhmaWxlbmFtZSkuc2xpY2UoMSk7XHJcbn07XHJcblxyXG4vLyBwYXRoLnJlc29sdmUoW2Zyb20gLi4uXSwgdG8pXHJcbi8vIHBvc2l4IHZlcnNpb25cclxuZXhwb3J0cy5yZXNvbHZlID0gZnVuY3Rpb24oKSB7XHJcbiAgdmFyIHJlc29sdmVkUGF0aCA9ICcnLFxyXG4gICAgICByZXNvbHZlZEFic29sdXRlID0gZmFsc2U7XHJcblxyXG4gIGZvciAodmFyIGkgPSBhcmd1bWVudHMubGVuZ3RoIC0gMTsgaSA+PSAtMSAmJiAhcmVzb2x2ZWRBYnNvbHV0ZTsgaS0tKSB7XHJcbiAgICB2YXIgcGF0aCA9IChpID49IDApID8gYXJndW1lbnRzW2ldIDogcHJvY2Vzcy5jd2QoKTtcclxuXHJcbiAgICAvLyBTa2lwIGVtcHR5IGFuZCBpbnZhbGlkIGVudHJpZXNcclxuICAgIGlmICh0eXBlb2YgcGF0aCAhPT0gJ3N0cmluZycpIHtcclxuICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignQXJndW1lbnRzIHRvIHBhdGgucmVzb2x2ZSBtdXN0IGJlIHN0cmluZ3MnKTtcclxuICAgIH0gZWxzZSBpZiAoIXBhdGgpIHtcclxuICAgICAgY29udGludWU7XHJcbiAgICB9XHJcblxyXG4gICAgcmVzb2x2ZWRQYXRoID0gcGF0aCArICcvJyArIHJlc29sdmVkUGF0aDtcclxuICAgIHJlc29sdmVkQWJzb2x1dGUgPSBwYXRoLmNoYXJBdCgwKSA9PT0gJy8nO1xyXG4gIH1cclxuXHJcbiAgLy8gQXQgdGhpcyBwb2ludCB0aGUgcGF0aCBzaG91bGQgYmUgcmVzb2x2ZWQgdG8gYSBmdWxsIGFic29sdXRlIHBhdGgsIGJ1dFxyXG4gIC8vIGhhbmRsZSByZWxhdGl2ZSBwYXRocyB0byBiZSBzYWZlIChtaWdodCBoYXBwZW4gd2hlbiBwcm9jZXNzLmN3ZCgpIGZhaWxzKVxyXG5cclxuICAvLyBOb3JtYWxpemUgdGhlIHBhdGhcclxuICByZXNvbHZlZFBhdGggPSBub3JtYWxpemVBcnJheShmaWx0ZXIocmVzb2x2ZWRQYXRoLnNwbGl0KCcvJyksIGZ1bmN0aW9uKHApIHtcclxuICAgIHJldHVybiAhIXA7XHJcbiAgfSksICFyZXNvbHZlZEFic29sdXRlKS5qb2luKCcvJyk7XHJcblxyXG4gIHJldHVybiAoKHJlc29sdmVkQWJzb2x1dGUgPyAnLycgOiAnJykgKyByZXNvbHZlZFBhdGgpIHx8ICcuJztcclxufTtcclxuXHJcbi8vIHBhdGgubm9ybWFsaXplKHBhdGgpXHJcbi8vIHBvc2l4IHZlcnNpb25cclxuZXhwb3J0cy5ub3JtYWxpemUgPSBmdW5jdGlvbihwYXRoKSB7XHJcbiAgdmFyIGlzQWJzb2x1dGUgPSBleHBvcnRzLmlzQWJzb2x1dGUocGF0aCksXHJcbiAgICAgIHRyYWlsaW5nU2xhc2ggPSBzdWJzdHIocGF0aCwgLTEpID09PSAnLyc7XHJcblxyXG4gIC8vIE5vcm1hbGl6ZSB0aGUgcGF0aFxyXG4gIHBhdGggPSBub3JtYWxpemVBcnJheShmaWx0ZXIocGF0aC5zcGxpdCgnLycpLCBmdW5jdGlvbihwKSB7XHJcbiAgICByZXR1cm4gISFwO1xyXG4gIH0pLCAhaXNBYnNvbHV0ZSkuam9pbignLycpO1xyXG5cclxuICBpZiAoIXBhdGggJiYgIWlzQWJzb2x1dGUpIHtcclxuICAgIHBhdGggPSAnLic7XHJcbiAgfVxyXG4gIGlmIChwYXRoICYmIHRyYWlsaW5nU2xhc2gpIHtcclxuICAgIHBhdGggKz0gJy8nO1xyXG4gIH1cclxuXHJcbiAgcmV0dXJuIChpc0Fic29sdXRlID8gJy8nIDogJycpICsgcGF0aDtcclxufTtcclxuXHJcbi8vIHBvc2l4IHZlcnNpb25cclxuZXhwb3J0cy5pc0Fic29sdXRlID0gZnVuY3Rpb24ocGF0aCkge1xyXG4gIHJldHVybiBwYXRoLmNoYXJBdCgwKSA9PT0gJy8nO1xyXG59O1xyXG5cclxuLy8gcG9zaXggdmVyc2lvblxyXG5leHBvcnRzLmpvaW4gPSBmdW5jdGlvbigpIHtcclxuICB2YXIgcGF0aHMgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmd1bWVudHMsIDApO1xyXG4gIHJldHVybiBleHBvcnRzLm5vcm1hbGl6ZShmaWx0ZXIocGF0aHMsIGZ1bmN0aW9uKHAsIGluZGV4KSB7XHJcbiAgICBpZiAodHlwZW9mIHAgIT09ICdzdHJpbmcnKSB7XHJcbiAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ0FyZ3VtZW50cyB0byBwYXRoLmpvaW4gbXVzdCBiZSBzdHJpbmdzJyk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gcDtcclxuICB9KS5qb2luKCcvJykpO1xyXG59O1xyXG5cclxuXHJcbi8vIHBhdGgucmVsYXRpdmUoZnJvbSwgdG8pXHJcbi8vIHBvc2l4IHZlcnNpb25cclxuZXhwb3J0cy5yZWxhdGl2ZSA9IGZ1bmN0aW9uKGZyb20sIHRvKSB7XHJcbiAgZnJvbSA9IGV4cG9ydHMucmVzb2x2ZShmcm9tKS5zdWJzdHIoMSk7XHJcbiAgdG8gPSBleHBvcnRzLnJlc29sdmUodG8pLnN1YnN0cigxKTtcclxuXHJcbiAgZnVuY3Rpb24gdHJpbShhcnIpIHtcclxuICAgIHZhciBzdGFydCA9IDA7XHJcbiAgICBmb3IgKDsgc3RhcnQgPCBhcnIubGVuZ3RoOyBzdGFydCsrKSB7XHJcbiAgICAgIGlmIChhcnJbc3RhcnRdICE9PSAnJykgYnJlYWs7XHJcbiAgICB9XHJcblxyXG4gICAgdmFyIGVuZCA9IGFyci5sZW5ndGggLSAxO1xyXG4gICAgZm9yICg7IGVuZCA+PSAwOyBlbmQtLSkge1xyXG4gICAgICBpZiAoYXJyW2VuZF0gIT09ICcnKSBicmVhaztcclxuICAgIH1cclxuXHJcbiAgICBpZiAoc3RhcnQgPiBlbmQpIHJldHVybiBbXTtcclxuICAgIHJldHVybiBhcnIuc2xpY2Uoc3RhcnQsIGVuZCAtIHN0YXJ0ICsgMSk7XHJcbiAgfVxyXG5cclxuICB2YXIgZnJvbVBhcnRzID0gdHJpbShmcm9tLnNwbGl0KCcvJykpO1xyXG4gIHZhciB0b1BhcnRzID0gdHJpbSh0by5zcGxpdCgnLycpKTtcclxuXHJcbiAgdmFyIGxlbmd0aCA9IE1hdGgubWluKGZyb21QYXJ0cy5sZW5ndGgsIHRvUGFydHMubGVuZ3RoKTtcclxuICB2YXIgc2FtZVBhcnRzTGVuZ3RoID0gbGVuZ3RoO1xyXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgbGVuZ3RoOyBpKyspIHtcclxuICAgIGlmIChmcm9tUGFydHNbaV0gIT09IHRvUGFydHNbaV0pIHtcclxuICAgICAgc2FtZVBhcnRzTGVuZ3RoID0gaTtcclxuICAgICAgYnJlYWs7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICB2YXIgb3V0cHV0UGFydHMgPSBbXTtcclxuICBmb3IgKHZhciBpID0gc2FtZVBhcnRzTGVuZ3RoOyBpIDwgZnJvbVBhcnRzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICBvdXRwdXRQYXJ0cy5wdXNoKCcuLicpO1xyXG4gIH1cclxuXHJcbiAgb3V0cHV0UGFydHMgPSBvdXRwdXRQYXJ0cy5jb25jYXQodG9QYXJ0cy5zbGljZShzYW1lUGFydHNMZW5ndGgpKTtcclxuXHJcbiAgcmV0dXJuIG91dHB1dFBhcnRzLmpvaW4oJy8nKTtcclxufTtcclxuXHJcbmV4cG9ydHMuc2VwID0gJy8nO1xyXG5leHBvcnRzLmRlbGltaXRlciA9ICc6JztcclxuXHJcbmV4cG9ydHMuZGlybmFtZSA9IGZ1bmN0aW9uKHBhdGgpIHtcclxuICB2YXIgcmVzdWx0ID0gc3BsaXRQYXRoKHBhdGgpLFxyXG4gICAgICByb290ID0gcmVzdWx0WzBdLFxyXG4gICAgICBkaXIgPSByZXN1bHRbMV07XHJcblxyXG4gIGlmICghcm9vdCAmJiAhZGlyKSB7XHJcbiAgICAvLyBObyBkaXJuYW1lIHdoYXRzb2V2ZXJcclxuICAgIHJldHVybiAnLic7XHJcbiAgfVxyXG5cclxuICBpZiAoZGlyKSB7XHJcbiAgICAvLyBJdCBoYXMgYSBkaXJuYW1lLCBzdHJpcCB0cmFpbGluZyBzbGFzaFxyXG4gICAgZGlyID0gZGlyLnN1YnN0cigwLCBkaXIubGVuZ3RoIC0gMSk7XHJcbiAgfVxyXG5cclxuICByZXR1cm4gcm9vdCArIGRpcjtcclxufTtcclxuXHJcblxyXG5leHBvcnRzLmJhc2VuYW1lID0gZnVuY3Rpb24ocGF0aCwgZXh0KSB7XHJcbiAgdmFyIGYgPSBzcGxpdFBhdGgocGF0aClbMl07XHJcbiAgLy8gVE9ETzogbWFrZSB0aGlzIGNvbXBhcmlzb24gY2FzZS1pbnNlbnNpdGl2ZSBvbiB3aW5kb3dzP1xyXG4gIGlmIChleHQgJiYgZi5zdWJzdHIoLTEgKiBleHQubGVuZ3RoKSA9PT0gZXh0KSB7XHJcbiAgICBmID0gZi5zdWJzdHIoMCwgZi5sZW5ndGggLSBleHQubGVuZ3RoKTtcclxuICB9XHJcbiAgcmV0dXJuIGY7XHJcbn07XHJcblxyXG5cclxuZXhwb3J0cy5leHRuYW1lID0gZnVuY3Rpb24ocGF0aCkge1xyXG4gIHJldHVybiBzcGxpdFBhdGgocGF0aClbM107XHJcbn07XHJcblxyXG5mdW5jdGlvbiBmaWx0ZXIgKHhzLCBmKSB7XHJcbiAgICBpZiAoeHMuZmlsdGVyKSByZXR1cm4geHMuZmlsdGVyKGYpO1xyXG4gICAgdmFyIHJlcyA9IFtdO1xyXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCB4cy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgIGlmIChmKHhzW2ldLCBpLCB4cykpIHJlcy5wdXNoKHhzW2ldKTtcclxuICAgIH1cclxuICAgIHJldHVybiByZXM7XHJcbn1cclxuXHJcbi8vIFN0cmluZy5wcm90b3R5cGUuc3Vic3RyIC0gbmVnYXRpdmUgaW5kZXggZG9uJ3Qgd29yayBpbiBJRThcclxudmFyIHN1YnN0ciA9ICdhYicuc3Vic3RyKC0xKSA9PT0gJ2InXHJcbiAgICA/IGZ1bmN0aW9uIChzdHIsIHN0YXJ0LCBsZW4pIHsgcmV0dXJuIHN0ci5zdWJzdHIoc3RhcnQsIGxlbikgfVxyXG4gICAgOiBmdW5jdGlvbiAoc3RyLCBzdGFydCwgbGVuKSB7XHJcbiAgICAgICAgaWYgKHN0YXJ0IDwgMCkgc3RhcnQgPSBzdHIubGVuZ3RoICsgc3RhcnQ7XHJcbiAgICAgICAgcmV0dXJuIHN0ci5zdWJzdHIoc3RhcnQsIGxlbik7XHJcbiAgICB9XHJcbjtcclxuIiwiLy8gc2hpbSBmb3IgdXNpbmcgcHJvY2VzcyBpbiBicm93c2VyXHJcbnZhciBwcm9jZXNzID0gbW9kdWxlLmV4cG9ydHMgPSB7fTtcclxuXHJcbi8vIGNhY2hlZCBmcm9tIHdoYXRldmVyIGdsb2JhbCBpcyBwcmVzZW50IHNvIHRoYXQgdGVzdCBydW5uZXJzIHRoYXQgc3R1YiBpdFxyXG4vLyBkb24ndCBicmVhayB0aGluZ3MuICBCdXQgd2UgbmVlZCB0byB3cmFwIGl0IGluIGEgdHJ5IGNhdGNoIGluIGNhc2UgaXQgaXNcclxuLy8gd3JhcHBlZCBpbiBzdHJpY3QgbW9kZSBjb2RlIHdoaWNoIGRvZXNuJ3QgZGVmaW5lIGFueSBnbG9iYWxzLiAgSXQncyBpbnNpZGUgYVxyXG4vLyBmdW5jdGlvbiBiZWNhdXNlIHRyeS9jYXRjaGVzIGRlb3B0aW1pemUgaW4gY2VydGFpbiBlbmdpbmVzLlxyXG5cclxudmFyIGNhY2hlZFNldFRpbWVvdXQ7XHJcbnZhciBjYWNoZWRDbGVhclRpbWVvdXQ7XHJcblxyXG5mdW5jdGlvbiBkZWZhdWx0U2V0VGltb3V0KCkge1xyXG4gICAgdGhyb3cgbmV3IEVycm9yKCdzZXRUaW1lb3V0IGhhcyBub3QgYmVlbiBkZWZpbmVkJyk7XHJcbn1cclxuZnVuY3Rpb24gZGVmYXVsdENsZWFyVGltZW91dCAoKSB7XHJcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ2NsZWFyVGltZW91dCBoYXMgbm90IGJlZW4gZGVmaW5lZCcpO1xyXG59XHJcbihmdW5jdGlvbiAoKSB7XHJcbiAgICB0cnkge1xyXG4gICAgICAgIGlmICh0eXBlb2Ygc2V0VGltZW91dCA9PT0gJ2Z1bmN0aW9uJykge1xyXG4gICAgICAgICAgICBjYWNoZWRTZXRUaW1lb3V0ID0gc2V0VGltZW91dDtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBjYWNoZWRTZXRUaW1lb3V0ID0gZGVmYXVsdFNldFRpbW91dDtcclxuICAgICAgICB9XHJcbiAgICB9IGNhdGNoIChlKSB7XHJcbiAgICAgICAgY2FjaGVkU2V0VGltZW91dCA9IGRlZmF1bHRTZXRUaW1vdXQ7XHJcbiAgICB9XHJcbiAgICB0cnkge1xyXG4gICAgICAgIGlmICh0eXBlb2YgY2xlYXJUaW1lb3V0ID09PSAnZnVuY3Rpb24nKSB7XHJcbiAgICAgICAgICAgIGNhY2hlZENsZWFyVGltZW91dCA9IGNsZWFyVGltZW91dDtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBjYWNoZWRDbGVhclRpbWVvdXQgPSBkZWZhdWx0Q2xlYXJUaW1lb3V0O1xyXG4gICAgICAgIH1cclxuICAgIH0gY2F0Y2ggKGUpIHtcclxuICAgICAgICBjYWNoZWRDbGVhclRpbWVvdXQgPSBkZWZhdWx0Q2xlYXJUaW1lb3V0O1xyXG4gICAgfVxyXG59ICgpKVxyXG5mdW5jdGlvbiBydW5UaW1lb3V0KGZ1bikge1xyXG4gICAgaWYgKGNhY2hlZFNldFRpbWVvdXQgPT09IHNldFRpbWVvdXQpIHtcclxuICAgICAgICAvL25vcm1hbCBlbnZpcm9tZW50cyBpbiBzYW5lIHNpdHVhdGlvbnNcclxuICAgICAgICByZXR1cm4gc2V0VGltZW91dChmdW4sIDApO1xyXG4gICAgfVxyXG4gICAgLy8gaWYgc2V0VGltZW91dCB3YXNuJ3QgYXZhaWxhYmxlIGJ1dCB3YXMgbGF0dGVyIGRlZmluZWRcclxuICAgIGlmICgoY2FjaGVkU2V0VGltZW91dCA9PT0gZGVmYXVsdFNldFRpbW91dCB8fCAhY2FjaGVkU2V0VGltZW91dCkgJiYgc2V0VGltZW91dCkge1xyXG4gICAgICAgIGNhY2hlZFNldFRpbWVvdXQgPSBzZXRUaW1lb3V0O1xyXG4gICAgICAgIHJldHVybiBzZXRUaW1lb3V0KGZ1biwgMCk7XHJcbiAgICB9XHJcbiAgICB0cnkge1xyXG4gICAgICAgIC8vIHdoZW4gd2hlbiBzb21lYm9keSBoYXMgc2NyZXdlZCB3aXRoIHNldFRpbWVvdXQgYnV0IG5vIEkuRS4gbWFkZG5lc3NcclxuICAgICAgICByZXR1cm4gY2FjaGVkU2V0VGltZW91dChmdW4sIDApO1xyXG4gICAgfSBjYXRjaChlKXtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICAvLyBXaGVuIHdlIGFyZSBpbiBJLkUuIGJ1dCB0aGUgc2NyaXB0IGhhcyBiZWVuIGV2YWxlZCBzbyBJLkUuIGRvZXNuJ3QgdHJ1c3QgdGhlIGdsb2JhbCBvYmplY3Qgd2hlbiBjYWxsZWQgbm9ybWFsbHlcclxuICAgICAgICAgICAgcmV0dXJuIGNhY2hlZFNldFRpbWVvdXQuY2FsbChudWxsLCBmdW4sIDApO1xyXG4gICAgICAgIH0gY2F0Y2goZSl7XHJcbiAgICAgICAgICAgIC8vIHNhbWUgYXMgYWJvdmUgYnV0IHdoZW4gaXQncyBhIHZlcnNpb24gb2YgSS5FLiB0aGF0IG11c3QgaGF2ZSB0aGUgZ2xvYmFsIG9iamVjdCBmb3IgJ3RoaXMnLCBob3BmdWxseSBvdXIgY29udGV4dCBjb3JyZWN0IG90aGVyd2lzZSBpdCB3aWxsIHRocm93IGEgZ2xvYmFsIGVycm9yXHJcbiAgICAgICAgICAgIHJldHVybiBjYWNoZWRTZXRUaW1lb3V0LmNhbGwodGhpcywgZnVuLCAwKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG5cclxufVxyXG5mdW5jdGlvbiBydW5DbGVhclRpbWVvdXQobWFya2VyKSB7XHJcbiAgICBpZiAoY2FjaGVkQ2xlYXJUaW1lb3V0ID09PSBjbGVhclRpbWVvdXQpIHtcclxuICAgICAgICAvL25vcm1hbCBlbnZpcm9tZW50cyBpbiBzYW5lIHNpdHVhdGlvbnNcclxuICAgICAgICByZXR1cm4gY2xlYXJUaW1lb3V0KG1hcmtlcik7XHJcbiAgICB9XHJcbiAgICAvLyBpZiBjbGVhclRpbWVvdXQgd2Fzbid0IGF2YWlsYWJsZSBidXQgd2FzIGxhdHRlciBkZWZpbmVkXHJcbiAgICBpZiAoKGNhY2hlZENsZWFyVGltZW91dCA9PT0gZGVmYXVsdENsZWFyVGltZW91dCB8fCAhY2FjaGVkQ2xlYXJUaW1lb3V0KSAmJiBjbGVhclRpbWVvdXQpIHtcclxuICAgICAgICBjYWNoZWRDbGVhclRpbWVvdXQgPSBjbGVhclRpbWVvdXQ7XHJcbiAgICAgICAgcmV0dXJuIGNsZWFyVGltZW91dChtYXJrZXIpO1xyXG4gICAgfVxyXG4gICAgdHJ5IHtcclxuICAgICAgICAvLyB3aGVuIHdoZW4gc29tZWJvZHkgaGFzIHNjcmV3ZWQgd2l0aCBzZXRUaW1lb3V0IGJ1dCBubyBJLkUuIG1hZGRuZXNzXHJcbiAgICAgICAgcmV0dXJuIGNhY2hlZENsZWFyVGltZW91dChtYXJrZXIpO1xyXG4gICAgfSBjYXRjaCAoZSl7XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgLy8gV2hlbiB3ZSBhcmUgaW4gSS5FLiBidXQgdGhlIHNjcmlwdCBoYXMgYmVlbiBldmFsZWQgc28gSS5FLiBkb2Vzbid0ICB0cnVzdCB0aGUgZ2xvYmFsIG9iamVjdCB3aGVuIGNhbGxlZCBub3JtYWxseVxyXG4gICAgICAgICAgICByZXR1cm4gY2FjaGVkQ2xlYXJUaW1lb3V0LmNhbGwobnVsbCwgbWFya2VyKTtcclxuICAgICAgICB9IGNhdGNoIChlKXtcclxuICAgICAgICAgICAgLy8gc2FtZSBhcyBhYm92ZSBidXQgd2hlbiBpdCdzIGEgdmVyc2lvbiBvZiBJLkUuIHRoYXQgbXVzdCBoYXZlIHRoZSBnbG9iYWwgb2JqZWN0IGZvciAndGhpcycsIGhvcGZ1bGx5IG91ciBjb250ZXh0IGNvcnJlY3Qgb3RoZXJ3aXNlIGl0IHdpbGwgdGhyb3cgYSBnbG9iYWwgZXJyb3IuXHJcbiAgICAgICAgICAgIC8vIFNvbWUgdmVyc2lvbnMgb2YgSS5FLiBoYXZlIGRpZmZlcmVudCBydWxlcyBmb3IgY2xlYXJUaW1lb3V0IHZzIHNldFRpbWVvdXRcclxuICAgICAgICAgICAgcmV0dXJuIGNhY2hlZENsZWFyVGltZW91dC5jYWxsKHRoaXMsIG1hcmtlcik7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuXHJcblxyXG59XHJcbnZhciBxdWV1ZSA9IFtdO1xyXG52YXIgZHJhaW5pbmcgPSBmYWxzZTtcclxudmFyIGN1cnJlbnRRdWV1ZTtcclxudmFyIHF1ZXVlSW5kZXggPSAtMTtcclxuXHJcbmZ1bmN0aW9uIGNsZWFuVXBOZXh0VGljaygpIHtcclxuICAgIGlmICghZHJhaW5pbmcgfHwgIWN1cnJlbnRRdWV1ZSkge1xyXG4gICAgICAgIHJldHVybjtcclxuICAgIH1cclxuICAgIGRyYWluaW5nID0gZmFsc2U7XHJcbiAgICBpZiAoY3VycmVudFF1ZXVlLmxlbmd0aCkge1xyXG4gICAgICAgIHF1ZXVlID0gY3VycmVudFF1ZXVlLmNvbmNhdChxdWV1ZSk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIHF1ZXVlSW5kZXggPSAtMTtcclxuICAgIH1cclxuICAgIGlmIChxdWV1ZS5sZW5ndGgpIHtcclxuICAgICAgICBkcmFpblF1ZXVlKCk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGRyYWluUXVldWUoKSB7XHJcbiAgICBpZiAoZHJhaW5pbmcpIHtcclxuICAgICAgICByZXR1cm47XHJcbiAgICB9XHJcbiAgICB2YXIgdGltZW91dCA9IHJ1blRpbWVvdXQoY2xlYW5VcE5leHRUaWNrKTtcclxuICAgIGRyYWluaW5nID0gdHJ1ZTtcclxuXHJcbiAgICB2YXIgbGVuID0gcXVldWUubGVuZ3RoO1xyXG4gICAgd2hpbGUobGVuKSB7XHJcbiAgICAgICAgY3VycmVudFF1ZXVlID0gcXVldWU7XHJcbiAgICAgICAgcXVldWUgPSBbXTtcclxuICAgICAgICB3aGlsZSAoKytxdWV1ZUluZGV4IDwgbGVuKSB7XHJcbiAgICAgICAgICAgIGlmIChjdXJyZW50UXVldWUpIHtcclxuICAgICAgICAgICAgICAgIGN1cnJlbnRRdWV1ZVtxdWV1ZUluZGV4XS5ydW4oKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBxdWV1ZUluZGV4ID0gLTE7XHJcbiAgICAgICAgbGVuID0gcXVldWUubGVuZ3RoO1xyXG4gICAgfVxyXG4gICAgY3VycmVudFF1ZXVlID0gbnVsbDtcclxuICAgIGRyYWluaW5nID0gZmFsc2U7XHJcbiAgICBydW5DbGVhclRpbWVvdXQodGltZW91dCk7XHJcbn1cclxuXHJcbnByb2Nlc3MubmV4dFRpY2sgPSBmdW5jdGlvbiAoZnVuKSB7XHJcbiAgICB2YXIgYXJncyA9IG5ldyBBcnJheShhcmd1bWVudHMubGVuZ3RoIC0gMSk7XHJcbiAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA+IDEpIHtcclxuICAgICAgICBmb3IgKHZhciBpID0gMTsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBhcmdzW2kgLSAxXSA9IGFyZ3VtZW50c1tpXTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBxdWV1ZS5wdXNoKG5ldyBJdGVtKGZ1biwgYXJncykpO1xyXG4gICAgaWYgKHF1ZXVlLmxlbmd0aCA9PT0gMSAmJiAhZHJhaW5pbmcpIHtcclxuICAgICAgICBydW5UaW1lb3V0KGRyYWluUXVldWUpO1xyXG4gICAgfVxyXG59O1xyXG5cclxuLy8gdjggbGlrZXMgcHJlZGljdGlibGUgb2JqZWN0c1xyXG5mdW5jdGlvbiBJdGVtKGZ1biwgYXJyYXkpIHtcclxuICAgIHRoaXMuZnVuID0gZnVuO1xyXG4gICAgdGhpcy5hcnJheSA9IGFycmF5O1xyXG59XHJcbkl0ZW0ucHJvdG90eXBlLnJ1biA9IGZ1bmN0aW9uICgpIHtcclxuICAgIHRoaXMuZnVuLmFwcGx5KG51bGwsIHRoaXMuYXJyYXkpO1xyXG59O1xyXG5wcm9jZXNzLnRpdGxlID0gJ2Jyb3dzZXInO1xyXG5wcm9jZXNzLmJyb3dzZXIgPSB0cnVlO1xyXG5wcm9jZXNzLmVudiA9IHt9O1xyXG5wcm9jZXNzLmFyZ3YgPSBbXTtcclxucHJvY2Vzcy52ZXJzaW9uID0gJyc7IC8vIGVtcHR5IHN0cmluZyB0byBhdm9pZCByZWdleHAgaXNzdWVzXHJcbnByb2Nlc3MudmVyc2lvbnMgPSB7fTtcclxuXHJcbmZ1bmN0aW9uIG5vb3AoKSB7fVxyXG5cclxucHJvY2Vzcy5vbiA9IG5vb3A7XHJcbnByb2Nlc3MuYWRkTGlzdGVuZXIgPSBub29wO1xyXG5wcm9jZXNzLm9uY2UgPSBub29wO1xyXG5wcm9jZXNzLm9mZiA9IG5vb3A7XHJcbnByb2Nlc3MucmVtb3ZlTGlzdGVuZXIgPSBub29wO1xyXG5wcm9jZXNzLnJlbW92ZUFsbExpc3RlbmVycyA9IG5vb3A7XHJcbnByb2Nlc3MuZW1pdCA9IG5vb3A7XHJcbnByb2Nlc3MucHJlcGVuZExpc3RlbmVyID0gbm9vcDtcclxucHJvY2Vzcy5wcmVwZW5kT25jZUxpc3RlbmVyID0gbm9vcDtcclxuXHJcbnByb2Nlc3MubGlzdGVuZXJzID0gZnVuY3Rpb24gKG5hbWUpIHsgcmV0dXJuIFtdIH1cclxuXHJcbnByb2Nlc3MuYmluZGluZyA9IGZ1bmN0aW9uIChuYW1lKSB7XHJcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ3Byb2Nlc3MuYmluZGluZyBpcyBub3Qgc3VwcG9ydGVkJyk7XHJcbn07XHJcblxyXG5wcm9jZXNzLmN3ZCA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuICcvJyB9O1xyXG5wcm9jZXNzLmNoZGlyID0gZnVuY3Rpb24gKGRpcikge1xyXG4gICAgdGhyb3cgbmV3IEVycm9yKCdwcm9jZXNzLmNoZGlyIGlzIG5vdCBzdXBwb3J0ZWQnKTtcclxufTtcclxucHJvY2Vzcy51bWFzayA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gMDsgfTtcclxuIiwiaW1wb3J0IHsgUmVzb3VyY2VMb2FkZXIgfSBmcm9tIFwiLi4vdXRpbHMvcmVzb3VyY2UtbG9hZGVyXCI7XHJcbmltcG9ydCB7IEVudGl0eSB9IGZyb20gXCIuL2VudGl0eVwiO1xyXG5pbXBvcnQgeyBFdmVudEVtaXR0ZXIgfSBmcm9tIFwiZXZlbnRzXCI7XHJcblxyXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgQ29tcG9uZW50IGV4dGVuZHMgRXZlbnRFbWl0dGVyIHtcclxuXHJcbiAgICBwcml2YXRlIF9vd25lcjogRW50aXR5O1xyXG5cclxuICAgIGdldCBvd25lcigpOiBFbnRpdHkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9vd25lcjtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgbG9hZFJlc291cmNlcyhsb2FkZXI6IFJlc291cmNlTG9hZGVyKTogdm9pZCB7IH1cclxufSIsImltcG9ydCB7IENvbXBvbmVudCB9IGZyb20gXCIuLi9jb21wb25lbnRcIjtcclxuaW1wb3J0IHsgUmVjdCB9IGZyb20gXCIuLi8uLi9tYXRoL3JlY3RcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBCb3hDb2xsaWRlciBleHRlbmRzIENvbXBvbmVudCB7XHJcblxyXG4gICAgcHVibGljIHJlYWRvbmx5IHJlY3Q6IFJlY3Q7XHJcblxyXG4gICAgY29uc3RydWN0b3IoeD86IG51bWJlciwgeT86IG51bWJlciwgdz86IG51bWJlciwgaD86IG51bWJlcikge1xyXG4gICAgICAgIHN1cGVyKCk7XHJcblxyXG4gICAgICAgIHRoaXMucmVjdCA9IG5ldyBSZWN0KHggfHwgMCwgeSB8fCAwLCB3IHx8IDAsIGggfHwgMCk7XHJcbiAgICB9XHJcbn0iLCJpbXBvcnQgeyBDb21wb25lbnQgfSBmcm9tIFwiLi4vY29tcG9uZW50XCI7XHJcbmltcG9ydCB7IFJlc291cmNlTG9hZGVyIH0gZnJvbSBcIi4uLy4uL3V0aWxzL3Jlc291cmNlLWxvYWRlclwiO1xyXG5pbXBvcnQgeyBWZWN0b3IyIH0gZnJvbSBcIi4uLy4uL21hdGgvdmVjdG9yMlwiO1xyXG5cclxuZXhwb3J0IGNsYXNzIE1vdmVtZW50IGV4dGVuZHMgQ29tcG9uZW50IHtcclxuXHJcbiAgICBwdWJsaWMgdmVsb2NpdHk6IFZlY3RvcjI7XHJcblxyXG4gICAgY29uc3RydWN0b3IoeD86IG51bWJlciwgeT86IG51bWJlcikge1xyXG4gICAgICAgIHN1cGVyKCk7XHJcblxyXG4gICAgICAgIHRoaXMudmVsb2NpdHkgPSBuZXcgVmVjdG9yMih4IHx8IDAsIHkgfHwgMCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGxvYWRSZXNvdXJjZXMobG9hZGVyOiBSZXNvdXJjZUxvYWRlcik6IHZvaWQgeyB9XHJcbn0iLCJpbXBvcnQgeyBDb21wb25lbnQgfSBmcm9tIFwiLi4vY29tcG9uZW50XCI7XHJcblxyXG5leHBvcnQgY2xhc3MgUGxheWVyIGV4dGVuZHMgQ29tcG9uZW50IHtcclxuICAgIFxyXG4gICAgcHVibGljIHNwZWVkOiBudW1iZXI7XHJcbiAgICBwdWJsaWMgbWF4U3BlZWQ6IG51bWJlcjtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihzcGVlZDogbnVtYmVyLCBtYXhTcGVlZDogbnVtYmVyKSB7XHJcbiAgICAgICAgc3VwZXIoKTtcclxuXHJcbiAgICAgICAgdGhpcy5zcGVlZCA9IHNwZWVkO1xyXG4gICAgICAgIHRoaXMubWF4U3BlZWQgPSBtYXhTcGVlZDtcclxuICAgIH1cclxufSIsImltcG9ydCB7IENvbXBvbmVudCB9IGZyb20gXCIuLi9jb21wb25lbnRcIjtcclxuaW1wb3J0IHsgUmVzb3VyY2VMb2FkZXIgfSBmcm9tIFwiLi4vLi4vdXRpbHMvcmVzb3VyY2UtbG9hZGVyXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgU3ByaXRlIGV4dGVuZHMgQ29tcG9uZW50IHtcclxuXHJcbiAgICBwcml2YXRlIF9wYXRoOiBzdHJpbmc7XHJcbiAgICBwcml2YXRlIF9pbWc6IEhUTUxJbWFnZUVsZW1lbnQ7XHJcblxyXG4gICAgY29uc3RydWN0b3IocGF0aDogc3RyaW5nKSB7XHJcbiAgICAgICAgc3VwZXIoKTtcclxuXHJcbiAgICAgICAgdGhpcy5fcGF0aCA9IHBhdGg7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IGltZygpOiBIVE1MSW1hZ2VFbGVtZW50IHtcclxuICAgICAgICByZXR1cm4gdGhpcy5faW1nO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBsb2FkUmVzb3VyY2VzKGxvYWRlcjogUmVzb3VyY2VMb2FkZXIpOiB2b2lkIHtcclxuICAgICAgICBsb2FkZXIucXVldWUodGhpcy5fcGF0aCwgaW1nID0+IHRoaXMuX2ltZyA9IGltZyk7XHJcbiAgICB9XHJcbn0iLCJpbXBvcnQgeyBTY2VuZSB9IGZyb20gXCIuL3NjZW5lXCI7XHJcbmltcG9ydCB7IElMb2dpY1N5c3RlbSB9IGZyb20gXCIuL2lMb2dpY1N5c3RlbVwiO1xyXG5pbXBvcnQgeyBJUmVuZGVyU3lzdGVtIH0gZnJvbSBcIi4vaVJlbmRlclN5c3RlbVwiO1xyXG5pbXBvcnQgeyBLZXlib2FyZCB9IGZyb20gXCIuLi9pbnB1dC9rZXlib2FyZFwiO1xyXG5cclxuZXhwb3J0IGNsYXNzIEVuZ2luZUNvbmZpZ3VyYXRpb24ge1xyXG5cclxuICAgIHB1YmxpYyBlbnRyeTogU2NlbmU7XHJcbiAgICBwdWJsaWMgbG9naWNTeXN0ZW1zOiBJTG9naWNTeXN0ZW1bXTtcclxuICAgIHB1YmxpYyByZW5kZXJTeXN0ZW1zOiBJUmVuZGVyU3lzdGVtW107XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBFbmdpbmUge1xyXG5cclxuICAgIHByaXZhdGUgc3RhdGljIHJlYWRvbmx5IFRJTUVfU1RFUDogbnVtYmVyID0gMSAvIDYwO1xyXG5cclxuICAgIHByaXZhdGUgX2NhbnZhczogSFRNTENhbnZhc0VsZW1lbnQ7XHJcbiAgICBwcml2YXRlIF9jdHg6IENhbnZhc1JlbmRlcmluZ0NvbnRleHQyRDtcclxuXHJcbiAgICBwcml2YXRlIF9jdXJyZW50U2NlbmU6IFNjZW5lO1xyXG4gICAgcHJpdmF0ZSBfbG9naWNTeXN0ZW1zOiBJTG9naWNTeXN0ZW1bXTtcclxuICAgIHByaXZhdGUgX3JlbmRlclN5c3RlbXM6IElSZW5kZXJTeXN0ZW1bXTtcclxuXHJcbiAgICBwcml2YXRlIF9ub3c6IG51bWJlcjtcclxuICAgIHByaXZhdGUgX2R0OiBudW1iZXI7XHJcbiAgICBwcml2YXRlIF9sYXN0OiBudW1iZXI7XHJcblxyXG4gICAgY29uc3RydWN0b3IocGFyYW1zOiBFbmdpbmVDb25maWd1cmF0aW9uKSB7XHJcbiAgICAgICAgY29uc3QgeyBlbnRyeSwgbG9naWNTeXN0ZW1zLCByZW5kZXJTeXN0ZW1zIH0gPSBwYXJhbXM7XHJcblxyXG4gICAgICAgIHRoaXMuX2N1cnJlbnRTY2VuZSA9IGVudHJ5O1xyXG4gICAgICAgIHRoaXMuX2xvZ2ljU3lzdGVtcyA9IGxvZ2ljU3lzdGVtcztcclxuICAgICAgICB0aGlzLl9yZW5kZXJTeXN0ZW1zID0gcmVuZGVyU3lzdGVtcztcclxuXHJcbiAgICAgICAgdGhpcy5fbm93ID0gMDtcclxuICAgICAgICB0aGlzLl9kdCA9IDA7XHJcbiAgICAgICAgdGhpcy5fbGFzdCA9IHRoaXMudGltZXN0YW1wKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGFzeW5jIHN0YXJ0KCk6IFByb21pc2U8dm9pZD4ge1xyXG4gICAgICAgIC8vIFRPRE86IGxvZyBlcnJvciB3aGVuIG5vdCB2YWxpZFxyXG4gICAgICAgIC8vIFRPRE8gbG9nIGVycm9yIGlmIG5vIHN5c3RlbXMgYXJlIHByb3ZpZGVkXHJcbiAgICAgICAgaWYgKHRoaXMudmFsaWRhdGVDb25maWd1cmF0aW9uKCkpIHtcclxuICAgICAgICAgICAgdGhpcy5fY2FudmFzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnY2FudmFzJyk7XHJcbiAgICAgICAgICAgIHRoaXMuX2NhbnZhcy53aWR0aCA9IDgwMDtcclxuICAgICAgICAgICAgdGhpcy5fY2FudmFzLmhlaWdodCA9IDYwMDtcclxuICAgICAgICAgICAgdGhpcy5fY2FudmFzLmlkID0gJ2dhbWUnO1xyXG4gICAgXHJcbiAgICAgICAgICAgIC8vIFRPRE86IGxvZyBlcnJvciBpZiBjb250ZXh0IGlzIG51bGxcclxuICAgICAgICAgICAgbGV0IGMgPSB0aGlzLl9jYW52YXMuZ2V0Q29udGV4dCgnMmQnKTtcclxuICAgICAgICAgICAgaWYgKGMgIT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fY3R4ID0gYztcclxuICAgICAgICAgICAgfVxyXG4gICAgXHJcbiAgICAgICAgICAgIGRvY3VtZW50LmJvZHkuaW5zZXJ0QmVmb3JlKHRoaXMuX2NhbnZhcywgZG9jdW1lbnQuYm9keS5jaGlsZE5vZGVzWzBdKTtcclxuXHJcbiAgICAgICAgICAgIEtleWJvYXJkLmluaXRpYWxpemUoKTtcclxuICAgIFxyXG4gICAgICAgICAgICAvLyBUT0RPOiBzY2VuZSBtYW5hZ2VtZW50XHJcbiAgICAgICAgICAgIC8vIFRPRE86IHJlbW92ZSBncm9zcyBoYWNrLiBcXC9cclxuICAgICAgICAgICAgdGhpcy5wcm9jZXNzRW50aXR5RXZlbnRzKCk7XHJcblxyXG4gICAgICAgICAgICBhd2FpdCB0aGlzLl9jdXJyZW50U2NlbmUubG9hZCgpO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5tYWluTG9vcCgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIG1haW5Mb29wKCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuX25vdyA9IHRoaXMudGltZXN0YW1wKCk7XHJcbiAgICAgICAgdGhpcy5fZHQgPSB0aGlzLl9kdCArIE1hdGgubWluKDEsICh0aGlzLl9ub3cgLSB0aGlzLl9sYXN0KSAvIDEwMDApO1xyXG4gICAgICAgIHRoaXMuX2xhc3QgPSB0aGlzLl9ub3c7XHJcblxyXG4gICAgICAgIEtleWJvYXJkLnRpY2soKTtcclxuICAgICAgICBcclxuICAgICAgICB3aGlsZSAodGhpcy5fZHQgPj0gRW5naW5lLlRJTUVfU1RFUCkge1xyXG4gICAgICAgICAgICB0aGlzLl9kdCA9IHRoaXMuX2R0IC0gRW5naW5lLlRJTUVfU1RFUDtcclxuICAgICAgICAgICAgdGhpcy5maXhlZFRpY2soKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMudGljayh0aGlzLl9kdCk7XHJcbiAgICAgICAgdGhpcy5wcm9jZXNzRW50aXR5RXZlbnRzKCk7XHJcblxyXG4gICAgICAgIHRoaXMucmVuZGVyKCk7XHJcblxyXG4gICAgICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZSgoKSA9PiB0aGlzLm1haW5Mb29wKCkpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgdGltZXN0YW1wKCk6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIHdpbmRvdy5wZXJmb3JtYW5jZSAmJiB3aW5kb3cucGVyZm9ybWFuY2Uubm93ID8gd2luZG93LnBlcmZvcm1hbmNlLm5vdygpIDogbmV3IERhdGUoKS5nZXRUaW1lKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSB0aWNrKGR0OiBudW1iZXIpOiB2b2lkIHtcclxuICAgICAgICBmb3IgKGxldCBzIG9mIHRoaXMuX2xvZ2ljU3lzdGVtcykge1xyXG4gICAgICAgICAgICBzLnRpY2soZHQpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGZpeGVkVGljaygpOiB2b2lkIHtcclxuICAgICAgICBmb3IgKGxldCBzIG9mIHRoaXMuX2xvZ2ljU3lzdGVtcykge1xyXG4gICAgICAgICAgICBzLmZpeGVkVGljaygpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHJlbmRlcigpOiB2b2lkIHtcclxuICAgICAgICBmb3IgKGxldCBzIG9mIHRoaXMuX3JlbmRlclN5c3RlbXMpIHtcclxuICAgICAgICAgICAgcy5kcmF3KHRoaXMuX2N0eCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgcHJvY2Vzc0VudGl0eUV2ZW50cygpOiB2b2lkIHtcclxuICAgICAgICBsZXQgZXYgPSB0aGlzLl9jdXJyZW50U2NlbmUucG9zdFRpY2tFbnRpdHlFdmVudHMoKTtcclxuICAgICAgICBcclxuICAgICAgICBmb3IgKGxldCBlIG9mIGV2LmFkZGVkKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2xvZ2ljU3lzdGVtcy5mb3JFYWNoKHMgPT4gcy5vbkVudGl0eUFkZGVkKGUpKTtcclxuICAgICAgICAgICAgdGhpcy5fcmVuZGVyU3lzdGVtcy5mb3JFYWNoKHMgPT4gcy5vbkVudGl0eUFkZGVkKGUpKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGZvciAobGV0IGUgb2YgZXYucmVtb3ZlZCkge1xyXG4gICAgICAgICAgICB0aGlzLl9sb2dpY1N5c3RlbXMuZm9yRWFjaChzID0+IHMub25FbnRpdHlSZW1vdmVkKGUpKTtcclxuICAgICAgICAgICAgdGhpcy5fcmVuZGVyU3lzdGVtcy5mb3JFYWNoKHMgPT4gcy5vbkVudGl0eVJlbW92ZWQoZSkpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZm9yIChsZXQgZSBvZiBldi5tb2RpZmllZCkge1xyXG4gICAgICAgICAgICB0aGlzLl9sb2dpY1N5c3RlbXMuZm9yRWFjaChzID0+IHMub25FbnRpdHlNb2RpZmllZChlKSk7XHJcbiAgICAgICAgICAgIHRoaXMuX3JlbmRlclN5c3RlbXMuZm9yRWFjaChzID0+IHMub25FbnRpdHlNb2RpZmllZChlKSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgdmFsaWRhdGVDb25maWd1cmF0aW9uKCk6IGJvb2xlYW4ge1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5fbG9naWNTeXN0ZW1zLmxlbmd0aCAtIDE7IGkrKykge1xyXG4gICAgICAgICAgICBsZXQgc3lzdGVtID0gdGhpcy5fbG9naWNTeXN0ZW1zW2ldO1xyXG5cclxuICAgICAgICAgICAgZm9yIChsZXQgaiA9IGkgKyAxOyBqIDwgdGhpcy5fbG9naWNTeXN0ZW1zLmxlbmd0aCAtIDE7IGorKykge1xyXG4gICAgICAgICAgICAgICAgbGV0IG90aGVyU3lzdGVtID0gdGhpcy5fbG9naWNTeXN0ZW1zW2pdO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmICgoPGFueT5zeXN0ZW0uY29uc3RydWN0b3IpLm5hbWUgPT09ICg8YW55Pm90aGVyU3lzdGVtLmNvbnN0cnVjdG9yKS5uYW1lKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH1cclxufSIsImltcG9ydCB7IFJlc291cmNlTG9hZGVyIH0gZnJvbSBcIi4uL3V0aWxzL3Jlc291cmNlLWxvYWRlclwiO1xyXG5pbXBvcnQgeyBDb21wb25lbnQgfSBmcm9tIFwiLi9jb21wb25lbnRcIjtcclxuaW1wb3J0IHsgVmVjdG9yMiB9IGZyb20gXCIuLi9tYXRoL3ZlY3RvcjJcIjtcclxuaW1wb3J0IHsgVHJhbnNmb3JtIH0gZnJvbSBcIi4uL21hdGgvdHJhbnNmb3JtXCI7XHJcbmltcG9ydCB7IFNjZW5lIH0gZnJvbSBcIi4vc2NlbmVcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBFbnRpdHkge1xyXG5cclxuICAgIHByaXZhdGUgX3NjZW5lOiBTY2VuZTtcclxuXHJcbiAgICBwcml2YXRlIF9pZDogbnVtYmVyO1xyXG4gICAgcHJpdmF0ZSByZWFkb25seSBfbmFtZTogc3RyaW5nO1xyXG4gICAgcHJpdmF0ZSByZWFkb25seSBfdHJhbnNmb3JtOiBUcmFuc2Zvcm07XHJcbiAgICBwcml2YXRlIF9jb21wb25lbnRzOiBDb21wb25lbnRbXTtcclxuXHJcbiAgICBnZXQgdWlkKCk6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2lkO1xyXG4gICAgfVxyXG5cclxuICAgIGdldCBuYW1lKCk6IHN0cmluZyB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX25hbWU7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IHRyYW5zZm9ybSgpOiBUcmFuc2Zvcm0ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl90cmFuc2Zvcm07XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IHNjZW5lKCk6IFNjZW5lIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fc2NlbmU7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3RydWN0b3IoXHJcbiAgICAgICAgbmFtZTogc3RyaW5nLFxyXG4gICAgICAgIHBvc2l0aW9uOiBWZWN0b3IyLFxyXG4gICAgICAgIGNvbXBvbmVudHM6IENvbXBvbmVudFtdKSB7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgIHRoaXMuX25hbWUgPSBuYW1lO1xyXG5cclxuICAgICAgICB0aGlzLl90cmFuc2Zvcm0gPSBuZXcgVHJhbnNmb3JtKCk7XHJcbiAgICAgICAgdGhpcy5fdHJhbnNmb3JtLmxvY2FsUG9zaXRpb24gPSBwb3NpdGlvbjtcclxuXHJcbiAgICAgICAgdGhpcy5fY29tcG9uZW50cyA9IGNvbXBvbmVudHM7XHJcblxyXG4gICAgICAgIHRoaXMuX2lkID0gLTE7XHJcbiAgICAgICAgdGhpcy5fc2NlbmUgPSA8YW55Pm51bGw7XHJcblxyXG4gICAgICAgIHRoaXMuX2NvbXBvbmVudHMuZm9yRWFjaChjID0+ICg8YW55PmMpLl9vd25lciA9IHRoaXMpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBsb2FkUmVzb3VyY2VzKGxvYWRlcjogUmVzb3VyY2VMb2FkZXIpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLl9jb21wb25lbnRzLmZvckVhY2goYyA9PiBjLmxvYWRSZXNvdXJjZXMobG9hZGVyKSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldEJlaGF2aW9yT2ZUeXBlPFQgZXh0ZW5kcyBDb21wb25lbnQ+KHRjdG9yOiBuZXcgKC4uLmFyZ3M6IGFueVtdKSA9PiBUKTogVCB8IG51bGwge1xyXG4gICAgICAgIGZvciAobGV0IGIgb2YgdGhpcy5fY29tcG9uZW50cykge1xyXG4gICAgICAgICAgICBpZiAoYiBpbnN0YW5jZW9mIHRjdG9yKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gYiBhcyBUO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgfVxyXG59XHJcbiIsImltcG9ydCB7IFJlc291cmNlTG9hZGVyIH0gZnJvbSBcIi4uL3V0aWxzL3Jlc291cmNlLWxvYWRlclwiO1xyXG5pbXBvcnQgeyBLZXllZENvbGxlY3Rpb24sIFN0cktleWVkQ29sbGVjdGlvbiB9IGZyb20gXCIuLi91dGlscy9rZXllZC1jb2xsZWN0aW9uXCI7XHJcbmltcG9ydCB7IEVudGl0eSB9IGZyb20gXCIuL2VudGl0eVwiO1xyXG5pbXBvcnQgeyBJZEdlbmVyYXRvciB9IGZyb20gXCIuLi91dGlscy9pZC1nZW5lcmF0b3JcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBFbnRpdHlFdmVudHMge1xyXG5cclxuICAgIHB1YmxpYyBhZGRlZDogRW50aXR5W10gPSBbXTtcclxuICAgIHB1YmxpYyByZW1vdmVkOiBFbnRpdHlbXSA9IFtdO1xyXG4gICAgcHVibGljIG1vZGlmaWVkOiBFbnRpdHlbXSA9IFtdO1xyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgU2NlbmUge1xyXG5cclxuICAgIHByaXZhdGUgcmVhZG9ubHkgX25hbWU6IHN0cmluZztcclxuXHJcbiAgICBwcml2YXRlIF9lbnRpdGllc0J5SWQ6IEtleWVkQ29sbGVjdGlvbjxFbnRpdHk+O1xyXG4gICAgcHJpdmF0ZSBfZW50aXRpZXNCeVRhZzogU3RyS2V5ZWRDb2xsZWN0aW9uPG51bWJlcltdPjtcclxuICAgIHByaXZhdGUgX2VudGl0aWVzVG9BZGQ6IEVudGl0eVtdO1xyXG4gICAgcHJpdmF0ZSBfZW50aXRpZXNUb1JlbW92ZTogRW50aXR5W107XHJcbiAgICBwcml2YXRlIF9lbnRpdGllc01vZGlmaWVkOiBLZXllZENvbGxlY3Rpb248RW50aXR5PjtcclxuXHJcbiAgICBwcml2YXRlIF9yZXNvdXJjZUxvYWRlcjogUmVzb3VyY2VMb2FkZXI7XHJcbiAgICBwcml2YXRlIF9pZEdlbmVyYXRvcjogSWRHZW5lcmF0b3I7XHJcblxyXG4gICAgY29uc3RydWN0b3IobmFtZTogc3RyaW5nKSB7XHJcbiAgICAgICAgdGhpcy5fbmFtZSA9IG5hbWU7XHJcblxyXG4gICAgICAgIHRoaXMuX2VudGl0aWVzQnlJZCA9IG5ldyBLZXllZENvbGxlY3Rpb248RW50aXR5PigpO1xyXG4gICAgICAgIHRoaXMuX2VudGl0aWVzQnlUYWcgPSBuZXcgU3RyS2V5ZWRDb2xsZWN0aW9uPG51bWJlcltdPigpO1xyXG4gICAgICAgIHRoaXMuX2VudGl0aWVzVG9BZGQgPSBbXTtcclxuICAgICAgICB0aGlzLl9lbnRpdGllc1RvUmVtb3ZlID0gW107XHJcbiAgICAgICAgdGhpcy5fZW50aXRpZXNNb2RpZmllZCA9IG5ldyBLZXllZENvbGxlY3Rpb248RW50aXR5PigpO1xyXG5cclxuICAgICAgICB0aGlzLl9yZXNvdXJjZUxvYWRlciA9IG5ldyBSZXNvdXJjZUxvYWRlcigpO1xyXG4gICAgICAgIHRoaXMuX2lkR2VuZXJhdG9yID0gbmV3IElkR2VuZXJhdG9yKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gVE9ETzogZXJyb3IgaGFuZGxpbmdcclxuICAgIHB1YmxpYyBsb2FkKCk6IFByb21pc2U8dm9pZD4ge1xyXG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZTx2b2lkPigocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuX2VudGl0aWVzQnlJZC52YWx1ZXMoKS5mb3JFYWNoKGUgPT4gZS5sb2FkUmVzb3VyY2VzKHRoaXMuX3Jlc291cmNlTG9hZGVyKSk7XHJcblxyXG4gICAgICAgICAgICB0aGlzLl9yZXNvdXJjZUxvYWRlci5sb2FkKCgpID0+IHJlc29sdmUoKSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGFkZChlbnRpdHk6IEVudGl0eSk6IHZvaWQge1xyXG4gICAgICAgICg8YW55PmVudGl0eSkuX3NjZW5lID0gdGhpcztcclxuICAgICAgICAoPGFueT5lbnRpdHkpLl91aWQgPSB0aGlzLl9pZEdlbmVyYXRvci5wb3BJZCgpO1xyXG4gICAgICAgIGVudGl0eS5sb2FkUmVzb3VyY2VzKHRoaXMuX3Jlc291cmNlTG9hZGVyKTtcclxuICAgICAgICB0aGlzLl9lbnRpdGllc1RvQWRkLnB1c2goZW50aXR5KTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgdGFnRW50aXR5KGU6IEVudGl0eSwgdGFnOiBzdHJpbmcpOiB2b2lkIHtcclxuICAgICAgICBpZiAodGhpcy5fZW50aXRpZXNCeVRhZy5jb250YWluc0tleSh0YWcpKSB7XHJcbiAgICAgICAgICAgIGxldCB0YWdnZWRJZHMgPSB0aGlzLl9lbnRpdGllc0J5VGFnLml0ZW0odGFnKTtcclxuICAgICAgICAgICAgdGFnZ2VkSWRzLnB1c2goZS51aWQpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5fZW50aXRpZXNCeVRhZy5hZGQodGFnLCBbZS51aWRdKVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvLyBwdWJsaWMgaXNFbnRpdHlUYWdnZWQoZW50aXR5OiBFbnRpdHksIHRhZzogc3RyaW5nKTogYm9vbGVhbiB7XHJcblxyXG4gICAgLy8gfVxyXG5cclxuICAgIC8vIFRPRE86IGZpeC4gdGhpcyB3b250IHdvcmsgYXMgZXhwZWN0ZWQuIGVudGl0aWVzIHRoYXQgYXJlIHJlbW92ZWQgbG9zZSB0aGVpciBpZCBiZWZvcmUgZXZlbnRzIGFyZSBwcm9jZXNzZWQuXHJcbiAgICBwdWJsaWMgcG9zdFRpY2tFbnRpdHlFdmVudHMoKTogRW50aXR5RXZlbnRzIHtcclxuICAgICAgICBmb3IgKGxldCBlIG9mIHRoaXMuX2VudGl0aWVzVG9SZW1vdmUpIHtcclxuICAgICAgICAgICAgdGhpcy5fZW50aXRpZXNCeUlkLnJlbW92ZShlLnVpZCk7XHJcbiAgICAgICAgICAgIHRoaXMuX2lkR2VuZXJhdG9yLnB1c2hJZChlLnVpZCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBmb3IgKGxldCBlIG9mIHRoaXMuX2VudGl0aWVzVG9BZGQpIHtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIHRoaXMuX2VudGl0aWVzQnlJZC5hZGQoZS51aWQsIGUpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IHJlc3VsdHMgPSB7XHJcbiAgICAgICAgICAgIGFkZGVkOiB0aGlzLl9lbnRpdGllc1RvQWRkLmxlbmd0aCA+IDAgPyBbLi4udGhpcy5fZW50aXRpZXNUb0FkZF0gOiBbXSxcclxuICAgICAgICAgICAgcmVtb3ZlZDogdGhpcy5fZW50aXRpZXNUb1JlbW92ZS5sZW5ndGggPiAwID8gWy4uLnRoaXMuX2VudGl0aWVzVG9SZW1vdmVdIDogW10sXHJcbiAgICAgICAgICAgIG1vZGlmaWVkOiB0aGlzLl9lbnRpdGllc01vZGlmaWVkLmNvdW50KCkgPiAwID8gWy4uLnRoaXMuX2VudGl0aWVzTW9kaWZpZWQudmFsdWVzKCldIDogW11cclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICB0aGlzLl9lbnRpdGllc1RvQWRkID0gW107XHJcbiAgICAgICAgdGhpcy5fZW50aXRpZXNUb1JlbW92ZSA9IFtdO1xyXG4gICAgICAgIHRoaXMuX2VudGl0aWVzTW9kaWZpZWQuY2xlYXIoKTtcclxuXHJcbiAgICAgICAgcmV0dXJuIHJlc3VsdHM7XHJcbiAgICB9XHJcbn0iLCJpbXBvcnQgeyBJTG9naWNTeXN0ZW0gfSBmcm9tIFwiLi4vaUxvZ2ljU3lzdGVtXCI7XHJcbmltcG9ydCB7IEtleWVkQ29sbGVjdGlvbiwgU3RyS2V5ZWRDb2xsZWN0aW9uIH0gZnJvbSBcIi4uLy4uL3V0aWxzL2tleWVkLWNvbGxlY3Rpb25cIjtcclxuaW1wb3J0IHsgQm94Q29sbGlkZXIgfSBmcm9tIFwiLi4vY29tcG9uZW50cy9ib3hDb2xsaWRlclwiO1xyXG5pbXBvcnQgeyBNb3ZlbWVudCB9IGZyb20gXCIuLi9jb21wb25lbnRzL21vdmVtZW50XCI7XHJcblxyXG5jbGFzcyBDb2xsaXNpb25QYWlyIHtcclxuICAgIHB1YmxpYyBjb2xsMTogQm94Q29sbGlkZXI7XHJcbiAgICBwdWJsaWMgY29sbDI6IEJveENvbGxpZGVyO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKGNvbGwxOiBCb3hDb2xsaWRlciwgY29sbDI6IEJveENvbGxpZGVyKSB7XHJcbiAgICAgICAgdGhpcy5jb2xsMSA9IGNvbGwxO1xyXG4gICAgICAgIHRoaXMuY29sbDIgPSBjb2xsMjtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIEJydXRlRm9yY2VDb2xsaXNpb25TeXN0ZW0gaW1wbGVtZW50cyBJTG9naWNTeXN0ZW0ge1xyXG5cclxuICAgIHByaXZhdGUgX2NvbGxpZGVyczogQm94Q29sbGlkZXJbXVxyXG4gICAgcHJpdmF0ZSBfcGFpcnM6IFN0cktleWVkQ29sbGVjdGlvbjxDb2xsaXNpb25QYWlyPjtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICB0aGlzLl9jb2xsaWRlcnMgPSBbXTtcclxuICAgICAgICB0aGlzLl9wYWlycyA9IG5ldyBTdHJLZXllZENvbGxlY3Rpb248Q29sbGlzaW9uUGFpcj4oKTtcclxuICAgIH1cclxuXHJcbiAgICB0aWNrKGR0OiBudW1iZXIpOiB2b2lkIHtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgZml4ZWRUaWNrKCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuZGV0ZWN0KCk7XHJcbiAgICAgICAgLy90aGlzLnJlc29sdmUoKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGRldGVjdCgpOiB2b2lkIHtcclxuICAgICAgICBsZXQgY3MgPSB0aGlzLl9jb2xsaWRlcnM7XHJcblxyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDw9IGNzLmxlbmd0aCAtIDE7IGkrKykge1xyXG4gICAgICAgICAgICBsZXQgY29sbCA9IGNzW2ldO1xyXG4gICAgICAgICAgICBsZXQgcG9zID0gY29sbC5vd25lci50cmFuc2Zvcm0ubG9jYWxQb3NpdGlvbjtcclxuICAgICAgICAgICAgY29sbC5yZWN0LnggPSBwb3MueDtcclxuICAgICAgICAgICAgY29sbC5yZWN0LnkgPSBwb3MueTtcclxuXHJcbiAgICAgICAgICAgIGZvciAobGV0IGogPSBpICsgMTsgaiA8PSBjcy5sZW5ndGggLSAxOyBqKyspIHtcclxuICAgICAgICAgICAgICAgIGxldCBvQ29sbCA9IGNzW2pdO1xyXG4gICAgICAgICAgICAgICAgbGV0IG9Qb3MgPSBvQ29sbC5vd25lci50cmFuc2Zvcm0ubG9jYWxQb3NpdGlvbjtcclxuICAgICAgICAgICAgICAgIG9Db2xsLnJlY3QueCA9IG9Qb3MueDtcclxuICAgICAgICAgICAgICAgIG9Db2xsLnJlY3QueSA9IG9Qb3MueTtcclxuXHJcbiAgICAgICAgICAgICAgICBsZXQgcmVjdDEgPSBjb2xsLnJlY3Q7XHJcbiAgICAgICAgICAgICAgICBsZXQgcmVjdDIgPSBvQ29sbC5yZWN0O1xyXG5cclxuICAgICAgICAgICAgICAgIGxldCBwYWlyID0gPGFueT5gJHtjb2xsLm93bmVyLnVpZH06JHtvQ29sbC5vd25lci51aWR9YDtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAocmVjdDEub3ZlcmxhcHMocmVjdDIpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuX3BhaXJzLmNvbnRhaW5zS2V5KHBhaXIpKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29sbC5lbWl0KFwiY29sbGlzaW9uXCIsIG9Db2xsKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgb0NvbGwuZW1pdChcImNvbGxpc2lvblwiLCBjb2xsKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHAgPSBuZXcgQ29sbGlzaW9uUGFpcihjb2xsLCBvQ29sbCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX3BhaXJzLmFkZChwYWlyLCBwKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIGlmICh0aGlzLl9wYWlycy5jb250YWluc0tleShwYWlyKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3BhaXJzLnJlbW92ZShwYWlyKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHJlc29sdmUoKSB7XHJcbiAgICAgICAgZm9yIChsZXQgcCBvZiB0aGlzLl9wYWlycy52YWx1ZXMoKSkge1xyXG4gICAgICAgICAgICBsZXQgbSA9IHAuY29sbDEub3duZXIuZ2V0QmVoYXZpb3JPZlR5cGUoTW92ZW1lbnQpO1xyXG4gICAgICAgICAgICBsZXQgbTIgPSBwLmNvbGwyLm93bmVyLmdldEJlaGF2aW9yT2ZUeXBlKE1vdmVtZW50KTtcclxuICAgICAgICAgICAgaWYgKG0pIHtcclxuICAgICAgICAgICAgICAgIGxldCByZWN0MSA9IHAuY29sbDEucmVjdDtcclxuICAgICAgICAgICAgICAgIGxldCByZWN0MiA9IHAuY29sbDIucmVjdDtcclxuXHJcbiAgICAgICAgICAgICAgICBwLmNvbGwxLm93bmVyLnRyYW5zZm9ybS5sb2NhbFBvc2l0aW9uLnggLT0gbS52ZWxvY2l0eS54O1xyXG4gICAgICAgICAgICAgICAgcC5jb2xsMS5yZWN0LnggLT0gbS52ZWxvY2l0eS54O1xyXG5cclxuICAgICAgICAgICAgICAgIGlmIChyZWN0MS5vdmVybGFwcyhyZWN0MikpIHtcclxuICAgICAgICAgICAgICAgICAgICBwLmNvbGwxLm93bmVyLnRyYW5zZm9ybS5sb2NhbFBvc2l0aW9uLnkgLT0gbS52ZWxvY2l0eS55O1xyXG4gICAgICAgICAgICAgICAgICAgIHAuY29sbDEucmVjdC55IC09IG0udmVsb2NpdHkueTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgcC5jb2xsMS5vd25lci50cmFuc2Zvcm0ubG9jYWxQb3NpdGlvbi54ICs9IG0udmVsb2NpdHkueDtcclxuICAgICAgICAgICAgICAgICAgICBwLmNvbGwxLnJlY3QueCArPSBtLnZlbG9jaXR5Lng7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSBpZiAobTIpIHtcclxuXHJcbiAgICAgICAgICAgICAgICBsZXQgcmVjdDEgPSBwLmNvbGwxLnJlY3Q7XHJcbiAgICAgICAgICAgICAgICBsZXQgcmVjdDIgPSBwLmNvbGwyLnJlY3Q7XHJcblxyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICBpZiAocmVjdDEub3ZlcmxhcHMocmVjdDIpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcC5jb2xsMi5vd25lci50cmFuc2Zvcm0ubG9jYWxQb3NpdGlvbi54IC09IG0yLnZlbG9jaXR5Lng7XHJcbiAgICAgICAgICAgICAgICAgICAgcC5jb2xsMi5yZWN0LnggLT0gbTIudmVsb2NpdHkueDtcclxuICAgIFxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChyZWN0MS5vdmVybGFwcyhyZWN0MikpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcC5jb2xsMi5vd25lci50cmFuc2Zvcm0ubG9jYWxQb3NpdGlvbi55IC09IG0yLnZlbG9jaXR5Lnk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHAuY29sbDIucmVjdC55IC09IG0yLnZlbG9jaXR5Lnk7XHJcbiAgICBcclxuICAgICAgICAgICAgICAgICAgICAgICAgcC5jb2xsMi5vd25lci50cmFuc2Zvcm0ubG9jYWxQb3NpdGlvbi54ICs9IG0yLnZlbG9jaXR5Lng7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHAuY29sbDIucmVjdC54ICs9IG0yLnZlbG9jaXR5Lng7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIG9uRW50aXR5QWRkZWQoZW50aXR5OiBpbXBvcnQoXCJjOi9Vc2Vycy9TdHJhcy9Eb2N1bWVudHMvR2l0SHViL2JkaHRtbC9zcmMvY29yZS9lbnRpdHlcIikuRW50aXR5KTogdm9pZCB7XHJcbiAgICAgICAgbGV0IGMgPSBlbnRpdHkuZ2V0QmVoYXZpb3JPZlR5cGUoQm94Q29sbGlkZXIpO1xyXG4gICAgICAgIGlmIChjICE9IG51bGwpIHtcclxuICAgICAgICAgICAgdGhpcy5fY29sbGlkZXJzW2VudGl0eS51aWRdID0gYztcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgb25FbnRpdHlSZW1vdmVkKGVudGl0eTogaW1wb3J0KFwiYzovVXNlcnMvU3RyYXMvRG9jdW1lbnRzL0dpdEh1Yi9iZGh0bWwvc3JjL2NvcmUvZW50aXR5XCIpLkVudGl0eSk6IHZvaWQge1xyXG4gICAgICAgIGlmICh0aGlzLl9jb2xsaWRlcnNbZW50aXR5LnVpZF0pIHtcclxuICAgICAgICAgICAgdGhpcy5fY29sbGlkZXJzLnNwbGljZShlbnRpdHkudWlkLCAxKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgb25FbnRpdHlNb2RpZmllZChlbnRpdHk6IGltcG9ydChcImM6L1VzZXJzL1N0cmFzL0RvY3VtZW50cy9HaXRIdWIvYmRodG1sL3NyYy9jb3JlL2VudGl0eVwiKS5FbnRpdHkpOiB2b2lkIHtcclxuXHJcbiAgICB9XHJcbn0iLCJpbXBvcnQgeyBJTG9naWNTeXN0ZW0gfSBmcm9tIFwiLi4vaUxvZ2ljU3lzdGVtXCI7XHJcbmltcG9ydCB7IEVudGl0eSB9IGZyb20gXCIuLi9lbnRpdHlcIjtcclxuaW1wb3J0IHsgTW92ZW1lbnQgfSBmcm9tIFwiLi4vY29tcG9uZW50cy9tb3ZlbWVudFwiO1xyXG5pbXBvcnQgeyBLZXllZENvbGxlY3Rpb24gfSBmcm9tIFwiLi4vLi4vdXRpbHMva2V5ZWQtY29sbGVjdGlvblwiO1xyXG5cclxuaW1wb3J0IHsgVmVjdG9yMiB9IGZyb20gXCIuLi8uLi9tYXRoL3ZlY3RvcjJcIjtcclxuaW1wb3J0IHsgS2V5Ym9hcmQsIEtleUNvZGUgfSBmcm9tIFwiLi4vLi4vaW5wdXQva2V5Ym9hcmRcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBNb3ZlbWVudFN5c3RlbSBpbXBsZW1lbnRzIElMb2dpY1N5c3RlbSB7XHJcblxyXG4gICAgcHJpdmF0ZSBfbW92ZW1lbnRzQnlJZDogS2V5ZWRDb2xsZWN0aW9uPE1vdmVtZW50PjtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICB0aGlzLl9tb3ZlbWVudHNCeUlkID0gbmV3IEtleWVkQ29sbGVjdGlvbjxNb3ZlbWVudD4oKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgdGljayhkdDogbnVtYmVyKSB7IH1cclxuXHJcbiAgICBwdWJsaWMgZml4ZWRUaWNrKCk6IHZvaWQge1xyXG4gICAgICAgIGZvciAobGV0IG0gb2YgdGhpcy5fbW92ZW1lbnRzQnlJZC52YWx1ZXMoKSkge1xyXG4gICAgICAgICAgICBsZXQgdHJhbnNmb3JtID0gbS5vd25lci50cmFuc2Zvcm07XHJcbiAgICAgICAgICAgIHRyYW5zZm9ybS5sb2NhbFBvc2l0aW9uPSBWZWN0b3IyLmFkZCh0cmFuc2Zvcm0ubG9jYWxQb3NpdGlvbiwgbS52ZWxvY2l0eSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBvbkVudGl0eUFkZGVkKGVudGl0eTogRW50aXR5KTogdm9pZCB7XHJcbiAgICAgICAgbGV0IHMgPSBlbnRpdHkuZ2V0QmVoYXZpb3JPZlR5cGUoTW92ZW1lbnQpO1xyXG4gICAgICAgIGlmIChzICE9IG51bGwpIHtcclxuICAgICAgICAgICAgdGhpcy5fbW92ZW1lbnRzQnlJZC5hZGQocy5vd25lci51aWQsIHMpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgb25FbnRpdHlSZW1vdmVkKGVudGl0eTogRW50aXR5KTogdm9pZCB7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBvbkVudGl0eU1vZGlmaWVkKGVudGl0eTogRW50aXR5KTogdm9pZCB7XHJcblxyXG4gICAgfVxyXG59XHJcbiIsImltcG9ydCB7IElMb2dpY1N5c3RlbSB9IGZyb20gXCIuLi9pTG9naWNTeXN0ZW1cIjtcclxuaW1wb3J0IHsgRW50aXR5IH0gZnJvbSBcIi4uL2VudGl0eVwiO1xyXG5pbXBvcnQgeyBQbGF5ZXIgfSBmcm9tIFwiLi4vY29tcG9uZW50cy9wbGF5ZXJcIjtcclxuaW1wb3J0IHsgS2V5Ym9hcmQsIEtleUNvZGUgfSBmcm9tIFwiLi4vLi4vaW5wdXQva2V5Ym9hcmRcIjtcclxuaW1wb3J0IHsgTW92ZW1lbnQgfSBmcm9tIFwiLi4vY29tcG9uZW50cy9tb3ZlbWVudFwiO1xyXG5pbXBvcnQgeyBWZWN0b3IyIH0gZnJvbSBcIi4uLy4uL21hdGgvdmVjdG9yMlwiO1xyXG5pbXBvcnQgeyBCb3hDb2xsaWRlciB9IGZyb20gXCIuLi9jb21wb25lbnRzL2JveENvbGxpZGVyXCI7XHJcbmltcG9ydCB7IFNwcml0ZSB9IGZyb20gXCIuLi9jb21wb25lbnRzL3Nwcml0ZVwiO1xyXG5cclxuZXhwb3J0IGNsYXNzIFBsYXllckNvbnRyb2xsZXJTeXN0ZW0gaW1wbGVtZW50cyBJTG9naWNTeXN0ZW0ge1xyXG5cclxuICAgIHByaXZhdGUgX3BsYXllcjogUGxheWVyO1xyXG4gICAgcHJpdmF0ZSBfcGxheWVyTW92ZW1lbnQ6IE1vdmVtZW50O1xyXG4gICAgcHJpdmF0ZSBfcGxheWVyQ29sbGlkZXI6IEJveENvbGxpZGVyO1xyXG5cclxuICAgIHByaXZhdGUgX2xhc3RGcmFtZVNob290aW5nID0gZmFsc2U7XHJcblxyXG4gICAgcHVibGljIHRpY2soZHQ6IG51bWJlcik6IHZvaWQge1xyXG4gICAgICAgIGlmICghdGhpcy5fcGxheWVyKVxyXG4gICAgICAgICAgICByZXR1cm47XHJcblxyXG4gICAgICAgIGxldCBzID0gdGhpcy5fcGxheWVyLnNwZWVkO1xyXG4gICAgICAgIGxldCB2ID0gdGhpcy5fcGxheWVyTW92ZW1lbnQudmVsb2NpdHk7XHJcblxyXG4gICAgICAgIHYueCA9IDA7XHJcbiAgICAgICAgdi55ID0gMDtcclxuXHJcbiAgICAgICAgaWYgKEtleWJvYXJkLmlzS2V5RG93bihLZXlDb2RlLktFWV9XKSkge1xyXG4gICAgICAgICAgICB2LnkgLT0gcztcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKEtleWJvYXJkLmlzS2V5RG93bihLZXlDb2RlLktFWV9BKSkge1xyXG4gICAgICAgICAgICB2LnggLT0gcztcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKEtleWJvYXJkLmlzS2V5RG93bihLZXlDb2RlLktFWV9TKSkge1xyXG4gICAgICAgICAgICB2LnkgKz0gcztcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKEtleWJvYXJkLmlzS2V5RG93bihLZXlDb2RlLktFWV9EKSkge1xyXG4gICAgICAgICAgICB2LnggKz0gcztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICghdGhpcy5fbGFzdEZyYW1lU2hvb3RpbmcgJiYgS2V5Ym9hcmQuaXNLZXlEb3duKEtleUNvZGUuU1BBQ0UpKSB7XHJcbiAgICAgICAgICAgIGxldCBzY2VuZSA9IHRoaXMuX3BsYXllci5vd25lci5zY2VuZTtcclxuICAgICAgICAgICAgbGV0IGUgPSBuZXcgRW50aXR5KFxyXG4gICAgICAgICAgICAgICAgXCJidWxsZXRcIixcclxuICAgICAgICAgICAgICAgIFZlY3RvcjIuYWRkKHRoaXMuX3BsYXllci5vd25lci50cmFuc2Zvcm0ubG9jYWxQb3NpdGlvbiwgbmV3IFZlY3RvcjIoMCwgLTY0KSksXHJcbiAgICAgICAgICAgICAgICBbXHJcbiAgICAgICAgICAgICAgICAgICAgbmV3IFNwcml0ZShcIi4vYXNzZXRzL3BsYXllci5wbmdcIiksXHJcbiAgICAgICAgICAgICAgICAgICAgbmV3IE1vdmVtZW50KDAsIC0xMCksXHJcbiAgICAgICAgICAgICAgICAgICAgbmV3IEJveENvbGxpZGVyKDAsIDAsIDQwLCA1MClcclxuICAgICAgICAgICAgICAgIF0pO1xyXG5cclxuICAgICAgICAgICAgc2NlbmUuYWRkKGUpO1xyXG4gICAgICAgICAgICBzY2VuZS50YWdFbnRpdHkoZSwgXCJidWxsZXRcIik7XHJcblxyXG4gICAgICAgICAgICB0aGlzLl9sYXN0RnJhbWVTaG9vdGluZyA9IHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKEtleWJvYXJkLmlzS2V5VXAoS2V5Q29kZS5TUEFDRSkpIHtcclxuICAgICAgICAgICAgdGhpcy5fbGFzdEZyYW1lU2hvb3RpbmcgPSBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGZpeGVkVGljaygpOiB2b2lkIHsgfVxyXG5cclxuICAgIHB1YmxpYyBvbkVudGl0eUFkZGVkKGVudGl0eTogRW50aXR5KTogdm9pZCB7XHJcbiAgICAgICAgaWYgKHRoaXMuX3BsYXllciA9PSBudWxsKSB7XHJcbiAgICAgICAgICAgIGxldCBwID0gZW50aXR5LmdldEJlaGF2aW9yT2ZUeXBlKFBsYXllcik7XHJcblxyXG4gICAgICAgICAgICBpZiAocCAhPT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fcGxheWVyID0gcDtcclxuICAgICAgICAgICAgICAgIHRoaXMuX3BsYXllck1vdmVtZW50ID0gPE1vdmVtZW50PmVudGl0eS5nZXRCZWhhdmlvck9mVHlwZShNb3ZlbWVudCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9wbGF5ZXJDb2xsaWRlciA9IDxCb3hDb2xsaWRlcj5lbnRpdHkuZ2V0QmVoYXZpb3JPZlR5cGUoQm94Q29sbGlkZXIpO1xyXG5cclxuICAgICAgICAgICAgICAgIHRoaXMuX3BsYXllckNvbGxpZGVyLm9uKFwiY29sbGlzaW9uXCIsIG8gPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiY29sbGlzaW9uIHdpdGggXCIgKyBvKTtcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIG9uRW50aXR5UmVtb3ZlZChlbnRpdHk6IEVudGl0eSk6IHZvaWQge1xyXG5cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgb25FbnRpdHlNb2RpZmllZChlbnRpdHk6IEVudGl0eSk6IHZvaWQge1xyXG5cclxuICAgIH1cclxufSIsImltcG9ydCB7IElSZW5kZXJTeXN0ZW0gfSBmcm9tIFwiLi4vaVJlbmRlclN5c3RlbVwiO1xyXG5pbXBvcnQgeyBFbnRpdHkgfSBmcm9tIFwiLi4vZW50aXR5XCI7XHJcbmltcG9ydCB7IEtleWVkQ29sbGVjdGlvbiB9IGZyb20gXCIuLi8uLi91dGlscy9rZXllZC1jb2xsZWN0aW9uXCI7XHJcbmltcG9ydCB7IFNwcml0ZSB9IGZyb20gXCIuLi9jb21wb25lbnRzL3Nwcml0ZVwiO1xyXG5cclxuZXhwb3J0IGNsYXNzIFJlbmRlclN5c3RlbSBpbXBsZW1lbnRzIElSZW5kZXJTeXN0ZW0ge1xyXG5cclxuICAgIHByaXZhdGUgX3Nwcml0ZXNCeUlkOiBLZXllZENvbGxlY3Rpb248U3ByaXRlPjtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICB0aGlzLl9zcHJpdGVzQnlJZCA9IG5ldyBLZXllZENvbGxlY3Rpb248U3ByaXRlPigpO1xyXG4gICAgfVxyXG5cclxuICAgIGRyYXcoY3R4OiBDYW52YXNSZW5kZXJpbmdDb250ZXh0MkQpOiB2b2lkIHtcclxuICAgICAgICBjdHguY2xlYXJSZWN0KDAsIDAsIGN0eC5jYW52YXMud2lkdGgsIGN0eC5jYW52YXMuaGVpZ2h0KTtcclxuICAgICAgICBjdHguZmlsbFN0eWxlID0gJ2JsYWNrJztcclxuICAgICAgICBjdHguZmlsbFJlY3QoMCwgMCwgY3R4LmNhbnZhcy53aWR0aCwgY3R4LmNhbnZhcy5oZWlnaHQpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIGZvciAobGV0IHMgb2YgdGhpcy5fc3ByaXRlc0J5SWQudmFsdWVzKCkpIHtcclxuICAgICAgICAgICAgbGV0IHBvcyA9IHMub3duZXIudHJhbnNmb3JtLmxvY2FsUG9zaXRpb247XHJcblxyXG4gICAgICAgICAgICBjdHguZHJhd0ltYWdlKHMuaW1nLCBNYXRoLmZsb29yKHBvcy54KSwgTWF0aC5mbG9vcihwb3MueSkpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBvbkVudGl0eUFkZGVkKGVudGl0eTogRW50aXR5KTogdm9pZCB7XHJcbiAgICAgICAgbGV0IHMgPSBlbnRpdHkuZ2V0QmVoYXZpb3JPZlR5cGUoU3ByaXRlKTtcclxuICAgICAgICBpZiAocyAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX3Nwcml0ZXNCeUlkLmFkZChzLm93bmVyLnVpZCwgcyk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIG9uRW50aXR5UmVtb3ZlZChlbnRpdHk6IEVudGl0eSk6IHZvaWQge1xyXG4gICAgICAgIFxyXG4gICAgfVxyXG5cclxuICAgIG9uRW50aXR5TW9kaWZpZWQoZW50aXR5OiBFbnRpdHkpOiB2b2lkIHtcclxuICAgICAgICBcclxuICAgIH1cclxufVxyXG4iLCJleHBvcnQgZW51bSBLZXlDb2RlIHtcclxuICAgIEJBQ0tTUEFDRSA9IDgsXHJcbiAgICBUQUIgPSA5LFxyXG4gICAgRU5URVIgPSAxMyxcclxuICAgIFNISUZUID0gMTYsXHJcbiAgICBDVFJMID0gMTcsXHJcbiAgICBBTFQgPSAxOCxcclxuICAgIFBBVVNFID0gMTksXHJcbiAgICBDQVBTX0xPQ0sgPSAyMCxcclxuICAgIEVTQ0FQRSA9IDI3LFxyXG4gICAgU1BBQ0UgPSAzMixcclxuICAgIFBBR0VfVVAgPSAzMyxcclxuICAgIFBBR0VfRE9XTiA9IDM0LFxyXG4gICAgRU5EID0gMzUsXHJcbiAgICBIT01FID0gMzYsXHJcbiAgICBMRUZUX0FSUk9XID0gMzcsXHJcbiAgICBVUF9BUlJPVyA9IDM4LFxyXG4gICAgUklHSFRfQVJST1cgPSAzOSxcclxuICAgIERPV05fQVJST1cgPSA0MCxcclxuICAgIElOU0VSVCA9IDQ1LFxyXG4gICAgREVMRVRFID0gNDYsXHJcbiAgICBLRVlfMCA9IDQ4LFxyXG4gICAgS0VZXzEgPSA0OSxcclxuICAgIEtFWV8yID0gNTAsXHJcbiAgICBLRVlfMyA9IDUxLFxyXG4gICAgS0VZXzQgPSA1MixcclxuICAgIEtFWV81ID0gNTMsXHJcbiAgICBLRVlfNiA9IDU0LFxyXG4gICAgS0VZXzcgPSA1NSxcclxuICAgIEtFWV84ID0gNTYsXHJcbiAgICBLRVlfOSA9IDU3LFxyXG4gICAgS0VZX0EgPSA2NSxcclxuICAgIEtFWV9CID0gNjYsXHJcbiAgICBLRVlfQyA9IDY3LFxyXG4gICAgS0VZX0QgPSA2OCxcclxuICAgIEtFWV9FID0gNjksXHJcbiAgICBLRVlfRiA9IDcwLFxyXG4gICAgS0VZX0cgPSA3MSxcclxuICAgIEtFWV9IID0gNzIsXHJcbiAgICBLRVlfSSA9IDczLFxyXG4gICAgS0VZX0ogPSA3NCxcclxuICAgIEtFWV9LID0gNzUsXHJcbiAgICBLRVlfTCA9IDc2LFxyXG4gICAgS0VZX00gPSA3NyxcclxuICAgIEtFWV9OID0gNzgsXHJcbiAgICBLRVlfTyA9IDc5LFxyXG4gICAgS0VZX1AgPSA4MCxcclxuICAgIEtFWV9RID0gODEsXHJcbiAgICBLRVlfUiA9IDgyLFxyXG4gICAgS0VZX1MgPSA4MyxcclxuICAgIEtFWV9UID0gODQsXHJcbiAgICBLRVlfVSA9IDg1LFxyXG4gICAgS0VZX1YgPSA4NixcclxuICAgIEtFWV9XID0gODcsXHJcbiAgICBLRVlfWCA9IDg4LFxyXG4gICAgS0VZX1kgPSA4OSxcclxuICAgIEtFWV9aID0gOTAsXHJcbiAgICBMRUZUX01FVEEgPSA5MSxcclxuICAgIFJJR0hUX01FVEEgPSA5MixcclxuICAgIFNFTEVDVCA9IDkzLFxyXG4gICAgTlVNUEFEXzAgPSA5NixcclxuICAgIE5VTVBBRF8xID0gOTcsXHJcbiAgICBOVU1QQURfMiA9IDk4LFxyXG4gICAgTlVNUEFEXzMgPSA5OSxcclxuICAgIE5VTVBBRF80ID0gMTAwLFxyXG4gICAgTlVNUEFEXzUgPSAxMDEsXHJcbiAgICBOVU1QQURfNiA9IDEwMixcclxuICAgIE5VTVBBRF83ID0gMTAzLFxyXG4gICAgTlVNUEFEXzggPSAxMDQsXHJcbiAgICBOVU1QQURfOSA9IDEwNSxcclxuICAgIE1VTFRJUExZID0gMTA2LFxyXG4gICAgQUREID0gMTA3LFxyXG4gICAgU1VCVFJBQ1QgPSAxMDksXHJcbiAgICBERUNJTUFMID0gMTEwLFxyXG4gICAgRElWSURFID0gMTExLFxyXG4gICAgRjEgPSAxMTIsXHJcbiAgICBGMiA9IDExMyxcclxuICAgIEYzID0gMTE0LFxyXG4gICAgRjQgPSAxMTUsXHJcbiAgICBGNSA9IDExNixcclxuICAgIEY2ID0gMTE3LFxyXG4gICAgRjcgPSAxMTgsXHJcbiAgICBGOCA9IDExOSxcclxuICAgIEY5ID0gMTIwLFxyXG4gICAgRjEwID0gMTIxLFxyXG4gICAgRjExID0gMTIyLFxyXG4gICAgRjEyID0gMTIzLFxyXG4gICAgTlVNX0xPQ0sgPSAxNDQsXHJcbiAgICBTQ1JPTExfTE9DSyA9IDE0NSxcclxuICAgIFNFTUlDT0xPTiA9IDE4NixcclxuICAgIEVRVUFMUyA9IDE4NyxcclxuICAgIENPTU1BID0gMTg4LFxyXG4gICAgREFTSCA9IDE4OSxcclxuICAgIFBFUklPRCA9IDE5MCxcclxuICAgIEZPUldBUkRfU0xBU0ggPSAxOTEsXHJcbiAgICBHUkFWRV9BQ0NFTlQgPSAxOTIsXHJcbiAgICBPUEVOX0JSQUNLRVQgPSAyMTksXHJcbiAgICBCQUNLX1NMQVNIID0gMjIwLFxyXG4gICAgQ0xPU0VfQlJBQ0tFVCA9IDIyMSxcclxuICAgIFNJTkdMRV9RVU9URSA9IDIyMlxyXG59O1xyXG5cclxuZXhwb3J0IGNsYXNzIEtleWJvYXJkIHtcclxuICAgIHByaXZhdGUgc3RhdGljIGtleXM6IGJvb2xlYW5bXSA9IFtdO1xyXG4gICAgcHJpdmF0ZSBzdGF0aWMgcHJlc3NlZDogYm9vbGVhbltdID0gW107XHJcblxyXG4gICAgc3RhdGljIGluaXRpYWxpemUoKTogdm9pZCB7XHJcbiAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJrZXlkb3duXCIsIGUgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLmtleXNbZS5rZXlDb2RlXSA9IHRydWU7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJrZXl1cFwiLCBlID0+IHtcclxuICAgICAgICAgICAgdGhpcy5rZXlzW2Uua2V5Q29kZV0gPSBmYWxzZTtcclxuICAgICAgICB9KTtcclxuICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcImtleXByZXNzXCIsIGUgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLnByZXNzZWRbZS5rZXlDb2RlXSA9IHRydWU7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgc3RhdGljIHRpY2soKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5wcmVzc2VkLmxlbmd0aCA9IDA7XHJcbiAgICB9XHJcblxyXG4gICAgc3RhdGljIGlzS2V5RG93bihjb2RlOiBLZXlDb2RlKTogYm9vbGVhbiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMua2V5c1tjb2RlXTtcclxuICAgIH1cclxuXHJcbiAgICBzdGF0aWMgaXNLZXlVcChjb2RlOiBLZXlDb2RlKTogYm9vbGVhbiB7XHJcbiAgICAgICAgcmV0dXJuICF0aGlzLmtleXNbY29kZV07XHJcbiAgICB9XHJcblxyXG4gICAgc3RhdGljIGlzS2V5UHJlc3NlZChjb2RlOiBLZXlDb2RlKTogYm9vbGVhbiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMucHJlc3NlZFtjb2RlXTtcclxuICAgIH1cclxufVxyXG4iLCJpbXBvcnQgeyBFbmdpbmUgfSBmcm9tIFwiLi9jb3JlL2VuZ2luZVwiO1xyXG5pbXBvcnQgeyBTY2VuZSB9IGZyb20gXCIuL2NvcmUvc2NlbmVcIjtcclxuaW1wb3J0IHsgRW50aXR5IH0gZnJvbSBcIi4vY29yZS9lbnRpdHlcIjtcclxuaW1wb3J0IHsgVmVjdG9yMiB9IGZyb20gXCIuL21hdGgvdmVjdG9yMlwiO1xyXG5pbXBvcnQgeyBTcHJpdGUgfSBmcm9tIFwiLi9jb3JlL2NvbXBvbmVudHMvc3ByaXRlXCI7XHJcbmltcG9ydCB7IFJlbmRlclN5c3RlbSB9IGZyb20gXCIuL2NvcmUvc3lzdGVtcy9yZW5kZXJTeXN0ZW1cIjtcclxuaW1wb3J0IHsgTW92ZW1lbnQgfSBmcm9tIFwiLi9jb3JlL2NvbXBvbmVudHMvbW92ZW1lbnRcIjtcclxuaW1wb3J0IHsgTW92ZW1lbnRTeXN0ZW0gfSBmcm9tIFwiLi9jb3JlL3N5c3RlbXMvbW92ZW1lbnRTeXN0ZW1cIjtcclxuaW1wb3J0IHsgUGxheWVyIH0gZnJvbSBcIi4vY29yZS9jb21wb25lbnRzL3BsYXllclwiO1xyXG5pbXBvcnQgeyBQbGF5ZXJDb250cm9sbGVyU3lzdGVtIH0gZnJvbSBcIi4vY29yZS9zeXN0ZW1zL3BsYXllckNvbnRyb2xsZXJTeXN0ZW1cIjtcclxuaW1wb3J0IHsgQnJ1dGVGb3JjZUNvbGxpc2lvblN5c3RlbSB9IGZyb20gXCIuL2NvcmUvc3lzdGVtcy9icnV0ZUZvcmNlQ29sbGlzaW9uU3lzdGVtXCI7XHJcbmltcG9ydCB7IEJveENvbGxpZGVyIH0gZnJvbSBcIi4vY29yZS9jb21wb25lbnRzL2JveENvbGxpZGVyXCI7XHJcblxyXG53aW5kb3cub25sb2FkID0gKCkgPT4ge1xyXG4gICAgbGV0IGUgPSBuZXcgRW50aXR5KFxyXG4gICAgICAgIFwic3RldmVcIixcclxuICAgICAgICBWZWN0b3IyLnplcm8sXHJcbiAgICAgICAgW1xyXG4gICAgICAgICAgICBuZXcgU3ByaXRlKFwiLi9hc3NldHMvcGxheWVyLnBuZ1wiKSxcclxuICAgICAgICAgICAgbmV3IE1vdmVtZW50KCksXHJcbiAgICAgICAgICAgIG5ldyBQbGF5ZXIoMywgMzApLFxyXG4gICAgICAgICAgICBuZXcgQm94Q29sbGlkZXIoMCwgMCwgNDAsIDUwKVxyXG4gICAgICAgIF1cclxuICAgICk7XHJcblxyXG4gICAgbGV0IGUyID0gbmV3IEVudGl0eShcclxuICAgICAgICBcInBvb1wiLFxyXG4gICAgICAgIG5ldyBWZWN0b3IyKDEwMCwgMTAwKSxcclxuICAgICAgICBbXHJcbiAgICAgICAgICAgIG5ldyBTcHJpdGUoXCIuL2Fzc2V0cy9wbGF5ZXIucG5nXCIpLFxyXG4gICAgICAgICAgICBuZXcgQm94Q29sbGlkZXIoMCwgMCwgNDAsIDUwKVxyXG4gICAgICAgIF1cclxuICAgICk7XHJcblxyXG4gICAgbGV0IHMgPSBuZXcgU2NlbmUoXCJsZXZlbDFcIik7XHJcbiAgICBzLmFkZChlKTtcclxuICAgIHMuYWRkKGUyKTtcclxuXHJcbiAgICBsZXQgZW5naW5lID0gbmV3IEVuZ2luZSh7XHJcbiAgICAgICAgZW50cnk6IHMsXHJcbiAgICAgICAgbG9naWNTeXN0ZW1zOiBbXHJcbiAgICAgICAgICAgIG5ldyBQbGF5ZXJDb250cm9sbGVyU3lzdGVtKCksXHJcbiAgICAgICAgICAgIG5ldyBNb3ZlbWVudFN5c3RlbSgpLFxyXG4gICAgICAgICAgICBuZXcgQnJ1dGVGb3JjZUNvbGxpc2lvblN5c3RlbSgpXHJcbiAgICAgICAgXSxcclxuICAgICAgICByZW5kZXJTeXN0ZW1zOiBbXHJcbiAgICAgICAgICAgIG5ldyBSZW5kZXJTeXN0ZW0oKVxyXG4gICAgICAgIF1cclxuICAgIH0pO1xyXG5cclxuICAgIGVuZ2luZS5zdGFydCgpO1xyXG59IiwiZXhwb3J0IGNsYXNzIFJlY3Qge1xyXG4gICAgcHVibGljIHg6IG51bWJlcjtcclxuICAgIHB1YmxpYyB5OiBudW1iZXI7XHJcbiAgICBwdWJsaWMgd2lkdGg6IG51bWJlcjtcclxuICAgIHB1YmxpYyBoZWlnaHQ6IG51bWJlcjtcclxuXHJcbiAgICBjb25zdHJ1Y3Rvcih4PzogbnVtYmVyLCB5PzogbnVtYmVyLCB3PzogbnVtYmVyLCBoPzogbnVtYmVyKSB7XHJcbiAgICAgICAgdGhpcy54ID0geCB8fCAwO1xyXG4gICAgICAgIHRoaXMueSA9IHkgfHwgMDtcclxuICAgICAgICB0aGlzLndpZHRoID0gdyB8fCAwO1xyXG4gICAgICAgIHRoaXMuaGVpZ2h0ID0gaCB8fCAwO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBvdmVybGFwcyhyZWN0OiBSZWN0KTogYm9vbGVhbiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMueCA8IHJlY3QueCArIHJlY3Qud2lkdGggXHJcbiAgICAgICAgJiYgdGhpcy54ICsgdGhpcy53aWR0aCA+IHJlY3QueCBcclxuICAgICAgICAmJiB0aGlzLnkgPCByZWN0LnkgKyByZWN0LmhlaWdodFxyXG4gICAgICAgICYmIHRoaXMueSArIHRoaXMuaGVpZ2h0ID4gcmVjdC55XHJcbiAgICB9XHJcbn1cclxuIiwiaW1wb3J0IHsgVmVjdG9yMiB9IGZyb20gXCIuL3ZlY3RvcjJcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBUcmFuc2Zvcm0ge1xyXG5cclxuICAgIHByaXZhdGUgX2xvY2FsUG9zaXRpb246IFZlY3RvcjI7XHJcbiAgICBwcml2YXRlIF9sb2NhbFJvdGF0aW9uOiBudW1iZXI7XHJcbiAgICBwcml2YXRlIF9sb2NhbFNjYWxlOiBudW1iZXI7XHJcblxyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgdGhpcy5fbG9jYWxQb3NpdGlvbiA9IFZlY3RvcjIuemVybztcclxuICAgICAgICB0aGlzLl9sb2NhbFJvdGF0aW9uID0gMDtcclxuICAgICAgICB0aGlzLl9sb2NhbFNjYWxlID0gMTtcclxuICAgIH1cclxuXHJcbiAgICBnZXQgbG9jYWxQb3NpdGlvbigpOiBWZWN0b3IyIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fbG9jYWxQb3NpdGlvbjtcclxuICAgIH1cclxuXHJcbiAgICBzZXQgbG9jYWxQb3NpdGlvbih2YWx1ZSkge1xyXG4gICAgICAgIHRoaXMuX2xvY2FsUG9zaXRpb24gPSB2YWx1ZTtcclxuICAgICAgICBcclxuICAgICAgICAvLyBzZXQgZGlydHlcclxuICAgIH1cclxufSIsImV4cG9ydCBjbGFzcyBWZWN0b3IyIHtcclxuXHJcbiAgICAvLyBjb21wb25lbnRzXHJcbiAgICBwdWJsaWMgeDogbnVtYmVyO1xyXG4gICAgcHVibGljIHk6IG51bWJlcjtcclxuXHJcbiAgICBjb25zdHJ1Y3Rvcih4PzogbnVtYmVyLCB5PzogbnVtYmVyKSB7XHJcbiAgICAgICAgdGhpcy54ID0geCB8fCAwO1xyXG4gICAgICAgIHRoaXMueSA9IHkgfHwgMDtcclxuICAgIH1cclxuXHJcbiAgICBnZXQgbGVuZ3RoKCk6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIE1hdGguc3FydChWZWN0b3IyLmRvdCh0aGlzLCB0aGlzKSk7XHJcbiAgICB9XHJcblxyXG4gICAgc3RhdGljIGdldCB6ZXJvKCk6IFZlY3RvcjIge1xyXG4gICAgICAgIHJldHVybiBuZXcgVmVjdG9yMigwLCAwKTtcclxuICAgIH1cclxuXHJcbiAgICBzdGF0aWMgYWRkKHYxOiBWZWN0b3IyLCB2MjogVmVjdG9yMik6IFZlY3RvcjIge1xyXG4gICAgICAgIHJldHVybiBuZXcgVmVjdG9yMih2MS54ICsgdjIueCwgdjEueSArIHYyLnkpO1xyXG4gICAgfVxyXG5cclxuICAgIHN0YXRpYyBzdWJ0cmFjdCh2MTogVmVjdG9yMiwgdjI6IFZlY3RvcjIpOiBWZWN0b3IyIHtcclxuICAgICAgICByZXR1cm4gbmV3IFZlY3RvcjIodjEueCAtIHYyLngsIHYxLnkgLSB2Mi55KTtcclxuICAgIH1cclxuXHJcbiAgICBzdGF0aWMgbXVsdGlwbHkodjogVmVjdG9yMiwgc2NhbGFyOiBudW1iZXIpOiBWZWN0b3IyIHtcclxuICAgICAgICByZXR1cm4gbmV3IFZlY3RvcjIodi54ICogc2NhbGFyLCB2LnkgKiBzY2FsYXIpO1xyXG4gICAgfVxyXG5cclxuICAgIHN0YXRpYyBkaXZpZGUodjogVmVjdG9yMiwgc2NhbGFyOiBudW1iZXIpOiBWZWN0b3IyIHtcclxuICAgICAgICByZXR1cm4gbmV3IFZlY3RvcjIodi54IC8gc2NhbGFyLCB2LnkgLyBzY2FsYXIpO1xyXG4gICAgfVxyXG5cclxuICAgIHN0YXRpYyBkb3QodjE6IFZlY3RvcjIsIHYyOiBWZWN0b3IyKTogbnVtYmVyIHtcclxuICAgICAgICByZXR1cm4gKHYxLnggKiB2Mi54KSArICh2MS55ICogdjIueSk7XHJcbiAgICB9XHJcbn1cclxuIiwiZXhwb3J0IGNsYXNzIElkR2VuZXJhdG9yIHtcclxuICAgIFxyXG4gICAgcHJpdmF0ZSBfbmV4dElkOiBudW1iZXIgPSAwO1xyXG4gICAgcHJpdmF0ZSBfYXZhaWxhYmxlSWRzOiBudW1iZXJbXSA9IFtdO1xyXG5cclxuICAgIHB1YmxpYyBwb3BJZCgpOiBudW1iZXIge1xyXG4gICAgICAgIGlmICh0aGlzLl9hdmFpbGFibGVJZHMubGVuZ3RoID09PSAwKSB7XHJcbiAgICAgICAgICAgIGxldCBpZCA9IHRoaXMuX25leHRJZDtcclxuICAgICAgICAgICAgdGhpcy5fbmV4dElkKys7XHJcbiAgICAgICAgICAgIHJldHVybiBpZDtcclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IGlkID0gPG51bWJlcj50aGlzLl9hdmFpbGFibGVJZHMucG9wKCk7XHJcbiAgICAgICAgcmV0dXJuIGlkO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBwdXNoSWQoaWQ6IG51bWJlcik6IHZvaWQge1xyXG4gICAgICAgIGlmICghdGhpcy5fYXZhaWxhYmxlSWRzLnNvbWUoaSA9PiBpID09PSBpZCkpIHtcclxuICAgICAgICAgICAgdGhpcy5fYXZhaWxhYmxlSWRzLnB1c2goaWQpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufSIsImV4cG9ydCBpbnRlcmZhY2UgSUtleWVkQ29sbGVjdGlvbjxUPiB7XHJcbiAgICBhZGQoa2V5OiBudW1iZXIgfCBzdHJpbmcsIHZhbHVlOiBUKTogdm9pZDtcclxuICAgIGNvbnRhaW5zS2V5KGtleTogbnVtYmVyIHwgc3RyaW5nKTogYm9vbGVhbjtcclxuICAgIGNvdW50KCk6IG51bWJlcjtcclxuICAgIGl0ZW0oa2V5OiBudW1iZXIgfCBzdHJpbmcpOiBUO1xyXG4gICAgcmVtb3ZlKGtleTogbnVtYmVyIHwgc3RyaW5nKTogVDtcclxuICAgIHZhbHVlcygpOiBUW107XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBLZXllZENvbGxlY3Rpb248VD4gaW1wbGVtZW50cyBJS2V5ZWRDb2xsZWN0aW9uPFQ+IHtcclxuICAgIHByaXZhdGUgX2l0ZW1zOiB7IFtpbmRleDogbnVtYmVyXTogVCB9ID0ge307XHJcbiBcclxuICAgIHByaXZhdGUgX2NvdW50OiBudW1iZXIgPSAwO1xyXG4gXHJcbiAgICBwdWJsaWMgY29udGFpbnNLZXkoa2V5OiBudW1iZXIpOiBib29sZWFuIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5faXRlbXMuaGFzT3duUHJvcGVydHkoa2V5KTtcclxuICAgIH1cclxuIFxyXG4gICAgcHVibGljIGNvdW50KCk6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2NvdW50O1xyXG4gICAgfVxyXG4gXHJcbiAgICBwdWJsaWMgYWRkKGtleTogbnVtYmVyLCB2YWx1ZTogVCkge1xyXG4gICAgICAgIGlmKCF0aGlzLl9pdGVtcy5oYXNPd25Qcm9wZXJ0eShrZXkpKVxyXG4gICAgICAgICAgICAgdGhpcy5fY291bnQrKztcclxuIFxyXG4gICAgICAgIHRoaXMuX2l0ZW1zW2tleV0gPSB2YWx1ZTtcclxuICAgIH1cclxuIFxyXG4gICAgcHVibGljIHJlbW92ZShrZXk6IG51bWJlcik6IFQge1xyXG4gICAgICAgIHZhciB2YWwgPSB0aGlzLl9pdGVtc1trZXldO1xyXG4gICAgICAgIGRlbGV0ZSB0aGlzLl9pdGVtc1trZXldO1xyXG4gICAgICAgIHRoaXMuX2NvdW50LS07XHJcbiAgICAgICAgcmV0dXJuIHZhbDtcclxuICAgIH1cclxuIFxyXG4gICAgcHVibGljIGl0ZW0oa2V5OiBudW1iZXIpOiBUIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5faXRlbXNba2V5XTtcclxuICAgIH1cclxuIFxyXG4gICAgcHVibGljIHZhbHVlcygpOiBUW10ge1xyXG4gICAgICAgIHZhciB2YWx1ZXM6IFRbXSA9IFtdO1xyXG4gXHJcbiAgICAgICAgZm9yICh2YXIgcHJvcCBpbiB0aGlzLl9pdGVtcykge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5faXRlbXMuaGFzT3duUHJvcGVydHkocHJvcCkpIHtcclxuICAgICAgICAgICAgICAgIHZhbHVlcy5wdXNoKHRoaXMuX2l0ZW1zW3Byb3BdKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuIFxyXG4gICAgICAgIHJldHVybiB2YWx1ZXM7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGNsZWFyKCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuX2l0ZW1zID0gW107XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBTdHJLZXllZENvbGxlY3Rpb248VD4gaW1wbGVtZW50cyBJS2V5ZWRDb2xsZWN0aW9uPFQ+IHtcclxuICAgIHByaXZhdGUgX2l0ZW1zOiB7IFtpbmRleDogc3RyaW5nXTogVCB9ID0ge307XHJcbiBcclxuICAgIHByaXZhdGUgX2NvdW50OiBudW1iZXIgPSAwO1xyXG4gXHJcbiAgICBwdWJsaWMgY29udGFpbnNLZXkoa2V5OiBzdHJpbmcpOiBib29sZWFuIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5faXRlbXMuaGFzT3duUHJvcGVydHkoa2V5KTtcclxuICAgIH1cclxuIFxyXG4gICAgcHVibGljIGNvdW50KCk6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2NvdW50O1xyXG4gICAgfVxyXG4gXHJcbiAgICBwdWJsaWMgYWRkKGtleTogc3RyaW5nLCB2YWx1ZTogVCkge1xyXG4gICAgICAgIGlmKCF0aGlzLl9pdGVtcy5oYXNPd25Qcm9wZXJ0eShrZXkpKVxyXG4gICAgICAgICAgICAgdGhpcy5fY291bnQrKztcclxuIFxyXG4gICAgICAgIHRoaXMuX2l0ZW1zW2tleV0gPSB2YWx1ZTtcclxuICAgIH1cclxuIFxyXG4gICAgcHVibGljIHJlbW92ZShrZXk6IHN0cmluZyk6IFQge1xyXG4gICAgICAgIHZhciB2YWwgPSB0aGlzLl9pdGVtc1trZXldO1xyXG4gICAgICAgIGRlbGV0ZSB0aGlzLl9pdGVtc1trZXldO1xyXG4gICAgICAgIHRoaXMuX2NvdW50LS07XHJcbiAgICAgICAgcmV0dXJuIHZhbDtcclxuICAgIH1cclxuIFxyXG4gICAgcHVibGljIGl0ZW0oa2V5OiBzdHJpbmcpOiBUIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5faXRlbXNba2V5XTtcclxuICAgIH1cclxuIFxyXG4gICAgcHVibGljIGtleXMoKTogc3RyaW5nW10ge1xyXG4gICAgICAgIHZhciBrZXlTZXQ6IHN0cmluZ1tdID0gW107XHJcbiBcclxuICAgICAgICBmb3IgKHZhciBwcm9wIGluIHRoaXMuX2l0ZW1zKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLl9pdGVtcy5oYXNPd25Qcm9wZXJ0eShwcm9wKSkge1xyXG4gICAgICAgICAgICAgICAga2V5U2V0LnB1c2gocHJvcCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiBcclxuICAgICAgICByZXR1cm4ga2V5U2V0O1xyXG4gICAgfVxyXG4gXHJcbiAgICBwdWJsaWMgdmFsdWVzKCk6IFRbXSB7XHJcbiAgICAgICAgdmFyIHZhbHVlczogVFtdID0gW107XHJcbiBcclxuICAgICAgICBmb3IgKHZhciBwcm9wIGluIHRoaXMuX2l0ZW1zKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLl9pdGVtcy5oYXNPd25Qcm9wZXJ0eShwcm9wKSkge1xyXG4gICAgICAgICAgICAgICAgdmFsdWVzLnB1c2godGhpcy5faXRlbXNbcHJvcF0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gXHJcbiAgICAgICAgcmV0dXJuIHZhbHVlcztcclxuICAgIH1cclxufVxyXG4iLCJpbXBvcnQgeyBTdHJLZXllZENvbGxlY3Rpb24gfSBmcm9tIFwiLi9rZXllZC1jb2xsZWN0aW9uXCI7XHJcbmltcG9ydCAqIGFzIHBhdGggZnJvbSAncGF0aCc7XHJcblxyXG5jb25zdCBJTUFHRV9FWFQgPSBbJy5qcGcnLCAnLnBuZyddO1xyXG5cclxuZXhwb3J0IGNsYXNzIFJlc291cmNlTG9hZGVyIHtcclxuXHJcbiAgICBwcml2YXRlIF9jYWNoZTogU3RyS2V5ZWRDb2xsZWN0aW9uPGFueT47XHJcbiAgICBwcml2YXRlIF9xdWV1ZTogU3RyS2V5ZWRDb2xsZWN0aW9uPEZ1bmN0aW9uW10+O1xyXG4gICAgcHJpdmF0ZSBfbG9hZENvdW50OiBudW1iZXIgPSAwO1xyXG4gICAgcHJpdmF0ZSBfbG9hZGVkQ291bnQ6IG51bWJlciA9IDA7XHJcbiAgICBwcml2YXRlIF9sb2FkZWQ6IGJvb2xlYW4gPSBmYWxzZTtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICB0aGlzLl9jYWNoZSA9IG5ldyBTdHJLZXllZENvbGxlY3Rpb248YW55PigpO1xyXG4gICAgICAgIHRoaXMuX3F1ZXVlID0gbmV3IFN0cktleWVkQ29sbGVjdGlvbjxGdW5jdGlvbltdPigpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXRSZXNvdXJjZTxUIGV4dGVuZHMgSFRNTEltYWdlRWxlbWVudCB8IEhUTUxBdWRpb0VsZW1lbnQ+KHBhdGg6IHN0cmluZyk6IFQge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9jYWNoZS5pdGVtKHBhdGgpIGFzIFQ7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHF1ZXVlKHJlczogc3RyaW5nLCBjYWxsYmFjazogKGltZzogSFRNTEltYWdlRWxlbWVudCkgPT4gdm9pZCk6IHZvaWQge1xyXG4gICAgICAgIGlmICh0aGlzLl9sb2FkZWQpIHtcclxuICAgICAgICAgICAgY2FsbGJhY2sodGhpcy5fY2FjaGUuaXRlbShyZXMpKTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKHRoaXMuX3F1ZXVlLmNvbnRhaW5zS2V5KHJlcykpIHtcclxuICAgICAgICAgICAgbGV0IHJlc291cmNlID0gdGhpcy5fcXVldWUuaXRlbShyZXMpO1xyXG4gICAgICAgICAgICByZXNvdXJjZS5wdXNoKGNhbGxiYWNrKTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLl9xdWV1ZS5hZGQocmVzLCBbY2FsbGJhY2tdKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgbG9hZChvbkNvbXBsZXRlOiBGdW5jdGlvbikge1xyXG4gICAgICAgIGxldCBrZXlzID0gdGhpcy5fcXVldWUua2V5cygpO1xyXG5cclxuICAgICAgICB0aGlzLl9sb2FkQ291bnQgPSBrZXlzLmxlbmd0aDtcclxuXHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBrZXlzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGxldCBrZXkgPSBrZXlzW2ldO1xyXG5cclxuICAgICAgICAgICAgaWYgKElNQUdFX0VYVC5zb21lKHAgPT4gcCA9PT0gcGF0aC5leHRuYW1lKGtleSkpKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgaW1hZ2UgPSBuZXcgSW1hZ2UoKTtcclxuXHJcbiAgICAgICAgICAgICAgICBsZXQgdGhhdCA9IHRoaXM7XHJcbiAgICAgICAgICAgICAgICBpbWFnZS5vbmxvYWQgPSAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhhdC5fbG9hZGVkQ291bnQgKz0gMTtcclxuICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICBsZXQgY2FsbGJhY2tzID0gdGhpcy5fcXVldWUuaXRlbShrZXkpO1xyXG4gICAgICAgICAgICAgICAgICAgIGZvciAobGV0IGMgb2YgY2FsbGJhY2tzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGMoaW1hZ2UpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoYXQuX2xvYWRlZENvdW50ID09PSB0aGF0Ll9sb2FkQ291bnQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgb25Db21wbGV0ZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0Ll9sb2FkZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGltYWdlLnNyYyA9IGtleTtcclxuICAgICAgICAgICAgICAgIHRoYXQuX2NhY2hlLmFkZChrZXksIGltYWdlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxufSJdLCJzb3VyY2VSb290IjoiIn0=