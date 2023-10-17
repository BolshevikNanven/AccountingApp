import { useCallback, useEffect, useRef, useState } from "react";
import MainHeader from "../../components/mainHeader/MainHeader"

import { debounce } from "../../lib/utils";

import Chart from "../../components/charts/Chart";

export default function Home() {

    return (
        <div className="flex flex-col h-full overflow-x-hidden">
            <MainHeader title="主页" className=" px-4" />

            <div className="flex flex-row flex-1">
                <div className=" relative flex-1">
                    <p className=" absolute top-0 left-[26px] font-semibold text-lg text-zinc-600">支出分类</p>
                    <Chart chartType={'pie'}/>
                </div>
                <div className=" flex-1"></div>
            </div>
            <div className="relative w-full flex-1 pb-4">
                <p className=" absolute top-0 left-[26px] font-semibold text-lg text-zinc-600">支出趋势</p>
                <Chart chartType={'line'}/>
            </div>

        </div>
    )
}