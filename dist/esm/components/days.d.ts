import Locale from "./Models/Locale";
export interface DaysProps {
    locale: Locale;
    localYear: number;
    localMonth: number;
    localDay: number;
    hidden: boolean;
    onSelect: (day: number) => void;
}
declare function Days({ locale, localYear, localMonth, localDay, onSelect, hidden }: DaysProps): JSX.Element;
export default Days;
