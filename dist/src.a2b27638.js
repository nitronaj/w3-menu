// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"node_modules/parcel-bundler/src/builtins/bundle-url.js":[function(require,module,exports) {
var bundleURL = null;

function getBundleURLCached() {
  if (!bundleURL) {
    bundleURL = getBundleURL();
  }

  return bundleURL;
}

function getBundleURL() {
  // Attempt to find the URL of the current script and use that as the base URL
  try {
    throw new Error();
  } catch (err) {
    var matches = ('' + err.stack).match(/(https?|file|ftp|chrome-extension|moz-extension):\/\/[^)\n]+/g);

    if (matches) {
      return getBaseURL(matches[0]);
    }
  }

  return '/';
}

function getBaseURL(url) {
  return ('' + url).replace(/^((?:https?|file|ftp|chrome-extension|moz-extension):\/\/.+)\/[^/]+$/, '$1') + '/';
}

exports.getBundleURL = getBundleURLCached;
exports.getBaseURL = getBaseURL;
},{}],"node_modules/parcel-bundler/src/builtins/css-loader.js":[function(require,module,exports) {
var bundle = require('./bundle-url');

function updateLink(link) {
  var newLink = link.cloneNode();

  newLink.onload = function () {
    link.remove();
  };

  newLink.href = link.href.split('?')[0] + '?' + Date.now();
  link.parentNode.insertBefore(newLink, link.nextSibling);
}

var cssTimeout = null;

function reloadCSS() {
  if (cssTimeout) {
    return;
  }

  cssTimeout = setTimeout(function () {
    var links = document.querySelectorAll('link[rel="stylesheet"]');

    for (var i = 0; i < links.length; i++) {
      if (bundle.getBaseURL(links[i].href) === bundle.getBundleURL()) {
        updateLink(links[i]);
      }
    }

    cssTimeout = null;
  }, 50);
}

module.exports = reloadCSS;
},{"./bundle-url":"node_modules/parcel-bundler/src/builtins/bundle-url.js"}],"src/styles.css":[function(require,module,exports) {
var reloadCSS = require('_css_loader');

module.hot.dispose(reloadCSS);
module.hot.accept(reloadCSS);
},{"./../images/separator.png":[["separator.86ddd1d4.png","images/separator.png"],"images/separator.png"],"./../images/down-arrow-brown.png":[["down-arrow-brown.48944b43.png","images/down-arrow-brown.png"],"images/down-arrow-brown.png"],"./../images/right-arrow-brown.png":[["right-arrow-brown.a15630e6.png","images/right-arrow-brown.png"],"images/right-arrow-brown.png"],"_css_loader":"node_modules/parcel-bundler/src/builtins/css-loader.js"}],"src/PopupMenuItemLinks.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MenuItem = void 0;

var _PopupMenuLinks = require("./PopupMenuLinks");

/*
 *   This content is licensed according to the W3C Software License at
 *   https://www.w3.org/Consortium/Legal/2015/copyright-software-and-document
 */
var MenuItem = function MenuItem(domNode, menuObj) {
  // if (typeof popupObj !== 'object') {
  //   popupObj = false;
  // }
  this.domNode = domNode;
  this.menu = menuObj;
  this.popupMenu = false;
  this.isMenubarItem = false;
  this.keyCode = Object.freeze({
    TAB: 9,
    RETURN: 13,
    ESC: 27,
    SPACE: 32,
    PAGEUP: 33,
    PAGEDOWN: 34,
    END: 35,
    HOME: 36,
    LEFT: 37,
    UP: 38,
    RIGHT: 39,
    DOWN: 40
  });
};

exports.MenuItem = MenuItem;

MenuItem.prototype.init = function () {
  this.domNode.tabIndex = -1;
  this.domNode.addEventListener('keydown', this.handleKeydown.bind(this));
  this.domNode.addEventListener('click', this.handleClick.bind(this));
  this.domNode.addEventListener('focus', this.handleFocus.bind(this));
  this.domNode.addEventListener('blur', this.handleBlur.bind(this));
  this.domNode.addEventListener('mouseover', this.handleMouseover.bind(this));
  this.domNode.addEventListener('mouseout', this.handleMouseout.bind(this)); // Initialize flyout menu

  var nextElement = this.domNode.nextElementSibling;

  if (nextElement && nextElement.tagName === 'UL') {
    this.popupMenu = new _PopupMenuLinks.PopupMenu(nextElement, this);
    this.popupMenu.init();
  }
};

MenuItem.prototype.isExpanded = function () {
  return this.domNode.getAttribute('aria-expanded') === 'true';
};
/* EVENT HANDLERS */


MenuItem.prototype.handleKeydown = function (event) {
  var tgt = event.currentTarget,
      char = event.key,
      flag = false,
      clickEvent;

  function isPrintableCharacter(str) {
    return str.length === 1 && str.match(/\S/);
  }

  switch (event.keyCode) {
    case this.keyCode.SPACE:
    case this.keyCode.RETURN:
      if (this.popupMenu) {
        this.popupMenu.open();
        this.popupMenu.setFocusToFirstItem();
      } else {
        // Create simulated mouse event to mimic the behavior of ATs
        // and let the event handler handleClick do the housekeeping.
        try {
          clickEvent = new MouseEvent('click', {
            view: window,
            bubbles: true,
            cancelable: true
          });
        } catch (err) {
          if (document.createEvent) {
            // DOM Level 3 for IE 9+
            clickEvent = document.createEvent('MouseEvents');
            clickEvent.initEvent('click', true, true);
          }
        }

        tgt.dispatchEvent(clickEvent);
      }

      flag = true;
      break;

    case this.keyCode.UP:
      this.menu.setFocusToPreviousItem(this);
      flag = true;
      break;

    case this.keyCode.DOWN:
      this.menu.setFocusToNextItem(this);
      flag = true;
      break;

    case this.keyCode.LEFT:
      this.menu.setFocusToController('previous', true);
      this.menu.close(true);
      flag = true;
      break;

    case this.keyCode.RIGHT:
      if (this.popupMenu) {
        this.popupMenu.open();
        this.popupMenu.setFocusToFirstItem();
      } else {
        this.menu.setFocusToController('next', true);
        this.menu.close(true);
      }

      flag = true;
      break;

    case this.keyCode.HOME:
    case this.keyCode.PAGEUP:
      this.menu.setFocusToFirstItem();
      flag = true;
      break;

    case this.keyCode.END:
    case this.keyCode.PAGEDOWN:
      this.menu.setFocusToLastItem();
      flag = true;
      break;

    case this.keyCode.ESC:
      this.menu.setFocusToController();
      this.menu.close(true);
      flag = true;
      break;

    case this.keyCode.TAB:
      this.menu.setFocusToController();
      break;

    default:
      if (isPrintableCharacter(char)) {
        this.menu.setFocusByFirstCharacter(this, char);
        flag = true;
      }

      break;
  }

  if (flag) {
    event.stopPropagation();
    event.preventDefault();
  }
};

MenuItem.prototype.setExpanded = function (value) {
  if (value) {
    this.domNode.setAttribute('aria-expanded', 'true');
  } else {
    this.domNode.setAttribute('aria-expanded', 'false');
  }
};

MenuItem.prototype.handleClick = function (event) {
  this.menu.setFocusToController();
  this.menu.close(true);
};

MenuItem.prototype.handleFocus = function (event) {
  this.menu.hasFocus = true;
};

MenuItem.prototype.handleBlur = function (event) {
  this.menu.hasFocus = false;
  setTimeout(this.menu.close.bind(this.menu, false), 300);
};

MenuItem.prototype.handleMouseover = function (event) {
  this.menu.hasHover = true;
  this.menu.open();

  if (this.popupMenu) {
    this.popupMenu.hasHover = true;
    this.popupMenu.open();
  }
};

MenuItem.prototype.handleMouseout = function (event) {
  if (this.popupMenu) {
    this.popupMenu.hasHover = false;
    this.popupMenu.close(true);
  }

  this.menu.hasHover = false;
  setTimeout(this.menu.close.bind(this.menu, false), 300);
};
},{"./PopupMenuLinks":"src/PopupMenuLinks.js"}],"src/PopupMenuLinks.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PopupMenu = void 0;

var _PopupMenuItemLinks = require("./PopupMenuItemLinks");

/*
 *   This content is licensed according to the W3C Software License at
 *   https://www.w3.org/Consortium/Legal/2015/copyright-software-and-document
 */
var PopupMenu = function PopupMenu(domNode, controllerObj) {
  var elementChildren,
      msgPrefix = 'PopupMenu constructor argument domNode '; // Check whether domNode is a DOM element

  if (!domNode instanceof Element) {
    throw new TypeError(msgPrefix + 'is not a DOM Element.');
  } // Check whether domNode has child elements


  if (domNode.childElementCount === 0) {
    throw new Error(msgPrefix + 'has no element children.');
  } // Check whether domNode descendant elements have A elements


  var childElement = domNode.firstElementChild;

  while (childElement) {
    var menuitem = childElement.firstElementChild;

    if (menuitem && menuitem === 'A') {
      throw new Error(msgPrefix + 'has descendant elements that are not A elements.');
    }

    childElement = childElement.nextElementSibling;
  }

  this.isMenubar = false;
  this.domNode = domNode;
  this.controller = controllerObj;
  this.menuitems = []; // See PopupMenu init method

  this.firstChars = []; // See PopupMenu init method

  this.firstItem = null; // See PopupMenu init method

  this.lastItem = null; // See PopupMenu init method

  this.hasFocus = false; // See MenuItem handleFocus, handleBlur

  this.hasHover = false; // See PopupMenu handleMouseover, handleMouseout
};
/*
 *   @method PopupMenu.prototype.init
 *
 *   @desc
 *       Add domNode event listeners for mouseover and mouseout. Traverse
 *       domNode children to configure each menuitem and populate menuitems
 *       array. Initialize firstItem and lastItem properties.
 */


exports.PopupMenu = PopupMenu;

PopupMenu.prototype.init = function () {
  var childElement, menuElement, menuItem, textContent, numItems, label; // Configure the domNode itself

  this.domNode.addEventListener('mouseover', this.handleMouseover.bind(this));
  this.domNode.addEventListener('mouseout', this.handleMouseout.bind(this)); // Traverse the element children of domNode: configure each with
  // menuitem role behavior and store reference in menuitems array.

  childElement = this.domNode.firstElementChild;

  while (childElement) {
    menuElement = childElement.firstElementChild;

    if (menuElement && menuElement.tagName === 'A') {
      menuItem = new _PopupMenuItemLinks.MenuItem(menuElement, this);
      menuItem.init();
      this.menuitems.push(menuItem);
      textContent = menuElement.textContent.trim();
      this.firstChars.push(textContent.substring(0, 1).toLowerCase());
    }

    childElement = childElement.nextElementSibling;
  } // Use populated menuitems array to initialize firstItem and lastItem.


  numItems = this.menuitems.length;

  if (numItems > 0) {
    this.firstItem = this.menuitems[0];
    this.lastItem = this.menuitems[numItems - 1];
  }
};
/* EVENT HANDLERS */


PopupMenu.prototype.handleMouseover = function (event) {
  this.hasHover = true;
};

PopupMenu.prototype.handleMouseout = function (event) {
  this.hasHover = false;
  setTimeout(this.close.bind(this, false), 1);
};
/* FOCUS MANAGEMENT METHODS */


PopupMenu.prototype.setFocusToController = function (command, flag) {
  if (typeof command !== 'string') {
    command = '';
  }

  function setFocusToMenubarItem(controller, close) {
    while (controller) {
      if (controller.isMenubarItem) {
        controller.domNode.focus();
        return controller;
      } else {
        if (close) {
          controller.menu.close(true);
        }

        controller.hasFocus = false;
      }

      controller = controller.menu.controller;
    }

    return false;
  }

  if (command === '') {
    if (this.controller && this.controller.domNode) {
      this.controller.domNode.focus();
    }

    return;
  }

  if (!this.controller.isMenubarItem) {
    this.controller.domNode.focus();
    this.close();

    if (command === 'next') {
      var menubarItem = setFocusToMenubarItem(this.controller, false);

      if (menubarItem) {
        menubarItem.menu.setFocusToNextItem(menubarItem, flag);
      }
    }
  } else {
    if (command === 'previous') {
      this.controller.menu.setFocusToPreviousItem(this.controller, flag);
    } else if (command === 'next') {
      this.controller.menu.setFocusToNextItem(this.controller, flag);
    }
  }
};

PopupMenu.prototype.setFocusToFirstItem = function () {
  this.firstItem.domNode.focus();
};

PopupMenu.prototype.setFocusToLastItem = function () {
  this.lastItem.domNode.focus();
};

PopupMenu.prototype.setFocusToPreviousItem = function (currentItem) {
  var index;

  if (currentItem === this.firstItem) {
    this.lastItem.domNode.focus();
  } else {
    index = this.menuitems.indexOf(currentItem);
    this.menuitems[index - 1].domNode.focus();
  }
};

PopupMenu.prototype.setFocusToNextItem = function (currentItem) {
  var index;

  if (currentItem === this.lastItem) {
    this.firstItem.domNode.focus();
  } else {
    index = this.menuitems.indexOf(currentItem);
    this.menuitems[index + 1].domNode.focus();
  }
};

PopupMenu.prototype.setFocusByFirstCharacter = function (currentItem, char) {
  var start,
      index,
      char = char.toLowerCase(); // Get start index for search based on position of currentItem

  start = this.menuitems.indexOf(currentItem) + 1;

  if (start === this.menuitems.length) {
    start = 0;
  } // Check remaining slots in the menu


  index = this.getIndexFirstChars(start, char); // If not found in remaining slots, check from beginning

  if (index === -1) {
    index = this.getIndexFirstChars(0, char);
  } // If match was found...


  if (index > -1) {
    this.menuitems[index].domNode.focus();
  }
};

PopupMenu.prototype.getIndexFirstChars = function (startIndex, char) {
  for (var i = startIndex; i < this.firstChars.length; i++) {
    if (char === this.firstChars[i]) {
      return i;
    }
  }

  return -1;
};
/* MENU DISPLAY METHODS */


PopupMenu.prototype.open = function () {
  // Get position and bounding rectangle of controller object's DOM node
  var rect = this.controller.domNode.getBoundingClientRect(); // Set CSS properties

  if (!this.controller.isMenubarItem) {
    this.domNode.parentNode.style.position = 'relative';
    this.domNode.style.display = 'block';
    this.domNode.style.position = 'absolute';
    this.domNode.style.left = rect.width + 'px';
    this.domNode.style.zIndex = 100;
  } else {
    this.domNode.style.display = 'block';
    this.domNode.style.position = 'absolute';
    this.domNode.style.top = rect.height - 1 + 'px';
    this.domNode.style.zIndex = 100;
  }

  this.controller.setExpanded(true);
};

PopupMenu.prototype.close = function (force) {
  var controllerHasHover = this.controller.hasHover;
  var hasFocus = this.hasFocus;

  for (var i = 0; i < this.menuitems.length; i++) {
    var mi = this.menuitems[i];

    if (mi.popupMenu) {
      hasFocus = hasFocus | mi.popupMenu.hasFocus;
    }
  }

  if (!this.controller.isMenubarItem) {
    controllerHasHover = false;
  }

  if (force || !hasFocus && !this.hasHover && !controllerHasHover) {
    this.domNode.style.display = 'none';
    this.domNode.style.zIndex = 0;
    this.controller.setExpanded(false);
  }
};
},{"./PopupMenuItemLinks":"src/PopupMenuItemLinks.js"}],"src/MenubarItemLinks.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MenubarItem = void 0;

var _PopupMenuLinks = require("./PopupMenuLinks");

/*
 *   This content is licensed according to the W3C Software License at
 *   https://www.w3.org/Consortium/Legal/2015/copyright-software-and-document
 */
var MenubarItem = function MenubarItem(domNode, menuObj) {
  this.menu = menuObj;
  this.domNode = domNode;
  this.popupMenu = false;
  this.hasFocus = false;
  this.hasHover = false;
  this.isMenubarItem = true;
  this.keyCode = Object.freeze({
    TAB: 9,
    RETURN: 13,
    ESC: 27,
    SPACE: 32,
    PAGEUP: 33,
    PAGEDOWN: 34,
    END: 35,
    HOME: 36,
    LEFT: 37,
    UP: 38,
    RIGHT: 39,
    DOWN: 40
  });
};

exports.MenubarItem = MenubarItem;

MenubarItem.prototype.init = function () {
  this.domNode.tabIndex = -1;
  this.domNode.addEventListener('keydown', this.handleKeydown.bind(this));
  this.domNode.addEventListener('focus', this.handleFocus.bind(this));
  this.domNode.addEventListener('blur', this.handleBlur.bind(this));
  this.domNode.addEventListener('mouseover', this.handleMouseover.bind(this));
  this.domNode.addEventListener('mouseout', this.handleMouseout.bind(this)); // Initialize pop up menus

  var nextElement = this.domNode.nextElementSibling;

  if (nextElement && nextElement.tagName === 'UL') {
    this.popupMenu = new _PopupMenuLinks.PopupMenu(nextElement, this);
    this.popupMenu.init();
  }
};

MenubarItem.prototype.handleKeydown = function (event) {
  var tgt = event.currentTarget,
      char = event.key,
      flag = false,
      clickEvent;

  function isPrintableCharacter(str) {
    return str.length === 1 && str.match(/\S/);
  }

  switch (event.keyCode) {
    case this.keyCode.SPACE:
    case this.keyCode.RETURN:
    case this.keyCode.DOWN:
      if (this.popupMenu) {
        this.popupMenu.open();
        this.popupMenu.setFocusToFirstItem();
        flag = true;
      }

      break;

    case this.keyCode.LEFT:
      this.menu.setFocusToPreviousItem(this);
      flag = true;
      break;

    case this.keyCode.RIGHT:
      this.menu.setFocusToNextItem(this);
      flag = true;
      break;

    case this.keyCode.UP:
      if (this.popupMenu) {
        this.popupMenu.open();
        this.popupMenu.setFocusToLastItem();
        flag = true;
      }

      break;

    case this.keyCode.HOME:
    case this.keyCode.PAGEUP:
      this.menu.setFocusToFirstItem();
      flag = true;
      break;

    case this.keyCode.END:
    case this.keyCode.PAGEDOWN:
      this.menu.setFocusToLastItem();
      flag = true;
      break;

    case this.keyCode.TAB:
      this.popupMenu.close(true);
      break;

    case this.keyCode.ESC:
      this.popupMenu.close(true);
      break;

    default:
      if (isPrintableCharacter(char)) {
        this.menu.setFocusByFirstCharacter(this, char);
        flag = true;
      }

      break;
  }

  if (flag) {
    event.stopPropagation();
    event.preventDefault();
  }
};

MenubarItem.prototype.setExpanded = function (value) {
  if (value) {
    this.domNode.setAttribute('aria-expanded', 'true');
  } else {
    this.domNode.setAttribute('aria-expanded', 'false');
  }
};

MenubarItem.prototype.handleFocus = function (event) {
  this.menu.hasFocus = true;
};

MenubarItem.prototype.handleBlur = function (event) {
  this.menu.hasFocus = false;
};

MenubarItem.prototype.handleMouseover = function (event) {
  this.hasHover = true;
  this.popupMenu.open();
};

MenubarItem.prototype.handleMouseout = function (event) {
  this.hasHover = false;
  setTimeout(this.popupMenu.close.bind(this.popupMenu, false), 300);
};
},{"./PopupMenuLinks":"src/PopupMenuLinks.js"}],"src/MenubarLinks.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Menubar = void 0;

var _MenubarItemLinks = require("./MenubarItemLinks");

/*
 *   This content is licensed according to the W3C Software License at
 *   https://www.w3.org/Consortium/Legal/2015/copyright-software-and-document
 */
var Menubar = function Menubar(domNode) {
  var elementChildren,
      msgPrefix = 'Menubar constructor argument menubarNode '; // Check whether menubarNode is a DOM element

  if (!domNode instanceof Element) {
    throw new TypeError(msgPrefix + 'is not a DOM Element.');
  } // Check whether menubarNode has descendant elements


  if (domNode.childElementCount === 0) {
    throw new Error(msgPrefix + 'has no element children.');
  } // Check whether menubarNode has A elements


  var e = domNode.firstElementChild;

  while (e) {
    var menubarItem = e.firstElementChild;

    if (e && menubarItem && menubarItem.tagName !== 'A') {
      throw new Error(msgPrefix + 'has child elements are not A elements.');
    }

    e = e.nextElementSibling;
  }

  this.isMenubar = true;
  this.domNode = domNode;
  this.menubarItems = []; // See Menubar init method

  this.firstChars = []; // See Menubar init method

  this.firstItem = null; // See Menubar init method

  this.lastItem = null; // See Menubar init method

  this.hasFocus = false; // See MenubarItem handleFocus, handleBlur

  this.hasHover = false; // See Menubar handleMouseover, handleMouseout
};
/*
 *   @method Menubar.prototype.init
 *
 *   @desc
 *       Adds ARIA role to the menubar node
 *       Traverse menubar children for A elements to configure each A element as a ARIA menuitem
 *       and populate menuitems array. Initialize firstItem and lastItem properties.
 */


exports.Menubar = Menubar;

Menubar.prototype.init = function () {
  var menubarItem, childElement, menuElement, textContent, numItems; // Traverse the element children of menubarNode: configure each with
  // menuitem role behavior and store reference in menuitems array.

  var elem = this.domNode.firstElementChild;

  while (elem) {
    menuElement = elem.firstElementChild;

    if (elem && menuElement && menuElement.tagName === 'A') {
      menubarItem = new _MenubarItemLinks.MenubarItem(menuElement, this);
      menubarItem.init();
      this.menubarItems.push(menubarItem);
      textContent = menuElement.textContent.trim();
      this.firstChars.push(textContent.substring(0, 1).toLowerCase());
    }

    elem = elem.nextElementSibling;
  } // Use populated menuitems array to initialize firstItem and lastItem.


  numItems = this.menubarItems.length;

  if (numItems > 0) {
    this.firstItem = this.menubarItems[0];
    this.lastItem = this.menubarItems[numItems - 1];
  }

  this.firstItem.domNode.tabIndex = 0;
};
/* FOCUS MANAGEMENT METHODS */


Menubar.prototype.setFocusToItem = function (newItem) {
  var flag = false;

  for (var i = 0; i < this.menubarItems.length; i++) {
    var mbi = this.menubarItems[i];

    if (mbi.domNode.tabIndex === 0) {
      flag = mbi.domNode.getAttribute('aria-expanded') === 'true';
    }

    mbi.domNode.tabIndex = -1;

    if (mbi.popupMenu) {
      mbi.popupMenu.close();
    }
  }

  newItem.domNode.focus();
  newItem.domNode.tabIndex = 0;

  if (flag && newItem.popupMenu) {
    newItem.popupMenu.open();
  }
};

Menubar.prototype.setFocusToFirstItem = function (flag) {
  this.setFocusToItem(this.firstItem);
};

Menubar.prototype.setFocusToLastItem = function (flag) {
  this.setFocusToItem(this.lastItem);
};

Menubar.prototype.setFocusToPreviousItem = function (currentItem) {
  var index;
  var newItem;

  if (currentItem === this.firstItem) {
    newItem = this.lastItem;
  } else {
    index = this.menubarItems.indexOf(currentItem);
    newItem = this.menubarItems[index - 1];
  }

  this.setFocusToItem(newItem);
};

Menubar.prototype.setFocusToNextItem = function (currentItem) {
  var index;
  var newItem;

  if (currentItem === this.lastItem) {
    newItem = this.firstItem;
  } else {
    index = this.menubarItems.indexOf(currentItem);
    newItem = this.menubarItems[index + 1];
  }

  this.setFocusToItem(newItem);
};

Menubar.prototype.setFocusByFirstCharacter = function (currentItem, keyChar) {
  var start,
      index,
      char = keyChar.toLowerCase();
  var flag = currentItem.domNode.getAttribute('aria-expanded') === 'true'; // Get start index for search based on position of currentItem

  start = this.menubarItems.indexOf(currentItem) + 1;

  if (start === this.menubarItems.length) {
    start = 0;
  } // Check remaining slots in the menu


  index = this.getIndexFirstChars(start, char); // If not found in remaining slots, check from beginning

  if (index === -1) {
    index = this.getIndexFirstChars(0, char);
  } // If match was found...


  if (index > -1) {
    this.setFocusToItem(this.menubarItems[index]);
  }
};

Menubar.prototype.getIndexFirstChars = function (startIndex, char) {
  for (var i = startIndex; i < this.firstChars.length; i++) {
    if (char === this.firstChars[i]) {
      return i;
    }
  }

  return -1;
};
},{"./MenubarItemLinks":"src/MenubarItemLinks.js"}],"src/index.js":[function(require,module,exports) {
"use strict";

require("./styles.css");

var _MenubarLinks = require("./MenubarLinks");

var menubar = new _MenubarLinks.Menubar(document.getElementById('menubar1'));
menubar.init();
},{"./styles.css":"src/styles.css","./MenubarLinks":"src/MenubarLinks.js"}],"node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "57499" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else {
        window.location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["node_modules/parcel-bundler/src/builtins/hmr-runtime.js","src/index.js"], null)
//# sourceMappingURL=/src.a2b27638.js.map