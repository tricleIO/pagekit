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

	var __vue_script__, __vue_template__
	var __vue_styles__ = {}
	__webpack_require__(16)
	__vue_script__ = __webpack_require__(18)
	if (__vue_script__ &&
	    __vue_script__.__esModule &&
	    Object.keys(__vue_script__).length > 1) {
	  console.warn("[vue-loader] app/components/gallery-images.vue: named exports in *.vue files are ignored.")}
	__vue_template__ = __webpack_require__(19)
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
	  var id = "_v-e8a209ae/gallery-images.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },
/* 1 */,
/* 2 */,
/* 3 */,
/* 4 */,
/* 5 */,
/* 6 */,
/* 7 */,
/* 8 */,
/* 9 */
/***/ function(module, exports) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	// css base code, injected by the css-loader
	module.exports = function() {
		var list = [];

		// return the list of modules as css string
		list.toString = function toString() {
			var result = [];
			for(var i = 0; i < this.length; i++) {
				var item = this[i];
				if(item[2]) {
					result.push("@media " + item[2] + "{" + item[1] + "}");
				} else {
					result.push(item[1]);
				}
			}
			return result.join("");
		};

		// import a list of modules into the list
		list.i = function(modules, mediaQuery) {
			if(typeof modules === "string")
				modules = [[null, modules, ""]];
			var alreadyImportedModules = {};
			for(var i = 0; i < this.length; i++) {
				var id = this[i][0];
				if(typeof id === "number")
					alreadyImportedModules[id] = true;
			}
			for(i = 0; i < modules.length; i++) {
				var item = modules[i];
				// skip already imported module
				// this implementation is not 100% perfect for weird media query combinations
				//  when a module is imported multiple times with different media queries.
				//  I hope this will never occur (Hey this way we have smaller bundles)
				if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
					if(mediaQuery && !item[2]) {
						item[2] = mediaQuery;
					} else if(mediaQuery) {
						item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
					}
					list.push(item);
				}
			}
		};
		return list;
	};


/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	var stylesInDom = {},
		memoize = function(fn) {
			var memo;
			return function () {
				if (typeof memo === "undefined") memo = fn.apply(this, arguments);
				return memo;
			};
		},
		isOldIE = memoize(function() {
			return /msie [6-9]\b/.test(window.navigator.userAgent.toLowerCase());
		}),
		getHeadElement = memoize(function () {
			return document.head || document.getElementsByTagName("head")[0];
		}),
		singletonElement = null,
		singletonCounter = 0,
		styleElementsInsertedAtTop = [];

	module.exports = function(list, options) {
		if(false) {
			if(typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
		}

		options = options || {};
		// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
		// tags it will allow on a page
		if (typeof options.singleton === "undefined") options.singleton = isOldIE();

		// By default, add <style> tags to the bottom of <head>.
		if (typeof options.insertAt === "undefined") options.insertAt = "bottom";

		var styles = listToStyles(list);
		addStylesToDom(styles, options);

		return function update(newList) {
			var mayRemove = [];
			for(var i = 0; i < styles.length; i++) {
				var item = styles[i];
				var domStyle = stylesInDom[item.id];
				domStyle.refs--;
				mayRemove.push(domStyle);
			}
			if(newList) {
				var newStyles = listToStyles(newList);
				addStylesToDom(newStyles, options);
			}
			for(var i = 0; i < mayRemove.length; i++) {
				var domStyle = mayRemove[i];
				if(domStyle.refs === 0) {
					for(var j = 0; j < domStyle.parts.length; j++)
						domStyle.parts[j]();
					delete stylesInDom[domStyle.id];
				}
			}
		};
	}

	function addStylesToDom(styles, options) {
		for(var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];
			if(domStyle) {
				domStyle.refs++;
				for(var j = 0; j < domStyle.parts.length; j++) {
					domStyle.parts[j](item.parts[j]);
				}
				for(; j < item.parts.length; j++) {
					domStyle.parts.push(addStyle(item.parts[j], options));
				}
			} else {
				var parts = [];
				for(var j = 0; j < item.parts.length; j++) {
					parts.push(addStyle(item.parts[j], options));
				}
				stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
			}
		}
	}

	function listToStyles(list) {
		var styles = [];
		var newStyles = {};
		for(var i = 0; i < list.length; i++) {
			var item = list[i];
			var id = item[0];
			var css = item[1];
			var media = item[2];
			var sourceMap = item[3];
			var part = {css: css, media: media, sourceMap: sourceMap};
			if(!newStyles[id])
				styles.push(newStyles[id] = {id: id, parts: [part]});
			else
				newStyles[id].parts.push(part);
		}
		return styles;
	}

	function insertStyleElement(options, styleElement) {
		var head = getHeadElement();
		var lastStyleElementInsertedAtTop = styleElementsInsertedAtTop[styleElementsInsertedAtTop.length - 1];
		if (options.insertAt === "top") {
			if(!lastStyleElementInsertedAtTop) {
				head.insertBefore(styleElement, head.firstChild);
			} else if(lastStyleElementInsertedAtTop.nextSibling) {
				head.insertBefore(styleElement, lastStyleElementInsertedAtTop.nextSibling);
			} else {
				head.appendChild(styleElement);
			}
			styleElementsInsertedAtTop.push(styleElement);
		} else if (options.insertAt === "bottom") {
			head.appendChild(styleElement);
		} else {
			throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
		}
	}

	function removeStyleElement(styleElement) {
		styleElement.parentNode.removeChild(styleElement);
		var idx = styleElementsInsertedAtTop.indexOf(styleElement);
		if(idx >= 0) {
			styleElementsInsertedAtTop.splice(idx, 1);
		}
	}

	function createStyleElement(options) {
		var styleElement = document.createElement("style");
		styleElement.type = "text/css";
		insertStyleElement(options, styleElement);
		return styleElement;
	}

	function addStyle(obj, options) {
		var styleElement, update, remove;

		if (options.singleton) {
			var styleIndex = singletonCounter++;
			styleElement = singletonElement || (singletonElement = createStyleElement(options));
			update = applyToSingletonTag.bind(null, styleElement, styleIndex, false);
			remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true);
		} else {
			styleElement = createStyleElement(options);
			update = applyToTag.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
			};
		}

		update(obj);

		return function updateStyle(newObj) {
			if(newObj) {
				if(newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap)
					return;
				update(obj = newObj);
			} else {
				remove();
			}
		};
	}

	var replaceText = (function () {
		var textStore = [];

		return function (index, replacement) {
			textStore[index] = replacement;
			return textStore.filter(Boolean).join('\n');
		};
	})();

	function applyToSingletonTag(styleElement, index, remove, obj) {
		var css = remove ? "" : obj.css;

		if (styleElement.styleSheet) {
			styleElement.styleSheet.cssText = replaceText(index, css);
		} else {
			var cssNode = document.createTextNode(css);
			var childNodes = styleElement.childNodes;
			if (childNodes[index]) styleElement.removeChild(childNodes[index]);
			if (childNodes.length) {
				styleElement.insertBefore(cssNode, childNodes[index]);
			} else {
				styleElement.appendChild(cssNode);
			}
		}
	}

	function applyToTag(styleElement, obj) {
		var css = obj.css;
		var media = obj.media;
		var sourceMap = obj.sourceMap;

		if (media) {
			styleElement.setAttribute("media", media);
		}

		if (sourceMap) {
			// https://developer.chrome.com/devtools/docs/javascript-debugging
			// this makes source maps inside style tags work properly in Chrome
			css += '\n/*# sourceURL=' + sourceMap.sources[0] + ' */';
			// http://stackoverflow.com/a/26603875
			css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
		}

		if (styleElement.styleSheet) {
			styleElement.styleSheet.cssText = css;
		} else {
			while(styleElement.firstChild) {
				styleElement.removeChild(styleElement.firstChild);
			}
			styleElement.appendChild(document.createTextNode(css));
		}
	}


/***/ },
/* 11 */,
/* 12 */,
/* 13 */,
/* 14 */,
/* 15 */,
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(17);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(10)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../../../../node_modules/css-loader/index.js!./../../../../../node_modules/vue-loader/lib/style-rewriter.js!./../../../../../node_modules/vue-loader/lib/selector.js?type=style&index=0!./gallery-images.vue", function() {
				var newContent = require("!!./../../../../../node_modules/css-loader/index.js!./../../../../../node_modules/vue-loader/lib/style-rewriter.js!./../../../../../node_modules/vue-loader/lib/selector.js?type=style&index=0!./gallery-images.vue");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(9)();
	// imports


	// module
	exports.push([module.id, "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n.file-upload {\n    border: 2px dashed #E5E5E5;\n    position: relative;\n}\n\n.file-upload input {\n    position: absolute;\n    cursor: pointer;\n    top: 0;\n    right: 0;\n    bottom: 0;\n    left: 0;\n    width: 100%;\n    height: 100%;\n    opacity: 0;\n}\n\n.pointer {\n    cursor: pointer;\n}\n\n.max-size {\n    display: block;\n    font-size: .9em;\n}\n", ""]);

	// exports


/***/ },
/* 18 */
/***/ function(module, exports) {

	'use strict';

	module.exports = {
	    props: ['gallery'],
	    section: {
	        label: 'Images',
	        priority: 100
	    },

	    data: function data() {
	        return {
	            files: [],
	            form: {},
	            images: [],
	            progress: 0,
	            maxSize: ''
	        };
	    },

	    ready: function ready() {
	        this.$resource('api/gallery/maxsize').get().then(function (res) {
	            this.$set('maxSize', res.data);
	        });
	    },

	    methods: {
	        onFileChange: function onFileChange(e) {
	            this.files = e.target.files || e.dataTransfer.files;
	            for (var i = 0; i < this.files.length; i++) {
	                if (!_.isUndefined(this.files[i].name) && !/\.(jpe?g|png)$/i.test(this.files[i].name)) {
	                    this.$notify(this.$trans('Invalid file type. Only *.jpg, *.jpeg and *.png are supported'), 'danger');
	                    this.reset();
	                }
	            }
	        },


	        deleteImage: function deleteImage(img) {
	            this.$resource('api/gallery/image{/id}').delete({ id: img.id }).then(function (res) {
	                this.modal.hide();
	                this.$set('gallery.images', res.data.images);
	                this.$notify(this.$trans('Image deleted'));
	            });
	        },

	        editImage: function editImage(img) {
	            if (!this.modal) {
	                this.modal = UIkit.modal(this.$els.modal);
	            }
	            this.$set('img', img);
	            this.modal.show();
	        },

	        saveImage: function saveImage(img) {
	            this.$resource('api/gallery/image{/id}').save({ id: img.id }, { image: img }).then(function () {
	                this.modal.hide();
	                this.$notify(this.$trans('Image saved'));
	            });
	        },

	        rebuildThumbnails: function rebuildThumbnails() {
	            this.$resource('api/gallery/rebuild').update({ id: this.gallery.id }).then(function (res) {
	                this.$notify(this.$trans('Thumbnails rebuilded. Please reload the page to see changes!'));
	            });
	        },


	        cancelEdit: function cancelEdit() {
	            this.modal.hide();
	        },

	        upload: function upload() {
	            var _this = this;

	            this.form = new FormData();
	            for (var key in this.files) {
	                this.form.append('images[' + key + ']', this.files[key]);
	            }

	            this.form.append('id', this.gallery.id);
	            this.$http.post('api/gallery/upload', this.form, {
	                upload: {
	                    onprogress: function onprogress(e) {
	                        if (e.lengthComputable) {
	                            _this.$set('progress', Math.ceil(e.loaded / e.total * 100));
	                        }
	                    }
	                }
	            }).then(function (res) {
	                this.$notify(this.$trans(this.files.length > 1 ? 'Images uploaded' : 'Image uploaded'));
	                this.reset();
	                this.$set('gallery.images', res.data.images);
	            }).catch(function (err) {
	                this.$notify(this.$trans('Error while uploading images'), 'danger');
	                console.log(err);
	            });
	        },
	        reset: function reset() {
	            document.getElementById("file-input").value = "";
	            this.$set('files', []);
	            this.$set('progress', '');
	        },
	        triggerFileInput: function triggerFileInput() {
	            document.getElementById("file-input").click();
	        }
	    }
	};
	window.Gallery.components['gallery-images'] = module.exports;

/***/ },
/* 19 */
/***/ function(module, exports) {

	module.exports = "\n<div>\n    <h2>{{ 'Image Upload' | trans }}</h2>\n\n    <h3 class=\"uk-h1 uk-text-muted uk-text-center\" v-if=\"!gallery.id\">{{ 'Please save gallery first' | trans }}</h3>\n\n    <div v-else>\n        <!-- upload-field -->\n        <div class=\"file-upload uk-container-center uk-width-large-3-4 uk-margin\">\n            <input id=\"file-input\" type=\"file\" name=\"files\" multiple=\"multiple\" accept=\"image/jpeg,image/png\" @change=\"onFileChange\">\n            <img class=\"uk-align-center uk-margin-top\" width=\"60\" height=\"60\" alt=\"Placeholder Image\" :src=\"$url('app/system/assets/images/placeholder-image.svg')\">\n            <p v-if=\"!files.length\" class=\"uk-text-center\">\n                <a @click.prevent=\"triggerFileInput\">{{ 'Drag images here or select some' | trans }}</a>\n                <span class=\"max-size\">{{ 'max %size%MB per upload' | trans {size:maxSize} }}</span>\n            </p>\n            <div v-else>\n                <p class=\"uk-text-center\">{{ '{1} %count% File selected|]1,Inf[ %count% Files selected' | transChoice files.length {count:files.length} }}</p>\n            </div>\n            <div v-if=\"progress\" class=\"uk-progress uk-width-3-4 uk-align-center\">\n                <div class=\"uk-progress-bar\" :style=\"{width: progress + '%'}\">{{ progress + '%' }}</div>\n            </div>\n        </div>\n\n        <!-- upload-buttons -->\n        <div v-if=\"files.length\" class=\"upload-buttons uk-text-center uk-margin-top\">\n            <button class=\"uk-button uk-button-primary\" @click.prevent=\"upload\">{{ 'Upload' | trans }}</button>\n            <button class=\"uk-button\" @click.prevent=\"reset\">{{ 'Cancel' | trans }}</button>\n        </div>\n\n        <!-- images -->\n        <h3 class=\"uk-h1 uk-text-muted uk-text-center\" v-if=\"!gallery.images\">{{ 'No images found' | trans }}</h3>\n        <div class=\"uk-grid uk-grid-width-1-2 uk-grid-width-medium-1-3 uk-grid-width-large-1-5\" v-else data-uk-grid-margin>\n            <div class=\"uk-text-center\" v-for=\"image in gallery.images\">\n                <img class=\"uk-thumbnail pointer\" :src=\"$url('public/tricle-gallery/thumbnails/tn_' + image.filename)\" @click=\"editImage(image)\"/>\n            </div>\n        </div>\n        <div v-if=\"gallery.images\" class=\"uk-text-center uk-margin-large-top\">\n            <button class=\"uk-button\" @click.prevent=\"rebuildThumbnails\">{{ 'Rebuild thumbnails' | trans }}</button>\n        </div>\n    </div>\n    <div class=\"uk-modal\" v-el:modal>\n        <div class=\"uk-modal-dialog\" v-if=\"img\">\n\n            <div class=\"uk-modal-header uk-margin uk-flex uk-flex-space-between uk-flex-wrap\" data-uk-margin>\n                <h2 class=\"uk-margin-small-bottom\">{{ 'Edit image' | trans }}</h2>\n                <ul class=\"uk-subnav pk-subnav-icon uk-margin-left\">\n                <li><a class=\"pk-icon-delete pk-icon-hover\" title=\"{{ 'Delete image' | trans}}\" data-uk-tooltip=\"{delay: 500}\" @click.prevent=\"deleteImage(img)\" v-confirm=\"'Delete Image?'\"></a></li>\n                </ul>\n            </div>\n\n            <div class=\"uk-form-row\">\n                <img class=\"uk-thumbnail\" :src=\"$url('public/tricle-gallery/' + img.filename)\" />\n            </div>\n\n            <div class=\"uk-form-row\">\n                <label for=\"form-title\" class=\"uk-form-label\">{{ 'Title' | trans }}</label>\n                <div class=\"uk-form-controls\">\n                    <input id=\"form-title\" class=\"uk-width-1-1\" type=\"text\" v-model=\"img.title\">\n                </div>\n            </div>\n\n            <div class=\"uk-modal-footer uk-text-right\">\n                <button class=\"uk-button uk-button-link uk-modal-close\" type=\"button\">{{ 'Cancel' | trans }}</button>\n                <button class=\"uk-button uk-button-link\" @click.prevent=\"saveImage(img)\">{{ 'Update' | trans }}</button>\n            </div>\n\n        </div>\n    </div>\n</div>\n";

/***/ }
/******/ ]);