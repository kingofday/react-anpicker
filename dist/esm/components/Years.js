import { jsx as _jsx } from "react/jsx-runtime";
import { getYear } from "./helpers";
const Years = ({ localYear, locale, pageNumber = 0, hidden = true, onSelectYear }) => {
    const currentYear = locale.numberConverter(getYear(new Date(), locale.name));
    return _jsx("table", Object.assign({ className: "years", hidden: hidden }, { children: _jsx("tbody", { children: [[0, 1, 2], [3, 4, 5], [6, 7, 8], [9, 10, 11]].map((arr, idx) => _jsx("tr", { children: arr.map(counter => {
                    let year = (pageNumber * 12) + counter + currentYear - 1;
                    return _jsx("td", Object.assign({ className: `${localYear === year ? "selected" : ""}` }, { children: _jsx("button", Object.assign({ className: "btn-td", onClick: () => onSelectYear(year), role: "button", type: "button" }, { children: year })) }), counter);
                }) }, idx)) }) }));
};
export default Years;
