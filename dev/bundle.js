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
        this._id = -1;
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

Object.defineProperty(exports, "__esModule", { value: true });
var id_generator_1 = __webpack_require__(/*! ../utils/id-generator */ "./src/utils/id-generator.ts");
var keyed_collection_1 = __webpack_require__(/*! ../utils/keyed-collection */ "./src/utils/keyed-collection.ts");
var vector2_1 = __webpack_require__(/*! ../math/vector2 */ "./src/math/vector2.ts");
var Entity = (function () {
    function Entity(opt) {
        this._id = -1;
        this._name = "";
        this._position = new vector2_1.Vector2(0, 0);
        this._behaviorsById = new keyed_collection_1.KeyedCollection();
        this._behaviorsToUpdate = [];
        this._idGen = new id_generator_1.IdGenerator();
        this._name = opt.name;
        for (var _i = 0, _a = opt.behaviors; _i < _a.length; _i++) {
            var b = _a[_i];
            b._owner = this;
            this._behaviorsById.add(this._idGen.getId(), b);
            if (b.needsUpdate) {
                this._behaviorsToUpdate.push(b);
            }
        }
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
}());
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
    Level.prototype.draw = function () {
    };
    Level.prototype.end = function () {
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
        if (keyboard_1.Keyboard.isKeyPressed(keyboard_1.KeyCode.KEY_W)) {
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
            new TestBehavior()
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
        this.x = x;
        this.y = y;
    }
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
    KeyedCollection.prototype.keys = function () {
        var keySet = [];
        for (var prop in this._items) {
            if (this._items.hasOwnProperty(prop)) {
                keySet.push(+prop);
            }
        }
        return keySet;
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


/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvcmUvYmVoYXZpb3IudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvcmUvZW50aXR5LnRzIiwid2VicGFjazovLy8uL3NyYy9jb3JlL2xldmVsLnRzIiwid2VicGFjazovLy8uL3NyYy9jb3JlL20tZ2FtZS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvaW5wdXQva2V5Ym9hcmQudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL21haW4udHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL21hdGgvdmVjdG9yMi50cyIsIndlYnBhY2s6Ly8vLi9zcmMvdXRpbHMvaWQtZ2VuZXJhdG9yLnRzIiwid2VicGFjazovLy8uL3NyYy91dGlscy9rZXllZC1jb2xsZWN0aW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGtEQUEwQyxnQ0FBZ0M7QUFDMUU7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxnRUFBd0Qsa0JBQWtCO0FBQzFFO0FBQ0EseURBQWlELGNBQWM7QUFDL0Q7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlEQUF5QyxpQ0FBaUM7QUFDMUUsd0hBQWdILG1CQUFtQixFQUFFO0FBQ3JJO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsbUNBQTJCLDBCQUEwQixFQUFFO0FBQ3ZELHlDQUFpQyxlQUFlO0FBQ2hEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDhEQUFzRCwrREFBK0Q7O0FBRXJIO0FBQ0E7OztBQUdBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7OztBQ2hGQTtJ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SUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUN4QixJQUFJLENBQUMsTUFBTSxFQUFFLENBQUM7UUFDZCxPQUFPLEdBQUcsQ0FBQztJQUNmLENBQUM7SUFFTSw4QkFBSSxHQUFYLFVBQVksR0FBVztRQUNuQixPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDNUIsQ0FBQztJQUVNLDhCQUFJLEdBQVg7UUFDSSxJQUFJLE1BQU0sR0FBYSxFQUFFLENBQUM7UUFFMUIsS0FBSyxJQUFJLElBQUksSUFBSSxJQUFJLENBQUMsTUFBTSxFQUFFO1lBQzFCLElBQUksSUFBSSxDQUFDLE1BQU0sQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLEVBQUU7Z0JBQ2xDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQzthQUN0QjtTQUNKO1FBRUQsT0FBTyxNQUFNLENBQUM7SUFDbEIsQ0FBQztJQUVNLGdDQUFNLEdBQWI7UUFDSSxJQUFJLE1BQU0sR0FBUSxFQUFFLENBQUM7UUFFckIsS0FBSyxJQUFJLElBQUksSUFBSSxJQUFJLENBQUMsTUFBTSxFQUFFO1lBQzFCLElBQUksSUFBSSxDQUFDLE1BQU0sQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLEVBQUU7Z0JBQ2xDLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO2FBQ2xDO1NBQ0o7UUFFRCxPQUFPLE1BQU0sQ0FBQztJQUNsQixDQUFDO0lBQ0wsc0JBQUM7QUFBRCxDQUFDO0FBdERZLDBDQUFlIiwiZmlsZSI6ImJ1bmRsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vc3JjL21haW4udHNcIik7XG4iLCJpbXBvcnQgeyBFbnRpdHkgfSBmcm9tIFwiLi9lbnRpdHlcIjtcclxuXHJcbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBCZWhhdmlvciB7XHJcblxyXG4gICAgcHJpdmF0ZSBfaWQ6IG51bWJlciA9IC0xO1xyXG4gICAgcHJvdGVjdGVkIF9uZWVkc1VwZGF0ZTogYm9vbGVhbiA9IGZhbHNlO1xyXG5cclxuICAgIHB1YmxpYyBfb3duZXI6IEVudGl0eTtcclxuXHJcbiAgICBnZXQgbmVlZHNVcGRhdGUoKTogYm9vbGVhbiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX25lZWRzVXBkYXRlO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBwcmVTdGFydCgpOiB2b2lkIHsgfVxyXG4gICAgcHVibGljIHN0YXJ0KCk6IHZvaWQgeyB9XHJcbiAgICBwdWJsaWMgdXBkYXRlKGR0OiBudW1iZXIpOiB2b2lkIHsgfVxyXG4gICAgcHVibGljIGVuZCgpOiB2b2lkIHsgfVxyXG59IiwiaW1wb3J0IHsgQmVoYXZpb3IgfSBmcm9tIFwiLi9iZWhhdmlvclwiO1xyXG5pbXBvcnQgeyBJZEdlbmVyYXRvciB9IGZyb20gXCIuLi91dGlscy9pZC1nZW5lcmF0b3JcIjtcclxuaW1wb3J0IHsgS2V5ZWRDb2xsZWN0aW9uIH0gZnJvbSBcIi4uL3V0aWxzL2tleWVkLWNvbGxlY3Rpb25cIjtcclxuaW1wb3J0IHsgVmVjdG9yMiB9IGZyb20gXCIuLi9tYXRoL3ZlY3RvcjJcIjtcclxuaW1wb3J0IHsgTGV2ZWwgfSBmcm9tIFwiLi9sZXZlbFwiO1xyXG5cclxuZXhwb3J0IGludGVyZmFjZSBJRW50aXR5T3B0aW9ucyB7XHJcbiAgICBuYW1lOiBzdHJpbmc7XHJcbiAgICBiZWhhdmlvcnM6IEJlaGF2aW9yW107XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBFbnRpdHkge1xyXG5cclxuICAgIHByaXZhdGUgX2lkOiBudW1iZXIgPSAtMTtcclxuICAgIHByaXZhdGUgX25hbWU6IHN0cmluZyA9IFwiXCI7XHJcbiAgICBwcml2YXRlIF9wb3NpdGlvbjogVmVjdG9yMiA9IG5ldyBWZWN0b3IyKDAsIDApO1xyXG5cclxuICAgIHByaXZhdGUgX2JlaGF2aW9yc0J5SWQ6IEtleWVkQ29sbGVjdGlvbjxCZWhhdmlvcj4gPSBuZXcgS2V5ZWRDb2xsZWN0aW9uPEJlaGF2aW9yPigpO1xyXG4gICAgcHJpdmF0ZSBfYmVoYXZpb3JzVG9VcGRhdGU6IEJlaGF2aW9yW10gPSBbXTtcclxuXHJcbiAgICBwcml2YXRlIF9pZEdlbjogSWRHZW5lcmF0b3IgPSBuZXcgSWRHZW5lcmF0b3IoKTtcclxuXHJcbiAgICBwcml2YXRlIF9sZXZlbDogTGV2ZWw7XHJcblxyXG4gICAgZ2V0IGlkKCk6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2lkO1xyXG4gICAgfVxyXG4gICAgZ2V0IG5hbWUoKTogc3RyaW5nIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fbmFtZTtcclxuICAgIH1cclxuICAgIGdldCBwb3NpdGlvbigpOiBWZWN0b3IyIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fcG9zaXRpb247XHJcbiAgICB9XHJcbiAgICBnZXQgYmVoYXZpb3JDb3VudCgpOiBudW1iZXIge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9iZWhhdmlvcnNCeUlkLmNvdW50KCk7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3RydWN0b3Iob3B0OiBJRW50aXR5T3B0aW9ucykge1xyXG4gICAgICAgIHRoaXMuX25hbWUgPSBvcHQubmFtZTtcclxuXHJcbiAgICAgICAgZm9yIChsZXQgYiBvZiBvcHQuYmVoYXZpb3JzKSB7XHJcbiAgICAgICAgICAgIGIuX293bmVyID0gdGhpcztcclxuICAgICAgICAgICAgdGhpcy5fYmVoYXZpb3JzQnlJZC5hZGQodGhpcy5faWRHZW4uZ2V0SWQoKSwgYik7XHJcblxyXG4gICAgICAgICAgICBpZiAoYi5uZWVkc1VwZGF0ZSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fYmVoYXZpb3JzVG9VcGRhdGUucHVzaChiKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgX3NldElkKGlkOiBudW1iZXIpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLl9pZCA9IGlkO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBfc2V0TGV2ZWwobGV2ZWw6IExldmVsKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5fbGV2ZWwgPSBsZXZlbDtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0TGV2ZWwoKTogTGV2ZWwge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9sZXZlbDtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0QmVoYXZpb3JCeUlkKGlkOiBudW1iZXIpOiBCZWhhdmlvciB8IG51bGwge1xyXG4gICAgICAgIGlmICh0aGlzLl9iZWhhdmlvcnNCeUlkLml0ZW0oaWQpKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9iZWhhdmlvcnNCeUlkLml0ZW0oaWQpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0QmVoYXZpb3JPZlR5cGU8VCBleHRlbmRzIEJlaGF2aW9yPih0Y3RvcjogbmV3ICguLi5hcmdzOiBhbnlbXSkgPT4gVCk6IFQgfCBudWxsIHtcclxuICAgICAgICBmb3IgKGxldCBiIG9mIHRoaXMuX2JlaGF2aW9yc0J5SWQudmFsdWVzKCkpIHtcclxuICAgICAgICAgICAgaWYgKGIgaW5zdGFuY2VvZiB0Y3Rvcikge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGIgYXMgVDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgcHJlU3RhcnQoKTogdm9pZCB7XHJcbiAgICAgICAgZm9yIChsZXQgYiBvZiB0aGlzLl9iZWhhdmlvcnNCeUlkLnZhbHVlcygpKSB7XHJcbiAgICAgICAgICAgIGIucHJlU3RhcnQoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHN0YXJ0KCk6IHZvaWQge1xyXG4gICAgICAgIGZvciAobGV0IGIgb2YgdGhpcy5fYmVoYXZpb3JzQnlJZC52YWx1ZXMoKSkge1xyXG4gICAgICAgICAgICBiLnN0YXJ0KCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyB1cGRhdGUoZHQ6IG51bWJlcik6IHZvaWQge1xyXG4gICAgICAgIGZvciAobGV0IGIgb2YgdGhpcy5fYmVoYXZpb3JzVG9VcGRhdGUpIHtcclxuICAgICAgICAgICAgYi51cGRhdGUoZHQpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZW5kKCk6IHZvaWQge1xyXG4gICAgICAgIGZvciAobGV0IGIgb2YgdGhpcy5fYmVoYXZpb3JzQnlJZC52YWx1ZXMoKSkge1xyXG4gICAgICAgICAgICBiLmVuZCgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG4iLCJpbXBvcnQgeyBLZXllZENvbGxlY3Rpb24gfSBmcm9tIFwiLi4vdXRpbHMva2V5ZWQtY29sbGVjdGlvblwiO1xyXG5pbXBvcnQgeyBFbnRpdHkgfSBmcm9tIFwiLi9lbnRpdHlcIjtcclxuaW1wb3J0IHsgSWRHZW5lcmF0b3IgfSBmcm9tIFwiLi4vdXRpbHMvaWQtZ2VuZXJhdG9yXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgTGV2ZWwge1xyXG5cclxuICAgIHByaXZhdGUgX2VudGl0aWVzQnlJZDogS2V5ZWRDb2xsZWN0aW9uPEVudGl0eT47XHJcbiAgICBwcml2YXRlIF9lbnRpdGllc1RvQWRkOiBFbnRpdHlbXTtcclxuICAgIHByaXZhdGUgX2VudGl0aWVzVG9SZW1vdmU6IG51bWJlcltdO1xyXG5cclxuICAgIHByaXZhdGUgX2lkR2VuOiBJZEdlbmVyYXRvcjtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICB0aGlzLl9lbnRpdGllc0J5SWQgPSBuZXcgS2V5ZWRDb2xsZWN0aW9uPEVudGl0eT4oKTtcclxuICAgICAgICB0aGlzLl9lbnRpdGllc1RvQWRkID0gW107XHJcbiAgICAgICAgdGhpcy5fZW50aXRpZXNUb1JlbW92ZSA9IFtdO1xyXG5cclxuICAgICAgICB0aGlzLl9pZEdlbiA9IG5ldyBJZEdlbmVyYXRvcigpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBhZGRFbnRpdHkoZTogRW50aXR5KTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5fZW50aXRpZXNUb0FkZC5wdXNoKGUpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXRFbnRpdHlCeUlkKGlkOiBudW1iZXIpOiBFbnRpdHkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9lbnRpdGllc0J5SWQuaXRlbShpZCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHN0YXJ0KCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuX3VwZGF0ZUVudGl0eUxpc3RzKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHVwZGF0ZShkdDogbnVtYmVyKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5fdXBkYXRlRW50aXR5TGlzdHMoKTtcclxuXHJcbiAgICAgICAgZm9yIChsZXQgZSBvZiB0aGlzLl9lbnRpdGllc0J5SWQudmFsdWVzKCkpIHtcclxuICAgICAgICAgICAgZS51cGRhdGUoZHQpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZHJhdygpOiB2b2lkIHtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGVuZCgpOiB2b2lkIHtcclxuICAgICAgICBcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIF91cGRhdGVFbnRpdHlMaXN0cygpOiB2b2lkIHtcclxuICAgICAgICB3aGlsZSAodGhpcy5fZW50aXRpZXNUb1JlbW92ZS5sZW5ndGggIT09IDApIHtcclxuICAgICAgICAgICAgbGV0IGVJZCA9IDxudW1iZXI+dGhpcy5fZW50aXRpZXNUb1JlbW92ZS5wb3AoKTtcclxuICAgICAgICAgICAgbGV0IGUgPSB0aGlzLmdldEVudGl0eUJ5SWQoZUlkKTtcclxuICAgICAgICAgICAgZS5lbmQoKTtcclxuICAgICAgICAgICAgdGhpcy5fZW50aXRpZXNCeUlkLnJlbW92ZShlSWQpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZm9yIChsZXQgZSBvZiB0aGlzLl9lbnRpdGllc1RvQWRkKSB7XHJcbiAgICAgICAgICAgIGUuX3NldExldmVsKHRoaXMpO1xyXG4gICAgICAgICAgICBlLl9zZXRJZCh0aGlzLl9pZEdlbi5nZXRJZCgpKTtcclxuICAgICAgICAgICAgZS5wcmVTdGFydCgpO1xyXG4gICAgICAgICAgICB0aGlzLl9lbnRpdGllc0J5SWQuYWRkKGUuaWQsIGUpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgd2hpbGUgKHRoaXMuX2VudGl0aWVzVG9BZGQubGVuZ3RoICE9PSAwKSB7XHJcbiAgICAgICAgICAgIGxldCBlID0gPEVudGl0eT50aGlzLl9lbnRpdGllc1RvQWRkLnBvcCgpO1xyXG4gICAgICAgICAgICBlLnN0YXJ0KCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbiIsImltcG9ydCB7IEtleWJvYXJkIH0gZnJvbSBcIi4uL2lucHV0L2tleWJvYXJkXCI7XHJcbmltcG9ydCB7IExldmVsIH0gZnJvbSBcIi4vbGV2ZWxcIjtcclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgTUdhbWVTdGFydE9wdGlvbnMge1xyXG4gICAgc3RhcnRMZXZlbDogTGV2ZWw7XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBNR2FtZSB7XHJcbiAgICBwdWJsaWMgY2FudmFzOiBIVE1MQ2FudmFzRWxlbWVudDtcclxuICAgIHB1YmxpYyBjb250ZXh0OiBDYW52YXNSZW5kZXJpbmdDb250ZXh0MkQgfCBudWxsO1xyXG5cclxuICAgIHByaXZhdGUgbm93OiBudW1iZXI7XHJcbiAgICBwcml2YXRlIGR0OiBudW1iZXI7XHJcbiAgICBwcml2YXRlIGxhc3Q6IG51bWJlcjtcclxuICAgIHByaXZhdGUgc3RlcDogbnVtYmVyO1xyXG5cclxuICAgIHByaXZhdGUgaW50ZXJ2YWw6IG51bWJlcjtcclxuXHJcbiAgICBwcml2YXRlIGN1cnJlbnRMZXZlbDogTGV2ZWw7XHJcblxyXG4gICAgY29uc3RydWN0b3Ioc3RhcnRPcHRzOiBNR2FtZVN0YXJ0T3B0aW9ucykge1xyXG4gICAgICAgIHRoaXMubm93ID0gMDtcclxuICAgICAgICB0aGlzLmR0ID0gMDtcclxuICAgICAgICB0aGlzLmxhc3QgPSB0aGlzLnRpbWVzdGFtcCgpO1xyXG4gICAgICAgIHRoaXMuc3RlcCA9IDEgLyA2MDtcclxuXHJcbiAgICAgICAgdGhpcy5jdXJyZW50TGV2ZWwgPSBzdGFydE9wdHMuc3RhcnRMZXZlbDtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgaW5pdGlhbGl6ZSgpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLmNhbnZhcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJjYW52YXNcIik7XHJcbiAgICAgICAgdGhpcy5jYW52YXMud2lkdGggPSA4MDA7XHJcbiAgICAgICAgdGhpcy5jYW52YXMuaGVpZ2h0ID0gNjAwO1xyXG4gICAgICAgIHRoaXMuY2FudmFzLmlkID0gXCJnYW1lXCI7XHJcbiAgICAgICAgdGhpcy5jb250ZXh0ID0gdGhpcy5jYW52YXMuZ2V0Q29udGV4dChcIjJkXCIpO1xyXG5cclxuICAgICAgICBLZXlib2FyZC5pbml0aWFsaXplKCk7XHJcblxyXG4gICAgICAgIGRvY3VtZW50LmJvZHkuaW5zZXJ0QmVmb3JlKHRoaXMuY2FudmFzLCBkb2N1bWVudC5ib2R5LmNoaWxkTm9kZXNbMF0pOyAgXHJcblxyXG4gICAgICAgIGxldCByZXNEaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xyXG4gICAgICAgIHJlc0Rpdi5pZCA9IFwicmVzb3VyY2VzXCI7XHJcbiAgICAgICAgXHJcbiAgICAgICAgZG9jdW1lbnQuYm9keS5pbnNlcnRCZWZvcmUocmVzRGl2LCBkb2N1bWVudC5ib2R5LmNoaWxkTm9kZXNbMF0pO1xyXG5cclxuICAgICAgICB0aGlzLmN1cnJlbnRMZXZlbC5zdGFydCgpO1xyXG5cclxuICAgICAgICB0aGlzLnVwZGF0ZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgdXBkYXRlKCk6IHZvaWQge1xyXG4gICAgICAgIEtleWJvYXJkLnVwZGF0ZSgpO1xyXG5cclxuICAgICAgICB0aGlzLm5vdyA9IHRoaXMudGltZXN0YW1wKCk7XHJcbiAgICAgICAgdGhpcy5kdCA9IHRoaXMuZHQgKyBNYXRoLm1pbigxLCAodGhpcy5ub3cgLSB0aGlzLmxhc3QpIC8gMTAwMCk7XHJcblxyXG4gICAgICAgIHRoaXMuY3VycmVudExldmVsLnVwZGF0ZSh0aGlzLmR0KTtcclxuICAgICAgICBcclxuICAgICAgICBpZiAodGhpcy5jb250ZXh0ICE9PSBudWxsKSB7XHJcbiAgICAgICAgICAgIHRoaXMuY29udGV4dC5jbGVhclJlY3QoMCwgMCwgdGhpcy5jYW52YXMud2lkdGgsIHRoaXMuY2FudmFzLmhlaWdodCk7XHJcbiAgICAgICAgICAgIHRoaXMuY29udGV4dC5maWxsU3R5bGUgPSBcImJsYWNrXCI7XHJcbiAgICAgICAgICAgIHRoaXMuY29udGV4dC5maWxsUmVjdCgwLCAwLCB0aGlzLmNhbnZhcy53aWR0aCwgdGhpcy5jYW52YXMuaGVpZ2h0KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMubGFzdCA9IHRoaXMubm93O1xyXG4gICAgICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZSh0aGlzLnVwZGF0ZS5iaW5kKHRoaXMpKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHRpbWVzdGFtcCgpOiBudW1iZXIge1xyXG4gICAgICAgIHJldHVybiB3aW5kb3cucGVyZm9ybWFuY2UgJiYgd2luZG93LnBlcmZvcm1hbmNlLm5vdyA/IHdpbmRvdy5wZXJmb3JtYW5jZS5ub3coKSA6IG5ldyBEYXRlKCkuZ2V0VGltZSgpO1xyXG4gICAgfVxyXG59XHJcbiIsImV4cG9ydCBlbnVtIEtleUNvZGUge1xyXG4gICAgQkFDS1NQQUNFID0gOCxcclxuICAgIFRBQiA9IDksXHJcbiAgICBFTlRFUiA9IDEzLFxyXG4gICAgU0hJRlQgPSAxNixcclxuICAgIENUUkwgPSAxNyxcclxuICAgIEFMVCA9IDE4LFxyXG4gICAgUEFVU0UgPSAxOSxcclxuICAgIENBUFNfTE9DSyA9IDIwLFxyXG4gICAgRVNDQVBFID0gMjcsXHJcbiAgICBTUEFDRSA9IDMyLFxyXG4gICAgUEFHRV9VUCA9IDMzLFxyXG4gICAgUEFHRV9ET1dOID0gMzQsXHJcbiAgICBFTkQgPSAzNSxcclxuICAgIEhPTUUgPSAzNixcclxuICAgIExFRlRfQVJST1cgPSAzNyxcclxuICAgIFVQX0FSUk9XID0gMzgsXHJcbiAgICBSSUdIVF9BUlJPVyA9IDM5LFxyXG4gICAgRE9XTl9BUlJPVyA9IDQwLFxyXG4gICAgSU5TRVJUID0gNDUsXHJcbiAgICBERUxFVEUgPSA0NixcclxuICAgIEtFWV8wID0gNDgsXHJcbiAgICBLRVlfMSA9IDQ5LFxyXG4gICAgS0VZXzIgPSA1MCxcclxuICAgIEtFWV8zID0gNTEsXHJcbiAgICBLRVlfNCA9IDUyLFxyXG4gICAgS0VZXzUgPSA1MyxcclxuICAgIEtFWV82ID0gNTQsXHJcbiAgICBLRVlfNyA9IDU1LFxyXG4gICAgS0VZXzggPSA1NixcclxuICAgIEtFWV85ID0gNTcsXHJcbiAgICBLRVlfQSA9IDY1LFxyXG4gICAgS0VZX0IgPSA2NixcclxuICAgIEtFWV9DID0gNjcsXHJcbiAgICBLRVlfRCA9IDY4LFxyXG4gICAgS0VZX0UgPSA2OSxcclxuICAgIEtFWV9GID0gNzAsXHJcbiAgICBLRVlfRyA9IDcxLFxyXG4gICAgS0VZX0ggPSA3MixcclxuICAgIEtFWV9JID0gNzMsXHJcbiAgICBLRVlfSiA9IDc0LFxyXG4gICAgS0VZX0sgPSA3NSxcclxuICAgIEtFWV9MID0gNzYsXHJcbiAgICBLRVlfTSA9IDc3LFxyXG4gICAgS0VZX04gPSA3OCxcclxuICAgIEtFWV9PID0gNzksXHJcbiAgICBLRVlfUCA9IDgwLFxyXG4gICAgS0VZX1EgPSA4MSxcclxuICAgIEtFWV9SID0gODIsXHJcbiAgICBLRVlfUyA9IDgzLFxyXG4gICAgS0VZX1QgPSA4NCxcclxuICAgIEtFWV9VID0gODUsXHJcbiAgICBLRVlfViA9IDg2LFxyXG4gICAgS0VZX1cgPSA4NyxcclxuICAgIEtFWV9YID0gODgsXHJcbiAgICBLRVlfWSA9IDg5LFxyXG4gICAgS0VZX1ogPSA5MCxcclxuICAgIExFRlRfTUVUQSA9IDkxLFxyXG4gICAgUklHSFRfTUVUQSA9IDkyLFxyXG4gICAgU0VMRUNUID0gOTMsXHJcbiAgICBOVU1QQURfMCA9IDk2LFxyXG4gICAgTlVNUEFEXzEgPSA5NyxcclxuICAgIE5VTVBBRF8yID0gOTgsXHJcbiAgICBOVU1QQURfMyA9IDk5LFxyXG4gICAgTlVNUEFEXzQgPSAxMDAsXHJcbiAgICBOVU1QQURfNSA9IDEwMSxcclxuICAgIE5VTVBBRF82ID0gMTAyLFxyXG4gICAgTlVNUEFEXzcgPSAxMDMsXHJcbiAgICBOVU1QQURfOCA9IDEwNCxcclxuICAgIE5VTVBBRF85ID0gMTA1LFxyXG4gICAgTVVMVElQTFkgPSAxMDYsXHJcbiAgICBBREQgPSAxMDcsXHJcbiAgICBTVUJUUkFDVCA9IDEwOSxcclxuICAgIERFQ0lNQUwgPSAxMTAsXHJcbiAgICBESVZJREUgPSAxMTEsXHJcbiAgICBGMSA9IDExMixcclxuICAgIEYyID0gMTEzLFxyXG4gICAgRjMgPSAxMTQsXHJcbiAgICBGNCA9IDExNSxcclxuICAgIEY1ID0gMTE2LFxyXG4gICAgRjYgPSAxMTcsXHJcbiAgICBGNyA9IDExOCxcclxuICAgIEY4ID0gMTE5LFxyXG4gICAgRjkgPSAxMjAsXHJcbiAgICBGMTAgPSAxMjEsXHJcbiAgICBGMTEgPSAxMjIsXHJcbiAgICBGMTIgPSAxMjMsXHJcbiAgICBOVU1fTE9DSyA9IDE0NCxcclxuICAgIFNDUk9MTF9MT0NLID0gMTQ1LFxyXG4gICAgU0VNSUNPTE9OID0gMTg2LFxyXG4gICAgRVFVQUxTID0gMTg3LFxyXG4gICAgQ09NTUEgPSAxODgsXHJcbiAgICBEQVNIID0gMTg5LFxyXG4gICAgUEVSSU9EID0gMTkwLFxyXG4gICAgRk9SV0FSRF9TTEFTSCA9IDE5MSxcclxuICAgIEdSQVZFX0FDQ0VOVCA9IDE5MixcclxuICAgIE9QRU5fQlJBQ0tFVCA9IDIxOSxcclxuICAgIEJBQ0tfU0xBU0ggPSAyMjAsXHJcbiAgICBDTE9TRV9CUkFDS0VUID0gMjIxLFxyXG4gICAgU0lOR0xFX1FVT1RFID0gMjIyXHJcbn07XHJcblxyXG5leHBvcnQgY2xhc3MgS2V5Ym9hcmQge1xyXG4gICAgcHJpdmF0ZSBzdGF0aWMgcHJldktleXM6IGJvb2xlYW5bXSA9IFtdO1xyXG4gICAgcHJpdmF0ZSBzdGF0aWMga2V5czogYm9vbGVhbltdID0gW107XHJcblxyXG4gICAgc3RhdGljIGluaXRpYWxpemUoKTogdm9pZCB7XHJcbiAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJrZXlkb3duXCIsIGUgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLmtleXNbZS5rZXlDb2RlXSA9IHRydWU7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJrZXl1cFwiLCBlID0+IHtcclxuICAgICAgICAgICAgdGhpcy5rZXlzW2Uua2V5Q29kZV0gPSBmYWxzZTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBzdGF0aWMgdXBkYXRlKCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMucHJldktleXMgPSB0aGlzLmtleXM7XHJcbiAgICB9XHJcblxyXG4gICAgc3RhdGljIGlzS2V5RG93bihjb2RlOiBLZXlDb2RlKTogYm9vbGVhbiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMua2V5c1tjb2RlXTtcclxuICAgIH1cclxuXHJcbiAgICBzdGF0aWMgaXNLZXlVcChjb2RlOiBLZXlDb2RlKTogYm9vbGVhbiB7XHJcbiAgICAgICAgcmV0dXJuICF0aGlzLmtleXNbY29kZV07XHJcbiAgICB9XHJcblxyXG4gICAgc3RhdGljIGlzS2V5UHJlc3NlZChjb2RlOiBLZXlDb2RlKTogYm9vbGVhbiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMua2V5c1tjb2RlXSAmJiAhdGhpcy5wcmV2S2V5c1tjb2RlXTtcclxuICAgIH1cclxuXHJcbiAgICBzdGF0aWMgaXNLZXlSZWxlYXNlZChjb2RlOiBLZXlDb2RlKTogYm9vbGVhbiB7XHJcbiAgICAgICAgcmV0dXJuICF0aGlzLmtleXNbY29kZV0gJiYgdGhpcy5wcmV2S2V5c1tjb2RlXTtcclxuICAgIH1cclxufVxyXG4iLCJpbXBvcnQgeyBHYW1lIH0gZnJvbSBcIi4vY29yZS9nYW1lXCI7XHJcbmltcG9ydCB7IE1HYW1lIH0gZnJvbSBcIi4vY29yZS9tLWdhbWVcIjtcclxuaW1wb3J0IHsgTGV2ZWwgfSBmcm9tIFwiLi9jb3JlL2xldmVsXCI7XHJcbmltcG9ydCB7IEVudGl0eSB9IGZyb20gXCIuL2NvcmUvZW50aXR5XCI7XHJcbmltcG9ydCB7IEJlaGF2aW9yIH0gZnJvbSBcIi4vY29yZS9iZWhhdmlvclwiO1xyXG5pbXBvcnQgeyBLZXlib2FyZCwgS2V5Q29kZSB9IGZyb20gXCIuL2lucHV0L2tleWJvYXJkXCI7XHJcblxyXG5jbGFzcyBUZXN0QmVoYXZpb3IgZXh0ZW5kcyBCZWhhdmlvciB7XHJcblxyXG4gICAgcHJvdGVjdGVkIF9uZWVkc1VwZGF0ZTogYm9vbGVhbiA9IHRydWU7XHJcblxyXG4gICAgcHVibGljIHByZVN0YXJ0KCk6IHZvaWQge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiYmVoYXZpb3IgcHJlIHN0YXJ0ZWQhXCIpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzdGFydCgpOiB2b2lkIHtcclxuICAgICAgICBjb25zb2xlLmxvZyhcImJlaGF2aW9yIHN0YXJ0ZWQhXCIpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyB1cGRhdGUoZHQ6IG51bWJlcik6IHZvaWQge1xyXG4gICAgICAgIGlmIChLZXlib2FyZC5pc0tleVByZXNzZWQoS2V5Q29kZS5LRVlfVykpIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJXIHByZXNzZWQhXCIpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5cclxud2luZG93Lm9ubG9hZCA9ICgpID0+IHtcclxuICAgIGxldCBsZXZlbCA9IG5ldyBMZXZlbCgpO1xyXG4gICAgbGV0IGUgPSBuZXcgRW50aXR5KHtcclxuICAgICAgICBuYW1lOiBcInN0ZXZlXCIsXHJcbiAgICAgICAgYmVoYXZpb3JzOiBbXHJcbiAgICAgICAgICAgIG5ldyBUZXN0QmVoYXZpb3IoKVxyXG4gICAgICAgIF1cclxuICAgIH0pO1xyXG4gICAgbGV2ZWwuYWRkRW50aXR5KGUpO1xyXG5cclxuICAgIGxldCBnYW1lID0gbmV3IE1HYW1lKHtcclxuICAgICAgICBzdGFydExldmVsOiBsZXZlbFxyXG4gICAgfSk7XHJcbiAgICBnYW1lLmluaXRpYWxpemUoKTtcclxufVxyXG4iLCJleHBvcnQgY2xhc3MgVmVjdG9yMiB7XHJcbiAgICBwdWJsaWMgeDogbnVtYmVyO1xyXG4gICAgcHVibGljIHk6IG51bWJlcjtcclxuXHJcbiAgICBjb25zdHJ1Y3Rvcih4OiBudW1iZXIsIHk6IG51bWJlcikge1xyXG4gICAgICAgIHRoaXMueCA9IHg7XHJcbiAgICAgICAgdGhpcy55ID0geTtcclxuICAgIH1cclxufVxyXG4iLCJleHBvcnQgY2xhc3MgSWRHZW5lcmF0b3Ige1xyXG4gICAgcHJpdmF0ZSBfbmV4dElkOiBudW1iZXIgPSAwO1xyXG4gICAgcHJpdmF0ZSBfYXZhaWxhYmxlSWRzOiBudW1iZXJbXSA9IFtdO1xyXG5cclxuICAgIHB1YmxpYyBnZXRJZCgpOiBudW1iZXIge1xyXG4gICAgICAgIGlmICh0aGlzLl9hdmFpbGFibGVJZHMubGVuZ3RoID09PSAwKSB7XHJcbiAgICAgICAgICAgIGxldCBpZCA9IHRoaXMuX25leHRJZDtcclxuICAgICAgICAgICAgdGhpcy5fbmV4dElkKys7XHJcbiAgICAgICAgICAgIHJldHVybiBpZDtcclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IGlkID0gPG51bWJlcj50aGlzLl9hdmFpbGFibGVJZHMucG9wKCk7XHJcbiAgICAgICAgcmV0dXJuIGlkO1xyXG4gICAgfVxyXG59IiwiZXhwb3J0IGludGVyZmFjZSBJS2V5ZWRDb2xsZWN0aW9uPFQ+IHtcclxuICAgIGFkZChrZXk6IG51bWJlciwgdmFsdWU6IFQpOiB2b2lkO1xyXG4gICAgY29udGFpbnNLZXkoa2V5OiBudW1iZXIpOiBib29sZWFuO1xyXG4gICAgY291bnQoKTogbnVtYmVyO1xyXG4gICAgaXRlbShrZXk6IG51bWJlcik6IFQ7XHJcbiAgICBrZXlzKCk6IG51bWJlcltdO1xyXG4gICAgcmVtb3ZlKGtleTogbnVtYmVyKTogVDtcclxuICAgIHZhbHVlcygpOiBUW107XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBLZXllZENvbGxlY3Rpb248VD4gaW1wbGVtZW50cyBJS2V5ZWRDb2xsZWN0aW9uPFQ+IHtcclxuICAgIHByaXZhdGUgX2l0ZW1zOiB7IFtpbmRleDogbnVtYmVyXTogVCB9ID0ge307XHJcbiBcclxuICAgIHByaXZhdGUgX2NvdW50OiBudW1iZXIgPSAwO1xyXG4gXHJcbiAgICBwdWJsaWMgY29udGFpbnNLZXkoa2V5OiBudW1iZXIpOiBib29sZWFuIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5faXRlbXMuaGFzT3duUHJvcGVydHkoa2V5KTtcclxuICAgIH1cclxuIFxyXG4gICAgcHVibGljIGNvdW50KCk6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2NvdW50O1xyXG4gICAgfVxyXG4gXHJcbiAgICBwdWJsaWMgYWRkKGtleTogbnVtYmVyLCB2YWx1ZTogVCkge1xyXG4gICAgICAgIGlmKCF0aGlzLl9pdGVtcy5oYXNPd25Qcm9wZXJ0eShrZXkpKVxyXG4gICAgICAgICAgICAgdGhpcy5fY291bnQrKztcclxuIFxyXG4gICAgICAgIHRoaXMuX2l0ZW1zW2tleV0gPSB2YWx1ZTtcclxuICAgIH1cclxuIFxyXG4gICAgcHVibGljIHJlbW92ZShrZXk6IG51bWJlcik6IFQge1xyXG4gICAgICAgIHZhciB2YWwgPSB0aGlzLl9pdGVtc1trZXldO1xyXG4gICAgICAgIGRlbGV0ZSB0aGlzLl9pdGVtc1trZXldO1xyXG4gICAgICAgIHRoaXMuX2NvdW50LS07XHJcbiAgICAgICAgcmV0dXJuIHZhbDtcclxuICAgIH1cclxuIFxyXG4gICAgcHVibGljIGl0ZW0oa2V5OiBudW1iZXIpOiBUIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5faXRlbXNba2V5XTtcclxuICAgIH1cclxuIFxyXG4gICAgcHVibGljIGtleXMoKTogbnVtYmVyW10ge1xyXG4gICAgICAgIHZhciBrZXlTZXQ6IG51bWJlcltdID0gW107XHJcbiBcclxuICAgICAgICBmb3IgKHZhciBwcm9wIGluIHRoaXMuX2l0ZW1zKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLl9pdGVtcy5oYXNPd25Qcm9wZXJ0eShwcm9wKSkge1xyXG4gICAgICAgICAgICAgICAga2V5U2V0LnB1c2goK3Byb3ApO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gXHJcbiAgICAgICAgcmV0dXJuIGtleVNldDtcclxuICAgIH1cclxuIFxyXG4gICAgcHVibGljIHZhbHVlcygpOiBUW10ge1xyXG4gICAgICAgIHZhciB2YWx1ZXM6IFRbXSA9IFtdO1xyXG4gXHJcbiAgICAgICAgZm9yICh2YXIgcHJvcCBpbiB0aGlzLl9pdGVtcykge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5faXRlbXMuaGFzT3duUHJvcGVydHkocHJvcCkpIHtcclxuICAgICAgICAgICAgICAgIHZhbHVlcy5wdXNoKHRoaXMuX2l0ZW1zW3Byb3BdKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuIFxyXG4gICAgICAgIHJldHVybiB2YWx1ZXM7XHJcbiAgICB9XHJcbn1cclxuIl0sInNvdXJjZVJvb3QiOiIifQ==