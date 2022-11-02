import Locale from "./Models/Locale";

interface SidebarProps {
    locale: Locale,
    localYear: number,
    localMonth: number,
    localDay: number
}
const Sidebar = ({
    locale,
    localYear,
    localMonth,
    localDay }: SidebarProps) => {
    let dtArr = locale.convertToDate(localYear, localMonth, localDay);
    let dt = new Date(`${dtArr[0]}/${dtArr[1]}/${dtArr[2]}`);
    return <div className="sidebar">
        <label className="weekday">{new Intl.DateTimeFormat(locale.name, { weekday: "short" }).format(dt)}</label>
        <div className="month-wrapper">
            <label className="day-of-month">{locale.numberConverter(new Intl.DateTimeFormat(locale.name, { day: "2-digit" }).format(dt))}</label>
            <label className="month-name">{new Intl.DateTimeFormat(locale.name, { month: "short" }).format(dt)}</label>
        </div>
        <div className="year-wrapper">
            <label className="year">{locale.numberConverter(new Intl.DateTimeFormat(locale.name, { year: "numeric" }).format(dt))}</label>
            <label className="locale">{locale.title}</label>
        </div>
    </div>;
};
export default Sidebar;