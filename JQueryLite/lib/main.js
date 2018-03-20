const DOMNodeCollection = require('./dom_node_collection.js')

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




