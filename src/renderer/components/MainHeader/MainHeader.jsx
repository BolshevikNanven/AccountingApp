import WindowDragArea from "../WindowBar/WindowDragArea"

export default function MainHeader({ title = "" }) {
    return (
        <WindowDragArea className="top-[36px] left-0 sticky w-full pt-2 mt-[36px] pb-3 bg-zinc-50 z-10">
            <p className=" text-2xl font-semibold text-zinc-700">{title}</p>
        </WindowDragArea>
    )
}