import { useEffect, useRef, useState } from "react"
import { cn } from "../../lib/utils"

import dayjs from "dayjs";
import { nanoid } from "nanoid";

import { CalendarDays, ChevronDown, ChevronsUpDown } from "lucide-react";
import { Separator } from "../ui/separator";
import { Button } from "../ui/button";
import Timepicker from "../picker/timepicker";

import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "../ui/popover"

import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../ui/dropdown-menu";

import Icons from "../icons/icons";
import { ScrollArea } from "../ui/scrollarea";
import { Checkbox } from "../ui/checkbox";

const emptyData = () => ({
    id: nanoid(),
    datetime: dayjs().format('YYYY-MM-DD HH:mm'),
    bigType: null,
    type: '正餐',
    count: '',
    ledger: '默认账本',
    note: '',
    options: []
})

const InputCard = ({ data = null, className, full, edit, transition, autofocus, onSubmit = () => { } }) => {

    const [open, setOpen] = useState(false);
    const [billdata, setBilldata] = useState(emptyData())

    const inputRef = useRef();
    const boxRef = useRef();


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

    useEffect(() => {
        if (data === null) {
            setBilldata(emptyData())
        } else setBilldata(data)

        //渐入动画
        playAnimation();

    }, [data])

    const handleInputCount = (e) => {
        if (!open && e.target.value !== "") setOpen(true);
        if (e.target.value === "" && open) setOpen(false);
        setBilldata({ ...billdata, count: e.target.value });
    }
    const handleInputNote = (e) => {
        setBilldata({ ...billdata, note: e.target.value });
    }
    const handleSelectTime = (time) => {
        setBilldata({ ...billdata, datetime: dayjs(billdata.datetime).format('YYYY-MM-DD ') + time })
    }
    const handleFold = () => {
        setOpen(prev => !prev)
    }
    const handleSubmit = () => {
        if (billdata.count === '') {
            return;
        }
        onSubmit('confirm', billdata);
        setBilldata(emptyData());
        playAnimation();
    }
    const handleDelete = () => {
        onSubmit('delete', billdata);
    }
    const checkOption = (option) => {
        if (findOptionCheck(option)) {
            setBilldata({ ...billdata, options: billdata.options.filter(options => options !== option) })
        } else {
            setBilldata({ ...billdata, options: [...billdata.options, option] })
        }
    }
    const findOptionCheck = (option) => {
        return billdata.options.includes(option);
    }
    const playAnimation = () => {
        if (transition) {
            boxRef.current.style.transform = 'translateY(5px)';
            boxRef.current.style.opacity = '0';

            const timer = setTimeout(() => {
                boxRef.current.style.transform = '';
                boxRef.current.style.opacity = '1';
                if (autofocus) {
                    inputRef.current.focus();
                }

                clearTimeout(timer);
            }, 200)
        }
    }

    return (
        <div ref={boxRef} className={cn(" flex flex-col transition-all relative overflow-hidden pt-4 select-none", className)}>
            {!full &&
                <div className=" absolute top-1 left-0 w-full h-1">
                    <span onClick={handleFold} className=" bg-clip-padding block cursor-pointer w-[86px] border-2 border-transparent mx-auto h-2 rounded-full bg-zinc-300" />
                </div>
            }
            <div className="inputUnderline h-[46px] flex flex-row items-center bg-zinc-100 focus-within:bg-white border rounded-md mb-3">
                <Button className="m-0 py-0 h-full px-1 pr-3 rounded-none" variant="ghost">
                    <Icons name={billdata.type} />
                    <p className=" text-md">{billdata.type}</p>
                </Button>
                <Separator className="h-[28px]" orientation="vertical" />
                <input ref={inputRef} type="number" value={billdata.count} onChange={handleInputCount} className="bg-transparent outline-none p-3 h-full flex-1" placeholder="计入账单..." />
            </div>

            {(open || full) &&
                <ScrollArea className="flex-1 mb-3">
                    <div className=" flex flex-col text-zinc-600 mb-3">
                        <span className="text-zin-600 font-semibold text-sm pl-[2px] mb-1">时间</span>
                        <div className="flex flex-row">
                            <Popover>
                                <PopoverTrigger
                                    className="bg-zinc-100 focus-within:bg-white h-[42px] inputUnderline border flex flex-row items-center gap-1 border-r-0  hover:bg-zinc-200 rounded-md rounded-r-none p-[10px] px-3 text-sm"
                                >
                                    {dayjs(billdata.datetime).format('M月DD日')}
                                    <CalendarDays className=" w-4 h-4 text-zinc-600" />
                                </PopoverTrigger>
                                <PopoverContent className="p-0">
                                    日历
                                </PopoverContent>
                            </Popover>

                            <Timepicker defaultTime={dayjs(billdata.datetime).format('HH:mm')} onSelectTime={handleSelectTime}>
                                <Button className="bg-zinc-100 focus-within:bg-white h-[42px] text-zinc-900 inputUnderline border flex flex-row items-center gap-1 hover:bg-zinc-200 rounded-md rounded-l-none p-[10px] text-sm">
                                    {dayjs(billdata.datetime).format('HH:mm')}
                                    <ChevronsUpDown className=" w-4 h-4 text-zinc-600" />
                                </Button>
                            </Timepicker>
                        </div>
                    </div>
                    <div className=" flex flex-col mb-3">
                        <span className="text-zinc-600 font-semibold text-sm pl-[2px] mb-[3px]">账本</span>
                        <div>
                            <DropdownMenu>
                                <DropdownMenuTrigger className="bg-zinc-100 focus-within:bg-white inputUnderline border hover:bg-zinc-200 rounded-md p-[10px] px-3 text-sm">
                                    {billdata.ledger}
                                    <ChevronDown className=" w-4 h-4 text-zinc-600 inline-block ml-1" />
                                </DropdownMenuTrigger>
                                <DropdownMenuContent>
                                    <DropdownMenuItem>默认账本</DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                    </div>
                    <div className=" flex flex-col mb-3">
                        <span className="text-zinc-600 font-semibold text-sm pl-[2px] mb-[3px]">备注</span>
                        <div className="inputUnderline">
                            <input value={billdata.note} onChange={handleInputNote} type="text" className="w-full bg-zinc-100 focus-within:bg-white border p-[10px] rounded-md outline-none text-sm px-3" placeholder="添加账单备注" />
                        </div>
                    </div>
                    <div className=" flex flex-col mb-3">
                        <span className="text-zinc-600 font-semibold text-sm pl-[2px] mb-1">更多选项</span>
                        <div className=" flex flex-row flex-wrap gap-1">
                            <div className="flex items-center space-x-1 border rounded-lg px-3 py-2 ">
                                <Checkbox id='已报销' checked={findOptionCheck('已报销')} onCheckedChange={() => checkOption('已报销')} />
                                <label htmlFor="已报销" className="cursor-pointer text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                    已报销
                                </label>
                            </div>

                        </div>
                    </div>
                    {!full && <Separator />}
                </ScrollArea>
            }
            {full && <Separator className=" mb-4" />}
            <div className="flex gap-2">
                {edit && <Button onClick={handleDelete} variant='ghost' className=" w-16 text-red-600 hover:bg-red-100 hover:text-red-700">删除</Button>}
                <Button onClick={handleSubmit} className="flex-1 py-[10px] active:bg-primary/75">确认记账</Button>
            </div>

        </div>
    )
}

export default InputCard;