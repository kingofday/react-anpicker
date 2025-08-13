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
  popupVPosition,
  popupHPosition,
}: {
  onChange: (date: string, gregorianDate?: [number, number, number]) => void;
  value: string;
  className?: string;
  inputControl?: ComponentType<CustomInputRequiredProps>;
  showTodayBottom?: boolean;
  locale?: Locale;
  showSidebar?: boolean;
  popupParentRef?: RefObject<HTMLElement>;
  popupVPosition?: "top" | "bottom";
  popupHPosition?: "left" | "right";
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
  // function getRelativeTop(child: HTMLElement, ancestor: HTMLElement) {
  //   const childRect = child.getBoundingClientRect();
  //   const ancestorRect = ancestor.getBoundingClientRect();
  //   return childRect.top - ancestorRect.top + ancestor.scrollTop;
  // }
  const adjustPosition = () => {
    const popupParent = popupParentRef ? popupParentRef.current : null;
    const inputEl = anPickerRef.current;
    const popupEl = popupRef.current;

    if (!inputEl || !popupEl) return;

    const inputRect = inputEl.getBoundingClientRect();
    const mobileMode = document.documentElement.clientWidth < 1200;
    const popupHeight = 268 - (showTodayBottom ? 6 : 0);
    const popupWidth = mobileMode ? 272 : 422;
    //const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const scrollLeft = window.scrollX || document.documentElement.scrollLeft;
    let spaceAbove: number;
    let spaceBelow: number;
    let parentRect: DOMRect;
    if (popupParent) {
      parentRect = popupParent.getBoundingClientRect();
      spaceAbove = inputRect.top - parentRect.top;
      spaceBelow = parentRect.bottom - inputRect.bottom;
    } else {
      spaceAbove = inputRect.top;
      spaceBelow = window.innerHeight - inputRect.bottom;
    }
    const showAbove =
      typeof popupVPosition !== "undefined"
        ? popupVPosition === "top"
        : spaceBelow < popupHeight && spaceAbove > popupHeight;
    let top: Pos = "auto";
    let bottom: Pos = "auto";
    if (popupParent) {
      const relativeTop =
        inputRect.top - parentRect!.top + popupParent.scrollTop;
      if (showAbove) {
        bottom = parentRect!.bottom - inputRect!.top;
      } else {
        top = relativeTop + inputEl.offsetHeight;
      }
    } else {
      if (showAbove) {
        bottom = window.innerHeight - inputRect.top;
      } else {
        top = inputRect.bottom;
      }
    }
    //=== H position

    let left: Pos = "auto";
    let right: Pos = "auto";
    let spaceOnLeft: number;
    let spaceOnRight: number;
    if (popupParent) {
      spaceOnLeft = inputRect.right - parentRect!.left;
      spaceOnRight = parentRect!.right - inputRect.left;
      // console.log({
      //   spaceOnLeft,
      //   spaceOnRight,
      //   parentRect: {
      //     width: parentRect!.width,
      //     left: parentRect!.left,
      //     right: parentRect!.right,
      //   },
      // });
    } else {
      spaceOnLeft = inputRect.right;
      spaceOnRight = window.innerWidth - inputRect.left;
    }
    // console.log({
    //   spaceOnLeft,
    //   spaceOnRight,
    // });
    const showRight =
      typeof popupHPosition !== "undefined"
        ? popupHPosition === "left"
        : spaceOnRight > popupWidth && spaceOnLeft < popupWidth;
    console.log("showRight", showRight);
    // const showOnLeft =
    if (popupParent) {
      if (!showRight) {
        right = parentRect!.right - inputRect.right;
      } else {
        left = inputRect.left - parentRect!.left;
      }
    } else {
      //const spaceOnLeft = inputRect.right;
      if (!showRight) {
        right = document.documentElement.clientWidth - inputRect.right;
      } else {
        left = inputRect.left + scrollLeft;
      }
    }

    setPopupStyles({
      top,
      bottom,
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
              className={`anpicker-popup${popupParentRef ? "" : " fixed"}`}
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
