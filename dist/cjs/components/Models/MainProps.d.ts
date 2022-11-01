import { ElementType } from "react";
import Locale from "./Locale";
declare type CustomInputRequiredProps = {
    onFocus: React.FocusEventHandler<HTMLInputElement> | undefined;
    value: string | number | readonly string[] | undefined;
    [key: string]: any;
};
export default interface MainProps {
    onChange: (date: Date | null, localDate: string | null) => void;
    value: Date | null;
    className?: string;
    theme?: 'dark' | 'light';
    inputControl?: ElementType<CustomInputRequiredProps>;
    defaultOpen?: boolean;
    showTodayBottom?: boolean;
    locale?: Locale;
}
export {};
