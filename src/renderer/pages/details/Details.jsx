import { useEffect, useState } from "react"

import MainHeader from "../../components/mainHeader/MainHeader"
import DetailsCard from "../../components/card/detailsCard"
import DropdownSelector from "../../components/selector/dropdown"
import InputCard from "../../components/card/inputCard"

import { ScrollArea } from "../../components/ui/scrollarea"
import { Button } from "../../components/ui/button"

import { useBilldata } from "../../store/provider"

import { ListPlus, X, Book, Plus, Filter } from "lucide-react"

import { cn } from "../../lib/utils"



export default function Details() {

    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [billdata, dispatchBilldata] = useBilldata();

    const [selectId, setSelectId] = useState(null);


    const searchBillById = (id) => {
        if (id === null) {
            return null;
        }
        return billdata.find(bill => bill.id === id);
    }
    const submitBill = (action, bill) => {
        if (action === 'delete') {
            dispatchBilldata({
                type: 'DELETE',
                payload: bill,
            })
            setSidebarOpen(false)
            return;
        }
        if (selectId === null) {
            dispatchBilldata({
                type: 'ADD',
                payload: bill,
            })
        }
        if (selectId) {
            dispatchBilldata({
                type: 'EDIT',
                payload: bill,
            })
        }

    }
    const handleSelectBill = (id) => {
        setSelectId(id);
        setSidebarOpen(true);
    }
    const handleNewBill = () => {
        setSelectId(null);
        setSidebarOpen(true);
    }

    return (
        <>
            <div className="flex-1 flex flex-col max-h-full overflow-x-hidden select-none">
                <MainHeader title="流水明细" className=' ml-2'>
                    <DropdownSelector icon={<Book className="w-5 h-5 mr-1 text-zinc-600" />} value={'默认账本'} valuesOption={['默认账本', '212']} />
                    <DropdownSelector icon={<Filter className="w-5 h-5 mr-1 text-zinc-600" />} value={'筛选'} valuesOption={['筛选']} />
                    {!sidebarOpen && <Button variant='outline' className="px-2 pr-3 h-8 mr-2" onClick={handleNewBill}><Plus className="w-5 h-5 text-zinc-600 mr-1 " />新增</Button>}
                </MainHeader>
                <ScrollArea className={cn(" pt-2 flex-1")}>
                    {billdata.map(bill => <DetailsCard key={bill.id} onClick={() => handleSelectBill(bill.id)} {...bill} className="mb-2 mx-3 pr-3 bg-white transition-shadow hover:shadow" />)}
                </ScrollArea>
            </div>
            <div className={cn("h-full w-[356px] p-3 pb-4 pt-[48px] overflow-hidden transition-all", !sidebarOpen && "w-0 px-0")}>
                <div className=" min-w-[332px] w-[332px] h-full shadow-xl rounded-lg flex flex-col overflow-hidden">
                    <header className=" bg-[rgb(241,243,244)] h-[36px] border-t rounded-t-lg border-white flex flex-row items-center justify-between px-4">
                        <button onClick={handleNewBill} className="outling-none bg-transparent h-[28px] w-[28px] rounded-full hover:bg-zinc-200"><ListPlus className="w-5 h-5 mx-auto text-zinc-500" /></button>
                        <button onClick={() => setSidebarOpen(false)} className="outling-none bg-transparent h-[28px] w-[28px] rounded-full hover:bg-zinc-200"><X className="w-5 h-5 mx-auto text-zinc-500" /></button>
                    </header>
                    <h3 className=" relative text-xl font-semibold text-zinc-700 mx-3 pt-3 ml-[14px] select-none">
                        {selectId === null ? '新建账单' : '编辑账单'}
                        <span className=" absolute bottom-0 left-0 h-[5px] w-[36px] rounded-full bg-gradient-to-r from-primary to-transparent" />
                    </h3>
                    <div className="flex-1 mx-4 pb-4">
                        <InputCard
                            onSubmit={submitBill}
                            data={searchBillById(selectId)}
                            edit={selectId !== null}
                            className="h-full"
                            full
                            transition
                            autofocus
                        />
                    </div>

                </div>
            </div>
        </>

    )
}