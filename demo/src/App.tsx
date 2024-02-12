import React, { Ref, forwardRef, useRef, useState } from 'react';
import { AnPicker } from 'react-anpicker';
import "./index.css";
import "react-anpicker/dist/styles.css";
const CustomInput = forwardRef((props: React.InputHTMLAttributes<HTMLInputElement>, ref: Ref<any>) => {
  return <input ref={ref} type="text" {...props} style={{ padding: 10, borderRadius: 4, border: "solid 1px #ccc" }} />
})
function App() {
  const [date, setDate] = useState<string>("1402/11/11");
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
      </div>
      <div className='card' style={{
        display: "flex",
        position: "absolute",
        left: "30%",
        top: "300px"
      }} id="modal">
        <h1 className='title'>با اینپوت دلخواه</h1>
        <button onClick={() => setDate2('')}>remove</button>
        <AnPicker popupTargetId='modal' value={date2} onChange={handleChange2} inputControl={CustomInput} />
        <AnPicker popupTargetId='modal' value={date2} onChange={handleChange2} inputControl={CustomInput} />
      </div>
      <div id="test" style={{ height: 400, width: 1000, overflow: "auto", position: "relative" }}>
        <div style={{ margin: "100px 0" }}>
          <AnPicker popupTargetId='test' value={date} onChange={handleChange} showSidebar={true} />
        </div>
      </div>
    </div>
  );
}
// function App() {
//   const inputRef = useRef<HTMLInputElement>(null);
//   const [top, setTop] = useState(0);
//   const showResult = () => {
//     setTop(inputRef.current?.offsetTop ?? 0);
//   }
//   return <div style={{ padding: "30px" }}>
//     <div style={{ padding: "30px", backgroundColor: "#eee", position: "relative" }}>
//       <input ref={inputRef} name='test' type='text' placeholder='test' />
//       <br />
//       <br />
//       <br />
//       <button onClick={showResult}>top: {top}</button>
//     </div>
//   </div>
// }
export default App;
