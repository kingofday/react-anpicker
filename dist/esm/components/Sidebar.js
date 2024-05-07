import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
const Sidebar = ({ locale, localYear, localMonth, localDay }) => {
    let dtArr = locale.convertToDate(localYear, localMonth, localDay);
    let dt = new Date(`${dtArr[0]}/${dtArr[1]}/${dtArr[2]}`);
    return _jsxs("div", Object.assign({ className: "sidebar" }, { children: [_jsx("label", Object.assign({ className: "weekday" }, { children: new Intl.DateTimeFormat(locale.name, { weekday: "short" }).format(dt) })), _jsxs("div", Object.assign({ className: "month-wrapper" }, { children: [_jsx("label", Object.assign({ className: "day-of-month" }, { children: locale.numberConverter(new Intl.DateTimeFormat(locale.name, { day: "2-digit" }).format(dt)) })), _jsx("label", Object.assign({ className: "month-name" }, { children: new Intl.DateTimeFormat(locale.name, { month: "short" }).format(dt) }))] })), _jsxs("div", Object.assign({ className: "year-wrapper" }, { children: [_jsx("label", Object.assign({ className: "year" }, { children: locale.numberConverter(new Intl.DateTimeFormat(locale.name, { year: "numeric" }).format(dt)) })), _jsx("label", Object.assign({ className: "locale" }, { children: locale.title }))] }))] }));
};
export default Sidebar;
