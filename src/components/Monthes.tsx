import { useMemo } from "react";
import Locale from "./Models/Locale";

interface MonthesProps {
    localMonth: number;
    locale: Locale;
    hidden: boolean;
    onSelect: (month: number) => void;
}
const Monthes = ({ localMonth, locale, onSelect, hidden = true }: MonthesProps) => {
    const monthes = useMemo(() => {
        return [0, 1, 2, 3].map((x) => [[1400, x * 3 + 1, 1], [140, x * 3 + 2, 2], [1400, x * 3 + 3, 3]]);
    }, [])
    return <table className="monthes" hidden={hidden}>
        <tbody>
            {monthes.map((s, sIdx) => <tr key={sIdx}>
                {s.map((m, mIdx) => {
                    let dtArr = locale.convertToDate(m[0], m[1], m[2]);
                    return <td key={mIdx} className={`month ${localMonth === m[1] ? "selected" : ""}`}>
                        <button className="btn-td" role="button" type="button" onClick={() => onSelect(m[1])}>
                            {new Intl.DateTimeFormat(locale.name, { month: "short" }).format(new Date(`${dtArr[0]}/${dtArr[1]}/${dtArr[2]}`))}
                        </button>
                    </td>;
                })}
            </tr>)}
        </tbody>

    </table>;
};
export default Monthes;