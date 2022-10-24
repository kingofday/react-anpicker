interface Props {
    date: Date,
    pageNumber: number,
    onSelectYear: (year: number) => void
}
const Years = ({ date, pageNumber = 0, onSelectYear }: Props) => {
    const currentYear = new Date().getFullYear();
    return <table className="years">
        {[[1, 2, 3], [4, 5, 6], [7, 8, 9], [10, 11, 12]].map((arr, idx) => <tr key={idx}>
            {arr.map(counter => {
                let year = (pageNumber * 12) + counter + currentYear;
                return <td className={`${date.getFullYear() === year ? "selected" : ""}`} key={counter}>
                    <button onClick={() => onSelectYear(year)} role="button" type="button">{year}</button>
                </td>
            })}
        </tr>)}
    </table>;
};
export default Years;