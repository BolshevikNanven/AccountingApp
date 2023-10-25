import { useRef, useState } from "react"
import Icons, { accountingOutType, accountingInType } from "../icons/icons"

import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "../ui/popover"
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "../ui/tooltip"

import { cn } from "../../lib/utils"
import { Button } from "../ui/button"


export default function TypePicker({ icontype, onSelectType = () => { }, children }) {

    const [open, setOpen] = useState(false);

    const handleSelectType = (bigType, type) => {
        console.log(type);
        onSelectType(bigType, type);
        setOpen(false);
    }

    return (
        <Popover open={open} onOpenChange={(open) => setOpen(open)}>
            <PopoverTrigger onClick={() => setOpen(true)} asChild>
                {children}
            </PopoverTrigger>
            <PopoverContent className="p-0 w-auto">
                <TypepickerContent icontype={icontype} handleSelectType={handleSelectType} />
            </PopoverContent>
        </Popover>
    )
}
function TypepickerContent({ icontype, handleSelectType = () => { } }) {

    const boxRef = useRef();

    const scrollToType = (index) => {
        const dom = boxRef.current;
        dom.scrollTop = dom.childNodes[index].offsetTop - 36;
    }

    if (icontype === 'out')
        return (
            <div className=" max-w-[298px] max-h-[380px] flex flex-col">
                <header className=" w-full bg-zinc-100  p-2 ">
                    <div className=" flex flex-row">
                        {Object.keys(accountingOutType).map((bigType, index) =>
                            <button key={bigType + index} onClick={() => scrollToType(index)} className=" transition-colors h-full text-sm text-zinc-800 p-1 px-[6px] hover:bg-blue-100 active:bg-blue-200 rounded whitespace-nowrap">{bigType}</button>
                        )}
                    </div>
                </header>
                <div ref={boxRef} className="flex-1 px-1 overflow-y-scroll">
                    {Object.keys(accountingOutType).map(bigType => (
                        <div key={bigType} className=" w-full flex flex-col p-1">
                            <p className="text-sm select-none ml-1 text-zinc-800 py-1">{bigType}</p>
                            <div className="flex flex-row flex-wrap content-center gap-[6px]">
                                {accountingOutType[bigType].map(type =>
                                    <TooltipProvider key={type}>
                                        <Tooltip delayDuration={50}>
                                            <TooltipTrigger onClick={() => handleSelectType(bigType, type)}>
                                                <Icons name={type} className=" h-10 w-10 cursor-pointer bg-zinc-50 hover:bg-zinc-100 rounded active:bg-zinc-200" />
                                            </TooltipTrigger>
                                            <TooltipContent side="bottom" className=" z-[100]">
                                                <p className=" text-xs select-none">{type}</p>
                                            </TooltipContent>
                                        </Tooltip>
                                    </TooltipProvider>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        )
    else return (
        <div className=" max-w-[268px] max-h-[380px] flex flex-col">
            {accountingInType.map(type =>
                <div key={type} onClick={() => handleSelectType('收入', type)} className="flex flex-row items-center hover:bg-zinc-100 transition-colors select-none pl-1 pr-3">
                    <Icons name={type} />
                    <p className=" text-sm">{type}</p>
                </div>
            )}
        </div>
    )
}