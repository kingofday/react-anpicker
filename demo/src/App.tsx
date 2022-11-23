import React, { useState } from 'react';
import { AnPicker } from 'react-anpicker';
import "./index.css";
import "react-anpicker/dist/esm/components/";
const CustomInput = (props: React.InputHTMLAttributes<HTMLInputElement>) => {
  return <input type="text" {...props} style={{ padding: 10, borderRadius: 4, border: "solid 1px #ccc" }} />
}
function App() {
  const [date, setDate] = useState<Date | null>(new Date());
  const [date2, setDate2] = useState<Date | null>(null);
  const handleChange = (date: Date | null, localDate: string | null) => {
    console.log("after changed1", date)
    setDate(date);
  }
  const handleChange2 = (date: Date | null, localDate: string | null) => {
    console.log("after changed2", date)
    setDate2(date);
  }
  return (
    <div className="App" dir='rtl'>
      <div className='row' dir='rtl'>
        <div className='card'>
          <h1 className='title'>فارسی</h1>
          <button onClick={() => setDate(null)}>remove</button>
          <AnPicker value={date} onChange={handleChange} showSidebar={true} />
        </div>
        <div className='card'>
          <h1 className='title'>با اینپوت دلخواه</h1>
          <AnPicker value={date2} onChange={handleChange2} inputControl={CustomInput} />
        </div>
        <div className='card'>
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
        </div>
      </div>
    </div>
  );
}

export default App;
