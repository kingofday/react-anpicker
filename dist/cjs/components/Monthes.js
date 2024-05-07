"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const Monthes = ({ localMonth, locale, onSelect, hidden = true }) => {
    const monthes = (0, react_1.useMemo)(() => {
        return [0, 1, 2, 3].map((x) => [[1400, x * 3 + 1, 1], [140, x * 3 + 2, 2], [1400, x * 3 + 3, 3]]);
    }, []);
    return (0, jsx_runtime_1.jsx)("table", Object.assign({ className: "monthes", hidden: hidden }, { children: (0, jsx_runtime_1.jsx)("tbody", { children: monthes.map((s, sIdx) => (0, jsx_runtime_1.jsx)("tr", { children: s.map((m, mIdx) => {
                    let dtArr = locale.convertToDate(m[0], m[1], m[2]);
                    return (0, jsx_runtime_1.jsx)("td", Object.assign({ className: `month ${localMonth === m[1] ? "selected" : ""}` }, { children: (0, jsx_runtime_1.jsx)("button", Object.assign({ className: "btn-td", role: "button", type: "button", onClick: () => onSelect(m[1]) }, { children: new Intl.DateTimeFormat(locale.name, { month: "short" }).format(new Date(`${dtArr[0]}/${dtArr[1]}/${dtArr[2]}`)) })) }), mIdx);
                }) }, sIdx)) }) }));
};
exports.default = Monthes;
