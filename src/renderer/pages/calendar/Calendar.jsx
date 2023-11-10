import { useCallback, useState } from "react";
import MainHeader from "../../components/mainHeader/MainHeader"

import { ChevronLeft, ChevronRight, Equal, Repeat } from "lucide-react";

import { Button } from "../../components/ui/button";

import Calendar from "react-calendar"
import dayjs from "dayjs";
import { useBilldata } from "../../store/provider/data-provider";
import { cn, computeNumber } from "../../lib/utils";


export default function CalendarPage() {

    const [billdata, dispatchBilldata] = useBilldata()

    const [activeDate, setActiveDate] = useState(new Date())
    const [calendarView, setCalendarView] = useState('month')


    const filterTimeData = (date, unit = 'day' || 'month') => {
        let data = []
        for (let bill of billdata) {
            if (dayjs(bill.datetime).isAfter(date, unit)) {
                continue
            }
            if (dayjs(bill.datetime).isBefore(date, unit)) {
                break
            }
            data.push(bill)
        }
        return data
    }

    const renderTileContent = ({ date, view }) => {
        switch (view) {
            case 'month': {
                const data = filterTimeData(date, 'day')
                const day = dayjs(date).isSame(dayjs(), 'day') ? "今" : dayjs(date).format('D')
                let incount = 0, outcount = 0

                data.forEach(bill => {
                    if (bill.count > 0) {
                        incount = computeNumber(bill.count, '+', incount)
                    } else outcount = computeNumber(bill.count, '+', outcount)
                })

                return (
                    <div className="w-full h-full flex flex-col items-center custom">
                        <p
                            className={cn("w-[54%] h-[54%] rounded-[19px] flex flex-col justify-center items-center text-zinc-800 dark:text-zinc-50 cursor-pointer transition-all hover:rounded-[27px]",
                                incount === 0 && outcount !== 0 && "bg-emerald-400/80",
                                incount !== 0 && "bg-red-400/80",
                            )}
                        >{day}</p>
                        {outcount !== 0 && <p className=" text-emerald-500 text-sm">{outcount}</p>}
                        {incount !== 0 && <p className=" text-red-500 text-sm">+{incount}</p>}
                    </div>
                )
            }
            case 'year': {
                const day = dayjs(date).format('M月')
                const data = filterTimeData(date, 'month')
                let incount = 0, outcount = 0

                data.forEach(bill => {
                    if (bill.count > 0) {
                        incount = computeNumber(bill.count, '+', incount)
                    } else outcount = computeNumber(bill.count, '+', outcount)
                })

                return (
                    <div className={cn("w-full h-full flex flex-col items-center justify-center custom",
                        ((incount !== 0 || outcount !== 0) && incount + outcount < 0) && "bg-emerald-400/60",
                        ((incount !== 0 || outcount !== 0) && incount + outcount > 0) && "bg-red-400/60",)}
                    >
                        <p className={cn("flex h-14 flex-col items-center text-2xl font-normal text-zinc-800 dark:text-zinc-50 transition-all")}>
                            {day}
                            {outcount !== 0 && <p className=" text-emerald-500 text-sm">{outcount}</p>}
                            {incount !== 0 && <p className=" text-red-500 text-sm">+{incount}</p>}
                        </p>
                    </div>
                )
            }
        }
    }

    const handleChangeView = () => {
        if (calendarView === 'month') {
            setCalendarView('year')
        } else {
            setCalendarView('month')
        }
    }
    const handleNext = () => {
        if (calendarView === 'month') {
            setActiveDate(dayjs(activeDate).add(1, 'month').toDate())
        } else {
            setActiveDate(dayjs(activeDate).add(1, 'year').toDate())
        }
    }
    const handlePrev = () => {
        if (calendarView === 'month') {
            setActiveDate(dayjs(activeDate).subtract(1, 'month').toDate())
        } else {
            setActiveDate(dayjs(activeDate).subtract(1, 'year').toDate())
        }
    }
    const handleToday = () => {
        setActiveDate(new Date());
    }

    return (
        <div className="flex-1 flex flex-col h-full px-4 overflow-x-hidden">
            <MainHeader borderless title="流水日历">
                <div onClick={handleChangeView} className="px-3 h-8 flex flex-row items-center font-semibold cursor-pointer hover:bg-zinc-200 dark:hover:bg-zinc-700 active:bg-zinc-300 rounded transition-colors mr-2">
                    {dayjs(activeDate).format('YYYY年M月')}
                </div>
                <Button onClick={handlePrev} variant='outline' className="px-2 h-8 rounded-r-none">
                    <ChevronLeft className="w-5 h-5 text-zinc-600 dark:text-zinc-50" />
                </Button>
                <Button onClick={handleNext} variant='outline' className="px-2 h-8 rounded-l-none border-l-0 mr-1">
                    <ChevronRight className="w-5 h-5 text-zinc-600 dark:text-zinc-50" />
                </Button>
                <Button onClick={handleToday} variant='outline' className="px-3 h-8 ml-1">
                    今天
                </Button>
            </MainHeader>
            <Calendar
                className='fullcalendar'
                formatDay={(locale, date) => dayjs(date).format('D')}
                showNavigation={false}
                view={calendarView}
                activeStartDate={activeDate}
                minDetail="year"
                locale="zh-cn"
                tileContent={renderTileContent}
            />
        </div>
    )
}