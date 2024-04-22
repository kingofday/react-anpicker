import { Ref, forwardRef, useState } from "react"
import { AnPicker } from 'react-anpicker';
const CustomInput = forwardRef((props: React.InputHTMLAttributes<HTMLInputElement>, ref: Ref<any>) => {
    return <input ref={ref} type="text" {...props} style={{ padding: 10, borderRadius: 4, border: "solid 1px #ccc" }} />
})
interface CustomDTProps {
    onChange: (date: string) => void;
    value: string;
    popupTargetId?: string;
}
const CustomDT = ({ value, onChange, popupTargetId }: CustomDTProps) => {
    console.log("value", value);
    return <AnPicker value={value} popupTargetId={popupTargetId} onChange={onChange} showSidebar={true} inputControl={CustomInput} showTodayBottom={true} />
}
export default CustomDT;