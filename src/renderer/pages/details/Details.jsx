import { useEffect, useMemo, useState } from "react"

import MainHeader from "../../components/mainHeader/MainHeader"
import DetailsCard from "../../components/card/detailsCard"
import DropdownSelector, { DropdownCheckSelector } from "../../components/selector/dropdown"
import InputCard from "../../components/card/inputCard"

import { ScrollArea } from "../../components/ui/scrollarea"
import { Button } from "../../components/ui/button"

import { useBilldata } from "../../store/provider/data-provider"

import { ListPlus, X, Book, Plus, Filter } from "lucide-react"

import { cn, resortToGroupByDatetime } from "../../lib/utils"
import dayjs from "dayjs"
import LedgerSelector from "../../components/selector/ledger"



export default function DetailsPage() {

    const [sidebarOpen, setSidebarOpen] = useState(false)
    const [billdata, dispatchBilldata] = useBilldata()

    const [selectId, setSelectId] = useState(null)
    const [typeFilter, setTypeFilter] = useState([])


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
    const handleChangeFilter = (value, check) => {
        if (check) {
            setTypeFilter(prev => [...prev, value])
        } else {
            setTypeFilter(prev => prev.filter(f => f !== value))
        }
    }

    const renderBillData = useMemo(() => {
        const sortedBill = resortToGroupByDatetime(billdata);
        let dom = [];

        sortedBill.forEach((value, key) => {
            let billsymbol = false

            const d = (
                <div key={key} className="flex flex-col mb-3">
                    <p key={key} className=" ml-5 mb-1 text-zinc-700 dark:text-zinc-400 text-sm font-semibold">{dayjs(key).format('M月D日')}</p>
                    {value.filter(bill => {
                        if (typeFilter.find(filter => bill.big_type === filter)) {
                            billsymbol = true
                            return true
                        }
                    }).map(bill => (
                        <DetailsCard
                            key={bill.id}
                            onClick={() => handleSelectBill(bill.id)} {...bill}
                            className="mb-2 mx-3 pr-3 bg-white dark:bg-zinc-700/60 transition-shadow hover:shadow"
                        />
                    ))}
                </div>
            )

            if (billsymbol) dom.push(d)
        })

        return dom
    }, [billdata, typeFilter])


    const typelist = useMemo(() => {
        let typeList = {}

        billdata.forEach(bill => {
            if (Object.keys(typeList).find(k => k === bill.big_type)) {
                if (!typeList[bill.big_type].find(t => t === bill.type)) {
                    typeList[bill.big_type] = [...typeList[bill.big_type], bill.type]
                }
            } else {
                typeList[bill.big_type] = [bill.type]
            }

        })

        return typeList

    }, [billdata])

    useEffect(() => {
        setTypeFilter(Object.keys(typelist))
    }, [])


    return (
        <>
            <div className="flex-1 flex flex-col max-h-full overflow-x-hidden select-none">
                <MainHeader title="流水明细" className=' ml-2'>
                    <LedgerSelector />
                    <DropdownCheckSelector
                        icon={<Filter className="w-5 h-5 mr-1 text-zinc-600 dark:text-zinc-50" />}
                        value={'筛选'}
                        check={typeFilter}
                        valuesOption={Object.keys(typelist)}
                        onCheckedChange={handleChangeFilter}
                    />
                    {!sidebarOpen && <Button variant='outline' className="px-2 pr-3 h-8 mr-2" onClick={handleNewBill}><Plus className="w-5 h-5 text-zinc-600 dark:text-zinc-50 mr-1 " />新增</Button>}
                </MainHeader>
                <ScrollArea className={cn(" pt-2 flex-1")}>
                    {renderBillData}
                </ScrollArea>
            </div>
            <div className={cn("h-full w-[356px] p-3 pb-4 pt-[48px] overflow-hidden transition-all", !sidebarOpen && "w-0 px-0")}>
                <div className="dark:bg-zinc-800 min-w-[332px] w-[332px] h-full shadow-xl rounded-lg flex flex-col overflow-hidden">
                    <header className=" bg-[rgb(241,243,244)] dark:bg-zinc-700 dark:border-zinc-800 h-[36px] border-t rounded-t-lg border-white flex flex-row items-center justify-between px-4">
                        <button onClick={handleNewBill} className="outling-none bg-transparent h-[28px] w-[28px] rounded-full hover:bg-zinc-200 dark:hover:bg-zinc-600"><ListPlus className="w-5 h-5 mx-auto text-zinc-500 dark:text-zinc-300" /></button>
                        <button onClick={() => setSidebarOpen(false)} className="outling-none bg-transparent h-[28px] w-[28px] rounded-full hover:bg-zinc-200 dark:hover:bg-zinc-600"><X className="w-5 h-5 mx-auto text-zinc-500 dark:text-zinc-300" /></button>
                    </header>
                    <h3 className=" relative text-xl font-semibold text-zinc-700 mx-3 pt-3 ml-[18px] select-none dark:text-zinc-200">
                        {selectId === null ? '新建账单' : '编辑账单'}
                        <span className=" absolute bottom-0 left-0 h-[5px] w-[36px] rounded-full bg-primary" />
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