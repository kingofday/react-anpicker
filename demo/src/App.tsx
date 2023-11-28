import React, { Ref, forwardRef, useState } from 'react';
import { AnPicker } from 'react-anpicker';
import "./index.css";
import "react-anpicker/dist/styles.css";
const CustomInput = forwardRef((props: React.InputHTMLAttributes<HTMLInputElement>, ref: Ref<any>) => {
  return <input ref={ref} type="text" {...props} style={{ padding: 10, borderRadius: 4, border: "solid 1px #ccc" }} />
})
function App() {
  const [date, setDate] = useState<Date | null>(new Date("2023-09-22 08:00:00"));
  const [date2, setDate2] = useState<Date | null>(new Date("2023-09-22 08:00:00"));
  const handleChange = (date: any, localDate: string | null) => {
    console.log("date", date)
    console.log("pDate", localDate)
    setDate(date);
  }
  const handleChange2 = (date: Date | null, localDate: string | null) => {
    console.log("after changed2", date)
    setDate2(date);
  }
  return (
    <div className="App" dir='rtl' style={{ height: 1500, overflow: "auto", paddingTop: 600 }}>
      <div className='row' dir='rtl'>
        <div className='card'>
          <h1 className='title'>فارسی</h1>
          <button onClick={() => setDate(new Date())}>today</button>
          <AnPicker value={date ? new Date(date) : date} onChange={handleChange} showSidebar={true} />
        </div>
        {/* <div className='card'>
          <h1 className='title'>با اینپوت دلخواه</h1>
          <button onClick={() => setDate2(null)}>remove</button>
          <AnPicker value={date2} onChange={handleChange2} inputControl={CustomInput} />
        </div> */}
        {/* <div className='card'>
          <h1 className='title'>Gregorian</h1>
          <AnPicker
            value={date}
            onChange={handleChange}
            inputControl={CustomInput}
            locale={{
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
            }}
          />
        </div> */}
      </div>
    </div>
  );
}

export default App;
