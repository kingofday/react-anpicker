export interface Locale {
    name: string;
    startOfWeek: number;
    rtl: boolean;
    daysOfEachMonth: (year: number, month: number) => number;
    numberConverter: (number: string) => number;
    convertToDate: (localYear: number, localMonth: number, localDay: number) => [number, number, number];
}
export interface MainProps {
    onChange: (date: Date | null, localDate: string | null) => void;
    value: Date | null;
    className?: string;
    theme?: 'dark' | 'light';
    inputControl?: React.ElementType;
    defaultOpen: boolean;
    locale?: Locale;
}
export declare type Day = {
    number: number;
    date: Date;
};
