import React, { Ref, forwardRef, useState } from 'react';
import { AnPicker } from 'react-anpicker';
import "./index.css";
import "react-anpicker/dist/styles.css";
const CustomInput = forwardRef((props: React.InputHTMLAttributes<HTMLInputElement>, ref: Ref<any>) => {
  return <input ref={ref} type="text" {...props} style={{ padding: 10, borderRadius: 4, border: "solid 1px #ccc" }} />
})
function App() {
  const [date, setDate] =  useState<string>("1402/11/11");
  const [date2, setDate2] = useState<string>("");
  const handleChange = (date: string) => {
    console.log("date", date)
    setDate(date);
  }
  const handleChange2 = (date: string) => {
    console.log("after changed2", date)
    setDate2(date);
  }
  return (
    <div className="App" dir='rtl' style={{ height: 1500, overflow: "auto", paddingTop: 600 }}>
      <div className='row' dir='rtl'>
        <div className='card'>
          <h1 className='title'>فارسی</h1>
          <AnPicker value={date} onChange={handleChange} showSidebar={true} />
        </div>
        <div className='card'>
          <h1 className='title'>با اینپوت دلخواه</h1>
          <button onClick={() => setDate2('')}>remove</button>
          <AnPicker value={date2} onChange={handleChange2} inputControl={CustomInput} />
        </div>
      </div>
      <div id="test" style={{ height: 400, overflow: "auto",position:"relative" }}>
          <div style={{ margin: "400px 0" }}>
            <AnPicker popupTargetId='test' value={date} onChange={handleChange} showSidebar={true} />
          </div>
        </div>
    </div>
  );
}

export default App;
