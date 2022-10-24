import { Locale } from "../models"
export const isKabise = (year: number) => {
    if (year > 1244 && year < 1342)
        return [1, 5, 9, 13, 17, 21, 26, 30].includes(year % 33);
    else return [1, 5, 9, 13, 17, 22, 26, 30].includes(year % 33);
}
const faLocale: Locale = {
    name: "fa-IR",
    startOfWeek: -2,
    numberConverter: (n: string) => parseFloat(n
        .replace(/[\u0660-\u0669]/g, function (c) {
            return (c.charCodeAt(0) - 0x0660).toString();
        })
        .replace(/[\u06f0-\u06f9]/g, function (c) {
            return (c.charCodeAt(0) - 0x06f0).toString();
        })
    ),
    convertToDate: (jy: number, jm: number, jd: number) => {
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
    },
    daysOfEachMonth: (year: number, month: number): number => {
        if (month >= 1 && month <= 6) return 31;
        else if (month <= 11) return 30;
        else if (isKabise(year)) return 30;
        else return 29;
    }

};
export default faLocale;