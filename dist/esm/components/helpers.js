export var getYear = function (dt, locale) { return new Intl.DateTimeFormat(locale, { year: 'numeric' }).format(dt); };
export var getMonthName = function (dt, locale) { return new Intl.DateTimeFormat(locale, { month: 'short' }).format(dt instanceof Date ? dt : new Date("".concat(dt[0], "/").concat(dt[1], "/").concat(dt[2]))); };
export var nameOfWeekDays = function (locale) {
    var days = [];
    var format = new Intl.DateTimeFormat(locale.name, { weekday: "short" }).format;
    for (var s = locale.startOfWeek; s < (locale.startOfWeek + 7); s++) {
        days.push(s);
    }
    return days.map(function (day) { return format(new Date(Date.UTC(2021, 5, day))); });
};
export var getWeekDay = function (locale, date) { return new Intl.DateTimeFormat(locale, { weekday: "short" }).format(date); };
//Date Time Converter
export function gregorianToJalali(gy, gm, gd) {
    var g_d_m = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334];
    var jy = null;
    if (gy > 1600) {
        jy = 979;
        gy -= 1600;
    }
    else {
        jy = 0;
        gy -= 621;
    }
    var gy2 = (gm > 2) ? (gy + 1) : gy;
    var days = (365 * gy) + (parseInt(((gy2 + 3) / 4).toString())) - (parseInt(((gy2 + 99) / 100).toString())) + (parseInt(((gy2 + 399) / 400).toString())) - 80 + gd + g_d_m[gm - 1];
    jy += 33 * (parseInt((days / 12053).toString()));
    days %= 12053;
    jy += 4 * (parseInt((days / 1461).toString()));
    days %= 1461;
    if (days > 365) {
        jy += parseInt(((days - 1) / 365).toString());
        days = (days - 1) % 365;
    }
    var jm = (days < 186) ? 1 + parseInt((days / 31).toString()) : 7 + parseInt(((days - 186) / 30).toString());
    var jd = 1 + ((days < 186) ? (days % 31) : ((days - 186) % 30));
    return [jy, jm, jd];
}
export function jalaliToGregorian(jy, jm, jd) {
    var gy = null;
    if (jy > 979) {
        gy = 1600;
        jy -= 979;
    }
    else {
        gy = 621;
    }
    var days = (365 * jy) + ((parseInt((jy / 33).toString())) * 8) + (parseInt((((jy % 33) + 3) / 4).toString())) + 78 + jd + ((jm < 7) ? (jm - 1) * 31 : ((jm - 7) * 30) + 186);
    gy += 400 * (parseInt((days / 146097).toString()));
    days %= 146097;
    if (days > 36524) {
        gy += 100 * (parseInt((--days / 36524).toString()));
        days %= 36524;
        if (days >= 365)
            days++;
    }
    gy += 4 * (parseInt((days / 1461).toString()));
    days %= 1461;
    if (days > 365) {
        gy += parseInt(((days - 1) / 365).toString());
        days = (days - 1) % 365;
    }
    var gd = days + 1;
    var sal_a = [0, 31, ((gy % 4 == 0 && gy % 100 != 0) || (gy % 400 == 0)) ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    var gm = null;
    for (gm = 0; gm < 13; gm++) {
        var v = sal_a[gm];
        if (gd <= v)
            break;
        gd -= v;
    }
    return [gy, gm, gd];
}
export function dateComparer(dt1, dt2) {
    if (!dt2)
        return false;
    if (dt2 instanceof Date)
        return dt1 !== null && dt2 !== null && (dt1 === null || dt1 === void 0 ? void 0 : dt1.getFullYear()) === (dt2 === null || dt2 === void 0 ? void 0 : dt2.getFullYear()) && (dt1 === null || dt1 === void 0 ? void 0 : dt1.getMonth()) === (dt2 === null || dt2 === void 0 ? void 0 : dt2.getMonth()) && (dt1 === null || dt1 === void 0 ? void 0 : dt1.getDate()) === (dt2 === null || dt2 === void 0 ? void 0 : dt2.getDate());
    else {
        var arr = dt2;
        return dt1 !== null && dt2 !== null && (dt1 === null || dt1 === void 0 ? void 0 : dt1.getFullYear()) === arr[0] && (dt1 === null || dt1 === void 0 ? void 0 : dt1.getMonth()) + 1 === arr[1] && (dt1 === null || dt1 === void 0 ? void 0 : dt1.getDate()) === arr[2];
    }
}
export var convertToLocalDate = function (date, locale) {
    var y = new Intl.DateTimeFormat(locale.name, { year: "numeric" }).format(date);
    var m = new Intl.DateTimeFormat(locale.name, { month: "numeric" }).format(date);
    var d = new Intl.DateTimeFormat(locale.name, { day: "numeric" }).format(date);
    return [locale.numberConverter(y), locale.numberConverter(m), locale.numberConverter(d)];
};
export var getAllDays = function (locale, localYear, localMonth) {
    var result = [];
    var week = nameOfWeekDays(locale);
    var equalDate = locale.convertToDate(localYear, localMonth, 1);
    var startOfMonth = new Date("".concat(equalDate[0], "/").concat(equalDate[1], "/").concat(equalDate[2]));
    var startOfWeek = week.indexOf(new Intl.DateTimeFormat(locale.name, { weekday: "short" }).format(startOfMonth));
    ///=====================
    var d = 1;
    var oneWeek = [];
    var monthDaysNumbers = locale.daysOfEachMonth(localYear, localMonth);
    while (true) {
        if (d === 1) {
            for (var i = 0; i < 7; i++) {
                if (i === startOfWeek) {
                    oneWeek.push({ number: d, date: startOfMonth });
                    break;
                }
                else
                    oneWeek.push(null);
            }
        }
        else {
            var dt = new Date(startOfMonth);
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
};
