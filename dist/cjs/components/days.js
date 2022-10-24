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
var helpers_1 = require("./helpers");
function Days(_a) {
    var locale = _a.locale, localYear = _a.localYear, localMonth = _a.localMonth, onSelect = _a.onSelect;
    var currentDate = new Date();
    var days = (0, helpers_1.getAllDays)(locale, localYear, localMonth);
    console.log("days", (0, helpers_1.nameOfWeekDays)(locale));
    return (0, jsx_runtime_1.jsxs)("table", __assign({ className: "days" }, { children: [(0, jsx_runtime_1.jsx)("thead", __assign({ className: "week" }, { children: (0, jsx_runtime_1.jsx)("tr", { children: (0, helpers_1.nameOfWeekDays)(locale).map(function (d, idx) { return (0, jsx_runtime_1.jsx)("th", { children: (0, jsx_runtime_1.jsx)("span", { children: d[0] }) }, idx); }) }) })), (0, jsx_runtime_1.jsx)("tbody", { children: days.map(function (week, idx) { return (0, jsx_runtime_1.jsx)("tr", { children: week.map(function (d, wIdx) { return (0, jsx_runtime_1.jsx)("td", __assign({ className: "day ".concat((0, helpers_1.dateComparer)(currentDate, d === null || d === void 0 ? void 0 : d.date) ? "current" : "", " ").concat((d === null || d === void 0 ? void 0 : d.number) && (0, helpers_1.dateComparer)(d === null || d === void 0 ? void 0 : d.date, locale.convertToDate(localYear, localMonth, d === null || d === void 0 ? void 0 : d.number)) ? "selected" : "") }, { children: d ? (0, jsx_runtime_1.jsx)("button", __assign({ role: "button", type: "button", onClick: function () { return onSelect(d.number); } }, { children: d.number })) : null }), wIdx); }) }, idx); }) })] }));
}
exports.default = Days;
