# react-anpicker


react-anpicker is a free and light component in react for date picker mostly based on Intl and predefined function for converting dates

  - type script
  - rtl/ltr
  - other calendars

![demo image](https://github.com/kingofday/react-anpicker/blob/master/src/assets/persian.png)

## Installation

react-anpicker requires react "^18.2.0", react-dome "^18.2.0" to run.

run this command:
```
npm i react-anpicker
```
add css to your project
```
import "react-anpicker/dist/styles.css";
```
### Usage


```
import { AnPicker } from 'react-anpicker';
...
    const [date, setDate] = useState(null);
    const handleChange = (date: Date | null, localDate: string | null) => { }
    <AnPicker value={date} onChange={handleChange} />
...
```
#### Props
- **showTodayBottom:** boolean- today button be visible or not
- **defaultOpen:** boolean- picker be visible at first or not
- **value:**:Date | null- initital value
- **onChange:** (date: Date | null, localDate: string | null) => void- a function that fires after change and gives you eq date and local date
- **showTodayBottom:** boolean- today button be visible or not
- **inputControl:** ReactElemt- for passing an custom input from other libraries
- **showSidebar:** boolean: show sidebar beside picker section
- **popupTargetId:** by defaylt date picker appears as a last child of body, in case like using it in a modal, you can specify wrapper for it.
- **locale:** :
 ```
{
    title:string-calander title in sidebar
    name: string-locale from Intl like "en-US" or "fa-IR" ,...
    startOfWeek: number-if your week not starts with monday, you can specifing it(sunday=-1,tusday=1);
    rtl: boolean;
    todayButtonText: string,
    daysOfEachMonth: (year: number, month: number) => number-a functio that return number of days in each month
    numberConverter: (number: string) => number- get number in other languages in convert them to eng number;
    convertToDate: (localYear: number, localMonth: number, localDay: number) => [number, number, number]- a function that takes local date and retrun eq in gregorian date;
}
```
an object that needs to be set if you use another locale, default is been configed for "fa-Ir"

##### gregorian config example

![gregorian image](https://github.com/kingofday/react-anpicker/blob/master/src/assets/gregorian.png)

for this calander use locale like below:
```
{
  rtl: false,
  convertToDate: (y, m, d) => [y, m, d],
  daysOfEachMonth: (y, m) => {
    switch (m) {
      case 1:
      case 3:
      case 5:
      case 6:
      case 7:
      case 8:
      case 10:
      case 12:
        return 31;
      case 2:
        let isKabise = false;
        if (y % 400 === 0) isKabise = true;
        else if (y % 100 === 0) isKabise = false;
        else if (y % 4 === 0) isKabise = true;
        return isKabise ? 29 : 28;
      default:
        return 30;
    }

  },
  name: "en-US",
  numberConverter: (n) => parseInt(n),
  startOfWeek:0,
  title:"Gregorian",
  todayButtonText:"today"
}
```
