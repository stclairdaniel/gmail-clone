class DOMNodeCollection {
  constructor (array) {
    this.elements = array;
  }

  html (string) {
    if (string === undefined) {
      return this.elements[0].innerHTML;
    } else {
      this.elements.forEach((el) => {el.innerHTML = string;});
    }
  }

  empty () {
    this.elements.forEach((el) => {el.innerHTML = "";});
  }

  append (new_el) {
    this.elements.forEach((el) => {el.innerHTML = el.innerHTML + new_el;});
  }

  attr (property, value) {
    let el = this.elements[0];
    if (value === undefined) {
      return el.getAttribute(property);
    } else {
      el.setAttribute(property, value);
    }
  }

  addClass (className) {
    let el = this.elements[0];
      el.classList.add(className);
  }

  removeClass (className) {
    let el = this.elements[0];
      el.classList.remove(className);
  }

  children () {
    let result = [];

    this.elements.forEach((child) => {
      let children = child.children;

      for (let i = 0; i < children.length; i++) {
        result.push(children[i]);
      }
    });

    return new DOMNodeCollection(result);
  }

  parent () {
    let result = [];

    this.elements.forEach((child) => {
      result.push(child.parentElement);
    });

    return new DOMNodeCollection(result);
  }

  find (selector) {
    let baseEl = this.elements[0];
    let query = baseEl.querySelectorAll(selector);
    return new DOMNodeCollection(query);
  }

  remove() {
    this.elements.forEach((el) => {
      let children = el.children;
      for (let i = 0; i < children.length;) {
        el.removeChild(children[i]);
      }
    });
    this.elements = [];
  }

  on(action, callback) {
    this.elements.forEach((el) => {
      el.addEventListener(action, callback);
    });
  }

  off(action, callback) {
    this.elements.forEach((el) => {
      el.removeEventListener(action, callback);
    });
  }
}
module.exports = DOMNodeCollection;
