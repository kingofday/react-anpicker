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
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { dateComparer, getAllDays, nameOfWeekDays } from "./helpers";
function Days(_a) {
    var locale = _a.locale, localYear = _a.localYear, localMonth = _a.localMonth, onSelect = _a.onSelect;
    var currentDate = new Date();
    var days = getAllDays(locale, localYear, localMonth);
    console.log("days", nameOfWeekDays(locale));
    return _jsxs("table", __assign({ className: "days" }, { children: [_jsx("thead", __assign({ className: "week" }, { children: _jsx("tr", { children: nameOfWeekDays(locale).map(function (d, idx) { return _jsx("th", { children: _jsx("span", { children: d[0] }) }, idx); }) }) })), _jsx("tbody", { children: days.map(function (week, idx) { return _jsx("tr", { children: week.map(function (d, wIdx) { return _jsx("td", __assign({ className: "day ".concat(dateComparer(currentDate, d === null || d === void 0 ? void 0 : d.date) ? "current" : "", " ").concat((d === null || d === void 0 ? void 0 : d.number) && dateComparer(d === null || d === void 0 ? void 0 : d.date, locale.convertToDate(localYear, localMonth, d === null || d === void 0 ? void 0 : d.number)) ? "selected" : "") }, { children: d ? _jsx("button", __assign({ role: "button", type: "button", onClick: function () { return onSelect(d.number); } }, { children: d.number })) : null }), wIdx); }) }, idx); }) })] }));
}
export default Days;
