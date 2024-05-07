"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const helpers_1 = require("./helpers");
function Days({ locale, localYear, localMonth, localDay, onSelect, hidden = false }) {
    let currentDate = new Date();
    const days = (0, helpers_1.getAllDays)(locale, localYear, localMonth);
    return (0, jsx_runtime_1.jsxs)("table", Object.assign({ className: `days`, hidden: hidden }, { children: [(0, jsx_runtime_1.jsx)("thead", Object.assign({ className: "week" }, { children: (0, jsx_runtime_1.jsx)("tr", { children: (0, helpers_1.nameOfWeekDays)(locale).map((d, idx) => (0, jsx_runtime_1.jsx)("th", { children: (0, jsx_runtime_1.jsx)("span", { children: d[0] }) }, idx)) }) })), (0, jsx_runtime_1.jsx)("tbody", { children: days.map((week, idx) => (0, jsx_runtime_1.jsx)("tr", { children: week.map((d, wIdx) => (0, jsx_runtime_1.jsx)("td", Object.assign({ className: `day ${(0, helpers_1.dateComparer)(currentDate, d === null || d === void 0 ? void 0 : d.date) ? "current" : ""} ${(d === null || d === void 0 ? void 0 : d.number) && (0, helpers_1.dateComparer)(d === null || d === void 0 ? void 0 : d.date, locale.convertToDate(localYear, localMonth, localDay)) ? "selected" : ""}` }, { children: d ? (0, jsx_runtime_1.jsx)("button", Object.assign({ className: "btn-td", role: "button", type: "button", onClick: () => onSelect(d.number) }, { children: d.number })) : null }), wIdx)) }, idx)) })] }));
}
exports.default = Days;
