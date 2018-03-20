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
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
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
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

const DOMNodeCollection = __webpack_require__(1)

const functionQueue = []; 

  let tester = document.querySelectorAll("li");
  // console.log(tester)
  
  
  window.$l = (arg) => {
    if (arg instanceof HTMLElement) {
      return new DOMNodeCollection(Array.from(arg))
    } else if (arg instanceof Function) {
      if (document.readyState === 'complete') {
        arg();
      } else {
        functionQueue.push(arg);
        document.addEventListener('DOMContentLoaded', execute) 
      }
    } else {
      return new DOMNodeCollection(Array.from(document.querySelectorAll(arg)))
    }
  }
    
  
  $l.extend = () => {
    const args = Array.from(arguments) 
    const obj = {}
    
    for (let i = 0; i < args.length; i++) {
      for (let j in args[i]) {
        obj[j] = args[i][j]
      }
    }
    return obj;
  }

   $l.ajax = (obj) => {
    const request = new XMLHttpRequest();
    const method_name = `${obj.method}`.toUpperCase();
    request.open(obj.method, obj.URL)
  }

  // 
  // execute = () => {
  //   functionQueue.forEach(el => el())
  // }

// $l(() => {
// 
//   $l('li').on('click', sayboop)
// 
// })
// 
// function sayboop () {
//   console.log('boop')
// }
// 






/***/ }),
/* 1 */
/***/ (function(module, exports) {

throw new Error("Module parse failed: Unexpected token (111:9)\nYou may need an appropriate loader to handle this file type.\n|     })\n|   }\n|     for (var i = 0; i < this.els.length; i++) {\n|       for (var j = 0; j < this.els[i].handlers[type].length; j++) {\n|         this.els[i].removeEventListener(type, handlers[type][j])");

/***/ })
/******/ ]);