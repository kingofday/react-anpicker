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
var react_1 = require("react");
var days_1 = __importDefault(require("./days"));
var helpers_1 = require("./helpers");
var faLocale_1 = __importDefault(require("./Locales/faLocale"));
var Years_1 = __importDefault(require("./Years"));
var Monthes_1 = __importDefault(require("./Monthes"));
var Sidebar_1 = __importDefault(require("./Sidebar"));
var ChevronIcon_1 = __importDefault(require("./ChevronIcon"));
var react_dom_1 = require("react-dom");
var Modes;
(function (Modes) {
    Modes[Modes["days"] = 0] = "days";
    Modes[Modes["monthes"] = 1] = "monthes";
    Modes[Modes["years"] = 2] = "years";
})(Modes || (Modes = {}));
var AnPicker = function (_a) {
    var _b;
    var _c = _a.className, className = _c === void 0 ? '' : _c, onChange = _a.onChange, _d = _a.value, value = _d === void 0 ? null : _d, _e = _a.defaultOpen, defaultOpen = _e === void 0 ? false : _e, _f = _a.showTodayBottom, showTodayBottom = _f === void 0 ? true : _f, _g = _a.locale, locale = _g === void 0 ? faLocale_1.default : _g, _h = _a.showSidebar, showSidebar = _h === void 0 ? true : _h, Input = _a.inputControl, popupTargetId = _a.popupTargetId;
    var anPickerRef = (0, react_1.useRef)(null);
    var popupRef = (0, react_1.useRef)(null);
    var popupTarget = (0, react_1.useRef)(null);
    var init = (0, react_1.useMemo)(function () {
        if (value) {
            return (0, helpers_1.convertToLocalDate)(value, locale);
        }
        else {
            return (0, helpers_1.convertToLocalDate)(new Date(), locale);
        }
    }, []);
    var _j = (0, react_1.useState)({
        left: 0,
        top: 0
    }), position = _j[0], setPorition = _j[1];
    var _k = (0, react_1.useState)(defaultOpen), isOpen = _k[0], toggle = _k[1];
    var _l = (0, react_1.useState)(init[0]), localYear = _l[0], setYear = _l[1];
    var _m = (0, react_1.useState)(init[1]), localMonth = _m[0], setMonth = _m[1];
    var _o = (0, react_1.useState)(init[2]), localDay = _o[0], setDay = _o[1];
    var changed = (0, react_1.useRef)(false);
    //const [changed, valueChanged] = useState<boolean>(false);
    var _p = (0, react_1.useState)(Modes.days), mode = _p[0], setMode = _p[1];
    var _q = (0, react_1.useState)(0), yearPageNumber = _q[0], setYearPageNumber = _q[1];
    var _r = (0, react_1.useState)(''), innerValue = _r[0], setInnerValue = _r[1];
    var _s = (0, react_1.useState)(undefined), popupStyle = _s[0], setPopupStyle = _s[1];
    var setPopupPosition = function () {
        var _a;
        var rect = (_a = anPickerRef.current) === null || _a === void 0 ? void 0 : _a.getBoundingClientRect();
        if (rect)
            setPorition({ left: rect.left, top: rect.top + rect.height });
    };
    var onSelectDay = (0, react_1.useCallback)(function (dayNumber) {
        changed.current = true;
        toggle(false);
        setDay(dayNumber);
    }, []);
    var onSelectMonth = (0, react_1.useCallback)(function (month) {
        changed.current = true;
        setMonth(month);
        handleMode(Modes.days);
    }, []);
    var onSelectYear = (0, react_1.useCallback)(function (year) {
        changed.current = true;
        setYear(year);
        handleMode(Modes.days);
    }, []);
    var nextYear = function () {
        if (mode === Modes.years)
            setYearPageNumber(function (y) { return y + 1; });
        else {
            changed.current = true;
            setYear(function (y) { return y + 1; });
        }
    };
    var prevYear = function () {
        if (mode === Modes.years)
            setYearPageNumber(function (y) { return localYear > 12 ? y - 1 : y; });
        else {
            changed.current = true;
            setYear(function (y) { return y > 1 ? y - 1 : y; });
        }
    };
    var nextMonth = function () {
        setMonth(function (m) { return m === 12 ? 1 : m + 1; });
        changed.current = true;
        handleMode(Modes.days);
    };
    var prevMonth = function () {
        setMonth(function (m) { return m === 1 ? 12 : m - 1; });
        changed.current = true;
        handleMode(Modes.days);
    };
    var setToday = function () {
        var eqDateArr = (0, helpers_1.convertToLocalDate)(new Date(), locale);
        changed.current = true;
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
    var valueToShow = function () {
        return innerValue ? innerValue : (value ? "".concat(localYear, "/").concat(localMonth < 10 ? "0".concat(localMonth) : localMonth, "/").concat(localDay < 10 ? "0".concat(localDay) : localDay) : "");
    };
    var handleChange = function (e) {
        if (!e.target.value) {
            changed.current = false;
            onChange(null, null);
        }
        setInnerValue(e.target.value);
    };
    var handleBlure = function () {
        if (!innerValue) {
            return;
        }
        var arr = innerValue.split('/');
        if (arr.length !== 3) {
            setInnerValue('');
            return;
        }
        var y = Number(arr[0]);
        var m = Number(arr[1]);
        var d = Number(arr[2]);
        if (isNaN(y) || isNaN(m) || isNaN(d)) {
            setInnerValue('');
            return;
        }
        setInnerValue('');
        setYear(y);
        setMonth(m);
        setDay(d);
        changed.current = true;
    };
    var handleFocus = function () {
        setPopupPosition();
        toggle(true);
    };
    (0, react_1.useEffect)(function () {
        if (!changed.current)
            return;
        var date = locale.convertToDate(localYear, localMonth, localDay);
        if (value) {
            var eqArr = (0, helpers_1.convertToLocalDate)(value, locale);
            if (eqArr[0] === localYear && eqArr[1] === localMonth && eqArr[2] === localDay)
                return;
        }
        onChange(new Date("".concat(date[0], "/").concat(date[1], "/").concat(date[2], " 12:00:00")), "".concat(localYear, "/").concat(localMonth < 10 ? "0".concat(localYear) : localYear, "/").concat(localDay < 10 ? "0".concat(localDay) : localDay));
    }, [localYear, localMonth, localDay]);
    (0, react_1.useEffect)(function () {
        if (!value) {
            changed.current = false;
            setInnerValue('');
            return;
        }
        var eqArr = (0, helpers_1.convertToLocalDate)(new Date(value), locale);
        if (eqArr[0] !== localYear)
            setYear(eqArr[0]);
        if (eqArr[1] !== localMonth)
            setMonth(eqArr[1]);
        if (eqArr[2] !== localDay)
            setDay(eqArr[2]);
    }, [value]);
    (0, react_1.useEffect)(function () {
        var handleClickOutside = function (e) {
            var _a, _b;
            if (!((_a = anPickerRef.current) === null || _a === void 0 ? void 0 : _a.contains(e.target)) && !((_b = popupRef.current) === null || _b === void 0 ? void 0 : _b.contains(e.target))) {
                toggle(false);
            }
        };
        var onScrolled = function () {
            console.log("scrolled");
            toggle(false);
        };
        document.addEventListener("scroll", onScrolled);
        document.addEventListener("click", handleClickOutside);
        return function () {
            document.removeEventListener("scroll", onScrolled);
            document.removeEventListener("click", handleClickOutside);
        };
    }, []);
    (0, react_1.useEffect)(function () {
        popupTarget.current = popupTargetId ? document.getElementById(popupTargetId) : document.body;
    }, [popupTargetId]);
    (0, react_1.useEffect)(function () {
        var _a;
        if (isOpen) {
            var rect = (_a = popupRef.current) === null || _a === void 0 ? void 0 : _a.getBoundingClientRect();
            if (!rect)
                return;
            if (rect.x < 0)
                setPopupStyle({ left: 0 });
            if (rect.x + rect.width > window.innerWidth) {
                setPopupStyle(locale.rtl ? { right: 0 } : { left: 0 });
            }
        }
    }, [isOpen]);
    return ((0, jsx_runtime_1.jsxs)("div", __assign({ className: "anpicker ".concat(className), ref: anPickerRef, dir: locale.rtl ? "rtl" : "ltr" }, { children: [Input ? (0, jsx_runtime_1.jsx)(Input, { onChange: handleChange, onFocus: handleFocus, onBlur: handleBlure, value: valueToShow() }) : (0, jsx_runtime_1.jsx)("input", { value: valueToShow(), onChange: handleChange, onFocus: handleFocus, onBlur: handleBlure }), isOpen ? (0, react_dom_1.createPortal)((0, jsx_runtime_1.jsxs)("div", __assign({ className: "anpicker-popup", ref: popupRef, style: __assign(__assign({}, position), popupStyle), dir: locale.rtl ? "rtl" : "ltr" }, { children: [showSidebar ? (0, jsx_runtime_1.jsx)(Sidebar_1.default, { locale: locale, localYear: localYear, localMonth: localMonth, localDay: localDay }) : null, (0, jsx_runtime_1.jsxs)("div", __assign({ className: 'main' }, { children: [(0, jsx_runtime_1.jsxs)("div", __assign({ className: 'selector-heading' }, { children: [(0, jsx_runtime_1.jsxs)("div", __assign({ className: 'monthes' }, { children: [(0, jsx_runtime_1.jsx)("a", __assign({ className: 'next', onClick: nextMonth, role: "button" }, { children: (0, jsx_runtime_1.jsx)(ChevronIcon_1.default, { type: "next", rtl: locale.rtl }) })), (0, jsx_runtime_1.jsx)("a", __assign({ role: "button", onClick: function () { return handleMode(Modes.monthes); } }, { children: (0, helpers_1.getMonthName)(locale.convertToDate(localYear, localMonth, localDay), locale.name) })), (0, jsx_runtime_1.jsx)("a", __assign({ className: 'prev', onClick: prevMonth, role: "button" }, { children: (0, jsx_runtime_1.jsx)(ChevronIcon_1.default, { type: "prev", rtl: locale.rtl }) }))] })), (0, jsx_runtime_1.jsxs)("div", __assign({ className: 'years' }, { children: [(0, jsx_runtime_1.jsx)("a", __assign({ className: 'next', onClick: nextYear, role: "button" }, { children: (0, jsx_runtime_1.jsx)(ChevronIcon_1.default, { type: "next", rtl: locale.rtl }) })), (0, jsx_runtime_1.jsx)("a", __assign({ role: "button", onClick: function () { return handleMode(Modes.years); } }, { children: localYear })), (0, jsx_runtime_1.jsx)("a", __assign({ className: 'prev', onClick: prevYear, role: "button" }, { children: (0, jsx_runtime_1.jsx)(ChevronIcon_1.default, { type: "prev", rtl: locale.rtl }) }))] }))] })), (0, jsx_runtime_1.jsx)(Years_1.default, { hidden: mode !== Modes.years, locale: locale, pageNumber: yearPageNumber, onSelectYear: onSelectYear, localYear: localYear }), (0, jsx_runtime_1.jsx)(Monthes_1.default, { hidden: mode !== Modes.monthes, locale: locale, onSelect: onSelectMonth, localMonth: localMonth }), (0, jsx_runtime_1.jsx)(days_1.default, { hidden: mode !== Modes.days, locale: locale, localYear: localYear, localMonth: localMonth, localDay: localDay, onSelect: onSelectDay }), showTodayBottom && (0, jsx_runtime_1.jsx)("button", __assign({ className: 'today-button', onClick: setToday }, { children: locale.todayButtonText }))] }))] })), (_b = popupTarget.current) !== null && _b !== void 0 ? _b : document.body) : null] })));
};
exports.AnPicker = AnPicker;
