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