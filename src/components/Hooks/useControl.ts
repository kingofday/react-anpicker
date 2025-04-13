import {
  CSSProperties,
  MutableRefObject,
  RefObject,
  useCallback,
  useEffect,
  useMemo,
  useReducer,
  useRef,
  useState,
} from "react";
import { convertToLocalDate } from "../helpers";
import Locale from "../Models/Locale";
import { Modes } from "../Models/MainProps";

type TControlProps = {
  format?: string;
  onChange: (date: string, gregorianDate?: [number, number, number]) => void;
  value: string | null;
  inputRef: RefObject<HTMLInputElement>;
  locale: Locale;
  anPickerRef: MutableRefObject<HTMLDivElement | null>;
};
type TControlState = {
  mode: Modes;
  year: number;
  month: number;
  day: number;
  open: boolean;
  popupStyle?: CSSProperties;
  yearPageNumber: number;
};
enum ControlActionTypeEnum {
  toggle,
  setMode,
  setDay,
  setMonth,
  setYear,
  nextYear,
  prevYear,
  setYearPageNumber,
  setPopupStyles,
  setInnerValue,
}
type TControlAction =
  | { type: ControlActionTypeEnum.toggle; payload: boolean }
  | { type: ControlActionTypeEnum.setMode; payload: Modes }
  | { type: ControlActionTypeEnum.setPopupStyles; payload: CSSProperties }
  | {
      type: ControlActionTypeEnum.setInnerValue;
      payload: { y: number; m: number; d: number };
    }
  | { type: ControlActionTypeEnum.setDay; payload: number }
  | { type: ControlActionTypeEnum.setMonth; payload: number }
  | { type: ControlActionTypeEnum.setYear; payload: number }
  | { type: ControlActionTypeEnum.nextYear }
  | { type: ControlActionTypeEnum.prevYear }
  | { type: ControlActionTypeEnum.setYearPageNumber; payload: number };
const reducer = (
  state: TControlState,
  action: TControlAction
): TControlState => {
  switch (action.type) {
    case ControlActionTypeEnum.toggle:
      return { ...state, open: action.payload };
    case ControlActionTypeEnum.setMode:
      return { ...state, mode: action.payload };
    case ControlActionTypeEnum.setDay:
      return { ...state, day: action.payload };
    case ControlActionTypeEnum.setMonth:
      return { ...state, month: action.payload };
    case ControlActionTypeEnum.setYear:
      return { ...state, year: action.payload };
    case ControlActionTypeEnum.nextYear:
      return state.mode === Modes.years
        ? { ...state, yearPageNumber: state.yearPageNumber + 1 }
        : {
            ...state,
            year: state.year + 1,
          };
    case ControlActionTypeEnum.prevYear:
      return state.mode === Modes.years
        ? { ...state, yearPageNumber: state.yearPageNumber - 1 }
        : {
            ...state,
            year: state.year > 1 ? state.year - 1 : 1,
          };
    case ControlActionTypeEnum.setYearPageNumber:
      return { ...state, yearPageNumber: action.payload };
    case ControlActionTypeEnum.setPopupStyles:
      return { ...state, popupStyle: action.payload };
    case ControlActionTypeEnum.setInnerValue:
      return {
        ...state,
        year: action.payload.y,
        month: action.payload.m,
        day: action.payload.d,
      };
    default:
      return state;
  }
};
const formatter = (
  date: { y: number; m: number; d: number },
  format?: string
) => {
  return format
    ? format
        .replace("0", date.y.toString())
        .replace("1", date.m.toString())
        .replace("2", date.d.toString())
    : `${date.y}/${date.m}/${date.d}`;
};
const getValueDigits = (value: string | null, locale: Locale) => {
  if (!value) return null;
  let arr = value?.split("/");
  if (arr.length !== 3) return null;
  let y = parseInt(arr[0]);
  let m = parseInt(arr[1]);
  let d = parseInt(arr[2]);
  if (isNaN(y) || isNaN(m) || isNaN(d)) return null;
  else if (m < 1 || m > 12) return null;
  else if (d < 1 || d > locale.daysOfEachMonth(y, m)) return null;
  else return [y, m, d];
};
const useControl = (props: TControlProps) => {
  let init = useMemo(() => {
    let res = props.value;
    if (res) {
      const arr = getValueDigits(res, props.locale);
      if (!!arr) {
        return [arr[0], arr[1], arr[2]];
      }
    }
    let dt = convertToLocalDate(new Date(), props.locale);
    return [dt[0], dt[1], dt[2]];
  }, []);
  const [tempValue, setTempValue] = useState(props.value);
  const toggleLock = useRef<boolean>(false);
  const [state, dispatch] = useReducer(reducer, {
    mode: Modes.days,
    year: init[0],
    month: init[1],
    day: init[2],
    open: false,
    yearPageNumber: 0,
  });
  const handleFocus = (e: any) => {
    e.stopPropagation();
    if (toggleLock.current) return;
    toggleLock.current = true;
    setTimeout(() => (toggleLock.current = false), 1000);
    toggle(true);
  };
  const handleBlure = () => {
    if (!props.value || toggleLock.current) {
      return;
    }
    let arr = getValueDigits(props.value, props.locale);
    if (!arr) {
      return;
    }
    dispatch({
      type: ControlActionTypeEnum.setInnerValue,
      payload: {
        y: arr[0],
        m: arr[1],
        d: arr[2],
      },
    });
  };
  const toggle = useCallback((open: boolean) => {
    dispatch({ type: ControlActionTypeEnum.toggle, payload: open });
    // setPopupStyles({
    //     left:input
    // })
  }, []);
  const setPopupStyles = useCallback((styles: CSSProperties) => {
    dispatch({ type: ControlActionTypeEnum.setPopupStyles, payload: styles });
  }, []);
  const handleChange = (e: any) => {
    const v = e.target.value;
    setTempValue(v);
    toggle(false);
    if (!v) {
      props.onChange("");
      return;
    }
    let arr = getValueDigits(v, props.locale);
    if (!arr) return;
    props.onChange(
      `${arr[0]}/${arr[1]}/${arr[2]}`,
      props.locale.convertToDate(arr[0], arr[1], arr[2])
    );
    dispatch({
      type: ControlActionTypeEnum.setInnerValue,
      payload: {
        y: arr[0],
        m: arr[1],
        d: arr[2],
      },
    });
  };
  const onSelectYear = (newYear: number) => {
    dispatch({
      type: ControlActionTypeEnum.setYear,
      payload: newYear,
    });
    dispatch({
      type: ControlActionTypeEnum.setMode,
      payload: Modes.days,
    });
    //props.onChange(formatter({ y: newYear, m: state.month, d: 1 }))
  };
  const onSelectMonth = (newMonth: number) => {
    dispatch({
      type: ControlActionTypeEnum.setMonth,
      payload: newMonth,
    });
    dispatch({
      type: ControlActionTypeEnum.setMode,
      payload: Modes.days,
    });
    //props.onChange(formatter({ y: state.year, m: newMonth, d: 1 }))
  };
  const onSelectDay = (newDay: number) => {
    dispatch({
      type: ControlActionTypeEnum.setDay,
      payload: newDay,
    });
    props.onChange(
      formatter({ y: state.year, m: state.month, d: newDay }),
      props.locale.convertToDate(state.year, state.month, newDay)
    );
    toggle(false);
  };
  const setMode = useCallback((newMode: Modes) => {
    dispatch({
      type: ControlActionTypeEnum.setMode,
      payload: newMode,
    });
  }, []);
  const nextYear = useCallback(() => {
    dispatch({ type: ControlActionTypeEnum.nextYear });
  }, []);
  const prevYear = useCallback(() => {
    dispatch({ type: ControlActionTypeEnum.prevYear });
  }, []);
  const nextMonth = useCallback(() => {
    dispatch({ type: ControlActionTypeEnum.setDay, payload: 1 });
    dispatch({
      type: ControlActionTypeEnum.setMonth,
      payload: state.month === 12 ? 1 : state.month + 1,
    });
    dispatch({ type: ControlActionTypeEnum.setMode, payload: Modes.days });
  }, [state.month]);
  const prevMonth = useCallback(() => {
    dispatch({ type: ControlActionTypeEnum.setDay, payload: 1 });
    dispatch({
      type: ControlActionTypeEnum.setMonth,
      payload: state.month === 1 ? 12 : state.month - 1,
    });
    dispatch({ type: ControlActionTypeEnum.setMode, payload: Modes.days });
  }, [state.month]);
  const setToday = () => {
    let eqDateArr = convertToLocalDate(new Date(), props.locale);
    dispatch({
      type: ControlActionTypeEnum.setInnerValue,
      payload: {
        y: eqDateArr[0],
        m: eqDateArr[1],
        d: eqDateArr[2],
      },
    });
    props.onChange(
      formatter({
        y: eqDateArr[0],
        m: eqDateArr[1],
        d: eqDateArr[2],
      }),
      props.locale.convertToDate(eqDateArr[0], eqDateArr[1], eqDateArr[2])
    );
    toggle(false);
  };
  useEffect(() => {
    if (props.value !== tempValue) {
      if (!props.value) {
        setTempValue("");
        return;
      }
      const arr = getValueDigits(props.value, props.locale);
      if (!!arr) {
        let v = formatter({
          y: arr[0],
          m: arr[1],
          d: arr[2],
        });
        setTempValue(v);
        dispatch({
          type: ControlActionTypeEnum.setInnerValue,
          payload: {
            y: arr[0],
            m: arr[1],
            d: arr[2],
          },
        });
      }
    }
  }, [props.value]);
  return {
    state,
    tempValue,
    toggle,
    setPopupStyles,
    handleFocus,
    handleBlure,
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
  };
};
export default useControl;
