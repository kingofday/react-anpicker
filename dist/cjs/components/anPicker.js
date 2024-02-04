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
var MainProps_1 = require("./Models/MainProps");
var faLocale_1 = __importDefault(require("./Locales/faLocale"));
var Years_1 = __importDefault(require("./Years"));
var Monthes_1 = __importDefault(require("./Monthes"));
var Sidebar_1 = __importDefault(require("./Sidebar"));
var ChevronIcon_1 = __importDefault(require("./ChevronIcon"));
var react_dom_1 = require("react-dom");
var useControl_1 = __importDefault(require("./Hooks/useControl"));
var AnPicker = function (_a) {
    var _b;
    var _c = _a.className, className = _c === void 0 ? '' : _c, onChange = _a.onChange, _d = _a.value, value = _d === void 0 ? "" : _d, _e = _a.showTodayBottom, showTodayBottom = _e === void 0 ? true : _e, _f = _a.locale, locale = _f === void 0 ? faLocale_1.default : _f, _g = _a.showSidebar, showSidebar = _g === void 0 ? true : _g, Input = _a.inputControl, popupTargetId = _a.popupTargetId;
    var inputRef = (0, react_1.useRef)(null);
    var anPickerRef = (0, react_1.useRef)(null);
    var popupRef = (0, react_1.useRef)(null);
    var popupTarget = (0, react_1.useRef)(null);
    var _h = (0, useControl_1.default)({
        anPickerRef: anPickerRef,
        inputRef: inputRef,
        locale: locale,
        value: value,
        onChange: onChange,
    }), state = _h.state, handleFocus = _h.handleFocus, handleBlure = _h.handleBlure, setPopupStyles = _h.setPopupStyles, handleChange = _h.handleChange, setMode = _h.setMode, nextYear = _h.nextYear, prevYear = _h.prevYear, nextMonth = _h.nextMonth, prevMonth = _h.prevMonth, onSelectYear = _h.onSelectYear, onSelectMonth = _h.onSelectMonth, onSelectDay = _h.onSelectDay, setToday = _h.setToday;
    var adjustPosition = function () {
        var _a, _b, _c, _d, _e, _f, _g;
        var inputRect = (_a = anPickerRef.current) === null || _a === void 0 ? void 0 : _a.getBoundingClientRect();
        var popupRect = (_b = popupRef.current) === null || _b === void 0 ? void 0 : _b.getBoundingClientRect();
        var parentRect = (_c = popupTarget.current) === null || _c === void 0 ? void 0 : _c.getBoundingClientRect();
        if (!popupRect || !inputRect)
            return;
        var scrollTop = window.scrollY || document.documentElement.scrollTop;
        var scrollLeft = window.scrollX || document.documentElement.scrollLeft;
        var inputOffsetTop = (_e = (_d = anPickerRef.current) === null || _d === void 0 ? void 0 : _d.offsetTop) !== null && _e !== void 0 ? _e : 0;
        var inputOffsetLeft = (_g = (_f = anPickerRef.current) === null || _f === void 0 ? void 0 : _f.offsetLeft) !== null && _g !== void 0 ? _g : 0;
        var offsetHeight = popupTargetId && popupTarget.current ? popupTarget.current.offsetHeight - popupTarget.current.clientHeight : 0;
        var offsetWidth = popupTargetId && popupTarget.current ? popupTarget.current.offsetWidth - popupTarget.current.clientWidth : 0;
        var h = window.innerHeight;
        var w = window.innerWidth;
        var left = "auto";
        var right = "auto";
        var top = "auto";
        left = (popupTargetId && parentRect ? inputOffsetLeft : (inputRect.left + scrollLeft)) - offsetWidth;
        if (left + popupRect.width > w) {
            left = "auto";
            right = 0;
        }
        if (inputRect.top + popupRect.height > h) {
            top = ((popupTargetId && parentRect) ? inputOffsetTop : (inputRect.top + scrollTop)) - popupRect.height - offsetHeight;
        }
        else {
            top = (popupTargetId && parentRect ? inputOffsetTop : (inputRect.top + scrollTop)) + inputRect.height - offsetHeight;
        }
        setPopupStyles(({ top: top, left: left, right: right }));
    };
    (0, react_1.useLayoutEffect)(function () {
        if (state.open) {
            adjustPosition();
        }
    }, [state.open]);
    (0, react_1.useLayoutEffect)(function () {
        popupTarget.current = popupTargetId ? document.getElementById(popupTargetId) : document.body;
    }, [popupTargetId]);
    return ((0, jsx_runtime_1.jsxs)("div", __assign({ className: "anpicker ".concat(className), ref: anPickerRef, dir: locale.rtl ? "rtl" : "ltr" }, { children: [Input ? (0, jsx_runtime_1.jsx)(Input, { ref: inputRef, onChange: handleChange, onFocus: handleFocus, onBlur: handleBlure, value: value !== null && value !== void 0 ? value : "" }) : (0, jsx_runtime_1.jsx)("input", { ref: inputRef, value: value !== null && value !== void 0 ? value : "", onChange: handleChange, onFocus: handleFocus, onBlur: handleBlure }), state.open ? (0, react_dom_1.createPortal)((0, jsx_runtime_1.jsxs)("div", __assign({ className: "anpicker-popup", ref: popupRef, style: state.popupStyle, dir: locale.rtl ? "rtl" : "ltr" }, { children: [showSidebar ? (0, jsx_runtime_1.jsx)(Sidebar_1.default, { locale: locale, localYear: state.year, localMonth: state.month, localDay: state.day }) : null, (0, jsx_runtime_1.jsxs)("div", __assign({ className: 'main' }, { children: [(0, jsx_runtime_1.jsxs)("div", __assign({ className: 'selector-heading' }, { children: [(0, jsx_runtime_1.jsxs)("div", __assign({ className: 'monthes' }, { children: [(0, jsx_runtime_1.jsx)("a", __assign({ className: 'next', onClick: nextMonth, role: "button" }, { children: (0, jsx_runtime_1.jsx)(ChevronIcon_1.default, { type: "next", rtl: locale.rtl }) })), (0, jsx_runtime_1.jsx)("a", __assign({ role: "button", onClick: function () { return setMode(MainProps_1.Modes.monthes); } }, { children: (0, helpers_1.getMonthName)(locale.convertToDate(state.year, state.month, state.day), locale.name) })), (0, jsx_runtime_1.jsx)("a", __assign({ className: 'prev', onClick: prevMonth, role: "button" }, { children: (0, jsx_runtime_1.jsx)(ChevronIcon_1.default, { type: "prev", rtl: locale.rtl }) }))] })), (0, jsx_runtime_1.jsxs)("div", __assign({ className: 'years' }, { children: [(0, jsx_runtime_1.jsx)("a", __assign({ className: 'next', onClick: nextYear, role: "button" }, { children: (0, jsx_runtime_1.jsx)(ChevronIcon_1.default, { type: "next", rtl: locale.rtl }) })), (0, jsx_runtime_1.jsx)("a", __assign({ role: "button", onClick: function () { return setMode(MainProps_1.Modes.years); } }, { children: state.year })), (0, jsx_runtime_1.jsx)("a", __assign({ className: 'prev', onClick: prevYear, role: "button" }, { children: (0, jsx_runtime_1.jsx)(ChevronIcon_1.default, { type: "prev", rtl: locale.rtl }) }))] }))] })), (0, jsx_runtime_1.jsx)(Years_1.default, { hidden: state.mode !== MainProps_1.Modes.years, locale: locale, pageNumber: state.yearPageNumber, onSelectYear: onSelectYear, localYear: state.year }), (0, jsx_runtime_1.jsx)(Monthes_1.default, { hidden: state.mode !== MainProps_1.Modes.monthes, locale: locale, onSelect: onSelectMonth, localMonth: state.month }), (0, jsx_runtime_1.jsx)(days_1.default, { hidden: state.mode !== MainProps_1.Modes.days, locale: locale, localYear: state.year, localMonth: state.month, localDay: state.day, onSelect: onSelectDay }), showTodayBottom && (0, jsx_runtime_1.jsx)("button", __assign({ className: 'today-button', onClick: setToday }, { children: locale.todayButtonText }))] }))] })), (_b = popupTarget.current) !== null && _b !== void 0 ? _b : document.body) : null] })));
};
exports.AnPicker = AnPicker;
