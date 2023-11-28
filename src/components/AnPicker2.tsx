import { useState, useRef, useMemo, useCallback, ChangeEvent, CSSProperties, useEffect, useLayoutEffect } from 'react'
import Days from "./days";
import { getMonthName, convertToLocalDate } from "./helpers";
import MainProps, { Pos } from "./Models/MainProps";
import faLocale from "./Locales/faLocale";
import Years from './Years';
import Monthes from './Monthes';
import Sidebar from './Sidebar';
import ChevronIcon from './ChevronIcon';
import { createPortal } from 'react-dom';

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
    inputControl: Input,
    popupTargetId
}: MainProps): JSX.Element => {
    const inputRef = useRef<HTMLInputElement>(null);
    const anPickerRef = useRef<HTMLDivElement | null>(null);
    const popupRef = useRef<HTMLDivElement | null>(null);
    const popupTarget = useRef<HTMLElement | null>(null);
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
    const changed = useRef(false);
    //const [changed, valueChanged] = useState<boolean>(false);
    const [mode, setMode] = useState<Modes>(Modes.days);
    const [yearPageNumber, setYearPageNumber] = useState(0);
    const [innerValue, setInnerValue] = useState('');
    const [popupStyle, setPopupStyle] = useState<CSSProperties | undefined>(undefined);
    const adjustPosition = () => {
        const inputRect = anPickerRef.current?.getBoundingClientRect();
        const popupRect = popupRef.current?.getBoundingClientRect();
        if (!popupRect || !inputRect) return;
        const h = window.innerHeight;
        let left: Pos = "auto";
        let right: Pos = "auto";
        let top: Pos = "auto";
        if (locale.rtl) {
            if (popupRect.x < 0) {
                left = 0;
                right; "auto";
            }
            else {
                left = locale.rtl ? inputRect.right - popupRect.width : inputRect.left;
                right = "auto"
            }
            if (popupRect.top + popupRect.height > h) {
                top = inputRect.top - popupRect.height;
            }
            else {
                top = inputRect.top + inputRect.height;
            }

        }
        setPopupStyle(({ top, left, right }));
    }
    const onSelectDay = useCallback((dayNumber: number) => {
        changed.current = true;
        toggle(false);
        setDay(dayNumber);
    }, []);
    const onSelectMonth = useCallback((month: number) => {
        changed.current = true;
        setMonth(month);
        handleMode(Modes.days);
    }, []);
    const onSelectYear = useCallback((year: number) => {
        changed.current = true;
        setYear(year);
        handleMode(Modes.days);
    }, []);
    const nextYear = () => {
        if (mode === Modes.years)
            setYearPageNumber(y => y + 1);
        else {
            changed.current = true;
            setYear(y => y + 1);
        }

    }
    const prevYear = () => {
        if (mode === Modes.years)
            setYearPageNumber(y => localYear > 12 ? y - 1 : y);
        else {
            changed.current = true;
            setYear(y => y > 1 ? y - 1 : y);
        }
    }
    const nextMonth = () => {
        setDay(1);
        setMonth(m => {
            return m === 12 ? 1 : m + 1;
        });
        changed.current = true;
        handleMode(Modes.days);
    }
    const prevMonth = () => {
        setDay(1);
        setMonth(m => m === 1 ? 12 : m - 1);
        changed.current = true;
        handleMode(Modes.days);
    }
    const setToday = () => {
        let eqDateArr = convertToLocalDate(new Date(), locale);
        changed.current = true;
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
        return innerValue ? innerValue : (value ? `${localYear}/${localMonth < 10 ? `0${localMonth}` : localMonth}/${localDay < 10 ? `0${localDay}` : localDay}` : "");
    }

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (!e.target.value) {
            changed.current = false;
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
        changed.current = true;
    }
    const handleFocus = () => {
        let inputRect = anPickerRef.current?.getBoundingClientRect();
        if (inputRect)
            setPopupStyle({
                left: locale.rtl ? "auto" : inputRect.left,
                right: locale.rtl ? window.innerWidth - inputRect.right : "auto",
                top: inputRect.top + inputRect.height,
            })
        toggle(true);
    }
    useLayoutEffect(() => {
        if (!changed.current) return;
        let date = locale.convertToDate(localYear, localMonth, localDay);
        if (value) {
            const eqArr = convertToLocalDate(value as Date, locale);
            if (eqArr[0] === localYear && eqArr[1] === localMonth && eqArr[2] === localDay)
                return;
        }
        onChange(new Date(`${date[0]}/${date[1]}/${date[2]} 12:00:00`), `${localYear}/${localMonth < 10 ? `0${localMonth}` : localMonth}/${localDay < 10 ? `0${localDay}` : localDay}`);
    }, [localYear, localMonth, localDay]);
    useLayoutEffect(() => {
        if (!value) {
            changed.current = false;
            setInnerValue('');
            return;
        }
        const eqArr = convertToLocalDate(new Date(value), locale);
        if (eqArr[0] !== localYear)
            setYear(eqArr[0]);
        if (eqArr[1] !== localMonth)
            setMonth(eqArr[1]);
        if (eqArr[2] !== localDay)
            setDay(eqArr[2]);
    }, [value]);
    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (!anPickerRef.current?.contains(e.target as Node) && !popupRef.current?.contains(e.target as Node)) {
                toggle(false);
            }
        }
        const onScrolled = function () {
            inputRef.current?.blur?.();
            toggle(false);
        };
        document.addEventListener("scroll", onScrolled);
        document.addEventListener("click", handleClickOutside);
        return () => {
            document.removeEventListener("scroll", onScrolled);
            document.removeEventListener("click", handleClickOutside);
        }
    }, []);
    useLayoutEffect(() => {
        popupTarget.current = popupTargetId ? document.getElementById(popupTargetId) : document.body;
    }, [popupTargetId])
    useLayoutEffect(() => {
        if (isOpen) {
            adjustPosition();
        }
    }, [isOpen])
    return (
        <div className={`anpicker ${className}`} ref={anPickerRef} dir={locale.rtl ? "rtl" : "ltr"}>
            {Input ? <Input ref={inputRef} onChange={handleChange} onFocus={handleFocus} onBlur={handleBlure} value={valueToShow()} /> : <input ref={inputRef} value={valueToShow()} onChange={handleChange} onFocus={handleFocus} onBlur={handleBlure} />}
            {isOpen ? createPortal(<div className="anpicker-popup"
                ref={popupRef}
                style={popupStyle}
                dir={locale.rtl ? "rtl" : "ltr"}>
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
            </div>, popupTarget.current ?? document.body) : null}
        </div>

    )
}