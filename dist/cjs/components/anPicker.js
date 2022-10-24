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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AnPicker = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
require("./anPicker.css");
var react_1 = require("react");
var days_1 = __importDefault(require("./days"));
var helpers_1 = require("./helpers");
var faLocale_1 = __importDefault(require("./Locales/faLocale"));
var Years_1 = __importDefault(require("./Years"));
var Monthes_1 = __importDefault(require("./Monthes"));
var Modes;
(function (Modes) {
    Modes[Modes["days"] = 0] = "days";
    Modes[Modes["monthes"] = 1] = "monthes";
    Modes[Modes["years"] = 2] = "years";
})(Modes || (Modes = {}));
function NextIcon() {
    return (0, jsx_runtime_1.jsx)("svg", __assign({ width: "6", height: "10", viewBox: "0 0 6 10", fill: "none", xmlns: "http://www.w3.org/2000/svg" }, { children: (0, jsx_runtime_1.jsx)("path", { d: "M5.25 9.5L0.75 5L5.25 0.5", strokeLinecap: "round", strokeLinejoin: "round" }) }));
}
function PreviousIcon() {
    return (0, jsx_runtime_1.jsx)("svg", __assign({ width: "6", height: "10", viewBox: "0 0 6 10", fill: "none", xmlns: "http://www.w3.org/2000/svg" }, { children: (0, jsx_runtime_1.jsx)("path", { d: "M0.75 9.5L5.25 5L0.75 0.5", strokeLinecap: "round", strokeLinejoin: "round" }) }));
}
var AnPicker = function (_a) {
    var _b = _a.className, className = _b === void 0 ? '' : _b, onChange = _a.onChange, _c = _a.value, value = _c === void 0 ? null : _c, Input = _a.inputControl, _d = _a.defaultOpen, defaultOpen = _d === void 0 ? false : _d, _e = _a.locale, locale = _e === void 0 ? faLocale_1.default : _e;
    var anPickerRef = (0, react_1.useRef)(null);
    var init = (0, react_1.useMemo)(function () {
        if (value) {
            return (0, helpers_1.convertToLocalDate)(value, locale);
        }
        else {
            return (0, helpers_1.convertToLocalDate)(new Date(), locale);
        }
    }, []);
    var _f = (0, react_1.useState)(defaultOpen), isOpen = _f[0], toggle = _f[1];
    var _g = (0, react_1.useState)(init[0]), localYear = _g[0], setYear = _g[1];
    var _h = (0, react_1.useState)(init[1]), localMonth = _h[0], setMonth = _h[1];
    var _j = (0, react_1.useState)(init[2]), localDay = _j[0], setDay = _j[1];
    var _k = (0, react_1.useState)(Modes.days), mode = _k[0], setMode = _k[1];
    var _l = (0, react_1.useState)(0), yearPageNumber = _l[0], setYearPageNumber = _l[1];
    var currentDate = new Date();
    var onSelectDay = function (dayNumber) {
        setDay(dayNumber);
    };
    var onSelectMonth = function (month) {
        setMonth(month);
    };
    var onSelectYear = function (year) {
        setYear(year);
    };
    var nextYear = function () {
        setYearPageNumber(function (y) { return y + 1; });
    };
    var prevYear = function () {
        console.log(yearPageNumber);
        setYearPageNumber(function (y) { return y - 1; });
    };
    var nextMonth = function () { };
    var prevMonth = function () { };
    var handleClickOutside = function (e) {
        var _a;
        if (!((_a = anPickerRef.current) === null || _a === void 0 ? void 0 : _a.contains(e.target))) {
            toggle(false);
        }
    };
    (0, react_1.useEffect)(function () {
        var date = locale.convertToDate(localYear, localMonth, localDay);
        onChange(new Date("".concat(date[0], "/").concat(date[1], "/").concat(date[2])), "".concat(localYear, "/").concat(localMonth, "/").concat(localDay));
    }, [localYear, localMonth, localDay]);
    (0, react_1.useLayoutEffect)(function () {
        if (!anPickerRef || !anPickerRef.current)
            return;
        document.addEventListener("click", handleClickOutside);
    }, [anPickerRef.current]);
    (0, react_1.useEffect)(function () {
        return function () {
            document.removeEventListener("click", handleClickOutside);
        };
    }, []);
    return ((0, jsx_runtime_1.jsxs)("div", __assign({ className: "anpicker ".concat(className), ref: anPickerRef }, { children: [Input ? (0, jsx_runtime_1.jsx)(Input, { readOnly: true, onFocus: function () { return toggle(true); } }) : (0, jsx_runtime_1.jsx)("input", { value: value ? new Intl.DateTimeFormat(locale.name).format(value) : "", readOnly: true, onFocus: function () { return toggle(true); } }), isOpen ? (0, jsx_runtime_1.jsxs)("div", __assign({ className: "popup" }, { children: [value ? (0, jsx_runtime_1.jsx)("div", { className: 'sidebar' }) : null, (0, jsx_runtime_1.jsxs)("div", __assign({ className: 'main' }, { children: [(0, jsx_runtime_1.jsxs)("div", __assign({ className: 'selector-heading' }, { children: [(0, jsx_runtime_1.jsxs)("div", __assign({ className: 'monthes' }, { children: [(0, jsx_runtime_1.jsx)("a", __assign({ className: 'next', onClick: nextMonth, role: "button" }, { children: (0, jsx_runtime_1.jsx)(PreviousIcon, {}) })), (0, jsx_runtime_1.jsx)("a", __assign({ role: "button", onClick: function () { return setMode(Modes.monthes); } }, { children: value ? (0, helpers_1.getMonth)(value, locale.name) : (0, helpers_1.getMonth)(currentDate, locale.name) })), (0, jsx_runtime_1.jsx)("a", __assign({ className: 'prev', onClick: prevMonth, role: "button" }, { children: (0, jsx_runtime_1.jsx)(NextIcon, {}) }))] })), (0, jsx_runtime_1.jsxs)("div", __assign({ className: 'years' }, { children: [(0, jsx_runtime_1.jsx)("a", __assign({ className: 'next', onClick: nextYear, role: "button" }, { children: (0, jsx_runtime_1.jsx)(PreviousIcon, {}) })), (0, jsx_runtime_1.jsx)("a", __assign({ role: "button", onClick: function () { return setMode(Modes.years); } }, { children: value ? (0, helpers_1.getYear)(value, locale.name) : (0, helpers_1.getYear)(currentDate, locale.name) })), (0, jsx_runtime_1.jsx)("a", __assign({ className: 'prev', onClick: prevYear, role: "button" }, { children: (0, jsx_runtime_1.jsx)(NextIcon, {}) }))] }))] })), (function () {
                                switch (mode) {
                                    case Modes.years:
                                        return (0, jsx_runtime_1.jsx)(Years_1.default, { pageNumber: yearPageNumber, onSelectYear: onSelectYear, date: value !== null && value !== void 0 ? value : currentDate });
                                    case Modes.monthes:
                                        return (0, jsx_runtime_1.jsx)(Monthes_1.default, { locale: locale, onSelect: onSelectMonth, localMonth: localMonth });
                                    default:
                                        return (0, jsx_runtime_1.jsx)(days_1.default, { locale: locale, localYear: localYear, localMonth: localMonth, onSelect: onSelectDay });
                                }
                            })()] }))] })) : null] })));
};
exports.AnPicker = AnPicker;
