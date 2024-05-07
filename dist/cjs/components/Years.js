"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const helpers_1 = require("./helpers");
const Years = ({ localYear, locale, pageNumber = 0, hidden = true, onSelectYear }) => {
    const currentYear = locale.numberConverter((0, helpers_1.getYear)(new Date(), locale.name));
    return (0, jsx_runtime_1.jsx)("table", Object.assign({ className: "years", hidden: hidden }, { children: (0, jsx_runtime_1.jsx)("tbody", { children: [[0, 1, 2], [3, 4, 5], [6, 7, 8], [9, 10, 11]].map((arr, idx) => (0, jsx_runtime_1.jsx)("tr", { children: arr.map(counter => {
                    let year = (pageNumber * 12) + counter + currentYear - 1;
                    return (0, jsx_runtime_1.jsx)("td", Object.assign({ className: `${localYear === year ? "selected" : ""}` }, { children: (0, jsx_runtime_1.jsx)("button", Object.assign({ className: "btn-td", onClick: () => onSelectYear(year), role: "button", type: "button" }, { children: year })) }), counter);
                }) }, idx)) }) }));
};
exports.default = Years;
