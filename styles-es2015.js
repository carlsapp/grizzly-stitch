(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["styles"],{

/***/ "./grizzly-stitch.css":
/*!****************************!*\
  !*** ./grizzly-stitch.css ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var content = __webpack_require__(/*! !./node_modules/@angular-devkit/build-angular/src/angular-cli-files/plugins/raw-css-loader.js!./node_modules/postcss-loader/src??embedded!./grizzly-stitch.css */ "./node_modules/@angular-devkit/build-angular/src/angular-cli-files/plugins/raw-css-loader.js!./node_modules/postcss-loader/src/index.js?!./grizzly-stitch.css");

if (typeof content === 'string') {
  content = [[module.i, content, '']];
}

var options = {}

options.insert = "head";
options.singleton = false;

var update = __webpack_require__(/*! ./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js")(content, options);

if (content.locals) {
  module.exports = content.locals;
}


/***/ }),

/***/ "./node_modules/@angular-devkit/build-angular/src/angular-cli-files/plugins/raw-css-loader.js!./node_modules/postcss-loader/src/index.js?!./grizzly-stitch.css":
/*!*********************************************************************************************************************************************************************!*\
  !*** ./node_modules/@angular-devkit/build-angular/src/angular-cli-files/plugins/raw-css-loader.js!./node_modules/postcss-loader/src??embedded!./grizzly-stitch.css ***!
  \*********************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = [[module.i, "/**\n * Copyright 2017 Grizzly Stitch\n *\n * This program is free software: you can redistribute it and/or modify\n * it under the terms of the GNU Lesser General Public License as published by\n * the Free Software Foundation, either version 3 of the License, or\n * (at your option) any later version.\n *\n * This program is distributed in the hope that it will be useful,\n * but WITHOUT ANY WARRANTY; without even the implied warranty of\n * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the\n * GNU Lesser General Public License for more details.\n *\n * You should have received a copy of the GNU Lesser General Public License\n * along with this program.  If not, see <http://www.gnu.org/licenses/>.\n**/\n\nbody {\n  /*min-height: 100px;*/ /* Not sure why this is in the bootstrap example code */\n  padding-top: 70px;  /* Needed for the body to not be under the fixed header at the top */\n}\n\n.choose-file {\n    position: relative;\n    overflow: hidden;\n    display: inline-block;\n}\n\n/* We add some trickery CSS here to prevent the default file chooser button from showing up in our menu options\nthat choose files. */\n\n.choose-file input[type=file] {\n    position: absolute;\n    top: 0;\n    right: 0;\n    min-width: 100%;\n    min-height: 100%;\n    font-size: 999px;\n    text-align: right;\n    filter: alpha(opacity=0);\n    opacity: 0;\n    outline: none;\n    background: white;\n    cursor: inherit;\n    display: block;\n}\n\n/* Scale canvas with resize attribute to full size*/\n\ncanvas[resize] {\n    width: 100%;\n    height: 100%;\n}\n\n.shape-list {\n  color: #337ab7;\n}\n\n.shape-list-title {\n  /* Add some padding so we don't look weird when selected */\n  padding: 2px 5px 2px 10px;\n  /* Add 1px margin (could do border instead) so there's spacing between rows when selected.\n     The negative margin on the left is to counteract the padding and make sure things line\n     up when not selected. */\n  margin: 1px 0 1px -10px;\n  border-radius: 5px;\n}\n\n.shape-list .selected-row {\n  background-color: #337ab7;\n  color: white;\n}\n\n.shape-list .indent {\n  margin-left: 30px;\n  padding-bottom: 5px;\n}\n\n/**\n * The shape-action-icons class is applied to the icons that are to the right of a shape's name in\n * the shape tree on the left side of the app.\n***/\n\n.action-icons {\n  padding-left: 10px;\n  font-size: .8em;\n}\n\n.action-icons i {\n  padding-left: 5px;\n  cursor: pointer;\n}\n\n.expand-icon {\n  cursor: pointer;\n}\n\n.myselectable {\n  cursor: default;\n}\n\n.non-editable-text {\n  cursor: default;\n}\n\n.editable-text {\n  cursor: text;\n}\n\n/* The editable-click class is originally defined in the X-Editable library. We don't like the \ndashed bottom border it adds, so we'll override here. */\n\n.editable-click {\n  border-bottom: none;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImdyaXp6bHktc3RpdGNoLmNzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7Ozs7Ozs7O0VBZUU7O0FBRUY7RUFDRSxxQkFBcUIsRUFBRSx1REFBdUQ7RUFDOUUsaUJBQWlCLEdBQUcsb0VBQW9FO0FBQzFGOztBQUVBO0lBQ0ksa0JBQWtCO0lBQ2xCLGdCQUFnQjtJQUNoQixxQkFBcUI7QUFDekI7O0FBRUE7b0JBQ29COztBQUNwQjtJQUNJLGtCQUFrQjtJQUNsQixNQUFNO0lBQ04sUUFBUTtJQUNSLGVBQWU7SUFDZixnQkFBZ0I7SUFDaEIsZ0JBQWdCO0lBQ2hCLGlCQUFpQjtJQUNqQix3QkFBd0I7SUFDeEIsVUFBVTtJQUNWLGFBQWE7SUFDYixpQkFBaUI7SUFDakIsZUFBZTtJQUNmLGNBQWM7QUFDbEI7O0FBRUEsbURBQW1EOztBQUNuRDtJQUNJLFdBQVc7SUFDWCxZQUFZO0FBQ2hCOztBQUVBO0VBQ0UsY0FBYztBQUNoQjs7QUFFQTtFQUNFLDBEQUEwRDtFQUMxRCx5QkFBeUI7RUFDekI7OzRCQUUwQjtFQUMxQix1QkFBdUI7RUFDdkIsa0JBQWtCO0FBQ3BCOztBQUVBO0VBQ0UseUJBQXlCO0VBQ3pCLFlBQVk7QUFDZDs7QUFFQTtFQUNFLGlCQUFpQjtFQUNqQixtQkFBbUI7QUFDckI7O0FBRUE7OztHQUdHOztBQUNIO0VBQ0Usa0JBQWtCO0VBQ2xCLGVBQWU7QUFDakI7O0FBRUE7RUFDRSxpQkFBaUI7RUFDakIsZUFBZTtBQUNqQjs7QUFFQTtFQUNFLGVBQWU7QUFDakI7O0FBRUE7RUFDRSxlQUFlO0FBQ2pCOztBQUVBO0VBQ0UsZUFBZTtBQUNqQjs7QUFFQTtFQUNFLFlBQVk7QUFDZDs7QUFFQTt1REFDdUQ7O0FBQ3ZEO0VBQ0UsbUJBQW1CO0FBQ3JCIiwiZmlsZSI6ImdyaXp6bHktc3RpdGNoLmNzcyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQ29weXJpZ2h0IDIwMTcgR3JpenpseSBTdGl0Y2hcbiAqXG4gKiBUaGlzIHByb2dyYW0gaXMgZnJlZSBzb2Z0d2FyZTogeW91IGNhbiByZWRpc3RyaWJ1dGUgaXQgYW5kL29yIG1vZGlmeVxuICogaXQgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBHTlUgTGVzc2VyIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgYXMgcHVibGlzaGVkIGJ5XG4gKiB0aGUgRnJlZSBTb2Z0d2FyZSBGb3VuZGF0aW9uLCBlaXRoZXIgdmVyc2lvbiAzIG9mIHRoZSBMaWNlbnNlLCBvclxuICogKGF0IHlvdXIgb3B0aW9uKSBhbnkgbGF0ZXIgdmVyc2lvbi5cbiAqXG4gKiBUaGlzIHByb2dyYW0gaXMgZGlzdHJpYnV0ZWQgaW4gdGhlIGhvcGUgdGhhdCBpdCB3aWxsIGJlIHVzZWZ1bCxcbiAqIGJ1dCBXSVRIT1VUIEFOWSBXQVJSQU5UWTsgd2l0aG91dCBldmVuIHRoZSBpbXBsaWVkIHdhcnJhbnR5IG9mXG4gKiBNRVJDSEFOVEFCSUxJVFkgb3IgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UuICBTZWUgdGhlXG4gKiBHTlUgTGVzc2VyIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgZm9yIG1vcmUgZGV0YWlscy5cbiAqXG4gKiBZb3Ugc2hvdWxkIGhhdmUgcmVjZWl2ZWQgYSBjb3B5IG9mIHRoZSBHTlUgTGVzc2VyIEdlbmVyYWwgUHVibGljIExpY2Vuc2VcbiAqIGFsb25nIHdpdGggdGhpcyBwcm9ncmFtLiAgSWYgbm90LCBzZWUgPGh0dHA6Ly93d3cuZ251Lm9yZy9saWNlbnNlcy8+LlxuKiovXG5cbmJvZHkge1xuICAvKm1pbi1oZWlnaHQ6IDEwMHB4OyovIC8qIE5vdCBzdXJlIHdoeSB0aGlzIGlzIGluIHRoZSBib290c3RyYXAgZXhhbXBsZSBjb2RlICovXG4gIHBhZGRpbmctdG9wOiA3MHB4OyAgLyogTmVlZGVkIGZvciB0aGUgYm9keSB0byBub3QgYmUgdW5kZXIgdGhlIGZpeGVkIGhlYWRlciBhdCB0aGUgdG9wICovXG59XG5cbi5jaG9vc2UtZmlsZSB7XG4gICAgcG9zaXRpb246IHJlbGF0aXZlO1xuICAgIG92ZXJmbG93OiBoaWRkZW47XG4gICAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xufVxuXG4vKiBXZSBhZGQgc29tZSB0cmlja2VyeSBDU1MgaGVyZSB0byBwcmV2ZW50IHRoZSBkZWZhdWx0IGZpbGUgY2hvb3NlciBidXR0b24gZnJvbSBzaG93aW5nIHVwIGluIG91ciBtZW51IG9wdGlvbnNcbnRoYXQgY2hvb3NlIGZpbGVzLiAqL1xuLmNob29zZS1maWxlIGlucHV0W3R5cGU9ZmlsZV0ge1xuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICB0b3A6IDA7XG4gICAgcmlnaHQ6IDA7XG4gICAgbWluLXdpZHRoOiAxMDAlO1xuICAgIG1pbi1oZWlnaHQ6IDEwMCU7XG4gICAgZm9udC1zaXplOiA5OTlweDtcbiAgICB0ZXh0LWFsaWduOiByaWdodDtcbiAgICBmaWx0ZXI6IGFscGhhKG9wYWNpdHk9MCk7XG4gICAgb3BhY2l0eTogMDtcbiAgICBvdXRsaW5lOiBub25lO1xuICAgIGJhY2tncm91bmQ6IHdoaXRlO1xuICAgIGN1cnNvcjogaW5oZXJpdDtcbiAgICBkaXNwbGF5OiBibG9jaztcbn1cblxuLyogU2NhbGUgY2FudmFzIHdpdGggcmVzaXplIGF0dHJpYnV0ZSB0byBmdWxsIHNpemUqL1xuY2FudmFzW3Jlc2l6ZV0ge1xuICAgIHdpZHRoOiAxMDAlO1xuICAgIGhlaWdodDogMTAwJTtcbn1cblxuLnNoYXBlLWxpc3Qge1xuICBjb2xvcjogIzMzN2FiNztcbn1cblxuLnNoYXBlLWxpc3QtdGl0bGUge1xuICAvKiBBZGQgc29tZSBwYWRkaW5nIHNvIHdlIGRvbid0IGxvb2sgd2VpcmQgd2hlbiBzZWxlY3RlZCAqL1xuICBwYWRkaW5nOiAycHggNXB4IDJweCAxMHB4O1xuICAvKiBBZGQgMXB4IG1hcmdpbiAoY291bGQgZG8gYm9yZGVyIGluc3RlYWQpIHNvIHRoZXJlJ3Mgc3BhY2luZyBiZXR3ZWVuIHJvd3Mgd2hlbiBzZWxlY3RlZC5cbiAgICAgVGhlIG5lZ2F0aXZlIG1hcmdpbiBvbiB0aGUgbGVmdCBpcyB0byBjb3VudGVyYWN0IHRoZSBwYWRkaW5nIGFuZCBtYWtlIHN1cmUgdGhpbmdzIGxpbmVcbiAgICAgdXAgd2hlbiBub3Qgc2VsZWN0ZWQuICovXG4gIG1hcmdpbjogMXB4IDAgMXB4IC0xMHB4O1xuICBib3JkZXItcmFkaXVzOiA1cHg7XG59XG5cbi5zaGFwZS1saXN0IC5zZWxlY3RlZC1yb3cge1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjMzM3YWI3O1xuICBjb2xvcjogd2hpdGU7XG59XG5cbi5zaGFwZS1saXN0IC5pbmRlbnQge1xuICBtYXJnaW4tbGVmdDogMzBweDtcbiAgcGFkZGluZy1ib3R0b206IDVweDtcbn1cblxuLyoqXG4gKiBUaGUgc2hhcGUtYWN0aW9uLWljb25zIGNsYXNzIGlzIGFwcGxpZWQgdG8gdGhlIGljb25zIHRoYXQgYXJlIHRvIHRoZSByaWdodCBvZiBhIHNoYXBlJ3MgbmFtZSBpblxuICogdGhlIHNoYXBlIHRyZWUgb24gdGhlIGxlZnQgc2lkZSBvZiB0aGUgYXBwLlxuKioqL1xuLmFjdGlvbi1pY29ucyB7XG4gIHBhZGRpbmctbGVmdDogMTBweDtcbiAgZm9udC1zaXplOiAuOGVtO1xufVxuXG4uYWN0aW9uLWljb25zIGkge1xuICBwYWRkaW5nLWxlZnQ6IDVweDtcbiAgY3Vyc29yOiBwb2ludGVyO1xufVxuXG4uZXhwYW5kLWljb24ge1xuICBjdXJzb3I6IHBvaW50ZXI7XG59XG5cbi5teXNlbGVjdGFibGUge1xuICBjdXJzb3I6IGRlZmF1bHQ7XG59XG5cbi5ub24tZWRpdGFibGUtdGV4dCB7XG4gIGN1cnNvcjogZGVmYXVsdDtcbn1cblxuLmVkaXRhYmxlLXRleHQge1xuICBjdXJzb3I6IHRleHQ7XG59XG5cbi8qIFRoZSBlZGl0YWJsZS1jbGljayBjbGFzcyBpcyBvcmlnaW5hbGx5IGRlZmluZWQgaW4gdGhlIFgtRWRpdGFibGUgbGlicmFyeS4gV2UgZG9uJ3QgbGlrZSB0aGUgXG5kYXNoZWQgYm90dG9tIGJvcmRlciBpdCBhZGRzLCBzbyB3ZSdsbCBvdmVycmlkZSBoZXJlLiAqL1xuLmVkaXRhYmxlLWNsaWNrIHtcbiAgYm9yZGVyLWJvdHRvbTogbm9uZTtcbn0iXX0= */", '', '']]

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js":
/*!****************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js ***!
  \****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var stylesInDom = {};

var isOldIE = function isOldIE() {
  var memo;
  return function memorize() {
    if (typeof memo === 'undefined') {
      // Test for IE <= 9 as proposed by Browserhacks
      // @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805
      // Tests for existence of standard globals is to allow style-loader
      // to operate correctly into non-standard environments
      // @see https://github.com/webpack-contrib/style-loader/issues/177
      memo = Boolean(window && document && document.all && !window.atob);
    }

    return memo;
  };
}();

var getTarget = function getTarget() {
  var memo = {};
  return function memorize(target) {
    if (typeof memo[target] === 'undefined') {
      var styleTarget = document.querySelector(target); // Special case to return head of iframe instead of iframe itself

      if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
        try {
          // This will throw an exception if access to iframe is blocked
          // due to cross-origin restrictions
          styleTarget = styleTarget.contentDocument.head;
        } catch (e) {
          // istanbul ignore next
          styleTarget = null;
        }
      }

      memo[target] = styleTarget;
    }

    return memo[target];
  };
}();

function listToStyles(list, options) {
  var styles = [];
  var newStyles = {};

  for (var i = 0; i < list.length; i++) {
    var item = list[i];
    var id = options.base ? item[0] + options.base : item[0];
    var css = item[1];
    var media = item[2];
    var sourceMap = item[3];
    var part = {
      css: css,
      media: media,
      sourceMap: sourceMap
    };

    if (!newStyles[id]) {
      styles.push(newStyles[id] = {
        id: id,
        parts: [part]
      });
    } else {
      newStyles[id].parts.push(part);
    }
  }

  return styles;
}

function addStylesToDom(styles, options) {
  for (var i = 0; i < styles.length; i++) {
    var item = styles[i];
    var domStyle = stylesInDom[item.id];
    var j = 0;

    if (domStyle) {
      domStyle.refs++;

      for (; j < domStyle.parts.length; j++) {
        domStyle.parts[j](item.parts[j]);
      }

      for (; j < item.parts.length; j++) {
        domStyle.parts.push(addStyle(item.parts[j], options));
      }
    } else {
      var parts = [];

      for (; j < item.parts.length; j++) {
        parts.push(addStyle(item.parts[j], options));
      }

      stylesInDom[item.id] = {
        id: item.id,
        refs: 1,
        parts: parts
      };
    }
  }
}

function insertStyleElement(options) {
  var style = document.createElement('style');

  if (typeof options.attributes.nonce === 'undefined') {
    var nonce =  true ? __webpack_require__.nc : undefined;

    if (nonce) {
      options.attributes.nonce = nonce;
    }
  }

  Object.keys(options.attributes).forEach(function (key) {
    style.setAttribute(key, options.attributes[key]);
  });

  if (typeof options.insert === 'function') {
    options.insert(style);
  } else {
    var target = getTarget(options.insert || 'head');

    if (!target) {
      throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
    }

    target.appendChild(style);
  }

  return style;
}

function removeStyleElement(style) {
  // istanbul ignore if
  if (style.parentNode === null) {
    return false;
  }

  style.parentNode.removeChild(style);
}
/* istanbul ignore next  */


var replaceText = function replaceText() {
  var textStore = [];
  return function replace(index, replacement) {
    textStore[index] = replacement;
    return textStore.filter(Boolean).join('\n');
  };
}();

function applyToSingletonTag(style, index, remove, obj) {
  var css = remove ? '' : obj.css; // For old IE

  /* istanbul ignore if  */

  if (style.styleSheet) {
    style.styleSheet.cssText = replaceText(index, css);
  } else {
    var cssNode = document.createTextNode(css);
    var childNodes = style.childNodes;

    if (childNodes[index]) {
      style.removeChild(childNodes[index]);
    }

    if (childNodes.length) {
      style.insertBefore(cssNode, childNodes[index]);
    } else {
      style.appendChild(cssNode);
    }
  }
}

function applyToTag(style, options, obj) {
  var css = obj.css;
  var media = obj.media;
  var sourceMap = obj.sourceMap;

  if (media) {
    style.setAttribute('media', media);
  }

  if (sourceMap && btoa) {
    css += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), " */");
  } // For old IE

  /* istanbul ignore if  */


  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    while (style.firstChild) {
      style.removeChild(style.firstChild);
    }

    style.appendChild(document.createTextNode(css));
  }
}

var singleton = null;
var singletonCounter = 0;

function addStyle(obj, options) {
  var style;
  var update;
  var remove;

  if (options.singleton) {
    var styleIndex = singletonCounter++;
    style = singleton || (singleton = insertStyleElement(options));
    update = applyToSingletonTag.bind(null, style, styleIndex, false);
    remove = applyToSingletonTag.bind(null, style, styleIndex, true);
  } else {
    style = insertStyleElement(options);
    update = applyToTag.bind(null, style, options);

    remove = function remove() {
      removeStyleElement(style);
    };
  }

  update(obj);
  return function updateStyle(newObj) {
    if (newObj) {
      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap) {
        return;
      }

      update(obj = newObj);
    } else {
      remove();
    }
  };
}

module.exports = function (list, options) {
  options = options || {};
  options.attributes = typeof options.attributes === 'object' ? options.attributes : {}; // Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
  // tags it will allow on a page

  if (!options.singleton && typeof options.singleton !== 'boolean') {
    options.singleton = isOldIE();
  }

  var styles = listToStyles(list, options);
  addStylesToDom(styles, options);
  return function update(newList) {
    var mayRemove = [];

    for (var i = 0; i < styles.length; i++) {
      var item = styles[i];
      var domStyle = stylesInDom[item.id];

      if (domStyle) {
        domStyle.refs--;
        mayRemove.push(domStyle);
      }
    }

    if (newList) {
      var newStyles = listToStyles(newList, options);
      addStylesToDom(newStyles, options);
    }

    for (var _i = 0; _i < mayRemove.length; _i++) {
      var _domStyle = mayRemove[_i];

      if (_domStyle.refs === 0) {
        for (var j = 0; j < _domStyle.parts.length; j++) {
          _domStyle.parts[j]();
        }

        delete stylesInDom[_domStyle.id];
      }
    }
  };
};

/***/ }),

/***/ 3:
/*!**********************************!*\
  !*** multi ./grizzly-stitch.css ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! /Users/carl/Documents/Programming/GitHubRepos/grizzly-stitch/grizzly-stitch.css */"./grizzly-stitch.css");


/***/ })

},[[3,"runtime"]]]);
//# sourceMappingURL=styles-es2015.js.map