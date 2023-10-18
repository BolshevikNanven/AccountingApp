import {
    Utensils,Drumstick
} from "lucide-react"

import { cn } from "../../lib/utils";

export const food = "正餐" || "零食" || "小吃";


export default function Icons({ name }) {
    switch (name) {
        case '正餐': return <IconBox name={'food'}><Utensils /></IconBox >;
        case '小吃': return <IconBox name={'food'}><Drumstick /></IconBox >
    }
}

function IconBox({ name, children }) {

    const defaultStyle = "rounded-[6px] flex flex-row justify-center items-center bg-zinc-50 h-[38px] w-[38px] [&_*]:w-5 [&_*]:h-5";

    switch (name) {
        case 'food': return <div className={cn(defaultStyle, " text-orange-700")}>{children}</div>
    }
}