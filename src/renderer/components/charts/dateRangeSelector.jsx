import { useGlobalState } from "../../store/provider/state-provider"

import { cn } from "../../lib/utils"
import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSub,
    DropdownMenuSubTrigger,
    DropdownMenuSubContent,
} from "../ui/dropdown-menu"

import { ChevronDown, ChevronLeft, ChevronRight } from "lucide-react"
import { useCallback, useEffect, useMemo, useState } from "react"
import { useBilldata } from "../../store/provider/data-provider"

import Calendar from "react-calendar"
import dayjs from "dayjs";


export function DateRangeSelector({ className }) {
    const [globalState, dispatchGlobalStateData] = useGlobalState()
    const [billdata, dispatchBilldata] = useBilldata()

    const [open, setOpen] = useState(false)

    const timeFilterData = useCallback((range) => {
        let dataSet = new Set();

        billdata.forEach(bill => dataSet.add(range === '年' ? dayjs(bill.datetime).format('YYYY年') : dayjs(bill.datetime).format('YYYY-MM')))


        return dataSet

    }, [billdata])

    const selectRange = (range) => {
        dispatchGlobalStateData({ chartRange: range })
        setOpen(false)
    }

    const activeMonth = useMemo(() => timeFilterData('月'), [billdata])

    useEffect(() => {
        if (globalState.chartRange === undefined) {
            dispatchGlobalStateData({ chartRange: ['近7天'] })
        }
    }, [])

    if (globalState.chartRange !== undefined) return (
        <DropdownMenu open={open} onOpenChange={() => open && setOpen(false)}>
            <DropdownMenuTrigger onClick={() => setOpen(true)} asChild>
                <button className={cn("flex flex-row items-center p-1 pr-1 px-2 text-sm text-zinc-800 dark:text-zinc-100 rounded outline-none border-none dark:hover:bg-zinc-700 hover:bg-zinc-200/60 transition-all", className)}>
                    {globalState.chartRange[1] || globalState.chartRange[0]}
                    <ChevronDown className="w-3 h-3 ml-1" />
                </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuSub>
                    <DropdownMenuSubTrigger>年</DropdownMenuSubTrigger>
                    <DropdownMenuSubContent>
                        {Array.from(timeFilterData('年')).map((time) =>
                            <DropdownMenuItem onClick={() => selectRange(['年', time])} key={time}>{time}</DropdownMenuItem>
                        )}
                    </DropdownMenuSubContent>
                </DropdownMenuSub>
                <DropdownMenuSub>
                    <DropdownMenuSubTrigger>月</DropdownMenuSubTrigger>
                    <DropdownMenuSubContent className=" p-0">
                        <Calendar
                            className='calendarpicker max-w-[240px]'
                            nextLabel={<ChevronRight className=" w-5 h-5" />}
                            prevLabel={<ChevronLeft className=" w-5 h-5" />}
                            tileDisabled={(args) => !activeMonth.has(dayjs(args.date).format('YYYY-MM'))}
                            onClickMonth={(value) => selectRange(['月', dayjs(value).format('YYYY年MM月')])}
                            minDetail="year"
                            maxDetail="year"
                            locale="zh-cn"
                        />
                    </DropdownMenuSubContent>
                </DropdownMenuSub>
                <DropdownMenuItem onClick={()=>selectRange(['近7天'])}>近7天</DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}