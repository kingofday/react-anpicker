import { ComponentType } from 'react';
import { CustomInputRequiredProps } from "./Models/MainProps";
import Locale from './Models/Locale';
export declare const AnPicker: ({ className, onChange, value, showTodayBottom, locale, showSidebar, inputControl: Input, popupTargetId }: {
    onChange: (date: string) => void;
    value: string;
    className?: string | undefined;
    inputControl?: ComponentType<CustomInputRequiredProps> | undefined;
    showTodayBottom?: boolean | undefined;
    locale?: Locale | undefined;
    showSidebar?: boolean | undefined;
    popupTargetId?: string | undefined;
}) => JSX.Element;
