import Locale from "./Models/Locale";
interface SidebarProps {
    locale: Locale;
    localYear: number;
    localMonth: number;
    localDay: number;
}
declare const Sidebar: ({ locale, localYear, localMonth, localDay }: SidebarProps) => JSX.Element;
export default Sidebar;
