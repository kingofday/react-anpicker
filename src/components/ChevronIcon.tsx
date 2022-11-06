interface ChevronIconProps {
    rtl: boolean;
    type: "next" | "prev"
}
function ChevronIcon({ rtl, type }: ChevronIconProps) {
    let Icon1 = <svg width="6" height="10" viewBox="0 0 6 10" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M5.25 9.5L0.75 5L5.25 0.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>;
    const Icon2 = <svg width="6" height="10" viewBox="0 0 6 10" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M0.75 9.5L5.25 5L0.75 0.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>;
    if ((rtl && type === "next") || (!rtl && type == "prev")) return Icon2;
    else return Icon1;

}
export default ChevronIcon;