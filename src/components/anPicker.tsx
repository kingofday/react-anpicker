import './anPicker.css';
import { useState, useEffect, useRef, useLayoutEffect, useMemo, useCallback } from 'react'
import Days from "./days";
import { getMonthName, getYear, convertToLocalDate } from "./helpers";
import MainProps from "./Models/MainProps";
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
    defaultOpen=false,
    showTodayBottom = true,
    locale = faLocale,
    inputControl: Input
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
    const [changed, valueChanged] = useState<boolean>(false);
    const [mode, setMode] = useState<Modes>(Modes.days);
    const [yearPageNumber, setYearPageNumber] = useState(0);
    const onSelectDay = (dayNumber: number) => {
        setDay(dayNumber);
        valueChanged(true);
    }
    const onSelectMonth = (month: number) => {
        setMonth(month);
        valueChanged(true);
        handleMode(Modes.days);
    }
    const onSelectYear = (year: number) => {
        setYear(year);
        valueChanged(true);
        handleMode(Modes.days);

    }
    const nextYear = () => {
        setYearPageNumber(y => y + 1);
        handleMode(Modes.years, true);
    }
    const prevYear = () => {
        setYearPageNumber(y => localYear > 12 ? y - 1 : y);
        handleMode(Modes.years, true);
    }
    const nextMonth = () => {
        setMonth(m => m === 12 ? 1 : m + 1);
        valueChanged(true);
        handleMode(Modes.days);
    }
    const prevMonth = () => {
        setMonth(m => m === 1 ? 12 : m - 1);
        valueChanged(true);
        handleMode(Modes.days);
    }
    const setToday = () => {
        let eqDateArr = convertToLocalDate(new Date(), locale);
        valueChanged(true);
        setYear(eqDateArr[0]);
        setMonth(eqDateArr[1]);
        setDay(eqDateArr[2]);
    }
    const handleMode = useCallback((newMode: Modes, igonrePrev?: boolean) => {
        setMode(m => {
            if (!igonrePrev && m === newMode) return Modes.days;
            else return newMode;
        })
    }, []);
    useEffect(() => {
        let baseYear = getYear(new Date(), locale.name);
        setYear(locale.numberConverter(baseYear) + yearPageNumber * 12);
    }, [yearPageNumber]);
    useEffect(() => {
        let date = locale.convertToDate(localYear, localMonth, localDay);
        onChange(new Date(`${date[0]}/${date[1]}/${date[2]}`), `${localYear}/${localMonth}/${localDay}`);
    }, [localYear, localMonth, localDay]);
    useEffect(() => {
        if (!value) return;
        const eqArr = convertToLocalDate(value as Date, locale);
        if (eqArr[0] !== localYear)
            setYear(eqArr[0]);
        if (eqArr[1] !== localMonth)
            setMonth(eqArr[1]);
        if (eqArr[2] !== localDay)
            setDay(eqArr[2]);
    }, [value]);
    useLayoutEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (!anPickerRef.current?.contains(e.target as Node)) {
                console.log("outside clicked")
                toggle(false);
            }
        }
        document.addEventListener("click", handleClickOutside);
        return () => {
            document.removeEventListener("click", handleClickOutside);
        }
    }, []);
    return (
        <div className={`anpicker ${className}`} ref={anPickerRef}>
            {Input ? <Input readOnly onFocus={() => toggle(true)} value={value || changed ? `${localYear}/${localMonth}/${localDay}` : ""} /> : <input value={value || changed ? `${localYear}/${localMonth}/${localDay}` : ""} readOnly onFocus={() => toggle(true)} />}
            {isOpen ? <div className="popup">
                {value ? <div className='sidebar' /> : null}
                <div className='main'>
                    <div className='selector-heading'>
                        <div className='monthes'>
                            <a className='next' onClick={nextMonth} role="button">
                                <PreviousIcon />
                            </a>
                            <a role="button" onClick={() => handleMode(Modes.monthes)}>{getMonthName(locale.convertToDate(localYear, localMonth, localDay), locale.name)}</a>
                            <a className='prev' onClick={prevMonth} role="button">
                                <NextIcon />
                            </a>
                        </div>
                        <div className='years'>
                            <a className='next' onClick={nextYear} role="button">
                                <PreviousIcon />
                            </a>
                            <a role="button" onClick={() => handleMode(Modes.years)}>{localYear}</a>
                            <a className='prev' onClick={prevYear} role="button">
                                <NextIcon />
                            </a>
                        </div>
                    </div>
                    <Years hidden={mode !== Modes.years} locale={locale} pageNumber={yearPageNumber} onSelectYear={onSelectYear} localYear={localYear} />
                    <Monthes hidden={mode !== Modes.monthes} locale={locale} onSelect={onSelectMonth} localMonth={localMonth} />
                    <Days hidden={mode !== Modes.days} locale={locale} localYear={localYear} localMonth={localMonth} localDay={localDay} onSelect={onSelectDay} />
                    {/* {(() => {
                        switch (mode) {
                            case Modes.years:
                                return 
                            case Modes.monthes:
                                return 
                            default:
                                return 
                        }
                    })()} */}
                    {showTodayBottom && <button className='today-button' onClick={setToday}>
                        {locale.todayButtonText}
                    </button>}
                </div>
            </div> : null}
        </div>

    )
}