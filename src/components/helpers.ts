import Locale from "./Models/Locale";
import Day from "./Models/Day";

export const getYear = (dt: Date, locale: string) => new Intl.DateTimeFormat(locale, { year: 'numeric' }).format(dt);
export const getMonthName = (dt: Date | [number, number, number], locale: string) => new Intl.DateTimeFormat(locale, { month: 'short' }).format(dt instanceof Date ? dt : new Date(`${dt[0]}/${dt[1]}/${dt[2]}`));
export const nameOfWeekDays = (locale: Locale): string[] => {
    let days: number[] = [];
    const format = new Intl.DateTimeFormat(locale.name, { weekday: "short" }).format;
    for (let s = locale.startOfWeek; s < (locale.startOfWeek + 7); s++) {
        days.push(s);
    }
    return days.map((day) => format(new Date(Date.UTC(2021, 5, day))));
}
export const getWeekDay = (locale: string, date: Date) => new Intl.DateTimeFormat(locale, { weekday: "short" }).format(date);

//Date Time Converter
export function gregorianToJalali(gy: number, gm: number, gd: number) {
    let g_d_m = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334];
    let jy = null;
    if (gy > 1600) {
        jy = 979;
        gy -= 1600;
    } else {
        jy = 0;
        gy -= 621;
    }
    let gy2 = (gm > 2) ? (gy + 1) : gy;
    let days = (365 * gy) + (parseInt(((gy2 + 3) / 4).toString())) - (parseInt(((gy2 + 99) / 100).toString())) + (parseInt(((gy2 + 399) / 400).toString())) - 80 + gd + g_d_m[gm - 1];
    jy += 33 * (parseInt((days / 12053).toString()));
    days %= 12053;
    jy += 4 * (parseInt((days / 1461).toString()));
    days %= 1461;
    if (days > 365) {
        jy += parseInt(((days - 1) / 365).toString());
        days = (days - 1) % 365;
    }
    let jm = (days < 186) ? 1 + parseInt((days / 31).toString()) : 7 + parseInt(((days - 186) / 30).toString());
    let jd = 1 + ((days < 186) ? (days % 31) : ((days - 186) % 30));
    return [jy, jm, jd];
}

export function jalaliToGregorian(jy: number, jm: number, jd: number) {
    let gy = null;
    if (jy > 979) {
        gy = 1600;
        jy -= 979;
    } else {
        gy = 621;
    }
    let days = (365 * jy) + ((parseInt((jy / 33).toString())) * 8) + (parseInt((((jy % 33) + 3) / 4).toString())) + 78 + jd + ((jm < 7) ? (jm - 1) * 31 : ((jm - 7) * 30) + 186);
    gy += 400 * (parseInt((days / 146097).toString()));
    days %= 146097;
    if (days > 36524) {
        gy += 100 * (parseInt((--days / 36524).toString()));
        days %= 36524;
        if (days >= 365) days++;
    }
    gy += 4 * (parseInt((days / 1461).toString()));
    days %= 1461;
    if (days > 365) {
        gy += parseInt(((days - 1) / 365).toString());
        days = (days - 1) % 365;
    }
    let gd = days + 1;
    let sal_a = [0, 31, ((gy % 4 == 0 && gy % 100 != 0) || (gy % 400 == 0)) ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    let gm = null;
    for (gm = 0; gm < 13; gm++) {
        let v = sal_a[gm];
        if (gd <= v) break;
        gd -= v;
    }
    return [gy, gm, gd];
}
export function dateComparer(dt1?: Date, dt2?: Date | [number, number, number]): boolean {
    if (!dt2) return false;
    if (dt2 instanceof Date)
        return dt1 !== null && dt2 !== null && dt1?.getFullYear() === dt2?.getFullYear() && dt1?.getMonth() === dt2?.getMonth() && dt1?.getDate() === dt2?.getDate();
    else {
        let arr = dt2 as [number, number, number];
        return dt1 !== null && dt2 !== null && dt1?.getFullYear() === arr[0] && dt1?.getMonth() + 1 === arr[1] && dt1?.getDate() === arr[2];
    }
}
export const convertToLocalDate = (date: Date, locale: Locale): [number, number, number] => {
    let y = new Intl.DateTimeFormat(locale.name, { year: "numeric" }).format(date);
    let m = new Intl.DateTimeFormat(locale.name, { month: "numeric" }).format(date);
    let d = new Intl.DateTimeFormat(locale.name, { day: "numeric" }).format(date);
    return [locale.numberConverter(y), locale.numberConverter(m), locale.numberConverter(d)];

}
export const getAllDays = (locale: Locale, localYear: number, localMonth: number): (Day | null)[][] => {
    let result: (Day | null)[][] = [];
    let week = nameOfWeekDays(locale);
    let equalDate = locale.convertToDate(localYear, localMonth, 1);
    let startOfMonth = new Date(`${equalDate[0]}/${equalDate[1]}/${equalDate[2]}`);
    let startOfWeek = week.indexOf(new Intl.DateTimeFormat(locale.name, { weekday: "short" }).format(startOfMonth));
    ///=====================
    let d = 1;
    let oneWeek: (Day | null)[] = [];
    let monthDaysNumbers = locale.daysOfEachMonth(localYear, localMonth);
    while (true) {
        if (d === 1) {
            for (let i = 0; i < 7; i++) {
                if (i === startOfWeek) {
                    oneWeek.push({ number: d, date: startOfMonth });
                    break;
                }
                else oneWeek.push(null);
            }
        }
        else {
            let dt = new Date(startOfMonth);
            dt.setDate(dt.getDate() + d - 1);
            oneWeek.push({ number: d, date: dt });
        }
        if ((d + startOfWeek) % 7 === 0 || d === monthDaysNumbers) {
            result.push(oneWeek);
            oneWeek = [];
        }
        if (d === monthDaysNumbers) {
            //if (oneWeek.length) result.push(oneWeek);
            break;
        }
        d++;
    }
    if (oneWeek.length)
        result.push(oneWeek);
    return result;
}

