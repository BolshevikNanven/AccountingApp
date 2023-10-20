import MainHeader from "../../components/mainHeader/MainHeader"
import DetailsCard from "../../components/card/detailsCard"

import { ScrollArea } from "../../components/ui/scrollarea"
import InputCard from "../../components/card/inputCard"

import { ListPlus, X } from "lucide-react"
import { cn } from "../../lib/utils"
import { useState } from "react"

export default function Details() {

    const [sidebarOpen, setSidebarOpen] = useState(true);

    return (
        <>
            <div className="flex-1 flex flex-col max-h-full overflow-x-hidden select-none">
                <MainHeader title="流水明细" />
                <ScrollArea className={cn(" pt-2 px-3 flex-1", !sidebarOpen && "pr-4")}>
                    <DetailsCard type='小吃' note='' count={-18.9} className="mb-2 pr-3 bg-white" />
                    <DetailsCard type='正餐' note='吃了答辩' count={+58.8} className="mb-2 pr-3 bg-white" />
                    <DetailsCard type='正餐' note='吃了勾丝' count={-18.9} className="mb-2 pr-3 bg-white" />
                    <DetailsCard type='小吃' note='' count={-18.9} className="mb-2 pr-3 bg-white" />
                    <DetailsCard type='正餐' note='吃了答辩' count={-58.8} className="mb-2 pr-3 bg-white" />
                    <DetailsCard type='正餐' note='吃了勾丝' count={-18.9} className="mb-2 pr-3 bg-white" />
                    <DetailsCard type='小吃' note='' count={-18.9} className="mb-2 pr-3 bg-white" />
                    <DetailsCard type='正餐' note='吃了答辩' count={+58.8} className="mb-2 pr-3 bg-white" />
                    <DetailsCard type='正餐' note='吃了勾丝' count={-18.9} className="mb-2 pr-3 bg-white" />
                    <DetailsCard type='小吃' note='' count={-18.9} className="mb-2 pr-3 bg-white" />
                    <DetailsCard type='正餐' note='吃了答辩' count={-58.8} className="mb-2 pr-3 bg-white" />
                    <DetailsCard type='正餐' note='吃了勾丝' count={-18.9} className="mb-2 pr-3 bg-white" />
                </ScrollArea>
            </div>
            <div className={cn("h-full w-[356px] p-3 pb-4 pt-[48px] overflow-hidden transition-all duration-300", !sidebarOpen && "w-0 px-0")}>
                <div className=" min-w-[328px] w-[328px] h-full shadow-xl rounded-lg flex flex-col overflow-hidden">
                    <header className=" bg-[rgb(241,243,244)] h-[36px] border-t rounded-t-lg border-white flex flex-row justify-between px-4">
                        <button className="outling-none bg-transparent"><ListPlus className="w-5 h-5 text-zinc-500" /></button>
                        <button onClick={() => setSidebarOpen(false)} className="outling-none bg-transparent"><X className="w-5 h-5 text-zinc-500" /></button>
                    </header>
                    <h3 className=" relative text-xl font-semibold text-zinc-700 mx-3 pt-3 ml-[14px] ">
                        新建账单<span className=" absolute bottom-0 left-0 h-[5px] w-[36px] rounded-full bg-gradient-to-r from-primary to-transparent" />
                    </h3>
                    <div className="flex-1 mx-3 pb-4">
                        <InputCard className="h-full" full />
                    </div>

                </div>
            </div>
        </>

    )
}