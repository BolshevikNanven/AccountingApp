import { forwardRef, useEffect, useRef, useState } from "react"
import { cn } from "../../lib/utils"

import dayjs from "dayjs";

import { CalendarDays, ChevronDown, ChevronsUpDown } from "lucide-react";
import { Separator } from "../ui/separator";
import { Button } from "../ui/button";

import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "../ui/popover"

import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../ui/dropdown-menu";



import Icons from "../icons/icons";
import { ScrollArea } from "../ui/scrollarea";

const InputCard = ({ className, full }) => {

    const [open, setOpen] = useState(false);
    const [inputValue, setInputValue] = useState("");
    const [date, setDate] = useState(new Date())
    const [time, setTime] = useState(dayjs().format('HH:mm'));

    const inputRef = useRef();

    /** not finished*/
    useEffect(() => {
        const focusInput = (e) => {
            if ((e.keyCode >= 48 && e.keyCode <= 57 || e.keyCode === 189) && inputRef.current.value === '') {
                inputRef.current.focus();
            }
        }

        window.addEventListener('keydown', focusInput);

        return () => window.removeEventListener('keydown', focusInput);

    }, [])

    const handleInput = (e) => {

        if (!open && e.target.value !== "") setOpen(true);
        if (e.target.value === "" && open) setOpen(false);
        setInputValue(e.target.value);

    }
    const handleFold = () => {
        setOpen(prev => !prev)
    }

    return (
        <div className={cn(" flex flex-col transition-all relative overflow-hidden pt-4", className)}>
            {!full &&
                <div className=" absolute top-1 left-0 w-full h-1">
                    <span onClick={handleFold} className=" bg-clip-padding block cursor-pointer w-[86px] border-2 border-transparent mx-auto h-2 rounded-full bg-zinc-300" />
                </div>
            }
            <div className=" h-[46px] flex flex-row items-center bg-zinc-100 transition-all focus-within:border-zinc-300 border rounded-lg mb-3">
                <Button className="m-0 py-0 h-full px-1 pr-3" variant="ghost">
                    <Icons name="正餐" />
                    <p className=" text-md">正餐</p>
                </Button>
                <Separator className="h-[28px]" orientation="vertical" />
                <input ref={inputRef} type="number" value={inputValue} onChange={handleInput} className="bg-transparent outline-none p-3 h-full flex-1" placeholder="计入账单..." />
            </div>

            {(open || full) &&
                <ScrollArea className="flex flex-1 flex-col mb-3">
                    <div className=" flex flex-col text-zinc-600 mb-2">
                        <span className="text-zin-600 font-semibold text-sm pl-[2px] mb-[3px]">时间</span>
                        <div className="flex flex-row">
                            <Popover>
                                <PopoverTrigger
                                    className="bg-zinc-100 flex flex-row items-center gap-1 hover:bg-zinc-200 rounded-md rounded-r-none p-2 px-3 text-sm">
                                    10月19日<CalendarDays className=" w-4 h-4 text-zinc-600" />
                                </PopoverTrigger>
                                <PopoverContent className="p-0">
                                    日历
                                </PopoverContent>
                            </Popover>

                            <Separator orientation="vertical" />
                            <Popover>
                                <PopoverTrigger
                                    className="bg-zinc-100 flex flex-row items-center gap-1 hover:bg-zinc-200 rounded-md rounded-l-none p-2 text-sm">
                                    {time}<ChevronsUpDown className=" w-4 h-4 text-zinc-600" />
                                </PopoverTrigger>
                                <PopoverContent className="p-0">
                                    timepicker
                                </PopoverContent>
                            </Popover>
                        </div>
                    </div>
                    <div className=" flex flex-col text-zinc-600 mb-2">
                        <span className="text-zin-600 font-semibold text-sm pl-[2px] mb-[3px]">账本</span>
                        <div>
                            <DropdownMenu>
                                <DropdownMenuTrigger className="bg-zinc-100 hover:bg-zinc-200 rounded-md p-2 px-3 text-sm">
                                    默认账本
                                    <ChevronDown className=" w-4 h-4 text-zinc-600 inline-block ml-1" />
                                </DropdownMenuTrigger>
                                <DropdownMenuContent>
                                    <DropdownMenuItem>默认账本</DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                    </div>
                    <div className=" flex flex-col text-zinc-600 mb-3">
                        <span className="text-zin-600 font-semibold text-sm pl-[2px] mb-[3px]">备注</span>
                        <input type="text" className="w-full bg-zinc-100 p-[10px] rounded-md outline-none text-sm px-3" placeholder="添加账单备注" />
                    </div>
                    {!full && <Separator />}
                </ScrollArea>
            }
            {full && <Separator className=" mb-4"/>}
            <Button className=" py-[10px] active:bg-primary/75">确认记账</Button>
        </div>
    )
}

export default InputCard;