import { Locale } from "./models";
interface MonthesProps {
    localMonth: number;
    locale: Locale;
    onSelect: (month: number) => void;
}
declare const Monthes: ({ localMonth, locale, onSelect }: MonthesProps) => JSX.Element;
export default Monthes;
