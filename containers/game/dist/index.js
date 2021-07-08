/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _input__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./input */ \"./src/input.ts\");\nconsole.log(\"Ver: 6\");\r\n\r\nconst demo_button = document.getElementById(\"startButton\");\r\nconst textRot = document.getElementById(\"rot\");\r\nconst textMov = document.getElementById(\"mov\");\r\ndemo_button.addEventListener(\"click\", (e) => {\r\n    const motionManager = new _input__WEBPACK_IMPORTED_MODULE_0__.MotionManager();\r\n    update(motionManager);\r\n});\r\nfunction update(motionManager) {\r\n    textRot.innerText = motionManager.rotation.toString();\r\n    textMov.innerText = motionManager.movement.toString();\r\n    setTimeout(() => { update(motionManager); }, 16);\r\n}\r\n\n\n//# sourceURL=webpack://hizuvi.github.io/./src/index.ts?");

/***/ }),

/***/ "./src/input.ts":
/*!**********************!*\
  !*** ./src/input.ts ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"MotionManager\": () => (/* binding */ MotionManager)\n/* harmony export */ });\nclass MotionManager {\r\n    rotation;\r\n    movement;\r\n    usingMouse;\r\n    setupMouse = () => {\r\n        if (this.usingMouse)\r\n            return;\r\n        window.removeEventListener(\"deviceorientation\", this.handleOrientation);\r\n        window.removeEventListener(\"devicemotion\", this.handleMotion);\r\n        window.addEventListener(\"mousemove\", this.handleMouse);\r\n        this.usingMouse = true;\r\n    };\r\n    handleMouse = (event) => {\r\n        const rotation = (event.clientX / window.innerWidth - .5) * 2\r\n            * 60;\r\n        const rangeRot = 30;\r\n        this.rotation = Math.max(-rangeRot, Math.min(rangeRot, rotation));\r\n        const movement = Math.abs(event.movementY) / window.innerHeight * 500;\r\n        const range = 20;\r\n        this.movement = Math.max(0, Math.min(range, movement));\r\n    };\r\n    handleOrientation = (event) => {\r\n        if (event.gamma === null) {\r\n            this.setupMouse();\r\n            return;\r\n        }\r\n        const range = 30;\r\n        this.rotation = Math.max(-range, Math.min(range, getRotation(event.alpha, event.beta, event.gamma)));\r\n    };\r\n    handleMotion = (event) => {\r\n        if (event.acceleration.x === null) {\r\n            this.setupMouse();\r\n            return;\r\n        }\r\n        const range = 20;\r\n        this.movement = Math.min(range, getSpeed(event.acceleration.x, event.acceleration.y, event.acceleration.z));\r\n    };\r\n    constructor() {\r\n        this.rotation = 0;\r\n        this.movement = 0;\r\n        this.usingMouse = false;\r\n        if (!DeviceMotionEvent) {\r\n            throw Error(\"unsupported\");\r\n        }\r\n        if (typeof DeviceMotionEvent.requestPermission === \"function\") {\r\n            DeviceMotionEvent.requestPermission();\r\n        }\r\n        window.addEventListener(\"deviceorientation\", this.handleOrientation);\r\n        window.addEventListener(\"devicemotion\", this.handleMotion);\r\n    }\r\n}\r\nfunction getRotation(alpha, beta, gamma) {\r\n    const betaR = beta / 180 * Math.PI;\r\n    const gammaR = gamma / 180 * Math.PI;\r\n    const spinR = Math.atan2(Math.cos(betaR) * Math.sin(gammaR), Math.sin(betaR));\r\n    return spinR * 180 / Math.PI;\r\n}\r\nfunction getSpeed(alpha, beta, gamma) {\r\n    return Math.sqrt(alpha * alpha + beta * beta + gamma * gamma) * 10;\r\n}\r\n\n\n//# sourceURL=webpack://hizuvi.github.io/./src/input.ts?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.ts");
/******/ 	
/******/ })()
;