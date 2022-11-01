import Locale from "./Models/Locale";
interface Props {
    locale: Locale;
    localYear: number;
    pageNumber: number;
    hidden: boolean;
    onSelectYear: (year: number) => void;
}
declare const Years: ({ localYear, locale, pageNumber, hidden, onSelectYear }: Props) => JSX.Element;
export default Years;
