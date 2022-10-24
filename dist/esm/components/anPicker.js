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
import { useState, useEffect, useRef, useLayoutEffect, useMemo } from 'react';
import Days from "./days";
import { getMonth, getYear, convertToLocalDate } from "./helpers";
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
    var _b = _a.className, className = _b === void 0 ? '' : _b, onChange = _a.onChange, _c = _a.value, value = _c === void 0 ? null : _c, Input = _a.inputControl, _d = _a.defaultOpen, defaultOpen = _d === void 0 ? false : _d, _e = _a.locale, locale = _e === void 0 ? faLocale : _e;
    var anPickerRef = useRef(null);
    var init = useMemo(function () {
        if (value) {
            return convertToLocalDate(value, locale);
        }
        else {
            return convertToLocalDate(new Date(), locale);
        }
    }, []);
    var _f = useState(defaultOpen), isOpen = _f[0], toggle = _f[1];
    var _g = useState(init[0]), localYear = _g[0], setYear = _g[1];
    var _h = useState(init[1]), localMonth = _h[0], setMonth = _h[1];
    var _j = useState(init[2]), localDay = _j[0], setDay = _j[1];
    var _k = useState(Modes.days), mode = _k[0], setMode = _k[1];
    var _l = useState(0), yearPageNumber = _l[0], setYearPageNumber = _l[1];
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
    useEffect(function () {
        var date = locale.convertToDate(localYear, localMonth, localDay);
        onChange(new Date("".concat(date[0], "/").concat(date[1], "/").concat(date[2])), "".concat(localYear, "/").concat(localMonth, "/").concat(localDay));
    }, [localYear, localMonth, localDay]);
    useLayoutEffect(function () {
        if (!anPickerRef || !anPickerRef.current)
            return;
        document.addEventListener("click", handleClickOutside);
    }, [anPickerRef.current]);
    useEffect(function () {
        return function () {
            document.removeEventListener("click", handleClickOutside);
        };
    }, []);
    return (_jsxs("div", __assign({ className: "anpicker ".concat(className), ref: anPickerRef }, { children: [Input ? _jsx(Input, { readOnly: true, onFocus: function () { return toggle(true); } }) : _jsx("input", { value: value ? new Intl.DateTimeFormat(locale.name).format(value) : "", readOnly: true, onFocus: function () { return toggle(true); } }), isOpen ? _jsxs("div", __assign({ className: "popup" }, { children: [value ? _jsx("div", { className: 'sidebar' }) : null, _jsxs("div", __assign({ className: 'main' }, { children: [_jsxs("div", __assign({ className: 'selector-heading' }, { children: [_jsxs("div", __assign({ className: 'monthes' }, { children: [_jsx("a", __assign({ className: 'next', onClick: nextMonth, role: "button" }, { children: _jsx(PreviousIcon, {}) })), _jsx("a", __assign({ role: "button", onClick: function () { return setMode(Modes.monthes); } }, { children: value ? getMonth(value, locale.name) : getMonth(currentDate, locale.name) })), _jsx("a", __assign({ className: 'prev', onClick: prevMonth, role: "button" }, { children: _jsx(NextIcon, {}) }))] })), _jsxs("div", __assign({ className: 'years' }, { children: [_jsx("a", __assign({ className: 'next', onClick: nextYear, role: "button" }, { children: _jsx(PreviousIcon, {}) })), _jsx("a", __assign({ role: "button", onClick: function () { return setMode(Modes.years); } }, { children: value ? getYear(value, locale.name) : getYear(currentDate, locale.name) })), _jsx("a", __assign({ className: 'prev', onClick: prevYear, role: "button" }, { children: _jsx(NextIcon, {}) }))] }))] })), (function () {
                                switch (mode) {
                                    case Modes.years:
                                        return _jsx(Years, { pageNumber: yearPageNumber, onSelectYear: onSelectYear, date: value !== null && value !== void 0 ? value : currentDate });
                                    case Modes.monthes:
                                        return _jsx(Monthes, { locale: locale, onSelect: onSelectMonth, localMonth: localMonth });
                                    default:
                                        return _jsx(Days, { locale: locale, localYear: localYear, localMonth: localMonth, onSelect: onSelectDay });
                                }
                            })()] }))] })) : null] })));
};
