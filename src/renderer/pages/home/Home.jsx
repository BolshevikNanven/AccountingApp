import { useCallback, useEffect, useRef, useState } from "react";

import MainHeader from "../../components/mainHeader/MainHeader"
import Chart from "../../components/charts/Chart";
import DetailsCard from "../../components/card/detailsCard";

import { ScrollArea } from "../../components/ui/scrollarea";
import { Button } from "../../components/ui/button";

import { TrendingUp, TrendingDown } from "lucide-react";
import InOutCard from "../../components/card/inoutCard";


export default function Home() {

    return (
        <>
            <div className="flex-1 flex flex-col h-full overflow-x-hidden">
                <MainHeader title="主页" className=" px-4" />

                <div className="flex flex-row flex-1 pt-2">
                    <div className=" relative flex-1 max-w-[50%]">
                        <Chart
                            title={'支出分类'}
                            chartType={'pie'}
                        />
                    </div>
                    <div className=" flex-1"></div>
                </div>
                <div className="relative w-full flex-1 pb-4">
                    <Chart
                        title={'支出趋势'}
                        chartType={'line'}
                    />
                </div>
            </div>
            <div className="h-full w-[368px] p-4 pt-[38px]">
                <div className="h-full w-full bg-white rounded-[16px] shadow-md flex flex-col select-none">
                    <header className=" relative text-xl font-semibold text-zinc-700 mx-3 pt-[16px] mb-4">
                        本月账单<span className=" absolute bottom-0 left-0 h-[5px] w-[36px] rounded-full bg-gradient-to-r from-primary to-transparent" />
                    </header>
                    <div className="w-full flex flex-col px-3">
                        <div className=" flex flex-row gap-2 overflow-visible">
                            <InOutCard
                                title={'支出'}
                                count={543.2}
                                className={'bg-[rgb(254,122,135)] shadow-[rgba(254,122,135,0.54)] shadow-md'}
                                icon={<TrendingUp className=" text-white" />}
                            />
                            <InOutCard
                                title={'收入'}
                                count={113.42}
                                className={'bg-[rgb(0,195,179)] shadow-[rgba(0,195,179,0.54)] shadow-md'}
                                icon={<TrendingDown className=" text-white" />}
                            />
                        </div>
                        <div className="flex flex-row px-2 my-2 items-center gap-1">
                            <div className="flex flex-col gap-[2px] w-4 h-3">
                                <span className=" rounded-full flex-1 bg-[rgb(254,122,135)]" />
                                <span className=" rounded-full flex-1 bg-[rgb(0,195,179)]" />
                            </div>
                            <p className=" text-sm text-zinc-700 font-semibold">-429.78</p>
                        </div>
                    </div>
                    <ScrollArea className="flex-1 px-3">
                        <h3 className=" sticky top-0 left-0 text-lg pb-1 font-semibold text-zinc-600 w-full bg-white">
                            明细
                        </h3>
                        <DetailsCard type='小吃' note='' count={-18.9} className="mb-2"/>
                        <DetailsCard type='正餐' note='吃了答辩' count={+58.8} className="mb-2"/>
                        <DetailsCard type='正餐' note='吃了勾丝' count={-18.9} className="mb-2" />
                        <DetailsCard type='小吃' note='' count={-18.9} className="mb-2"/>
                        <DetailsCard type='正餐' note='吃了答辩' count={-58.8} className="mb-2"/>
                        <DetailsCard type='正餐' note='吃了勾丝' count={-18.9} className="mb-2"/>
                    </ScrollArea>
                    <footer className="flex flex-col px-3 py-4 my-1">
                        <div className="bg-zinc-100 rounded-lg p-2 mb-3">
                            <input type="text" className="bg-transparent outline-none h-full" placeholder="计入账单..." />
                        </div>
                        <Button className=" active:bg-primary/80">支出</Button>
                    </footer>
                </div>
            </div>
        </>

    )
}