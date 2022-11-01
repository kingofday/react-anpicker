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
    var _b = _a.className, className = _b === void 0 ? '' : _b, onChange = _a.onChange, _c = _a.value, value = _c === void 0 ? null : _c, _d = _a.defaultOpen, defaultOpen = _d === void 0 ? false : _d, _e = _a.showTodayBottom, showTodayBottom = _e === void 0 ? true : _e, _f = _a.locale, locale = _f === void 0 ? faLocale_1.default : _f, Input = _a.inputControl;
    var anPickerRef = (0, react_1.useRef)(null);
    var init = (0, react_1.useMemo)(function () {
        if (value) {
            return (0, helpers_1.convertToLocalDate)(value, locale);
        }
        else {
            return (0, helpers_1.convertToLocalDate)(new Date(), locale);
        }
    }, []);
    var _g = (0, react_1.useState)(defaultOpen), isOpen = _g[0], toggle = _g[1];
    var _h = (0, react_1.useState)(init[0]), localYear = _h[0], setYear = _h[1];
    var _j = (0, react_1.useState)(init[1]), localMonth = _j[0], setMonth = _j[1];
    var _k = (0, react_1.useState)(init[2]), localDay = _k[0], setDay = _k[1];
    var _l = (0, react_1.useState)(false), changed = _l[0], valueChanged = _l[1];
    var _m = (0, react_1.useState)(Modes.days), mode = _m[0], setMode = _m[1];
    var _o = (0, react_1.useState)(0), yearPageNumber = _o[0], setYearPageNumber = _o[1];
    var onSelectDay = function (dayNumber) {
        setDay(dayNumber);
        valueChanged(true);
    };
    var onSelectMonth = function (month) {
        setMonth(month);
        valueChanged(true);
        handleMode(Modes.days);
    };
    var onSelectYear = function (year) {
        setYear(year);
        valueChanged(true);
        handleMode(Modes.days);
    };
    var nextYear = function () {
        setYearPageNumber(function (y) { return y + 1; });
        handleMode(Modes.years, true);
    };
    var prevYear = function () {
        setYearPageNumber(function (y) { return localYear > 12 ? y - 1 : y; });
        handleMode(Modes.years, true);
    };
    var nextMonth = function () {
        setMonth(function (m) { return m === 12 ? 1 : m + 1; });
        valueChanged(true);
        handleMode(Modes.days);
    };
    var prevMonth = function () {
        setMonth(function (m) { return m === 1 ? 12 : m - 1; });
        valueChanged(true);
        handleMode(Modes.days);
    };
    var setToday = function () {
        var eqDateArr = (0, helpers_1.convertToLocalDate)(new Date(), locale);
        valueChanged(true);
        setYear(eqDateArr[0]);
        setMonth(eqDateArr[1]);
        setDay(eqDateArr[2]);
    };
    var handleMode = (0, react_1.useCallback)(function (newMode, igonrePrev) {
        setMode(function (m) {
            if (!igonrePrev && m === newMode)
                return Modes.days;
            else
                return newMode;
        });
    }, []);
    (0, react_1.useEffect)(function () {
        var baseYear = (0, helpers_1.getYear)(new Date(), locale.name);
        setYear(locale.numberConverter(baseYear) + yearPageNumber * 12);
    }, [yearPageNumber]);
    (0, react_1.useEffect)(function () {
        var date = locale.convertToDate(localYear, localMonth, localDay);
        onChange(new Date("".concat(date[0], "/").concat(date[1], "/").concat(date[2])), "".concat(localYear, "/").concat(localMonth, "/").concat(localDay));
    }, [localYear, localMonth, localDay]);
    (0, react_1.useEffect)(function () {
        if (!value)
            return;
        var eqArr = (0, helpers_1.convertToLocalDate)(value, locale);
        if (eqArr[0] !== localYear)
            setYear(eqArr[0]);
        if (eqArr[1] !== localMonth)
            setMonth(eqArr[1]);
        if (eqArr[2] !== localDay)
            setDay(eqArr[2]);
    }, [value]);
    (0, react_1.useLayoutEffect)(function () {
        var handleClickOutside = function (e) {
            var _a;
            if (!((_a = anPickerRef.current) === null || _a === void 0 ? void 0 : _a.contains(e.target))) {
                console.log("outside clicked");
                toggle(false);
            }
        };
        document.addEventListener("click", handleClickOutside);
        return function () {
            document.removeEventListener("click", handleClickOutside);
        };
    }, []);
    return ((0, jsx_runtime_1.jsxs)("div", __assign({ className: "anpicker ".concat(className), ref: anPickerRef }, { children: [Input ? (0, jsx_runtime_1.jsx)(Input, { readOnly: true, onFocus: function () { return toggle(true); }, value: value || changed ? "".concat(localYear, "/").concat(localMonth, "/").concat(localDay) : "" }) : (0, jsx_runtime_1.jsx)("input", { value: value || changed ? "".concat(localYear, "/").concat(localMonth, "/").concat(localDay) : "", readOnly: true, onFocus: function () { return toggle(true); } }), isOpen ? (0, jsx_runtime_1.jsxs)("div", __assign({ className: "popup" }, { children: [value ? (0, jsx_runtime_1.jsx)("div", { className: 'sidebar' }) : null, (0, jsx_runtime_1.jsxs)("div", __assign({ className: 'main' }, { children: [(0, jsx_runtime_1.jsxs)("div", __assign({ className: 'selector-heading' }, { children: [(0, jsx_runtime_1.jsxs)("div", __assign({ className: 'monthes' }, { children: [(0, jsx_runtime_1.jsx)("a", __assign({ className: 'next', onClick: nextMonth, role: "button" }, { children: (0, jsx_runtime_1.jsx)(PreviousIcon, {}) })), (0, jsx_runtime_1.jsx)("a", __assign({ role: "button", onClick: function () { return handleMode(Modes.monthes); } }, { children: (0, helpers_1.getMonthName)(locale.convertToDate(localYear, localMonth, localDay), locale.name) })), (0, jsx_runtime_1.jsx)("a", __assign({ className: 'prev', onClick: prevMonth, role: "button" }, { children: (0, jsx_runtime_1.jsx)(NextIcon, {}) }))] })), (0, jsx_runtime_1.jsxs)("div", __assign({ className: 'years' }, { children: [(0, jsx_runtime_1.jsx)("a", __assign({ className: 'next', onClick: nextYear, role: "button" }, { children: (0, jsx_runtime_1.jsx)(PreviousIcon, {}) })), (0, jsx_runtime_1.jsx)("a", __assign({ role: "button", onClick: function () { return handleMode(Modes.years); } }, { children: localYear })), (0, jsx_runtime_1.jsx)("a", __assign({ className: 'prev', onClick: prevYear, role: "button" }, { children: (0, jsx_runtime_1.jsx)(NextIcon, {}) }))] }))] })), (0, jsx_runtime_1.jsx)(Years_1.default, { hidden: mode !== Modes.years, locale: locale, pageNumber: yearPageNumber, onSelectYear: onSelectYear, localYear: localYear }), (0, jsx_runtime_1.jsx)(Monthes_1.default, { hidden: mode !== Modes.monthes, locale: locale, onSelect: onSelectMonth, localMonth: localMonth }), (0, jsx_runtime_1.jsx)(days_1.default, { hidden: mode !== Modes.days, locale: locale, localYear: localYear, localMonth: localMonth, localDay: localDay, onSelect: onSelectDay }), showTodayBottom && (0, jsx_runtime_1.jsx)("button", __assign({ className: 'today-button', onClick: setToday }, { children: locale.todayButtonText }))] }))] })) : null] })));
};
exports.AnPicker = AnPicker;
