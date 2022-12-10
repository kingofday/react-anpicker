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
import { useState, useEffect, useRef, useLayoutEffect, useMemo, useCallback } from 'react';
import Days from "./days";
import { getMonthName, getYear, convertToLocalDate } from "./helpers";
import faLocale from "./Locales/faLocale";
import Years from './Years';
import Monthes from './Monthes';
import Sidebar from './Sidebar';
import ChevronIcon from './ChevronIcon';
var Modes;
(function (Modes) {
    Modes[Modes["days"] = 0] = "days";
    Modes[Modes["monthes"] = 1] = "monthes";
    Modes[Modes["years"] = 2] = "years";
})(Modes || (Modes = {}));
export var AnPicker = function (_a) {
    var _b = _a.className, className = _b === void 0 ? '' : _b, onChange = _a.onChange, _c = _a.value, value = _c === void 0 ? null : _c, _d = _a.defaultOpen, defaultOpen = _d === void 0 ? false : _d, _e = _a.showTodayBottom, showTodayBottom = _e === void 0 ? true : _e, _f = _a.locale, locale = _f === void 0 ? faLocale : _f, _g = _a.showSidebar, showSidebar = _g === void 0 ? true : _g, Input = _a.inputControl;
    var anPickerRef = useRef(null);
    var popupRef = useRef(null);
    var init = useMemo(function () {
        if (value) {
            return convertToLocalDate(value, locale);
        }
        else {
            return convertToLocalDate(new Date(), locale);
        }
    }, []);
    var hadValue = useMemo(function () { return !!value; }, []);
    var _h = useState(defaultOpen), isOpen = _h[0], toggle = _h[1];
    var _j = useState(init[0]), localYear = _j[0], setYear = _j[1];
    var _k = useState(init[1]), localMonth = _k[0], setMonth = _k[1];
    var _l = useState(init[2]), localDay = _l[0], setDay = _l[1];
    var _m = useState(false), changed = _m[0], valueChanged = _m[1];
    var _o = useState(Modes.days), mode = _o[0], setMode = _o[1];
    var _p = useState(0), yearPageNumber = _p[0], setYearPageNumber = _p[1];
    var _q = useState(''), innerValue = _q[0], setInnerValue = _q[1];
    var _r = useState(undefined), popupStyle = _r[0], setPopupStyle = _r[1];
    var onSelectDay = useCallback(function (dayNumber) {
        setDay(dayNumber);
        valueChanged(true);
        toggle(false);
    }, []);
    var onSelectMonth = useCallback(function (month) {
        setMonth(month);
        valueChanged(true);
        handleMode(Modes.days);
    }, []);
    var onSelectYear = useCallback(function (year) {
        setYear(year);
        valueChanged(true);
        handleMode(Modes.days);
    }, []);
    var nextYear = function () {
        if (mode === Modes.years)
            setYearPageNumber(function (y) { return y + 1; });
        else
            setYear(function (y) { return y + 1; });
        //handleMode(Modes.years, true);
    };
    var prevYear = function () {
        if (mode === Modes.years)
            setYearPageNumber(function (y) { return localYear > 12 ? y - 1 : y; });
        else
            setYear(function (y) { return y > 1 ? y - 1 : y; });
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
        var eqDateArr = convertToLocalDate(new Date(), locale);
        valueChanged(true);
        setYear(eqDateArr[0]);
        setMonth(eqDateArr[1]);
        setDay(eqDateArr[2]);
    };
    var handleMode = useCallback(function (newMode, igonrePrev) {
        setMode(function (m) {
            if (!igonrePrev && m === newMode)
                return Modes.days;
            else
                return newMode;
        });
    }, []);
    var valueToShow = function () {
        return innerValue ? innerValue : (value || changed ? "".concat(localYear, "/").concat(localMonth < 10 ? "0".concat(localMonth) : localMonth, "/").concat(localDay < 10 ? "0".concat(localDay) : localDay) : "");
    };
    var handleChange = function (e) {
        if (!e.target.value) {
            valueChanged(false);
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
        valueChanged(true);
    };
    useEffect(function () {
        var baseYear = getYear(new Date(), locale.name);
        setYear(locale.numberConverter(baseYear) + yearPageNumber * 12);
    }, [yearPageNumber]);
    useEffect(function () {
        if (!changed)
            return;
        var date = locale.convertToDate(localYear, localMonth, localDay);
        if (value) {
            var eqArr = convertToLocalDate(value, locale);
            if (eqArr[0] === localYear && eqArr[1] === localMonth && eqArr[2] === localDay)
                return;
        }
        onChange(new Date("".concat(date[0], "/").concat(date[1], "/").concat(date[2], " 12:00:00:00")), "".concat(localYear, "/").concat(localMonth < 10 ? "0".concat(localYear) : localYear, "/").concat(localDay < 10 ? "0".concat(localDay) : localDay));
    }, [localYear, localMonth, localDay]);
    useEffect(function () {
        if (!value) {
            if (hadValue) {
                valueChanged(false);
                //onChange(null, null);
            }
            return;
        }
        var eqArr = convertToLocalDate(value, locale);
        if (eqArr[0] !== localYear)
            setYear(eqArr[0]);
        if (eqArr[1] !== localMonth)
            setMonth(eqArr[1]);
        if (eqArr[2] !== localDay)
            setDay(eqArr[2]);
    }, [value]);
    useLayoutEffect(function () {
        var handleClickOutside = function (e) {
            var _a;
            if (!((_a = anPickerRef.current) === null || _a === void 0 ? void 0 : _a.contains(e.target))) {
                toggle(false);
            }
        };
        document.addEventListener("click", handleClickOutside);
        return function () {
            document.removeEventListener("click", handleClickOutside);
        };
    }, []);
    useEffect(function () {
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
    return (_jsxs("div", __assign({ className: "anpicker ".concat(className), ref: anPickerRef, dir: locale.rtl ? "rtl" : "ltr" }, { children: [Input ? _jsx(Input, { onChange: handleChange, onFocus: function () { return toggle(true); }, value: valueToShow() }) : _jsx("input", { value: valueToShow(), onChange: handleChange, onFocus: function () { return toggle(true); }, onBlur: handleBlure }), isOpen ? _jsxs("div", __assign({ className: "popup", ref: popupRef, style: popupStyle, dir: locale.rtl ? "rtl" : "ltr" }, { children: [showSidebar ? _jsx(Sidebar, { locale: locale, localYear: localYear, localMonth: localMonth, localDay: localDay }) : null, _jsxs("div", __assign({ className: 'main' }, { children: [_jsxs("div", __assign({ className: 'selector-heading' }, { children: [_jsxs("div", __assign({ className: 'monthes' }, { children: [_jsx("a", __assign({ className: 'next', onClick: nextMonth, role: "button" }, { children: _jsx(ChevronIcon, { type: "next", rtl: locale.rtl }) })), _jsx("a", __assign({ role: "button", onClick: function () { return handleMode(Modes.monthes); } }, { children: getMonthName(locale.convertToDate(localYear, localMonth, localDay), locale.name) })), _jsx("a", __assign({ className: 'prev', onClick: prevMonth, role: "button" }, { children: _jsx(ChevronIcon, { type: "prev", rtl: locale.rtl }) }))] })), _jsxs("div", __assign({ className: 'years' }, { children: [_jsx("a", __assign({ className: 'next', onClick: nextYear, role: "button" }, { children: _jsx(ChevronIcon, { type: "next", rtl: locale.rtl }) })), _jsx("a", __assign({ role: "button", onClick: function () { return handleMode(Modes.years); } }, { children: localYear })), _jsx("a", __assign({ className: 'prev', onClick: prevYear, role: "button" }, { children: _jsx(ChevronIcon, { type: "prev", rtl: locale.rtl }) }))] }))] })), _jsx(Years, { hidden: mode !== Modes.years, locale: locale, pageNumber: yearPageNumber, onSelectYear: onSelectYear, localYear: localYear }), _jsx(Monthes, { hidden: mode !== Modes.monthes, locale: locale, onSelect: onSelectMonth, localMonth: localMonth }), _jsx(Days, { hidden: mode !== Modes.days, locale: locale, localYear: localYear, localMonth: localMonth, localDay: localDay, onSelect: onSelectDay }), showTodayBottom && _jsx("button", __assign({ className: 'today-button', onClick: setToday }, { children: locale.todayButtonText }))] }))] })) : null] })));
};
