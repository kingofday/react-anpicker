import { jsx as _jsx } from "react/jsx-runtime";
import { useMemo } from "react";
const Monthes = ({ localMonth, locale, onSelect, hidden = true }) => {
    const monthes = useMemo(() => {
        return [0, 1, 2, 3].map((x) => [[1400, x * 3 + 1, 1], [140, x * 3 + 2, 2], [1400, x * 3 + 3, 3]]);
    }, []);
    return _jsx("table", Object.assign({ className: "monthes", hidden: hidden }, { children: _jsx("tbody", { children: monthes.map((s, sIdx) => _jsx("tr", { children: s.map((m, mIdx) => {
                    let dtArr = locale.convertToDate(m[0], m[1], m[2]);
                    return _jsx("td", Object.assign({ className: `month ${localMonth === m[1] ? "selected" : ""}` }, { children: _jsx("button", Object.assign({ className: "btn-td", role: "button", type: "button", onClick: () => onSelect(m[1]) }, { children: new Intl.DateTimeFormat(locale.name, { month: "short" }).format(new Date(`${dtArr[0]}/${dtArr[1]}/${dtArr[2]}`)) })) }), mIdx);
                }) }, sIdx)) }) }));
};
export default Monthes;
