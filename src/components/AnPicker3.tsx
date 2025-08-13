import { useRef, ComponentType, useEffect, RefObject } from "react";
import Days from "./days";
import { getMonthName } from "./helpers";
import { CustomInputRequiredProps, Modes, Pos } from "./Models/MainProps";
import faLocale from "./Locales/faLocale";
import Years from "./Years";
import Monthes from "./Monthes";
import Sidebar from "./Sidebar";
import ChevronIcon from "./ChevronIcon";
import { createPortal } from "react-dom";
import useControl from "./Hooks/useControl";
import Locale from "./Models/Locale";

// function isMobile() {
//   if (
//     ("navigator" in window && window.navigator.userAgent.match(/Android/i)) ||
//     window.navigator.userAgent.match(/webOS/i) ||
//     window.navigator.userAgent.match(/iPhone/i) ||
//     window.navigator.userAgent.match(/iPad/i) ||
//     window.navigator.userAgent.match(/iPod/i) ||
//     window.navigator.userAgent.match(/BlackBerry/i) ||
//     window.navigator.userAgent.match(/Windows Phone/i)
//   ) {
//     return true;
//   } else {
//     return false;
//   }
// }
export const AnPicker = ({
  className = "",
  onChange,
  value = "",
  showTodayBottom = true,
  locale = faLocale,
  showSidebar = true,
  inputControl: Input,
  popupParentRef,
}: {
  onChange: (date: string, gregorianDate?: [number, number, number]) => void;
  value: string;
  className?: string;
  inputControl?: ComponentType<CustomInputRequiredProps>;
  showTodayBottom?: boolean;
  locale?: Locale;
  showSidebar?: boolean;
  popupParentRef?: RefObject<HTMLElement>;
}): JSX.Element => {
  const inputRef = useRef<HTMLInputElement>(null);
  const anPickerRef = useRef<HTMLDivElement | null>(null);
  const popupRef = useRef<HTMLDivElement | null>(null);
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
    setToday,
  } = useControl({
    anPickerRef,
    inputRef: inputRef,
    locale: locale,
    value: value,
    onChange,
  });
  function getRelativeTop(child: HTMLElement, ancestor: HTMLElement) {
    const childRect = child.getBoundingClientRect();
    const ancestorRect = ancestor.getBoundingClientRect();
    return childRect.top - ancestorRect.top + ancestor.scrollTop;
  }
  const adjustPosition = () => {
    const popupParent = popupParentRef ? popupParentRef.current : null;
    const inputEl = anPickerRef.current;
    const popupEl = popupRef.current;

    if (!inputEl || !popupEl) return;

    const inputRect = inputEl.getBoundingClientRect();
    const popupHeight = showTodayBottom ? 300 : 262;
    const popupWidth = window.outerWidth > 1200 ? 422 : 272;
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const scrollLeft = window.scrollX || document.documentElement.scrollLeft;
    let spaceAbove: number;
    let spaceBelow: number;

    if (popupParent) {
      const parentRect = popupParent.getBoundingClientRect();
      spaceAbove = inputRect.top - parentRect.top;
      spaceBelow = parentRect.bottom - inputRect.bottom;
    } else {
      spaceAbove = inputRect.top;
      spaceBelow = window.innerHeight - inputRect.bottom;
    }
    const showAbove = spaceBelow < popupHeight && spaceAbove > popupHeight;
    let top: Pos = "auto";
    if (popupParent) {
      const relativeTop = getRelativeTop(inputEl, popupParent);
      top = showAbove
        ? relativeTop - popupHeight
        : relativeTop + inputEl.offsetHeight;
    } else {
      top = showAbove
        ? inputRect.top - popupHeight + scrollTop
        : inputRect.bottom + scrollTop;
    }
    let left: Pos = "auto";
    let right: Pos = "auto";
    if (popupParent) {
      const parentRect = popupParent.getBoundingClientRect();
      if (locale.rtl) {
        const spaceOnLeft = inputRect.left - parentRect.left + inputRect.width;
        if (spaceOnLeft >= popupWidth) {
          right = parentRect.right - inputRect.right;
        } else {
          // Not enough space -> align left edge of input with popup's left edge
          left = inputRect.left - parentRect.left;
        }
      } else {
        // LTR: try aligning left edges first
        const spaceOnRight = parentRect.right - inputRect.left;
        if (spaceOnRight >= popupWidth) {
          left = inputRect.left - parentRect.left;
        } else {
          // Not enough space -> align right edge of input with popup's right edge
          right = parentRect.right - inputRect.right;
        }
      }
    } else {
      // No parent, just use viewport
      if (locale.rtl) {
        const spaceOnLeft = inputRect.left;
        if (spaceOnLeft >= popupWidth) {
          right = document.documentElement.clientWidth - inputRect.right;
        } else {
          left = inputRect.left + scrollLeft;
        }
      } else {
        const spaceOnRight = window.innerWidth - inputRect.left;
        if (spaceOnRight >= popupWidth) {
          left = inputRect.left + scrollLeft;
        } else {
          right = document.documentElement.clientWidth - inputRect.right;
        }
      }
    }

    setPopupStyles({
      top,
      left,
      right,
      visibility: "visible",
    });
  };

  useEffect(() => {
    if (!state.open) return;

    // Initial adjustment
    adjustPosition();

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry && entry.isIntersecting) {
          adjustPosition();
        }
      },
      {
        root: null,
        threshold: 0.1,
      }
    );

    const inputEl = anPickerRef.current;
    if (inputEl) observer.observe(inputEl);

    const scrollableParents: HTMLElement[] = [];

    // Find scrollable ancestors and attach scroll event listeners
    let parent = inputEl?.parentElement;
    while (parent) {
      const overflowY = window.getComputedStyle(parent).overflowY;
      if (overflowY === "scroll" || overflowY === "auto") {
        scrollableParents.push(parent);
        parent.addEventListener("scroll", adjustPosition);
      }
      parent = parent.parentElement;
    }

    // Also listen to window scroll
    window.addEventListener("scroll", adjustPosition, true);

    return () => {
      if (inputEl) observer.unobserve(inputEl);
      scrollableParents.forEach((p) => {
        p.removeEventListener("scroll", adjustPosition);
      });
      window.removeEventListener("scroll", adjustPosition, true);
    };
  }, [state.open]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        !anPickerRef.current?.contains(e.target as Node) &&
        !popupRef.current?.contains(e.target as Node)
      ) {
        toggle(false);
      }
    };
    // const onScrolled = function () {
    //   if (isMobile()) adjustPosition();
    //   else {
    //     toggle(false);
    //     handleBlure();
    //   }
    // };
    // document.addEventListener("scroll", onScrolled);
    document.addEventListener("click", handleClickOutside);
    return () => {
      //document.removeEventListener("scroll", onScrolled);
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);
  return (
    <div
      className={`anpicker ${className}`}
      ref={anPickerRef}
      dir={locale.rtl ? "rtl" : "ltr"}
    >
      {Input ? (
        <Input
          ref={inputRef}
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlure}
          value={tempValue ?? ""}
        />
      ) : (
        <input
          ref={inputRef}
          value={tempValue ?? ""}
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlure}
        />
      )}
      {state.open
        ? createPortal(
            <div
              className="anpicker-popup"
              ref={popupRef}
              style={state.popupStyle}
              dir={locale.rtl ? "rtl" : "ltr"}
            >
              {showSidebar ? (
                <Sidebar
                  locale={locale}
                  localYear={state.year}
                  localMonth={state.month}
                  localDay={state.day}
                />
              ) : null}
              <div className="main">
                <div className="selector-heading">
                  <div className="monthes">
                    <a className="next" onClick={nextMonth} role="button">
                      <ChevronIcon type="next" rtl={locale.rtl} />
                    </a>
                    <a role="button" onClick={() => setMode(Modes.monthes)}>
                      {getMonthName(
                        locale.convertToDate(
                          state.year,
                          state.month,
                          state.day
                        ),
                        locale.name
                      )}
                    </a>
                    <a className="prev" onClick={prevMonth} role="button">
                      <ChevronIcon type="prev" rtl={locale.rtl} />
                    </a>
                  </div>
                  <div className="years">
                    <a className="next" onClick={nextYear} role="button">
                      <ChevronIcon type="next" rtl={locale.rtl} />
                    </a>
                    <a role="button" onClick={() => setMode(Modes.years)}>
                      {state.year}
                    </a>
                    <a className="prev" onClick={prevYear} role="button">
                      <ChevronIcon type="prev" rtl={locale.rtl} />
                    </a>
                  </div>
                </div>
                <Years
                  hidden={state.mode !== Modes.years}
                  locale={locale}
                  pageNumber={state.yearPageNumber}
                  onSelectYear={onSelectYear}
                  localYear={state.year}
                />
                <Monthes
                  hidden={state.mode !== Modes.monthes}
                  locale={locale}
                  onSelect={onSelectMonth}
                  localMonth={state.month}
                />
                <Days
                  hidden={state.mode !== Modes.days}
                  locale={locale}
                  localYear={state.year}
                  localMonth={state.month}
                  localDay={state.day}
                  onSelect={onSelectDay}
                />

                {showTodayBottom && (
                  <button className="today-button" onClick={setToday}>
                    {locale.todayButtonText}
                  </button>
                )}
              </div>
            </div>,
            popupParentRef?.current ? popupParentRef.current : document.body
          )
        : null}
    </div>
  );
};
