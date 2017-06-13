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
	__vue_script__ = __webpack_require__(22)
	if (__vue_script__ &&
	    __vue_script__.__esModule &&
	    Object.keys(__vue_script__).length > 1) {
	  console.warn("[vue-loader] app/components/link-gallery.vue: named exports in *.vue files are ignored.")}
	__vue_template__ = __webpack_require__(23)
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
	  var id = "_v-c9e3d056/link-gallery.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },

/***/ 22:
/***/ function(module, exports) {

	'use strict';

	module.exports = {

	    link: {
	        label: 'Gallery'
	    },

	    props: ['link'],

	    data: function data() {
	        return {
	            galleries: []
	        };
	    },

	    created: function created() {
	        this.$http.get('api/gallery').then(function (res) {
	            this.$set('galleries', res.data.galleries);
	        });
	    },

	    ready: function ready() {
	        this.link = '@gallery';
	    },

	    filters: {
	        link: function link(gallery) {
	            return '@gallery/id?id=' + gallery.id;
	        }
	    }

	};

	window.Links.components['link-gallery'] = module.exports;

/***/ },

/***/ 23:
/***/ function(module, exports) {

	module.exports = "\n\n<div class=\"uk-form-row\">\n    <label for=\"form-link-gallery\" class=\"uk-form-label\">{{ 'View' | trans }}</label>\n    <div class=\"uk-form-controls\">\n        <select id=\"form-link-gallery\" class=\"uk-width-1-1\" v-model=\"link\">\n            <option value=\"@gallery\">{{ 'Galleries View' | trans }}</option>\n            <optgroup :label=\"'Galleries' | trans\">\n                <option v-for=\"p in galleries\" :value=\"p | link\">{{ p.title }}</option>\n            </optgroup>\n        </select>\n    </div>\n</div>\n\n";

/***/ }

/******/ });