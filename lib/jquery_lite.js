/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	const DOMNodeCollection = __webpack_require__(1);

	window.$l = function (selector) {
	  if (typeof selector === 'function') {
	    document.addEventListener("DOMContentLoaded", selector);
	  } else {
	    return selection(selector);
	  }
	};

	$l.extend = function (...objects) {
	  const resObject = {};

	  objects.forEach( (obj) => {
	    Object.keys(obj).forEach ( (key) => {
	      resObject[key] = obj[key];
	    });
	  });
	  objects.forEach( (obj) => {
	    Object.keys(resObject).forEach ( (key) => {
	      obj[key] = resObject[key];
	    });
	  });

	  return resObject;
	};

	$l.ajax = function (options) {
	  const defaults = {
	    method: 'GET',
	    url: window.location.pathname,
	    data: {},
	    contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
	    success: (res) => {
	      console.log(res.status);
	      console.log('success!!');
	    },
	    error: (res) => {
	      console.log(res.status);
	      console.log('nope');
	    }
	  };

	  let request = $l.extend(defaults, options);

	  const xhr = new XMLHttpRequest();

	  xhr.open(request.method, request.url);
	  // step 3 - register a callback
	  xhr.onload = function () {
	    if (xhr.status === 200) {
	      // debugger
	      request.success(xhr.response);
	    } else if (xhr.status === 400) {
	      request.error(xhr.response);
	    }
	  };

	  // step 4 - send off the request with optional data
	  const optionalData = request.data;
	  xhr.send(optionalData);
	};

	const selection = function (selector) {
	  let result = [];

	  if (typeof selector === 'string') {
	    // debugger;
	    let nodelist = document.querySelectorAll(selector);
	    for (let i = 0; i < nodelist.length; i++) {
	      result.push(nodelist[i]);
	    }
	  } else {
	    result.push(selector);
	  }

	  return new DOMNodeCollection(result);
	};


/***/ },
/* 1 */
/***/ function(module, exports) {

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


/***/ }
/******/ ]);