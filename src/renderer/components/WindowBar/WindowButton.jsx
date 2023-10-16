import { Minus, Maximize, X } from "lucide-react"
import WindowDragArea from "./WindowDragArea";
import  "./dragArea.css"

export default function WindowButton() {

    const handleClick = (command) => {
        window.electron.ipcRenderer.sendMessage('windowButton', command); 
    }

    return (
        <div className=" fixed top-0 right-0 flex flex-row h-9 w-screen transition-all z-50 ">
            <WindowDragArea className=" flex-1 bg-zinc-50 ml-[68px]"/>
            <button onClick={() => handleClick("mini")} className="nodrag w-12 bg-zinc-50 hover:bg-zinc-300 active:bg-zinc-400 flex flex-row items-center justify-center cursor-default">
                <Minus className="w-[14px] h-[14px]" />
            </button>
            <button onClick={() => handleClick("scale")} className="nodrag w-12 bg-zinc-50 hover:bg-zinc-300 active:bg-zinc-400 flex flex-row items-center justify-center cursor-default">
                <Maximize className="w-[13px] h-[13px]" />
            </button>
            <button onClick={() => handleClick("close")} className="nodrag w-12 bg-zinc-50 hover:bg-red-600 hover:text-white active:bg-red-700 flex flex-row items-center justify-center cursor-default">
                <X className="w-[16px] h-[16px]" />
            </button>
        </div>
    )
    
}