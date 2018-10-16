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

/***/ "./src/core/box-collider.ts":
/*!**********************************!*\
  !*** ./src/core/box-collider.ts ***!
  \**********************************/
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
var rect_1 = __webpack_require__(/*! ../math/rect */ "./src/math/rect.ts");
var BoxCollider = (function (_super) {
    __extends(BoxCollider, _super);
    function BoxCollider(x, y, w, h) {
        var _this = _super.call(this) || this;
        _this._collisionTags = [];
        _this._rect = new rect_1.Rect(x, y, w, h);
        return _this;
    }
    BoxCollider.prototype.getRect = function () {
        this._rect.x = this._owner.position.x;
        this._rect.y = this._owner.position.y;
        return this._rect;
    };
    BoxCollider.prototype.setWidth = function (w) {
        this._rect.width = w;
    };
    BoxCollider.prototype.setHeight = function (h) {
        this._rect.height = h;
    };
    return BoxCollider;
}(behavior_1.Behavior));
exports.BoxCollider = BoxCollider;


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
var events_1 = __webpack_require__(/*! events */ "./node_modules/events/events.js");
var Entity = (function (_super) {
    __extends(Entity, _super);
    function Entity(opt) {
        var _this = _super.call(this) || this;
        _this._id = -1;
        _this._name = "";
        _this._behaviorsById = new keyed_collection_1.KeyedCollection();
        _this._behaviorsToUpdate = [];
        _this._idGen = new id_generator_1.IdGenerator();
        _this._eventEmitter = new events_1.EventEmitter();
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
    Entity.prototype.on = function (event, func) {
        this._eventEmitter.on(event, func);
    };
    Entity.prototype.emit = function (event) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        this._eventEmitter.emit(event, args);
    };
    Entity.prototype.off = function (event, func) {
        this._eventEmitter.off(event, func);
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
var box_collider_1 = __webpack_require__(/*! ./core/box-collider */ "./src/core/box-collider.ts");
var Player = (function (_super) {
    __extends(Player, _super);
    function Player() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._needsUpdate = true;
        return _this;
    }
    Player.prototype.update = function (dt) {
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
    return Player;
}(behavior_1.Behavior));
window.onload = function () {
    var e = new entity_1.Entity({
        name: "steve",
        behaviors: [
            new Player(),
            new sprite_1.Sprite("assets/player.png"),
            new box_collider_1.BoxCollider(0, 0, 64, 64)
        ],
        position: new vector2_1.Vector2()
    });
    var level = new level_1.Level();
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

/***/ "./src/math/rect.ts":
/*!**************************!*\
  !*** ./src/math/rect.ts ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Rect = (function () {
    function Rect(x, y, w, h) {
        this.x = x || 0;
        this.y = y || 0;
        this.width = w || 0;
        this.height = h || 0;
    }
    return Rect;
}());
exports.Rect = Rect;


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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2V2ZW50cy9ldmVudHMuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3BhdGgtYnJvd3NlcmlmeS9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvcHJvY2Vzcy9icm93c2VyLmpzIiwid2VicGFjazovLy8uL3NyYy9jb3JlL2JlaGF2aW9yLnRzIiwid2VicGFjazovLy8uL3NyYy9jb3JlL2JveC1jb2xsaWRlci50cyIsIndlYnBhY2s6Ly8vLi9zcmMvY29yZS9lbnRpdHkudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvcmUvbGV2ZWwudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvcmUvbS1nYW1lLnRzIiwid2VicGFjazovLy8uL3NyYy9jb3JlL21vZHVsZS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvY29yZS9zY2VuZS1ub2RlLnRzIiwid2VicGFjazovLy8uL3NyYy9jb3JlL3Nwcml0ZS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvaW5wdXQva2V5Ym9hcmQudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL21haW4udHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL21hdGgvcmVjdC50cyIsIndlYnBhY2s6Ly8vLi9zcmMvbWF0aC92ZWN0b3IyLnRzIiwid2VicGFjazovLy8uL3NyYy9tb2R1bGVzL3JlbmRlcmVyLnRzIiwid2VicGFjazovLy8uL3NyYy91dGlscy9pZC1nZW5lcmF0b3IudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3V0aWxzL2tleWVkLWNvbGxlY3Rpb24udHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3V0aWxzL3Jlc291cmNlLWxvYWRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxrREFBMEMsZ0NBQWdDO0FBQzFFO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsZ0VBQXdELGtCQUFrQjtBQUMxRTtBQUNBLHlEQUFpRCxjQUFjO0FBQy9EOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpREFBeUMsaUNBQWlDO0FBQzFFLHdIQUFnSCxtQkFBbUIsRUFBRTtBQUNySTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLG1DQUEyQiwwQkFBMEIsRUFBRTtBQUN2RCx5Q0FBaUMsZUFBZTtBQUNoRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQSw4REFBc0QsK0RBQStEOztBQUVySDtBQUNBOzs7QUFHQTtBQUNBOzs7Ozs7Ozs7Ozs7QUNsRkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0EsZUFBZSxTQUFTO0FBQ3hCO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxHQUFHO0FBQ0gsb0JBQW9CLFNBQVM7QUFDN0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7OztBQzdTQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0NBQWdDLFFBQVE7QUFDeEM7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLFVBQVUsTUFBTTtBQUNoQjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSw2QkFBNkIsSUFBSTtBQUNqQztBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxvQ0FBb0MsOEJBQThCO0FBQ2xFOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsVUFBVSxvQkFBb0I7QUFDOUI7QUFDQTs7QUFFQTtBQUNBLFVBQVUsVUFBVTtBQUNwQjtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxpQkFBaUIsWUFBWTtBQUM3QjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsK0JBQStCLHNCQUFzQjtBQUNyRDtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsbUJBQW1CLGVBQWU7QUFDbEM7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLGtDQUFrQztBQUNsQztBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7O0FDL05BO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7OztBQUlBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSx1QkFB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QyxVQUFVLEVBQUU7d0JBQ3ZDLFVBQVUsRUFBRSxDQUFDO3FCQUNoQjtnQkFDTCxDQUFDLENBQUMsQ0FBQztnQkFDSCxLQUFLLENBQUMsR0FBRyxHQUFHLEVBQUUsQ0FBQztnQkFDZixNQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxFQUFFLEVBQUUsS0FBSyxDQUFDLENBQUM7YUFDOUI7WUFDRCxJQUFJLE9BQUssUUFBUSxDQUFDLElBQUksQ0FBQyxXQUFDLElBQUksUUFBQyxLQUFLLElBQUksQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDLEVBQXRCLENBQXNCLENBQUMsRUFBRTtnQkFDakQsSUFBSSxLQUFLLEdBQUcsSUFBSSxLQUFLLEVBQUUsQ0FBQztnQkFDeEIsS0FBSyxDQUFDLGdCQUFnQixDQUFDLE1BQU0sRUFBRTtvQkFDM0IsS0FBSSxDQUFDLFlBQVksRUFBRSxDQUFDO29CQUNwQixJQUFJLEtBQUksQ0FBQyxZQUFZLEtBQUssS0FBSSxDQUFDLFVBQVUsRUFBRTt3QkFDdkMsVUFBVSxFQUFFLENBQUM7cUJBQ2hCO2dCQUNMLENBQUMsQ0FBQyxDQUFDO2dCQUNILEtBQUssQ0FBQyxHQUFHLEdBQUcsRUFBRSxDQUFDO2dCQUNmLE9BQUssTUFBTSxDQUFDLEdBQUcsQ0FBQyxFQUFFLEVBQUUsS0FBSyxDQUFDLENBQUM7YUFDOUI7UUFDTCxDQUFDOztRQXpCRCxLQUFlLFVBQVcsRUFBWCxTQUFJLENBQUMsTUFBTSxFQUFYLGNBQVcsRUFBWCxJQUFXO1lBQXJCLElBQUksRUFBRTtvQkFBRixFQUFFO1NBeUJWO0lBQ0wsQ0FBQztJQUNMLHFCQUFDO0FBQUQsQ0FBQztBQXJFWSx3Q0FBYyIsImZpbGUiOiJidW5kbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuL3NyYy9tYWluLnRzXCIpO1xuIiwiLy8gQ29weXJpZ2h0IEpveWVudCwgSW5jLiBhbmQgb3RoZXIgTm9kZSBjb250cmlidXRvcnMuXHJcbi8vXHJcbi8vIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhXHJcbi8vIGNvcHkgb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGVcclxuLy8gXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbCBpbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nXHJcbi8vIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCxcclxuLy8gZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGwgY29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdFxyXG4vLyBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzIGZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0byB0aGVcclxuLy8gZm9sbG93aW5nIGNvbmRpdGlvbnM6XHJcbi8vXHJcbi8vIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkXHJcbi8vIGluIGFsbCBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxyXG4vL1xyXG4vLyBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTXHJcbi8vIE9SIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0ZcclxuLy8gTUVSQ0hBTlRBQklMSVRZLCBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTlxyXG4vLyBOTyBFVkVOVCBTSEFMTCBUSEUgQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSxcclxuLy8gREFNQUdFUyBPUiBPVEhFUiBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SXHJcbi8vIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLCBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEVcclxuLy8gVVNFIE9SIE9USEVSIERFQUxJTkdTIElOIFRIRSBTT0ZUV0FSRS5cclxuXHJcbmZ1bmN0aW9uIEV2ZW50RW1pdHRlcigpIHtcclxuICB0aGlzLl9ldmVudHMgPSB0aGlzLl9ldmVudHMgfHwge307XHJcbiAgdGhpcy5fbWF4TGlzdGVuZXJzID0gdGhpcy5fbWF4TGlzdGVuZXJzIHx8IHVuZGVmaW5lZDtcclxufVxyXG5tb2R1bGUuZXhwb3J0cyA9IEV2ZW50RW1pdHRlcjtcclxuXHJcbi8vIEJhY2t3YXJkcy1jb21wYXQgd2l0aCBub2RlIDAuMTAueFxyXG5FdmVudEVtaXR0ZXIuRXZlbnRFbWl0dGVyID0gRXZlbnRFbWl0dGVyO1xyXG5cclxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5fZXZlbnRzID0gdW5kZWZpbmVkO1xyXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLl9tYXhMaXN0ZW5lcnMgPSB1bmRlZmluZWQ7XHJcblxyXG4vLyBCeSBkZWZhdWx0IEV2ZW50RW1pdHRlcnMgd2lsbCBwcmludCBhIHdhcm5pbmcgaWYgbW9yZSB0aGFuIDEwIGxpc3RlbmVycyBhcmVcclxuLy8gYWRkZWQgdG8gaXQuIFRoaXMgaXMgYSB1c2VmdWwgZGVmYXVsdCB3aGljaCBoZWxwcyBmaW5kaW5nIG1lbW9yeSBsZWFrcy5cclxuRXZlbnRFbWl0dGVyLmRlZmF1bHRNYXhMaXN0ZW5lcnMgPSAxMDtcclxuXHJcbi8vIE9idmlvdXNseSBub3QgYWxsIEVtaXR0ZXJzIHNob3VsZCBiZSBsaW1pdGVkIHRvIDEwLiBUaGlzIGZ1bmN0aW9uIGFsbG93c1xyXG4vLyB0aGF0IHRvIGJlIGluY3JlYXNlZC4gU2V0IHRvIHplcm8gZm9yIHVubGltaXRlZC5cclxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5zZXRNYXhMaXN0ZW5lcnMgPSBmdW5jdGlvbihuKSB7XHJcbiAgaWYgKCFpc051bWJlcihuKSB8fCBuIDwgMCB8fCBpc05hTihuKSlcclxuICAgIHRocm93IFR5cGVFcnJvcignbiBtdXN0IGJlIGEgcG9zaXRpdmUgbnVtYmVyJyk7XHJcbiAgdGhpcy5fbWF4TGlzdGVuZXJzID0gbjtcclxuICByZXR1cm4gdGhpcztcclxufTtcclxuXHJcbkV2ZW50RW1pdHRlci5wcm90b3R5cGUuZW1pdCA9IGZ1bmN0aW9uKHR5cGUpIHtcclxuICB2YXIgZXIsIGhhbmRsZXIsIGxlbiwgYXJncywgaSwgbGlzdGVuZXJzO1xyXG5cclxuICBpZiAoIXRoaXMuX2V2ZW50cylcclxuICAgIHRoaXMuX2V2ZW50cyA9IHt9O1xyXG5cclxuICAvLyBJZiB0aGVyZSBpcyBubyAnZXJyb3InIGV2ZW50IGxpc3RlbmVyIHRoZW4gdGhyb3cuXHJcbiAgaWYgKHR5cGUgPT09ICdlcnJvcicpIHtcclxuICAgIGlmICghdGhpcy5fZXZlbnRzLmVycm9yIHx8XHJcbiAgICAgICAgKGlzT2JqZWN0KHRoaXMuX2V2ZW50cy5lcnJvcikgJiYgIXRoaXMuX2V2ZW50cy5lcnJvci5sZW5ndGgpKSB7XHJcbiAgICAgIGVyID0gYXJndW1lbnRzWzFdO1xyXG4gICAgICBpZiAoZXIgaW5zdGFuY2VvZiBFcnJvcikge1xyXG4gICAgICAgIHRocm93IGVyOyAvLyBVbmhhbmRsZWQgJ2Vycm9yJyBldmVudFxyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIC8vIEF0IGxlYXN0IGdpdmUgc29tZSBraW5kIG9mIGNvbnRleHQgdG8gdGhlIHVzZXJcclxuICAgICAgICB2YXIgZXJyID0gbmV3IEVycm9yKCdVbmNhdWdodCwgdW5zcGVjaWZpZWQgXCJlcnJvclwiIGV2ZW50LiAoJyArIGVyICsgJyknKTtcclxuICAgICAgICBlcnIuY29udGV4dCA9IGVyO1xyXG4gICAgICAgIHRocm93IGVycjtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgaGFuZGxlciA9IHRoaXMuX2V2ZW50c1t0eXBlXTtcclxuXHJcbiAgaWYgKGlzVW5kZWZpbmVkKGhhbmRsZXIpKVxyXG4gICAgcmV0dXJuIGZhbHNlO1xyXG5cclxuICBpZiAoaXNGdW5jdGlvbihoYW5kbGVyKSkge1xyXG4gICAgc3dpdGNoIChhcmd1bWVudHMubGVuZ3RoKSB7XHJcbiAgICAgIC8vIGZhc3QgY2FzZXNcclxuICAgICAgY2FzZSAxOlxyXG4gICAgICAgIGhhbmRsZXIuY2FsbCh0aGlzKTtcclxuICAgICAgICBicmVhaztcclxuICAgICAgY2FzZSAyOlxyXG4gICAgICAgIGhhbmRsZXIuY2FsbCh0aGlzLCBhcmd1bWVudHNbMV0pO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBjYXNlIDM6XHJcbiAgICAgICAgaGFuZGxlci5jYWxsKHRoaXMsIGFyZ3VtZW50c1sxXSwgYXJndW1lbnRzWzJdKTtcclxuICAgICAgICBicmVhaztcclxuICAgICAgLy8gc2xvd2VyXHJcbiAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgYXJncyA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3VtZW50cywgMSk7XHJcbiAgICAgICAgaGFuZGxlci5hcHBseSh0aGlzLCBhcmdzKTtcclxuICAgIH1cclxuICB9IGVsc2UgaWYgKGlzT2JqZWN0KGhhbmRsZXIpKSB7XHJcbiAgICBhcmdzID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJndW1lbnRzLCAxKTtcclxuICAgIGxpc3RlbmVycyA9IGhhbmRsZXIuc2xpY2UoKTtcclxuICAgIGxlbiA9IGxpc3RlbmVycy5sZW5ndGg7XHJcbiAgICBmb3IgKGkgPSAwOyBpIDwgbGVuOyBpKyspXHJcbiAgICAgIGxpc3RlbmVyc1tpXS5hcHBseSh0aGlzLCBhcmdzKTtcclxuICB9XHJcblxyXG4gIHJldHVybiB0cnVlO1xyXG59O1xyXG5cclxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5hZGRMaXN0ZW5lciA9IGZ1bmN0aW9uKHR5cGUsIGxpc3RlbmVyKSB7XHJcbiAgdmFyIG07XHJcblxyXG4gIGlmICghaXNGdW5jdGlvbihsaXN0ZW5lcikpXHJcbiAgICB0aHJvdyBUeXBlRXJyb3IoJ2xpc3RlbmVyIG11c3QgYmUgYSBmdW5jdGlvbicpO1xyXG5cclxuICBpZiAoIXRoaXMuX2V2ZW50cylcclxuICAgIHRoaXMuX2V2ZW50cyA9IHt9O1xyXG5cclxuICAvLyBUbyBhdm9pZCByZWN1cnNpb24gaW4gdGhlIGNhc2UgdGhhdCB0eXBlID09PSBcIm5ld0xpc3RlbmVyXCIhIEJlZm9yZVxyXG4gIC8vIGFkZGluZyBpdCB0byB0aGUgbGlzdGVuZXJzLCBmaXJzdCBlbWl0IFwibmV3TGlzdGVuZXJcIi5cclxuICBpZiAodGhpcy5fZXZlbnRzLm5ld0xpc3RlbmVyKVxyXG4gICAgdGhpcy5lbWl0KCduZXdMaXN0ZW5lcicsIHR5cGUsXHJcbiAgICAgICAgICAgICAgaXNGdW5jdGlvbihsaXN0ZW5lci5saXN0ZW5lcikgP1xyXG4gICAgICAgICAgICAgIGxpc3RlbmVyLmxpc3RlbmVyIDogbGlzdGVuZXIpO1xyXG5cclxuICBpZiAoIXRoaXMuX2V2ZW50c1t0eXBlXSlcclxuICAgIC8vIE9wdGltaXplIHRoZSBjYXNlIG9mIG9uZSBsaXN0ZW5lci4gRG9uJ3QgbmVlZCB0aGUgZXh0cmEgYXJyYXkgb2JqZWN0LlxyXG4gICAgdGhpcy5fZXZlbnRzW3R5cGVdID0gbGlzdGVuZXI7XHJcbiAgZWxzZSBpZiAoaXNPYmplY3QodGhpcy5fZXZlbnRzW3R5cGVdKSlcclxuICAgIC8vIElmIHdlJ3ZlIGFscmVhZHkgZ290IGFuIGFycmF5LCBqdXN0IGFwcGVuZC5cclxuICAgIHRoaXMuX2V2ZW50c1t0eXBlXS5wdXNoKGxpc3RlbmVyKTtcclxuICBlbHNlXHJcbiAgICAvLyBBZGRpbmcgdGhlIHNlY29uZCBlbGVtZW50LCBuZWVkIHRvIGNoYW5nZSB0byBhcnJheS5cclxuICAgIHRoaXMuX2V2ZW50c1t0eXBlXSA9IFt0aGlzLl9ldmVudHNbdHlwZV0sIGxpc3RlbmVyXTtcclxuXHJcbiAgLy8gQ2hlY2sgZm9yIGxpc3RlbmVyIGxlYWtcclxuICBpZiAoaXNPYmplY3QodGhpcy5fZXZlbnRzW3R5cGVdKSAmJiAhdGhpcy5fZXZlbnRzW3R5cGVdLndhcm5lZCkge1xyXG4gICAgaWYgKCFpc1VuZGVmaW5lZCh0aGlzLl9tYXhMaXN0ZW5lcnMpKSB7XHJcbiAgICAgIG0gPSB0aGlzLl9tYXhMaXN0ZW5lcnM7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBtID0gRXZlbnRFbWl0dGVyLmRlZmF1bHRNYXhMaXN0ZW5lcnM7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKG0gJiYgbSA+IDAgJiYgdGhpcy5fZXZlbnRzW3R5cGVdLmxlbmd0aCA+IG0pIHtcclxuICAgICAgdGhpcy5fZXZlbnRzW3R5cGVdLndhcm5lZCA9IHRydWU7XHJcbiAgICAgIGNvbnNvbGUuZXJyb3IoJyhub2RlKSB3YXJuaW5nOiBwb3NzaWJsZSBFdmVudEVtaXR0ZXIgbWVtb3J5ICcgK1xyXG4gICAgICAgICAgICAgICAgICAgICdsZWFrIGRldGVjdGVkLiAlZCBsaXN0ZW5lcnMgYWRkZWQuICcgK1xyXG4gICAgICAgICAgICAgICAgICAgICdVc2UgZW1pdHRlci5zZXRNYXhMaXN0ZW5lcnMoKSB0byBpbmNyZWFzZSBsaW1pdC4nLFxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2V2ZW50c1t0eXBlXS5sZW5ndGgpO1xyXG4gICAgICBpZiAodHlwZW9mIGNvbnNvbGUudHJhY2UgPT09ICdmdW5jdGlvbicpIHtcclxuICAgICAgICAvLyBub3Qgc3VwcG9ydGVkIGluIElFIDEwXHJcbiAgICAgICAgY29uc29sZS50cmFjZSgpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICByZXR1cm4gdGhpcztcclxufTtcclxuXHJcbkV2ZW50RW1pdHRlci5wcm90b3R5cGUub24gPSBFdmVudEVtaXR0ZXIucHJvdG90eXBlLmFkZExpc3RlbmVyO1xyXG5cclxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5vbmNlID0gZnVuY3Rpb24odHlwZSwgbGlzdGVuZXIpIHtcclxuICBpZiAoIWlzRnVuY3Rpb24obGlzdGVuZXIpKVxyXG4gICAgdGhyb3cgVHlwZUVycm9yKCdsaXN0ZW5lciBtdXN0IGJlIGEgZnVuY3Rpb24nKTtcclxuXHJcbiAgdmFyIGZpcmVkID0gZmFsc2U7XHJcblxyXG4gIGZ1bmN0aW9uIGcoKSB7XHJcbiAgICB0aGlzLnJlbW92ZUxpc3RlbmVyKHR5cGUsIGcpO1xyXG5cclxuICAgIGlmICghZmlyZWQpIHtcclxuICAgICAgZmlyZWQgPSB0cnVlO1xyXG4gICAgICBsaXN0ZW5lci5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgZy5saXN0ZW5lciA9IGxpc3RlbmVyO1xyXG4gIHRoaXMub24odHlwZSwgZyk7XHJcblxyXG4gIHJldHVybiB0aGlzO1xyXG59O1xyXG5cclxuLy8gZW1pdHMgYSAncmVtb3ZlTGlzdGVuZXInIGV2ZW50IGlmZiB0aGUgbGlzdGVuZXIgd2FzIHJlbW92ZWRcclxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5yZW1vdmVMaXN0ZW5lciA9IGZ1bmN0aW9uKHR5cGUsIGxpc3RlbmVyKSB7XHJcbiAgdmFyIGxpc3QsIHBvc2l0aW9uLCBsZW5ndGgsIGk7XHJcblxyXG4gIGlmICghaXNGdW5jdGlvbihsaXN0ZW5lcikpXHJcbiAgICB0aHJvdyBUeXBlRXJyb3IoJ2xpc3RlbmVyIG11c3QgYmUgYSBmdW5jdGlvbicpO1xyXG5cclxuICBpZiAoIXRoaXMuX2V2ZW50cyB8fCAhdGhpcy5fZXZlbnRzW3R5cGVdKVxyXG4gICAgcmV0dXJuIHRoaXM7XHJcblxyXG4gIGxpc3QgPSB0aGlzLl9ldmVudHNbdHlwZV07XHJcbiAgbGVuZ3RoID0gbGlzdC5sZW5ndGg7XHJcbiAgcG9zaXRpb24gPSAtMTtcclxuXHJcbiAgaWYgKGxpc3QgPT09IGxpc3RlbmVyIHx8XHJcbiAgICAgIChpc0Z1bmN0aW9uKGxpc3QubGlzdGVuZXIpICYmIGxpc3QubGlzdGVuZXIgPT09IGxpc3RlbmVyKSkge1xyXG4gICAgZGVsZXRlIHRoaXMuX2V2ZW50c1t0eXBlXTtcclxuICAgIGlmICh0aGlzLl9ldmVudHMucmVtb3ZlTGlzdGVuZXIpXHJcbiAgICAgIHRoaXMuZW1pdCgncmVtb3ZlTGlzdGVuZXInLCB0eXBlLCBsaXN0ZW5lcik7XHJcblxyXG4gIH0gZWxzZSBpZiAoaXNPYmplY3QobGlzdCkpIHtcclxuICAgIGZvciAoaSA9IGxlbmd0aDsgaS0tID4gMDspIHtcclxuICAgICAgaWYgKGxpc3RbaV0gPT09IGxpc3RlbmVyIHx8XHJcbiAgICAgICAgICAobGlzdFtpXS5saXN0ZW5lciAmJiBsaXN0W2ldLmxpc3RlbmVyID09PSBsaXN0ZW5lcikpIHtcclxuICAgICAgICBwb3NpdGlvbiA9IGk7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBpZiAocG9zaXRpb24gPCAwKVxyXG4gICAgICByZXR1cm4gdGhpcztcclxuXHJcbiAgICBpZiAobGlzdC5sZW5ndGggPT09IDEpIHtcclxuICAgICAgbGlzdC5sZW5ndGggPSAwO1xyXG4gICAgICBkZWxldGUgdGhpcy5fZXZlbnRzW3R5cGVdO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgbGlzdC5zcGxpY2UocG9zaXRpb24sIDEpO1xyXG4gICAgfVxyXG5cclxuICAgIGlmICh0aGlzLl9ldmVudHMucmVtb3ZlTGlzdGVuZXIpXHJcbiAgICAgIHRoaXMuZW1pdCgncmVtb3ZlTGlzdGVuZXInLCB0eXBlLCBsaXN0ZW5lcik7XHJcbiAgfVxyXG5cclxuICByZXR1cm4gdGhpcztcclxufTtcclxuXHJcbkV2ZW50RW1pdHRlci5wcm90b3R5cGUucmVtb3ZlQWxsTGlzdGVuZXJzID0gZnVuY3Rpb24odHlwZSkge1xyXG4gIHZhciBrZXksIGxpc3RlbmVycztcclxuXHJcbiAgaWYgKCF0aGlzLl9ldmVudHMpXHJcbiAgICByZXR1cm4gdGhpcztcclxuXHJcbiAgLy8gbm90IGxpc3RlbmluZyBmb3IgcmVtb3ZlTGlzdGVuZXIsIG5vIG5lZWQgdG8gZW1pdFxyXG4gIGlmICghdGhpcy5fZXZlbnRzLnJlbW92ZUxpc3RlbmVyKSB7XHJcbiAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA9PT0gMClcclxuICAgICAgdGhpcy5fZXZlbnRzID0ge307XHJcbiAgICBlbHNlIGlmICh0aGlzLl9ldmVudHNbdHlwZV0pXHJcbiAgICAgIGRlbGV0ZSB0aGlzLl9ldmVudHNbdHlwZV07XHJcbiAgICByZXR1cm4gdGhpcztcclxuICB9XHJcblxyXG4gIC8vIGVtaXQgcmVtb3ZlTGlzdGVuZXIgZm9yIGFsbCBsaXN0ZW5lcnMgb24gYWxsIGV2ZW50c1xyXG4gIGlmIChhcmd1bWVudHMubGVuZ3RoID09PSAwKSB7XHJcbiAgICBmb3IgKGtleSBpbiB0aGlzLl9ldmVudHMpIHtcclxuICAgICAgaWYgKGtleSA9PT0gJ3JlbW92ZUxpc3RlbmVyJykgY29udGludWU7XHJcbiAgICAgIHRoaXMucmVtb3ZlQWxsTGlzdGVuZXJzKGtleSk7XHJcbiAgICB9XHJcbiAgICB0aGlzLnJlbW92ZUFsbExpc3RlbmVycygncmVtb3ZlTGlzdGVuZXInKTtcclxuICAgIHRoaXMuX2V2ZW50cyA9IHt9O1xyXG4gICAgcmV0dXJuIHRoaXM7XHJcbiAgfVxyXG5cclxuICBsaXN0ZW5lcnMgPSB0aGlzLl9ldmVudHNbdHlwZV07XHJcblxyXG4gIGlmIChpc0Z1bmN0aW9uKGxpc3RlbmVycykpIHtcclxuICAgIHRoaXMucmVtb3ZlTGlzdGVuZXIodHlwZSwgbGlzdGVuZXJzKTtcclxuICB9IGVsc2UgaWYgKGxpc3RlbmVycykge1xyXG4gICAgLy8gTElGTyBvcmRlclxyXG4gICAgd2hpbGUgKGxpc3RlbmVycy5sZW5ndGgpXHJcbiAgICAgIHRoaXMucmVtb3ZlTGlzdGVuZXIodHlwZSwgbGlzdGVuZXJzW2xpc3RlbmVycy5sZW5ndGggLSAxXSk7XHJcbiAgfVxyXG4gIGRlbGV0ZSB0aGlzLl9ldmVudHNbdHlwZV07XHJcblxyXG4gIHJldHVybiB0aGlzO1xyXG59O1xyXG5cclxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5saXN0ZW5lcnMgPSBmdW5jdGlvbih0eXBlKSB7XHJcbiAgdmFyIHJldDtcclxuICBpZiAoIXRoaXMuX2V2ZW50cyB8fCAhdGhpcy5fZXZlbnRzW3R5cGVdKVxyXG4gICAgcmV0ID0gW107XHJcbiAgZWxzZSBpZiAoaXNGdW5jdGlvbih0aGlzLl9ldmVudHNbdHlwZV0pKVxyXG4gICAgcmV0ID0gW3RoaXMuX2V2ZW50c1t0eXBlXV07XHJcbiAgZWxzZVxyXG4gICAgcmV0ID0gdGhpcy5fZXZlbnRzW3R5cGVdLnNsaWNlKCk7XHJcbiAgcmV0dXJuIHJldDtcclxufTtcclxuXHJcbkV2ZW50RW1pdHRlci5wcm90b3R5cGUubGlzdGVuZXJDb3VudCA9IGZ1bmN0aW9uKHR5cGUpIHtcclxuICBpZiAodGhpcy5fZXZlbnRzKSB7XHJcbiAgICB2YXIgZXZsaXN0ZW5lciA9IHRoaXMuX2V2ZW50c1t0eXBlXTtcclxuXHJcbiAgICBpZiAoaXNGdW5jdGlvbihldmxpc3RlbmVyKSlcclxuICAgICAgcmV0dXJuIDE7XHJcbiAgICBlbHNlIGlmIChldmxpc3RlbmVyKVxyXG4gICAgICByZXR1cm4gZXZsaXN0ZW5lci5sZW5ndGg7XHJcbiAgfVxyXG4gIHJldHVybiAwO1xyXG59O1xyXG5cclxuRXZlbnRFbWl0dGVyLmxpc3RlbmVyQ291bnQgPSBmdW5jdGlvbihlbWl0dGVyLCB0eXBlKSB7XHJcbiAgcmV0dXJuIGVtaXR0ZXIubGlzdGVuZXJDb3VudCh0eXBlKTtcclxufTtcclxuXHJcbmZ1bmN0aW9uIGlzRnVuY3Rpb24oYXJnKSB7XHJcbiAgcmV0dXJuIHR5cGVvZiBhcmcgPT09ICdmdW5jdGlvbic7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGlzTnVtYmVyKGFyZykge1xyXG4gIHJldHVybiB0eXBlb2YgYXJnID09PSAnbnVtYmVyJztcclxufVxyXG5cclxuZnVuY3Rpb24gaXNPYmplY3QoYXJnKSB7XHJcbiAgcmV0dXJuIHR5cGVvZiBhcmcgPT09ICdvYmplY3QnICYmIGFyZyAhPT0gbnVsbDtcclxufVxyXG5cclxuZnVuY3Rpb24gaXNVbmRlZmluZWQoYXJnKSB7XHJcbiAgcmV0dXJuIGFyZyA9PT0gdm9pZCAwO1xyXG59XHJcbiIsIi8vIENvcHlyaWdodCBKb3llbnQsIEluYy4gYW5kIG90aGVyIE5vZGUgY29udHJpYnV0b3JzLlxyXG4vL1xyXG4vLyBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYVxyXG4vLyBjb3B5IG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlXHJcbi8vIFwiU29mdHdhcmVcIiksIHRvIGRlYWwgaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZ1xyXG4vLyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0cyB0byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsXHJcbi8vIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsIGNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXRcclxuLy8gcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpcyBmdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlXHJcbi8vIGZvbGxvd2luZyBjb25kaXRpb25zOlxyXG4vL1xyXG4vLyBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZFxyXG4vLyBpbiBhbGwgY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cclxuLy9cclxuLy8gVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTU1xyXG4vLyBPUiBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GXHJcbi8vIE1FUkNIQU5UQUJJTElUWSwgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU5cclxuLy8gTk8gRVZFTlQgU0hBTEwgVEhFIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sXHJcbi8vIERBTUFHRVMgT1IgT1RIRVIgTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUlxyXG4vLyBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSwgT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFXHJcbi8vIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTiBUSEUgU09GVFdBUkUuXHJcblxyXG4vLyByZXNvbHZlcyAuIGFuZCAuLiBlbGVtZW50cyBpbiBhIHBhdGggYXJyYXkgd2l0aCBkaXJlY3RvcnkgbmFtZXMgdGhlcmVcclxuLy8gbXVzdCBiZSBubyBzbGFzaGVzLCBlbXB0eSBlbGVtZW50cywgb3IgZGV2aWNlIG5hbWVzIChjOlxcKSBpbiB0aGUgYXJyYXlcclxuLy8gKHNvIGFsc28gbm8gbGVhZGluZyBhbmQgdHJhaWxpbmcgc2xhc2hlcyAtIGl0IGRvZXMgbm90IGRpc3Rpbmd1aXNoXHJcbi8vIHJlbGF0aXZlIGFuZCBhYnNvbHV0ZSBwYXRocylcclxuZnVuY3Rpb24gbm9ybWFsaXplQXJyYXkocGFydHMsIGFsbG93QWJvdmVSb290KSB7XHJcbiAgLy8gaWYgdGhlIHBhdGggdHJpZXMgdG8gZ28gYWJvdmUgdGhlIHJvb3QsIGB1cGAgZW5kcyB1cCA+IDBcclxuICB2YXIgdXAgPSAwO1xyXG4gIGZvciAodmFyIGkgPSBwYXJ0cy5sZW5ndGggLSAxOyBpID49IDA7IGktLSkge1xyXG4gICAgdmFyIGxhc3QgPSBwYXJ0c1tpXTtcclxuICAgIGlmIChsYXN0ID09PSAnLicpIHtcclxuICAgICAgcGFydHMuc3BsaWNlKGksIDEpO1xyXG4gICAgfSBlbHNlIGlmIChsYXN0ID09PSAnLi4nKSB7XHJcbiAgICAgIHBhcnRzLnNwbGljZShpLCAxKTtcclxuICAgICAgdXArKztcclxuICAgIH0gZWxzZSBpZiAodXApIHtcclxuICAgICAgcGFydHMuc3BsaWNlKGksIDEpO1xyXG4gICAgICB1cC0tO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLy8gaWYgdGhlIHBhdGggaXMgYWxsb3dlZCB0byBnbyBhYm92ZSB0aGUgcm9vdCwgcmVzdG9yZSBsZWFkaW5nIC4uc1xyXG4gIGlmIChhbGxvd0Fib3ZlUm9vdCkge1xyXG4gICAgZm9yICg7IHVwLS07IHVwKSB7XHJcbiAgICAgIHBhcnRzLnVuc2hpZnQoJy4uJyk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICByZXR1cm4gcGFydHM7XHJcbn1cclxuXHJcbi8vIFNwbGl0IGEgZmlsZW5hbWUgaW50byBbcm9vdCwgZGlyLCBiYXNlbmFtZSwgZXh0XSwgdW5peCB2ZXJzaW9uXHJcbi8vICdyb290JyBpcyBqdXN0IGEgc2xhc2gsIG9yIG5vdGhpbmcuXHJcbnZhciBzcGxpdFBhdGhSZSA9XHJcbiAgICAvXihcXC8/fCkoW1xcc1xcU10qPykoKD86XFwuezEsMn18W15cXC9dKz98KShcXC5bXi5cXC9dKnwpKSg/OltcXC9dKikkLztcclxudmFyIHNwbGl0UGF0aCA9IGZ1bmN0aW9uKGZpbGVuYW1lKSB7XHJcbiAgcmV0dXJuIHNwbGl0UGF0aFJlLmV4ZWMoZmlsZW5hbWUpLnNsaWNlKDEpO1xyXG59O1xyXG5cclxuLy8gcGF0aC5yZXNvbHZlKFtmcm9tIC4uLl0sIHRvKVxyXG4vLyBwb3NpeCB2ZXJzaW9uXHJcbmV4cG9ydHMucmVzb2x2ZSA9IGZ1bmN0aW9uKCkge1xyXG4gIHZhciByZXNvbHZlZFBhdGggPSAnJyxcclxuICAgICAgcmVzb2x2ZWRBYnNvbHV0ZSA9IGZhbHNlO1xyXG5cclxuICBmb3IgKHZhciBpID0gYXJndW1lbnRzLmxlbmd0aCAtIDE7IGkgPj0gLTEgJiYgIXJlc29sdmVkQWJzb2x1dGU7IGktLSkge1xyXG4gICAgdmFyIHBhdGggPSAoaSA+PSAwKSA/IGFyZ3VtZW50c1tpXSA6IHByb2Nlc3MuY3dkKCk7XHJcblxyXG4gICAgLy8gU2tpcCBlbXB0eSBhbmQgaW52YWxpZCBlbnRyaWVzXHJcbiAgICBpZiAodHlwZW9mIHBhdGggIT09ICdzdHJpbmcnKSB7XHJcbiAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ0FyZ3VtZW50cyB0byBwYXRoLnJlc29sdmUgbXVzdCBiZSBzdHJpbmdzJyk7XHJcbiAgICB9IGVsc2UgaWYgKCFwYXRoKSB7XHJcbiAgICAgIGNvbnRpbnVlO1xyXG4gICAgfVxyXG5cclxuICAgIHJlc29sdmVkUGF0aCA9IHBhdGggKyAnLycgKyByZXNvbHZlZFBhdGg7XHJcbiAgICByZXNvbHZlZEFic29sdXRlID0gcGF0aC5jaGFyQXQoMCkgPT09ICcvJztcclxuICB9XHJcblxyXG4gIC8vIEF0IHRoaXMgcG9pbnQgdGhlIHBhdGggc2hvdWxkIGJlIHJlc29sdmVkIHRvIGEgZnVsbCBhYnNvbHV0ZSBwYXRoLCBidXRcclxuICAvLyBoYW5kbGUgcmVsYXRpdmUgcGF0aHMgdG8gYmUgc2FmZSAobWlnaHQgaGFwcGVuIHdoZW4gcHJvY2Vzcy5jd2QoKSBmYWlscylcclxuXHJcbiAgLy8gTm9ybWFsaXplIHRoZSBwYXRoXHJcbiAgcmVzb2x2ZWRQYXRoID0gbm9ybWFsaXplQXJyYXkoZmlsdGVyKHJlc29sdmVkUGF0aC5zcGxpdCgnLycpLCBmdW5jdGlvbihwKSB7XHJcbiAgICByZXR1cm4gISFwO1xyXG4gIH0pLCAhcmVzb2x2ZWRBYnNvbHV0ZSkuam9pbignLycpO1xyXG5cclxuICByZXR1cm4gKChyZXNvbHZlZEFic29sdXRlID8gJy8nIDogJycpICsgcmVzb2x2ZWRQYXRoKSB8fCAnLic7XHJcbn07XHJcblxyXG4vLyBwYXRoLm5vcm1hbGl6ZShwYXRoKVxyXG4vLyBwb3NpeCB2ZXJzaW9uXHJcbmV4cG9ydHMubm9ybWFsaXplID0gZnVuY3Rpb24ocGF0aCkge1xyXG4gIHZhciBpc0Fic29sdXRlID0gZXhwb3J0cy5pc0Fic29sdXRlKHBhdGgpLFxyXG4gICAgICB0cmFpbGluZ1NsYXNoID0gc3Vic3RyKHBhdGgsIC0xKSA9PT0gJy8nO1xyXG5cclxuICAvLyBOb3JtYWxpemUgdGhlIHBhdGhcclxuICBwYXRoID0gbm9ybWFsaXplQXJyYXkoZmlsdGVyKHBhdGguc3BsaXQoJy8nKSwgZnVuY3Rpb24ocCkge1xyXG4gICAgcmV0dXJuICEhcDtcclxuICB9KSwgIWlzQWJzb2x1dGUpLmpvaW4oJy8nKTtcclxuXHJcbiAgaWYgKCFwYXRoICYmICFpc0Fic29sdXRlKSB7XHJcbiAgICBwYXRoID0gJy4nO1xyXG4gIH1cclxuICBpZiAocGF0aCAmJiB0cmFpbGluZ1NsYXNoKSB7XHJcbiAgICBwYXRoICs9ICcvJztcclxuICB9XHJcblxyXG4gIHJldHVybiAoaXNBYnNvbHV0ZSA/ICcvJyA6ICcnKSArIHBhdGg7XHJcbn07XHJcblxyXG4vLyBwb3NpeCB2ZXJzaW9uXHJcbmV4cG9ydHMuaXNBYnNvbHV0ZSA9IGZ1bmN0aW9uKHBhdGgpIHtcclxuICByZXR1cm4gcGF0aC5jaGFyQXQoMCkgPT09ICcvJztcclxufTtcclxuXHJcbi8vIHBvc2l4IHZlcnNpb25cclxuZXhwb3J0cy5qb2luID0gZnVuY3Rpb24oKSB7XHJcbiAgdmFyIHBhdGhzID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJndW1lbnRzLCAwKTtcclxuICByZXR1cm4gZXhwb3J0cy5ub3JtYWxpemUoZmlsdGVyKHBhdGhzLCBmdW5jdGlvbihwLCBpbmRleCkge1xyXG4gICAgaWYgKHR5cGVvZiBwICE9PSAnc3RyaW5nJykge1xyXG4gICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdBcmd1bWVudHMgdG8gcGF0aC5qb2luIG11c3QgYmUgc3RyaW5ncycpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHA7XHJcbiAgfSkuam9pbignLycpKTtcclxufTtcclxuXHJcblxyXG4vLyBwYXRoLnJlbGF0aXZlKGZyb20sIHRvKVxyXG4vLyBwb3NpeCB2ZXJzaW9uXHJcbmV4cG9ydHMucmVsYXRpdmUgPSBmdW5jdGlvbihmcm9tLCB0bykge1xyXG4gIGZyb20gPSBleHBvcnRzLnJlc29sdmUoZnJvbSkuc3Vic3RyKDEpO1xyXG4gIHRvID0gZXhwb3J0cy5yZXNvbHZlKHRvKS5zdWJzdHIoMSk7XHJcblxyXG4gIGZ1bmN0aW9uIHRyaW0oYXJyKSB7XHJcbiAgICB2YXIgc3RhcnQgPSAwO1xyXG4gICAgZm9yICg7IHN0YXJ0IDwgYXJyLmxlbmd0aDsgc3RhcnQrKykge1xyXG4gICAgICBpZiAoYXJyW3N0YXJ0XSAhPT0gJycpIGJyZWFrO1xyXG4gICAgfVxyXG5cclxuICAgIHZhciBlbmQgPSBhcnIubGVuZ3RoIC0gMTtcclxuICAgIGZvciAoOyBlbmQgPj0gMDsgZW5kLS0pIHtcclxuICAgICAgaWYgKGFycltlbmRdICE9PSAnJykgYnJlYWs7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKHN0YXJ0ID4gZW5kKSByZXR1cm4gW107XHJcbiAgICByZXR1cm4gYXJyLnNsaWNlKHN0YXJ0LCBlbmQgLSBzdGFydCArIDEpO1xyXG4gIH1cclxuXHJcbiAgdmFyIGZyb21QYXJ0cyA9IHRyaW0oZnJvbS5zcGxpdCgnLycpKTtcclxuICB2YXIgdG9QYXJ0cyA9IHRyaW0odG8uc3BsaXQoJy8nKSk7XHJcblxyXG4gIHZhciBsZW5ndGggPSBNYXRoLm1pbihmcm9tUGFydHMubGVuZ3RoLCB0b1BhcnRzLmxlbmd0aCk7XHJcbiAgdmFyIHNhbWVQYXJ0c0xlbmd0aCA9IGxlbmd0aDtcclxuICBmb3IgKHZhciBpID0gMDsgaSA8IGxlbmd0aDsgaSsrKSB7XHJcbiAgICBpZiAoZnJvbVBhcnRzW2ldICE9PSB0b1BhcnRzW2ldKSB7XHJcbiAgICAgIHNhbWVQYXJ0c0xlbmd0aCA9IGk7XHJcbiAgICAgIGJyZWFrO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgdmFyIG91dHB1dFBhcnRzID0gW107XHJcbiAgZm9yICh2YXIgaSA9IHNhbWVQYXJ0c0xlbmd0aDsgaSA8IGZyb21QYXJ0cy5sZW5ndGg7IGkrKykge1xyXG4gICAgb3V0cHV0UGFydHMucHVzaCgnLi4nKTtcclxuICB9XHJcblxyXG4gIG91dHB1dFBhcnRzID0gb3V0cHV0UGFydHMuY29uY2F0KHRvUGFydHMuc2xpY2Uoc2FtZVBhcnRzTGVuZ3RoKSk7XHJcblxyXG4gIHJldHVybiBvdXRwdXRQYXJ0cy5qb2luKCcvJyk7XHJcbn07XHJcblxyXG5leHBvcnRzLnNlcCA9ICcvJztcclxuZXhwb3J0cy5kZWxpbWl0ZXIgPSAnOic7XHJcblxyXG5leHBvcnRzLmRpcm5hbWUgPSBmdW5jdGlvbihwYXRoKSB7XHJcbiAgdmFyIHJlc3VsdCA9IHNwbGl0UGF0aChwYXRoKSxcclxuICAgICAgcm9vdCA9IHJlc3VsdFswXSxcclxuICAgICAgZGlyID0gcmVzdWx0WzFdO1xyXG5cclxuICBpZiAoIXJvb3QgJiYgIWRpcikge1xyXG4gICAgLy8gTm8gZGlybmFtZSB3aGF0c29ldmVyXHJcbiAgICByZXR1cm4gJy4nO1xyXG4gIH1cclxuXHJcbiAgaWYgKGRpcikge1xyXG4gICAgLy8gSXQgaGFzIGEgZGlybmFtZSwgc3RyaXAgdHJhaWxpbmcgc2xhc2hcclxuICAgIGRpciA9IGRpci5zdWJzdHIoMCwgZGlyLmxlbmd0aCAtIDEpO1xyXG4gIH1cclxuXHJcbiAgcmV0dXJuIHJvb3QgKyBkaXI7XHJcbn07XHJcblxyXG5cclxuZXhwb3J0cy5iYXNlbmFtZSA9IGZ1bmN0aW9uKHBhdGgsIGV4dCkge1xyXG4gIHZhciBmID0gc3BsaXRQYXRoKHBhdGgpWzJdO1xyXG4gIC8vIFRPRE86IG1ha2UgdGhpcyBjb21wYXJpc29uIGNhc2UtaW5zZW5zaXRpdmUgb24gd2luZG93cz9cclxuICBpZiAoZXh0ICYmIGYuc3Vic3RyKC0xICogZXh0Lmxlbmd0aCkgPT09IGV4dCkge1xyXG4gICAgZiA9IGYuc3Vic3RyKDAsIGYubGVuZ3RoIC0gZXh0Lmxlbmd0aCk7XHJcbiAgfVxyXG4gIHJldHVybiBmO1xyXG59O1xyXG5cclxuXHJcbmV4cG9ydHMuZXh0bmFtZSA9IGZ1bmN0aW9uKHBhdGgpIHtcclxuICByZXR1cm4gc3BsaXRQYXRoKHBhdGgpWzNdO1xyXG59O1xyXG5cclxuZnVuY3Rpb24gZmlsdGVyICh4cywgZikge1xyXG4gICAgaWYgKHhzLmZpbHRlcikgcmV0dXJuIHhzLmZpbHRlcihmKTtcclxuICAgIHZhciByZXMgPSBbXTtcclxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgeHMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICBpZiAoZih4c1tpXSwgaSwgeHMpKSByZXMucHVzaCh4c1tpXSk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gcmVzO1xyXG59XHJcblxyXG4vLyBTdHJpbmcucHJvdG90eXBlLnN1YnN0ciAtIG5lZ2F0aXZlIGluZGV4IGRvbid0IHdvcmsgaW4gSUU4XHJcbnZhciBzdWJzdHIgPSAnYWInLnN1YnN0cigtMSkgPT09ICdiJ1xyXG4gICAgPyBmdW5jdGlvbiAoc3RyLCBzdGFydCwgbGVuKSB7IHJldHVybiBzdHIuc3Vic3RyKHN0YXJ0LCBsZW4pIH1cclxuICAgIDogZnVuY3Rpb24gKHN0ciwgc3RhcnQsIGxlbikge1xyXG4gICAgICAgIGlmIChzdGFydCA8IDApIHN0YXJ0ID0gc3RyLmxlbmd0aCArIHN0YXJ0O1xyXG4gICAgICAgIHJldHVybiBzdHIuc3Vic3RyKHN0YXJ0LCBsZW4pO1xyXG4gICAgfVxyXG47XHJcbiIsIi8vIHNoaW0gZm9yIHVzaW5nIHByb2Nlc3MgaW4gYnJvd3NlclxyXG52YXIgcHJvY2VzcyA9IG1vZHVsZS5leHBvcnRzID0ge307XHJcblxyXG4vLyBjYWNoZWQgZnJvbSB3aGF0ZXZlciBnbG9iYWwgaXMgcHJlc2VudCBzbyB0aGF0IHRlc3QgcnVubmVycyB0aGF0IHN0dWIgaXRcclxuLy8gZG9uJ3QgYnJlYWsgdGhpbmdzLiAgQnV0IHdlIG5lZWQgdG8gd3JhcCBpdCBpbiBhIHRyeSBjYXRjaCBpbiBjYXNlIGl0IGlzXHJcbi8vIHdyYXBwZWQgaW4gc3RyaWN0IG1vZGUgY29kZSB3aGljaCBkb2Vzbid0IGRlZmluZSBhbnkgZ2xvYmFscy4gIEl0J3MgaW5zaWRlIGFcclxuLy8gZnVuY3Rpb24gYmVjYXVzZSB0cnkvY2F0Y2hlcyBkZW9wdGltaXplIGluIGNlcnRhaW4gZW5naW5lcy5cclxuXHJcbnZhciBjYWNoZWRTZXRUaW1lb3V0O1xyXG52YXIgY2FjaGVkQ2xlYXJUaW1lb3V0O1xyXG5cclxuZnVuY3Rpb24gZGVmYXVsdFNldFRpbW91dCgpIHtcclxuICAgIHRocm93IG5ldyBFcnJvcignc2V0VGltZW91dCBoYXMgbm90IGJlZW4gZGVmaW5lZCcpO1xyXG59XHJcbmZ1bmN0aW9uIGRlZmF1bHRDbGVhclRpbWVvdXQgKCkge1xyXG4gICAgdGhyb3cgbmV3IEVycm9yKCdjbGVhclRpbWVvdXQgaGFzIG5vdCBiZWVuIGRlZmluZWQnKTtcclxufVxyXG4oZnVuY3Rpb24gKCkge1xyXG4gICAgdHJ5IHtcclxuICAgICAgICBpZiAodHlwZW9mIHNldFRpbWVvdXQgPT09ICdmdW5jdGlvbicpIHtcclxuICAgICAgICAgICAgY2FjaGVkU2V0VGltZW91dCA9IHNldFRpbWVvdXQ7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgY2FjaGVkU2V0VGltZW91dCA9IGRlZmF1bHRTZXRUaW1vdXQ7XHJcbiAgICAgICAgfVxyXG4gICAgfSBjYXRjaCAoZSkge1xyXG4gICAgICAgIGNhY2hlZFNldFRpbWVvdXQgPSBkZWZhdWx0U2V0VGltb3V0O1xyXG4gICAgfVxyXG4gICAgdHJ5IHtcclxuICAgICAgICBpZiAodHlwZW9mIGNsZWFyVGltZW91dCA9PT0gJ2Z1bmN0aW9uJykge1xyXG4gICAgICAgICAgICBjYWNoZWRDbGVhclRpbWVvdXQgPSBjbGVhclRpbWVvdXQ7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgY2FjaGVkQ2xlYXJUaW1lb3V0ID0gZGVmYXVsdENsZWFyVGltZW91dDtcclxuICAgICAgICB9XHJcbiAgICB9IGNhdGNoIChlKSB7XHJcbiAgICAgICAgY2FjaGVkQ2xlYXJUaW1lb3V0ID0gZGVmYXVsdENsZWFyVGltZW91dDtcclxuICAgIH1cclxufSAoKSlcclxuZnVuY3Rpb24gcnVuVGltZW91dChmdW4pIHtcclxuICAgIGlmIChjYWNoZWRTZXRUaW1lb3V0ID09PSBzZXRUaW1lb3V0KSB7XHJcbiAgICAgICAgLy9ub3JtYWwgZW52aXJvbWVudHMgaW4gc2FuZSBzaXR1YXRpb25zXHJcbiAgICAgICAgcmV0dXJuIHNldFRpbWVvdXQoZnVuLCAwKTtcclxuICAgIH1cclxuICAgIC8vIGlmIHNldFRpbWVvdXQgd2Fzbid0IGF2YWlsYWJsZSBidXQgd2FzIGxhdHRlciBkZWZpbmVkXHJcbiAgICBpZiAoKGNhY2hlZFNldFRpbWVvdXQgPT09IGRlZmF1bHRTZXRUaW1vdXQgfHwgIWNhY2hlZFNldFRpbWVvdXQpICYmIHNldFRpbWVvdXQpIHtcclxuICAgICAgICBjYWNoZWRTZXRUaW1lb3V0ID0gc2V0VGltZW91dDtcclxuICAgICAgICByZXR1cm4gc2V0VGltZW91dChmdW4sIDApO1xyXG4gICAgfVxyXG4gICAgdHJ5IHtcclxuICAgICAgICAvLyB3aGVuIHdoZW4gc29tZWJvZHkgaGFzIHNjcmV3ZWQgd2l0aCBzZXRUaW1lb3V0IGJ1dCBubyBJLkUuIG1hZGRuZXNzXHJcbiAgICAgICAgcmV0dXJuIGNhY2hlZFNldFRpbWVvdXQoZnVuLCAwKTtcclxuICAgIH0gY2F0Y2goZSl7XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgLy8gV2hlbiB3ZSBhcmUgaW4gSS5FLiBidXQgdGhlIHNjcmlwdCBoYXMgYmVlbiBldmFsZWQgc28gSS5FLiBkb2Vzbid0IHRydXN0IHRoZSBnbG9iYWwgb2JqZWN0IHdoZW4gY2FsbGVkIG5vcm1hbGx5XHJcbiAgICAgICAgICAgIHJldHVybiBjYWNoZWRTZXRUaW1lb3V0LmNhbGwobnVsbCwgZnVuLCAwKTtcclxuICAgICAgICB9IGNhdGNoKGUpe1xyXG4gICAgICAgICAgICAvLyBzYW1lIGFzIGFib3ZlIGJ1dCB3aGVuIGl0J3MgYSB2ZXJzaW9uIG9mIEkuRS4gdGhhdCBtdXN0IGhhdmUgdGhlIGdsb2JhbCBvYmplY3QgZm9yICd0aGlzJywgaG9wZnVsbHkgb3VyIGNvbnRleHQgY29ycmVjdCBvdGhlcndpc2UgaXQgd2lsbCB0aHJvdyBhIGdsb2JhbCBlcnJvclxyXG4gICAgICAgICAgICByZXR1cm4gY2FjaGVkU2V0VGltZW91dC5jYWxsKHRoaXMsIGZ1biwgMCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuXHJcbn1cclxuZnVuY3Rpb24gcnVuQ2xlYXJUaW1lb3V0KG1hcmtlcikge1xyXG4gICAgaWYgKGNhY2hlZENsZWFyVGltZW91dCA9PT0gY2xlYXJUaW1lb3V0KSB7XHJcbiAgICAgICAgLy9ub3JtYWwgZW52aXJvbWVudHMgaW4gc2FuZSBzaXR1YXRpb25zXHJcbiAgICAgICAgcmV0dXJuIGNsZWFyVGltZW91dChtYXJrZXIpO1xyXG4gICAgfVxyXG4gICAgLy8gaWYgY2xlYXJUaW1lb3V0IHdhc24ndCBhdmFpbGFibGUgYnV0IHdhcyBsYXR0ZXIgZGVmaW5lZFxyXG4gICAgaWYgKChjYWNoZWRDbGVhclRpbWVvdXQgPT09IGRlZmF1bHRDbGVhclRpbWVvdXQgfHwgIWNhY2hlZENsZWFyVGltZW91dCkgJiYgY2xlYXJUaW1lb3V0KSB7XHJcbiAgICAgICAgY2FjaGVkQ2xlYXJUaW1lb3V0ID0gY2xlYXJUaW1lb3V0O1xyXG4gICAgICAgIHJldHVybiBjbGVhclRpbWVvdXQobWFya2VyKTtcclxuICAgIH1cclxuICAgIHRyeSB7XHJcbiAgICAgICAgLy8gd2hlbiB3aGVuIHNvbWVib2R5IGhhcyBzY3Jld2VkIHdpdGggc2V0VGltZW91dCBidXQgbm8gSS5FLiBtYWRkbmVzc1xyXG4gICAgICAgIHJldHVybiBjYWNoZWRDbGVhclRpbWVvdXQobWFya2VyKTtcclxuICAgIH0gY2F0Y2ggKGUpe1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIC8vIFdoZW4gd2UgYXJlIGluIEkuRS4gYnV0IHRoZSBzY3JpcHQgaGFzIGJlZW4gZXZhbGVkIHNvIEkuRS4gZG9lc24ndCAgdHJ1c3QgdGhlIGdsb2JhbCBvYmplY3Qgd2hlbiBjYWxsZWQgbm9ybWFsbHlcclxuICAgICAgICAgICAgcmV0dXJuIGNhY2hlZENsZWFyVGltZW91dC5jYWxsKG51bGwsIG1hcmtlcik7XHJcbiAgICAgICAgfSBjYXRjaCAoZSl7XHJcbiAgICAgICAgICAgIC8vIHNhbWUgYXMgYWJvdmUgYnV0IHdoZW4gaXQncyBhIHZlcnNpb24gb2YgSS5FLiB0aGF0IG11c3QgaGF2ZSB0aGUgZ2xvYmFsIG9iamVjdCBmb3IgJ3RoaXMnLCBob3BmdWxseSBvdXIgY29udGV4dCBjb3JyZWN0IG90aGVyd2lzZSBpdCB3aWxsIHRocm93IGEgZ2xvYmFsIGVycm9yLlxyXG4gICAgICAgICAgICAvLyBTb21lIHZlcnNpb25zIG9mIEkuRS4gaGF2ZSBkaWZmZXJlbnQgcnVsZXMgZm9yIGNsZWFyVGltZW91dCB2cyBzZXRUaW1lb3V0XHJcbiAgICAgICAgICAgIHJldHVybiBjYWNoZWRDbGVhclRpbWVvdXQuY2FsbCh0aGlzLCBtYXJrZXIpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcblxyXG5cclxufVxyXG52YXIgcXVldWUgPSBbXTtcclxudmFyIGRyYWluaW5nID0gZmFsc2U7XHJcbnZhciBjdXJyZW50UXVldWU7XHJcbnZhciBxdWV1ZUluZGV4ID0gLTE7XHJcblxyXG5mdW5jdGlvbiBjbGVhblVwTmV4dFRpY2soKSB7XHJcbiAgICBpZiAoIWRyYWluaW5nIHx8ICFjdXJyZW50UXVldWUpIHtcclxuICAgICAgICByZXR1cm47XHJcbiAgICB9XHJcbiAgICBkcmFpbmluZyA9IGZhbHNlO1xyXG4gICAgaWYgKGN1cnJlbnRRdWV1ZS5sZW5ndGgpIHtcclxuICAgICAgICBxdWV1ZSA9IGN1cnJlbnRRdWV1ZS5jb25jYXQocXVldWUpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICBxdWV1ZUluZGV4ID0gLTE7XHJcbiAgICB9XHJcbiAgICBpZiAocXVldWUubGVuZ3RoKSB7XHJcbiAgICAgICAgZHJhaW5RdWV1ZSgpO1xyXG4gICAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiBkcmFpblF1ZXVlKCkge1xyXG4gICAgaWYgKGRyYWluaW5nKSB7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG4gICAgdmFyIHRpbWVvdXQgPSBydW5UaW1lb3V0KGNsZWFuVXBOZXh0VGljayk7XHJcbiAgICBkcmFpbmluZyA9IHRydWU7XHJcblxyXG4gICAgdmFyIGxlbiA9IHF1ZXVlLmxlbmd0aDtcclxuICAgIHdoaWxlKGxlbikge1xyXG4gICAgICAgIGN1cnJlbnRRdWV1ZSA9IHF1ZXVlO1xyXG4gICAgICAgIHF1ZXVlID0gW107XHJcbiAgICAgICAgd2hpbGUgKCsrcXVldWVJbmRleCA8IGxlbikge1xyXG4gICAgICAgICAgICBpZiAoY3VycmVudFF1ZXVlKSB7XHJcbiAgICAgICAgICAgICAgICBjdXJyZW50UXVldWVbcXVldWVJbmRleF0ucnVuKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcXVldWVJbmRleCA9IC0xO1xyXG4gICAgICAgIGxlbiA9IHF1ZXVlLmxlbmd0aDtcclxuICAgIH1cclxuICAgIGN1cnJlbnRRdWV1ZSA9IG51bGw7XHJcbiAgICBkcmFpbmluZyA9IGZhbHNlO1xyXG4gICAgcnVuQ2xlYXJUaW1lb3V0KHRpbWVvdXQpO1xyXG59XHJcblxyXG5wcm9jZXNzLm5leHRUaWNrID0gZnVuY3Rpb24gKGZ1bikge1xyXG4gICAgdmFyIGFyZ3MgPSBuZXcgQXJyYXkoYXJndW1lbnRzLmxlbmd0aCAtIDEpO1xyXG4gICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPiAxKSB7XHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDE7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgYXJnc1tpIC0gMV0gPSBhcmd1bWVudHNbaV07XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcXVldWUucHVzaChuZXcgSXRlbShmdW4sIGFyZ3MpKTtcclxuICAgIGlmIChxdWV1ZS5sZW5ndGggPT09IDEgJiYgIWRyYWluaW5nKSB7XHJcbiAgICAgICAgcnVuVGltZW91dChkcmFpblF1ZXVlKTtcclxuICAgIH1cclxufTtcclxuXHJcbi8vIHY4IGxpa2VzIHByZWRpY3RpYmxlIG9iamVjdHNcclxuZnVuY3Rpb24gSXRlbShmdW4sIGFycmF5KSB7XHJcbiAgICB0aGlzLmZ1biA9IGZ1bjtcclxuICAgIHRoaXMuYXJyYXkgPSBhcnJheTtcclxufVxyXG5JdGVtLnByb3RvdHlwZS5ydW4gPSBmdW5jdGlvbiAoKSB7XHJcbiAgICB0aGlzLmZ1bi5hcHBseShudWxsLCB0aGlzLmFycmF5KTtcclxufTtcclxucHJvY2Vzcy50aXRsZSA9ICdicm93c2VyJztcclxucHJvY2Vzcy5icm93c2VyID0gdHJ1ZTtcclxucHJvY2Vzcy5lbnYgPSB7fTtcclxucHJvY2Vzcy5hcmd2ID0gW107XHJcbnByb2Nlc3MudmVyc2lvbiA9ICcnOyAvLyBlbXB0eSBzdHJpbmcgdG8gYXZvaWQgcmVnZXhwIGlzc3Vlc1xyXG5wcm9jZXNzLnZlcnNpb25zID0ge307XHJcblxyXG5mdW5jdGlvbiBub29wKCkge31cclxuXHJcbnByb2Nlc3Mub24gPSBub29wO1xyXG5wcm9jZXNzLmFkZExpc3RlbmVyID0gbm9vcDtcclxucHJvY2Vzcy5vbmNlID0gbm9vcDtcclxucHJvY2Vzcy5vZmYgPSBub29wO1xyXG5wcm9jZXNzLnJlbW92ZUxpc3RlbmVyID0gbm9vcDtcclxucHJvY2Vzcy5yZW1vdmVBbGxMaXN0ZW5lcnMgPSBub29wO1xyXG5wcm9jZXNzLmVtaXQgPSBub29wO1xyXG5wcm9jZXNzLnByZXBlbmRMaXN0ZW5lciA9IG5vb3A7XHJcbnByb2Nlc3MucHJlcGVuZE9uY2VMaXN0ZW5lciA9IG5vb3A7XHJcblxyXG5wcm9jZXNzLmxpc3RlbmVycyA9IGZ1bmN0aW9uIChuYW1lKSB7IHJldHVybiBbXSB9XHJcblxyXG5wcm9jZXNzLmJpbmRpbmcgPSBmdW5jdGlvbiAobmFtZSkge1xyXG4gICAgdGhyb3cgbmV3IEVycm9yKCdwcm9jZXNzLmJpbmRpbmcgaXMgbm90IHN1cHBvcnRlZCcpO1xyXG59O1xyXG5cclxucHJvY2Vzcy5jd2QgPSBmdW5jdGlvbiAoKSB7IHJldHVybiAnLycgfTtcclxucHJvY2Vzcy5jaGRpciA9IGZ1bmN0aW9uIChkaXIpIHtcclxuICAgIHRocm93IG5ldyBFcnJvcigncHJvY2Vzcy5jaGRpciBpcyBub3Qgc3VwcG9ydGVkJyk7XHJcbn07XHJcbnByb2Nlc3MudW1hc2sgPSBmdW5jdGlvbigpIHsgcmV0dXJuIDA7IH07XHJcbiIsImltcG9ydCB7IEVudGl0eSB9IGZyb20gXCIuL2VudGl0eVwiO1xyXG5cclxuZXhwb3J0IGFic3RyYWN0IGNsYXNzIEJlaGF2aW9yIHtcclxuXHJcbiAgICBwcm90ZWN0ZWQgX25lZWRzVXBkYXRlOiBib29sZWFuID0gZmFsc2U7XHJcblxyXG4gICAgcHVibGljIF9vd25lcjogRW50aXR5O1xyXG5cclxuICAgIGdldCBuZWVkc1VwZGF0ZSgpOiBib29sZWFuIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fbmVlZHNVcGRhdGU7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHByZVN0YXJ0KCk6IHZvaWQgeyB9XHJcbiAgICBwdWJsaWMgc3RhcnQoKTogdm9pZCB7IH1cclxuICAgIHB1YmxpYyB1cGRhdGUoZHQ6IG51bWJlcik6IHZvaWQgeyB9XHJcbiAgICBwdWJsaWMgZW5kKCk6IHZvaWQgeyB9XHJcbn1cclxuIiwiaW1wb3J0IHsgQmVoYXZpb3IgfSBmcm9tIFwiLi9iZWhhdmlvclwiO1xyXG5pbXBvcnQgeyBSZWN0IH0gZnJvbSBcIi4uL21hdGgvcmVjdFwiO1xyXG5cclxuZXhwb3J0IGNsYXNzIEJveENvbGxpZGVyIGV4dGVuZHMgQmVoYXZpb3Ige1xyXG5cclxuICAgIHByaXZhdGUgX3JlY3Q6IFJlY3Q7XHJcbiAgICBwcml2YXRlIF9jb2xsaXNpb25UYWdzOiBzdHJpbmdbXSA9IFtdO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKHg/OiBudW1iZXIsIHk/OiBudW1iZXIsIHc/OiBudW1iZXIsIGg/OiBudW1iZXIpIHtcclxuICAgICAgICBzdXBlcigpO1xyXG4gICAgICAgIHRoaXMuX3JlY3QgPSBuZXcgUmVjdCh4LCB5LCB3LCBoKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0UmVjdCgpOiBSZWN0IHtcclxuICAgICAgICB0aGlzLl9yZWN0LnggPSB0aGlzLl9vd25lci5wb3NpdGlvbi54O1xyXG4gICAgICAgIHRoaXMuX3JlY3QueSA9IHRoaXMuX293bmVyLnBvc2l0aW9uLnk7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3JlY3Q7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNldFdpZHRoKHc6IG51bWJlcik6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuX3JlY3Qud2lkdGggPSB3O1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzZXRIZWlnaHQoaDogbnVtYmVyKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5fcmVjdC5oZWlnaHQgPSBoO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICAvLyBUT0RPOiByZWltcGxlbWVudFxyXG4gICAgLy8gcHVibGljIGdldENvbGxpc2lvblRhZ3MoKTogc3RyaW5nW10ge1xyXG4gICAgLy8gICAgIHJldHVybiB0aGlzLl9jb2xsaXNpb25UYWdzO1xyXG4gICAgLy8gfVxyXG5cclxuICAgIC8vIHB1YmxpYyBhZGRDb2xsaXNpb25UYWdzKHRhZ3M6IHN0cmluZ1tdKTogdm9pZCB7XHJcbiAgICAvLyAgICAgdGhpcy5fY29sbGlzaW9uVGFncyA9IG5ldyBBcnJheTxzdHJpbmc+KC4uLnRoaXMuX2NvbGxpc2lvblRhZ3MsIC4uLnRhZ3MpO1xyXG4gICAgLy8gfVxyXG5cclxuICAgIC8vIHB1YmxpYyByZW1vdmVDb2xsaXNpb25UYWdzKHRhZ3M6IHN0cmluZ1tdKTogdm9pZCB7XHJcbiAgICAvLyAgICAgdGhpcy5fY29sbGlzaW9uVGFncyA9IHRoaXMuX2NvbGxpc2lvblRhZ3MuZmlsdGVyKHRhZyA9PiAhdGFncy5zb21lKHQgPT4gdCA9PT0gdGFnKSk7XHJcbiAgICAvLyB9XHJcbn1cclxuIiwiaW1wb3J0IHsgQmVoYXZpb3IgfSBmcm9tIFwiLi9iZWhhdmlvclwiO1xyXG5pbXBvcnQgeyBJZEdlbmVyYXRvciB9IGZyb20gXCIuLi91dGlscy9pZC1nZW5lcmF0b3JcIjtcclxuaW1wb3J0IHsgS2V5ZWRDb2xsZWN0aW9uIH0gZnJvbSBcIi4uL3V0aWxzL2tleWVkLWNvbGxlY3Rpb25cIjtcclxuaW1wb3J0IHsgVmVjdG9yMiB9IGZyb20gXCIuLi9tYXRoL3ZlY3RvcjJcIjtcclxuaW1wb3J0IHsgTGV2ZWwgfSBmcm9tIFwiLi9sZXZlbFwiO1xyXG5pbXBvcnQgeyBTY2VuZU5vZGUgfSBmcm9tIFwiLi9zY2VuZS1ub2RlXCI7XHJcbmltcG9ydCB7IEV2ZW50RW1pdHRlciB9IGZyb20gXCJldmVudHNcIjtcclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgSUVudGl0eU9wdGlvbnMge1xyXG4gICAgbmFtZTogc3RyaW5nO1xyXG4gICAgYmVoYXZpb3JzOiBCZWhhdmlvcltdO1xyXG4gICAgcG9zaXRpb246IFZlY3RvcjI7XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBFbnRpdHkgZXh0ZW5kcyBTY2VuZU5vZGUge1xyXG5cclxuICAgIHByaXZhdGUgX2lkOiBudW1iZXIgPSAtMTtcclxuICAgIHByaXZhdGUgX25hbWU6IHN0cmluZyA9IFwiXCI7XHJcbiAgICBwcml2YXRlIF9wb3NpdGlvbjogVmVjdG9yMjtcclxuXHJcbiAgICBwcml2YXRlIF9iZWhhdmlvcnNCeUlkOiBLZXllZENvbGxlY3Rpb248QmVoYXZpb3I+ID0gbmV3IEtleWVkQ29sbGVjdGlvbjxCZWhhdmlvcj4oKTtcclxuICAgIHByaXZhdGUgX2JlaGF2aW9yc1RvVXBkYXRlOiBCZWhhdmlvcltdID0gW107XHJcblxyXG4gICAgcHJpdmF0ZSBfaWRHZW46IElkR2VuZXJhdG9yID0gbmV3IElkR2VuZXJhdG9yKCk7XHJcbiAgICBwcml2YXRlIF9ldmVudEVtaXR0ZXI6IEV2ZW50RW1pdHRlciA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcclxuXHJcbiAgICBwcml2YXRlIF9sZXZlbDogTGV2ZWw7XHJcblxyXG4gICAgZ2V0IGlkKCk6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2lkO1xyXG4gICAgfVxyXG4gICAgZ2V0IG5hbWUoKTogc3RyaW5nIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fbmFtZTtcclxuICAgIH1cclxuICAgIGdldCBwb3NpdGlvbigpOiBWZWN0b3IyIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fcG9zaXRpb247XHJcbiAgICB9XHJcbiAgICBnZXQgYmVoYXZpb3JDb3VudCgpOiBudW1iZXIge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9iZWhhdmlvcnNCeUlkLmNvdW50KCk7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3RydWN0b3Iob3B0OiBJRW50aXR5T3B0aW9ucykge1xyXG4gICAgICAgIHN1cGVyKCk7XHJcbiAgICAgICAgdGhpcy5fbmFtZSA9IG9wdC5uYW1lO1xyXG5cclxuICAgICAgICBmb3IgKGxldCBiIG9mIG9wdC5iZWhhdmlvcnMpIHtcclxuICAgICAgICAgICAgYi5fb3duZXIgPSB0aGlzO1xyXG4gICAgICAgICAgICB0aGlzLl9iZWhhdmlvcnNCeUlkLmFkZCh0aGlzLl9pZEdlbi5nZXRJZCgpLCBiKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuX3Bvc2l0aW9uID0gb3B0LnBvc2l0aW9uO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBfc2V0SWQoaWQ6IG51bWJlcik6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuX2lkID0gaWQ7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIF9zZXRMZXZlbChsZXZlbDogTGV2ZWwpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLl9sZXZlbCA9IGxldmVsO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXRMZXZlbCgpOiBMZXZlbCB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2xldmVsO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXRCZWhhdmlvckJ5SWQoaWQ6IG51bWJlcik6IEJlaGF2aW9yIHwgbnVsbCB7XHJcbiAgICAgICAgaWYgKHRoaXMuX2JlaGF2aW9yc0J5SWQuaXRlbShpZCkpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2JlaGF2aW9yc0J5SWQuaXRlbShpZCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXRCZWhhdmlvck9mVHlwZTxUIGV4dGVuZHMgQmVoYXZpb3I+KHRjdG9yOiBuZXcgKC4uLmFyZ3M6IGFueVtdKSA9PiBUKTogVCB8IG51bGwge1xyXG4gICAgICAgIGZvciAobGV0IGIgb2YgdGhpcy5fYmVoYXZpb3JzQnlJZC52YWx1ZXMoKSkge1xyXG4gICAgICAgICAgICBpZiAoYiBpbnN0YW5jZW9mIHRjdG9yKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gYiBhcyBUO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBwcmVTdGFydCgpOiB2b2lkIHtcclxuICAgICAgICAvLyBOT1RJQ0U6IENhbGxpbmcgLnZhbHVlcygpIG11bHRpcGxlIHRpbWVzIHBlciBmcmFtZVxyXG4gICAgICAgIGZvciAobGV0IGIgb2YgdGhpcy5fYmVoYXZpb3JzQnlJZC52YWx1ZXMoKSkge1xyXG4gICAgICAgICAgICBpZiAoYi5uZWVkc1VwZGF0ZSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fYmVoYXZpb3JzVG9VcGRhdGUucHVzaChiKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBiLnByZVN0YXJ0KCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzdGFydCgpOiB2b2lkIHtcclxuICAgICAgICBmb3IgKGxldCBiIG9mIHRoaXMuX2JlaGF2aW9yc0J5SWQudmFsdWVzKCkpIHtcclxuICAgICAgICAgICAgYi5zdGFydCgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgdXBkYXRlKGR0OiBudW1iZXIpOiB2b2lkIHtcclxuICAgICAgICBmb3IgKGxldCBiIG9mIHRoaXMuX2JlaGF2aW9yc1RvVXBkYXRlKSB7XHJcbiAgICAgICAgICAgIGIudXBkYXRlKGR0KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGVuZCgpOiB2b2lkIHtcclxuICAgICAgICBmb3IgKGxldCBiIG9mIHRoaXMuX2JlaGF2aW9yc0J5SWQudmFsdWVzKCkpIHtcclxuICAgICAgICAgICAgYi5lbmQoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIG9uKGV2ZW50OiBzdHJpbmcsIGZ1bmM6ICguLi5hcmdzOiBhbnlbXSkgPT4gdm9pZCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuX2V2ZW50RW1pdHRlci5vbihldmVudCwgZnVuYyk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGVtaXQoZXZlbnQ6IHN0cmluZywgLi4uYXJnczogYW55W10pOiB2b2lkIHtcclxuICAgICAgICB0aGlzLl9ldmVudEVtaXR0ZXIuZW1pdChldmVudCwgYXJncyk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIG9mZihldmVudDogc3RyaW5nLCBmdW5jOiAoLi4uYXJnczogYW55W10pID0+IHZvaWQpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLl9ldmVudEVtaXR0ZXIub2ZmKGV2ZW50LCBmdW5jKTtcclxuICAgIH1cclxufVxyXG4iLCJpbXBvcnQgeyBLZXllZENvbGxlY3Rpb24gfSBmcm9tIFwiLi4vdXRpbHMva2V5ZWQtY29sbGVjdGlvblwiO1xyXG5pbXBvcnQgeyBFbnRpdHkgfSBmcm9tIFwiLi9lbnRpdHlcIjtcclxuaW1wb3J0IHsgSWRHZW5lcmF0b3IgfSBmcm9tIFwiLi4vdXRpbHMvaWQtZ2VuZXJhdG9yXCI7XHJcbmltcG9ydCB7IFNwcml0ZSB9IGZyb20gXCIuL3Nwcml0ZVwiO1xyXG5pbXBvcnQgeyBNR2FtZSB9IGZyb20gXCIuL20tZ2FtZVwiO1xyXG5cclxuZXhwb3J0IGNsYXNzIExldmVsIHtcclxuXHJcbiAgICBwcml2YXRlIF9lbnRpdGllc0J5SWQ6IEtleWVkQ29sbGVjdGlvbjxFbnRpdHk+O1xyXG4gICAgcHJpdmF0ZSBfZW50aXRpZXNUb0FkZDogRW50aXR5W107XHJcbiAgICBwcml2YXRlIF9lbnRpdGllc1RvUmVtb3ZlOiBudW1iZXJbXTtcclxuXHJcbiAgICBwcml2YXRlIF9pZEdlbjogSWRHZW5lcmF0b3I7XHJcblxyXG4gICAgcHVibGljIGdhbWU6IE1HYW1lO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIHRoaXMuX2VudGl0aWVzQnlJZCA9IG5ldyBLZXllZENvbGxlY3Rpb248RW50aXR5PigpO1xyXG4gICAgICAgIHRoaXMuX2VudGl0aWVzVG9BZGQgPSBbXTtcclxuICAgICAgICB0aGlzLl9lbnRpdGllc1RvUmVtb3ZlID0gW107XHJcblxyXG4gICAgICAgIHRoaXMuX2lkR2VuID0gbmV3IElkR2VuZXJhdG9yKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGFkZEVudGl0eShlOiBFbnRpdHkpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLl9lbnRpdGllc1RvQWRkLnB1c2goZSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldEVudGl0eUJ5SWQoaWQ6IG51bWJlcik6IEVudGl0eSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2VudGl0aWVzQnlJZC5pdGVtKGlkKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgcHJlU3RhcnQoKTogdm9pZCB7XHJcbiAgICAgICAgd2hpbGUgKHRoaXMuX2VudGl0aWVzVG9BZGQubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICBsZXQgZSA9IDxFbnRpdHk+dGhpcy5fZW50aXRpZXNUb0FkZC5wb3AoKTtcclxuICAgICAgICAgICAgZS5fc2V0TGV2ZWwodGhpcyk7XHJcbiAgICAgICAgICAgIGUuX3NldElkKHRoaXMuX2lkR2VuLmdldElkKCkpO1xyXG4gICAgICAgICAgICBlLnByZVN0YXJ0KCk7XHJcbiAgICAgICAgICAgIHRoaXMuX2VudGl0aWVzQnlJZC5hZGQoZS5pZCwgZSk7XHJcbiAgICAgICAgICAgIGZvciAobGV0IG0gb2YgdGhpcy5nYW1lLl9tb2R1bGVzKSB7XHJcbiAgICAgICAgICAgICAgICBtLm9uRW50aXR5QWRkZWQoZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHN0YXJ0KCk6IHZvaWQge1xyXG4gICAgICAgIGZvciAobGV0IGUgb2YgdGhpcy5fZW50aXRpZXNCeUlkLnZhbHVlcygpKSB7XHJcbiAgICAgICAgICAgIGUuc3RhcnQoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHVwZGF0ZShkdDogbnVtYmVyKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5fdXBkYXRlRW50aXR5TGlzdHMoKTtcclxuXHJcbiAgICAgICAgZm9yIChsZXQgZSBvZiB0aGlzLl9lbnRpdGllc0J5SWQudmFsdWVzKCkpIHtcclxuICAgICAgICAgICAgZS51cGRhdGUoZHQpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZHJhdyhjdHg6IENhbnZhc1JlbmRlcmluZ0NvbnRleHQyRCk6IHZvaWQge1xyXG4gICAgICAgIGZvciAobGV0IGUgb2YgdGhpcy5fZW50aXRpZXNCeUlkLnZhbHVlcygpKSB7XHJcbiAgICAgICAgICAgIGxldCBzID0gZS5nZXRCZWhhdmlvck9mVHlwZShTcHJpdGUpO1xyXG4gICAgICAgICAgICBpZiAocyAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICBjdHguZHJhd0ltYWdlKHMudGV4dHVyZSwgZS5wb3NpdGlvbi54LCBlLnBvc2l0aW9uLnkpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBlbmQoKTogdm9pZCB7XHJcbiAgICAgICAgZm9yIChsZXQgZSBvZiB0aGlzLl9lbnRpdGllc0J5SWQudmFsdWVzKCkpIHtcclxuICAgICAgICAgICAgZS5lbmQoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBfdXBkYXRlRW50aXR5TGlzdHMoKTogdm9pZCB7XHJcbiAgICAgICAgd2hpbGUgKHRoaXMuX2VudGl0aWVzVG9SZW1vdmUubGVuZ3RoICE9PSAwKSB7XHJcbiAgICAgICAgICAgIGxldCBlSWQgPSA8bnVtYmVyPnRoaXMuX2VudGl0aWVzVG9SZW1vdmUucG9wKCk7XHJcbiAgICAgICAgICAgIGxldCBlID0gdGhpcy5nZXRFbnRpdHlCeUlkKGVJZCk7XHJcbiAgICAgICAgICAgIGUuZW5kKCk7XHJcbiAgICAgICAgICAgIGZvciAobGV0IG0gb2YgdGhpcy5nYW1lLl9tb2R1bGVzKSB7XHJcbiAgICAgICAgICAgICAgICBtLm9uRW50aXR5UmVtb3ZlZChlLmlkKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLl9lbnRpdGllc0J5SWQucmVtb3ZlKGVJZCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBmb3IgKGxldCBlIG9mIHRoaXMuX2VudGl0aWVzVG9BZGQpIHtcclxuICAgICAgICAgICAgZS5fc2V0TGV2ZWwodGhpcyk7XHJcbiAgICAgICAgICAgIGUuX3NldElkKHRoaXMuX2lkR2VuLmdldElkKCkpO1xyXG4gICAgICAgICAgICBlLnByZVN0YXJ0KCk7XHJcbiAgICAgICAgICAgIHRoaXMuX2VudGl0aWVzQnlJZC5hZGQoZS5pZCwgZSk7XHJcbiAgICAgICAgICAgIGZvciAobGV0IG0gb2YgdGhpcy5nYW1lLl9tb2R1bGVzKSB7XHJcbiAgICAgICAgICAgICAgICBtLm9uRW50aXR5QWRkZWQoZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHdoaWxlICh0aGlzLl9lbnRpdGllc1RvQWRkLmxlbmd0aCAhPT0gMCkge1xyXG4gICAgICAgICAgICBsZXQgZSA9IDxFbnRpdHk+dGhpcy5fZW50aXRpZXNUb0FkZC5wb3AoKTtcclxuICAgICAgICAgICAgZS5zdGFydCgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG4iLCJpbXBvcnQgeyBLZXlib2FyZCB9IGZyb20gXCIuLi9pbnB1dC9rZXlib2FyZFwiO1xyXG5pbXBvcnQgeyBMZXZlbCB9IGZyb20gXCIuL2xldmVsXCI7XHJcbmltcG9ydCB7IFJlc291cmNlTG9hZGVyIH0gZnJvbSBcIi4uL3V0aWxzL3Jlc291cmNlLWxvYWRlclwiO1xyXG5pbXBvcnQgeyBNb2R1bGUgfSBmcm9tIFwiLi9tb2R1bGVcIjtcclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgTUdhbWVTdGFydE9wdGlvbnMge1xyXG4gICAgc3RhcnRMZXZlbDogTGV2ZWw7XHJcbiAgICBtb2R1bGVzOiBNb2R1bGVbXTtcclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIE1HYW1lIHtcclxuICAgIHB1YmxpYyBjYW52YXM6IEhUTUxDYW52YXNFbGVtZW50O1xyXG4gICAgcHVibGljIGNvbnRleHQ6IENhbnZhc1JlbmRlcmluZ0NvbnRleHQyRCB8IG51bGw7XHJcblxyXG4gICAgcHJpdmF0ZSBub3c6IG51bWJlcjtcclxuICAgIHByaXZhdGUgZHQ6IG51bWJlcjtcclxuICAgIHByaXZhdGUgbGFzdDogbnVtYmVyO1xyXG4gICAgcHJpdmF0ZSBzdGVwOiBudW1iZXI7XHJcblxyXG4gICAgcHJpdmF0ZSBpbnRlcnZhbDogbnVtYmVyO1xyXG5cclxuICAgIHB1YmxpYyBfbW9kdWxlczogTW9kdWxlW107XHJcblxyXG4gICAgcHJpdmF0ZSBjdXJyZW50TGV2ZWw6IExldmVsO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKHN0YXJ0T3B0czogTUdhbWVTdGFydE9wdGlvbnMpIHtcclxuICAgICAgICB0aGlzLm5vdyA9IDA7XHJcbiAgICAgICAgdGhpcy5kdCA9IDA7XHJcbiAgICAgICAgdGhpcy5sYXN0ID0gdGhpcy50aW1lc3RhbXAoKTtcclxuICAgICAgICB0aGlzLnN0ZXAgPSAxIC8gNjA7XHJcblxyXG4gICAgICAgIHRoaXMuY3VycmVudExldmVsID0gc3RhcnRPcHRzLnN0YXJ0TGV2ZWw7XHJcbiAgICAgICAgdGhpcy5jdXJyZW50TGV2ZWwuZ2FtZSA9IHRoaXM7XHJcbiAgICAgICAgdGhpcy5fbW9kdWxlcyA9IHN0YXJ0T3B0cy5tb2R1bGVzO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBpbml0aWFsaXplKCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuY2FudmFzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImNhbnZhc1wiKTtcclxuICAgICAgICB0aGlzLmNhbnZhcy53aWR0aCA9IDgwMDtcclxuICAgICAgICB0aGlzLmNhbnZhcy5oZWlnaHQgPSA2MDA7XHJcbiAgICAgICAgdGhpcy5jYW52YXMuaWQgPSBcImdhbWVcIjtcclxuICAgICAgICB0aGlzLmNvbnRleHQgPSB0aGlzLmNhbnZhcy5nZXRDb250ZXh0KFwiMmRcIik7XHJcblxyXG4gICAgICAgIEtleWJvYXJkLmluaXRpYWxpemUoKTtcclxuXHJcbiAgICAgICAgZG9jdW1lbnQuYm9keS5pbnNlcnRCZWZvcmUodGhpcy5jYW52YXMsIGRvY3VtZW50LmJvZHkuY2hpbGROb2Rlc1swXSk7ICBcclxuXHJcbiAgICAgICAgbGV0IHJlc0RpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XHJcbiAgICAgICAgcmVzRGl2LmlkID0gXCJyZXNvdXJjZXNcIjtcclxuICAgICAgICBcclxuICAgICAgICBkb2N1bWVudC5ib2R5Lmluc2VydEJlZm9yZShyZXNEaXYsIGRvY3VtZW50LmJvZHkuY2hpbGROb2Rlc1swXSk7XHJcblxyXG4gICAgICAgIHRoaXMuY3VycmVudExldmVsLnByZVN0YXJ0KCk7XHJcbiAgICAgICAgUmVzb3VyY2VMb2FkZXIuZ2V0SW5zdGFuY2UoKS5sb2FkKCgpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5jdXJyZW50TGV2ZWwuc3RhcnQoKTtcclxuICAgICAgICAgICAgdGhpcy51cGRhdGUoKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHVwZGF0ZSgpOiB2b2lkIHtcclxuICAgICAgICBLZXlib2FyZC51cGRhdGUoKTtcclxuXHJcbiAgICAgICAgdGhpcy5ub3cgPSB0aGlzLnRpbWVzdGFtcCgpO1xyXG4gICAgICAgIHRoaXMuZHQgPSB0aGlzLmR0ICsgTWF0aC5taW4oMSwgKHRoaXMubm93IC0gdGhpcy5sYXN0KSAvIDEwMDApO1xyXG5cclxuICAgICAgICB0aGlzLmN1cnJlbnRMZXZlbC51cGRhdGUodGhpcy5kdCk7XHJcblxyXG4gICAgICAgIGZvciAobGV0IG0gb2YgdGhpcy5fbW9kdWxlcykge1xyXG4gICAgICAgICAgICBtLnVwZGF0ZSh0aGlzLmR0KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgaWYgKHRoaXMuY29udGV4dCAhPT0gbnVsbCkge1xyXG4gICAgICAgICAgICBmb3IgKGxldCBtIG9mIHRoaXMuX21vZHVsZXMpIHtcclxuICAgICAgICAgICAgICAgIG0uZHJhdyh0aGlzLmNvbnRleHQpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLmxhc3QgPSB0aGlzLm5vdztcclxuXHJcbiAgICAgICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKHRoaXMudXBkYXRlLmJpbmQodGhpcykpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgdGltZXN0YW1wKCk6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIHdpbmRvdy5wZXJmb3JtYW5jZSAmJiB3aW5kb3cucGVyZm9ybWFuY2Uubm93ID8gd2luZG93LnBlcmZvcm1hbmNlLm5vdygpIDogbmV3IERhdGUoKS5nZXRUaW1lKCk7XHJcbiAgICB9XHJcbn1cclxuIiwiaW1wb3J0IHsgRW50aXR5IH0gZnJvbSBcIi4vZW50aXR5XCI7XHJcblxyXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgTW9kdWxlIHtcclxuXHJcbiAgICBwcm90ZWN0ZWQgX25lZWRzVXBkYXRlOiBib29sZWFuO1xyXG4gICAgcHJvdGVjdGVkIF9uZWVkc0RyYXc6IGJvb2xlYW47XHJcblxyXG4gICAgZ2V0IG5lZWRzVXBkYXRlKCk6IGJvb2xlYW4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9uZWVkc1VwZGF0ZTtcclxuICAgIH1cclxuICAgIGdldCBuZWVkc0RyYXcoKTogYm9vbGVhbiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX25lZWRzRHJhdztcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgdXBkYXRlKGR0OiBudW1iZXIpOiB2b2lkIHsgfVxyXG4gICAgcHVibGljIGRyYXcoY3R4OiBDYW52YXNSZW5kZXJpbmdDb250ZXh0MkQpOiB2b2lkIHsgfVxyXG5cclxuICAgIHB1YmxpYyBvbkVudGl0eUFkZGVkKGU6IEVudGl0eSk6IHZvaWQgeyB9XHJcbiAgICBwdWJsaWMgb25FbnRpdHlSZW1vdmVkKGVJZDogbnVtYmVyKTogdm9pZCB7IH1cclxufVxyXG4iLCJleHBvcnQgY2xhc3MgU2NlbmVOb2RlIHtcclxuICAgIFxyXG4gICAgcHJvdGVjdGVkIF9wYXJlbnQ6IFNjZW5lTm9kZSB8IG51bGw7XHJcbiAgICBwcm90ZWN0ZWQgX2NoaWxkcmVuOiBTY2VuZU5vZGVbXTtcclxuXHJcbiAgICBnZXQgcGFyZW50KCk6IFNjZW5lTm9kZSB8IG51bGx7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3BhcmVudDtcclxuICAgIH1cclxuICAgIHNldCBwYXJlbnQodmFsdWU6IFNjZW5lTm9kZSB8IG51bGwpIHtcclxuICAgICAgICB0aGlzLl9wYXJlbnQgPSB2YWx1ZTtcclxuICAgIH1cclxuICAgIGdldCBjaGlsZHJlbigpOiBTY2VuZU5vZGVbXSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2NoaWxkcmVuO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBhZGRDaGlsZChjaGlsZDogU2NlbmVOb2RlKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5fY2hpbGRyZW4ucHVzaChjaGlsZCk7XHJcbiAgICB9XHJcbn0iLCJpbXBvcnQgeyBCZWhhdmlvciB9IGZyb20gXCIuL2JlaGF2aW9yXCI7XHJcbmltcG9ydCB7IFJlc291cmNlTG9hZGVyIH0gZnJvbSBcIi4uL3V0aWxzL3Jlc291cmNlLWxvYWRlclwiO1xyXG5cclxuZXhwb3J0IGNsYXNzIFNwcml0ZSBleHRlbmRzIEJlaGF2aW9yIHtcclxuXHJcbiAgICBwcml2YXRlIF90ZXh0dXJlOiBIVE1MSW1hZ2VFbGVtZW50O1xyXG4gICAgcHJpdmF0ZSBfcGF0aDogc3RyaW5nO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKHBhdGg6IHN0cmluZykge1xyXG4gICAgICAgIHN1cGVyKCk7XHJcblxyXG4gICAgICAgIHRoaXMuX3BhdGggPSBwYXRoO1xyXG4gICAgfVxyXG5cclxuICAgIGdldCB0ZXh0dXJlKCk6IEhUTUxJbWFnZUVsZW1lbnQge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl90ZXh0dXJlO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBwcmVTdGFydCgpOiB2b2lkIHtcclxuICAgICAgICBSZXNvdXJjZUxvYWRlci5nZXRJbnN0YW5jZSgpLnF1ZXVlKFt0aGlzLl9wYXRoXSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHN0YXJ0KCkge1xyXG4gICAgICAgIHRoaXMuX3RleHR1cmUgPSBSZXNvdXJjZUxvYWRlci5nZXRJbnN0YW5jZSgpLmdldFJlc291cmNlPEhUTUxJbWFnZUVsZW1lbnQ+KHRoaXMuX3BhdGgpO1xyXG4gICAgfVxyXG59XHJcbiIsImV4cG9ydCBlbnVtIEtleUNvZGUge1xyXG4gICAgQkFDS1NQQUNFID0gOCxcclxuICAgIFRBQiA9IDksXHJcbiAgICBFTlRFUiA9IDEzLFxyXG4gICAgU0hJRlQgPSAxNixcclxuICAgIENUUkwgPSAxNyxcclxuICAgIEFMVCA9IDE4LFxyXG4gICAgUEFVU0UgPSAxOSxcclxuICAgIENBUFNfTE9DSyA9IDIwLFxyXG4gICAgRVNDQVBFID0gMjcsXHJcbiAgICBTUEFDRSA9IDMyLFxyXG4gICAgUEFHRV9VUCA9IDMzLFxyXG4gICAgUEFHRV9ET1dOID0gMzQsXHJcbiAgICBFTkQgPSAzNSxcclxuICAgIEhPTUUgPSAzNixcclxuICAgIExFRlRfQVJST1cgPSAzNyxcclxuICAgIFVQX0FSUk9XID0gMzgsXHJcbiAgICBSSUdIVF9BUlJPVyA9IDM5LFxyXG4gICAgRE9XTl9BUlJPVyA9IDQwLFxyXG4gICAgSU5TRVJUID0gNDUsXHJcbiAgICBERUxFVEUgPSA0NixcclxuICAgIEtFWV8wID0gNDgsXHJcbiAgICBLRVlfMSA9IDQ5LFxyXG4gICAgS0VZXzIgPSA1MCxcclxuICAgIEtFWV8zID0gNTEsXHJcbiAgICBLRVlfNCA9IDUyLFxyXG4gICAgS0VZXzUgPSA1MyxcclxuICAgIEtFWV82ID0gNTQsXHJcbiAgICBLRVlfNyA9IDU1LFxyXG4gICAgS0VZXzggPSA1NixcclxuICAgIEtFWV85ID0gNTcsXHJcbiAgICBLRVlfQSA9IDY1LFxyXG4gICAgS0VZX0IgPSA2NixcclxuICAgIEtFWV9DID0gNjcsXHJcbiAgICBLRVlfRCA9IDY4LFxyXG4gICAgS0VZX0UgPSA2OSxcclxuICAgIEtFWV9GID0gNzAsXHJcbiAgICBLRVlfRyA9IDcxLFxyXG4gICAgS0VZX0ggPSA3MixcclxuICAgIEtFWV9JID0gNzMsXHJcbiAgICBLRVlfSiA9IDc0LFxyXG4gICAgS0VZX0sgPSA3NSxcclxuICAgIEtFWV9MID0gNzYsXHJcbiAgICBLRVlfTSA9IDc3LFxyXG4gICAgS0VZX04gPSA3OCxcclxuICAgIEtFWV9PID0gNzksXHJcbiAgICBLRVlfUCA9IDgwLFxyXG4gICAgS0VZX1EgPSA4MSxcclxuICAgIEtFWV9SID0gODIsXHJcbiAgICBLRVlfUyA9IDgzLFxyXG4gICAgS0VZX1QgPSA4NCxcclxuICAgIEtFWV9VID0gODUsXHJcbiAgICBLRVlfViA9IDg2LFxyXG4gICAgS0VZX1cgPSA4NyxcclxuICAgIEtFWV9YID0gODgsXHJcbiAgICBLRVlfWSA9IDg5LFxyXG4gICAgS0VZX1ogPSA5MCxcclxuICAgIExFRlRfTUVUQSA9IDkxLFxyXG4gICAgUklHSFRfTUVUQSA9IDkyLFxyXG4gICAgU0VMRUNUID0gOTMsXHJcbiAgICBOVU1QQURfMCA9IDk2LFxyXG4gICAgTlVNUEFEXzEgPSA5NyxcclxuICAgIE5VTVBBRF8yID0gOTgsXHJcbiAgICBOVU1QQURfMyA9IDk5LFxyXG4gICAgTlVNUEFEXzQgPSAxMDAsXHJcbiAgICBOVU1QQURfNSA9IDEwMSxcclxuICAgIE5VTVBBRF82ID0gMTAyLFxyXG4gICAgTlVNUEFEXzcgPSAxMDMsXHJcbiAgICBOVU1QQURfOCA9IDEwNCxcclxuICAgIE5VTVBBRF85ID0gMTA1LFxyXG4gICAgTVVMVElQTFkgPSAxMDYsXHJcbiAgICBBREQgPSAxMDcsXHJcbiAgICBTVUJUUkFDVCA9IDEwOSxcclxuICAgIERFQ0lNQUwgPSAxMTAsXHJcbiAgICBESVZJREUgPSAxMTEsXHJcbiAgICBGMSA9IDExMixcclxuICAgIEYyID0gMTEzLFxyXG4gICAgRjMgPSAxMTQsXHJcbiAgICBGNCA9IDExNSxcclxuICAgIEY1ID0gMTE2LFxyXG4gICAgRjYgPSAxMTcsXHJcbiAgICBGNyA9IDExOCxcclxuICAgIEY4ID0gMTE5LFxyXG4gICAgRjkgPSAxMjAsXHJcbiAgICBGMTAgPSAxMjEsXHJcbiAgICBGMTEgPSAxMjIsXHJcbiAgICBGMTIgPSAxMjMsXHJcbiAgICBOVU1fTE9DSyA9IDE0NCxcclxuICAgIFNDUk9MTF9MT0NLID0gMTQ1LFxyXG4gICAgU0VNSUNPTE9OID0gMTg2LFxyXG4gICAgRVFVQUxTID0gMTg3LFxyXG4gICAgQ09NTUEgPSAxODgsXHJcbiAgICBEQVNIID0gMTg5LFxyXG4gICAgUEVSSU9EID0gMTkwLFxyXG4gICAgRk9SV0FSRF9TTEFTSCA9IDE5MSxcclxuICAgIEdSQVZFX0FDQ0VOVCA9IDE5MixcclxuICAgIE9QRU5fQlJBQ0tFVCA9IDIxOSxcclxuICAgIEJBQ0tfU0xBU0ggPSAyMjAsXHJcbiAgICBDTE9TRV9CUkFDS0VUID0gMjIxLFxyXG4gICAgU0lOR0xFX1FVT1RFID0gMjIyXHJcbn07XHJcblxyXG5leHBvcnQgY2xhc3MgS2V5Ym9hcmQge1xyXG4gICAgcHJpdmF0ZSBzdGF0aWMgcHJldktleXM6IGJvb2xlYW5bXSA9IFtdO1xyXG4gICAgcHJpdmF0ZSBzdGF0aWMga2V5czogYm9vbGVhbltdID0gW107XHJcblxyXG4gICAgc3RhdGljIGluaXRpYWxpemUoKTogdm9pZCB7XHJcbiAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJrZXlkb3duXCIsIGUgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLmtleXNbZS5rZXlDb2RlXSA9IHRydWU7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJrZXl1cFwiLCBlID0+IHtcclxuICAgICAgICAgICAgdGhpcy5rZXlzW2Uua2V5Q29kZV0gPSBmYWxzZTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBzdGF0aWMgdXBkYXRlKCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMucHJldktleXMgPSB0aGlzLmtleXM7XHJcbiAgICB9XHJcblxyXG4gICAgc3RhdGljIGlzS2V5RG93bihjb2RlOiBLZXlDb2RlKTogYm9vbGVhbiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMua2V5c1tjb2RlXTtcclxuICAgIH1cclxuXHJcbiAgICBzdGF0aWMgaXNLZXlVcChjb2RlOiBLZXlDb2RlKTogYm9vbGVhbiB7XHJcbiAgICAgICAgcmV0dXJuICF0aGlzLmtleXNbY29kZV07XHJcbiAgICB9XHJcblxyXG4gICAgc3RhdGljIGlzS2V5UHJlc3NlZChjb2RlOiBLZXlDb2RlKTogYm9vbGVhbiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMua2V5c1tjb2RlXSAmJiAhdGhpcy5wcmV2S2V5c1tjb2RlXTtcclxuICAgIH1cclxuXHJcbiAgICBzdGF0aWMgaXNLZXlSZWxlYXNlZChjb2RlOiBLZXlDb2RlKTogYm9vbGVhbiB7XHJcbiAgICAgICAgcmV0dXJuICF0aGlzLmtleXNbY29kZV0gJiYgdGhpcy5wcmV2S2V5c1tjb2RlXTtcclxuICAgIH1cclxufVxyXG4iLCJpbXBvcnQgeyBNR2FtZSB9IGZyb20gXCIuL2NvcmUvbS1nYW1lXCI7XHJcbmltcG9ydCB7IExldmVsIH0gZnJvbSBcIi4vY29yZS9sZXZlbFwiO1xyXG5pbXBvcnQgeyBFbnRpdHkgfSBmcm9tIFwiLi9jb3JlL2VudGl0eVwiO1xyXG5pbXBvcnQgeyBCZWhhdmlvciB9IGZyb20gXCIuL2NvcmUvYmVoYXZpb3JcIjtcclxuaW1wb3J0IHsgS2V5Ym9hcmQsIEtleUNvZGUgfSBmcm9tIFwiLi9pbnB1dC9rZXlib2FyZFwiO1xyXG5pbXBvcnQgeyBTcHJpdGUgfSBmcm9tIFwiLi9jb3JlL3Nwcml0ZVwiO1xyXG5pbXBvcnQgeyBSZW5kZXJlciB9IGZyb20gXCIuL21vZHVsZXMvcmVuZGVyZXJcIjtcclxuaW1wb3J0IHsgVmVjdG9yMiB9IGZyb20gXCIuL21hdGgvdmVjdG9yMlwiO1xyXG5pbXBvcnQgeyBCb3hDb2xsaWRlciB9IGZyb20gXCIuL2NvcmUvYm94LWNvbGxpZGVyXCI7XHJcblxyXG5jbGFzcyBQbGF5ZXIgZXh0ZW5kcyBCZWhhdmlvciB7XHJcblxyXG4gICAgcHJvdGVjdGVkIF9uZWVkc1VwZGF0ZTogYm9vbGVhbiA9IHRydWU7XHJcblxyXG4gICAgcHVibGljIHVwZGF0ZShkdDogbnVtYmVyKTogdm9pZCB7XHJcbiAgICAgICAgaWYgKEtleWJvYXJkLmlzS2V5RG93bihLZXlDb2RlLktFWV9EKSkge1xyXG4gICAgICAgICAgICB0aGlzLl9vd25lci5wb3NpdGlvbi54Kys7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChLZXlib2FyZC5pc0tleURvd24oS2V5Q29kZS5LRVlfQSkpIHtcclxuICAgICAgICAgICAgdGhpcy5fb3duZXIucG9zaXRpb24ueC0tO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoS2V5Ym9hcmQuaXNLZXlEb3duKEtleUNvZGUuU1BBQ0UpKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX293bmVyLmdldExldmVsKCkuYWRkRW50aXR5KG5ldyBFbnRpdHkoe1xyXG4gICAgICAgICAgICAgICAgbmFtZTogXCJzdGV2ZVwiLFxyXG4gICAgICAgICAgICAgICAgYmVoYXZpb3JzOiBbXHJcbiAgICAgICAgICAgICAgICAgICAgbmV3IFNwcml0ZShcImFzc2V0cy9wbGF5ZXIucG5nXCIpXHJcbiAgICAgICAgICAgICAgICBdLFxyXG4gICAgICAgICAgICAgICAgcG9zaXRpb246IHRoaXMuX293bmVyLnBvc2l0aW9uXHJcbiAgICAgICAgICAgIH0pKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuXHJcbndpbmRvdy5vbmxvYWQgPSAoKSA9PiB7XHJcbiAgICBsZXQgZSA9IG5ldyBFbnRpdHkoe1xyXG4gICAgICAgIG5hbWU6IFwic3RldmVcIixcclxuICAgICAgICBiZWhhdmlvcnM6IFtcclxuICAgICAgICAgICAgbmV3IFBsYXllcigpLFxyXG4gICAgICAgICAgICBuZXcgU3ByaXRlKFwiYXNzZXRzL3BsYXllci5wbmdcIiksXHJcbiAgICAgICAgICAgIG5ldyBCb3hDb2xsaWRlcigwLCAwLCA2NCwgNjQpXHJcbiAgICAgICAgXSxcclxuICAgICAgICBwb3NpdGlvbjogbmV3IFZlY3RvcjIoKVxyXG4gICAgfSk7XHJcbiAgICBcclxuICAgIGxldCBsZXZlbCA9IG5ldyBMZXZlbCgpO1xyXG4gICAgbGV2ZWwuYWRkRW50aXR5KGUpO1xyXG5cclxuICAgIGxldCBnYW1lID0gbmV3IE1HYW1lKHtcclxuICAgICAgICBzdGFydExldmVsOiBsZXZlbCxcclxuICAgICAgICBtb2R1bGVzOiBbXHJcbiAgICAgICAgICAgIG5ldyBSZW5kZXJlcigpXHJcbiAgICAgICAgXVxyXG4gICAgfSk7XHJcbiAgICBnYW1lLmluaXRpYWxpemUoKTtcclxufVxyXG4iLCJleHBvcnQgY2xhc3MgUmVjdCB7XHJcbiAgICBwdWJsaWMgeDogbnVtYmVyO1xyXG4gICAgcHVibGljIHk6IG51bWJlcjtcclxuICAgIHB1YmxpYyB3aWR0aDogbnVtYmVyO1xyXG4gICAgcHVibGljIGhlaWdodDogbnVtYmVyO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKHg/OiBudW1iZXIsIHk/OiBudW1iZXIsIHc/OiBudW1iZXIsIGg/OiBudW1iZXIpIHtcclxuICAgICAgICB0aGlzLnggPSB4IHx8IDA7XHJcbiAgICAgICAgdGhpcy55ID0geSB8fCAwO1xyXG4gICAgICAgIHRoaXMud2lkdGggPSB3IHx8IDA7XHJcbiAgICAgICAgdGhpcy5oZWlnaHQgPSBoIHx8IDA7XHJcbiAgICB9XHJcbn1cclxuIiwiZXhwb3J0IGNsYXNzIFZlY3RvcjIge1xyXG5cclxuICAgIC8vIGNvbXBvbmVudHNcclxuICAgIHB1YmxpYyB4OiBudW1iZXI7XHJcbiAgICBwdWJsaWMgeTogbnVtYmVyO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKHg/OiBudW1iZXIsIHk/OiBudW1iZXIpIHtcclxuICAgICAgICB0aGlzLnggPSB4IHx8IDA7XHJcbiAgICAgICAgdGhpcy55ID0geSB8fCAwO1xyXG4gICAgfVxyXG5cclxuICAgIGdldCBsZW5ndGgoKTogbnVtYmVyIHtcclxuICAgICAgICByZXR1cm4gTWF0aC5zcXJ0KFZlY3RvcjIuZG90KHRoaXMsIHRoaXMpKTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBzdGF0aWMgb3BlcmF0aW9uc1xyXG4gICAgc3RhdGljIGFkZCh2MTogVmVjdG9yMiwgdjI6IFZlY3RvcjIpOiBWZWN0b3IyIHtcclxuICAgICAgICByZXR1cm4gbmV3IFZlY3RvcjIodjEueCArIHYyLngsIHYxLnkgKyB2Mi55KTtcclxuICAgIH1cclxuXHJcbiAgICBzdGF0aWMgc3VidHJhY3QodjE6IFZlY3RvcjIsIHYyOiBWZWN0b3IyKTogVmVjdG9yMiB7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBWZWN0b3IyKHYxLnggLSB2Mi54LCB2MS55IC0gdjIueSk7XHJcbiAgICB9XHJcblxyXG4gICAgc3RhdGljIG11bHRpcGx5KHY6IFZlY3RvcjIsIHNjYWxhcjogbnVtYmVyKTogVmVjdG9yMiB7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBWZWN0b3IyKHYueCAqIHNjYWxhciwgdi55ICogc2NhbGFyKTtcclxuICAgIH1cclxuXHJcbiAgICBzdGF0aWMgZGl2aWRlKHY6IFZlY3RvcjIsIHNjYWxhcjogbnVtYmVyKTogVmVjdG9yMiB7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBWZWN0b3IyKHYueCAvIHNjYWxhciwgdi55IC8gc2NhbGFyKTtcclxuICAgIH1cclxuXHJcbiAgICBzdGF0aWMgZG90KHYxOiBWZWN0b3IyLCB2MjogVmVjdG9yMik6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuICh2MS54ICogdjIueCkgKyAodjEueSAqIHYyLnkpO1xyXG4gICAgfVxyXG59XHJcbiIsImltcG9ydCB7IE1vZHVsZSB9IGZyb20gXCIuLi9jb3JlL21vZHVsZVwiO1xyXG5pbXBvcnQgeyBFbnRpdHkgfSBmcm9tIFwiLi4vY29yZS9lbnRpdHlcIjtcclxuaW1wb3J0IHsgU3ByaXRlIH0gZnJvbSBcIi4uL2NvcmUvc3ByaXRlXCI7XHJcbmltcG9ydCB7IEtleWVkQ29sbGVjdGlvbiB9IGZyb20gXCIuLi91dGlscy9rZXllZC1jb2xsZWN0aW9uXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgUmVuZGVyZXIgZXh0ZW5kcyBNb2R1bGUge1xyXG5cclxuICAgIHByaXZhdGUgc3ByaXRlc0J5RW50aXR5SWQ6IEtleWVkQ29sbGVjdGlvbjxTcHJpdGU+ID0gbmV3IEtleWVkQ29sbGVjdGlvbjxTcHJpdGU+KCk7XHJcblxyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgc3VwZXIoKTtcclxuXHJcbiAgICAgICAgdGhpcy5fbmVlZHNEcmF3ID0gdHJ1ZTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgb25FbnRpdHlBZGRlZChlOiBFbnRpdHkpOiB2b2lkIHtcclxuICAgICAgICBsZXQgcyA9IGUuZ2V0QmVoYXZpb3JPZlR5cGUoU3ByaXRlKTtcclxuICAgICAgICBpZiAocyAhPT0gbnVsbCkge1xyXG4gICAgICAgICAgICB0aGlzLnNwcml0ZXNCeUVudGl0eUlkLmFkZChlLmlkLCBzKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIG9uRW50aXR5UmVtb3ZlZChlSWQ6IG51bWJlcik6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuc3ByaXRlc0J5RW50aXR5SWQucmVtb3ZlKGVJZCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGRyYXcoY3R4OiBDYW52YXNSZW5kZXJpbmdDb250ZXh0MkQpOiB2b2lkIHtcclxuICAgICAgICBjdHguY2xlYXJSZWN0KDAsIDAsIGN0eC5jYW52YXMud2lkdGgsIGN0eC5jYW52YXMuaGVpZ2h0KTtcclxuICAgICAgICBjdHguZmlsbFN0eWxlID0gXCJibGFja1wiO1xyXG4gICAgICAgIGN0eC5maWxsUmVjdCgwLCAwLCBjdHguY2FudmFzLndpZHRoLCBjdHguY2FudmFzLmhlaWdodCk7XHJcblxyXG4gICAgICAgIGZvciAobGV0IHMgb2YgdGhpcy5zcHJpdGVzQnlFbnRpdHlJZC52YWx1ZXMoKSkge1xyXG4gICAgICAgICAgICBsZXQgcG9zID0gcy5fb3duZXIucG9zaXRpb247XHJcbiAgICAgICAgICAgIGN0eC5kcmF3SW1hZ2Uocy50ZXh0dXJlLCBwb3MueCwgcG9zLnkpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG4iLCJleHBvcnQgY2xhc3MgSWRHZW5lcmF0b3Ige1xyXG4gICAgcHJpdmF0ZSBfbmV4dElkOiBudW1iZXIgPSAwO1xyXG4gICAgcHJpdmF0ZSBfYXZhaWxhYmxlSWRzOiBudW1iZXJbXSA9IFtdO1xyXG5cclxuICAgIHB1YmxpYyBnZXRJZCgpOiBudW1iZXIge1xyXG4gICAgICAgIGlmICh0aGlzLl9hdmFpbGFibGVJZHMubGVuZ3RoID09PSAwKSB7XHJcbiAgICAgICAgICAgIGxldCBpZCA9IHRoaXMuX25leHRJZDtcclxuICAgICAgICAgICAgdGhpcy5fbmV4dElkKys7XHJcbiAgICAgICAgICAgIHJldHVybiBpZDtcclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IGlkID0gPG51bWJlcj50aGlzLl9hdmFpbGFibGVJZHMucG9wKCk7XHJcbiAgICAgICAgcmV0dXJuIGlkO1xyXG4gICAgfVxyXG59IiwiZXhwb3J0IGludGVyZmFjZSBJS2V5ZWRDb2xsZWN0aW9uPFQ+IHtcclxuICAgIGFkZChrZXk6IG51bWJlciB8IHN0cmluZywgdmFsdWU6IFQpOiB2b2lkO1xyXG4gICAgY29udGFpbnNLZXkoa2V5OiBudW1iZXIgfCBzdHJpbmcpOiBib29sZWFuO1xyXG4gICAgY291bnQoKTogbnVtYmVyO1xyXG4gICAgaXRlbShrZXk6IG51bWJlciB8IHN0cmluZyk6IFQ7XHJcbiAgICByZW1vdmUoa2V5OiBudW1iZXIgfCBzdHJpbmcpOiBUO1xyXG4gICAgdmFsdWVzKCk6IFRbXTtcclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIEtleWVkQ29sbGVjdGlvbjxUPiBpbXBsZW1lbnRzIElLZXllZENvbGxlY3Rpb248VD4ge1xyXG4gICAgcHJpdmF0ZSBfaXRlbXM6IHsgW2luZGV4OiBudW1iZXJdOiBUIH0gPSB7fTtcclxuIFxyXG4gICAgcHJpdmF0ZSBfY291bnQ6IG51bWJlciA9IDA7XHJcbiBcclxuICAgIHB1YmxpYyBjb250YWluc0tleShrZXk6IG51bWJlcik6IGJvb2xlYW4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9pdGVtcy5oYXNPd25Qcm9wZXJ0eShrZXkpO1xyXG4gICAgfVxyXG4gXHJcbiAgICBwdWJsaWMgY291bnQoKTogbnVtYmVyIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fY291bnQ7XHJcbiAgICB9XHJcbiBcclxuICAgIHB1YmxpYyBhZGQoa2V5OiBudW1iZXIsIHZhbHVlOiBUKSB7XHJcbiAgICAgICAgaWYoIXRoaXMuX2l0ZW1zLmhhc093blByb3BlcnR5KGtleSkpXHJcbiAgICAgICAgICAgICB0aGlzLl9jb3VudCsrO1xyXG4gXHJcbiAgICAgICAgdGhpcy5faXRlbXNba2V5XSA9IHZhbHVlO1xyXG4gICAgfVxyXG4gXHJcbiAgICBwdWJsaWMgcmVtb3ZlKGtleTogbnVtYmVyKTogVCB7XHJcbiAgICAgICAgdmFyIHZhbCA9IHRoaXMuX2l0ZW1zW2tleV07XHJcbiAgICAgICAgZGVsZXRlIHRoaXMuX2l0ZW1zW2tleV07XHJcbiAgICAgICAgdGhpcy5fY291bnQtLTtcclxuICAgICAgICByZXR1cm4gdmFsO1xyXG4gICAgfVxyXG4gXHJcbiAgICBwdWJsaWMgaXRlbShrZXk6IG51bWJlcik6IFQge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9pdGVtc1trZXldO1xyXG4gICAgfVxyXG4gXHJcbiAgICBwdWJsaWMgdmFsdWVzKCk6IFRbXSB7XHJcbiAgICAgICAgdmFyIHZhbHVlczogVFtdID0gW107XHJcbiBcclxuICAgICAgICBmb3IgKHZhciBwcm9wIGluIHRoaXMuX2l0ZW1zKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLl9pdGVtcy5oYXNPd25Qcm9wZXJ0eShwcm9wKSkge1xyXG4gICAgICAgICAgICAgICAgdmFsdWVzLnB1c2godGhpcy5faXRlbXNbcHJvcF0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gXHJcbiAgICAgICAgcmV0dXJuIHZhbHVlcztcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIFN0cktleWVkQ29sbGVjdGlvbjxUPiBpbXBsZW1lbnRzIElLZXllZENvbGxlY3Rpb248VD4ge1xyXG4gICAgcHJpdmF0ZSBfaXRlbXM6IHsgW2luZGV4OiBzdHJpbmddOiBUIH0gPSB7fTtcclxuIFxyXG4gICAgcHJpdmF0ZSBfY291bnQ6IG51bWJlciA9IDA7XHJcbiBcclxuICAgIHB1YmxpYyBjb250YWluc0tleShrZXk6IHN0cmluZyk6IGJvb2xlYW4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9pdGVtcy5oYXNPd25Qcm9wZXJ0eShrZXkpO1xyXG4gICAgfVxyXG4gXHJcbiAgICBwdWJsaWMgY291bnQoKTogbnVtYmVyIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fY291bnQ7XHJcbiAgICB9XHJcbiBcclxuICAgIHB1YmxpYyBhZGQoa2V5OiBzdHJpbmcsIHZhbHVlOiBUKSB7XHJcbiAgICAgICAgaWYoIXRoaXMuX2l0ZW1zLmhhc093blByb3BlcnR5KGtleSkpXHJcbiAgICAgICAgICAgICB0aGlzLl9jb3VudCsrO1xyXG4gXHJcbiAgICAgICAgdGhpcy5faXRlbXNba2V5XSA9IHZhbHVlO1xyXG4gICAgfVxyXG4gXHJcbiAgICBwdWJsaWMgcmVtb3ZlKGtleTogc3RyaW5nKTogVCB7XHJcbiAgICAgICAgdmFyIHZhbCA9IHRoaXMuX2l0ZW1zW2tleV07XHJcbiAgICAgICAgZGVsZXRlIHRoaXMuX2l0ZW1zW2tleV07XHJcbiAgICAgICAgdGhpcy5fY291bnQtLTtcclxuICAgICAgICByZXR1cm4gdmFsO1xyXG4gICAgfVxyXG4gXHJcbiAgICBwdWJsaWMgaXRlbShrZXk6IHN0cmluZyk6IFQge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9pdGVtc1trZXldO1xyXG4gICAgfVxyXG4gXHJcbiAgICBwdWJsaWMga2V5cygpOiBudW1iZXJbXSB7XHJcbiAgICAgICAgdmFyIGtleVNldDogbnVtYmVyW10gPSBbXTtcclxuIFxyXG4gICAgICAgIGZvciAodmFyIHByb3AgaW4gdGhpcy5faXRlbXMpIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuX2l0ZW1zLmhhc093blByb3BlcnR5KHByb3ApKSB7XHJcbiAgICAgICAgICAgICAgICBrZXlTZXQucHVzaCgrcHJvcCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiBcclxuICAgICAgICByZXR1cm4ga2V5U2V0O1xyXG4gICAgfVxyXG4gXHJcbiAgICBwdWJsaWMgdmFsdWVzKCk6IFRbXSB7XHJcbiAgICAgICAgdmFyIHZhbHVlczogVFtdID0gW107XHJcbiBcclxuICAgICAgICBmb3IgKHZhciBwcm9wIGluIHRoaXMuX2l0ZW1zKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLl9pdGVtcy5oYXNPd25Qcm9wZXJ0eShwcm9wKSkge1xyXG4gICAgICAgICAgICAgICAgdmFsdWVzLnB1c2godGhpcy5faXRlbXNbcHJvcF0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gXHJcbiAgICAgICAgcmV0dXJuIHZhbHVlcztcclxuICAgIH1cclxufVxyXG4iLCJpbXBvcnQgeyBTdHJLZXllZENvbGxlY3Rpb24gfSBmcm9tIFwiLi9rZXllZC1jb2xsZWN0aW9uXCI7XHJcbmltcG9ydCAqIGFzIHBhdGggZnJvbSAncGF0aCc7XHJcblxyXG5leHBvcnQgY2xhc3MgUmVzb3VyY2VMb2FkZXIge1xyXG5cclxuICAgIHByaXZhdGUgX2NhY2hlOiBTdHJLZXllZENvbGxlY3Rpb248YW55PiA9IG5ldyBTdHJLZXllZENvbGxlY3Rpb248YW55PigpO1xyXG4gICAgcHJpdmF0ZSBfcXVldWU6IEFycmF5PHN0cmluZz4gPSBbXTtcclxuICAgIHByaXZhdGUgX2xvYWRDb3VudDogbnVtYmVyID0gMDtcclxuICAgIHByaXZhdGUgX2xvYWRlZENvdW50OiBudW1iZXIgPSAwO1xyXG5cclxuICAgIHByaXZhdGUgX2ltZ0V4dHM6IHN0cmluZ1tdID0gW1xyXG4gICAgICAgIFwiLmpwZ1wiLFxyXG4gICAgICAgIFwiLnBuZ1wiXHJcbiAgICBdO1xyXG4gICAgcHJpdmF0ZSBfYXVkRXh0czogc3RyaW5nW10gPSBbXHJcbiAgICAgICAgXCIud2F2XCJcclxuICAgIF07XHJcblxyXG4gICAgZ2V0IGlzRG9uZSgpOiBib29sZWFuIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fbG9hZGVkQ291bnQgPT09IHRoaXMuX2xvYWRDb3VudDtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHN0YXRpYyBfaW5zdGFuY2U6IFJlc291cmNlTG9hZGVyO1xyXG5cclxuICAgIHByaXZhdGUgY29uc3RydWN0b3IoKSB7IH1cclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIGdldEluc3RhbmNlKCk6IFJlc291cmNlTG9hZGVyIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5faW5zdGFuY2UgfHwgKHRoaXMuX2luc3RhbmNlID0gbmV3IFJlc291cmNlTG9hZGVyKCkpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXRSZXNvdXJjZTxUIGV4dGVuZHMgSFRNTEltYWdlRWxlbWVudCB8IEhUTUxBdWRpb0VsZW1lbnQ+KHBhdGg6IHN0cmluZyk6IFQge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9jYWNoZS5pdGVtKHBhdGgpIGFzIFQ7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHF1ZXVlKHJlczogc3RyaW5nW10pOiB2b2lkIHtcclxuICAgICAgICBmb3IgKGxldCBpIG9mIHJlcykge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5faW1nRXh0cy5zb21lKHggPT4geCA9PT0gaSkpIHtcclxuICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMuX3F1ZXVlLnB1c2goaSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBsb2FkKG9uQ29tcGxldGU6IEZ1bmN0aW9uKSB7XHJcbiAgICAgICAgdGhpcy5fbG9hZENvdW50ID0gdGhpcy5fcXVldWUubGVuZ3RoO1xyXG4gICAgICAgIGZvciAobGV0IHFkIG9mIHRoaXMuX3F1ZXVlKSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHBhdGguZXh0bmFtZShxZCkpO1xyXG4gICAgICAgICAgICBpZiAodGhpcy5faW1nRXh0cy5zb21lKHggPT4geCA9PT0gcGF0aC5leHRuYW1lKHFkKSkpIHtcclxuICAgICAgICAgICAgICAgIGxldCBpbWFnZSA9IG5ldyBJbWFnZSgpO1xyXG4gICAgICAgICAgICAgICAgbGV0IHRoYXQgPSB0aGlzO1xyXG4gICAgICAgICAgICAgICAgaW1hZ2UuYWRkRXZlbnRMaXN0ZW5lcihcImxvYWRcIiwgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoYXQuX2xvYWRlZENvdW50Kys7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoYXQuX2xvYWRlZENvdW50ID09PSB0aGF0Ll9sb2FkQ291bnQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgb25Db21wbGV0ZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgaW1hZ2Uuc3JjID0gcWQ7XHJcbiAgICAgICAgICAgICAgICB0aGF0Ll9jYWNoZS5hZGQocWQsIGltYWdlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAodGhpcy5fYXVkRXh0cy5zb21lKHggPT4geCA9PT0gcGF0aC5leHRuYW1lKHFkKSkpIHtcclxuICAgICAgICAgICAgICAgIGxldCBhdWRpbyA9IG5ldyBBdWRpbygpO1xyXG4gICAgICAgICAgICAgICAgYXVkaW8uYWRkRXZlbnRMaXN0ZW5lcihcImxvYWRcIiwgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2xvYWRlZENvdW50Kys7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuX2xvYWRlZENvdW50ID09PSB0aGlzLl9sb2FkQ291bnQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgb25Db21wbGV0ZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgYXVkaW8uc3JjID0gcWQ7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9jYWNoZS5hZGQocWQsIGF1ZGlvKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxufSJdLCJzb3VyY2VSb290IjoiIn0=