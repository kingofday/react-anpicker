import React, { Ref, forwardRef, useRef, useState } from "react";
import { AnPicker } from "react-anpicker";
import "./index.css";
import "react-anpicker/dist/styles.css";
import CustomDT from "./CustomDT";
import { Modal } from "react-kod";

function App() {
  const [date, setDate] = useState<string>("1403/03/01");
  const [date2, setDate2] = useState<string>("1404/03/01");
  const parentRef = useRef<HTMLDivElement>(null);
  const [open, toggle] = useState(false);
  const handleChange = (
    date: string,
    gregorianDate?: [number, number, number]
  ) => {
    console.log("date", date, gregorianDate);
    setDate(date);
  };
  const handleChange2 = (date: string, engDate?: [number, number, number]) => {
    console.log("after changed2", date, engDate);
    setDate2(date);
  };
  return (
    <div
      className="App"
      dir="rtl"
      style={{ overflow: "auto", paddingTop: 600, height: 1000 }}
    >
      <button style={{ width: 20 }} onClick={() => toggle(true)}>
        ok
      </button>
      <Modal open={open}>
        <div
          style={{
            height: 1400,
            width: 600,
            position: "relative",
          }}
          ref={parentRef}
        >
          <h1 className="title">فارسی</h1>
          <AnPicker
            value={date}
            onChange={handleChange}
            showSidebar={true}
            popupParentRef={parentRef}
          />
          <div style={{ height: 600 }}></div>
          <AnPicker
            value={date2}
            onChange={handleChange2}
            showSidebar={true}
            popupParentRef={parentRef}
          />
        </div>
      </Modal>
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
