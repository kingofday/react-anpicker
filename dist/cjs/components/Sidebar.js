"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const Sidebar = ({ locale, localYear, localMonth, localDay }) => {
    let dtArr = locale.convertToDate(localYear, localMonth, localDay);
    let dt = new Date(`${dtArr[0]}/${dtArr[1]}/${dtArr[2]}`);
    return (0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "sidebar" }, { children: [(0, jsx_runtime_1.jsx)("label", Object.assign({ className: "weekday" }, { children: new Intl.DateTimeFormat(locale.name, { weekday: "short" }).format(dt) })), (0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "month-wrapper" }, { children: [(0, jsx_runtime_1.jsx)("label", Object.assign({ className: "day-of-month" }, { children: locale.numberConverter(new Intl.DateTimeFormat(locale.name, { day: "2-digit" }).format(dt)) })), (0, jsx_runtime_1.jsx)("label", Object.assign({ className: "month-name" }, { children: new Intl.DateTimeFormat(locale.name, { month: "short" }).format(dt) }))] })), (0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "year-wrapper" }, { children: [(0, jsx_runtime_1.jsx)("label", Object.assign({ className: "year" }, { children: locale.numberConverter(new Intl.DateTimeFormat(locale.name, { year: "numeric" }).format(dt)) })), (0, jsx_runtime_1.jsx)("label", Object.assign({ className: "locale" }, { children: locale.title }))] }))] }));
};
exports.default = Sidebar;
