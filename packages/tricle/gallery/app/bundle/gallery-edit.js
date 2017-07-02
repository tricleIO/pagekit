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

	window.Gallery = {

	    el: '#gallery',

	    data: function () {
	        return {
	            data: window.$data,
	            gallery: window.$data.gallery,
	            sections: []
	        }
	    },

	    created: function () {

	        var sections = [];

	        _.forIn(this.$options.components, function (component, name) {

	            var options = component.options || {};

	            if (options.section) {
	                sections.push(_.extend({name: name, priority: 0}, options.section));
	            }

	        });

	        this.$set('sections', _.sortBy(sections, 'priority'));

	        this.resource = this.$resource('api/gallery{/id}');
	    },

	    ready: function () {
	        this.tab = UIkit.tab(this.$els.tab, {connect: this.$els.content});
	    },

	    methods: {

	        save: function () {

	            var data = {gallery: this.gallery, id: this.gallery.id};
	            this.$broadcast('save', data);

	            if(this.gallery.images.length < 1 && (this.gallery.status == 2 || this.gallery.status == 4)) {
	                this.$notify(this.$trans('Please add some images before you publish', 'danger'));
	                return false;
	            }

	            this.resource.save({id: this.gallery.id}, data).then(function (res) {
	                var data = res.data;
	                if (!this.gallery.id) {
	                    window.history.replaceState({}, '', this.$url.route('admin/gallery/gallery/edit', {id: data.gallery.id}))
	                }
	                this.$set('gallery', data.gallery);
	                this.$notify(this.$trans('Gallery saved'));

	            }, function (res) {
	                this.$notify(res.data, 'danger');
	            });
	        }

	    },

	    components: {
	        settings: __webpack_require__(13)
	    }

	};

	Vue.ready(window.Gallery);


/***/ },

/***/ 13:
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	var __vue_styles__ = {}
	__vue_script__ = __webpack_require__(14)
	if (__vue_script__ &&
	    __vue_script__.__esModule &&
	    Object.keys(__vue_script__).length > 1) {
	  console.warn("[vue-loader] app/components/gallery-settings.vue: named exports in *.vue files are ignored.")}
	__vue_template__ = __webpack_require__(15)
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
	  var id = "_v-bad775d8/gallery-settings.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },

/***/ 14:
/***/ function(module, exports) {

	'use strict';

	module.exports = {

	    props: ['gallery', 'data', 'form'],

	    section: {
	        label: 'Gallery'
	    },

		methods: {
            generatePassword: function() {
            	var char1 = Math.floor((Math.random() * 10)).toString();
            	var char2 = Math.floor((Math.random() * 10)).toString();
            	var char3 = Math.floor((Math.random() * 10)).toString();
            	var char4 = Math.floor((Math.random() * 10)).toString();
            	var char5 = Math.floor((Math.random() * 10)).toString();
            	var char6 = Math.floor((Math.random() * 10)).toString();

            	this.gallery.password = char1+char2+char3+char4+char5+char6;
            	//return char1+char2+char3+char4+char5+char6;
            }
		}

    }

	;

/***/ },

/***/ 15:
/***/ function(module, exports) {

	module.exports = "\n\n<div class=\"uk-grid pk-grid-large pk-width-sidebar-large uk-form-stacked\" data-uk-grid-margin>\n    <div class=\"pk-width-content\">\n\n        <div class=\"uk-form-row\">\n            <input class=\"uk-width-1-1 uk-form-large\" type=\"text\" name=\"title\" :placeholder=\"'Enter Title' | trans\" v-model=\"gallery.title\" v-validate:required>\n        </div>\n        <div class=\"uk-form-row\">\n            <label for=\"form-photograph\" class=\"uk-form-label\">{{ 'Photograph' | trans }}</label>\n            <div class=\"uk-form-controls\">\n                <input id=\"form-photograph\" class=\"uk-width-1-1\" type=\"text\" v-model=\"gallery.photograph\">\n            </div>\n        </div>\n        <div class=\"uk-form-row\">\n            <label for=\"gallery-description\" class=\"uk-form-label\">{{ 'Description' | trans }}</label>\n            <div class=\"uk-form-controls\">\n                <v-editor id=\"gallery-description\" :value.sync=\"gallery.description\" :options=\"{markdown : gallery.data.markdown, height: 250}\"></v-editor>\n            </div>\n        </div>\n\n    </div>\n    <div class=\"pk-width-sidebar\">\n      <div class=\"uk-form-row\">\n          <span class=\"uk-form-label\">{{ 'Event Date' | trans }}</span>\n          <div class=\"uk-form-controls\">\n              <input-date :datetime.sync=\"gallery.date\"></input-date>\n          </div>\n      </div>\n        <div class=\"uk-panel\">\n            <div class=\"uk-form-row\">\n                <label for=\"form-slug\" class=\"uk-form-label\">{{ 'Slug' | trans }}</label>\n                <div class=\"uk-form-controls\">\n                    <input id=\"form-slug\" class=\"uk-width-1-1\" type=\"text\" v-model=\"gallery.slug\">\n                </div>\n            <label for=\"form-password\" class=\"uk-form-label\">{{ 'Password' | trans }}</label>\n                <div class=\"uk-form-controls\">\n                    <input id=\"form-password\" pattern=\".{6,6}\" title=\"6 číslic\" class=\"uk-width-1-1\" type=\"text\" v-model=\"gallery.password\">\n                </div>\n            <a role='button' v-on:click='generatePassword()'>Generovat heslo</a>\n            </div>\n            <div class=\"uk-form-row\">\n                <label for=\"form-status\" class=\"uk-form-label\">{{ 'Status' | trans }}</label>\n                <div class=\"uk-form-controls\">\n                    <select id=\"form-status\" class=\"uk-width-1-1\" v-model=\"gallery.status\">\n                        <option v-for=\"(id, status) in data.statuses\" :value=\"id\">{{status}}</option>\n                    </select>\n                </div>\n            </div>\n            <div class=\"uk-form-row\" v-if=\"data.canEditAll\">\n                <label for=\"form-author\" class=\"uk-form-label\">{{ 'Author' | trans }}</label>\n                <div class=\"uk-form-controls\">\n                    <select id=\"form-author\" class=\"uk-width-1-1\" v-model=\"gallery.user_id\">\n                        <option v-for=\"author in data.authors\" :value=\"author.id\">{{author.username}}</option>\n                    </select>\n                </div>\n            </div>\n            <div class=\"uk-form-row\">\n                <span class=\"uk-form-label\">{{ 'Restrict Access' | trans }}</span>\n                <div class=\"uk-form-controls uk-form-controls-text\">\n                    <p v-for=\"role in data.roles\" class=\"uk-form-controls-condensed\">\n                        <label><input type=\"checkbox\" :value=\"role.id\" v-model=\"gallery.roles\" number> {{ role.name }}</label>\n                    </p>\n                </div>\n            </div>\n            <div class=\"uk-form-row\">\n                <span class=\"uk-form-label\">{{ 'Options' | trans }}</span>\n                <div class=\"uk-form-controls\">\n                    <label><input type=\"checkbox\" v-model=\"gallery.data.markdown\" value=\"1\"> {{ 'Enable Markdown' | trans }}</label>\n                </div>\n            </div>\n\n        </div>\n\n    </div>\n</div>\n\n";

/***/ }

/******/ });