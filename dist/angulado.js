(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _observer = require('./observer');

var _observer2 = _interopRequireDefault(_observer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Angulado = function () {
  function Angulado(obj) {
    _classCallCheck(this, Angulado);

    this.$subject = new _observer2.default(obj);
    this.observe(obj);

    return {
      data: obj
    };
  }

  _createClass(Angulado, [{
    key: 'observe',
    value: function observe(obj) {
      for (var key in obj) {
        if (obj.hasOwnProperty(key)) this.reactive(obj, key);
      }
    }
  }, {
    key: 'reactive',
    value: function reactive(obj, key) {
      var val = obj[key];
      var self = this;

      Object.defineProperty(obj, key, {
        get: function get() {
          return val;
        },
        set: function set(newVal) {
          val = newVal;

          self.$subject.notify(key);
        }
      });

      this.parser(obj);
    }
  }, {
    key: 'parser',
    value: function parser(obj) {
      var _this = this;

      var nodes = document.querySelectorAll('[ang-bind]');

      nodes.forEach(function (node) {
        var key = node.attributes['ang-bind'].value;

        node.textContent = obj[key];

        _this.$subject.register(key, function () {
          return node.textContent = obj[key];
        });
      });
    }
  }]);

  return Angulado;
}();

exports.default = Angulado;

},{"./observer":2}],2:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Observer = function () {
  function Observer() {
    _classCallCheck(this, Observer);

    this.subs = {};
  }

  _createClass(Observer, [{
    key: "notify",
    value: function notify(key) {
      if (!this.subs[key]) return;
      this.subs[key].forEach(function (handler) {
        return handler();
      });
    }
  }, {
    key: "register",
    value: function register(key, handler) {
      if (!this.subs[key]) this.subs[key] = [];
      this.subs[key].push(handler);
    }
  }]);

  return Observer;
}();

exports.default = Observer;

},{}],3:[function(require,module,exports){
'use strict';

var _angulado = require('./angulado');

var _angulado2 = _interopRequireDefault(_angulado);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

window.Angulado = _angulado2.default;

},{"./angulado":1}]},{},[3]);
