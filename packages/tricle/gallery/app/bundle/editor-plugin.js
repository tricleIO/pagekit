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

	module.exports = {

	    plugin: true,

	    created: function () {
	        var vm = this, editor = this.$parent.editor;

	        if (!editor || !editor.htmleditor) {
	            return;
	        }

	        this.galleries = [];
	        this.resource = this.$resource('api/gallery{/id}');

	        editor.addButton('gallery', {
	            title: 'Gallery',
	            label: '<img src="' + this.$url('packages/tricle/gallery/assets/img/editor-icon.svg') + '" width="12px" height="12px"></img>'
	        });

	        editor.options.toolbar.push('gallery');

	        editor
	            .on('action.gallery', function (e, editor) {
	                vm.openModal();
	            })
	            .on('render', function () {
	                vm.galleries = editor.replaceInPreview(/\[gallery(.*?)\/]/gi, vm.replaceInPreview);
	            })
	            .on('renderLate', function () {
	                while (vm.$children.length) {
	                    vm.$children[0].$destroy();
	                }

	                Vue.nextTick(function () {
	                    editor.preview.find('gallery-preview').each(function () {
	                        vm.$compile(this);
	                    });
	                });
	            });

	        editor.debouncedRedraw();
	    },


	    methods: {

	        openModal: function () {
	            var editor = this.$parent.editor, cursor = editor.editor.getCursor();

	            new this.$options.utils['editor-picker']({
	                parent: this,
	                data: {
	                    gallery: '',
	                    galleries: this.galleries
	                }
	            }).$mount()
	                .$appendTo('body')
	                .$on('select', function (gallery) {
	                    var replacement = '[gallery id="' + gallery.id + '"';
	                    (gallery.limit > 1) ? replacement += ' limit="' + gallery.limit +'"' : '';
	                    replacement += ' showLink="' + gallery.showLink + '"/]';
	                    editor.editor.replaceRange(replacement, cursor);
	                });
	        },

	        replaceInPreview: function (data) {
	            var options = {
	                id: data.matches[1].match(/id="(.+?)"/)[1],
	                limit: (data.matches[1].match(/limit="(.+?)"/)) ? data.matches[1].match(/limit="(.+?)"/)[1] : false,
	                showLink: data.matches[1].match(/showLink="(.+?)"/)[1],
	            };

	            var preview = '<gallery-preview :id="' + options.id + '" ';
	            preview += (options.limit) ? ':limit="' + options.limit + '" ' : '';
	            preview += ':show-link="' + options.showLink + '"></gallery-preview>';

	            return preview
	        }

	    },

	    components: {
	        'gallery-preview': __webpack_require__(1)
	    },

	    utils: {
	        'editor-picker': Vue.extend(__webpack_require__(4))
	    }

	};

	window.Editor.components['editor-plugin'] = module.exports;

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	var __vue_styles__ = {}
	__vue_script__ = __webpack_require__(2)
	if (__vue_script__ &&
	    __vue_script__.__esModule &&
	    Object.keys(__vue_script__).length > 1) {
	  console.warn("[vue-loader] app/components/editor-preview.vue: named exports in *.vue files are ignored.")}
	__vue_template__ = __webpack_require__(3)
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
	  var id = "_v-f735c284/editor-preview.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },
/* 2 */
/***/ function(module, exports) {

	'use strict';

	module.exports = {
	    props: ['id', 'limit', 'showLink'],

	    data: function data() {
	        return {
	            gallery: ''
	        };
	    },

	    ready: function ready() {
	        this.$resource('api/gallery{/id}', { id: this.id }).get().then(function (res) {
	            this.$set('gallery', res.data);
	        });
	    }
	};

/***/ },
/* 3 */
/***/ function(module, exports) {

	module.exports = "\n<div class=\"uk-slidenav-position uk-width-large-3-4 uk-container-center\" data-uk-slideshow=\"\">\n    <h3 class=\"uk-margin-remove\">{{ gallery.title }}</h3>\n    <img class=\"uk-display-block\" src=\"data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEASABIAAD/4QkgaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLwA8P3hwYWNrZXQgYmVnaW49Iu+7vyIgaWQ9Ilc1TTBNcENlaGlIenJlU3pOVGN6a2M5ZCI/PiA8eDp4bXBtZXRhIHhtbG5zOng9ImFkb2JlOm5zOm1ldGEvIiB4OnhtcHRrPSJYTVAgQ29yZSA1LjUuMCI+IDxyZGY6UkRGIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyI+IDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PSIiLz4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8P3hwYWNrZXQgZW5kPSJ3Ij8+/+0ALFBob3Rvc2hvcCAzLjAAOEJJTQQlAAAAAAAQ1B2M2Y8AsgTpgAmY7PhCfv/iAmhJQ0NfUFJPRklMRQABAQAAAlhsY21zBDAAAG1udHJSR0IgWFlaIAfgAAkADQASAAgAGGFjc3BBUFBMAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD21gABAAAAANMtbGNtcwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAC2Rlc2MAAAEIAAAAQGNwcnQAAAFIAAAATnd0cHQAAAGYAAAAFGNoYWQAAAGsAAAALHJYWVoAAAHYAAAAFGJYWVoAAAHsAAAAFGdYWVoAAAIAAAAAFHJUUkMAAAIUAAAAIGdUUkMAAAIUAAAAIGJUUkMAAAIUAAAAIGNocm0AAAI0AAAAJG1sdWMAAAAAAAAAAQAAAAxlblVTAAAAJAAAABwAcwBSAEcAQgAgAEkARQBDADYAMQA5ADYANgAtADIALgAxAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAADIAAAAcAE4AbwAgAGMAbwBwAHkAcgBpAGcAaAB0ACwAIAB1AHMAZQAgAGYAcgBlAGUAbAB5AAAAAFhZWiAAAAAAAAD21gABAAAAANMtc2YzMgAAAAAAAQxKAAAF4///8yoAAAebAAD9h///+6L///2jAAAD2AAAwJRYWVogAAAAAAAAb5QAADjuAAADkFhZWiAAAAAAAAAknQAAD4MAALa+WFlaIAAAAAAAAGKlAAC3kAAAGN5wYXJhAAAAAAADAAAAAmZmAADypwAADVkAABPQAAAKW2Nocm0AAAAAAAMAAAAAo9cAAFR7AABMzQAAmZoAACZmAAAPXP/bAEMABgQFBgUEBgYFBgcHBggKEAoKCQkKFA4PDBAXFBgYFxQWFhodJR8aGyMcFhYgLCAjJicpKikZHy0wLSgwJSgpKP/bAEMBBwcHCggKEwoKEygaFhooKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKP/AABEIASwBkAMBEQACEQEDEQH/xAAfAAABBQEBAQEBAQAAAAAAAAAAAQIDBAUGBwgJCgv/xAC1EAACAQMDAgQDBQUEBAAAAX0BAgMABBEFEiExQQYTUWEHInEUMoGRoQgjQrHBFVLR8CQzYnKCCQoWFxgZGiUmJygpKjQ1Njc4OTpDREVGR0hJSlNUVVZXWFlaY2RlZmdoaWpzdHV2d3h5eoOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4eLj5OXm5+jp6vHy8/T19vf4+fr/xAAfAQADAQEBAQEBAQEBAAAAAAAAAQIDBAUGBwgJCgv/xAC1EQACAQIEBAMEBwUEBAABAncAAQIDEQQFITEGEkFRB2FxEyIygQgUQpGhscEJIzNS8BVictEKFiQ04SXxFxgZGiYnKCkqNTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqCg4SFhoeIiYqSk5SVlpeYmZqio6Slpqeoqaqys7S1tre4ubrCw8TFxsfIycrS09TV1tfY2dri4+Tl5ufo6ery8/T19vf4+fr/2gAMAwEAAhEDEQA/APpOgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKANONF2L8o6elADti/wB1fyoANi/3V/KgA2L/AHV/KgA2L/dX8qADYv8AdX8qADYv91fyoANi/wB1fyoANi/3V/KgA2L/AHV/KgA2L/dX8qADYv8AdX8qADYv91fyoANi/wB1fyoANi/3V/KgA2L/AHV/KgA2L/dX8qADYv8AdX8qADYv91fyoANi/wB1fyoANi/3V/KgA2L/AHV/KgA2L/dX8qADYv8AdX8qADYv91fyoANi/wB1fyoANi/3V/KgA2L/AHV/KgA2L/dX8qADYv8AdX8qADYv91fyoANi/wB1fyoANi/3V/KgA2L/AHV/KgA2L/dX8qADYv8AdX8qADYv91fyoANi/wB1fyoANi/3V/KgA2L/AHV/KgA2L/dX8qADYv8AdX8qADYv91fyoANi/wB1fyoANi/3V/KgBsiLsb5R09KAMygAoAKACgDVj/1a/QUALQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAJJ/q2+hoAyqACgAoAKANWP/Vr9BQAtABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAkn+rb6GgDKoAKACgAoA1Y/wDVr9BQAtABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAkn+rb6GgDKoAKACgAoA1Y/8AVr9BQAtABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAkn+rb6GgDKoAKACgAoA1Y/9Wv0FAC0AFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFACSf6tvoaAMqgAoAKACgDVj/1a/QUALQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAJJ/q2+hoAyqACgAoAKANWP8A1a/QUALQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAJJ/q2+hoAyqACgAoAKANWP/AFa/QUALQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAJJ/q2+hoAyqACgAoAKANWP/Vr9BQAtABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAkn+rb6GgDKoAKACgAoA1Y/9Wv0FAC0AFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFAFK8ky4VTwv86AGxXTrw3zD9aALcUySdDg+hoAkoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgBJP8AVt9DQBlUAFABQAUAasf+rX6CgBaACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKAGyv5cZY9qAM1FMkgHcmgC5JaKR8h2mgCpJE8f3hx6igB8Vy6cH5h70AW4p0k4BwfQ0AS0AFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAJJ/q2+hoAyqACgAoAKANWP/Vr9BQAtABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFAFO+kywQdByaAFsY+C5+goAt0AFAEEtqj8r8p9ulAFSWF4+oyPUUALFcPHxnI9DQBbiuEfgnafQ0ATUAFABQAUAFAB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9W30NAGVQAUAFABQBqx/6tfoKAFoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKAEk/1bfQ0AZVABQAUAFAGrH/AKtfoKAFoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKAEk/wBW30NAGVQAUAFABQBqx/6tfoKAFoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKAEk/1bfQ0AZVABQAUAFAGrH/q1+goAWgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAST/Vt9DQBlUAFABQAUAasf+rX6CgBaACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgBJP9W30NAGVQAUAFABQBqx/wCrX6CgBaACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgBJP8AVt9DQBlUAFABQAUAasf+rX6CgBaACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgBJP9W30NAGVQAUAFABQBqx/6tfoKAFoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKAEk/1bfQ0AZVABQAUAFAGrH/q1+goAWgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAST/Vt9DQBlUAFABQAUAWFu2CgbRxQAv2xv7q0AH2xv7q0AH2xv7q0AH2xv7q0AH2xv7q0AH2xv7q0AH2xv7q0AH2xv7q0AH2xv7q0AH2xv7q0AH2xv7q0AH2xv7q0AH2xv7q0AH2xv7q0AH2xv7q0AH2xv7q0AH2xv7q0AH2xv7q0AH2xv7q0AH2xv7q0AH2xv7q0AH2xv7q0AH2xv7q0AH2xv7q0AH2xv7q0AH2xv7q0AH2xv7q0AH2xv7q0AH2xv7q0AH2xv7q0AH2xv7q0AH2xv7q0AH2xv7q0AH2xv7q0AH2xv7q0AH2xv7q0AH2xv7q0AH2xv7q0AH2xv7q0AH2xv7q0AH2xv7q0AH2xv7q0AH2xv7q0AH2xv7q0AI12xUjaOaAK9ABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAf/9k=\" alt=\"Slideshow\">\n    <p v-if=\"gallery.description\" class=\"uk-margin-remove\">{{ gallery.description }}</p>\n    <a v-if=\"showLink\" href=\"#\">{{ 'more' | trans }} <i class=\"uk-icon uk-icon-arrow-right\"></i></a>\n</div>\n";

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	var __vue_styles__ = {}
	__vue_script__ = __webpack_require__(5)
	if (__vue_script__ &&
	    __vue_script__.__esModule &&
	    Object.keys(__vue_script__).length > 1) {
	  console.warn("[vue-loader] app/components/editor-picker.vue: named exports in *.vue files are ignored.")}
	__vue_template__ = __webpack_require__(6)
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
	  var id = "_v-bd13d7f0/editor-picker.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },
/* 5 */
/***/ function(module, exports) {

	'use strict';

	module.exports = {

	    data: function data() {
	        return {
	            galleries: [],
	            gallery: {
	                id: '',
	                showLink: true,
	                limit: ''
	            }
	        };
	    },

	    created: function created() {
	        this.$resource('api/gallery{/id}').query({ filter: { minigallery: true } }).then(function (res) {
	            this.galleries = res.data.galleries;
	        });
	    },

	    ready: function ready() {
	        this.$refs.modal.open();
	        this.$set('gallery.showLink', true);
	    },

	    methods: {
	        close: function close() {
	            this.$destroy(true);
	        },
	        update: function update() {
	            this.$refs.modal.close();
	            this.$emit('select', this.gallery);
	        }
	    }
	};

/***/ },
/* 6 */
/***/ function(module, exports) {

	module.exports = "\n\n<div>\n    <v-modal v-ref:modal :closed=\"close\">\n        <form class=\"uk-form uk-form stacked\" @submit.prevent=\"update\">\n\n            <div class=\"uk-modal-header\">\n                <h2>{{ 'Add Gallery' | trans }}</h2>\n            </div>\n\n            <div v-if=\"!galleries.length\" class=\"uk-form-row\">\n                <p>{{ 'Please add and publish a gallery first!' | trans }}</p>\n            </div>\n            <div v-else>\n                <div class=\"uk-form-row\">\n                    <label for=\"form-gallery-id\" class=\"uk-form-label\">{{ 'Gallery' | trans }}</label>\n                    <div class=\"uk-form-controls\">\n                        <select id=\"form-gallery-id\" class=\"uk-width-1-1\" v-model=\"gallery.id\">\n                            <option v-for=\"g in galleries\" value=\"{{g.id}}\">{{ g.title }}</option>\n                        </select>\n                    </div>\n                </div>\n\n                <div class=\"uk-form-row uk-grid uk-form-stacked\">\n                    <div class=\"uk-width-1-2\">\n                        <label for=\"form-gallery-limit\" class=\"uk-form-label\">{{ 'Limit' | trans }}</label>\n                        <input id=\"form-gallery-limit\" type=\"number\" min=\"1\" v-model=\"gallery.limit\">\n                    </div>\n                    <div class=\"uk-width-1-2\">\n                        <label for=\"form-gallery-link\" class=\"uk-form-label\">{{ 'Show Link?' | trans }}</label>\n                        <input id=\"form-gallery-link\" type=\"checkbox\" v-model=\"gallery.showLink\">\n                    </div>\n                </div>\n            </div>\n            <div class=\"uk-modal-footer uk-text-right\">\n                <button class=\"uk-button uk-button-link uk-modal-close\" type=\"button\">{{ 'Cancel' | trans }}</button>\n                <button v-if=\"galleries.length\" class=\"uk-button uk-button-link\" type=\"submit\">{{ 'Update' | trans }}</button>\n            </div>\n\n        </form>\n    </v-modal>\n</div>\n\n";

/***/ }
/******/ ]);