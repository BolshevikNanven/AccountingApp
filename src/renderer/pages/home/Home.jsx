import { useMemo } from "react";

import MainHeader from "../../components/mainHeader/MainHeader"
import Chart from "../../components/charts/Chart";
import DetailsCard from "../../components/card/detailsCard";
import InputCard from "../../components/card/inputCard";


import { ScrollArea } from "../../components/ui/scrollarea";
import { TrendingUp, TrendingDown } from "lucide-react";
import { useBilldata } from "../../store/provider/data-provider";
import dayjs from "dayjs";
import { computeNumber, resortToGroupByDatetime } from "../../lib/utils";
import LedgerSelector from "../../components/selector/ledger";


export default function HomePage() {

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
                incount = computeNumber(incount, '+', data.count)
            }
            if (data.count < 0) {
                outcount = computeNumber(outcount, '+', data.count)
            }
        }


        sumcount = computeNumber(incount, outcount)

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
                            className="mb-1 bg-white dark:bg-zinc-700/80"
                        />
                    )}
                </div>
            )
        })

        return dom
    }, [billdata])


    return (
        <>
            <div className="flex-1 flex flex-col h-full overflow-x-hidden pl-2">
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
                <div className="h-full w-full bg-white dark:bg-zinc-850 rounded-tl-[12px] border dark:border-zinc-600 flex flex-col select-none">
                    <header className=" flex flex-row justify-between relative text-xl font-semibold text-zinc-700 dark:text-zinc-200 mx-5 pt-[16px] mb-2">
                        本月账单<span className=" absolute bottom-0 left-0 h-[5px] w-[36px] rounded-full bg-primary" />
                        <LedgerSelector iconless />
                    </header>
                    <div className="flex flex-col mx-4 px-2 py-3 rounded-[8px] bg-zinc-100/50 dark:bg-zinc-700/30 mb-2">
                        <p className="pl-1 font-semibold text-zinc-800 dark:text-zinc-200">收支</p>
                        <div className=" flex flex-row rounded-[8px] bg-white dark:bg-zinc-700 p-3">
                            <div className="flex flex-row items-center justify-between flex-1 font-semibold text-[21px] text-red-500">
                                <TrendingUp />
                                {'+' + summaryCount[0]}
                            </div>
                            <span className=" w-[1px] mx-3 bg-zinc-100"></span>
                            <div className="flex flex-row items-center justify-between flex-1 font-semibold text-[21px] text-emerald-500">
                                <TrendingDown />
                                {summaryCount[1]}
                            </div>
                        </div>
                    </div>
                    <ScrollArea className="flex-1 mx-4 px-2 py-3 rounded-[8px] bg-zinc-100/50 dark:bg-zinc-700/30">
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