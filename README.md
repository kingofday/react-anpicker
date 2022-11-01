# react-angrid


react-anpicker is a free and light component in react for date picker mostly based on Intl and predefined function for converting dates

  - type script
  - rtl/ltr
  - other calendars

![demo image](src/assets/persian.png)

## Installation

react-angrid requires react "^18.2.0", react-dome "^18.2.0" to run.
```
npm i react-anpicker
```
### Usage
Minimal Usage:

```
import { AnPicker } from 'react-anpicker';
...
    const [date, setDate] = useState(null);
    const handleChange = (date: Date | null, locale: string | null) => { }
    <AnPicker value={date} onChange={handleChange} />
...
```
#### Props
- **defaultOpen:** :boolean- picker be visible at first or not
- **value:** :Date | null- initital value
- **onChange:** :(date: Date | null, localDate: string | null) => void- a function that fires after change and gives you eq date and local date
- **showTodayBottom:** :boolean- today button be visible or not
- **locale:** :
{
    name: string;
    startOfWeek: number;
    rtl: boolean;
    todayButtonText: string,
    daysOfEachMonth: (year: number, month: number) => number;
    numberConverter: (number: string) => number;
    convertToDate: (localYear: number, localMonth: number, localDay: number) => [number, number, number];
}
an object that needs to be set if you use another locale, default is been configed fot "fa-Ir"
```
##### Todos

 - ltr debguugging with "en-US" locale
 - Add Sidebar

