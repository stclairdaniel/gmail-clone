const DOMNodeCollection = require('./dom_node_collection.js');

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
