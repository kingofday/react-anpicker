import { ElementType } from "react";
import Locale from "./Locale";
type CustomInputRequiredProps = {
    onFocus: React.FocusEventHandler<HTMLInputElement> | undefined;
    value: string | number | readonly string[] | undefined;
    [key: string]: any
}
export default interface MainProps {
    onChange: (date: Date | null, localDate: string | null) => void,
    value: Date | null;
    className?: string;
    inputControl?: ElementType<CustomInputRequiredProps>;
    defaultOpen?: boolean;
    showTodayBottom?: boolean;
    locale?: Locale;
    showSidebar?: boolean;
    popupTargetId?:string
}
