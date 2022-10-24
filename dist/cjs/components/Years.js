"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("react/jsx-runtime");
var Years = function (_a) {
    var date = _a.date, _b = _a.pageNumber, pageNumber = _b === void 0 ? 0 : _b, onSelectYear = _a.onSelectYear;
    var currentYear = new Date().getFullYear();
    return (0, jsx_runtime_1.jsx)("table", __assign({ className: "years" }, { children: [[1, 2, 3], [4, 5, 6], [7, 8, 9], [10, 11, 12]].map(function (arr, idx) { return (0, jsx_runtime_1.jsx)("tr", { children: arr.map(function (counter) {
                var year = (pageNumber * 12) + counter + currentYear;
                return (0, jsx_runtime_1.jsx)("td", __assign({ className: "".concat(date.getFullYear() === year ? "selected" : "") }, { children: (0, jsx_runtime_1.jsx)("button", __assign({ onClick: function () { return onSelectYear(year); }, role: "button", type: "button" }, { children: year })) }), counter);
            }) }, idx); }) }));
};
exports.default = Years;
