"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(() => {
var exports = {};
exports.id = "pages/api/user/[email]";
exports.ids = ["pages/api/user/[email]"];
exports.modules = {

/***/ "mongoose":
/*!***************************!*\
  !*** external "mongoose" ***!
  \***************************/
/***/ ((module) => {

module.exports = require("mongoose");

/***/ }),

/***/ "(api)/./lib/mongoose.js":
/*!*************************!*\
  !*** ./lib/mongoose.js ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! mongoose */ \"mongoose\");\n/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(mongoose__WEBPACK_IMPORTED_MODULE_0__);\n\nconst uri = process.env.MONGODB_URI;\nconst connectDB = async ()=>{\n    try {\n        const connection = await mongoose__WEBPACK_IMPORTED_MODULE_0___default().connect(uri, {\n            useNewUrlParser: true,\n            useUnifiedTopology: true\n        });\n        console.log(`Connected to MongoDB! ${connection.connection.host}`);\n    } catch (e) {\n        console.error(`Error connecting to MongoDB: ${e.message}`);\n        process.exit(1);\n    }\n};\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (connectDB);\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwaSkvLi9saWIvbW9uZ29vc2UuanMuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQWdDO0FBRWhDLE1BQU1DLE1BQU1DLFFBQVFDLEdBQUcsQ0FBQ0MsV0FBVztBQUVuQyxNQUFNQyxZQUFZLFVBQVk7SUFDNUIsSUFBSTtRQUNGLE1BQU1DLGFBQWEsTUFBTU4sdURBQWdCLENBQUNDLEtBQUs7WUFDN0NPLGlCQUFpQixJQUFJO1lBQ3JCQyxvQkFBb0IsSUFBSTtRQUMxQjtRQUNBQyxRQUFRQyxHQUFHLENBQUMsQ0FBQyxzQkFBc0IsRUFBRUwsV0FBV0EsVUFBVSxDQUFDTSxJQUFJLENBQUMsQ0FBQztJQUNuRSxFQUFFLE9BQU9DLEdBQUc7UUFDVkgsUUFBUUksS0FBSyxDQUFDLENBQUMsNkJBQTZCLEVBQUVELEVBQUVFLE9BQU8sQ0FBQyxDQUFDO1FBQ3pEYixRQUFRYyxJQUFJLENBQUM7SUFDZjtBQUNGO0FBRUEsaUVBQWVYLFNBQVNBLEVBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9saWZlcnBnLy4vbGliL21vbmdvb3NlLmpzPzE2M2QiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IG1vbmdvb3NlIGZyb20gJ21vbmdvb3NlJztcclxuXHJcbmNvbnN0IHVyaSA9IHByb2Nlc3MuZW52Lk1PTkdPREJfVVJJO1xyXG5cclxuY29uc3QgY29ubmVjdERCID0gYXN5bmMgKCkgPT4ge1xyXG4gIHRyeSB7XHJcbiAgICBjb25zdCBjb25uZWN0aW9uID0gYXdhaXQgbW9uZ29vc2UuY29ubmVjdCh1cmksIHtcclxuICAgICAgdXNlTmV3VXJsUGFyc2VyOiB0cnVlLFxyXG4gICAgICB1c2VVbmlmaWVkVG9wb2xvZ3k6IHRydWUsXHJcbiAgICB9KTtcclxuICAgIGNvbnNvbGUubG9nKGBDb25uZWN0ZWQgdG8gTW9uZ29EQiEgJHtjb25uZWN0aW9uLmNvbm5lY3Rpb24uaG9zdH1gKTtcclxuICB9IGNhdGNoIChlKSB7XHJcbiAgICBjb25zb2xlLmVycm9yKGBFcnJvciBjb25uZWN0aW5nIHRvIE1vbmdvREI6ICR7ZS5tZXNzYWdlfWApO1xyXG4gICAgcHJvY2Vzcy5leGl0KDEpO1xyXG4gIH1cclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNvbm5lY3REQjtcclxuIl0sIm5hbWVzIjpbIm1vbmdvb3NlIiwidXJpIiwicHJvY2VzcyIsImVudiIsIk1PTkdPREJfVVJJIiwiY29ubmVjdERCIiwiY29ubmVjdGlvbiIsImNvbm5lY3QiLCJ1c2VOZXdVcmxQYXJzZXIiLCJ1c2VVbmlmaWVkVG9wb2xvZ3kiLCJjb25zb2xlIiwibG9nIiwiaG9zdCIsImUiLCJlcnJvciIsIm1lc3NhZ2UiLCJleGl0Il0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(api)/./lib/mongoose.js\n");

/***/ }),

/***/ "(api)/./models/User.js":
/*!************************!*\
  !*** ./models/User.js ***!
  \************************/
/***/ ((module, exports, __webpack_require__) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({\n    value: true\n}));\nconst _interop_require_wildcard = __webpack_require__(/*! @swc/helpers/_/_interop_require_wildcard */ \"(api)/./node_modules/@swc/helpers/cjs/_interop_require_wildcard.cjs\");\nconst _mongoose = /*#__PURE__*/ _interop_require_wildcard._(__webpack_require__(/*! mongoose */ \"mongoose\"));\nconst UserSchema = new _mongoose.Schema({\n    email: {\n        type: String,\n        require: true\n    },\n    name: {\n        type: String,\n        require: true\n    }\n});\nlet User;\ntry {\n    User = _mongoose.default.model(\"User\");\n} catch (e) {\n    User = _mongoose.default.model(\"User\", UserSchema);\n}\nmodule.exports = {\n    User\n};\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwaSkvLi9tb2RlbHMvVXNlci5qcy5qcyIsIm1hcHBpbmdzIjoiOzs7OztnRkFBaUM7QUFFakMsTUFBTUEsYUFBYSxJQUFJQyxnQkFBTSxDQUFDO0lBQzVCQyxPQUFPO1FBQ0xDLE1BQU1DO1FBQ05DLFNBQVMsSUFBSTtJQUNmO0lBQ0FDLE1BQU07UUFDSkgsTUFBTUM7UUFDTkMsU0FBUyxJQUFJO0lBQ2Y7QUFDRjtBQUVBLElBQUlFO0FBRUosSUFBSTtJQUNGQSxPQUFPQyxpQkFBUSxDQUFDQyxLQUFLLENBQUM7QUFDeEIsRUFBRSxPQUFPQyxHQUFHO0lBQ1ZILE9BQU9DLGlCQUFRLENBQUNDLEtBQUssQ0FBQyxRQUFRVDtBQUNoQztBQUVBVyxPQUFPQyxPQUFPLEdBQUc7SUFBRUw7QUFBSyIsInNvdXJjZXMiOlsid2VicGFjazovL2xpZmVycGcvLi9tb2RlbHMvVXNlci5qcz83MzY3Il0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBtb25nb29zZSwgeyBTY2hlbWEgfSBmcm9tICdtb25nb29zZSc7XHJcblxyXG5jb25zdCBVc2VyU2NoZW1hID0gbmV3IFNjaGVtYSh7XHJcbiAgZW1haWw6IHtcclxuICAgIHR5cGU6IFN0cmluZyxcclxuICAgIHJlcXVpcmU6IHRydWUsXHJcbiAgfSxcclxuICBuYW1lOiB7XHJcbiAgICB0eXBlOiBTdHJpbmcsXHJcbiAgICByZXF1aXJlOiB0cnVlLFxyXG4gIH0sXHJcbn0pO1xyXG5cclxubGV0IFVzZXI7XHJcblxyXG50cnkge1xyXG4gIFVzZXIgPSBtb25nb29zZS5tb2RlbCgnVXNlcicpO1xyXG59IGNhdGNoIChlKSB7XHJcbiAgVXNlciA9IG1vbmdvb3NlLm1vZGVsKCdVc2VyJywgVXNlclNjaGVtYSk7XHJcbn1cclxuXHJcbm1vZHVsZS5leHBvcnRzID0geyBVc2VyIH07XHJcbiJdLCJuYW1lcyI6WyJVc2VyU2NoZW1hIiwiU2NoZW1hIiwiZW1haWwiLCJ0eXBlIiwiU3RyaW5nIiwicmVxdWlyZSIsIm5hbWUiLCJVc2VyIiwibW9uZ29vc2UiLCJtb2RlbCIsImUiLCJtb2R1bGUiLCJleHBvcnRzIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(api)/./models/User.js\n");

/***/ }),

/***/ "(api)/./pages/api/user/[email].js":
/*!***********************************!*\
  !*** ./pages/api/user/[email].js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _lib_mongoose__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/lib/mongoose */ \"(api)/./lib/mongoose.js\");\n/* harmony import */ var _models_User__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/models/User */ \"(api)/./models/User.js\");\n/* harmony import */ var _models_User__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_models_User__WEBPACK_IMPORTED_MODULE_1__);\n\n\nconst handle = async (req, res)=>{\n    const { method  } = req;\n    const { email  } = req.query;\n    await (0,_lib_mongoose__WEBPACK_IMPORTED_MODULE_0__[\"default\"])();\n    if (method === \"GET\") {\n        try {\n            const user = await _models_User__WEBPACK_IMPORTED_MODULE_1__.User.findOne({\n                email\n            });\n            res.send(user);\n        } catch (e) {\n            res.status(500).send(e);\n        }\n    }\n};\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (handle);\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwaSkvLi9wYWdlcy9hcGkvdXNlci9bZW1haWxdLmpzLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFBdUM7QUFDRjtBQUVyQyxNQUFNRSxTQUFTLE9BQU9DLEtBQUtDLE1BQVE7SUFDakMsTUFBTSxFQUFFQyxPQUFNLEVBQUUsR0FBR0Y7SUFDbkIsTUFBTSxFQUFFRyxNQUFLLEVBQUUsR0FBR0gsSUFBSUksS0FBSztJQUUzQixNQUFNUCx5REFBU0E7SUFFZixJQUFJSyxXQUFXLE9BQU87UUFDcEIsSUFBSTtZQUNGLE1BQU1HLE9BQU8sTUFBTVAsc0RBQVksQ0FBQztnQkFBRUs7WUFBTTtZQUN4Q0YsSUFBSU0sSUFBSSxDQUFDRjtRQUNYLEVBQUUsT0FBT0csR0FBRztZQUNWUCxJQUFJUSxNQUFNLENBQUMsS0FBS0YsSUFBSSxDQUFDQztRQUN2QjtJQUNGLENBQUM7QUFDSDtBQUVBLGlFQUFlVCxNQUFNQSxFQUFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vbGlmZXJwZy8uL3BhZ2VzL2FwaS91c2VyL1tlbWFpbF0uanM/YmFlNCJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgY29ubmVjdERCIGZyb20gJ0AvbGliL21vbmdvb3NlJztcclxuaW1wb3J0IHsgVXNlciB9IGZyb20gJ0AvbW9kZWxzL1VzZXInO1xyXG5cclxuY29uc3QgaGFuZGxlID0gYXN5bmMgKHJlcSwgcmVzKSA9PiB7XHJcbiAgY29uc3QgeyBtZXRob2QgfSA9IHJlcTtcclxuICBjb25zdCB7IGVtYWlsIH0gPSByZXEucXVlcnk7XHJcblxyXG4gIGF3YWl0IGNvbm5lY3REQigpO1xyXG5cclxuICBpZiAobWV0aG9kID09PSAnR0VUJykge1xyXG4gICAgdHJ5IHtcclxuICAgICAgY29uc3QgdXNlciA9IGF3YWl0IFVzZXIuZmluZE9uZSh7IGVtYWlsIH0pO1xyXG4gICAgICByZXMuc2VuZCh1c2VyKTtcclxuICAgIH0gY2F0Y2ggKGUpIHtcclxuICAgICAgcmVzLnN0YXR1cyg1MDApLnNlbmQoZSk7XHJcbiAgICB9XHJcbiAgfVxyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgaGFuZGxlO1xyXG4iXSwibmFtZXMiOlsiY29ubmVjdERCIiwiVXNlciIsImhhbmRsZSIsInJlcSIsInJlcyIsIm1ldGhvZCIsImVtYWlsIiwicXVlcnkiLCJ1c2VyIiwiZmluZE9uZSIsInNlbmQiLCJlIiwic3RhdHVzIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(api)/./pages/api/user/[email].js\n");

/***/ }),

/***/ "(api)/./node_modules/@swc/helpers/cjs/_interop_require_wildcard.cjs":
/*!*********************************************************************!*\
  !*** ./node_modules/@swc/helpers/cjs/_interop_require_wildcard.cjs ***!
  \*********************************************************************/
/***/ ((__unused_webpack_module, exports) => {

eval("\n\nfunction _getRequireWildcardCache(nodeInterop) {\n    if (typeof WeakMap !== \"function\") return null;\n\n    var cacheBabelInterop = new WeakMap();\n    var cacheNodeInterop = new WeakMap();\n\n    return (_getRequireWildcardCache = function(nodeInterop) {\n        return nodeInterop ? cacheNodeInterop : cacheBabelInterop;\n    })(nodeInterop);\n}\nexports._ = exports._interop_require_wildcard = _interop_require_wildcard;\nfunction _interop_require_wildcard(obj, nodeInterop) {\n    if (!nodeInterop && obj && obj.__esModule) return obj;\n    if (obj === null || typeof obj !== \"object\" && typeof obj !== \"function\") return { default: obj };\n\n    var cache = _getRequireWildcardCache(nodeInterop);\n\n    if (cache && cache.has(obj)) return cache.get(obj);\n\n    var newObj = {};\n    var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;\n\n    for (var key in obj) {\n        if (key !== \"default\" && Object.prototype.hasOwnProperty.call(obj, key)) {\n            var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;\n            if (desc && (desc.get || desc.set)) Object.defineProperty(newObj, key, desc);\n            else newObj[key] = obj[key];\n        }\n    }\n\n    newObj.default = obj;\n\n    if (cache) cache.set(obj, newObj);\n\n    return newObj;\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwaSkvLi9ub2RlX21vZHVsZXMvQHN3Yy9oZWxwZXJzL2Nqcy9faW50ZXJvcF9yZXF1aXJlX3dpbGRjYXJkLmNqcy5qcyIsIm1hcHBpbmdzIjoiQUFBYTs7QUFFYjtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBLFNBQVMsR0FBRyxpQ0FBaUM7QUFDN0M7QUFDQTtBQUNBLHVGQUF1Rjs7QUFFdkY7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vbGlmZXJwZy8uL25vZGVfbW9kdWxlcy9Ac3djL2hlbHBlcnMvY2pzL19pbnRlcm9wX3JlcXVpcmVfd2lsZGNhcmQuY2pzPzhhMWQiXSwic291cmNlc0NvbnRlbnQiOlsiXCJ1c2Ugc3RyaWN0XCI7XG5cbmZ1bmN0aW9uIF9nZXRSZXF1aXJlV2lsZGNhcmRDYWNoZShub2RlSW50ZXJvcCkge1xuICAgIGlmICh0eXBlb2YgV2Vha01hcCAhPT0gXCJmdW5jdGlvblwiKSByZXR1cm4gbnVsbDtcblxuICAgIHZhciBjYWNoZUJhYmVsSW50ZXJvcCA9IG5ldyBXZWFrTWFwKCk7XG4gICAgdmFyIGNhY2hlTm9kZUludGVyb3AgPSBuZXcgV2Vha01hcCgpO1xuXG4gICAgcmV0dXJuIChfZ2V0UmVxdWlyZVdpbGRjYXJkQ2FjaGUgPSBmdW5jdGlvbihub2RlSW50ZXJvcCkge1xuICAgICAgICByZXR1cm4gbm9kZUludGVyb3AgPyBjYWNoZU5vZGVJbnRlcm9wIDogY2FjaGVCYWJlbEludGVyb3A7XG4gICAgfSkobm9kZUludGVyb3ApO1xufVxuZXhwb3J0cy5fID0gZXhwb3J0cy5faW50ZXJvcF9yZXF1aXJlX3dpbGRjYXJkID0gX2ludGVyb3BfcmVxdWlyZV93aWxkY2FyZDtcbmZ1bmN0aW9uIF9pbnRlcm9wX3JlcXVpcmVfd2lsZGNhcmQob2JqLCBub2RlSW50ZXJvcCkge1xuICAgIGlmICghbm9kZUludGVyb3AgJiYgb2JqICYmIG9iai5fX2VzTW9kdWxlKSByZXR1cm4gb2JqO1xuICAgIGlmIChvYmogPT09IG51bGwgfHwgdHlwZW9mIG9iaiAhPT0gXCJvYmplY3RcIiAmJiB0eXBlb2Ygb2JqICE9PSBcImZ1bmN0aW9uXCIpIHJldHVybiB7IGRlZmF1bHQ6IG9iaiB9O1xuXG4gICAgdmFyIGNhY2hlID0gX2dldFJlcXVpcmVXaWxkY2FyZENhY2hlKG5vZGVJbnRlcm9wKTtcblxuICAgIGlmIChjYWNoZSAmJiBjYWNoZS5oYXMob2JqKSkgcmV0dXJuIGNhY2hlLmdldChvYmopO1xuXG4gICAgdmFyIG5ld09iaiA9IHt9O1xuICAgIHZhciBoYXNQcm9wZXJ0eURlc2NyaXB0b3IgPSBPYmplY3QuZGVmaW5lUHJvcGVydHkgJiYgT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcjtcblxuICAgIGZvciAodmFyIGtleSBpbiBvYmopIHtcbiAgICAgICAgaWYgKGtleSAhPT0gXCJkZWZhdWx0XCIgJiYgT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwga2V5KSkge1xuICAgICAgICAgICAgdmFyIGRlc2MgPSBoYXNQcm9wZXJ0eURlc2NyaXB0b3IgPyBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKG9iaiwga2V5KSA6IG51bGw7XG4gICAgICAgICAgICBpZiAoZGVzYyAmJiAoZGVzYy5nZXQgfHwgZGVzYy5zZXQpKSBPYmplY3QuZGVmaW5lUHJvcGVydHkobmV3T2JqLCBrZXksIGRlc2MpO1xuICAgICAgICAgICAgZWxzZSBuZXdPYmpba2V5XSA9IG9ialtrZXldO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgbmV3T2JqLmRlZmF1bHQgPSBvYmo7XG5cbiAgICBpZiAoY2FjaGUpIGNhY2hlLnNldChvYmosIG5ld09iaik7XG5cbiAgICByZXR1cm4gbmV3T2JqO1xufVxuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(api)/./node_modules/@swc/helpers/cjs/_interop_require_wildcard.cjs\n");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../../webpack-api-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = (__webpack_exec__("(api)/./pages/api/user/[email].js"));
module.exports = __webpack_exports__;

})();