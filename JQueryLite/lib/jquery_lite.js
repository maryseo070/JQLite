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
const _docReady = false;

  let tester = document.querySelectorAll("li");

  // document.addEventListener("DOMContentLoaded", () => {
  //   _docReady = true;
  //   functionQueue.forEach(event => {
  //     event();
  //   });
  //   functionQueue = [];
  // });

  window.$l = (arg) => {
      if (arg instanceof HTMLElement) {
      return new DOMNodeCollection([arg]);
    } else if (arg instanceof Function) {
      if (document.readyState === "complete") {
        arg();
      } else {
        functionQueue.push(arg);
        document.addEventListener("DOMContentLoaded", executeFunctions);
      }
    } else {
      return new DOMNodeCollection(Array.from(document.querySelectorAll(arg)));
    }
  };


  $l.extend = (base, ...otherObjs) => {
    otherObjs.forEach((obj) => {
      for (const key in obj) {
        base[key] = obj[key];
      }
    });
    return base;
  };

  toQueryString = (obj) => {
    let string = "";
    for (const key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, prop)) {
        string += `${key}=${obj[key]}&`
      }
    }
    return string.substring(0, string.length - 1);
  }

   $l.ajax = (options) => {
     return new Promise((resolve, reject) => {
       const request = new XMLHttpRequest();
       const method = options.method ? `${options.method}`.toUpperCase() : "GET";
       const data = options.data ? options.data : {};
       const url = options.url;
       const success = options.success ? options.success : {};

       request.open(method, url)
       request.onload = () => {
         if (request.status >= 200 && request.status < 300) {
           resolve(JSON.parse(request.response));
           options.success(request.response)
         } else {
           reject({
             status: request.status,
             statusText: request.statusText
           });
         }};

         request.onerror = () => {
           reject({
             status: request.status,
             statusText: request.statusText
           });
         }

         request.send(data)
     })
  };

    $l.executeFunctions = () => {
      functionQueue.forEach(el => el());
    };


/***/ }),
/* 1 */
/***/ (function(module, exports) {

class DOMNodeCollection {

  constructor (htmlelements) {
    this.els = htmlelements;
  }

  html(str) {
    if (str) {
      this.els.forEach(el => el.innerHTML = str)
    }
    else {
      return this.els[0].innerHTML;
    }
  }

  empty() {
    this.els.forEach(el => el.innerHTML = "");
  }

  append(argument) {
    if (this.els.length === 0) return ;
    if (typeof argument === 'object' &&
      !(argument instanceof DOMNodeCollection)) {
        argument = $l(argument)
      }

    if (typeof argument === 'string') {
      this.els.forEach((el) => {
        el.innerHTML += argument;
      })
    }

    else if (argument instanceof DOMNodeCollection ) {
      this.els.forEach( (el) => {
        argument.els.forEach((child) => {
          el.appendChild(child.cloneNode(true))
        })

      })
    }

  }

  attr(key, val) {
   if (typeof val === "string") {
     this.els.forEach(node => node.setAttribute(key, val));
   } else {
     return this.nodes[0].getAttribute(key);
   }
 }

  addClass(name) {
    this.els.forEach( (el) => el.classList.add(name));
  }

  removeClass(name) {
    this.els.forEach( (el) => el.classList.remove(name));
  }

  toggleClass(toggleClass) {
    this.els.forEach( (el) => el.classList.toggle(toggleClass))
  }

  children() {
    let kiddos = [];
    this.els.forEach( (el) => {
      // console.log(node.children)
      let childNodes = el.children
      kiddos = kiddos.concat(Array(childNodes))
    })
    return new DOMNodeCollection(kiddos)
  }

  parent () {
    let parentNodes = [];
    this.els.forEach( (el) => {
      if (!parentNodes.includes(el.parentNode))
      parentNodes.push(el.parentNode);
    })
    return new DOMNodeCollection(parentNodes)

  }

  find(selector) {
    let arr = [];
    this.els.forEach( el => {
      let nodeList = el.querySelectorAll(selector)
      arr = arr.concat(Array(nodeList))
    })
    return new DOMNodeCollection(arr);
  }
  //
  remove() {
    this.els.forEach((el) => el.parentNode.removeChild(el))

  }

  on(type, fnc) {
    this.els.forEach(el => {
      el.addEventListener(type, fnc);
      const eventKey = `jqe-${type}`;
      if (typeof el[eventKey] === 'undefined') {
        el[eventKey] = [];
      }
      el[eventKey].push(fnc);
    });
  }

  off(type) {
    this.els.forEach( (el) => {
      const eventKey = `jqe-${type}`;
      if (el[eventKey]) {
        el[eventKey].forEach((callback) => {
          el.removeEventListener(type, callback);
        });
      }
      el[eventKey] = [];
    })
  }

}


module.exports = DOMNodeCollection;


/***/ })
/******/ ]);
//# sourceMappingURL=jquery_lite.js.map