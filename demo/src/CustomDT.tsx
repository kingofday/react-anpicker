import { Ref, RefObject, forwardRef, useState } from "react";
import { AnPicker } from "react-anpicker";
const CustomInput = forwardRef(
  (props: React.InputHTMLAttributes<HTMLInputElement>, ref: Ref<any>) => {
    return (
      <input
        ref={ref}
        type="text"
        {...props}
        style={{ padding: 10, borderRadius: 4, border: "solid 1px #ccc" }}
      />
    );
  }
);
interface CustomDTProps {
  onChange: (date: string) => void;
  value: string;
  parentRef?: RefObject<HTMLElement>;
  popupVPosition?: "top" | "bottom";
  popupHPosition?: "left" | "right";
}
const CustomDT = ({
  value,
  popupVPosition,
  popupHPosition,
  onChange,
  parentRef,
}: CustomDTProps) => {
  console.log("value", value);
  return (
    <AnPicker
      popupVPosition={popupVPosition}
      popupHPosition={popupHPosition}
      value={value}
      popupParentRef={parentRef}
      onChange={onChange}
      showSidebar={true}
      inputControl={CustomInput}
      showTodayBottom={true}
    />
  );
};
export default CustomDT;
