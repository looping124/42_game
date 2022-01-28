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
})({"../node_modules/parcel-bundler/src/builtins/bundle-url.js":[function(require,module,exports) {
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
  return ('' + url).replace(/^((?:https?|file|ftp|chrome-extension|moz-extension):\/\/.+)?\/[^/]+(?:\?.*)?$/, '$1') + '/';
}

exports.getBundleURL = getBundleURLCached;
exports.getBaseURL = getBaseURL;
},{}],"../node_modules/parcel-bundler/src/builtins/css-loader.js":[function(require,module,exports) {
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
},{"./bundle-url":"../node_modules/parcel-bundler/src/builtins/bundle-url.js"}],"scss/main.scss":[function(require,module,exports) {
var reloadCSS = require('_css_loader');

module.hot.dispose(reloadCSS);
module.hot.accept(reloadCSS);
},{"_css_loader":"../node_modules/parcel-bundler/src/builtins/css-loader.js"}],"js/func.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

function _default(param) {
  console.log(param);
}
},{}],"js/Home.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var Home = function Home() {
  var argument = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
  console.log('Home', argument);
};

var _default = Home;
exports.default = _default;
},{}],"js/PageList.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var PageList = function PageList() {
  var argument = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
  var counterPage = 1;

  var preparePage = function preparePage() {
    var cleanedArgument = argument.replace(/\s+/g, "-");
    var arrayImg = ['', '<i class="fab fa-windows" style="font-size:30px"></i>', '<i class="fab fa-playstation" style="font-size:30px"></i>', '<i class="fab fa-xbox" style="font-size:30px"></i>', '<i class="fab fa-app-store-ios" style="font-size:30px"></i>', '<i class="fab fa-apple" style="font-size:30px"></i>', '<i class="fab fa-linux" style="font-size:30px"></i>', '<i class="fab fa-nintendo-switch" style="font-size:30px"></i>', '<i class="fab fa-android" style="font-size:30px"></i>'];

    var displayResults = function displayResults(results) {
      var more = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      var resultsContent = results.map(function (article) {
        return "<article class=\"cardGame\">\n          <div class=\"img\">\n            <img src=".concat(article.background_image, " alt=\"image\" class=\"card-image\">\n          <div class=\"hover\">\n          <p>Rating : ").concat(article.rating, " for ").concat(article.ratings_count, " ratings</p>\n          <p>Genres :").concat(article.genres[0].name, "</p>\n          </div>\n          </div>          \n          <a href=\"#pagedetail/").concat(article.id, "\">").concat(article.name, "</a>\n          <div>").concat(article.parent_platforms.map(function (e) {
          return arrayImg[e.platform.id];
        }).join(' '), "</div>\n        </article>");
      });
      var resultsContainer = document.querySelector(".page-list .articles");

      if (more) {
        resultsContainer.innerHTML += resultsContent.join("\n");
      } else {
        resultsContainer.innerHTML = resultsContent.join("\n");
      }
    };

    var fetchList = function fetchList(url, argument) {
      var more = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
      var finalURL = argument ? "".concat(url, "&search=").concat(argument) : url;
      fetch(finalURL).then(function (response) {
        return response.json();
      }).then(function (responseData) {
        displayResults(responseData.results, more);
      });
    };

    fetchList("https://api.rawg.io/api/games?key=8f284fc566e044f1a78da7f07da524cb&page_size=9&page=".concat(counterPage), cleanedArgument);
    var myShowMore = document.getElementById('showMore');
    myShowMore.addEventListener('click', function (e) {
      counterPage++;
      var myValue = document.getElementById('searchValue').value;
      fetchList("https://api.rawg.io/api/games?key=8f284fc566e044f1a78da7f07da524cb&page_size=".concat(9, "&page=", counterPage, "&search=").concat(myValue), cleanedArgument, true);

      if (counterPage == 3) {
        myShowMore.remove();
      }
    });
    var search = document.getElementById('search');
    search.addEventListener('click', function (e) {
      e.preventDefault();
      var myValue = document.getElementById('searchValue').value;
      fetchList("https://api.rawg.io/api/games?key=8f284fc566e044f1a78da7f07da524cb&page_size=".concat(9, "&page=1&search=", myValue), cleanedArgument);

      if (counterPage == 3) {
        myShowMore.remove();
      }
    });
  };

  var render = function render() {
    var intro = document.getElementById('intro');
    var filter = document.getElementById('filter');
    var showMore = document.getElementById('showMore');
    intro.classList.remove("hide-me");
    filter.classList.remove("hide-me");
    showMore.classList.remove("hide-me");
    document.getElementById("main").innerHTML = "\n      <section class=\"page-list\">\n        <div class=\"articles\">...loading</div>\n      </section>\n    ";
    preparePage();
  };

  render();
};

var _default = PageList;
exports.default = _default;
},{}],"js/PageDetail.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var PageDetail = function PageDetail(argument) {
  console.log(argument);

  var preparePage = function preparePage() {
    var cleanedArgument = argument.replace(/\s+/g, "-");

    var displayGame = function displayGame(gameData) {
      console.log(gameData);
      var name = gameData.name,
          released = gameData.released,
          description = gameData.description,
          website = gameData.website,
          background_image = gameData.background_image,
          publishers = gameData.publishers,
          tags = gameData.tags,
          developers = gameData.developers,
          genres = gameData.genres,
          parent_platforms = gameData.parent_platforms,
          rating = gameData.rating,
          ratings_count = gameData.ratings_count,
          stores = gameData.stores;
      var articleDOM = document.querySelector(".page-detail .article");
      articleDOM.querySelector("p.background_image").innerHTML = "\n      <img src=\"".concat(background_image, "\" alt=\"\" class=\"back-img\">\n      ");
      articleDOM.querySelector("h1.title").innerHTML = name;
      articleDOM.querySelector("p.release-date span").innerHTML = released;
      articleDOM.querySelector("p.description").innerHTML = description;
      articleDOM.querySelector("p.website").innerHTML = website;
      publishers.forEach(function (publisher) {
        articleDOM.querySelector("p.publishers").innerHTML += "\n        <span>".concat(publisher.name, ", </span>\n        ");
      });
      tags.forEach(function (tag) {
        articleDOM.querySelector("p.tags").innerHTML += "\n        <span>".concat(tag.name, ", </span>\n        ");
      });
      developers.forEach(function (developer) {
        articleDOM.querySelector("p.developers").innerHTML += "\n        <span>".concat(developer.name, ", </span>\n        ");
      });
      genres.forEach(function (genre) {
        articleDOM.querySelector("p.genres").innerHTML += "\n        <span>".concat(genre.name, "</span>\n        ");
      });
      parent_platforms.forEach(function (parent_platform) {
        articleDOM.querySelector("p.parent_platforms").innerHTML += "\n        <span>".concat(parent_platform.platform.name, "</span>\n        ");
      });
      articleDOM.querySelector("p.rating").innerHTML = "Rating : ".concat(rating);
      articleDOM.querySelector("p.ratings_count").innerHTML = "Ratings_count : ".concat(ratings_count);
      console.log(stores[0].store.domain);
      stores.forEach(function (astore) {
        articleDOM.querySelector("p.stores").innerHTML += "\n        <span>".concat(astore.store.domain, "</span>\n        ");
      });
    };

    var fetchGame = function fetchGame(url, argument) {
      fetch("".concat(url, "/").concat(argument, "?key=", '8f284fc566e044f1a78da7f07da524cb')).then(function (response) {
        return response.json();
      }).then(function (responseData) {
        displayGame(responseData);
      });
    };

    fetchGame('https://api.rawg.io/api/games', cleanedArgument);
  };

  var render = function render() {
    var intro = document.getElementById('intro');
    var filter = document.getElementById('filter');
    var showMore = document.getElementById('showMore');
    intro.classList.add("hide-me");
    filter.classList.add("hide-me");
    showMore.classList.add("hide-me");
    document.getElementById("main").innerHTML = "\n      <section class=\"page-detail\">\n        <div class=\"article\">\n          <p class =\"background_image\"></p>\n          <h1 class=\"title\"></h1>\n          <p class=\"release-date\">Release date : <span></span></p>\n          <p class=\"description\"></p>         \n          <p class=\"website\"></p>\n          <p class=\"publishers\"></p>\n          <p class=\"tags\"></p>\n          <p class=\"developers\"></p>\n          <p class=\"genres\"></p>\n          <p class=\"parent_platforms\"></p>\n          <p class=\"rating\"></p>\n          <p class=\"ratings_count\"></p>\n          <p class=\"stores\"></p>\n        </div>\n      </section>\n    ";
    preparePage();
  };

  render();
};

var _default = PageDetail;
exports.default = _default;
},{}],"js/routes.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Home = _interopRequireDefault(require("./Home.js"));

var _PageList = _interopRequireDefault(require("./PageList.js"));

var _PageDetail = _interopRequireDefault(require("./PageDetail.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var routes = {
  '': _Home.default,
  'pagelist': _PageList.default,
  'pagedetail': _PageDetail.default
};
var _default = routes;
exports.default = _default;
},{"./Home.js":"js/Home.js","./PageList.js":"js/PageList.js","./PageDetail.js":"js/PageDetail.js"}],"js/main.js":[function(require,module,exports) {
"use strict";

require("./../scss/main.scss");

var _func = _interopRequireDefault(require("./func.js"));

var _routes = _interopRequireDefault(require("./routes.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// func(routes)
var pageArgument;

var callRoute = function callRoute() {
  var hash = window.location.hash;
  var pathParts = hash.substring(1).split('/');
  var pageName = pathParts[0];
  var pageArgument = pathParts[1] || '';
  var pageFunction = _routes.default[pageName];

  if (pageFunction !== undefined) {
    pageFunction(pageArgument);
  }
};

window.addEventListener('hashchange', function () {
  return callRoute();
});
window.addEventListener('DOMContentLoaded', function () {
  return callRoute();
});
},{"./../scss/main.scss":"scss/main.scss","./func.js":"js/func.js","./routes.js":"js/routes.js"}],"../node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
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
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "40397" + '/');

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
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
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
},{}]},{},["../node_modules/parcel-bundler/src/builtins/hmr-runtime.js","js/main.js"], null)
//# sourceMappingURL=/main.fb6bbcaf.js.map