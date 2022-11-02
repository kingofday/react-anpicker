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
var Sidebar = function (_a) {
    var locale = _a.locale, localYear = _a.localYear, localMonth = _a.localMonth, localDay = _a.localDay;
    var dtArr = locale.convertToDate(localYear, localMonth, localDay);
    var dt = new Date("".concat(dtArr[0], "/").concat(dtArr[1], "/").concat(dtArr[2]));
    return _jsxs("div", __assign({ className: "sidebar" }, { children: [_jsx("label", __assign({ className: "weekday" }, { children: new Intl.DateTimeFormat(locale.name, { weekday: "short" }).format(dt) })), _jsxs("div", __assign({ className: "month-wrapper" }, { children: [_jsx("label", __assign({ className: "day-of-month" }, { children: locale.numberConverter(new Intl.DateTimeFormat(locale.name, { day: "2-digit" }).format(dt)) })), _jsx("label", __assign({ className: "month-name" }, { children: new Intl.DateTimeFormat(locale.name, { month: "short" }).format(dt) }))] })), _jsxs("div", __assign({ className: "year-wrapper" }, { children: [_jsx("label", __assign({ className: "year" }, { children: locale.numberConverter(new Intl.DateTimeFormat(locale.name, { year: "numeric" }).format(dt)) })), _jsx("label", __assign({ className: "locale" }, { children: locale.title }))] }))] }));
};
export default Sidebar;
