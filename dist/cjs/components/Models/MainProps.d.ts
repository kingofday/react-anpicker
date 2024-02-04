import { ComponentType, Ref } from "react";
import Locale from "./Locale";
export declare enum Modes {
    days = 0,
    monthes = 1,
    years = 2
}
export type CustomInputRequiredProps = {
    onFocus: React.FocusEventHandler<HTMLInputElement> | undefined;
    value: string | number | readonly string[] | undefined;
    ref?: Ref<any>;
    [key: string]: any;
};
export type Pos = "auto" | number;
export default interface MainProps {
    onChange: (date: Date | null, localDate: string | null) => void;
    value: Date | null;
    className?: string;
    inputControl?: ComponentType<CustomInputRequiredProps>;
    defaultOpen?: boolean;
    showTodayBottom?: boolean;
    locale?: Locale;
    showSidebar?: boolean;
    popupTargetId?: string;
}
