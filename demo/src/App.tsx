import React, { useState } from 'react';
import { AnPicker } from 'react-anpicker';
import "./index.css";
const CustomInput = (props: React.InputHTMLAttributes<HTMLInputElement>) => {
  return <input type="text" {...props} style={{ padding: 10, borderRadius: 4, border: "solid 1px #ccc" }} />
}
function App() {
  const [date, setDate] = useState<Date|null>(new Date());
  const [date2, setDate2] = useState<Date|null>(null);
  const handleChange = (date: Date | null, localDate: string | null) => {
    console.log("after changed1",date)
    setDate(date);
  }
  const handleChange2 = (date: Date | null, localDate: string | null) => {
    console.log("after changed2",date)
    setDate2(date);
  }
  return (
    <div className="App" dir='rtl'>
      <div className='row' dir='rtl'>
        <div className='card'>
          <h1 className='title'>فارسی</h1>
          <button onClick={()=>setDate(null)}>remove</button>
          <AnPicker value={date} onChange={handleChange} showSidebar={true} />
        </div>
        <div className='card' dir="ltr">
          <h1 className='title'>فارسی</h1>
          <button onClick={()=>setDate2(null)}>remove2</button>
          <AnPicker  value={date2} onChange={handleChange2} showSidebar={true} />
        </div>
        <div className='card'>
          <h1 className='title'>با اینپوت دلخواه</h1>
          <AnPicker value={date2} onChange={handleChange2} inputControl={CustomInput} />
        </div>
        <div className='card'>
          <h1 className='title'>زبان انگلیسی</h1>
          <AnPicker value={date} onChange={handleChange} inputControl={CustomInput} />
        </div>
      </div>
    </div>
  );
}

export default App;
