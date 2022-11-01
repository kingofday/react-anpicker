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
import './anPicker.css';
import { useState, useEffect, useRef, useLayoutEffect, useMemo, useCallback } from 'react';
import Days from "./days";
import { getMonthName, getYear, convertToLocalDate } from "./helpers";
import faLocale from "./Locales/faLocale";
import Years from './Years';
import Monthes from './Monthes';
var Modes;
(function (Modes) {
    Modes[Modes["days"] = 0] = "days";
    Modes[Modes["monthes"] = 1] = "monthes";
    Modes[Modes["years"] = 2] = "years";
})(Modes || (Modes = {}));
function NextIcon() {
    return _jsx("svg", __assign({ width: "6", height: "10", viewBox: "0 0 6 10", fill: "none", xmlns: "http://www.w3.org/2000/svg" }, { children: _jsx("path", { d: "M5.25 9.5L0.75 5L5.25 0.5", strokeLinecap: "round", strokeLinejoin: "round" }) }));
}
function PreviousIcon() {
    return _jsx("svg", __assign({ width: "6", height: "10", viewBox: "0 0 6 10", fill: "none", xmlns: "http://www.w3.org/2000/svg" }, { children: _jsx("path", { d: "M0.75 9.5L5.25 5L0.75 0.5", strokeLinecap: "round", strokeLinejoin: "round" }) }));
}
export var AnPicker = function (_a) {
    var _b = _a.className, className = _b === void 0 ? '' : _b, onChange = _a.onChange, _c = _a.value, value = _c === void 0 ? null : _c, _d = _a.defaultOpen, defaultOpen = _d === void 0 ? false : _d, _e = _a.showTodayBottom, showTodayBottom = _e === void 0 ? true : _e, _f = _a.locale, locale = _f === void 0 ? faLocale : _f, Input = _a.inputControl;
    var anPickerRef = useRef(null);
    var init = useMemo(function () {
        if (value) {
            return convertToLocalDate(value, locale);
        }
        else {
            return convertToLocalDate(new Date(), locale);
        }
    }, []);
    var _g = useState(defaultOpen), isOpen = _g[0], toggle = _g[1];
    var _h = useState(init[0]), localYear = _h[0], setYear = _h[1];
    var _j = useState(init[1]), localMonth = _j[0], setMonth = _j[1];
    var _k = useState(init[2]), localDay = _k[0], setDay = _k[1];
    var _l = useState(false), changed = _l[0], valueChanged = _l[1];
    var _m = useState(Modes.days), mode = _m[0], setMode = _m[1];
    var _o = useState(0), yearPageNumber = _o[0], setYearPageNumber = _o[1];
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
    useEffect(function () {
        var baseYear = getYear(new Date(), locale.name);
        setYear(locale.numberConverter(baseYear) + yearPageNumber * 12);
    }, [yearPageNumber]);
    useEffect(function () {
        var date = locale.convertToDate(localYear, localMonth, localDay);
        onChange(new Date("".concat(date[0], "/").concat(date[1], "/").concat(date[2])), "".concat(localYear, "/").concat(localMonth, "/").concat(localDay));
    }, [localYear, localMonth, localDay]);
    useEffect(function () {
        if (!value)
            return;
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
                console.log("outside clicked");
                toggle(false);
            }
        };
        document.addEventListener("click", handleClickOutside);
        return function () {
            document.removeEventListener("click", handleClickOutside);
        };
    }, []);
    return (_jsxs("div", __assign({ className: "anpicker ".concat(className), ref: anPickerRef }, { children: [Input ? _jsx(Input, { readOnly: true, onFocus: function () { return toggle(true); }, value: value || changed ? "".concat(localYear, "/").concat(localMonth, "/").concat(localDay) : "" }) : _jsx("input", { value: value || changed ? "".concat(localYear, "/").concat(localMonth, "/").concat(localDay) : "", readOnly: true, onFocus: function () { return toggle(true); } }), isOpen ? _jsxs("div", __assign({ className: "popup" }, { children: [value ? _jsx("div", { className: 'sidebar' }) : null, _jsxs("div", __assign({ className: 'main' }, { children: [_jsxs("div", __assign({ className: 'selector-heading' }, { children: [_jsxs("div", __assign({ className: 'monthes' }, { children: [_jsx("a", __assign({ className: 'next', onClick: nextMonth, role: "button" }, { children: _jsx(PreviousIcon, {}) })), _jsx("a", __assign({ role: "button", onClick: function () { return handleMode(Modes.monthes); } }, { children: getMonthName(locale.convertToDate(localYear, localMonth, localDay), locale.name) })), _jsx("a", __assign({ className: 'prev', onClick: prevMonth, role: "button" }, { children: _jsx(NextIcon, {}) }))] })), _jsxs("div", __assign({ className: 'years' }, { children: [_jsx("a", __assign({ className: 'next', onClick: nextYear, role: "button" }, { children: _jsx(PreviousIcon, {}) })), _jsx("a", __assign({ role: "button", onClick: function () { return handleMode(Modes.years); } }, { children: localYear })), _jsx("a", __assign({ className: 'prev', onClick: prevYear, role: "button" }, { children: _jsx(NextIcon, {}) }))] }))] })), _jsx(Years, { hidden: mode !== Modes.years, locale: locale, pageNumber: yearPageNumber, onSelectYear: onSelectYear, localYear: localYear }), _jsx(Monthes, { hidden: mode !== Modes.monthes, locale: locale, onSelect: onSelectMonth, localMonth: localMonth }), _jsx(Days, { hidden: mode !== Modes.days, locale: locale, localYear: localYear, localMonth: localMonth, localDay: localDay, onSelect: onSelectDay }), showTodayBottom && _jsx("button", __assign({ className: 'today-button', onClick: setToday }, { children: locale.todayButtonText }))] }))] })) : null] })));
};
