import { useRef, useState } from "react"
import { cn } from "../../lib/utils"

import { CalendarDays, ChevronDown } from "lucide-react";
import { Separator } from "../ui/separator";
import { Button } from "../ui/button";

import Icons from "../icons/icons";

export default function InputCard({ className, vertical = false }) {

    const [open, setOpen] = useState(false);
    const [inputValue, setInputValue] = useState("");

    const handleInput = (e) => {

        if (!open && e.target.value !== "") setOpen(true);
        if (e.target.value === "" && open) setOpen(false);
        setInputValue(e.target.value);

    }
    const handleFold = () => {
        setOpen(prev => !prev)
    }

    return (
        <div className={cn(" flex flex-col transition-all relative", className)}>
            <div className=" absolute top-[-14px] left-0 w-full h-1">
                <span onClick={handleFold} className=" bg-clip-padding block cursor-pointer w-[86px] border-2 border-transparent mx-auto h-2 rounded-full bg-zinc-300" />
            </div>
            {vertical ?
                <div className=" h-[46px] flex flex-row items-center bg-zinc-100 transition-all focus-within:border-zinc-300 border rounded-lg mb-3">
                    <Button className="m-0 py-0 h-full px-1 pr-3" variant="ghost">
                        <Icons name="正餐" />
                        <p className=" text-md">正餐</p>
                    </Button>
                    <Separator className="h-[28px]" orientation="vertical" />
                    <input type="number" value={inputValue} onChange={handleInput} className="bg-transparent outline-none p-3 h-full flex-1" placeholder="计入账单..." />
                </div>
                :
                <div className=" flex flex-row">

                </div>
            }
            {open &&
                <main className="flex flex-col mb-3">
                    <div className=" flex flex-col text-zinc-600 mb-2">
                        <span className="text-zin-600 font-semibold text-sm pl-[2px] mb-[3px]">时间</span>
                        <div className="flex flex-row">
                            <button className="bg-zinc-100 flex flex-row items-center gap-1 hover:bg-zinc-200 rounded-md rounded-r-none p-2 px-3 text-sm">
                                10月19日
                                <CalendarDays className=" w-4 h-4 text-zinc-600 inline-block" />
                            </button>
                            <Separator orientation="vertical" />
                            <button className="bg-zinc-100 hover:bg-zinc-200 rounded-md rounded-l-none p-2 text-sm">17:02</button>
                        </div>
                    </div>
                    <div className=" flex flex-col text-zinc-600 mb-2">
                        <span className="text-zin-600 font-semibold text-sm pl-[2px] mb-[3px]">账本</span>
                        <div>
                            <button className="bg-zinc-100 hover:bg-zinc-200 rounded-md p-2 px-3 text-sm">
                                默认账本
                                <ChevronDown className=" w-4 h-4 text-zinc-600 inline-block ml-1" />
                            </button>
                        </div>
                    </div>
                    <div className=" flex flex-col text-zinc-600 mb-3">
                        <span className="text-zin-600 font-semibold text-sm pl-[2px] mb-[3px]">备注</span>
                        <input type="text" className="w-full bg-zinc-100 p-2 rounded-md outline-none text-sm px-3" placeholder="备注" />
                    </div>
                    <Separator />
                </main>
            }
            {vertical &&
                <div className="flex flex-row">
                    <Button className="rounded-r-none flex-1">确认支出</Button>
                    <Separator className=" bg-primary/80" orientation="vertical" />
                    <Button className="rounded-l-none px-2"> <ChevronDown /> </Button>
                </div>
            }
        </div>
    )
}