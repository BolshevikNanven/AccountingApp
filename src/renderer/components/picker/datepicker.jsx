import { useState } from "react"

import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "../ui/popover"

import Calendar from "react-calendar"
import dayjs from "dayjs";
import { ChevronLeft, ChevronRight } from "lucide-react";


export default function Datepicker({ defaultDate, onSelectDate = () => { }, children }) {

    const [open, setOpen] = useState(false);

    const handleSelectDate = (date) => {
        onSelectDate(dayjs(date).format('YYYY-MM-DD'));
        setOpen(false);
    }

    return (
        <Popover open={open} onOpenChange={(open) => setOpen(open)}>
            <PopoverTrigger onClick={() => setOpen(true)} asChild>
                {children}
            </PopoverTrigger>
            <PopoverContent className="p-0 w-[300px]">
                <Calendar
                    className='calendarpicker'
                    formatDay={(locale, date) => dayjs(date).format('D')}
                    nextLabel={<ChevronRight className=" w-5 h-5" />}
                    prevLabel={<ChevronLeft className=" w-5 h-5" />}
                    formatShortWeekday={(locale, date) => dayjs(date).format('dd')}
                    onClickDay={handleSelectDate}
                    defaultValue={defaultDate}
                    minDetail="year"
                    locale="zh-cn"
                />
            </PopoverContent>
        </Popover>


    )
}