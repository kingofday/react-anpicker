import { useState, useEffect, useRef, useLayoutEffect, useMemo, useCallback, ChangeEvent, CSSProperties } from 'react'
import Days from "./days";
import { getMonthName, getYear, convertToLocalDate } from "./helpers";
import MainProps from "./Models/MainProps";
import faLocale from "./Locales/faLocale";

import Years from './Years';
import Monthes from './Monthes';
import Sidebar from './Sidebar';
import ChevronIcon from './ChevronIcon';

enum Modes {
    days,
    monthes,
    years
}

export const AnPicker = ({
    className = '',
    onChange,
    value = null,
    defaultOpen = false,
    showTodayBottom = true,
    locale = faLocale,
    showSidebar = true,
    inputControl: Input
}: MainProps): JSX.Element => {
    const anPickerRef = useRef<HTMLDivElement>(null);
    const popupRef = useRef<HTMLDivElement>(null);
    let init = useMemo(() => {
        if (value) {
            return convertToLocalDate(value as Date, locale);
        }
        else {
            return convertToLocalDate(new Date(), locale);
        }
    }, []);
    const hadValue = useMemo(() => !!value, []);
    const [isOpen, toggle] = useState<boolean>(defaultOpen);
    const [localYear, setYear] = useState<number>(init[0]);
    const [localMonth, setMonth] = useState<number>(init[1]);
    const [localDay, setDay] = useState<number>(init[2]);
    const [changed, valueChanged] = useState<boolean>(false);
    const [mode, setMode] = useState<Modes>(Modes.days);
    const [yearPageNumber, setYearPageNumber] = useState(0);
    const [innerValue, setInnerValue] = useState('');
    const [popupStyle, setPopupStyle] = useState<CSSProperties | undefined>(undefined);
    const onSelectDay = useCallback((dayNumber: number) => {
        setDay(dayNumber);
        valueChanged(true);
        toggle(false);
    }, []);
    const onSelectMonth = useCallback((month: number) => {
        setMonth(month);
        valueChanged(true);
        handleMode(Modes.days);
    }, []);
    const onSelectYear = useCallback((year: number) => {
        setYear(year);
        valueChanged(true);
        handleMode(Modes.days);
    }, []);
    const nextYear = () => {
        if (mode === Modes.years)
            setYearPageNumber(y => y + 1);
        else setYear(y => y + 1);
        //handleMode(Modes.years, true);
    }
    const prevYear = () => {
        if (mode === Modes.years)
            setYearPageNumber(y => localYear > 12 ? y - 1 : y);
        else setYear(y => y > 1 ? y - 1 : y);
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
    const valueToShow = () => {
        return innerValue ? innerValue : (value || changed ? `${localYear}/${localMonth < 10 ? `0${localMonth}` : localMonth}/${localDay < 10 ? `0${localDay}` : localDay}` : "");
    }
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (!e.target.value) {
            valueChanged(false);
            onChange(null, null);
        }
        setInnerValue(e.target.value);
    }
    const handleBlure = () => {
        if (!innerValue) {
            return;
        }
        let arr = innerValue.split('/');
        if (arr.length !== 3) {
            setInnerValue('');
            return;
        }
        let y = Number(arr[0]);
        let m = Number(arr[1]);
        let d = Number(arr[2]);
        if (isNaN(y) || isNaN(m) || isNaN(d)) {
            setInnerValue('');
            return;
        }
        setInnerValue('');
        setYear(y);
        setMonth(m);
        setDay(d);
        valueChanged(true);
    }
    useEffect(() => {
        let baseYear = getYear(new Date(), locale.name);
        setYear(locale.numberConverter(baseYear) + yearPageNumber * 12);
    }, [yearPageNumber]);
    useEffect(() => {
        if (!changed) return;
        let date = locale.convertToDate(localYear, localMonth, localDay);
        onChange(new Date(`${date[0]}/${date[1]}/${date[2]} 12:00:00:00`), `${localYear}/${localMonth < 10 ? `0${localYear}` : localYear}/${localDay < 10 ? `0${localDay}` : localDay}`);
    }, [localYear, localMonth, localDay]);
    useEffect(() => {
        if (!value) {
            if (hadValue) {
                valueChanged(false);
                onChange(null, null);
            }
            return;
        }
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
                toggle(false);
            }
        }
        document.addEventListener("click", handleClickOutside);
        return () => {
            document.removeEventListener("click", handleClickOutside);
        }
    }, []);
    useEffect(() => {
        if (isOpen) {
            const rect = popupRef.current?.getBoundingClientRect();
            if (!rect) return;
            if (rect.x < 0) setPopupStyle({ left: 0 });
            if (rect.x + rect.width > window.innerWidth) {
                setPopupStyle(locale.rtl ? { right: 0 } : { left: 0 });
            }
        }
    }, [isOpen])
    return (
        <div className={`anpicker ${className}`} ref={anPickerRef} dir={locale.rtl ? "rtl" : "ltr"}>
            {Input ? <Input onChange={handleChange} onFocus={() => toggle(true)} value={valueToShow()} /> : <input value={valueToShow()} onChange={handleChange} onFocus={() => toggle(true)} onBlur={handleBlure} />}
            {isOpen ? <div className="popup" ref={popupRef} style={popupStyle} dir={locale.rtl ? "rtl" : "ltr"}>
                {showSidebar ? <Sidebar locale={locale} localYear={localYear} localMonth={localMonth} localDay={localDay} /> : null}
                <div className='main'>
                    <div className='selector-heading'>
                        <div className='monthes'>
                            <a className='next' onClick={nextMonth} role="button">
                                <ChevronIcon type="next" rtl={locale.rtl} />
                            </a>
                            <a role="button" onClick={() => handleMode(Modes.monthes)}>{getMonthName(locale.convertToDate(localYear, localMonth, localDay), locale.name)}</a>
                            <a className='prev' onClick={prevMonth} role="button">
                                <ChevronIcon type="prev" rtl={locale.rtl} />
                            </a>
                        </div>
                        <div className='years'>
                            <a className='next' onClick={nextYear} role="button">
                                <ChevronIcon type="next" rtl={locale.rtl} />
                            </a>
                            <a role="button" onClick={() => handleMode(Modes.years)}>{localYear}</a>
                            <a className='prev' onClick={prevYear} role="button">
                                <ChevronIcon type="prev" rtl={locale.rtl} />
                            </a>
                        </div>
                    </div>
                    <Years hidden={mode !== Modes.years} locale={locale} pageNumber={yearPageNumber} onSelectYear={onSelectYear} localYear={localYear} />
                    <Monthes hidden={mode !== Modes.monthes} locale={locale} onSelect={onSelectMonth} localMonth={localMonth} />
                    <Days hidden={mode !== Modes.days} locale={locale} localYear={localYear} localMonth={localMonth} localDay={localDay} onSelect={onSelectDay} />

                    {showTodayBottom && <button className='today-button' onClick={setToday}>
                        {locale.todayButtonText}
                    </button>}
                </div>
            </div> : null}
        </div>

    )
}