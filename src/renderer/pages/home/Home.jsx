import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import MainHeader from "../../components/mainHeader/MainHeader"
import Chart from "../../components/charts/Chart";
import DetailsCard from "../../components/card/detailsCard";
import InOutCard from "../../components/card/inoutCard";
import InputCard from "../../components/card/inputCard";


import { ScrollArea } from "../../components/ui/scrollarea";
import { TrendingUp, TrendingDown } from "lucide-react";
import { useBilldata } from "../../store/provider";
import dayjs from "dayjs";
import { resortToGroupByDatetime } from "../../lib/utils";


export default function Home() {

    const [billdata, dispatchBilldata] = useBilldata();

    const submitBill = (action, bill) => {
        dispatchBilldata({
            type: 'ADD',
            payload: bill,
        })

    }

    const summaryCount = useMemo(() => {
        let incount = 0, outcount = 0, sumcount = 0;
        const nowyear = dayjs().year(), nowmonth = dayjs().month()
        for (let data of billdata) {
            if (dayjs(data.datetime).year() < nowyear || dayjs(data.datetime).month() < nowmonth) {
                continue
            }
            if (data.count > 0) {
                incount += data.count;
            }
            if (data.count < 0) {
                outcount += data.count
            }
        }

        sumcount = incount + outcount;

        return [incount, outcount, sumcount];

    }, [billdata])


    const renderBillData = useMemo(() => {
        const sortedBill = resortToGroupByDatetime(billdata);
        let dom = [];

        sortedBill.forEach((value, key) => {
            dom.push(
                <div key={key} className="flex flex-col mb-1">
                    <p className=" ml-1 mb-1 text-zinc-700 dark:text-zinc-400 text-sm font-semibold">{dayjs(key).format('M月D日')}</p>
                    {value.map(bill =>
                        <DetailsCard
                            key={bill.id}
                            {...bill}
                            className="mb-2 "
                        />
                    )}
                </div>
            )
        })

        return dom
    }, [billdata])


    return (
        <>
            <div className="flex-1 flex flex-col h-full overflow-x-hidden">
                <MainHeader title="主页" className=" px-4" />

                <div className="relative w-full flex-1 pt-2 mt-2">
                    <Chart
                        title={'分类'}
                        chartType={'pie'}
                        billdata={billdata}
                    />
                </div>
                <div className="relative w-full flex-1 pb-4">
                    <Chart
                        title={'趋势'}
                        chartType={'line'}
                        billdata={billdata}
                    />
                </div>
            </div>
            <div className="h-full w-[376px] pt-[38px] pl-2">
                <div className="h-full w-full bg-white dark:bg-zinc-800 rounded-tl-[12px] border flex flex-col select-none">
                    <header className=" relative text-xl font-semibold text-zinc-700 mx-4 pt-[16px] mb-4">
                        本月账单<span className=" absolute bottom-0 left-0 h-[5px] w-[36px] rounded-full bg-gradient-to-r from-primary to-transparent" />
                    </header>
                    <div className="w-full flex flex-col px-4">
                        <div className=" flex flex-col gap-2 overflow-visible">
                            <InOutCard
                                title={'支出'}
                                count={summaryCount[1]}
                                className={'  bg-emerald-400'}
                                icon={<TrendingUp className=" text-white" />}
                            />
                            <InOutCard
                                title={'收入'}
                                count={'+' + summaryCount[0]}
                                className={' bg-red-400 '}
                                icon={<TrendingDown className=" text-white" />}
                            />
                        </div>
                        <div className="flex flex-row px-2 my-2 items-center gap-1">
                            <div className="flex flex-col gap-[2px] w-4 h-3">
                                <span className=" rounded-full flex-1 bg-emerald-400" />
                                <span className=" rounded-full flex-1 bg-red-400" />
                            </div>
                            <p className=" text-sm text-zinc-700 font-semibold">{summaryCount[2]}</p>
                        </div>
                    </div>
                    <ScrollArea className="flex-1 px-4">
                        {renderBillData}
                    </ScrollArea>
                    <footer className="flex flex-col px-4 pb-5 my-1 overflow-hidden">
                        <InputCard onSubmit={submitBill} autofocus />
                    </footer>
                </div>
            </div>
        </>

    )
}