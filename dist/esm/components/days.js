import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { dateComparer, getAllDays, nameOfWeekDays } from "./helpers";
function Days({ locale, localYear, localMonth, localDay, onSelect, hidden = false }) {
    let currentDate = new Date();
    const days = getAllDays(locale, localYear, localMonth);
    return _jsxs("table", Object.assign({ className: `days`, hidden: hidden }, { children: [_jsx("thead", Object.assign({ className: "week" }, { children: _jsx("tr", { children: nameOfWeekDays(locale).map((d, idx) => _jsx("th", { children: _jsx("span", { children: d[0] }) }, idx)) }) })), _jsx("tbody", { children: days.map((week, idx) => _jsx("tr", { children: week.map((d, wIdx) => _jsx("td", Object.assign({ className: `day ${dateComparer(currentDate, d === null || d === void 0 ? void 0 : d.date) ? "current" : ""} ${(d === null || d === void 0 ? void 0 : d.number) && dateComparer(d === null || d === void 0 ? void 0 : d.date, locale.convertToDate(localYear, localMonth, localDay)) ? "selected" : ""}` }, { children: d ? _jsx("button", Object.assign({ className: "btn-td", role: "button", type: "button", onClick: () => onSelect(d.number) }, { children: d.number })) : null }), wIdx)) }, idx)) })] }));
}
export default Days;
