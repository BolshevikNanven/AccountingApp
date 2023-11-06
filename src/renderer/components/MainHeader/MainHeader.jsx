import WindowDragArea from "../windowBar/windowDragArea"

import { cn } from "../../lib/utils"

export default function MainHeader({ title = "", borderless, className, children }) {
    return (
        <WindowDragArea className={cn("top-[36px] left-0 sticky w-full pt-2 mt-[36px] flex flex-row items-center justify-between pb-3 bg-zinc50 z-10", !borderless && 'border-b dark:border-zinc-500/90', className)}>
            <p className=" text-2xl font-bold text-zinc-700 dark:text-zinc-300 pl-3">{title}</p>
            <div className="nodrag pr-3 flex flex-row h-full">
                {children}
            </div>
        </WindowDragArea>
    )
}