import React, { useState } from 'react';
import { AnPicker } from 'react-anpicker';
import "./index.css";
const CustomInput = (props: React.InputHTMLAttributes<HTMLInputElement>) => {
  return <input {...props} style={{ padding: 10, borderRadius: 4, border: "solid 1px #ccc" }} />
}
function App() {
  const [date, setDate] = useState<Date|null>(new Date());
  const handleChange = (date: Date | null, localDate: string | null) => {
    console.log(date, localDate);
    setDate(date);
  }
  return (
    <div className="App">
      <div className='row' dir='rtl'>
        <div className='card'>
          <h1 className='title'>فارسی</h1>
          <AnPicker value={date} onChange={handleChange} showSidebar={true} />
        </div>
        {/* <div className='card'>
          <h1 className='title'>با اینپوت دلخواه</h1>
          <AnPicker value={date} onChange={handleChange} inputControl={CustomInput} />
        </div>
        <div className='card'>
          <h1 className='title'>زبان انگلیسی</h1>
          <AnPicker value={date} onChange={handleChange} inputControl={CustomInput} />
        </div> */}
      </div>
    </div>
  );
}

export default App;
