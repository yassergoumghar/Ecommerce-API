/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/js/controllers/headerController.js":
/*!************************************************!*\
  !*** ./src/js/controllers/headerController.js ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"cartController\": () => /* binding */ cartController,\n/* harmony export */   \"likeController\": () => /* binding */ likeController,\n/* harmony export */   \"searchController\": () => /* binding */ searchController,\n/* harmony export */   \"searchHandler\": () => /* binding */ searchHandler\n/* harmony export */ });\n/* harmony import */ var _utils_Variables__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./../utils/Variables */ \"./src/js/utils/Variables.js\");\n\r\n\r\n//5 Get Variables\r\nconst { checkout, likes, search } = _utils_Variables__WEBPACK_IMPORTED_MODULE_0__.routes;\r\n\r\n//1 Cart Controller\r\nconst cartController = (carts) => {\r\n  //2 Check if cart exists\r\n  if (carts)\r\n    carts.forEach((cart) => cart.addEventListener('click', goToCheckout));\r\n};\r\n\r\n//) Go to Cart handler\r\nconst goToCheckout = (e) => {\r\n  //2 Don't reload\r\n  e.preventDefault();\r\n\r\n  //2 Redirect to Checkout Route\r\n  location.href = checkout;\r\n};\r\n\r\n//1 Like Controller\r\nconst likeController = (likes) => {\r\n  //2 Check if Like exists\r\n  if (likes) likes.forEach((like) => like.addEventListener('click', goToLikes));\r\n};\r\n\r\n//) Go to Likes handler\r\nconst goToLikes = (e) => {\r\n  //2 Don't reload\r\n  e.preventDefault();\r\n\r\n  //2 Redirect to Checkout Route\r\n  location.href = likes;\r\n};\r\n\r\n//1 Search Controller\r\nconst searchController = (searches) => {\r\n  //2 Check if search exists\r\n  if (searches) searches.forEach(searchListener);\r\n};\r\n\r\n//) Go to Search handler\r\nconst searchHandler = (e, input) => {\r\n  //2 Don't reload\r\n  e.preventDefault();\r\n\r\n  //2 Get search string\r\n  const { value } = input;\r\n\r\n  //2 Go to:  GET: '/products/results?search_query=value\r\n  if (value) location.href = `${search}${value}`;\r\n};\r\n\r\n//) Search Listener\r\nconst searchListener = () => {\r\n  //* Get input\r\n  const input = document.getElementById('search-input');\r\n\r\n  //* Add event listener to input\r\n  if (input) {\r\n    input.addEventListener('keypress', function (e) {\r\n      if (e.key === 'Enter') searchHandler(e, input);\r\n    });\r\n  }\r\n};\r\n\n\n//# sourceURL=webpack://template/./src/js/controllers/headerController.js?");

/***/ }),

/***/ "./src/js/controllers/queryController.js":
/*!***********************************************!*\
  !*** ./src/js/controllers/queryController.js ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"queryListener\": () => /* binding */ queryListener\n/* harmony export */ });\n/* harmony import */ var _utils_Variables__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./../utils/Variables */ \"./src/js/utils/Variables.js\");\n\r\n\r\nconst { filterRoute } = _utils_Variables__WEBPACK_IMPORTED_MODULE_0__.paramsMethod;\r\n\r\nconst getFilterLink = (originalLink, filter, type) => {\r\n  //2 Go to:  GET:\r\n  const params = '?';\r\n  const sameFilter = originalLink.includes(filter);\r\n\r\n  let link;\r\n\r\n  //2 Check if the filter is already has been used:\r\n  if (!sameFilter) {\r\n    if (originalLink.includes(type)) {\r\n      //) '/products?search_query=searchString&category=men,women'\r\n      const re = /&/;\r\n      const oldFilter = originalLink.split(`${type}=`)[1].split(re)[0];\r\n      // const newFilter = `${oldFilter},${filter}`;\r\n\r\n      return originalLink.replace(oldFilter, filter);\r\n    } else {\r\n      const filtered = originalLink.includes(params);\r\n\r\n      //) Speacial Case: '/products?'\r\n      const speacialCase = originalLink.split(params)[1] === '';\r\n      if (speacialCase) return `${filterRoute}${params}${type}=${filter}`;\r\n\r\n      //) '/products?search_query=searchString&category=men' or '/products?category=men'\r\n      const reqString = filtered ? '&' : '?';\r\n      link = `${originalLink}${reqString}${type}=${filter}`;\r\n    }\r\n  }\r\n\r\n  return link;\r\n};\r\n\r\nconst queryHandler = (e) => {\r\n  //) Prevent Reload\r\n  e.preventDefault();\r\n\r\n  //) Get clicked query filter\r\n  const { id, baseURI } = e.path[0];\r\n  const type = e.path[0].offsetParent.id;\r\n\r\n  //) Get the filter link\r\n  const link = getFilterLink(baseURI, id, type);\r\n\r\n  //) Change the link dinamicly\r\n  if (link) location.href = link;\r\n};\r\n\r\nconst queryListener = (el) => {\r\n  const [string, element] = el;\r\n  if (element) element.addEventListener('click', queryHandler);\r\n};\r\n\n\n//# sourceURL=webpack://template/./src/js/controllers/queryController.js?");

/***/ }),

/***/ "./src/js/controllers/shopController.js":
/*!**********************************************!*\
  !*** ./src/js/controllers/shopController.js ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"searchController\": () => /* binding */ searchController,\n/* harmony export */   \"queryController\": () => /* binding */ queryController\n/* harmony export */ });\n/* harmony import */ var _utils_Variables__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./../utils/Variables */ \"./src/js/utils/Variables.js\");\n/* harmony import */ var _headerController__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./headerController */ \"./src/js/controllers/headerController.js\");\n/* harmony import */ var _queryController__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./queryController */ \"./src/js/controllers/queryController.js\");\n\r\n\r\n\r\n\r\nconst { searchElements, filter } = _utils_Variables__WEBPACK_IMPORTED_MODULE_0__.elements;\r\n\r\nconst callSearchandler = (e) => {\r\n  e.preventDefault();\r\n\r\n  //2 Get input\r\n  const input = document.getElementById('search__input');\r\n\r\n  (0,_headerController__WEBPACK_IMPORTED_MODULE_1__.searchHandler)(e, input);\r\n};\r\n\r\nconst searchListener = (search) => {\r\n  search.addEventListener('click', callSearchandler);\r\n};\r\n\r\nconst searchController = () => {\r\n  searchElements.forEach((element) => searchListener(element));\r\n};\r\n\r\nconst queryController = () => {\r\n  Object.entries(filter).forEach((el) => (0,_queryController__WEBPACK_IMPORTED_MODULE_2__.queryListener)(el));\r\n};\r\n\n\n//# sourceURL=webpack://template/./src/js/controllers/shopController.js?");

/***/ }),

/***/ "./src/js/index.js":
/*!*************************!*\
  !*** ./src/js/index.js ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _utils_Variables__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils/Variables */ \"./src/js/utils/Variables.js\");\n/* harmony import */ var _controllers_headerController__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./controllers/headerController */ \"./src/js/controllers/headerController.js\");\n/* harmony import */ var _controllers_shopController__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./controllers/shopController */ \"./src/js/controllers/shopController.js\");\n//) Import elements\r\n\r\n\r\n\r\n\r\n\r\n//4 Get Variables\r\nconst { carts, likes, search } = _utils_Variables__WEBPACK_IMPORTED_MODULE_0__.elements;\r\n\r\n//2 Initializer\r\nconst init = () => {\r\n  //* HomePage Controller: '/'\r\n  //2 Call Go to cart controller\r\n  (0,_controllers_headerController__WEBPACK_IMPORTED_MODULE_1__.cartController)(carts);\r\n\r\n  //2 Call Go to Like Controller\r\n  (0,_controllers_headerController__WEBPACK_IMPORTED_MODULE_1__.likeController)(likes);\r\n\r\n  //2 Call Search Controller\r\n  (0,_controllers_headerController__WEBPACK_IMPORTED_MODULE_1__.searchController)(search);\r\n\r\n  //* Shop page: '/shop' Controller\r\n  //2 Call search Controller\r\n  _controllers_shopController__WEBPACK_IMPORTED_MODULE_2__.searchController();\r\n\r\n  //2 Call Query controller\r\n  _controllers_shopController__WEBPACK_IMPORTED_MODULE_2__.queryController();\r\n};\r\n\r\ninit();\r\n\n\n//# sourceURL=webpack://template/./src/js/index.js?");

/***/ }),

/***/ "./src/js/main.js":
/*!************************!*\
  !*** ./src/js/main.js ***!
  \************************/
/***/ (() => {

eval("/*  ---------------------------------------------------\n    Template Name: Male Fashion\n    Description: Male Fashion - ecommerce teplate\n    Author: Colorib\n    Author URI: https://www.colorib.com/\n    Version: 1.0\n    Created: Colorib\n---------------------------------------------------------  */\n\n\n\n(function ($) {\n  /*------------------\n        Preloader\n    --------------------*/\n  $(window).on('load', function () {\n    $('.loader').fadeOut();\n    $('#preloder').delay(200).fadeOut('slow');\n\n    /*------------------\n            Gallery filter\n        --------------------*/\n    $('.filter__controls li').on('click', function () {\n      $('.filter__controls li').removeClass('active');\n      $(this).addClass('active');\n    });\n    if ($('.product__filter').length > 0) {\n      var containerEl = document.querySelector('.product__filter');\n      var mixer = mixitup(containerEl);\n    }\n  });\n\n  /*------------------\n        Background Set\n    --------------------*/\n  $('.set-bg').each(function () {\n    var bg = $(this).data('setbg');\n    $(this).css('background-image', 'url(' + bg + ')');\n  });\n\n  //Search Switch\n  $('.search-switch').on('click', function () {\n    $('.search-model').fadeIn(400);\n  });\n\n  $('.search-close-switch').on('click', function () {\n    $('.search-model').fadeOut(400, function () {\n      $('#search-input').val('');\n    });\n  });\n\n  /*------------------\n\t\tNavigation\n\t--------------------*/\n  $('.mobile-menu').slicknav({\n    prependTo: '#mobile-menu-wrap',\n    allowParentLinks: true,\n  });\n\n  /*------------------\n        Accordin Active\n    --------------------*/\n  $('.collapse').on('shown.bs.collapse', function () {\n    $(this).prev().addClass('active');\n  });\n\n  $('.collapse').on('hidden.bs.collapse', function () {\n    $(this).prev().removeClass('active');\n  });\n\n  //Canvas Menu\n  $('.canvas__open').on('click', function () {\n    $('.offcanvas-menu-wrapper').addClass('active');\n    $('.offcanvas-menu-overlay').addClass('active');\n  });\n\n  $('.offcanvas-menu-overlay').on('click', function () {\n    $('.offcanvas-menu-wrapper').removeClass('active');\n    $('.offcanvas-menu-overlay').removeClass('active');\n  });\n\n  /*-----------------------\n        Hero Slider\n    ------------------------*/\n  $('.hero__slider').owlCarousel({\n    loop: true,\n    margin: 0,\n    items: 1,\n    dots: false,\n    nav: true,\n    navText: [\n      \"<span class='arrow_left'><span/>\",\n      \"<span class='arrow_right'><span/>\",\n    ],\n    animateOut: 'fadeOut',\n    animateIn: 'fadeIn',\n    smartSpeed: 1200,\n    autoHeight: false,\n    autoplay: false,\n  });\n\n  /*--------------------------\n        Select\n    ----------------------------*/\n  $('select').niceSelect();\n\n  /*-------------------\n\t\tRadio Btn\n\t--------------------- */\n  $(\n    '.product__color__select label, .shop__sidebar__size label, .product__details__option__size label'\n  ).on('click', function () {\n    $(\n      '.product__color__select label, .shop__sidebar__size label, .product__details__option__size label'\n    ).removeClass('active');\n    $(this).addClass('active');\n  });\n\n  /*-------------------\n\t\tScroll\n\t--------------------- */\n  $('.nice-scroll').niceScroll({\n    cursorcolor: '#0d0d0d',\n    cursorwidth: '5px',\n    background: '#e5e5e5',\n    cursorborder: '',\n    autohidemode: true,\n    horizrailenabled: false,\n  });\n\n  /*------------------\n        CountDown\n    --------------------*/\n  // For demo preview start\n  var today = new Date();\n  var dd = String(today.getDate()).padStart(2, '0');\n  var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!\n  var yyyy = today.getFullYear();\n\n  if (mm == 12) {\n    mm = '01';\n    yyyy = yyyy + 1;\n  } else {\n    mm = parseInt(mm) + 1;\n    mm = String(mm).padStart(2, '0');\n  }\n  var timerdate = mm + '/' + dd + '/' + yyyy;\n  // For demo preview end\n\n  // Uncomment below and use your date //\n\n  /* var timerdate = \"2020/12/30\" */\n\n  $('#countdown').countdown(timerdate, function (event) {\n    $(this).html(\n      event.strftime(\n        \"<div class='cd-item'><span>%D</span> <p>Days</p> </div>\" +\n          \"<div class='cd-item'><span>%H</span> <p>Hours</p> </div>\" +\n          \"<div class='cd-item'><span>%M</span> <p>Minutes</p> </div>\" +\n          \"<div class='cd-item'><span>%S</span> <p>Seconds</p> </div>\"\n      )\n    );\n  });\n\n  /*------------------\n\t\tMagnific\n\t--------------------*/\n  $('.video-popup').magnificPopup({\n    type: 'iframe',\n  });\n\n  /*-------------------\n\t\tQuantity change\n\t--------------------- */\n  var proQty = $('.pro-qty');\n  proQty.prepend('<span class=\"fa fa-angle-up dec qtybtn\"></span>');\n  proQty.append('<span class=\"fa fa-angle-down inc qtybtn\"></span>');\n  proQty.on('click', '.qtybtn', function () {\n    var $button = $(this);\n    var oldValue = $button.parent().find('input').val();\n    if ($button.hasClass('inc')) {\n      var newVal = parseFloat(oldValue) + 1;\n    } else {\n      // Don't allow decrementing below zero\n      if (oldValue > 0) {\n        var newVal = parseFloat(oldValue) - 1;\n      } else {\n        newVal = 0;\n      }\n    }\n    $button.parent().find('input').val(newVal);\n  });\n\n  var proQty = $('.pro-qty-2');\n  proQty.prepend('<span class=\"fa fa-angle-left dec qtybtn\"></span>');\n  proQty.append('<span class=\"fa fa-angle-right inc qtybtn\"></span>');\n  proQty.on('click', '.qtybtn', function () {\n    var $button = $(this);\n    var oldValue = $button.parent().find('input').val();\n    if ($button.hasClass('inc')) {\n      var newVal = parseFloat(oldValue) + 1;\n    } else {\n      // Don't allow decrementing below zero\n      if (oldValue > 0) {\n        var newVal = parseFloat(oldValue) - 1;\n      } else {\n        newVal = 0;\n      }\n    }\n    $button.parent().find('input').val(newVal);\n  });\n\n  /*------------------\n        Achieve Counter\n    --------------------*/\n  $('.cn_num').each(function () {\n    $(this)\n      .prop('Counter', 0)\n      .animate(\n        {\n          Counter: $(this).text(),\n        },\n        {\n          duration: 4000,\n          easing: 'swing',\n          step: function (now) {\n            $(this).text(Math.ceil(now));\n          },\n        }\n      );\n  });\n})(jQuery);\n\n\n//# sourceURL=webpack://template/./src/js/main.js?");

/***/ }),

/***/ "./src/js/utils/Variables.js":
/*!***********************************!*\
  !*** ./src/js/utils/Variables.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"elements\": () => /* binding */ elements,\n/* harmony export */   \"routes\": () => /* binding */ routes,\n/* harmony export */   \"paramsMethod\": () => /* binding */ paramsMethod\n/* harmony export */ });\nconst els = [\r\n  'men',\r\n  'women',\r\n  'bags',\r\n  'clothing',\r\n  'accessories',\r\n  'kids',\r\n  'louisVuitton',\r\n  'chanel',\r\n  'hermes',\r\n  'gucci',\r\n  'black',\r\n  'blue',\r\n  'yellow',\r\n  'grey',\r\n  'brown',\r\n  'pink',\r\n  'purple',\r\n  'red',\r\n  'white',\r\n  'bags',\r\n  'shoes',\r\n  'clothing',\r\n  'accessories',\r\n];\r\n\r\nconst elements = {\r\n  carts: document.querySelectorAll('.cart'),\r\n  likes: document.querySelectorAll('.like'),\r\n  search: document.querySelectorAll('.search-switch'),\r\n  searchElements: document.querySelectorAll('.search'),\r\n  filter: {},\r\n};\r\n\r\nels.forEach((key) => {\r\n  elements.filter[key] = document.getElementById(key);\r\n});\r\n\r\nconst routes = {\r\n  checkout: '/checkout',\r\n  likes: '/likes',\r\n  search: '/products?search_query=',\r\n};\r\n\r\nconst paramsMethod = {\r\n  filterRoute: '/products',\r\n};\r\n\n\n//# sourceURL=webpack://template/./src/js/utils/Variables.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		if(__webpack_module_cache__[moduleId]) {
/******/ 			return __webpack_module_cache__[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => Object.prototype.hasOwnProperty.call(obj, prop)
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	// startup
/******/ 	// Load entry module
/******/ 	__webpack_require__("./src/js/index.js");
/******/ 	// This entry module used 'exports' so it can't be inlined
/******/ 	__webpack_require__("./src/js/main.js");
/******/ })()
;