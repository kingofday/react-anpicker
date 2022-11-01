import { getYear } from "./helpers";
import Locale from "./Models/Locale";

interface Props {
    locale: Locale;
    localYear: number,
    pageNumber: number,
    hidden: boolean;
    onSelectYear: (year: number) => void
}
const Years = ({ localYear, locale, pageNumber = 0, hidden = true, onSelectYear }: Props) => {
    const currentYear = locale.numberConverter(getYear(new Date(), locale.name));
    return <table className="years" hidden={hidden}>
        <tbody>
            {[[0, 1, 2], [3, 4, 5], [6, 7, 8], [9, 10, 11]].map((arr, idx) => <tr key={idx}>
                {arr.map(counter => {
                    let year = (pageNumber * 12) + counter + currentYear;
                    return <td className={`${localYear === year ? "selected" : ""}`} key={counter}>
                        <button className="btn-td" onClick={() => onSelectYear(year)} role="button" type="button">{year}</button>
                    </td>
                })}
            </tr>)}
        </tbody>
    </table>;
};
export default Years;