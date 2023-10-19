import {
    Utensils, Drumstick, Popcorn
} from "lucide-react"

import { cn, findFatherType } from "../../lib/utils";

export const accountingType = {
    '餐饮': ["正餐", "零食", "小吃"],

}


export default function Icons({ name, className }) {

    switch (name) {
        case '正餐': return <IconBox name={findFatherType(name)}><Utensils /></IconBox >;
        case '小吃': return <IconBox name={findFatherType(name)}><Drumstick /></IconBox >;
        case '零食': return <IconBox name={findFatherType(name)}><Popcorn /></IconBox >;
    }
}


function IconBox({ name, className, children }) {

    const defaultStyle = "rounded-[6px] flex flex-row justify-center items-center h-[38px] w-[38px] [&_*]:w-5 [&_*]:h-5";

    switch (name) {
        case '餐饮': return <div className={cn(defaultStyle, " text-orange-700", className)}>{children}</div>
    }
}
