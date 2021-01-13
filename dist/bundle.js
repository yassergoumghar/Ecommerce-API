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

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"getFilterLink\": () => /* binding */ getFilterLink,\n/* harmony export */   \"queryListener\": () => /* binding */ queryListener\n/* harmony export */ });\n/* harmony import */ var _utils_Variables__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./../utils/Variables */ \"./src/js/utils/Variables.js\");\n\r\n\r\nconst { filterRoute } = _utils_Variables__WEBPACK_IMPORTED_MODULE_0__.paramsMethod;\r\n\r\nconst getOldFilter = (originalLink, type) => {\r\n  const re = /&/;\r\n\r\n  return originalLink.split(`${type}=`)[1].split(re)[0];\r\n};\r\n\r\nconst getFilterLink = (originalLink, filter, type) => {\r\n  //2 Initialize Paginate\r\n  const paginate = 'page';\r\n  const paginateTarget = type === paginate;\r\n\r\n  //1 input: /product => output: product?type=filter\r\n  const baseCase = originalLink === filterRoute;\r\n\r\n  //1 Or a speacial case: input: /product? => output: product?type=filter\r\n  const speacialCase = originalLink === `${filterRoute}?`;\r\n\r\n  if (baseCase || speacialCase) return `${filterRoute}?${type}=${filter}`;\r\n\r\n  //2 Check if the link includes 'page', if true, remove it:\r\n  originalLink = originalLink.replace(/(\\?|&)page=[-0-9]+/g, '');\r\n  const queryString = originalLink.includes('?') ? '&' : '?';\r\n\r\n  //6 Check if not Paginate to treat if differently\r\n  const isPaginate = originalLink.includes(paginate);\r\n\r\n  if (!isPaginate) {\r\n    const sameFilter = originalLink.includes(type);\r\n    if (sameFilter) {\r\n      //4 input: /product?type_1=filter_1 ( not pages ) => output: /product?type_1=filter_2\r\n      const oldFilter = getOldFilter(originalLink, type);\r\n\r\n      return originalLink.replace(oldFilter, filter);\r\n    } else {\r\n      //2 input: /product?type_1=filter_1 ( not pages ) => output: /product?type_1=filter_1&type=filter\r\n      return `${originalLink}${queryString}${type}=${filter}`;\r\n    }\r\n  }\r\n\r\n  //) Is paginate: Check if the target filter is paginate: if true, move to next page, if the target is\r\n  //) categories, color, brand... remove the paginate filter\r\n  if (paginateTarget) {\r\n    //4 input: /product?page=n  => output: /product?page=filter\r\n    const oldFilter = getOldFilter(originalLink, type);\r\n\r\n    return originalLink.replace(oldFilter, filter);\r\n  } else {\r\n    //4 input: /product?categories=men&brand=gucci&page=3 => output: /product?categories=men&brand=filter\r\n    //4 Remove &page=3, edit new filter\r\n    //* /products?brand=louisVuitton&\r\n    //* /products?&brand=louisVuitton\r\n\r\n    const sameFilter = originalLink.includes(type);\r\n    if (sameFilter) {\r\n      const oldFilter = getOldFilter(originalLink, type);\r\n      console.log('Same');\r\n\r\n      return originalLink.replace(oldFilter, filter);\r\n    }\r\n\r\n    return `${originalLink}${queryString}${type}=${filter}`;\r\n  }\r\n};\r\n\r\nconst queryHandler = (e) => {\r\n  //) Prevent Reload\r\n  e.preventDefault();\r\n\r\n  //) Get clicked query filter\r\n  const { id, baseURI } = e.path[0];\r\n  const type = e.path[0].offsetParent.id;\r\n\r\n  //) http://localhost:3000/products => products\r\n  const originalLink = `/${baseURI.split('/')[3]}`;\r\n\r\n  //) Get the filter link\r\n  const link = getFilterLink(originalLink, id, type);\r\n\r\n  //) Change the link dinamicly\r\n  if (link) location.href = link;\r\n};\r\n\r\nconst queryListener = (el) => {\r\n  const [string, element] = el;\r\n  if (element) element.addEventListener('click', queryHandler);\r\n};\r\n\n\n//# sourceURL=webpack://template/./src/js/controllers/queryController.js?");

/***/ }),

/***/ "./src/js/controllers/shopController.js":
/*!**********************************************!*\
  !*** ./src/js/controllers/shopController.js ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"searchController\": () => /* binding */ searchController,\n/* harmony export */   \"queryController\": () => /* binding */ queryController,\n/* harmony export */   \"paginateController\": () => /* binding */ paginateController\n/* harmony export */ });\n/* harmony import */ var _utils_Variables__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./../utils/Variables */ \"./src/js/utils/Variables.js\");\n/* harmony import */ var _headerController__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./headerController */ \"./src/js/controllers/headerController.js\");\n/* harmony import */ var _queryController__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./queryController */ \"./src/js/controllers/queryController.js\");\n/* harmony import */ var _view_paginationView__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./../view/paginationView */ \"./src/js/view/paginationView.js\");\n\r\n\r\n\r\n\r\n\r\nconst {\r\n  searchElements,\r\n  filter,\r\n  paginateElement,\r\n  products,\r\n  productPagination,\r\n  productsHidden,\r\n  results,\r\n} = _utils_Variables__WEBPACK_IMPORTED_MODULE_0__.elements;\r\nconst { paginationLimit } = _utils_Variables__WEBPACK_IMPORTED_MODULE_0__.preferences;\r\nconst { noProduct, renderAvailablePages } = _view_paginationView__WEBPACK_IMPORTED_MODULE_3__;\r\nconst { productNotFound } = _utils_Variables__WEBPACK_IMPORTED_MODULE_0__.messages;\r\nconst { hide } = _utils_Variables__WEBPACK_IMPORTED_MODULE_0__.classnames;\r\n\r\nconst callSearchandler = (e) => {\r\n  e.preventDefault();\r\n\r\n  //2 Get input\r\n  const input = document.getElementById('search__input');\r\n\r\n  (0,_headerController__WEBPACK_IMPORTED_MODULE_1__.searchHandler)(e, input);\r\n};\r\n\r\nconst searchListener = (search) => {\r\n  search.addEventListener('click', callSearchandler);\r\n};\r\n\r\nconst paginateHandler = (e) => {\r\n  e.preventDefault();\r\n\r\n  //* Get the wanted paginate\r\n  const { innerText, baseURI } = e.path[0];\r\n  const type = 'page';\r\n\r\n  //! Link is undefined for pages > 2\r\n\r\n  //* Get link\r\n  //) http://localhost:3000/products => products\r\n  const originalLink = `/${baseURI.split('/')[3]}`;\r\n  const link = (0,_queryController__WEBPACK_IMPORTED_MODULE_2__.getFilterLink)(originalLink, innerText, type);\r\n\r\n  //* Go to Link\r\n  if (link) location.href = link;\r\n};\r\n\r\nconst paginateListener = (paginate) => {\r\n  paginate.addEventListener('click', paginateHandler);\r\n};\r\n\r\nconst renderResultsNumber = (start, end, total, result) => {\r\n  //* Get the result element\r\n\r\n  //* Check if end is less than total, if false put: end = total\r\n  end = end > total ? total : end;\r\n\r\n  //* Render The element\r\n  result.innerText = `Showing ${start}– ${end} of ${total} results`;\r\n};\r\n\r\nconst renderProducts = (page, limit, total) => {\r\n  //* Get the current page, limit, total\r\n  //* Show the intervale: ] limit, (limit * 2) or total **IF TOTAL IS LESS THAN LIMIT * 2  ]\r\n\r\n  const start = (page - 1) * limit + 1;\r\n  const end = limit * page;\r\n\r\n  //) Check if there are enough products to show:\r\n\r\n  if (start > total) return noProduct(products[0], productNotFound);\r\n\r\n  //5 Write: Showing 1– 12 of 186 results\r\n  renderResultsNumber(start, end, total, results[0]);\r\n\r\n  //5 Render Only needed Products\r\n  for (let n = start - 1; n < end; n++) {\r\n    const product = productsHidden[n];\r\n    if (product) product.classList.remove(hide);\r\n  }\r\n};\r\n\r\nconst paginateNumber = (paginateElement, limit) => {\r\n  //* Get Total Number\r\n  const number = paginateElement[0].innerText;\r\n  //* (5) [\"Length:\", \"7\", \"And\", \"Page:\", \"2\"] => Output: length = 7, page = 2, the ',' is to skip variable: Array Destructuring\r\n  let [, length, , , page] = number.split(' ');\r\n\r\n  //* Check if page is specified, if not return 1\r\n  page = page !== '' ? parseInt(page) : 1;\r\n\r\n  //) Check if There is no length: If true: Render No Product Found.\r\n  const found = length > 0;\r\n  if (!found) return noProduct(products[0], productNotFound);\r\n\r\n  //4 Render Products according to the page request: '/products?page=2' render from 12 to last 14\r\n  renderProducts(page, limit, length);\r\n\r\n  //) Check if There is no page specified (1 by default) And Length < Limit: If true: Don't render Pagination\r\n  if (!page && length <= limit) return;\r\n\r\n  //) Check if the available pages are less than 5, if true: render less than 5 pages availabe\r\n  const availablePages = Math.ceil(length / limit);\r\n  return renderAvailablePages(productPagination[0], availablePages, page);\r\n};\r\n\r\nconst searchController = () => {\r\n  searchElements.forEach((element) => searchListener(element));\r\n};\r\n\r\nconst queryController = () => {\r\n  Object.entries(filter).forEach((el) => (0,_queryController__WEBPACK_IMPORTED_MODULE_2__.queryListener)(el));\r\n};\r\n\r\nconst paginateController = () => {\r\n  //* Render Paginate Numbers and pass the Paginate element and pagination Limit\r\n  paginateNumber(paginateElement, paginationLimit);\r\n\r\n  //* Listen for Paginate Click\r\n  const paginates = document.querySelectorAll('.paginate');\r\n  paginates.forEach((paginate) => paginateListener(paginate));\r\n};\r\n\n\n//# sourceURL=webpack://template/./src/js/controllers/shopController.js?");

/***/ }),

/***/ "./src/js/index.js":
/*!*************************!*\
  !*** ./src/js/index.js ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _utils_Variables__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils/Variables */ \"./src/js/utils/Variables.js\");\n/* harmony import */ var _controllers_headerController__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./controllers/headerController */ \"./src/js/controllers/headerController.js\");\n/* harmony import */ var _controllers_shopController__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./controllers/shopController */ \"./src/js/controllers/shopController.js\");\n//) Import elements\r\n\r\n\r\n\r\n\r\n\r\n//4 Get Variables\r\nconst { carts, likes, search } = _utils_Variables__WEBPACK_IMPORTED_MODULE_0__.elements;\r\n\r\n//2 Initializer\r\nconst init = () => {\r\n  //* HomePage Controller: '/'\r\n  //2 Call Go to cart controller\r\n  (0,_controllers_headerController__WEBPACK_IMPORTED_MODULE_1__.cartController)(carts);\r\n\r\n  //2 Call Go to Like Controller\r\n  (0,_controllers_headerController__WEBPACK_IMPORTED_MODULE_1__.likeController)(likes);\r\n\r\n  //2 Call Search Controller\r\n  (0,_controllers_headerController__WEBPACK_IMPORTED_MODULE_1__.searchController)(search);\r\n\r\n  //* Shop page: '/shop' Controller\r\n  //2 Call search Controller\r\n  _controllers_shopController__WEBPACK_IMPORTED_MODULE_2__.searchController();\r\n\r\n  //2 Call Query controller\r\n  _controllers_shopController__WEBPACK_IMPORTED_MODULE_2__.queryController();\r\n\r\n  //2 Call Paginate Controller\r\n  _controllers_shopController__WEBPACK_IMPORTED_MODULE_2__.paginateController();\r\n};\r\n\r\ninit();\r\n\n\n//# sourceURL=webpack://template/./src/js/index.js?");

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

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"elements\": () => /* binding */ elements,\n/* harmony export */   \"preferences\": () => /* binding */ preferences,\n/* harmony export */   \"messages\": () => /* binding */ messages,\n/* harmony export */   \"classnames\": () => /* binding */ classnames,\n/* harmony export */   \"routes\": () => /* binding */ routes,\n/* harmony export */   \"paramsMethod\": () => /* binding */ paramsMethod\n/* harmony export */ });\nconst els = [\r\n  'men',\r\n  'women',\r\n  'bags',\r\n  'clothing',\r\n  'accessories',\r\n  'kids',\r\n  'louisVuitton',\r\n  'chanel',\r\n  'hermes',\r\n  'gucci',\r\n  'black',\r\n  'blue',\r\n  'yellow',\r\n  'grey',\r\n  'brown',\r\n  'pink',\r\n  'purple',\r\n  'red',\r\n  'white',\r\n  'bags',\r\n  'shoes',\r\n  'clothing',\r\n  'accessories',\r\n];\r\n\r\nconst elements = {\r\n  carts: document.querySelectorAll('.cart'),\r\n  likes: document.querySelectorAll('.like'),\r\n  search: document.querySelectorAll('.search-switch'),\r\n  searchElements: document.querySelectorAll('.search'),\r\n  paginateElement: document.querySelectorAll('.paginate__number'),\r\n  products: document.querySelectorAll('.products__render'),\r\n  productPagination: document.querySelectorAll('.product__pagination'),\r\n  productsHidden: document.querySelectorAll('.product'),\r\n  results: document.querySelectorAll('.resultsNumber'),\r\n  filter: {},\r\n};\r\n\r\nconst preferences = {\r\n  paginationLimit: 12,\r\n};\r\n\r\nconst messages = {\r\n  productNotFound: 'Sorry No Product was found !',\r\n};\r\n\r\nconst classnames = {\r\n  hide: 'hide',\r\n};\r\n\r\nels.forEach((key) => {\r\n  elements.filter[key] = document.getElementById(key);\r\n});\r\n\r\nconst routes = {\r\n  checkout: '/checkout',\r\n  likes: '/likes',\r\n  search: '/products?search_query=',\r\n};\r\n\r\nconst paramsMethod = {\r\n  filterRoute: '/products',\r\n};\r\n\n\n//# sourceURL=webpack://template/./src/js/utils/Variables.js?");

/***/ }),

/***/ "./src/js/view/paginationView.js":
/*!***************************************!*\
  !*** ./src/js/view/paginationView.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"noProduct\": () => /* binding */ noProduct,\n/* harmony export */   \"renderAvailablePages\": () => /* binding */ renderAvailablePages\n/* harmony export */ });\n//* Render There was no product found\r\nconst noProduct = (element, message) => {\r\n  const markup = `\r\n    \r\n    <h1> ${message} <h1>\r\n    \r\n    `;\r\n\r\n  element.insertAdjacentHTML('afterbegin', markup);\r\n};\r\n\r\n//* Render available Pages buttons\r\nconst renderAvailablePages = (element, number, active) => {\r\n  //2 Initialize how many times I should render the paginate element\r\n  let times = [];\r\n  times.length = number;\r\n\r\n  let str = '';\r\n\r\n  for (let i = 1; i <= number; i++) {\r\n    str = str.replace(\r\n      str,\r\n      `${str} <a href=\"#\" class=\"paginate ${\r\n        i == active ? 'active' : ''\r\n      }\">${i}</a>`\r\n    );\r\n  }\r\n\r\n  let markup = `\r\n  <div class=\"row\">\r\n      <div class=\"col-lg-12\">\r\n          <div class=\"product__pagination\">\r\n                TEMPLATE\r\n          </div>\r\n      </div>\r\n  </div>\r\n  `;\r\n\r\n  markup = markup.replace('TEMPLATE', str);\r\n\r\n  element.insertAdjacentHTML('afterbegin', markup);\r\n};\r\n\n\n//# sourceURL=webpack://template/./src/js/view/paginationView.js?");

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