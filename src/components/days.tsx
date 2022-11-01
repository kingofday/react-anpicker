import { dateComparer, getAllDays, nameOfWeekDays } from "./helpers"
import Locale from "./Models/Locale";
export interface DaysProps {
    locale: Locale,
    localYear: number,
    localMonth: number,
    localDay: number,
    hidden: boolean,
    onSelect: (day: number) => void
}
function Days({ locale, localYear, localMonth, localDay, onSelect, hidden = false }: DaysProps): JSX.Element {
    let currentDate = new Date();
    const days = getAllDays(locale, localYear, localMonth);
    return <table className={`days`} hidden={hidden} >
        <thead className="week">
            <tr>
                {nameOfWeekDays(locale).map((d, idx) => <th key={idx}><span>{d[0]}</span></th>)}
            </tr>
        </thead>
        <tbody>
            {days.map((week, idx) => <tr key={idx}>
                {week.map((d, wIdx) => <td className={`day ${dateComparer(currentDate, d?.date) ? "current" : ""} ${d?.number && dateComparer(d?.date, locale.convertToDate(localYear, localMonth, localDay)) ? "selected" : ""}`} key={wIdx}>
                    {d ? <button className="btn-td" role="button" type="button" onClick={() => onSelect(d.number)}>{d.number}</button> : null}
                </td>)}
            </tr>)}
        </tbody>
    </table>
}
export default Days;