# react-angrid


react-anpicker is a free and light component in react for date picker mostly based on Intl and predefined function for converting dates

  - type script
  - rtl/ltr
  - other calendars

![demo image](https://github.com/kingofday/react-anpicker/blob/master/src/assets/persian.png)

## Installation

react-anpicker requires react "^18.2.0", react-dome "^18.2.0" to run.
```
npm i react-anpicker
```
### Usage
Minimal Usage:

```
import { AnPicker } from 'react-anpicker';
...
    const [date, setDate] = useState(null);
    const handleChange = (date: Date | null, localDate: string | null) => { }
    <AnPicker value={date} onChange={handleChange} />
...
```
#### Props
- **showTodayBottom:** :boolean- today button be visible or not
- **defaultOpen:** :boolean- picker be visible at first or not
- **value:** :Date | null- initital value
- **onChange:** :(date: Date | null, localDate: string | null) => void- a function that fires after change and gives you eq date and local date
- **showTodayBottom:** :boolean- today button be visible or not
- **inputControl:** :ReactElemt- for passing an custom input from other libraries
- **showSidebar:** :boolean: show sidebar beside picker section
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
```
##### Todos

 - ltr debguugging with "en-US" locale

