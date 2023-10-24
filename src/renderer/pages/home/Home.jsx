import { useCallback, useEffect, useRef, useState } from "react";

import MainHeader from "../../components/mainHeader/MainHeader"
import Chart from "../../components/charts/Chart";
import DetailsCard from "../../components/card/detailsCard";
import InOutCard from "../../components/card/inoutCard";
import InputCard from "../../components/card/inputCard";


import { ScrollArea } from "../../components/ui/scrollarea";
import { TrendingUp, TrendingDown } from "lucide-react";
import { useBilldata } from "../../store/provider";


export default function Home() {

    const [billdata, dispatchBilldata] = useBilldata();


    return (
        <>
            <div className="flex-1 flex flex-col h-full overflow-x-hidden">
                <MainHeader title="主页" className=" px-4" />

                <div className="relative w-full flex-1 pt-2 mt-2">
                    <Chart
                        title={'支出分类'}
                        chartType={'pie'}
                    />
                </div>
                <div className="relative w-full flex-1 pb-4">
                    <Chart
                        title={'支出趋势'}
                        chartType={'line'}
                    />
                </div>
            </div>
            <div className="h-full w-[376px] p-4 pt-[38px]">
                <div className="h-full w-full bg-white rounded-[16px] shadow-md flex flex-col select-none">
                    <header className=" relative text-xl font-semibold text-zinc-700 mx-3 pt-[16px] mb-4">
                        本月账单<span className=" absolute bottom-0 left-0 h-[5px] w-[36px] rounded-full bg-gradient-to-r from-primary to-transparent" />
                    </header>
                    <div className="w-full flex flex-col px-4">
                        <div className=" flex flex-col gap-2 overflow-visible">
                            <InOutCard
                                title={'支出'}
                                count={'-543.2'}
                                className={' bg-red-400 '}
                                icon={<TrendingUp className=" text-white" />}
                            />
                            <InOutCard
                                title={'收入'}
                                count={'+113.42'}
                                className={' bg-emerald-400 '}
                                icon={<TrendingDown className=" text-white" />}
                            />
                        </div>
                        <div className="flex flex-row px-2 my-2 items-center gap-1">
                            <div className="flex flex-col gap-[2px] w-4 h-3">
                                <span className=" rounded-full flex-1 bg-red-400" />
                                <span className=" rounded-full flex-1 bg-emerald-400" />
                            </div>
                            <p className=" text-sm text-zinc-700 font-semibold">-429.78</p>
                        </div>
                    </div>
                    <ScrollArea className="flex-1 px-4">
                        <h3 className=" sticky top-0 left-0 text-lg pb-1 font-semibold text-zinc-600 w-full bg-white">
                            明细
                        </h3>
                        {billdata.map(bill =>
                            <DetailsCard
                                key={bill.id}
                                {...bill}
                                className="mb-2"
                            />
                        )}

                    </ScrollArea>
                    <footer className="flex flex-col px-4 pb-4 my-1 overflow-hidden">
                        <InputCard />
                    </footer>
                </div>
            </div>
        </>

    )
}