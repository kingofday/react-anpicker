import React, { Ref, forwardRef, useRef, useState } from "react";
import { AnPicker } from "react-anpicker";
import "./index.css";
import "react-anpicker/dist/styles.css";
import CustomDT from "./CustomDT";
import { Modal } from "react-kod";

function App() {
  const [date1, setDate1] = useState<string>("1403/03/01");
  const [date2, setDate2] = useState<string>("1404/03/01");
  const [date3, setDate3] = useState<string>("1404/03/01");
  const [date4, setDate4] = useState<string>("1404/03/01");
  const parentRef = useRef<HTMLDivElement>(null);
  const [open, toggle] = useState(false);
  const handleChange1 = (date: string, engDate?: [number, number, number]) => {
    console.log("after changed2", date, engDate);
    setDate1(date);
  };
  const handleChange2 = (date: string, engDate?: [number, number, number]) => {
    console.log("after changed2", date, engDate);
    setDate2(date);
  };
  const handleChange3 = (date: string, engDate?: [number, number, number]) => {
    console.log("after changed2", date, engDate);
    setDate3(date);
  };
  const handleChange4 = (date: string, engDate?: [number, number, number]) => {
    console.log("after changed2", date, engDate);
    setDate4(date);
  };
  return (
    <div
      className="App"
      dir="rtl"
      style={{ overflow: "auto", paddingTop: 600 }}
    >
      <AnPicker value={date1} onChange={handleChange1} showSidebar={true} />
      <div style={{ height: 600 }}></div>
      <AnPicker
        showTodayBottom={false}
        value={date2}
        onChange={handleChange2}
        //showSidebar={true}
      />
      <div style={{ height: 600 }}></div>
      <button onClick={() => toggle(true)}>Show Modal</button>
      <Modal bodyClass="modal" open={open}>
        <div
          className=""
          style={{
            width: "100%",
            position: "relative",
          }}
          ref={parentRef}
        >
          <h1 className="title">فارسی</h1>
          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <CustomDT
              value={date3}
              onChange={handleChange3}
              parentRef={parentRef}
              popupVPosition="top"
            />
          </div>
          <div style={{ height: 600 }}></div>
          <AnPicker
            value={date4}
            onChange={handleChange4}
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
