import Locale from "./Models/Locale";
interface MonthesProps {
    localMonth: number;
    locale: Locale;
    hidden: boolean;
    onSelect: (month: number) => void;
}
declare const Monthes: ({ localMonth, locale, onSelect, hidden }: MonthesProps) => JSX.Element;
export default Monthes;
