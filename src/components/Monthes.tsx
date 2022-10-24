import { Locale } from "./models";

interface MonthesProps {
    localMonth: number;
    locale: Locale;
    onSelect: (month: number) => void;
}
const Monthes = ({ localMonth, locale, onSelect }: MonthesProps) => {
    const monthes = [
        [[1, 1, 1], [1, 2, 1], [1, 3, 1]],
        [[1, 4, 1], [1, 5, 1], [1, 6, 1]],
        [[1, 7, 1], [1, 8, 1], [1, 9, 1]],
        [[1, 10, 1], [1, 11, 1], [1, 12, 1]],
        [1]]
    return <table className="monthes">
        {monthes.map((s, sIdx) => <tr key={sIdx}>
            {s.map((m, mIdx) => {
                let dtArr = locale.convertToDate(m[0], m[1], m[2]);
                return <td key={mIdx} className={`month ${localMonth === m[1] ? "selected" : ""}`}>
                    <button role="button" type="button" onClick={() => onSelect(m[1])}>
                        {new Intl.DateTimeFormat(locale.name, { month: "short" }).format(new Date(`${dtArr[0]}/${dtArr[1]}/${dtArr[2]}`))}
                    </button>
                </td>;
            })}
        </tr>)}
    </table>;
};
export default Monthes;