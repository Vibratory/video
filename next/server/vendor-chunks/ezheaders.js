"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = "vendor-chunks/ezheaders";
exports.ids = ["vendor-chunks/ezheaders"];
exports.modules = {

/***/ "(action-browser)/./node_modules/ezheaders/dist/index.mjs":
/*!***********************************************!*\
  !*** ./node_modules/ezheaders/dist/index.mjs ***!
  \***********************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   cookie: () => (/* binding */ cookie),\n/* harmony export */   getCookies: () => (/* binding */ getCookies),\n/* harmony export */   getHeaders: () => (/* binding */ getHeaders),\n/* harmony export */   header: () => (/* binding */ header)\n/* harmony export */ });\n/* harmony import */ var next_headers__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/headers */ \"(action-browser)/./node_modules/next/dist/api/headers.js\");\n// src/headers.ts\n\nfunction createHeaderHelpers(headers = next_headers__WEBPACK_IMPORTED_MODULE_0__.headers) {\n  const header2 = async (...args) => {\n    const headerStrore = await headers();\n    return headerStrore.get(...args);\n  };\n  const getHeaders2 = async () => headers();\n  return { header: header2, getHeaders: getHeaders2 };\n}\nvar { header, getHeaders } = createHeaderHelpers();\n\n// src/cookies.ts\n\nfunction createCookieHelpers(cookies = next_headers__WEBPACK_IMPORTED_MODULE_0__.cookies) {\n  async function cookie2(...args) {\n    const [nameOrCookie, value, opts] = args;\n    const name = typeof nameOrCookie === \"string\" ? nameOrCookie : nameOrCookie.name;\n    const cookieStore = await cookies();\n    if (name && args.length >= 2) {\n      return cookieStore.set(name, value, opts);\n    }\n    return cookieStore.get(name);\n  }\n  const getCookies2 = async () => cookies();\n  return { cookie: cookie2, getCookies: getCookies2 };\n}\nvar { cookie, getCookies } = createCookieHelpers();\n\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFjdGlvbi1icm93c2VyKS8uL25vZGVfbW9kdWxlcy9lemhlYWRlcnMvZGlzdC9pbmRleC5tanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBQTtBQUNtRDtBQUNuRCx1Q0FBdUMsaURBQVE7QUFDL0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBLE1BQU0scUJBQXFCOztBQUUzQjtBQUNtRDtBQUNuRCx1Q0FBdUMsaURBQVE7QUFDL0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQSxNQUFNLHFCQUFxQjtBQU16QiIsInNvdXJjZXMiOlsiQzpcXFVzZXJzXFxUb3AgVGVjaFxcdmlkZW9cXG5vZGVfbW9kdWxlc1xcZXpoZWFkZXJzXFxkaXN0XFxpbmRleC5tanMiXSwic291cmNlc0NvbnRlbnQiOlsiLy8gc3JjL2hlYWRlcnMudHNcbmltcG9ydCB7IGhlYWRlcnMgYXMgX2hlYWRlcnMgfSBmcm9tIFwibmV4dC9oZWFkZXJzXCI7XG5mdW5jdGlvbiBjcmVhdGVIZWFkZXJIZWxwZXJzKGhlYWRlcnMgPSBfaGVhZGVycykge1xuICBjb25zdCBoZWFkZXIyID0gYXN5bmMgKC4uLmFyZ3MpID0+IHtcbiAgICBjb25zdCBoZWFkZXJTdHJvcmUgPSBhd2FpdCBoZWFkZXJzKCk7XG4gICAgcmV0dXJuIGhlYWRlclN0cm9yZS5nZXQoLi4uYXJncyk7XG4gIH07XG4gIGNvbnN0IGdldEhlYWRlcnMyID0gYXN5bmMgKCkgPT4gaGVhZGVycygpO1xuICByZXR1cm4geyBoZWFkZXI6IGhlYWRlcjIsIGdldEhlYWRlcnM6IGdldEhlYWRlcnMyIH07XG59XG52YXIgeyBoZWFkZXIsIGdldEhlYWRlcnMgfSA9IGNyZWF0ZUhlYWRlckhlbHBlcnMoKTtcblxuLy8gc3JjL2Nvb2tpZXMudHNcbmltcG9ydCB7IGNvb2tpZXMgYXMgX2Nvb2tpZXMgfSBmcm9tIFwibmV4dC9oZWFkZXJzXCI7XG5mdW5jdGlvbiBjcmVhdGVDb29raWVIZWxwZXJzKGNvb2tpZXMgPSBfY29va2llcykge1xuICBhc3luYyBmdW5jdGlvbiBjb29raWUyKC4uLmFyZ3MpIHtcbiAgICBjb25zdCBbbmFtZU9yQ29va2llLCB2YWx1ZSwgb3B0c10gPSBhcmdzO1xuICAgIGNvbnN0IG5hbWUgPSB0eXBlb2YgbmFtZU9yQ29va2llID09PSBcInN0cmluZ1wiID8gbmFtZU9yQ29va2llIDogbmFtZU9yQ29va2llLm5hbWU7XG4gICAgY29uc3QgY29va2llU3RvcmUgPSBhd2FpdCBjb29raWVzKCk7XG4gICAgaWYgKG5hbWUgJiYgYXJncy5sZW5ndGggPj0gMikge1xuICAgICAgcmV0dXJuIGNvb2tpZVN0b3JlLnNldChuYW1lLCB2YWx1ZSwgb3B0cyk7XG4gICAgfVxuICAgIHJldHVybiBjb29raWVTdG9yZS5nZXQobmFtZSk7XG4gIH1cbiAgY29uc3QgZ2V0Q29va2llczIgPSBhc3luYyAoKSA9PiBjb29raWVzKCk7XG4gIHJldHVybiB7IGNvb2tpZTogY29va2llMiwgZ2V0Q29va2llczogZ2V0Q29va2llczIgfTtcbn1cbnZhciB7IGNvb2tpZSwgZ2V0Q29va2llcyB9ID0gY3JlYXRlQ29va2llSGVscGVycygpO1xuZXhwb3J0IHtcbiAgY29va2llLFxuICBnZXRDb29raWVzLFxuICBnZXRIZWFkZXJzLFxuICBoZWFkZXJcbn07XG4iXSwibmFtZXMiOltdLCJpZ25vcmVMaXN0IjpbMF0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(action-browser)/./node_modules/ezheaders/dist/index.mjs\n");

/***/ }),

/***/ "(rsc)/./node_modules/ezheaders/dist/index.mjs":
/*!***********************************************!*\
  !*** ./node_modules/ezheaders/dist/index.mjs ***!
  \***********************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   cookie: () => (/* binding */ cookie),\n/* harmony export */   getCookies: () => (/* binding */ getCookies),\n/* harmony export */   getHeaders: () => (/* binding */ getHeaders),\n/* harmony export */   header: () => (/* binding */ header)\n/* harmony export */ });\n/* harmony import */ var next_headers__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/headers */ \"(rsc)/./node_modules/next/dist/api/headers.js\");\n// src/headers.ts\n\nfunction createHeaderHelpers(headers = next_headers__WEBPACK_IMPORTED_MODULE_0__.headers) {\n  const header2 = async (...args) => {\n    const headerStrore = await headers();\n    return headerStrore.get(...args);\n  };\n  const getHeaders2 = async () => headers();\n  return { header: header2, getHeaders: getHeaders2 };\n}\nvar { header, getHeaders } = createHeaderHelpers();\n\n// src/cookies.ts\n\nfunction createCookieHelpers(cookies = next_headers__WEBPACK_IMPORTED_MODULE_0__.cookies) {\n  async function cookie2(...args) {\n    const [nameOrCookie, value, opts] = args;\n    const name = typeof nameOrCookie === \"string\" ? nameOrCookie : nameOrCookie.name;\n    const cookieStore = await cookies();\n    if (name && args.length >= 2) {\n      return cookieStore.set(name, value, opts);\n    }\n    return cookieStore.get(name);\n  }\n  const getCookies2 = async () => cookies();\n  return { cookie: cookie2, getCookies: getCookies2 };\n}\nvar { cookie, getCookies } = createCookieHelpers();\n\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9ub2RlX21vZHVsZXMvZXpoZWFkZXJzL2Rpc3QvaW5kZXgubWpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUE7QUFDbUQ7QUFDbkQsdUNBQXVDLGlEQUFRO0FBQy9DO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQSxNQUFNLHFCQUFxQjs7QUFFM0I7QUFDbUQ7QUFDbkQsdUNBQXVDLGlEQUFRO0FBQy9DO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0EsTUFBTSxxQkFBcUI7QUFNekIiLCJzb3VyY2VzIjpbIkM6XFxVc2Vyc1xcVG9wIFRlY2hcXHZpZGVvXFxub2RlX21vZHVsZXNcXGV6aGVhZGVyc1xcZGlzdFxcaW5kZXgubWpzIl0sInNvdXJjZXNDb250ZW50IjpbIi8vIHNyYy9oZWFkZXJzLnRzXG5pbXBvcnQgeyBoZWFkZXJzIGFzIF9oZWFkZXJzIH0gZnJvbSBcIm5leHQvaGVhZGVyc1wiO1xuZnVuY3Rpb24gY3JlYXRlSGVhZGVySGVscGVycyhoZWFkZXJzID0gX2hlYWRlcnMpIHtcbiAgY29uc3QgaGVhZGVyMiA9IGFzeW5jICguLi5hcmdzKSA9PiB7XG4gICAgY29uc3QgaGVhZGVyU3Ryb3JlID0gYXdhaXQgaGVhZGVycygpO1xuICAgIHJldHVybiBoZWFkZXJTdHJvcmUuZ2V0KC4uLmFyZ3MpO1xuICB9O1xuICBjb25zdCBnZXRIZWFkZXJzMiA9IGFzeW5jICgpID0+IGhlYWRlcnMoKTtcbiAgcmV0dXJuIHsgaGVhZGVyOiBoZWFkZXIyLCBnZXRIZWFkZXJzOiBnZXRIZWFkZXJzMiB9O1xufVxudmFyIHsgaGVhZGVyLCBnZXRIZWFkZXJzIH0gPSBjcmVhdGVIZWFkZXJIZWxwZXJzKCk7XG5cbi8vIHNyYy9jb29raWVzLnRzXG5pbXBvcnQgeyBjb29raWVzIGFzIF9jb29raWVzIH0gZnJvbSBcIm5leHQvaGVhZGVyc1wiO1xuZnVuY3Rpb24gY3JlYXRlQ29va2llSGVscGVycyhjb29raWVzID0gX2Nvb2tpZXMpIHtcbiAgYXN5bmMgZnVuY3Rpb24gY29va2llMiguLi5hcmdzKSB7XG4gICAgY29uc3QgW25hbWVPckNvb2tpZSwgdmFsdWUsIG9wdHNdID0gYXJncztcbiAgICBjb25zdCBuYW1lID0gdHlwZW9mIG5hbWVPckNvb2tpZSA9PT0gXCJzdHJpbmdcIiA/IG5hbWVPckNvb2tpZSA6IG5hbWVPckNvb2tpZS5uYW1lO1xuICAgIGNvbnN0IGNvb2tpZVN0b3JlID0gYXdhaXQgY29va2llcygpO1xuICAgIGlmIChuYW1lICYmIGFyZ3MubGVuZ3RoID49IDIpIHtcbiAgICAgIHJldHVybiBjb29raWVTdG9yZS5zZXQobmFtZSwgdmFsdWUsIG9wdHMpO1xuICAgIH1cbiAgICByZXR1cm4gY29va2llU3RvcmUuZ2V0KG5hbWUpO1xuICB9XG4gIGNvbnN0IGdldENvb2tpZXMyID0gYXN5bmMgKCkgPT4gY29va2llcygpO1xuICByZXR1cm4geyBjb29raWU6IGNvb2tpZTIsIGdldENvb2tpZXM6IGdldENvb2tpZXMyIH07XG59XG52YXIgeyBjb29raWUsIGdldENvb2tpZXMgfSA9IGNyZWF0ZUNvb2tpZUhlbHBlcnMoKTtcbmV4cG9ydCB7XG4gIGNvb2tpZSxcbiAgZ2V0Q29va2llcyxcbiAgZ2V0SGVhZGVycyxcbiAgaGVhZGVyXG59O1xuIl0sIm5hbWVzIjpbXSwiaWdub3JlTGlzdCI6WzBdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(rsc)/./node_modules/ezheaders/dist/index.mjs\n");

/***/ })

};
;