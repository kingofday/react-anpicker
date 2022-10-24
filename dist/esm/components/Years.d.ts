interface Props {
    date: Date;
    pageNumber: number;
    onSelectYear: (year: number) => void;
}
declare const Years: ({ date, pageNumber, onSelectYear }: Props) => JSX.Element;
export default Years;
