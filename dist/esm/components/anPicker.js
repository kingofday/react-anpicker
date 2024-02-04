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
import { useRef, useLayoutEffect } from 'react';
import Days from "./days";
import { getMonthName } from "./helpers";
import { Modes } from "./Models/MainProps";
import faLocale from "./Locales/faLocale";
import Years from './Years';
import Monthes from './Monthes';
import Sidebar from './Sidebar';
import ChevronIcon from './ChevronIcon';
import { createPortal } from 'react-dom';
import useControl from './Hooks/useControl';
export var AnPicker = function (_a) {
    var _b;
    var _c = _a.className, className = _c === void 0 ? '' : _c, onChange = _a.onChange, _d = _a.value, value = _d === void 0 ? "" : _d, _e = _a.showTodayBottom, showTodayBottom = _e === void 0 ? true : _e, _f = _a.locale, locale = _f === void 0 ? faLocale : _f, _g = _a.showSidebar, showSidebar = _g === void 0 ? true : _g, Input = _a.inputControl, popupTargetId = _a.popupTargetId;
    var inputRef = useRef(null);
    var anPickerRef = useRef(null);
    var popupRef = useRef(null);
    var popupTarget = useRef(null);
    var _h = useControl({
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
    useLayoutEffect(function () {
        if (state.open) {
            adjustPosition();
        }
    }, [state.open]);
    useLayoutEffect(function () {
        popupTarget.current = popupTargetId ? document.getElementById(popupTargetId) : document.body;
    }, [popupTargetId]);
    return (_jsxs("div", __assign({ className: "anpicker ".concat(className), ref: anPickerRef, dir: locale.rtl ? "rtl" : "ltr" }, { children: [Input ? _jsx(Input, { ref: inputRef, onChange: handleChange, onFocus: handleFocus, onBlur: handleBlure, value: value !== null && value !== void 0 ? value : "" }) : _jsx("input", { ref: inputRef, value: value !== null && value !== void 0 ? value : "", onChange: handleChange, onFocus: handleFocus, onBlur: handleBlure }), state.open ? createPortal(_jsxs("div", __assign({ className: "anpicker-popup", ref: popupRef, style: state.popupStyle, dir: locale.rtl ? "rtl" : "ltr" }, { children: [showSidebar ? _jsx(Sidebar, { locale: locale, localYear: state.year, localMonth: state.month, localDay: state.day }) : null, _jsxs("div", __assign({ className: 'main' }, { children: [_jsxs("div", __assign({ className: 'selector-heading' }, { children: [_jsxs("div", __assign({ className: 'monthes' }, { children: [_jsx("a", __assign({ className: 'next', onClick: nextMonth, role: "button" }, { children: _jsx(ChevronIcon, { type: "next", rtl: locale.rtl }) })), _jsx("a", __assign({ role: "button", onClick: function () { return setMode(Modes.monthes); } }, { children: getMonthName(locale.convertToDate(state.year, state.month, state.day), locale.name) })), _jsx("a", __assign({ className: 'prev', onClick: prevMonth, role: "button" }, { children: _jsx(ChevronIcon, { type: "prev", rtl: locale.rtl }) }))] })), _jsxs("div", __assign({ className: 'years' }, { children: [_jsx("a", __assign({ className: 'next', onClick: nextYear, role: "button" }, { children: _jsx(ChevronIcon, { type: "next", rtl: locale.rtl }) })), _jsx("a", __assign({ role: "button", onClick: function () { return setMode(Modes.years); } }, { children: state.year })), _jsx("a", __assign({ className: 'prev', onClick: prevYear, role: "button" }, { children: _jsx(ChevronIcon, { type: "prev", rtl: locale.rtl }) }))] }))] })), _jsx(Years, { hidden: state.mode !== Modes.years, locale: locale, pageNumber: state.yearPageNumber, onSelectYear: onSelectYear, localYear: state.year }), _jsx(Monthes, { hidden: state.mode !== Modes.monthes, locale: locale, onSelect: onSelectMonth, localMonth: state.month }), _jsx(Days, { hidden: state.mode !== Modes.days, locale: locale, localYear: state.year, localMonth: state.month, localDay: state.day, onSelect: onSelectDay }), showTodayBottom && _jsx("button", __assign({ className: 'today-button', onClick: setToday }, { children: locale.todayButtonText }))] }))] })), (_b = popupTarget.current) !== null && _b !== void 0 ? _b : document.body) : null] })));
};
