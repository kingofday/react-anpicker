import './anPicker.css';
import { useState, useEffect, useRef, useLayoutEffect, useMemo } from 'react'
import Days from "./days";
import { getMonth, getYear, convertToLocalDate } from "./helpers";
import { MainProps } from "./models";
import faLocale from "./Locales/faLocale";

import Years from './Years';
import Monthes from './Monthes';

enum Modes {
    days,
    monthes,
    years
}

function NextIcon() {
    return <svg width="6" height="10" viewBox="0 0 6 10" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M5.25 9.5L0.75 5L5.25 0.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>

}
function PreviousIcon() {
    return <svg width="6" height="10" viewBox="0 0 6 10" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M0.75 9.5L5.25 5L0.75 0.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>;

}

export const AnPicker = ({
    className = '',
    onChange,
    value = null,
    inputControl: Input,
    defaultOpen = false,
    locale = faLocale
}: MainProps): JSX.Element => {
    const anPickerRef = useRef<HTMLDivElement>(null);
    let init = useMemo(() => {
        if (value) {
            return convertToLocalDate(value as Date, locale);
        }
        else {
            return convertToLocalDate(new Date(), locale);
        }
    }, []);
    const [isOpen, toggle] = useState<boolean>(defaultOpen);
    const [localYear, setYear] = useState<number>(init[0]);
    const [localMonth, setMonth] = useState<number>(init[1]);
    const [localDay, setDay] = useState<number>(init[2]);
    const [mode, setMode] = useState<Modes>(Modes.days);
    const [yearPageNumber, setYearPageNumber] = useState(0);
    const currentDate = new Date();
    const onSelectDay = (dayNumber: number) => {
        setDay(dayNumber);
    }
    const onSelectMonth = (month: number) => {
        setMonth(month);
    }
    const onSelectYear = (year: number) => {
        setYear(year);
    }
    const nextYear = () => {
        setYearPageNumber(y => y + 1);
    }
    const prevYear = () => {
        console.log(yearPageNumber);
        setYearPageNumber(y => y - 1);

    }
    const nextMonth = () => { }
    const prevMonth = () => { }
    const handleClickOutside = (e: MouseEvent) => {
        if (!anPickerRef.current?.contains(e.target as Node)) {
            toggle(false);
        }
    }
    useEffect(() => {
        let date = locale.convertToDate(localYear, localMonth, localDay)
        onChange(new Date(`${date[0]}/${date[1]}/${date[2]}`), `${localYear}/${localMonth}/${localDay}`);
    }, [localYear, localMonth, localDay]);
    useLayoutEffect(() => {
        if (!anPickerRef || !anPickerRef.current) return;
        document.addEventListener("click", handleClickOutside);
    }, [anPickerRef.current]);
    useEffect(() => {
        return () => {
            document.removeEventListener("click", handleClickOutside);
        }
    }, [])
    return (
        <div className={`anpicker ${className}`} ref={anPickerRef}>
            {Input ? <Input readOnly onFocus={() => toggle(true)} /> : <input value={value ? new Intl.DateTimeFormat(locale.name).format(value) : ""} readOnly onFocus={() => toggle(true)} />}
            {isOpen ? <div className="popup">
                {value ? <div className='sidebar' /> : null}
                <div className='main'>
                    <div className='selector-heading'>
                        <div className='monthes'>
                            <a className='next' onClick={nextMonth} role="button">
                                <PreviousIcon />
                            </a>
                            <a role="button" onClick={() => setMode(Modes.monthes)}>{value ? getMonth(value, locale.name) : getMonth(currentDate, locale.name)}</a>
                            <a className='prev' onClick={prevMonth} role="button">
                                <NextIcon />
                            </a>
                        </div>
                        <div className='years'>
                            <a className='next' onClick={nextYear} role="button">
                                <PreviousIcon />
                            </a>
                            <a role="button" onClick={() => setMode(Modes.years)}>{value ? getYear(value, locale.name) : getYear(currentDate, locale.name)}</a>
                            <a className='prev' onClick={prevYear} role="button">
                                <NextIcon />
                            </a>
                        </div>
                    </div>
                    {(() => {
                        switch (mode) {
                            case Modes.years:
                                return <Years pageNumber={yearPageNumber} onSelectYear={onSelectYear} date={value ?? currentDate} />;
                            case Modes.monthes:
                                return <Monthes locale={locale} onSelect={onSelectMonth} localMonth={localMonth} />
                            default:
                                return <Days locale={locale} localYear={localYear} localMonth={localMonth} onSelect={onSelectDay} />;
                        }
                    })()}
                </div>
            </div> : null}
        </div>

    )
}