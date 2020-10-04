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
})({"ALLQ":[function(require,module,exports) {

},{}],"epB2":[function(require,module,exports) {
var _require = require("cluster"),
    fork = _require.fork;

var _kobeUrl = localStorage.getItem('_kobeUrl');

var kobeUrl = JSON.parse(_kobeUrl);
var hashMap = kobeUrl || [{
  logo: 'A',
  url: '//apple.cn'
}, {
  logo: 'G',
  url: '//google.com'
}];

var simplifyUrl = function simplifyUrl(url) {
  return url.replace('http://', '').replace('https://', '').replace('www.', '').replace('//', '').replace(/\..*/, '');
};

var $siteList = $('.siteList');

var render = function render() {
  $siteList.find('li').remove();
  hashMap.forEach(function (node, index) {
    var $li = $("<li class=\"sites columnMiddle\" data-id=".concat(index, ">\n            <div class=\"logo columnMiddle\">").concat(node.logo[0], "</div>\n            <span class=\"site-name\">").concat(simplifyUrl(node.url), "</span>\n            </li>")).appendTo($siteList);
    $li.on('click', function () {
      window.open(node.url, "_self");
    });
  });
  var listLength = $('.siteList').find('li').length;

  var listLayout = function listLayout() {
    var $li = $("<li class=\"sites columnMiddle notli\" style=\"opacity: 0;width:70px;cursor: auto;\"></li>").appendTo($siteList);
    listLength = $('.siteList').find('li').length;
  };

  while (listLength % 4 !== 0) {
    listLayout();
  }

  while (listLength % 5 !== 0) {
    listLayout();
  }
};

$('.delButton').on('click', function () {
  var $li = $('.siteList').find('li');
  $li.toggleClass("shake-rotate shake-constant shake-constant--hover opacity");
  $li.unbind('click').not($('.notli')).on('click', function (e) {
    if (window.confirm("确定删除该网址吗？")) {
      var siteIndex = e.currentTarget.dataset.id;
      hashMap.splice(siteIndex, 1);
      render();
    } else render();
  });
});
render();
$('.addButton').on('click', function () {
  var url = window.prompt('请输入您要添加的网址');

  if (url.indexOf('http') !== 0) {
    url = 'https://' + url;
  }

  hashMap.push({
    logo: simplifyUrl(url)[0].toUpperCase(),
    url: url
  });
  render();
});

window.onbeforeunload = function () {
  var string = JSON.stringify(hashMap);
  localStorage.setItem('_kobeUrl', string);
}; //清除搜索结果


$(function () {
  $('.searchGet').bind('input porpertychange', function () {
    $(document).unbind('keydown');
    $('.clearSearch').show();

    if ($('.searchGet').val() === '') {
      $('.clearSearch').hide();
    }
  });
  $('.clearSearch').on('click', function () {
    $('.searchGet').val('');
    $('.clearSearch').hide();
    keyPress();
  });
}); //键盘事件

var keyPress = function keyPress() {
  $(document).on('keydown', function (e) {
    //const key = e.key 简写为下方代码
    var key = e.key;

    for (var i = 0; i < hashMap.length; i++) {
      if (hashMap[i].logo === key) {
        window.open(hashMap[i].url, '_self');
      }
    }
  });
};

keyPress();
},{"cluster":"ALLQ"}]},{},["epB2"], null)
//# sourceMappingURL=main.abe344bf.js.map