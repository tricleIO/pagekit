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
/******/ ({

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	var __vue_styles__ = {}
	__vue_script__ = __webpack_require__(20)
	if (__vue_script__ &&
	    __vue_script__.__esModule &&
	    Object.keys(__vue_script__).length > 1) {
	  console.warn("[vue-loader] app/components/gallery-meta.vue: named exports in *.vue files are ignored.")}
	__vue_template__ = __webpack_require__(21)
	module.exports = __vue_script__ || {}
	if (module.exports.__esModule) module.exports = module.exports.default
	var __vue_options__ = typeof module.exports === "function" ? (module.exports.options || (module.exports.options = {})) : module.exports
	if (__vue_template__) {
	__vue_options__.template = __vue_template__
	}
	if (!__vue_options__.computed) __vue_options__.computed = {}
	Object.keys(__vue_styles__).forEach(function (key) {
	var module = __vue_styles__[key]
	__vue_options__.computed[key] = function () { return module }
	})
	if (false) {(function () {  module.hot.accept()
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  var id = "_v-77d4b276/gallery-meta.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },

/***/ 20:
/***/ function(module, exports) {

	'use strict';

	module.exports = {

	    section: {
	        label: 'Meta',
	        priority: 100
	    },

	    props: ['gallery']

	};

	window.Gallery.components['gallery-meta'] = module.exports;

/***/ },

/***/ 21:
/***/ function(module, exports) {

	module.exports = "\n\n<div class=\"uk-form-horizontal\">\n\n    <div class=\"uk-form-row\">\n        <label for=\"form-meta-title\" class=\"uk-form-label\">{{ 'Title' | trans }}</label>\n        <div class=\"uk-form-controls\">\n            <input id=\"form-meta-title\" class=\"uk-form-width-large\" type=\"text\" v-model=\"gallery.data.meta['og:title']\">\n        </div>\n    </div>\n\n    <div class=\"uk-form-row\">\n        <label for=\"form-meta-description\" class=\"uk-form-label\">{{ 'Description' | trans }}</label>\n        <div class=\"uk-form-controls\">\n            <textarea id=\"form-meta-description\" class=\"uk-form-width-large\" rows=\"5\" type=\"text\" v-model=\"gallery.data.meta['og:description']\"></textarea>\n        </div>\n    </div>\n\n</div>\n\n";

/***/ }

/******/ });