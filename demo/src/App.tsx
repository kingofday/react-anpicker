import React, { Ref, forwardRef, useRef, useState } from "react";
import { AnPicker } from "react-anpicker";
import "./index.css";
import "react-anpicker/dist/styles.css";
import CustomDT from "./CustomDT";

function App() {
  const [date, setDate] = useState<string>("1403/03/01");
  const [date2, setDate2] = useState<string>("");

  const handleChange = (date: string, engDate?: [number, number, number]) => {
    console.log("date", date, engDate);
    setDate(date);
  };
  const handleChange2 = (date: string, engDate?: [number, number, number]) => {
    console.log("after changed2", date,engDate);
    setDate2(date);
  };
  return (
    <div
      className="App"
      dir="rtl"
      style={{ overflow: "auto", paddingTop: 600 }}
    >
      <div className="row" dir="rtl">
        <div className="card">
          <h1 className="title">فارسی</h1>
          <AnPicker value={date} onChange={handleChange} showSidebar={true} />
        </div>
      </div>
      <div
        className="card"
        style={{
          display: "block",
          position: "absolute",
          left: 50,
          top: 50,
          margin: 200,
          background: "#eee",
          width: 300,
          height: 450,
          overflow: "auto",
        }}
        id="modal"
      >
        <div style={{ height: 300 }}></div>
        <div style={{ whiteSpace: "nowrap" }}>
          <div style={{ width: 300, display: "inline-block" }}>.</div>
          <div style={{ display: "inline-block" }}>
            <h1 className="title">با اینپوت دلخواه</h1>
            <button onClick={() => setDate2("")}>remove</button>
            <CustomDT
              value={date2}
              onChange={handleChange2}
              popupTargetId={"modal"}
            />
          </div>
          <div style={{ width: 10, display: "inline-block" }}>.</div>
        </div>
        <div style={{ height: 400 }}></div>
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
