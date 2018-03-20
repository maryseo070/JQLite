const DOMNodeCollection = require('./dom_node_collection.js')

const functionQueue = []; 
const _docReady = false;

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
    
  
  $l.extend = (base, ...otherObjs) => {
    otherObjs.forEach((obj) => {
      for (const key in obj) {
        base[key] = obj[key]
      }
    })
    return base;
  }

   $l.ajax = (options) => {
    const request = new XMLHttpRequest();
    request.open(options.method, options.URL)
    request.onload = () => {
      if (this.status >= 200 && this.status < 300) {
        resolve(request.response);
      } else {
        reject({
          status: this.status,
          statusText: request.statusText
        });
    };
    
    request.onerror = () => {
      reject({
        status: this.status,
        statusText: request.statusText
      });
    }
    request.send(data)
    
    const defaults = {
      contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
      method: "GET",
      url: "",
      success: () => {},
      error: () => {},
      data: {},
    };
    
    options = $l.extend(defaults, options);
    options.method = options.method.toUpperCase();
    
    if (options.method === "GET") {
      options.url += `?${toQueryString(options.data)}`
    }
    
    }
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
  
  getNodesFromDom = (selector) => {
    const nodes = document.querySelectorAll(selector);
    const nodesArray = Array.from(nodes);
    return new DomNodeCollection(nodesArray);
  };
  
  document.addEventListener('DOMContentLoaded', () => {
    _docReady = true;
    functionQueue.forEach(func => func());
  });
  // 
  
  registerDocReadyCallback = (func) => {
  if (!_docReady) {
    functionQueue.push(func);
  } else {
    func();
    }
  };

  $l.execute = () => {
    functionQueue.forEach(el => el())
  }

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




