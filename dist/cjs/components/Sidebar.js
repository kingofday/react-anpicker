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
var Sidebar = function (_a) {
    var locale = _a.locale, localYear = _a.localYear, localMonth = _a.localMonth, localDay = _a.localDay;
    var dtArr = locale.convertToDate(localYear, localMonth, localDay);
    var dt = new Date("".concat(dtArr[0], "/").concat(dtArr[1], "/").concat(dtArr[2]));
    return (0, jsx_runtime_1.jsxs)("div", __assign({ className: "sidebar" }, { children: [(0, jsx_runtime_1.jsx)("label", __assign({ className: "weekday" }, { children: new Intl.DateTimeFormat(locale.name, { weekday: "short" }).format(dt) })), (0, jsx_runtime_1.jsxs)("div", __assign({ className: "month-wrapper" }, { children: [(0, jsx_runtime_1.jsx)("label", __assign({ className: "day-of-month" }, { children: locale.numberConverter(new Intl.DateTimeFormat(locale.name, { day: "2-digit" }).format(dt)) })), (0, jsx_runtime_1.jsx)("label", __assign({ className: "month-name" }, { children: new Intl.DateTimeFormat(locale.name, { month: "short" }).format(dt) }))] })), (0, jsx_runtime_1.jsxs)("div", __assign({ className: "year-wrapper" }, { children: [(0, jsx_runtime_1.jsx)("label", __assign({ className: "year" }, { children: locale.numberConverter(new Intl.DateTimeFormat(locale.name, { year: "numeric" }).format(dt)) })), (0, jsx_runtime_1.jsx)("label", __assign({ className: "locale" }, { children: locale.title }))] }))] }));
};
exports.default = Sidebar;
