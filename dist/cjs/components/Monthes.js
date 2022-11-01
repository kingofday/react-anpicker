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
var react_1 = require("react");
var Monthes = function (_a) {
    var localMonth = _a.localMonth, locale = _a.locale, onSelect = _a.onSelect, _b = _a.hidden, hidden = _b === void 0 ? true : _b;
    var monthes = (0, react_1.useMemo)(function () {
        return [0, 1, 2, 3].map(function (x) { return [[1400, x * 3 + 1, 1], [140, x * 3 + 2, 2], [1400, x * 3 + 3, 3]]; });
    }, []);
    return (0, jsx_runtime_1.jsx)("table", __assign({ className: "monthes", hidden: hidden }, { children: (0, jsx_runtime_1.jsx)("tbody", { children: monthes.map(function (s, sIdx) { return (0, jsx_runtime_1.jsx)("tr", { children: s.map(function (m, mIdx) {
                    var dtArr = locale.convertToDate(m[0], m[1], m[2]);
                    return (0, jsx_runtime_1.jsx)("td", __assign({ className: "month ".concat(localMonth === m[1] ? "selected" : "") }, { children: (0, jsx_runtime_1.jsx)("button", __assign({ className: "btn-td", role: "button", type: "button", onClick: function () { return onSelect(m[1]); } }, { children: new Intl.DateTimeFormat(locale.name, { month: "short" }).format(new Date("".concat(dtArr[0], "/").concat(dtArr[1], "/").concat(dtArr[2]))) })) }), mIdx);
                }) }, sIdx); }) }) }));
};
exports.default = Monthes;
