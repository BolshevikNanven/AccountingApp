import { useState } from "react"
import Icons, { accountingType } from "../icons/icons"

import { Button } from "../ui/button"
import { ScrollArea } from "../ui/scrollarea"
import { Separator } from "../ui/separator"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "../ui/popover"

import { cn } from "../../lib/utils"


export default function TypePicker({ defaultType, onSelectType = () => { }, children }) {

    const [open, setOpen] = useState(false);

    const handleSelectType = (type) => {
        onSelectType(type);
        setOpen(false);
    }

    return (
        <Popover open={open} onOpenChange={(open) => setOpen(open)}>
            <PopoverTrigger onClick={() => setOpen(true)} asChild>
                {children}
            </PopoverTrigger>
            <PopoverContent className="p-0 w-auto">
                <TypepickerContent defaultTime={defaultType} onSelectTime={handleSelectType}/>
            </PopoverContent>
        </Popover>
    )
}
function TypepickerContent() {
    return (
        <div className=" w-full max-h-[280px]">
            <ScrollArea scrollHideDelay={0}>
                {Object.keys(accountingType).map(bigType => (
                    <div key={bigType} className=" w-full flex flex-col p-1">
                        <p className="text-sm select-none ml-1">{bigType}</p>
                        <div className="flex flex-row flex-wrap content-center gap-[2px]">
                            {accountingType[bigType].map(type =>
                                <Icons key={type} name={type} className=" cursor-pointer hover:bg-zinc-100 rounded active:bg-zinc-200"/>
                            )}
                        </div>
                    </div>
                ))}
            </ScrollArea>
        </div>
    )
}