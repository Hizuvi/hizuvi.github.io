/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/***/ (() => {

eval("const debug_text = document.getElementById(\"debugText\");\r\nconst demo_button = document.getElementById(\"startButton\");\r\nlet is_running = false;\r\nfunction handleOrientation(event) {\r\n    debug_text.innerText = event.gamma.toString();\r\n}\r\ndemo_button.onclick = function (e) {\r\n    e.preventDefault();\r\n    if (DeviceMotionEvent &&\r\n        typeof DeviceMotionEvent.requestPermission === \"function\") {\r\n        DeviceMotionEvent.requestPermission();\r\n    }\r\n    if (is_running) {\r\n        window.removeEventListener(\"deviceorientation\", handleOrientation);\r\n        demo_button.innerHTML = \"Start demo\";\r\n        demo_button.classList.add('btn-success');\r\n        demo_button.classList.remove('btn-danger');\r\n        is_running = false;\r\n    }\r\n    else {\r\n        window.addEventListener(\"deviceorientation\", handleOrientation);\r\n        document.getElementById(\"start_demo\").innerHTML = \"Stop demo\";\r\n        demo_button.classList.remove('btn-success');\r\n        demo_button.classList.add('btn-danger');\r\n        is_running = true;\r\n    }\r\n};\r\n\n\n//# sourceURL=webpack://hizuvi.github.io/./src/index.ts?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/index.ts"]();
/******/ 	
/******/ })()
;