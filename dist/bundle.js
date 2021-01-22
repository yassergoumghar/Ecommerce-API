/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/axios/index.js":
/*!*************************************!*\
  !*** ./node_modules/axios/index.js ***!
  \*************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("module.exports = __webpack_require__(/*! ./lib/axios */ \"./node_modules/axios/lib/axios.js\");\n\n//# sourceURL=webpack://template/./node_modules/axios/index.js?");

/***/ }),

/***/ "./node_modules/axios/lib/adapters/xhr.js":
/*!************************************************!*\
  !*** ./node_modules/axios/lib/adapters/xhr.js ***!
  \************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("\n\nvar utils = __webpack_require__(/*! ./../utils */ \"./node_modules/axios/lib/utils.js\");\nvar settle = __webpack_require__(/*! ./../core/settle */ \"./node_modules/axios/lib/core/settle.js\");\nvar cookies = __webpack_require__(/*! ./../helpers/cookies */ \"./node_modules/axios/lib/helpers/cookies.js\");\nvar buildURL = __webpack_require__(/*! ./../helpers/buildURL */ \"./node_modules/axios/lib/helpers/buildURL.js\");\nvar buildFullPath = __webpack_require__(/*! ../core/buildFullPath */ \"./node_modules/axios/lib/core/buildFullPath.js\");\nvar parseHeaders = __webpack_require__(/*! ./../helpers/parseHeaders */ \"./node_modules/axios/lib/helpers/parseHeaders.js\");\nvar isURLSameOrigin = __webpack_require__(/*! ./../helpers/isURLSameOrigin */ \"./node_modules/axios/lib/helpers/isURLSameOrigin.js\");\nvar createError = __webpack_require__(/*! ../core/createError */ \"./node_modules/axios/lib/core/createError.js\");\n\nmodule.exports = function xhrAdapter(config) {\n  return new Promise(function dispatchXhrRequest(resolve, reject) {\n    var requestData = config.data;\n    var requestHeaders = config.headers;\n\n    if (utils.isFormData(requestData)) {\n      delete requestHeaders['Content-Type']; // Let the browser set it\n    }\n\n    var request = new XMLHttpRequest();\n\n    // HTTP basic authentication\n    if (config.auth) {\n      var username = config.auth.username || '';\n      var password = config.auth.password ? unescape(encodeURIComponent(config.auth.password)) : '';\n      requestHeaders.Authorization = 'Basic ' + btoa(username + ':' + password);\n    }\n\n    var fullPath = buildFullPath(config.baseURL, config.url);\n    request.open(config.method.toUpperCase(), buildURL(fullPath, config.params, config.paramsSerializer), true);\n\n    // Set the request timeout in MS\n    request.timeout = config.timeout;\n\n    // Listen for ready state\n    request.onreadystatechange = function handleLoad() {\n      if (!request || request.readyState !== 4) {\n        return;\n      }\n\n      // The request errored out and we didn't get a response, this will be\n      // handled by onerror instead\n      // With one exception: request that using file: protocol, most browsers\n      // will return status as 0 even though it's a successful request\n      if (request.status === 0 && !(request.responseURL && request.responseURL.indexOf('file:') === 0)) {\n        return;\n      }\n\n      // Prepare the response\n      var responseHeaders = 'getAllResponseHeaders' in request ? parseHeaders(request.getAllResponseHeaders()) : null;\n      var responseData = !config.responseType || config.responseType === 'text' ? request.responseText : request.response;\n      var response = {\n        data: responseData,\n        status: request.status,\n        statusText: request.statusText,\n        headers: responseHeaders,\n        config: config,\n        request: request\n      };\n\n      settle(resolve, reject, response);\n\n      // Clean up request\n      request = null;\n    };\n\n    // Handle browser request cancellation (as opposed to a manual cancellation)\n    request.onabort = function handleAbort() {\n      if (!request) {\n        return;\n      }\n\n      reject(createError('Request aborted', config, 'ECONNABORTED', request));\n\n      // Clean up request\n      request = null;\n    };\n\n    // Handle low level network errors\n    request.onerror = function handleError() {\n      // Real errors are hidden from us by the browser\n      // onerror should only fire if it's a network error\n      reject(createError('Network Error', config, null, request));\n\n      // Clean up request\n      request = null;\n    };\n\n    // Handle timeout\n    request.ontimeout = function handleTimeout() {\n      var timeoutErrorMessage = 'timeout of ' + config.timeout + 'ms exceeded';\n      if (config.timeoutErrorMessage) {\n        timeoutErrorMessage = config.timeoutErrorMessage;\n      }\n      reject(createError(timeoutErrorMessage, config, 'ECONNABORTED',\n        request));\n\n      // Clean up request\n      request = null;\n    };\n\n    // Add xsrf header\n    // This is only done if running in a standard browser environment.\n    // Specifically not if we're in a web worker, or react-native.\n    if (utils.isStandardBrowserEnv()) {\n      // Add xsrf header\n      var xsrfValue = (config.withCredentials || isURLSameOrigin(fullPath)) && config.xsrfCookieName ?\n        cookies.read(config.xsrfCookieName) :\n        undefined;\n\n      if (xsrfValue) {\n        requestHeaders[config.xsrfHeaderName] = xsrfValue;\n      }\n    }\n\n    // Add headers to the request\n    if ('setRequestHeader' in request) {\n      utils.forEach(requestHeaders, function setRequestHeader(val, key) {\n        if (typeof requestData === 'undefined' && key.toLowerCase() === 'content-type') {\n          // Remove Content-Type if data is undefined\n          delete requestHeaders[key];\n        } else {\n          // Otherwise add header to the request\n          request.setRequestHeader(key, val);\n        }\n      });\n    }\n\n    // Add withCredentials to request if needed\n    if (!utils.isUndefined(config.withCredentials)) {\n      request.withCredentials = !!config.withCredentials;\n    }\n\n    // Add responseType to request if needed\n    if (config.responseType) {\n      try {\n        request.responseType = config.responseType;\n      } catch (e) {\n        // Expected DOMException thrown by browsers not compatible XMLHttpRequest Level 2.\n        // But, this can be suppressed for 'json' type as it can be parsed by default 'transformResponse' function.\n        if (config.responseType !== 'json') {\n          throw e;\n        }\n      }\n    }\n\n    // Handle progress if needed\n    if (typeof config.onDownloadProgress === 'function') {\n      request.addEventListener('progress', config.onDownloadProgress);\n    }\n\n    // Not all browsers support upload events\n    if (typeof config.onUploadProgress === 'function' && request.upload) {\n      request.upload.addEventListener('progress', config.onUploadProgress);\n    }\n\n    if (config.cancelToken) {\n      // Handle cancellation\n      config.cancelToken.promise.then(function onCanceled(cancel) {\n        if (!request) {\n          return;\n        }\n\n        request.abort();\n        reject(cancel);\n        // Clean up request\n        request = null;\n      });\n    }\n\n    if (!requestData) {\n      requestData = null;\n    }\n\n    // Send the request\n    request.send(requestData);\n  });\n};\n\n\n//# sourceURL=webpack://template/./node_modules/axios/lib/adapters/xhr.js?");

/***/ }),

/***/ "./node_modules/axios/lib/axios.js":
/*!*****************************************!*\
  !*** ./node_modules/axios/lib/axios.js ***!
  \*****************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("\n\nvar utils = __webpack_require__(/*! ./utils */ \"./node_modules/axios/lib/utils.js\");\nvar bind = __webpack_require__(/*! ./helpers/bind */ \"./node_modules/axios/lib/helpers/bind.js\");\nvar Axios = __webpack_require__(/*! ./core/Axios */ \"./node_modules/axios/lib/core/Axios.js\");\nvar mergeConfig = __webpack_require__(/*! ./core/mergeConfig */ \"./node_modules/axios/lib/core/mergeConfig.js\");\nvar defaults = __webpack_require__(/*! ./defaults */ \"./node_modules/axios/lib/defaults.js\");\n\n/**\n * Create an instance of Axios\n *\n * @param {Object} defaultConfig The default config for the instance\n * @return {Axios} A new instance of Axios\n */\nfunction createInstance(defaultConfig) {\n  var context = new Axios(defaultConfig);\n  var instance = bind(Axios.prototype.request, context);\n\n  // Copy axios.prototype to instance\n  utils.extend(instance, Axios.prototype, context);\n\n  // Copy context to instance\n  utils.extend(instance, context);\n\n  return instance;\n}\n\n// Create the default instance to be exported\nvar axios = createInstance(defaults);\n\n// Expose Axios class to allow class inheritance\naxios.Axios = Axios;\n\n// Factory for creating new instances\naxios.create = function create(instanceConfig) {\n  return createInstance(mergeConfig(axios.defaults, instanceConfig));\n};\n\n// Expose Cancel & CancelToken\naxios.Cancel = __webpack_require__(/*! ./cancel/Cancel */ \"./node_modules/axios/lib/cancel/Cancel.js\");\naxios.CancelToken = __webpack_require__(/*! ./cancel/CancelToken */ \"./node_modules/axios/lib/cancel/CancelToken.js\");\naxios.isCancel = __webpack_require__(/*! ./cancel/isCancel */ \"./node_modules/axios/lib/cancel/isCancel.js\");\n\n// Expose all/spread\naxios.all = function all(promises) {\n  return Promise.all(promises);\n};\naxios.spread = __webpack_require__(/*! ./helpers/spread */ \"./node_modules/axios/lib/helpers/spread.js\");\n\n// Expose isAxiosError\naxios.isAxiosError = __webpack_require__(/*! ./helpers/isAxiosError */ \"./node_modules/axios/lib/helpers/isAxiosError.js\");\n\nmodule.exports = axios;\n\n// Allow use of default import syntax in TypeScript\nmodule.exports.default = axios;\n\n\n//# sourceURL=webpack://template/./node_modules/axios/lib/axios.js?");

/***/ }),

/***/ "./node_modules/axios/lib/cancel/Cancel.js":
/*!*************************************************!*\
  !*** ./node_modules/axios/lib/cancel/Cancel.js ***!
  \*************************************************/
/***/ ((module) => {

"use strict";
eval("\n\n/**\n * A `Cancel` is an object that is thrown when an operation is canceled.\n *\n * @class\n * @param {string=} message The message.\n */\nfunction Cancel(message) {\n  this.message = message;\n}\n\nCancel.prototype.toString = function toString() {\n  return 'Cancel' + (this.message ? ': ' + this.message : '');\n};\n\nCancel.prototype.__CANCEL__ = true;\n\nmodule.exports = Cancel;\n\n\n//# sourceURL=webpack://template/./node_modules/axios/lib/cancel/Cancel.js?");

/***/ }),

/***/ "./node_modules/axios/lib/cancel/CancelToken.js":
/*!******************************************************!*\
  !*** ./node_modules/axios/lib/cancel/CancelToken.js ***!
  \******************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("\n\nvar Cancel = __webpack_require__(/*! ./Cancel */ \"./node_modules/axios/lib/cancel/Cancel.js\");\n\n/**\n * A `CancelToken` is an object that can be used to request cancellation of an operation.\n *\n * @class\n * @param {Function} executor The executor function.\n */\nfunction CancelToken(executor) {\n  if (typeof executor !== 'function') {\n    throw new TypeError('executor must be a function.');\n  }\n\n  var resolvePromise;\n  this.promise = new Promise(function promiseExecutor(resolve) {\n    resolvePromise = resolve;\n  });\n\n  var token = this;\n  executor(function cancel(message) {\n    if (token.reason) {\n      // Cancellation has already been requested\n      return;\n    }\n\n    token.reason = new Cancel(message);\n    resolvePromise(token.reason);\n  });\n}\n\n/**\n * Throws a `Cancel` if cancellation has been requested.\n */\nCancelToken.prototype.throwIfRequested = function throwIfRequested() {\n  if (this.reason) {\n    throw this.reason;\n  }\n};\n\n/**\n * Returns an object that contains a new `CancelToken` and a function that, when called,\n * cancels the `CancelToken`.\n */\nCancelToken.source = function source() {\n  var cancel;\n  var token = new CancelToken(function executor(c) {\n    cancel = c;\n  });\n  return {\n    token: token,\n    cancel: cancel\n  };\n};\n\nmodule.exports = CancelToken;\n\n\n//# sourceURL=webpack://template/./node_modules/axios/lib/cancel/CancelToken.js?");

/***/ }),

/***/ "./node_modules/axios/lib/cancel/isCancel.js":
/*!***************************************************!*\
  !*** ./node_modules/axios/lib/cancel/isCancel.js ***!
  \***************************************************/
/***/ ((module) => {

"use strict";
eval("\n\nmodule.exports = function isCancel(value) {\n  return !!(value && value.__CANCEL__);\n};\n\n\n//# sourceURL=webpack://template/./node_modules/axios/lib/cancel/isCancel.js?");

/***/ }),

/***/ "./node_modules/axios/lib/core/Axios.js":
/*!**********************************************!*\
  !*** ./node_modules/axios/lib/core/Axios.js ***!
  \**********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("\n\nvar utils = __webpack_require__(/*! ./../utils */ \"./node_modules/axios/lib/utils.js\");\nvar buildURL = __webpack_require__(/*! ../helpers/buildURL */ \"./node_modules/axios/lib/helpers/buildURL.js\");\nvar InterceptorManager = __webpack_require__(/*! ./InterceptorManager */ \"./node_modules/axios/lib/core/InterceptorManager.js\");\nvar dispatchRequest = __webpack_require__(/*! ./dispatchRequest */ \"./node_modules/axios/lib/core/dispatchRequest.js\");\nvar mergeConfig = __webpack_require__(/*! ./mergeConfig */ \"./node_modules/axios/lib/core/mergeConfig.js\");\n\n/**\n * Create a new instance of Axios\n *\n * @param {Object} instanceConfig The default config for the instance\n */\nfunction Axios(instanceConfig) {\n  this.defaults = instanceConfig;\n  this.interceptors = {\n    request: new InterceptorManager(),\n    response: new InterceptorManager()\n  };\n}\n\n/**\n * Dispatch a request\n *\n * @param {Object} config The config specific for this request (merged with this.defaults)\n */\nAxios.prototype.request = function request(config) {\n  /*eslint no-param-reassign:0*/\n  // Allow for axios('example/url'[, config]) a la fetch API\n  if (typeof config === 'string') {\n    config = arguments[1] || {};\n    config.url = arguments[0];\n  } else {\n    config = config || {};\n  }\n\n  config = mergeConfig(this.defaults, config);\n\n  // Set config.method\n  if (config.method) {\n    config.method = config.method.toLowerCase();\n  } else if (this.defaults.method) {\n    config.method = this.defaults.method.toLowerCase();\n  } else {\n    config.method = 'get';\n  }\n\n  // Hook up interceptors middleware\n  var chain = [dispatchRequest, undefined];\n  var promise = Promise.resolve(config);\n\n  this.interceptors.request.forEach(function unshiftRequestInterceptors(interceptor) {\n    chain.unshift(interceptor.fulfilled, interceptor.rejected);\n  });\n\n  this.interceptors.response.forEach(function pushResponseInterceptors(interceptor) {\n    chain.push(interceptor.fulfilled, interceptor.rejected);\n  });\n\n  while (chain.length) {\n    promise = promise.then(chain.shift(), chain.shift());\n  }\n\n  return promise;\n};\n\nAxios.prototype.getUri = function getUri(config) {\n  config = mergeConfig(this.defaults, config);\n  return buildURL(config.url, config.params, config.paramsSerializer).replace(/^\\?/, '');\n};\n\n// Provide aliases for supported request methods\nutils.forEach(['delete', 'get', 'head', 'options'], function forEachMethodNoData(method) {\n  /*eslint func-names:0*/\n  Axios.prototype[method] = function(url, config) {\n    return this.request(mergeConfig(config || {}, {\n      method: method,\n      url: url,\n      data: (config || {}).data\n    }));\n  };\n});\n\nutils.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {\n  /*eslint func-names:0*/\n  Axios.prototype[method] = function(url, data, config) {\n    return this.request(mergeConfig(config || {}, {\n      method: method,\n      url: url,\n      data: data\n    }));\n  };\n});\n\nmodule.exports = Axios;\n\n\n//# sourceURL=webpack://template/./node_modules/axios/lib/core/Axios.js?");

/***/ }),

/***/ "./node_modules/axios/lib/core/InterceptorManager.js":
/*!***********************************************************!*\
  !*** ./node_modules/axios/lib/core/InterceptorManager.js ***!
  \***********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("\n\nvar utils = __webpack_require__(/*! ./../utils */ \"./node_modules/axios/lib/utils.js\");\n\nfunction InterceptorManager() {\n  this.handlers = [];\n}\n\n/**\n * Add a new interceptor to the stack\n *\n * @param {Function} fulfilled The function to handle `then` for a `Promise`\n * @param {Function} rejected The function to handle `reject` for a `Promise`\n *\n * @return {Number} An ID used to remove interceptor later\n */\nInterceptorManager.prototype.use = function use(fulfilled, rejected) {\n  this.handlers.push({\n    fulfilled: fulfilled,\n    rejected: rejected\n  });\n  return this.handlers.length - 1;\n};\n\n/**\n * Remove an interceptor from the stack\n *\n * @param {Number} id The ID that was returned by `use`\n */\nInterceptorManager.prototype.eject = function eject(id) {\n  if (this.handlers[id]) {\n    this.handlers[id] = null;\n  }\n};\n\n/**\n * Iterate over all the registered interceptors\n *\n * This method is particularly useful for skipping over any\n * interceptors that may have become `null` calling `eject`.\n *\n * @param {Function} fn The function to call for each interceptor\n */\nInterceptorManager.prototype.forEach = function forEach(fn) {\n  utils.forEach(this.handlers, function forEachHandler(h) {\n    if (h !== null) {\n      fn(h);\n    }\n  });\n};\n\nmodule.exports = InterceptorManager;\n\n\n//# sourceURL=webpack://template/./node_modules/axios/lib/core/InterceptorManager.js?");

/***/ }),

/***/ "./node_modules/axios/lib/core/buildFullPath.js":
/*!******************************************************!*\
  !*** ./node_modules/axios/lib/core/buildFullPath.js ***!
  \******************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("\n\nvar isAbsoluteURL = __webpack_require__(/*! ../helpers/isAbsoluteURL */ \"./node_modules/axios/lib/helpers/isAbsoluteURL.js\");\nvar combineURLs = __webpack_require__(/*! ../helpers/combineURLs */ \"./node_modules/axios/lib/helpers/combineURLs.js\");\n\n/**\n * Creates a new URL by combining the baseURL with the requestedURL,\n * only when the requestedURL is not already an absolute URL.\n * If the requestURL is absolute, this function returns the requestedURL untouched.\n *\n * @param {string} baseURL The base URL\n * @param {string} requestedURL Absolute or relative URL to combine\n * @returns {string} The combined full path\n */\nmodule.exports = function buildFullPath(baseURL, requestedURL) {\n  if (baseURL && !isAbsoluteURL(requestedURL)) {\n    return combineURLs(baseURL, requestedURL);\n  }\n  return requestedURL;\n};\n\n\n//# sourceURL=webpack://template/./node_modules/axios/lib/core/buildFullPath.js?");

/***/ }),

/***/ "./node_modules/axios/lib/core/createError.js":
/*!****************************************************!*\
  !*** ./node_modules/axios/lib/core/createError.js ***!
  \****************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("\n\nvar enhanceError = __webpack_require__(/*! ./enhanceError */ \"./node_modules/axios/lib/core/enhanceError.js\");\n\n/**\n * Create an Error with the specified message, config, error code, request and response.\n *\n * @param {string} message The error message.\n * @param {Object} config The config.\n * @param {string} [code] The error code (for example, 'ECONNABORTED').\n * @param {Object} [request] The request.\n * @param {Object} [response] The response.\n * @returns {Error} The created error.\n */\nmodule.exports = function createError(message, config, code, request, response) {\n  var error = new Error(message);\n  return enhanceError(error, config, code, request, response);\n};\n\n\n//# sourceURL=webpack://template/./node_modules/axios/lib/core/createError.js?");

/***/ }),

/***/ "./node_modules/axios/lib/core/dispatchRequest.js":
/*!********************************************************!*\
  !*** ./node_modules/axios/lib/core/dispatchRequest.js ***!
  \********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("\n\nvar utils = __webpack_require__(/*! ./../utils */ \"./node_modules/axios/lib/utils.js\");\nvar transformData = __webpack_require__(/*! ./transformData */ \"./node_modules/axios/lib/core/transformData.js\");\nvar isCancel = __webpack_require__(/*! ../cancel/isCancel */ \"./node_modules/axios/lib/cancel/isCancel.js\");\nvar defaults = __webpack_require__(/*! ../defaults */ \"./node_modules/axios/lib/defaults.js\");\n\n/**\n * Throws a `Cancel` if cancellation has been requested.\n */\nfunction throwIfCancellationRequested(config) {\n  if (config.cancelToken) {\n    config.cancelToken.throwIfRequested();\n  }\n}\n\n/**\n * Dispatch a request to the server using the configured adapter.\n *\n * @param {object} config The config that is to be used for the request\n * @returns {Promise} The Promise to be fulfilled\n */\nmodule.exports = function dispatchRequest(config) {\n  throwIfCancellationRequested(config);\n\n  // Ensure headers exist\n  config.headers = config.headers || {};\n\n  // Transform request data\n  config.data = transformData(\n    config.data,\n    config.headers,\n    config.transformRequest\n  );\n\n  // Flatten headers\n  config.headers = utils.merge(\n    config.headers.common || {},\n    config.headers[config.method] || {},\n    config.headers\n  );\n\n  utils.forEach(\n    ['delete', 'get', 'head', 'post', 'put', 'patch', 'common'],\n    function cleanHeaderConfig(method) {\n      delete config.headers[method];\n    }\n  );\n\n  var adapter = config.adapter || defaults.adapter;\n\n  return adapter(config).then(function onAdapterResolution(response) {\n    throwIfCancellationRequested(config);\n\n    // Transform response data\n    response.data = transformData(\n      response.data,\n      response.headers,\n      config.transformResponse\n    );\n\n    return response;\n  }, function onAdapterRejection(reason) {\n    if (!isCancel(reason)) {\n      throwIfCancellationRequested(config);\n\n      // Transform response data\n      if (reason && reason.response) {\n        reason.response.data = transformData(\n          reason.response.data,\n          reason.response.headers,\n          config.transformResponse\n        );\n      }\n    }\n\n    return Promise.reject(reason);\n  });\n};\n\n\n//# sourceURL=webpack://template/./node_modules/axios/lib/core/dispatchRequest.js?");

/***/ }),

/***/ "./node_modules/axios/lib/core/enhanceError.js":
/*!*****************************************************!*\
  !*** ./node_modules/axios/lib/core/enhanceError.js ***!
  \*****************************************************/
/***/ ((module) => {

"use strict";
eval("\n\n/**\n * Update an Error with the specified config, error code, and response.\n *\n * @param {Error} error The error to update.\n * @param {Object} config The config.\n * @param {string} [code] The error code (for example, 'ECONNABORTED').\n * @param {Object} [request] The request.\n * @param {Object} [response] The response.\n * @returns {Error} The error.\n */\nmodule.exports = function enhanceError(error, config, code, request, response) {\n  error.config = config;\n  if (code) {\n    error.code = code;\n  }\n\n  error.request = request;\n  error.response = response;\n  error.isAxiosError = true;\n\n  error.toJSON = function toJSON() {\n    return {\n      // Standard\n      message: this.message,\n      name: this.name,\n      // Microsoft\n      description: this.description,\n      number: this.number,\n      // Mozilla\n      fileName: this.fileName,\n      lineNumber: this.lineNumber,\n      columnNumber: this.columnNumber,\n      stack: this.stack,\n      // Axios\n      config: this.config,\n      code: this.code\n    };\n  };\n  return error;\n};\n\n\n//# sourceURL=webpack://template/./node_modules/axios/lib/core/enhanceError.js?");

/***/ }),

/***/ "./node_modules/axios/lib/core/mergeConfig.js":
/*!****************************************************!*\
  !*** ./node_modules/axios/lib/core/mergeConfig.js ***!
  \****************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("\n\nvar utils = __webpack_require__(/*! ../utils */ \"./node_modules/axios/lib/utils.js\");\n\n/**\n * Config-specific merge-function which creates a new config-object\n * by merging two configuration objects together.\n *\n * @param {Object} config1\n * @param {Object} config2\n * @returns {Object} New object resulting from merging config2 to config1\n */\nmodule.exports = function mergeConfig(config1, config2) {\n  // eslint-disable-next-line no-param-reassign\n  config2 = config2 || {};\n  var config = {};\n\n  var valueFromConfig2Keys = ['url', 'method', 'data'];\n  var mergeDeepPropertiesKeys = ['headers', 'auth', 'proxy', 'params'];\n  var defaultToConfig2Keys = [\n    'baseURL', 'transformRequest', 'transformResponse', 'paramsSerializer',\n    'timeout', 'timeoutMessage', 'withCredentials', 'adapter', 'responseType', 'xsrfCookieName',\n    'xsrfHeaderName', 'onUploadProgress', 'onDownloadProgress', 'decompress',\n    'maxContentLength', 'maxBodyLength', 'maxRedirects', 'transport', 'httpAgent',\n    'httpsAgent', 'cancelToken', 'socketPath', 'responseEncoding'\n  ];\n  var directMergeKeys = ['validateStatus'];\n\n  function getMergedValue(target, source) {\n    if (utils.isPlainObject(target) && utils.isPlainObject(source)) {\n      return utils.merge(target, source);\n    } else if (utils.isPlainObject(source)) {\n      return utils.merge({}, source);\n    } else if (utils.isArray(source)) {\n      return source.slice();\n    }\n    return source;\n  }\n\n  function mergeDeepProperties(prop) {\n    if (!utils.isUndefined(config2[prop])) {\n      config[prop] = getMergedValue(config1[prop], config2[prop]);\n    } else if (!utils.isUndefined(config1[prop])) {\n      config[prop] = getMergedValue(undefined, config1[prop]);\n    }\n  }\n\n  utils.forEach(valueFromConfig2Keys, function valueFromConfig2(prop) {\n    if (!utils.isUndefined(config2[prop])) {\n      config[prop] = getMergedValue(undefined, config2[prop]);\n    }\n  });\n\n  utils.forEach(mergeDeepPropertiesKeys, mergeDeepProperties);\n\n  utils.forEach(defaultToConfig2Keys, function defaultToConfig2(prop) {\n    if (!utils.isUndefined(config2[prop])) {\n      config[prop] = getMergedValue(undefined, config2[prop]);\n    } else if (!utils.isUndefined(config1[prop])) {\n      config[prop] = getMergedValue(undefined, config1[prop]);\n    }\n  });\n\n  utils.forEach(directMergeKeys, function merge(prop) {\n    if (prop in config2) {\n      config[prop] = getMergedValue(config1[prop], config2[prop]);\n    } else if (prop in config1) {\n      config[prop] = getMergedValue(undefined, config1[prop]);\n    }\n  });\n\n  var axiosKeys = valueFromConfig2Keys\n    .concat(mergeDeepPropertiesKeys)\n    .concat(defaultToConfig2Keys)\n    .concat(directMergeKeys);\n\n  var otherKeys = Object\n    .keys(config1)\n    .concat(Object.keys(config2))\n    .filter(function filterAxiosKeys(key) {\n      return axiosKeys.indexOf(key) === -1;\n    });\n\n  utils.forEach(otherKeys, mergeDeepProperties);\n\n  return config;\n};\n\n\n//# sourceURL=webpack://template/./node_modules/axios/lib/core/mergeConfig.js?");

/***/ }),

/***/ "./node_modules/axios/lib/core/settle.js":
/*!***********************************************!*\
  !*** ./node_modules/axios/lib/core/settle.js ***!
  \***********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("\n\nvar createError = __webpack_require__(/*! ./createError */ \"./node_modules/axios/lib/core/createError.js\");\n\n/**\n * Resolve or reject a Promise based on response status.\n *\n * @param {Function} resolve A function that resolves the promise.\n * @param {Function} reject A function that rejects the promise.\n * @param {object} response The response.\n */\nmodule.exports = function settle(resolve, reject, response) {\n  var validateStatus = response.config.validateStatus;\n  if (!response.status || !validateStatus || validateStatus(response.status)) {\n    resolve(response);\n  } else {\n    reject(createError(\n      'Request failed with status code ' + response.status,\n      response.config,\n      null,\n      response.request,\n      response\n    ));\n  }\n};\n\n\n//# sourceURL=webpack://template/./node_modules/axios/lib/core/settle.js?");

/***/ }),

/***/ "./node_modules/axios/lib/core/transformData.js":
/*!******************************************************!*\
  !*** ./node_modules/axios/lib/core/transformData.js ***!
  \******************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("\n\nvar utils = __webpack_require__(/*! ./../utils */ \"./node_modules/axios/lib/utils.js\");\n\n/**\n * Transform the data for a request or a response\n *\n * @param {Object|String} data The data to be transformed\n * @param {Array} headers The headers for the request or response\n * @param {Array|Function} fns A single function or Array of functions\n * @returns {*} The resulting transformed data\n */\nmodule.exports = function transformData(data, headers, fns) {\n  /*eslint no-param-reassign:0*/\n  utils.forEach(fns, function transform(fn) {\n    data = fn(data, headers);\n  });\n\n  return data;\n};\n\n\n//# sourceURL=webpack://template/./node_modules/axios/lib/core/transformData.js?");

/***/ }),

/***/ "./node_modules/axios/lib/defaults.js":
/*!********************************************!*\
  !*** ./node_modules/axios/lib/defaults.js ***!
  \********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("\n\nvar utils = __webpack_require__(/*! ./utils */ \"./node_modules/axios/lib/utils.js\");\nvar normalizeHeaderName = __webpack_require__(/*! ./helpers/normalizeHeaderName */ \"./node_modules/axios/lib/helpers/normalizeHeaderName.js\");\n\nvar DEFAULT_CONTENT_TYPE = {\n  'Content-Type': 'application/x-www-form-urlencoded'\n};\n\nfunction setContentTypeIfUnset(headers, value) {\n  if (!utils.isUndefined(headers) && utils.isUndefined(headers['Content-Type'])) {\n    headers['Content-Type'] = value;\n  }\n}\n\nfunction getDefaultAdapter() {\n  var adapter;\n  if (typeof XMLHttpRequest !== 'undefined') {\n    // For browsers use XHR adapter\n    adapter = __webpack_require__(/*! ./adapters/xhr */ \"./node_modules/axios/lib/adapters/xhr.js\");\n  } else if (typeof process !== 'undefined' && Object.prototype.toString.call(process) === '[object process]') {\n    // For node use HTTP adapter\n    adapter = __webpack_require__(/*! ./adapters/http */ \"./node_modules/axios/lib/adapters/xhr.js\");\n  }\n  return adapter;\n}\n\nvar defaults = {\n  adapter: getDefaultAdapter(),\n\n  transformRequest: [function transformRequest(data, headers) {\n    normalizeHeaderName(headers, 'Accept');\n    normalizeHeaderName(headers, 'Content-Type');\n    if (utils.isFormData(data) ||\n      utils.isArrayBuffer(data) ||\n      utils.isBuffer(data) ||\n      utils.isStream(data) ||\n      utils.isFile(data) ||\n      utils.isBlob(data)\n    ) {\n      return data;\n    }\n    if (utils.isArrayBufferView(data)) {\n      return data.buffer;\n    }\n    if (utils.isURLSearchParams(data)) {\n      setContentTypeIfUnset(headers, 'application/x-www-form-urlencoded;charset=utf-8');\n      return data.toString();\n    }\n    if (utils.isObject(data)) {\n      setContentTypeIfUnset(headers, 'application/json;charset=utf-8');\n      return JSON.stringify(data);\n    }\n    return data;\n  }],\n\n  transformResponse: [function transformResponse(data) {\n    /*eslint no-param-reassign:0*/\n    if (typeof data === 'string') {\n      try {\n        data = JSON.parse(data);\n      } catch (e) { /* Ignore */ }\n    }\n    return data;\n  }],\n\n  /**\n   * A timeout in milliseconds to abort a request. If set to 0 (default) a\n   * timeout is not created.\n   */\n  timeout: 0,\n\n  xsrfCookieName: 'XSRF-TOKEN',\n  xsrfHeaderName: 'X-XSRF-TOKEN',\n\n  maxContentLength: -1,\n  maxBodyLength: -1,\n\n  validateStatus: function validateStatus(status) {\n    return status >= 200 && status < 300;\n  }\n};\n\ndefaults.headers = {\n  common: {\n    'Accept': 'application/json, text/plain, */*'\n  }\n};\n\nutils.forEach(['delete', 'get', 'head'], function forEachMethodNoData(method) {\n  defaults.headers[method] = {};\n});\n\nutils.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {\n  defaults.headers[method] = utils.merge(DEFAULT_CONTENT_TYPE);\n});\n\nmodule.exports = defaults;\n\n\n//# sourceURL=webpack://template/./node_modules/axios/lib/defaults.js?");

/***/ }),

/***/ "./node_modules/axios/lib/helpers/bind.js":
/*!************************************************!*\
  !*** ./node_modules/axios/lib/helpers/bind.js ***!
  \************************************************/
/***/ ((module) => {

"use strict";
eval("\n\nmodule.exports = function bind(fn, thisArg) {\n  return function wrap() {\n    var args = new Array(arguments.length);\n    for (var i = 0; i < args.length; i++) {\n      args[i] = arguments[i];\n    }\n    return fn.apply(thisArg, args);\n  };\n};\n\n\n//# sourceURL=webpack://template/./node_modules/axios/lib/helpers/bind.js?");

/***/ }),

/***/ "./node_modules/axios/lib/helpers/buildURL.js":
/*!****************************************************!*\
  !*** ./node_modules/axios/lib/helpers/buildURL.js ***!
  \****************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("\n\nvar utils = __webpack_require__(/*! ./../utils */ \"./node_modules/axios/lib/utils.js\");\n\nfunction encode(val) {\n  return encodeURIComponent(val).\n    replace(/%3A/gi, ':').\n    replace(/%24/g, '$').\n    replace(/%2C/gi, ',').\n    replace(/%20/g, '+').\n    replace(/%5B/gi, '[').\n    replace(/%5D/gi, ']');\n}\n\n/**\n * Build a URL by appending params to the end\n *\n * @param {string} url The base of the url (e.g., http://www.google.com)\n * @param {object} [params] The params to be appended\n * @returns {string} The formatted url\n */\nmodule.exports = function buildURL(url, params, paramsSerializer) {\n  /*eslint no-param-reassign:0*/\n  if (!params) {\n    return url;\n  }\n\n  var serializedParams;\n  if (paramsSerializer) {\n    serializedParams = paramsSerializer(params);\n  } else if (utils.isURLSearchParams(params)) {\n    serializedParams = params.toString();\n  } else {\n    var parts = [];\n\n    utils.forEach(params, function serialize(val, key) {\n      if (val === null || typeof val === 'undefined') {\n        return;\n      }\n\n      if (utils.isArray(val)) {\n        key = key + '[]';\n      } else {\n        val = [val];\n      }\n\n      utils.forEach(val, function parseValue(v) {\n        if (utils.isDate(v)) {\n          v = v.toISOString();\n        } else if (utils.isObject(v)) {\n          v = JSON.stringify(v);\n        }\n        parts.push(encode(key) + '=' + encode(v));\n      });\n    });\n\n    serializedParams = parts.join('&');\n  }\n\n  if (serializedParams) {\n    var hashmarkIndex = url.indexOf('#');\n    if (hashmarkIndex !== -1) {\n      url = url.slice(0, hashmarkIndex);\n    }\n\n    url += (url.indexOf('?') === -1 ? '?' : '&') + serializedParams;\n  }\n\n  return url;\n};\n\n\n//# sourceURL=webpack://template/./node_modules/axios/lib/helpers/buildURL.js?");

/***/ }),

/***/ "./node_modules/axios/lib/helpers/combineURLs.js":
/*!*******************************************************!*\
  !*** ./node_modules/axios/lib/helpers/combineURLs.js ***!
  \*******************************************************/
/***/ ((module) => {

"use strict";
eval("\n\n/**\n * Creates a new URL by combining the specified URLs\n *\n * @param {string} baseURL The base URL\n * @param {string} relativeURL The relative URL\n * @returns {string} The combined URL\n */\nmodule.exports = function combineURLs(baseURL, relativeURL) {\n  return relativeURL\n    ? baseURL.replace(/\\/+$/, '') + '/' + relativeURL.replace(/^\\/+/, '')\n    : baseURL;\n};\n\n\n//# sourceURL=webpack://template/./node_modules/axios/lib/helpers/combineURLs.js?");

/***/ }),

/***/ "./node_modules/axios/lib/helpers/cookies.js":
/*!***************************************************!*\
  !*** ./node_modules/axios/lib/helpers/cookies.js ***!
  \***************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("\n\nvar utils = __webpack_require__(/*! ./../utils */ \"./node_modules/axios/lib/utils.js\");\n\nmodule.exports = (\n  utils.isStandardBrowserEnv() ?\n\n  // Standard browser envs support document.cookie\n    (function standardBrowserEnv() {\n      return {\n        write: function write(name, value, expires, path, domain, secure) {\n          var cookie = [];\n          cookie.push(name + '=' + encodeURIComponent(value));\n\n          if (utils.isNumber(expires)) {\n            cookie.push('expires=' + new Date(expires).toGMTString());\n          }\n\n          if (utils.isString(path)) {\n            cookie.push('path=' + path);\n          }\n\n          if (utils.isString(domain)) {\n            cookie.push('domain=' + domain);\n          }\n\n          if (secure === true) {\n            cookie.push('secure');\n          }\n\n          document.cookie = cookie.join('; ');\n        },\n\n        read: function read(name) {\n          var match = document.cookie.match(new RegExp('(^|;\\\\s*)(' + name + ')=([^;]*)'));\n          return (match ? decodeURIComponent(match[3]) : null);\n        },\n\n        remove: function remove(name) {\n          this.write(name, '', Date.now() - 86400000);\n        }\n      };\n    })() :\n\n  // Non standard browser env (web workers, react-native) lack needed support.\n    (function nonStandardBrowserEnv() {\n      return {\n        write: function write() {},\n        read: function read() { return null; },\n        remove: function remove() {}\n      };\n    })()\n);\n\n\n//# sourceURL=webpack://template/./node_modules/axios/lib/helpers/cookies.js?");

/***/ }),

/***/ "./node_modules/axios/lib/helpers/isAbsoluteURL.js":
/*!*********************************************************!*\
  !*** ./node_modules/axios/lib/helpers/isAbsoluteURL.js ***!
  \*********************************************************/
/***/ ((module) => {

"use strict";
eval("\n\n/**\n * Determines whether the specified URL is absolute\n *\n * @param {string} url The URL to test\n * @returns {boolean} True if the specified URL is absolute, otherwise false\n */\nmodule.exports = function isAbsoluteURL(url) {\n  // A URL is considered absolute if it begins with \"<scheme>://\" or \"//\" (protocol-relative URL).\n  // RFC 3986 defines scheme name as a sequence of characters beginning with a letter and followed\n  // by any combination of letters, digits, plus, period, or hyphen.\n  return /^([a-z][a-z\\d\\+\\-\\.]*:)?\\/\\//i.test(url);\n};\n\n\n//# sourceURL=webpack://template/./node_modules/axios/lib/helpers/isAbsoluteURL.js?");

/***/ }),

/***/ "./node_modules/axios/lib/helpers/isAxiosError.js":
/*!********************************************************!*\
  !*** ./node_modules/axios/lib/helpers/isAxiosError.js ***!
  \********************************************************/
/***/ ((module) => {

"use strict";
eval("\n\n/**\n * Determines whether the payload is an error thrown by Axios\n *\n * @param {*} payload The value to test\n * @returns {boolean} True if the payload is an error thrown by Axios, otherwise false\n */\nmodule.exports = function isAxiosError(payload) {\n  return (typeof payload === 'object') && (payload.isAxiosError === true);\n};\n\n\n//# sourceURL=webpack://template/./node_modules/axios/lib/helpers/isAxiosError.js?");

/***/ }),

/***/ "./node_modules/axios/lib/helpers/isURLSameOrigin.js":
/*!***********************************************************!*\
  !*** ./node_modules/axios/lib/helpers/isURLSameOrigin.js ***!
  \***********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("\n\nvar utils = __webpack_require__(/*! ./../utils */ \"./node_modules/axios/lib/utils.js\");\n\nmodule.exports = (\n  utils.isStandardBrowserEnv() ?\n\n  // Standard browser envs have full support of the APIs needed to test\n  // whether the request URL is of the same origin as current location.\n    (function standardBrowserEnv() {\n      var msie = /(msie|trident)/i.test(navigator.userAgent);\n      var urlParsingNode = document.createElement('a');\n      var originURL;\n\n      /**\n    * Parse a URL to discover it's components\n    *\n    * @param {String} url The URL to be parsed\n    * @returns {Object}\n    */\n      function resolveURL(url) {\n        var href = url;\n\n        if (msie) {\n        // IE needs attribute set twice to normalize properties\n          urlParsingNode.setAttribute('href', href);\n          href = urlParsingNode.href;\n        }\n\n        urlParsingNode.setAttribute('href', href);\n\n        // urlParsingNode provides the UrlUtils interface - http://url.spec.whatwg.org/#urlutils\n        return {\n          href: urlParsingNode.href,\n          protocol: urlParsingNode.protocol ? urlParsingNode.protocol.replace(/:$/, '') : '',\n          host: urlParsingNode.host,\n          search: urlParsingNode.search ? urlParsingNode.search.replace(/^\\?/, '') : '',\n          hash: urlParsingNode.hash ? urlParsingNode.hash.replace(/^#/, '') : '',\n          hostname: urlParsingNode.hostname,\n          port: urlParsingNode.port,\n          pathname: (urlParsingNode.pathname.charAt(0) === '/') ?\n            urlParsingNode.pathname :\n            '/' + urlParsingNode.pathname\n        };\n      }\n\n      originURL = resolveURL(window.location.href);\n\n      /**\n    * Determine if a URL shares the same origin as the current location\n    *\n    * @param {String} requestURL The URL to test\n    * @returns {boolean} True if URL shares the same origin, otherwise false\n    */\n      return function isURLSameOrigin(requestURL) {\n        var parsed = (utils.isString(requestURL)) ? resolveURL(requestURL) : requestURL;\n        return (parsed.protocol === originURL.protocol &&\n            parsed.host === originURL.host);\n      };\n    })() :\n\n  // Non standard browser envs (web workers, react-native) lack needed support.\n    (function nonStandardBrowserEnv() {\n      return function isURLSameOrigin() {\n        return true;\n      };\n    })()\n);\n\n\n//# sourceURL=webpack://template/./node_modules/axios/lib/helpers/isURLSameOrigin.js?");

/***/ }),

/***/ "./node_modules/axios/lib/helpers/normalizeHeaderName.js":
/*!***************************************************************!*\
  !*** ./node_modules/axios/lib/helpers/normalizeHeaderName.js ***!
  \***************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("\n\nvar utils = __webpack_require__(/*! ../utils */ \"./node_modules/axios/lib/utils.js\");\n\nmodule.exports = function normalizeHeaderName(headers, normalizedName) {\n  utils.forEach(headers, function processHeader(value, name) {\n    if (name !== normalizedName && name.toUpperCase() === normalizedName.toUpperCase()) {\n      headers[normalizedName] = value;\n      delete headers[name];\n    }\n  });\n};\n\n\n//# sourceURL=webpack://template/./node_modules/axios/lib/helpers/normalizeHeaderName.js?");

/***/ }),

/***/ "./node_modules/axios/lib/helpers/parseHeaders.js":
/*!********************************************************!*\
  !*** ./node_modules/axios/lib/helpers/parseHeaders.js ***!
  \********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("\n\nvar utils = __webpack_require__(/*! ./../utils */ \"./node_modules/axios/lib/utils.js\");\n\n// Headers whose duplicates are ignored by node\n// c.f. https://nodejs.org/api/http.html#http_message_headers\nvar ignoreDuplicateOf = [\n  'age', 'authorization', 'content-length', 'content-type', 'etag',\n  'expires', 'from', 'host', 'if-modified-since', 'if-unmodified-since',\n  'last-modified', 'location', 'max-forwards', 'proxy-authorization',\n  'referer', 'retry-after', 'user-agent'\n];\n\n/**\n * Parse headers into an object\n *\n * ```\n * Date: Wed, 27 Aug 2014 08:58:49 GMT\n * Content-Type: application/json\n * Connection: keep-alive\n * Transfer-Encoding: chunked\n * ```\n *\n * @param {String} headers Headers needing to be parsed\n * @returns {Object} Headers parsed into an object\n */\nmodule.exports = function parseHeaders(headers) {\n  var parsed = {};\n  var key;\n  var val;\n  var i;\n\n  if (!headers) { return parsed; }\n\n  utils.forEach(headers.split('\\n'), function parser(line) {\n    i = line.indexOf(':');\n    key = utils.trim(line.substr(0, i)).toLowerCase();\n    val = utils.trim(line.substr(i + 1));\n\n    if (key) {\n      if (parsed[key] && ignoreDuplicateOf.indexOf(key) >= 0) {\n        return;\n      }\n      if (key === 'set-cookie') {\n        parsed[key] = (parsed[key] ? parsed[key] : []).concat([val]);\n      } else {\n        parsed[key] = parsed[key] ? parsed[key] + ', ' + val : val;\n      }\n    }\n  });\n\n  return parsed;\n};\n\n\n//# sourceURL=webpack://template/./node_modules/axios/lib/helpers/parseHeaders.js?");

/***/ }),

/***/ "./node_modules/axios/lib/helpers/spread.js":
/*!**************************************************!*\
  !*** ./node_modules/axios/lib/helpers/spread.js ***!
  \**************************************************/
/***/ ((module) => {

"use strict";
eval("\n\n/**\n * Syntactic sugar for invoking a function and expanding an array for arguments.\n *\n * Common use case would be to use `Function.prototype.apply`.\n *\n *  ```js\n *  function f(x, y, z) {}\n *  var args = [1, 2, 3];\n *  f.apply(null, args);\n *  ```\n *\n * With `spread` this example can be re-written.\n *\n *  ```js\n *  spread(function(x, y, z) {})([1, 2, 3]);\n *  ```\n *\n * @param {Function} callback\n * @returns {Function}\n */\nmodule.exports = function spread(callback) {\n  return function wrap(arr) {\n    return callback.apply(null, arr);\n  };\n};\n\n\n//# sourceURL=webpack://template/./node_modules/axios/lib/helpers/spread.js?");

/***/ }),

/***/ "./node_modules/axios/lib/utils.js":
/*!*****************************************!*\
  !*** ./node_modules/axios/lib/utils.js ***!
  \*****************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("\n\nvar bind = __webpack_require__(/*! ./helpers/bind */ \"./node_modules/axios/lib/helpers/bind.js\");\n\n/*global toString:true*/\n\n// utils is a library of generic helper functions non-specific to axios\n\nvar toString = Object.prototype.toString;\n\n/**\n * Determine if a value is an Array\n *\n * @param {Object} val The value to test\n * @returns {boolean} True if value is an Array, otherwise false\n */\nfunction isArray(val) {\n  return toString.call(val) === '[object Array]';\n}\n\n/**\n * Determine if a value is undefined\n *\n * @param {Object} val The value to test\n * @returns {boolean} True if the value is undefined, otherwise false\n */\nfunction isUndefined(val) {\n  return typeof val === 'undefined';\n}\n\n/**\n * Determine if a value is a Buffer\n *\n * @param {Object} val The value to test\n * @returns {boolean} True if value is a Buffer, otherwise false\n */\nfunction isBuffer(val) {\n  return val !== null && !isUndefined(val) && val.constructor !== null && !isUndefined(val.constructor)\n    && typeof val.constructor.isBuffer === 'function' && val.constructor.isBuffer(val);\n}\n\n/**\n * Determine if a value is an ArrayBuffer\n *\n * @param {Object} val The value to test\n * @returns {boolean} True if value is an ArrayBuffer, otherwise false\n */\nfunction isArrayBuffer(val) {\n  return toString.call(val) === '[object ArrayBuffer]';\n}\n\n/**\n * Determine if a value is a FormData\n *\n * @param {Object} val The value to test\n * @returns {boolean} True if value is an FormData, otherwise false\n */\nfunction isFormData(val) {\n  return (typeof FormData !== 'undefined') && (val instanceof FormData);\n}\n\n/**\n * Determine if a value is a view on an ArrayBuffer\n *\n * @param {Object} val The value to test\n * @returns {boolean} True if value is a view on an ArrayBuffer, otherwise false\n */\nfunction isArrayBufferView(val) {\n  var result;\n  if ((typeof ArrayBuffer !== 'undefined') && (ArrayBuffer.isView)) {\n    result = ArrayBuffer.isView(val);\n  } else {\n    result = (val) && (val.buffer) && (val.buffer instanceof ArrayBuffer);\n  }\n  return result;\n}\n\n/**\n * Determine if a value is a String\n *\n * @param {Object} val The value to test\n * @returns {boolean} True if value is a String, otherwise false\n */\nfunction isString(val) {\n  return typeof val === 'string';\n}\n\n/**\n * Determine if a value is a Number\n *\n * @param {Object} val The value to test\n * @returns {boolean} True if value is a Number, otherwise false\n */\nfunction isNumber(val) {\n  return typeof val === 'number';\n}\n\n/**\n * Determine if a value is an Object\n *\n * @param {Object} val The value to test\n * @returns {boolean} True if value is an Object, otherwise false\n */\nfunction isObject(val) {\n  return val !== null && typeof val === 'object';\n}\n\n/**\n * Determine if a value is a plain Object\n *\n * @param {Object} val The value to test\n * @return {boolean} True if value is a plain Object, otherwise false\n */\nfunction isPlainObject(val) {\n  if (toString.call(val) !== '[object Object]') {\n    return false;\n  }\n\n  var prototype = Object.getPrototypeOf(val);\n  return prototype === null || prototype === Object.prototype;\n}\n\n/**\n * Determine if a value is a Date\n *\n * @param {Object} val The value to test\n * @returns {boolean} True if value is a Date, otherwise false\n */\nfunction isDate(val) {\n  return toString.call(val) === '[object Date]';\n}\n\n/**\n * Determine if a value is a File\n *\n * @param {Object} val The value to test\n * @returns {boolean} True if value is a File, otherwise false\n */\nfunction isFile(val) {\n  return toString.call(val) === '[object File]';\n}\n\n/**\n * Determine if a value is a Blob\n *\n * @param {Object} val The value to test\n * @returns {boolean} True if value is a Blob, otherwise false\n */\nfunction isBlob(val) {\n  return toString.call(val) === '[object Blob]';\n}\n\n/**\n * Determine if a value is a Function\n *\n * @param {Object} val The value to test\n * @returns {boolean} True if value is a Function, otherwise false\n */\nfunction isFunction(val) {\n  return toString.call(val) === '[object Function]';\n}\n\n/**\n * Determine if a value is a Stream\n *\n * @param {Object} val The value to test\n * @returns {boolean} True if value is a Stream, otherwise false\n */\nfunction isStream(val) {\n  return isObject(val) && isFunction(val.pipe);\n}\n\n/**\n * Determine if a value is a URLSearchParams object\n *\n * @param {Object} val The value to test\n * @returns {boolean} True if value is a URLSearchParams object, otherwise false\n */\nfunction isURLSearchParams(val) {\n  return typeof URLSearchParams !== 'undefined' && val instanceof URLSearchParams;\n}\n\n/**\n * Trim excess whitespace off the beginning and end of a string\n *\n * @param {String} str The String to trim\n * @returns {String} The String freed of excess whitespace\n */\nfunction trim(str) {\n  return str.replace(/^\\s*/, '').replace(/\\s*$/, '');\n}\n\n/**\n * Determine if we're running in a standard browser environment\n *\n * This allows axios to run in a web worker, and react-native.\n * Both environments support XMLHttpRequest, but not fully standard globals.\n *\n * web workers:\n *  typeof window -> undefined\n *  typeof document -> undefined\n *\n * react-native:\n *  navigator.product -> 'ReactNative'\n * nativescript\n *  navigator.product -> 'NativeScript' or 'NS'\n */\nfunction isStandardBrowserEnv() {\n  if (typeof navigator !== 'undefined' && (navigator.product === 'ReactNative' ||\n                                           navigator.product === 'NativeScript' ||\n                                           navigator.product === 'NS')) {\n    return false;\n  }\n  return (\n    typeof window !== 'undefined' &&\n    typeof document !== 'undefined'\n  );\n}\n\n/**\n * Iterate over an Array or an Object invoking a function for each item.\n *\n * If `obj` is an Array callback will be called passing\n * the value, index, and complete array for each item.\n *\n * If 'obj' is an Object callback will be called passing\n * the value, key, and complete object for each property.\n *\n * @param {Object|Array} obj The object to iterate\n * @param {Function} fn The callback to invoke for each item\n */\nfunction forEach(obj, fn) {\n  // Don't bother if no value provided\n  if (obj === null || typeof obj === 'undefined') {\n    return;\n  }\n\n  // Force an array if not already something iterable\n  if (typeof obj !== 'object') {\n    /*eslint no-param-reassign:0*/\n    obj = [obj];\n  }\n\n  if (isArray(obj)) {\n    // Iterate over array values\n    for (var i = 0, l = obj.length; i < l; i++) {\n      fn.call(null, obj[i], i, obj);\n    }\n  } else {\n    // Iterate over object keys\n    for (var key in obj) {\n      if (Object.prototype.hasOwnProperty.call(obj, key)) {\n        fn.call(null, obj[key], key, obj);\n      }\n    }\n  }\n}\n\n/**\n * Accepts varargs expecting each argument to be an object, then\n * immutably merges the properties of each object and returns result.\n *\n * When multiple objects contain the same key the later object in\n * the arguments list will take precedence.\n *\n * Example:\n *\n * ```js\n * var result = merge({foo: 123}, {foo: 456});\n * console.log(result.foo); // outputs 456\n * ```\n *\n * @param {Object} obj1 Object to merge\n * @returns {Object} Result of all merge properties\n */\nfunction merge(/* obj1, obj2, obj3, ... */) {\n  var result = {};\n  function assignValue(val, key) {\n    if (isPlainObject(result[key]) && isPlainObject(val)) {\n      result[key] = merge(result[key], val);\n    } else if (isPlainObject(val)) {\n      result[key] = merge({}, val);\n    } else if (isArray(val)) {\n      result[key] = val.slice();\n    } else {\n      result[key] = val;\n    }\n  }\n\n  for (var i = 0, l = arguments.length; i < l; i++) {\n    forEach(arguments[i], assignValue);\n  }\n  return result;\n}\n\n/**\n * Extends object a by mutably adding to it the properties of object b.\n *\n * @param {Object} a The object to be extended\n * @param {Object} b The object to copy properties from\n * @param {Object} thisArg The object to bind function to\n * @return {Object} The resulting value of object a\n */\nfunction extend(a, b, thisArg) {\n  forEach(b, function assignValue(val, key) {\n    if (thisArg && typeof val === 'function') {\n      a[key] = bind(val, thisArg);\n    } else {\n      a[key] = val;\n    }\n  });\n  return a;\n}\n\n/**\n * Remove byte order marker. This catches EF BB BF (the UTF-8 BOM)\n *\n * @param {string} content with BOM\n * @return {string} content value without BOM\n */\nfunction stripBOM(content) {\n  if (content.charCodeAt(0) === 0xFEFF) {\n    content = content.slice(1);\n  }\n  return content;\n}\n\nmodule.exports = {\n  isArray: isArray,\n  isArrayBuffer: isArrayBuffer,\n  isBuffer: isBuffer,\n  isFormData: isFormData,\n  isArrayBufferView: isArrayBufferView,\n  isString: isString,\n  isNumber: isNumber,\n  isObject: isObject,\n  isPlainObject: isPlainObject,\n  isUndefined: isUndefined,\n  isDate: isDate,\n  isFile: isFile,\n  isBlob: isBlob,\n  isFunction: isFunction,\n  isStream: isStream,\n  isURLSearchParams: isURLSearchParams,\n  isStandardBrowserEnv: isStandardBrowserEnv,\n  forEach: forEach,\n  merge: merge,\n  extend: extend,\n  trim: trim,\n  stripBOM: stripBOM\n};\n\n\n//# sourceURL=webpack://template/./node_modules/axios/lib/utils.js?");

/***/ }),

/***/ "./src/js/controllers/errorController.js":
/*!***********************************************!*\
  !*** ./src/js/controllers/errorController.js ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"errorHandler\": () => /* binding */ errorHandler\n/* harmony export */ });\nconst errorHandler = (err) => {\r\n  console.error({ err });\r\n};\r\n\n\n//# sourceURL=webpack://template/./src/js/controllers/errorController.js?");

/***/ }),

/***/ "./src/js/controllers/headerController.js":
/*!************************************************!*\
  !*** ./src/js/controllers/headerController.js ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"cartController\": () => /* binding */ cartController,\n/* harmony export */   \"likeController\": () => /* binding */ likeController,\n/* harmony export */   \"searchController\": () => /* binding */ searchController,\n/* harmony export */   \"searchHandler\": () => /* binding */ searchHandler\n/* harmony export */ });\n/* harmony import */ var _utils_Variables__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./../utils/Variables */ \"./src/js/utils/Variables.js\");\n\r\n\r\n//5 Get Variables\r\nconst { checkout, likes, search } = _utils_Variables__WEBPACK_IMPORTED_MODULE_0__.routes;\r\n\r\n//1 Cart Controller\r\nconst cartController = (carts) => {\r\n  //2 Check if cart exists\r\n  if (carts)\r\n    carts.forEach((cart) => cart.addEventListener('click', goToCheckout));\r\n};\r\n\r\n//) Go to Cart handler\r\nconst goToCheckout = (e) => {\r\n  //2 Don't reload\r\n  e.preventDefault();\r\n\r\n  //2 Redirect to Checkout Route\r\n  location.href = checkout;\r\n};\r\n\r\n//1 Like Controller\r\nconst likeController = (likes) => {\r\n  //2 Check if Like exists\r\n  if (likes) likes.forEach((like) => like.addEventListener('click', goToLikes));\r\n};\r\n\r\n//) Go to Likes handler\r\nconst goToLikes = (e) => {\r\n  //2 Don't reload\r\n  e.preventDefault();\r\n\r\n  //2 Redirect to Checkout Route\r\n  location.href = likes;\r\n};\r\n\r\n//1 Search Controller\r\nconst searchController = (searches) => {\r\n  //2 Check if search exists\r\n  if (searches) searches.forEach(searchListener);\r\n};\r\n\r\n//) Go to Search handler\r\nconst searchHandler = (e, input) => {\r\n  //2 Don't reload\r\n  e.preventDefault();\r\n\r\n  //2 Get search string\r\n  const { value } = input;\r\n\r\n  //2 Go to:  GET: '/products/results?search_query=value\r\n  if (value) location.href = `${search}${value}`;\r\n};\r\n\r\n//) Search Listener\r\nconst searchListener = () => {\r\n  //* Get input\r\n  const input = document.getElementById('search-input');\r\n\r\n  //* Add event listener to input\r\n  if (input) {\r\n    input.addEventListener('keypress', function (e) {\r\n      if (e.key === 'Enter') searchHandler(e, input);\r\n    });\r\n  }\r\n};\r\n\n\n//# sourceURL=webpack://template/./src/js/controllers/headerController.js?");

/***/ }),

/***/ "./src/js/controllers/orderController.js":
/*!***********************************************!*\
  !*** ./src/js/controllers/orderController.js ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"addOrder\": () => /* binding */ addOrder\n/* harmony export */ });\n/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! axios */ \"./node_modules/axios/index.js\");\n/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _utils_Variables__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./../utils/Variables */ \"./src/js/utils/Variables.js\");\n\r\n\r\n\r\nconst { addOrderLink } = _utils_Variables__WEBPACK_IMPORTED_MODULE_1__.routes;\r\n\r\nconst addOrder = async (cart) => {\r\n  try {\r\n    const data = {\r\n      cart,\r\n    };\r\n    const res = await axios__WEBPACK_IMPORTED_MODULE_0___default().post(addOrderLink, data);\r\n    return res.data.data.data;\r\n  } catch (error) {\r\n    console.log(error);\r\n  }\r\n};\r\n\n\n//# sourceURL=webpack://template/./src/js/controllers/orderController.js?");

/***/ }),

/***/ "./src/js/controllers/productController.js":
/*!*************************************************!*\
  !*** ./src/js/controllers/productController.js ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"cartController\": () => /* binding */ cartController\n/* harmony export */ });\n/* harmony import */ var _utils_Variables__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./../utils/Variables */ \"./src/js/utils/Variables.js\");\n/* harmony import */ var _models_Carts__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./../models/Carts */ \"./src/js/models/Carts.js\");\n/* harmony import */ var _errorController__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./errorController */ \"./src/js/controllers/errorController.js\");\n/* harmony import */ var _view_viewBase__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./../view/viewBase */ \"./src/js/view/viewBase.js\");\n/* harmony import */ var _orderController__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./orderController */ \"./src/js/controllers/orderController.js\");\n\r\n\r\n\r\n\r\n\r\n\r\nconst { addToCart, loadingSpinner, alert, checkoutButtons } = _utils_Variables__WEBPACK_IMPORTED_MODULE_0__.elements;\r\nconst { success, spinner, checkoutAlert } = _utils_Variables__WEBPACK_IMPORTED_MODULE_0__.classnames;\r\nconst { productAddedToCart, orderAddedSuccessfully } = _utils_Variables__WEBPACK_IMPORTED_MODULE_0__.messages;\r\nconst { login } = _utils_Variables__WEBPACK_IMPORTED_MODULE_0__.routes;\r\n\r\nconst cartHandler = async (e) => {\r\n  try {\r\n    //2 Prevent Reload\r\n    e.preventDefault();\r\n\r\n    //2 Add to cart: 'Product, Quantity, User'\r\n    const elements = await (0,_models_Carts__WEBPACK_IMPORTED_MODULE_1__.getCartElements)(e);\r\n    const { loggedIn } = elements;\r\n\r\n    //2 Check if Logged in, if true add a new cart\r\n    if (loggedIn) {\r\n      const spiner = loadingSpinner[0];\r\n      const cartButton = addToCart[0];\r\n      //4 Render loading button\r\n      (0,_view_viewBase__WEBPACK_IMPORTED_MODULE_3__.loading)(cartButton, spiner);\r\n\r\n      //4 Send to Server\r\n      await (0,_models_Carts__WEBPACK_IMPORTED_MODULE_1__.addProductToCart)(elements);\r\n\r\n      //4 Remove the loading\r\n      const alertObject = {\r\n        type: success,\r\n        message: productAddedToCart,\r\n        box: alert[0],\r\n      };\r\n      return (0,_view_viewBase__WEBPACK_IMPORTED_MODULE_3__.renderSuccess)(spiner, cartButton, alertObject);\r\n    }\r\n\r\n    //2 If Not logged in:\r\n    //1. Add current Link to the cookie.\r\n    const currentLink = window.location.href;\r\n    localStorage.setItem('redirect', currentLink);\r\n\r\n    //1  2.Redirect to Login\r\n    window.location.href = login;\r\n  } catch (error) {\r\n    (0,_errorController__WEBPACK_IMPORTED_MODULE_2__.errorHandler)(error);\r\n  }\r\n};\r\n\r\nconst checkRedirect = () => {\r\n  //6 Get Local Storage items, if there is a redirect link, then remove it and redirect.\r\n  const link = localStorage.getItem('redirect');\r\n\r\n  if (link) {\r\n    //2 Remove the link\r\n    localStorage.removeItem('redirect');\r\n\r\n    //2 Redirect to link\r\n    window.location.href = link;\r\n  }\r\n};\r\n\r\nconst getSpinerElement = (checkout) => {\r\n  return document.querySelector(`.${checkout}${spinner}`);\r\n};\r\n\r\nconst checkoutHandler = async (e) => {\r\n  //5 Prevent Default\r\n  e.preventDefault();\r\n\r\n  //5 Render Loading\r\n  //2 Remove the checkout class\r\n  const checkoutButton = e.target.parentElement;\r\n  const spiner = getSpinerElement(checkoutButton.classList[0]);\r\n  (0,_view_viewBase__WEBPACK_IMPORTED_MODULE_3__.loading)(checkoutButton, spiner);\r\n\r\n  try {\r\n    //5 Get Cart\r\n    const cart = await (0,_models_Carts__WEBPACK_IMPORTED_MODULE_1__.getCartId)();\r\n\r\n    //5 Send order\r\n    const order = await (0,_orderController__WEBPACK_IMPORTED_MODULE_4__.addOrder)(cart);\r\n\r\n    //5 Return to inital state\r\n    const alertObject = {\r\n      type: success,\r\n      message: orderAddedSuccessfully,\r\n      box: document.querySelector(\r\n        `.${checkoutButton.classList[0]}${checkoutAlert}`\r\n      ),\r\n    };\r\n    const inital = true;\r\n    (0,_view_viewBase__WEBPACK_IMPORTED_MODULE_3__.renderSuccess)(spiner, checkoutButton, alertObject, inital);\r\n  } catch (error) {\r\n    console.error(error);\r\n  }\r\n};\r\n\r\n//) Cart Controller\r\nconst cartController = () => {\r\n  //7 Get Cart button and listen to click\r\n  if (addToCart.length > 0) addToCart[0].addEventListener('click', cartHandler);\r\n\r\n  //7 Get Checkout Button and listen to CLick\r\n  if (checkoutButtons.length > 0)\r\n    checkoutButtons.forEach((checkout) =>\r\n      checkout.addEventListener('click', checkoutHandler)\r\n    );\r\n\r\n  //7 Check if there is a Redirect Link, if true redirect\r\n  checkRedirect();\r\n};\r\n\n\n//# sourceURL=webpack://template/./src/js/controllers/productController.js?");

/***/ }),

/***/ "./src/js/controllers/queryController.js":
/*!***********************************************!*\
  !*** ./src/js/controllers/queryController.js ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"getFilter\": () => /* binding */ getFilter,\n/* harmony export */   \"queryListener\": () => /* binding */ queryListener\n/* harmony export */ });\n/* harmony import */ var _utils_Variables__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./../utils/Variables */ \"./src/js/utils/Variables.js\");\n\r\n\r\nconst { productRoute } = _utils_Variables__WEBPACK_IMPORTED_MODULE_0__.paramsMethod;\r\n\r\nconst getIndex = (originalFilter, type) => {\r\n  let idx;\r\n\r\n  originalFilter.forEach((filter, i) => {\r\n    const includes = filter.includes(type);\r\n    includes ? (idx = i) : undefined;\r\n  });\r\n\r\n  return idx;\r\n};\r\n\r\nconst getFilter = (oldLink, filter, checked) => {\r\n  //& Check if there is no older filter => Base Case and it's Checked\r\n  const firstFilter = oldLink[1].length < 2;\r\n\r\n  //& Get old filter\r\n  let [, oldFilter] = oldLink;\r\n  const [type] = filter.split('=');\r\n\r\n  //& Check Paging and remove it, if only the paginate is not the target\r\n  const pageReg = /(\\?|&)?page=[-0-9]+/g;\r\n  const paginate = filter.includes('page');\r\n\r\n  if (!paginate) oldFilter = oldFilter.replace(pageReg, '');\r\n\r\n  if (firstFilter && checked) return `${productRoute}?${filter}`;\r\n\r\n  //) Check if the same filter to replace Or add the new filter to the old filter\r\n  const sameFilter = oldLink.join('?').includes(type);\r\n\r\n  if (sameFilter) {\r\n    //= Check if filter is Price\r\n    const priceFilter = filter.includes('price');\r\n\r\n    if (priceFilter) {\r\n      //) Replace the Old filter with the new one\r\n      let defaultFilter = oldFilter.replace(\r\n        /(\\?|&)?price\\[(gte|lte)\\]=[-0-9]+&?/g,\r\n        ''\r\n      );\r\n      if (checked) defaultFilter = defaultFilter.concat(`&${filter}`);\r\n\r\n      const newFilter = defaultFilter !== '' ? `?${defaultFilter}` : '';\r\n\r\n      //) Return the filter\r\n      return `${productRoute}${newFilter}`;\r\n    }\r\n\r\n    //) Get All the filters\r\n    const oldFilters = oldFilter.split('&');\r\n\r\n    //) Get the Old Filter Index\r\n    const oldFiltersIndex = getIndex(oldFilters, type);\r\n\r\n    //) Replace the Old filter\r\n    if (checked) oldFilters[oldFiltersIndex] = filter;\r\n    if (!checked) oldFilters.splice(oldFiltersIndex, 1);\r\n\r\n    const newFilter = oldFilters.length > 0 ? `?${oldFilters.join('&')}` : '';\r\n\r\n    //) Return the new filter\r\n    return `${productRoute}${newFilter}`;\r\n  }\r\n\r\n  const old = oldFilter !== '' ? `?${oldFilter}&` : '?';\r\n\r\n  return `${productRoute}${old}${filter}`;\r\n};\r\n\r\nconst queryHandler = (e) => {\r\n  //) Prevent Reload\r\n  // e.preventDefault();\r\n\r\n  //) Get clicked query filter\r\n  const { id, baseURI, checked } = e.path[0];\r\n  const oldFilter = baseURI.split(/\\/products\\#?\\??/g);\r\n\r\n  //) Get the filter link\r\n  const link = getFilter(oldFilter, id, checked);\r\n\r\n  //) Change the link dinamicly\r\n  if (link) location.href = link;\r\n};\r\n\r\nconst queryListener = (el) => {\r\n  if (el) el.addEventListener('click', queryHandler);\r\n};\r\n\n\n//# sourceURL=webpack://template/./src/js/controllers/queryController.js?");

/***/ }),

/***/ "./src/js/controllers/shopController.js":
/*!**********************************************!*\
  !*** ./src/js/controllers/shopController.js ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"searchController\": () => /* binding */ searchController,\n/* harmony export */   \"queryController\": () => /* binding */ queryController,\n/* harmony export */   \"paginateController\": () => /* binding */ paginateController\n/* harmony export */ });\n/* harmony import */ var _utils_Variables__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./../utils/Variables */ \"./src/js/utils/Variables.js\");\n/* harmony import */ var _headerController__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./headerController */ \"./src/js/controllers/headerController.js\");\n/* harmony import */ var _queryController__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./queryController */ \"./src/js/controllers/queryController.js\");\n/* harmony import */ var _view_paginationView__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./../view/paginationView */ \"./src/js/view/paginationView.js\");\n\r\n\r\n\r\n\r\n\r\nconst {\r\n  searchElements,\r\n  paginateElement,\r\n  products,\r\n  productPagination,\r\n  productsHidden,\r\n  results,\r\n  filterCheckmarks,\r\n  queries,\r\n} = _utils_Variables__WEBPACK_IMPORTED_MODULE_0__.elements;\r\nconst { paginationLimit } = _utils_Variables__WEBPACK_IMPORTED_MODULE_0__.preferences;\r\nconst { noProduct, renderAvailablePages } = _view_paginationView__WEBPACK_IMPORTED_MODULE_3__;\r\nconst { productNotFound } = _utils_Variables__WEBPACK_IMPORTED_MODULE_0__.messages;\r\nconst { hide, paginate, preview, rendered } = _utils_Variables__WEBPACK_IMPORTED_MODULE_0__.classnames;\r\n\r\nconst { previewProduct } = _utils_Variables__WEBPACK_IMPORTED_MODULE_0__.routes;\r\n\r\nconst callSearchandler = (e) => {\r\n  e.preventDefault();\r\n\r\n  //2 Get input\r\n  const input = document.getElementById('search__input');\r\n\r\n  (0,_headerController__WEBPACK_IMPORTED_MODULE_1__.searchHandler)(e, input);\r\n};\r\n\r\nconst searchListener = (search) => {\r\n  if (search) search.addEventListener('click', callSearchandler);\r\n};\r\n\r\nconst paginateHandler = (e) => {\r\n  e.preventDefault();\r\n\r\n  //* Get the wanted paginate\r\n  const { id, baseURI } = e.path[0];\r\n  const oldFilter = baseURI.split(/\\/products\\#?\\??/g);\r\n  const checked = true;\r\n\r\n  //* Get link\r\n  const link = (0,_queryController__WEBPACK_IMPORTED_MODULE_2__.getFilter)(oldFilter, id, checked);\r\n\r\n  //* Go to Link\r\n  if (link) location.href = link;\r\n};\r\n\r\nconst paginateListener = (paginate) => {\r\n  if (paginate) paginate.addEventListener('click', paginateHandler);\r\n};\r\n\r\nconst renderResultsNumber = (start, end, total, result) => {\r\n  //* Get the result element\r\n\r\n  //* Check if end is less than total, if false put: end = total\r\n  end = end > total ? total : end;\r\n\r\n  //* Render The element\r\n  result.innerText = `Showing ${start}– ${end} of ${total} results`;\r\n};\r\n\r\nconst renderProducts = (page, limit, total) => {\r\n  //* Get the current page, limit, total\r\n  //* Show the intervale: ] limit, (limit * 2) or total **IF TOTAL IS LESS THAN LIMIT * 2  ]\r\n\r\n  const start = (page - 1) * limit + 1;\r\n  const end = limit * page;\r\n\r\n  //) Check if there are enough products to show:\r\n\r\n  if (start > total) return noProduct(products[0], productNotFound);\r\n\r\n  //5 Write: Showing 1– 12 of 186 results\r\n  renderResultsNumber(start, end, total, results[0]);\r\n\r\n  //5 Render Only needed Products\r\n  for (let n = start - 1; n < end; n++) {\r\n    const product = productsHidden[n];\r\n    if (product) {\r\n      product.classList.remove(hide);\r\n      product.classList.add('rendered');\r\n    }\r\n  }\r\n};\r\n\r\nconst paginateNumber = (paginateElement, limit) => {\r\n  //* Get Total Number\r\n  const number = paginateElement[0].innerText;\r\n  //* (5) [\"Length:\", \"7\", \"And\", \"Page:\", \"2\"] => Output: length = 7, page = 2, the ',' is to skip variable: Array Destructuring\r\n  let [, length, , , page] = number.split(' ');\r\n\r\n  //* Check if page is specified, if not return 1\r\n  page = page !== '' ? parseInt(page) : 1;\r\n\r\n  //) Check if There is no length: If true: Render No Product Found.\r\n  const found = length > 0;\r\n  if (!found) return noProduct(products[0], productNotFound);\r\n\r\n  //4 Render Products according to the page request: '/products?page=2' render from 12 to last 14\r\n  renderProducts(page, limit, length);\r\n\r\n  //) Check if There is no page specified (1 by default) And Length < Limit: If true: Don't render Pagination\r\n  if (!page && length <= limit) return;\r\n\r\n  //) Check if the available pages are less than 5, if true: render less than 5 pages availabe\r\n  const availablePages = Math.ceil(length / limit);\r\n  return renderAvailablePages(productPagination[0], availablePages, page);\r\n};\r\n\r\nconst getPreviewClass = (event) => {\r\n  const className = event.target.getAttribute('class');\r\n\r\n  const include = className ? className.includes(preview) : false;\r\n\r\n  return include;\r\n};\r\n\r\nconst getSlug = (event) => event.srcElement.attributes.slug.value;\r\n\r\nconst previewHandler = (e) => {\r\n  //) Prevent default reaction\r\n  e.preventDefault();\r\n\r\n  //) Check if targeted button is the product preview picutre\r\n  const targeted = getPreviewClass(e);\r\n  if (!targeted) return;\r\n\r\n  //) If targeted, then redirect to /products/:slug\r\n  const slug = getSlug(e);\r\n  if (slug) location.href = `${previewProduct}${slug}`;\r\n};\r\n\r\nconst previewListener = (preview) => {\r\n  if (preview) preview.addEventListener('click', previewHandler);\r\n};\r\n\r\nconst renderCheckmark = (queries, filterCheckmarks) => {\r\n  const totalQuery = queries.innerText;\r\n\r\n  filterCheckmarks.forEach((filter) => {\r\n    const { id } = filter;\r\n    const check = totalQuery.includes(id);\r\n    filter.checked = check;\r\n  });\r\n};\r\n\r\nconst searchController = () => {\r\n  searchElements.forEach((element) => searchListener(element));\r\n};\r\n\r\nconst queryController = () => {\r\n  //* Render checked status\r\n  if (queries) renderCheckmark(queries, filterCheckmarks);\r\n\r\n  //* Listen To Queries Clicked\r\n  filterCheckmarks.forEach((checkmark) => (0,_queryController__WEBPACK_IMPORTED_MODULE_2__.queryListener)(checkmark));\r\n\r\n  //* Listen To Peview click\r\n  const productPreviews = document.querySelectorAll(`.${rendered}`);\r\n  productPreviews.forEach((preview) => previewListener(preview));\r\n};\r\n\r\nconst paginateController = () => {\r\n  //* Render Paginate Numbers and pass the Paginate element and pagination Limit\r\n  if (paginateElement[0]) paginateNumber(paginateElement, paginationLimit);\r\n\r\n  //* Listen for Paginate Click\r\n  const paginates = document.querySelectorAll(`.${paginate}`);\r\n  paginates.forEach((paginate) => paginateListener(paginate));\r\n};\r\n\n\n//# sourceURL=webpack://template/./src/js/controllers/shopController.js?");

/***/ }),

/***/ "./src/js/index.js":
/*!*************************!*\
  !*** ./src/js/index.js ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _utils_Variables__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils/Variables */ \"./src/js/utils/Variables.js\");\n/* harmony import */ var _controllers_headerController__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./controllers/headerController */ \"./src/js/controllers/headerController.js\");\n/* harmony import */ var _controllers_shopController__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./controllers/shopController */ \"./src/js/controllers/shopController.js\");\n/* harmony import */ var _controllers_productController__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./controllers/productController */ \"./src/js/controllers/productController.js\");\n//) Import elements\r\n\r\n\r\n\r\n\r\n\r\n\r\n//6 Clear the Console\r\nconsole.clear();\r\n\r\n//4 Get Variables\r\nconst { carts, likes, search } = _utils_Variables__WEBPACK_IMPORTED_MODULE_0__.elements;\r\n\r\n//2 Initializer\r\nconst init = () => {\r\n  //* HomePage Controller: '/'\r\n  //2 Call Go to cart controller\r\n  if (carts) (0,_controllers_headerController__WEBPACK_IMPORTED_MODULE_1__.cartController)(carts);\r\n\r\n  //2 Call Go to Like Controller\r\n  if (likes) (0,_controllers_headerController__WEBPACK_IMPORTED_MODULE_1__.likeController)(likes);\r\n\r\n  //2 Call Search Controller\r\n  if (search) (0,_controllers_headerController__WEBPACK_IMPORTED_MODULE_1__.searchController)(search);\r\n\r\n  //* Shop page: '/shop' Controller\r\n  //2 Call search Controller\r\n  _controllers_shopController__WEBPACK_IMPORTED_MODULE_2__.searchController();\r\n\r\n  //2 Call Paginate Controller\r\n  _controllers_shopController__WEBPACK_IMPORTED_MODULE_2__.paginateController();\r\n\r\n  //2 Call Query controller\r\n  _controllers_shopController__WEBPACK_IMPORTED_MODULE_2__.queryController();\r\n\r\n  //* Product page: '/product/:slug'. Cart Preview page: '/shop/cart'\r\n  //2 Call Cart Controller\r\n  _controllers_productController__WEBPACK_IMPORTED_MODULE_3__.cartController();\r\n};\r\n\r\ninit();\r\n\n\n//# sourceURL=webpack://template/./src/js/index.js?");

/***/ }),

/***/ "./src/js/main.js":
/*!************************!*\
  !*** ./src/js/main.js ***!
  \************************/
/***/ (() => {

"use strict";
eval("/*  ---------------------------------------------------\n    Template Name: Male Fashion\n    Description: Male Fashion - ecommerce teplate\n    Author: Colorib\n    Author URI: https://www.colorib.com/\n    Version: 1.0\n    Created: Colorib\n---------------------------------------------------------  */\n\n\n\n(function ($) {\n  /*------------------\n        Preloader\n    --------------------*/\n  $(window).on('load', function () {\n    $('.loader').fadeOut();\n    $('#preloder').delay(200).fadeOut('slow');\n\n    /*------------------\n            Gallery filter\n        --------------------*/\n    $('.filter__controls li').on('click', function () {\n      $('.filter__controls li').removeClass('active');\n      $(this).addClass('active');\n    });\n    if ($('.product__filter').length > 0) {\n      var containerEl = document.querySelector('.product__filter');\n      var mixer = mixitup(containerEl);\n    }\n  });\n\n  /*------------------\n        Background Set\n    --------------------*/\n  $('.set-bg').each(function () {\n    var bg = $(this).data('setbg');\n    $(this).css('background-image', 'url(' + bg + ')');\n  });\n\n  //Search Switch\n  $('.search-switch').on('click', function () {\n    $('.search-model').fadeIn(400);\n  });\n\n  $('.search-close-switch').on('click', function () {\n    $('.search-model').fadeOut(400, function () {\n      $('#search-input').val('');\n    });\n  });\n\n  /*------------------\n\t\tNavigation\n\t--------------------*/\n  $('.mobile-menu').slicknav({\n    prependTo: '#mobile-menu-wrap',\n    allowParentLinks: true,\n  });\n\n  /*------------------\n        Accordin Active\n    --------------------*/\n  $('.collapse').on('shown.bs.collapse', function () {\n    $(this).prev().addClass('active');\n  });\n\n  $('.collapse').on('hidden.bs.collapse', function () {\n    $(this).prev().removeClass('active');\n  });\n\n  //Canvas Menu\n  $('.canvas__open').on('click', function () {\n    $('.offcanvas-menu-wrapper').addClass('active');\n    $('.offcanvas-menu-overlay').addClass('active');\n  });\n\n  $('.offcanvas-menu-overlay').on('click', function () {\n    $('.offcanvas-menu-wrapper').removeClass('active');\n    $('.offcanvas-menu-overlay').removeClass('active');\n  });\n\n  /*-----------------------\n        Hero Slider\n    ------------------------*/\n  $('.hero__slider').owlCarousel({\n    loop: true,\n    margin: 0,\n    items: 1,\n    dots: false,\n    nav: true,\n    navText: [\n      \"<span class='arrow_left'><span/>\",\n      \"<span class='arrow_right'><span/>\",\n    ],\n    animateOut: 'fadeOut',\n    animateIn: 'fadeIn',\n    smartSpeed: 1200,\n    autoHeight: false,\n    autoplay: false,\n  });\n\n  /*--------------------------\n        Select\n    ----------------------------*/\n  $('select').niceSelect();\n\n  /*-------------------\n\t\tRadio Btn\n\t--------------------- */\n  $(\n    '.product__color__select label, .shop__sidebar__size label, .product__details__option__size label'\n  ).on('click', function () {\n    $(\n      '.product__color__select label, .shop__sidebar__size label, .product__details__option__size label'\n    ).removeClass('active');\n    $(this).addClass('active');\n  });\n\n  /*-------------------\n\t\tScroll\n\t--------------------- */\n  $('.nice-scroll').niceScroll({\n    cursorcolor: '#0d0d0d',\n    cursorwidth: '5px',\n    background: '#e5e5e5',\n    cursorborder: '',\n    autohidemode: true,\n    horizrailenabled: false,\n  });\n\n  /*------------------\n        CountDown\n    --------------------*/\n  // For demo preview start\n  var today = new Date();\n  var dd = String(today.getDate()).padStart(2, '0');\n  var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!\n  var yyyy = today.getFullYear();\n\n  if (mm == 12) {\n    mm = '01';\n    yyyy = yyyy + 1;\n  } else {\n    mm = parseInt(mm) + 1;\n    mm = String(mm).padStart(2, '0');\n  }\n  var timerdate = mm + '/' + dd + '/' + yyyy;\n  // For demo preview end\n\n  // Uncomment below and use your date //\n\n  /* var timerdate = \"2020/12/30\" */\n\n  $('#countdown').countdown(timerdate, function (event) {\n    $(this).html(\n      event.strftime(\n        \"<div class='cd-item'><span>%D</span> <p>Days</p> </div>\" +\n          \"<div class='cd-item'><span>%H</span> <p>Hours</p> </div>\" +\n          \"<div class='cd-item'><span>%M</span> <p>Minutes</p> </div>\" +\n          \"<div class='cd-item'><span>%S</span> <p>Seconds</p> </div>\"\n      )\n    );\n  });\n\n  /*------------------\n\t\tMagnific\n\t--------------------*/\n  $('.video-popup').magnificPopup({\n    type: 'iframe',\n  });\n\n  /*-------------------\n\t\tQuantity change\n\t--------------------- */\n  var proQty = $('.pro-qty');\n  proQty.prepend('<span class=\"fa fa-angle-down dec qtybtn\"></span>');\n  proQty.append('<span class=\"fa fa-angle-up inc qtybtn\"></span>');\n  proQty.on('click', '.qtybtn', function () {\n    var $button = $(this);\n    var oldValue = $button.parent().find('input').val();\n    if ($button.hasClass('inc')) {\n      var newVal = parseFloat(oldValue) + 1;\n    } else {\n      // Don't allow decrementing below zero\n      if (oldValue > 0) {\n        var newVal = parseFloat(oldValue) - 1;\n      } else {\n        newVal = 0;\n      }\n    }\n    $button.parent().find('input').val(newVal);\n  });\n\n  var proQty = $('.pro-qty-2');\n  proQty.prepend('<span class=\"fa fa-angle-left dec qtybtn\"></span>');\n  proQty.append('<span class=\"fa fa-angle-right inc qtybtn\"></span>');\n  proQty.on('click', '.qtybtn', function () {\n    var $button = $(this);\n    var oldValue = $button.parent().find('input').val();\n    if ($button.hasClass('inc')) {\n      var newVal = parseFloat(oldValue) + 1;\n    } else {\n      // Don't allow decrementing below zero\n      if (oldValue > 0) {\n        var newVal = parseFloat(oldValue) - 1;\n      } else {\n        newVal = 0;\n      }\n    }\n    $button.parent().find('input').val(newVal);\n  });\n\n  /*------------------\n        Achieve Counter\n    --------------------*/\n  $('.cn_num').each(function () {\n    $(this)\n      .prop('Counter', 0)\n      .animate(\n        {\n          Counter: $(this).text(),\n        },\n        {\n          duration: 4000,\n          easing: 'swing',\n          step: function (now) {\n            $(this).text(Math.ceil(now));\n          },\n        }\n      );\n  });\n})(jQuery);\n\n\n//# sourceURL=webpack://template/./src/js/main.js?");

/***/ }),

/***/ "./src/js/models/Carts.js":
/*!********************************!*\
  !*** ./src/js/models/Carts.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"getCartElements\": () => /* binding */ getCartElements,\n/* harmony export */   \"addProductToCart\": () => /* binding */ addProductToCart,\n/* harmony export */   \"getCartId\": () => /* binding */ getCartId\n/* harmony export */ });\n/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! axios */ \"./node_modules/axios/index.js\");\n/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _controllers_errorController__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./../controllers/errorController */ \"./src/js/controllers/errorController.js\");\n/* harmony import */ var _utils_Variables__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./../utils/Variables */ \"./src/js/utils/Variables.js\");\n\r\n\r\n\r\n\r\n\r\nconst { isLoggedIn, addCart, getCartLink } = _utils_Variables__WEBPACK_IMPORTED_MODULE_2__.routes;\r\nconst { productId } = _utils_Variables__WEBPACK_IMPORTED_MODULE_2__.elements;\r\nconst { productQuantiy } = _utils_Variables__WEBPACK_IMPORTED_MODULE_2__.classnames;\r\n\r\nconst getLoggedIn = async () => {\r\n  const res = await axios__WEBPACK_IMPORTED_MODULE_0___default().get(isLoggedIn);\r\n  const { loggedIn } = res.data;\r\n  return loggedIn;\r\n};\r\n\r\nconst getProductForCart = () => {\r\n  let product;\r\n\r\n  if (productId.length > 0) product = productId[0].innerHTML;\r\n\r\n  return product;\r\n};\r\n\r\nconst getCartElements = async (e) => {\r\n  //* Check if Logged in.\r\n  const loggedIn = await getLoggedIn();\r\n\r\n  //* Get Product ID,\r\n  const product = getProductForCart();\r\n\r\n  //* Get Quantity\r\n  const quantity = document.querySelector(`.${productQuantiy}`)\r\n    ? parseInt(document.querySelector(`.${productQuantiy}`).value)\r\n    : undefined;\r\n\r\n  return {\r\n    loggedIn,\r\n    product,\r\n    quantity,\r\n  };\r\n};\r\n\r\nconst addProductToCart = async (elements) => {\r\n  const { product, quantity } = elements;\r\n  const data = {\r\n    product: {\r\n      id: product,\r\n      quantity: quantity > 0 ? quantity : 1,\r\n    },\r\n  };\r\n\r\n  return await axios__WEBPACK_IMPORTED_MODULE_0___default().patch(addCart, data);\r\n};\r\n\r\nconst getCartId = async () => {\r\n  try {\r\n    const res = await axios__WEBPACK_IMPORTED_MODULE_0___default().get(getCartLink);\r\n    const id = res.data.cart._id;\r\n    return id;\r\n  } catch (error) {\r\n    console.error(error);\r\n  }\r\n};\r\n\n\n//# sourceURL=webpack://template/./src/js/models/Carts.js?");

/***/ }),

/***/ "./src/js/utils/Variables.js":
/*!***********************************!*\
  !*** ./src/js/utils/Variables.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"elements\": () => /* binding */ elements,\n/* harmony export */   \"preferences\": () => /* binding */ preferences,\n/* harmony export */   \"messages\": () => /* binding */ messages,\n/* harmony export */   \"classnames\": () => /* binding */ classnames,\n/* harmony export */   \"routes\": () => /* binding */ routes,\n/* harmony export */   \"paramsMethod\": () => /* binding */ paramsMethod\n/* harmony export */ });\nconst els = [\r\n  'categories=men',\r\n  'categories=women',\r\n  'categories=bags',\r\n  'categories=clothing',\r\n  'categories=accessories',\r\n  'categories=kids',\r\n  'categories=shoes',\r\n  'brand=louisVuitton',\r\n  'brand=chanel',\r\n  'brand=hermes',\r\n  'brand=gucci',\r\n  'price[gte]=0&price[lte]=50',\r\n  'price[gte]=50&price[lte]=100',\r\n  'price[gte]=100&price[lte]=150',\r\n  'price[gte]=150&price[lte]=200',\r\n  'price[gte]=200&price[lte]=250',\r\n  'price[gte]=50',\r\n];\r\n\r\nconst elements = {\r\n  filter: {},\r\n  carts: document.querySelectorAll('.cart'),\r\n  likes: document.querySelectorAll('.like'),\r\n  search: document.querySelectorAll('.search-switch'),\r\n  searchElements: document.querySelectorAll('.search'),\r\n  paginateElement: document.querySelectorAll('.paginate__number'),\r\n  products: document.querySelectorAll('.products__render'),\r\n  productPagination: document.querySelectorAll('.product__pagination'),\r\n  productsHidden: document.querySelectorAll('.product'),\r\n  results: document.querySelectorAll('.resultsNumber'),\r\n  filterCheckmarks: document.querySelectorAll('.filter'),\r\n  queries: document.getElementById('queries'),\r\n  addToCart: document.querySelectorAll('.addToCart'),\r\n  productId: document.querySelectorAll('.product__id'),\r\n  alert: document.querySelectorAll('.alert'),\r\n  checkoutButtons: document.querySelectorAll('.checkout'),\r\n};\r\n\r\nconst preferences = {\r\n  paginationLimit: 12,\r\n};\r\n\r\nconst messages = {\r\n  productNotFound: 'Sorry No Product was found !',\r\n  productAddedToCart: 'PRODUCT ADDED TO CART SUCCESSFULLY',\r\n  orderAddedSuccessfully: 'Order Placed succesfully, Thanks for your purchase',\r\n};\r\n\r\nconst classnames = {\r\n  hide: 'hide',\r\n  preview: 'product__item__pic',\r\n  paginate: 'paginate',\r\n  rendered: 'rendered',\r\n  productQuantiy: 'product__quantity',\r\n  success: 'success',\r\n  quantityButton: 'qtybtn',\r\n  spinner: '__loading__spinner',\r\n  checkoutAlert: '__alert',\r\n};\r\n\r\nels.forEach((key) => {\r\n  elements.filter[key] = document.getElementById(key);\r\n});\r\n\r\nconst routes = {\r\n  checkout: '/checkout',\r\n  likes: '/likes',\r\n  search: '/products?search_query=',\r\n  previewProduct: '/products/',\r\n  isLoggedIn: '/api/v1/auth/loggedIn',\r\n  addCart: '/api/v1/carts/product',\r\n  login: '/login',\r\n  getCartLink: '/api/v1/carts/cart',\r\n  addOrderLink: '/api/v1/orders/new',\r\n};\r\n\r\nconst paramsMethod = {\r\n  productRoute: '/products',\r\n};\r\n\n\n//# sourceURL=webpack://template/./src/js/utils/Variables.js?");

/***/ }),

/***/ "./src/js/view/paginationView.js":
/*!***************************************!*\
  !*** ./src/js/view/paginationView.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"noProduct\": () => /* binding */ noProduct,\n/* harmony export */   \"renderAvailablePages\": () => /* binding */ renderAvailablePages\n/* harmony export */ });\n//* Render There was no product found\r\nconst noProduct = (element, message) => {\r\n  const markup = `\r\n    \r\n    <h1> ${message} <h1>\r\n    \r\n    `;\r\n\r\n  element.insertAdjacentHTML('afterbegin', markup);\r\n};\r\n\r\n//* Render available Pages buttons\r\nconst renderAvailablePages = (element, number, active) => {\r\n  //2 Initialize how many times I should render the paginate element\r\n  let times = [];\r\n  times.length = number;\r\n\r\n  let str = '';\r\n\r\n  for (let i = 1; i <= number; i++) {\r\n    str = str.replace(\r\n      str,\r\n      `${str} <a href=\"#\" class=\"paginate ${\r\n        i == active ? 'active' : ''\r\n      }\" id=\"page=${i}\" >${i}</a>`\r\n    );\r\n  }\r\n\r\n  let markup = `\r\n  <div class=\"row\">\r\n      <div class=\"col-lg-12\">\r\n          <div class=\"product__pagination\">\r\n                TEMPLATE\r\n          </div>\r\n      </div>\r\n  </div>\r\n  `;\r\n\r\n  markup = markup.replace('TEMPLATE', str);\r\n\r\n  element.insertAdjacentHTML('afterbegin', markup);\r\n};\r\n\n\n//# sourceURL=webpack://template/./src/js/view/paginationView.js?");

/***/ }),

/***/ "./src/js/view/viewBase.js":
/*!*********************************!*\
  !*** ./src/js/view/viewBase.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"loading\": () => /* binding */ loading,\n/* harmony export */   \"renderSuccess\": () => /* binding */ renderSuccess\n/* harmony export */ });\n/* harmony import */ var _utils_Variables__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./../utils/Variables */ \"./src/js/utils/Variables.js\");\n\r\n\r\nconst { hide } = _utils_Variables__WEBPACK_IMPORTED_MODULE_0__.classnames;\r\n\r\nconst loading = (button, loading) => {\r\n  //* Hide the Button\r\n  if (button) button.classList.add(hide);\r\n\r\n  //* Show the loading\r\n  if (loading) loading.classList.remove(hide);\r\n};\r\n\r\nconst hideElement = (element) =>\r\n  element ? element.classList.add(hide) : undefined;\r\n\r\nconst getMarkup = (element, type, message) => {\r\n  if (element) {\r\n    const classname = `alert-${type}`;\r\n    //5 Put the Class\r\n    element.classList.add(classname);\r\n    element.classList.remove(hide);\r\n\r\n    //5 Replace the template with the message\r\n    element.innerText = message;\r\n  }\r\n};\r\n\r\nconst renderAlert = (alert) => {\r\n  //) Get the Type and message\r\n  const { type, message, box } = alert;\r\n\r\n  //) Show the box with the appropriate properties\r\n  getMarkup(box, type, message);\r\n\r\n  //) Hide the Box after  seconds\r\n  window.setTimeout(function () {\r\n    hideElement(box);\r\n  }, 3000);\r\n};\r\n\r\nconst renderSuccess = (loading, button, alert, inital = false) => {\r\n  //* Hide the loading\r\n  if (loading) loading.classList.add(hide);\r\n\r\n  //* Show the Button\r\n  if (button && !inital) button.classList.remove(hide);\r\n\r\n  //* Render Alert-success box\r\n  renderAlert(alert);\r\n\r\n  //* Reload After 3 Seconds\r\n  window.setTimeout(function () {\r\n    location.reload();\r\n  }, 3000);\r\n};\r\n\n\n//# sourceURL=webpack://template/./src/js/view/viewBase.js?");

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
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => module['default'] :
/******/ 				() => module;
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
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