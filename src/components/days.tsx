import { dateComparer, getAllDays, nameOfWeekDays } from "./helpers"
import { DaysProps } from "./models";

function Days({ locale, localYear, localMonth, onSelect }: DaysProps): JSX.Element {
    let currentDate = new Date();
    const days = getAllDays(locale, localYear, localMonth);
    console.log("days", nameOfWeekDays(locale));
    return <table className="days" >
        <thead className="week">
            <tr>
                {nameOfWeekDays(locale).map((d, idx) => <th key={idx}><span>{d[0]}</span></th>)}
            </tr>
        </thead>
        <tbody>
            {days.map((week, idx) => <tr key={idx}>
                {week.map((d, wIdx) => <td className={`day ${dateComparer(currentDate, d?.date) ? "current" : ""} ${d?.number && dateComparer(d?.date, locale.convertToDate(localYear, localMonth, d?.number)) ? "selected" : ""}`} key={wIdx}>{d ? <button role="button" type="button" onClick={() => onSelect(d.number)}>{d.number}</button> : null}</td>)}
            </tr>)}
        </tbody>
    </table>
}
export default Days;