import { useState } from "react";
import MainHeader from "../../components/mainHeader/MainHeader"

import { ChevronLeft, ChevronRight } from "lucide-react";

import { Button } from "../../components/ui/button";
import { Popover, PopoverTrigger, PopoverContent } from "../../components/ui/popover";

import Calendar from "react-calendar"
import dayjs from "dayjs";
import { useBilldata } from "../../store/provider/data-provider";
import { cn, computeNumber } from "../../lib/utils";

import DetailsCard from "../../components/card/detailsCard";


export default function CalendarPage() {

    const [billdata, dispatchBilldata] = useBilldata()

    const [activeDate, setActiveDate] = useState(new Date())
    const [calendarView, setCalendarView] = useState('month')


    const filterTimeData = (date, unit = 'day' || 'month', targetData) => {
        let targetBill = targetData || billdata
        let data = []
        for (let bill of targetBill) {
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

                if (incount !== 0 || outcount !== 0)
                    return (
                        <Popover>
                            <div className="w-full h-full flex flex-col items-center custom">
                                <PopoverTrigger asChild>
                                    <p className={cn("w-[54%] h-[54%] rounded-[19px] font-semibold text-lg flex flex-col justify-center items-center text-zinc-800 dark:text-zinc-50 cursor-pointer transition-all hover:rounded-[27px]",
                                        incount === 0 && outcount !== 0 && "bg-emerald-400/80",
                                        incount !== 0 && "bg-red-400/80",
                                    )}
                                    >{day}</p>
                                </PopoverTrigger>
                                <p className=" text-emerald-500 text-sm min-h-[20px]"> {outcount !== 0 && outcount}</p>
                                <p className=" text-red-500 text-sm min-h-[20px]"> {incount !== 0 && "+" + incount}</p>
                            </div>
                            <PopoverContent side="right" className=" bg-zinc-50 dark:bg-zinc-900 flex flex-col p-0 cursor-default ">
                                <div className=" text-sm font-semibold px-2 py-2 border-b text-zinc-900 dark:text-zinc-200 select-none">{dayjs(date).format("M月D日")}</div>
                                <main className="max-h-[280px] overflow-y-auto px-1 py-2 select-none">
                                    {data.map(bill => (
                                        <DetailsCard
                                            size="small"
                                            key={bill.id} {...bill}
                                            className="mb-1 bg-white dark:bg-zinc-700/50 rounded-[6px]"
                                        />
                                    ))}
                                </main>

                            </PopoverContent>
                        </Popover>
                    )
                else return (
                    <div className="w-full h-full flex flex-col items-center custom">
                        <p className={cn("w-[54%] h-[54%] rounded-[19px] font-semibold text-lg flex flex-col justify-center items-center text-zinc-800 dark:text-zinc-50 cursor-default transition-all hover:rounded-[27px]",
                            day === '今' && 'text-[#0078d4]')}
                        >{day}</p>
                        <p className=" text-emerald-500 text-sm min-h-[20px]"></p>
                        <p className=" text-red-500 text-sm min-h-[20px]"></p>
                    </div>
                )

            }
            case 'year': return renderYearView(date);
        }
    }

    const renderYearView = (date) => {
        const getIn = (data = []) => {
            if (data.length === 0) return null
            if (data[0].count > 0) return true
            return false
        }

        const data = filterTimeData(date, 'month')
        const lastday = Array(dayjs(date).day()).fill('')
        const days = Array(dayjs(date).daysInMonth()).fill('').map((v, index) => filterTimeData(dayjs(date).add(index, 'day'), 'day', data))
        const weekdayCh = ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一', '十二']

        let incount = 0, outcount = 0

        data.forEach(bill => {
            if (bill.count > 0) {
                incount = computeNumber(bill.count, '+', incount)
            } else outcount = computeNumber(bill.count, '+', outcount)
        })

        return (
            <div className={cn("w-full h-full flex flex-row justify-center custom p-1")}>
                <div className="flex flex-col py-2 pl-3 items-baseline">
                    <p className=" mb-1 font-semibold">{weekdayCh[dayjs(date).month()]}</p>
                    <p className=" text-emerald-500 text-xs font-semibold"> {outcount !== 0 && outcount}</p>
                    <p className=" text-red-500 text-xs font-semibold"> {incount !== 0 && "+" + incount}</p>
                </div>
                <div className="flex-1 grid grid-cols-7 gap-1 px-2 py-1">
                    {lastday.map((v, index) => <p key={dayjs(date).format('YYYY-MM-DD') + 'w' + index}></p>)}
                    {days.map((v, index) =>
                        <p key={dayjs(date).format('YYYY-MM-DD') + index}
                            className={cn("flex dark:text-zinc-300 text-sm flex-row items-center justify-center rounded-full",
                                getIn(v) === true && 'bg-red-400/80',
                                getIn(v) === false && 'bg-emerald-400/80',
                            )}
                        >{index + 1}</p>)}
                </div>
            </div>
        )
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