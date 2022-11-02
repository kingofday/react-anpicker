export default interface Locale {
    title: string;
    name: string;
    startOfWeek: number;
    rtl: boolean;
    todayButtonText: string,
    daysOfEachMonth: (year: number, month: number) => number;
    numberConverter: (number: string) => number;
    convertToDate: (localYear: number, localMonth: number, localDay: number) => [number, number, number];
}