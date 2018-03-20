const DOMNodeCollection = require('./dom_node_collection.js')

const functionQueue = [];
const _docReady = false;

  let tester = document.querySelectorAll("li");


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
        base[key] = obj[key]
      }
    })
    return base;
  }

  toQueryString = (obj) => {
    let string = ""
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
           // options.success(request.response)
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


  //
  // getNodesFromDom = (selector) => {
  //   const nodes = document.querySelectorAll(selector);
  //   const nodesArray = Array.from(nodes);
  //   return new DomNodeCollection(nodesArray);
  // };


  // registerDocReadyCallback = (func) => {
  // if (!_docReady) {
  //   functionQueue.push(func);
  // } else {
  //   func();
  //   }
  // };

  // document.addEventListener('DOMContentLoaded', () => {
  //   _docReady = true;
  //   functionQueue.forEach(func => func());
  // });
