import WindowDragArea from "../windowBar/windowDragArea"

import { cn } from "../../lib/utils"

export default function MainHeader({ title = "" ,className}) {
    return (
        <WindowDragArea className={cn("top-[36px] left-0 sticky w-full pt-2 mt-[36px] pb-3 bg-zinc-50 z-10 border-b",className)}>
            <p className=" text-2xl font-semibold text-zinc-700 pl-3">{title}</p>
        </WindowDragArea>
    )
}