import { useRef, useLayoutEffect, ComponentType, useEffect } from 'react'
import Days from "./days";
import { getMonthName } from "./helpers";
import { CustomInputRequiredProps, Modes, Pos } from "./Models/MainProps";
import faLocale from "./Locales/faLocale";
import Years from './Years';
import Monthes from './Monthes';
import Sidebar from './Sidebar';
import ChevronIcon from './ChevronIcon';
import { createPortal } from 'react-dom';
import useControl from './Hooks/useControl';
import Locale from './Models/Locale';

function isMobile() {
    if ("navigator" in window && window.navigator.userAgent.match(/Android/i)
        || window.navigator.userAgent.match(/webOS/i)
        || window.navigator.userAgent.match(/iPhone/i)
        || window.navigator.userAgent.match(/iPad/i)
        || window.navigator.userAgent.match(/iPod/i)
        || window.navigator.userAgent.match(/BlackBerry/i)
        || window.navigator.userAgent.match(/Windows Phone/i)) {
        return true;
    } else {
        return false;
    }
}
export const AnPicker = ({
    className = '',
    onChange,
    value = "",
    showTodayBottom = true,
    locale = faLocale,
    showSidebar = true,
    inputControl: Input,
    popupTargetId
}: {
    onChange: (date: string) => void,
    value: string;
    className?: string;
    inputControl?: ComponentType<CustomInputRequiredProps>;
    showTodayBottom?: boolean;
    locale?: Locale;
    showSidebar?: boolean;
    popupTargetId?: string
}): JSX.Element => {
    const inputRef = useRef<HTMLInputElement>(null);
    const anPickerRef = useRef<HTMLDivElement | null>(null);
    const popupRef = useRef<HTMLDivElement | null>(null);
    const popupTarget = useRef<HTMLElement | null>(null);
    const {
        state,
        tempValue,
        toggle,
        handleFocus,
        handleBlure,
        setPopupStyles,
        handleChange,
        setMode,
        nextYear,
        prevYear,
        nextMonth,
        prevMonth,
        onSelectYear,
        onSelectMonth,
        onSelectDay,
        setToday
    } = useControl({
        anPickerRef,
        inputRef: inputRef,
        locale: locale,
        value: value,
        onChange,
    });
    const adjustPosition = () => {
        const inputRect = anPickerRef.current?.getBoundingClientRect();
        const popupRect = popupRef.current?.getBoundingClientRect();
        const parent = popupTargetId ? document.getElementById(popupTargetId) : null;
        const parentRect = popupTarget.current?.getBoundingClientRect();
        if (!popupRect || !inputRect) return;
        const scrollTop = window.scrollY || document.documentElement.scrollTop;
        const scrollLeft = window.scrollX || document.documentElement.scrollLeft;
        const inputOffsetTop = anPickerRef.current?.offsetTop ?? 0;
        const inputOffsetLeft = anPickerRef.current?.offsetLeft ?? 0;
        const topScroll = popupTargetId && popupTarget.current ? popupTarget.current.scrollTop : scrollTop;
        const leftScroll = popupTargetId && popupTarget.current ? popupTarget.current.scrollLeft : scrollLeft;
        const visibleTopOffset = inputOffsetTop - topScroll;
        const visibleLeftOffset = inputOffsetLeft - leftScroll;
        const popupHeight = 230 + (showTodayBottom ? 38 : 0);
        const popupWidth = 272 + (showSidebar ? 170 : 0);
        //const offsetHeight = popupTargetId && popupTarget.current ? popupTarget.current.offsetHeight - popupTarget.current.clientHeight : 0
        const offsetWidth = popupTargetId && popupTarget.current ? popupTarget.current.offsetWidth - popupTarget.current.clientWidth : 0
        const h = window.innerHeight;
        const w = window.innerWidth;
        let left: Pos = "auto";
        let right: Pos = "auto";
        let top: Pos = "auto";
        if (popupTargetId && parentRect) {
            const verticallScrollWidth = parent ? (parent?.offsetWidth - parent?.clientWidth) : 0;
            if (visibleLeftOffset >= popupWidth) {
                left = inputOffsetLeft - offsetWidth;
                right = "auto";
            }
            else {
                left = inputOffsetLeft - verticallScrollWidth;
                right = "auto";
            }
            if (visibleTopOffset >= popupHeight) {
                top = inputOffsetTop - popupRect.height;
            }
            else {
                top = inputOffsetTop + inputRect.height;
            }
        }
        else {
            if (inputRect.left + scrollLeft + popupRect.width > w) {
                left = inputRect.right - popupRect.width;
            }
            else {
                left = inputRect.left + scrollLeft;
            }
            top = (inputRect.top + inputRect.height + popupRect.height > h ?
                inputRect.top - popupRect.height : inputRect.top + inputRect.height) + scrollTop;
        }
        setPopupStyles(({ top, left, right, position: "absolute", visibility: "visible" }));
    }
    useEffect(() => {
        if (state.open) {
            adjustPosition();
        }
    }, [state.open])
    useLayoutEffect(() => {
        popupTarget.current = popupTargetId ? document.getElementById(popupTargetId) : document.body;
    }, [popupTargetId])
    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (!anPickerRef.current?.contains(e.target as Node) && !popupRef.current?.contains(e.target as Node)) {
                toggle(false);
            }
        }
        const onScrolled = function () {
            if (isMobile())
                adjustPosition();
            else {
                toggle(false);
                handleBlure();
            }
        };
        document.addEventListener("scroll", onScrolled);
        document.addEventListener("click", handleClickOutside);
        return () => {
            document.removeEventListener("scroll", onScrolled);
            document.removeEventListener("click", handleClickOutside);
        }
    }, []);
    return (
        <div className={`anpicker ${className}`} ref={anPickerRef} dir={locale.rtl ? "rtl" : "ltr"}>
            {Input ? <Input ref={inputRef} onChange={handleChange} onFocus={handleFocus} onBlur={handleBlure} value={tempValue ?? ""} /> : <input ref={inputRef} value={tempValue ?? ""} onChange={handleChange} onFocus={handleFocus} onBlur={handleBlure} />}
            {state.open ? createPortal(<div className="anpicker-popup"
                ref={popupRef}
                style={state.popupStyle}
                dir={locale.rtl ? "rtl" : "ltr"}>
                {showSidebar ? <Sidebar locale={locale} localYear={state.year} localMonth={state.month} localDay={state.day} /> : null}
                <div className='main'>
                    <div className='selector-heading'>
                        <div className='monthes'>
                            <a className='next' onClick={nextMonth} role="button">
                                <ChevronIcon type="next" rtl={locale.rtl} />
                            </a>
                            <a role="button" onClick={() => setMode(Modes.monthes)}>{getMonthName(locale.convertToDate(state.year, state.month, state.day), locale.name)}</a>
                            <a className='prev' onClick={prevMonth} role="button">
                                <ChevronIcon type="prev" rtl={locale.rtl} />
                            </a>
                        </div>
                        <div className='years'>
                            <a className='next' onClick={nextYear} role="button">
                                <ChevronIcon type="next" rtl={locale.rtl} />
                            </a>
                            <a role="button" onClick={() => setMode(Modes.years)}>{state.year}</a>
                            <a className='prev' onClick={prevYear} role="button">
                                <ChevronIcon type="prev" rtl={locale.rtl} />
                            </a>
                        </div>
                    </div>
                    <Years hidden={state.mode !== Modes.years} locale={locale} pageNumber={state.yearPageNumber} onSelectYear={onSelectYear} localYear={state.year} />
                    <Monthes hidden={state.mode !== Modes.monthes} locale={locale} onSelect={onSelectMonth} localMonth={state.month} />
                    <Days hidden={state.mode !== Modes.days} locale={locale} localYear={state.year} localMonth={state.month} localDay={state.day} onSelect={onSelectDay} />

                    {showTodayBottom && <button className='today-button' onClick={setToday}>
                        {locale.todayButtonText}
                    </button>}
                </div>
            </div>, popupTarget.current ?? document.body) : null}
        </div>

    )
}