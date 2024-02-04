import { ComponentType, Ref } from "react";
import Locale from "./Locale";
export enum Modes {
    days,
    monthes,
    years
}
export type CustomInputRequiredProps = {
    onFocus: React.FocusEventHandler<HTMLInputElement> | undefined;
    value: string | number | readonly string[] | undefined;
    ref?: Ref<any>;
    [key: string]: any
}
export type Pos = "auto" | number;
export default interface MainProps {
    onChange: (date: Date | null, localDate: string | null) => void,
    value: Date | null;
    className?: string;
    inputControl?: ComponentType<CustomInputRequiredProps>;
    defaultOpen?: boolean;
    showTodayBottom?: boolean;
    locale?: Locale;
    showSidebar?: boolean;
    popupTargetId?: string
}
