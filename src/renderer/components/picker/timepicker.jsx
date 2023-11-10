import { useEffect, useRef, useState } from "react"

import { Button } from "../ui/button"
import { ScrollArea } from "../ui/scrollarea"
import { Separator } from "../ui/separator"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "../ui/popover"

import dayjs from "dayjs"
import { cn } from "../../lib/utils"

export default function Timepicker({ defaultTime, onSelectTime = (time) => { }, children }) {

    const [open, setOpen] = useState(false);

    const handleSelectTime = (time) => {
        onSelectTime(time);
        setOpen(false);
    }

    return (
        <Popover open={open} onOpenChange={(open) => setOpen(open)}>
            <PopoverTrigger onClick={() => setOpen(true)} asChild>
                {children}
            </PopoverTrigger>
            <PopoverContent className="p-0 w-auto">
                <TimepickerContent defaultTime={defaultTime} onSelectTime={handleSelectTime} />
            </PopoverContent>
        </Popover>


    )
}
function TimepickerContent({ defaultTime, onSelectTime = () => { } }) {

    const [selectedTime, setSelectedTime] = useState(defaultTime || dayjs().format('HH:mm'));

    const hourRef = useRef();
    const minuteRef = useRef();

    const hours = Array.from(new Array(24).keys()).map(item => item.toString().padStart(2, '0'));
    const minutes = Array.from(new Array(60).keys()).map(item => item.toString().padStart(2, '0'));

    const getHour = () => {
        return selectedTime.split(':')[0];
    }
    const getMinute = () => {
        return selectedTime.split(':')[1];
    }

    useEffect(() => {
        //滚动到当前时间
        const hourBoxDom = hourRef.current;
        hourBoxDom.scrollTop = hourBoxDom.childNodes[0].childNodes[parseInt(getHour())].offsetTop - 6;

        const minuteBoxDom = minuteRef.current;
        minuteBoxDom.scrollTop = minuteBoxDom.childNodes[0].childNodes[parseInt(getMinute())].offsetTop - 6;


    }, [selectedTime])

    const handleSelectHour = (hour) => {
        setSelectedTime(hour + ':' + getMinute());
    }
    const handleSelectMinute = (minute) => {
        setSelectedTime(getHour() + ':' + minute);
    }
    const handleClickConfirm = () => {
        onSelectTime(selectedTime);
    }
    const handleClickNow = () => {
        setSelectedTime(dayjs().format('HH:mm'))
    }

    return (
        <div className="flex flex-col">
            <div className="flex flex-row max-h-[230px]">
                <ScrollArea ref={hourRef} scrollHideDelay={0} className=" w-16 p-1">
                    {hours.map(hour =>
                        <button
                            key={hour}
                            onClick={() => handleSelectHour(hour)}
                            className={cn(
                                "w-full text-center p-1 hover:bg-zinc-100 dark:hover:bg-zinc-700 transition-colors text-sm rounded",
                                hour === getHour() && " bg-blue-200 hover:bg-blue-200 dark:bg-blue-800 hover:dark:bg-blue-800",
                            )}
                        >
                            {hour}
                        </button>
                    )}
                    <div className="w-full h-[196px]"></div>
                </ScrollArea>
                <Separator orientation="vertical" className="h-auto my-1" />
                <ScrollArea ref={minuteRef} scrollHideDelay={0} className=" w-16 p-1">
                    {minutes.map(minute =>
                        <button
                            key={minute}
                            onClick={() => handleSelectMinute(minute)}
                            className={cn(
                                "w-full text-center p-1 hover:bg-zinc-100 dark:hover:bg-zinc-700 transition-colors text-sm rounded",
                                minute === getMinute() && " bg-blue-200 hover:bg-blue-200 dark:bg-blue-800 hover:dark:bg-blue-800",
                            )}
                        >
                            {minute}
                        </button>
                    )}
                    <div className="w-full h-[196px]"></div>
                </ScrollArea>
            </div>
            <div className="flex flex-row justify-between items-center p-2 bg-zinc-100 dark:bg-zinc-800 rounded-b-sm">
                <Button onClick={handleClickNow} variant={'ghost'} className=" h-7 px-2 text-sm text-primary hover:text-primary hover:bg-primary/10">此刻</Button>
                <Button onClick={handleClickConfirm} className=" h-7 px-2 text-sm dark:text-zinc-200">确定</Button>
            </div>
        </div>
    )
}