import { Plus } from "lucide-react";
import MainHeader from "../../components/mainHeader/MainHeader";
import { Button } from "../../components/ui/button";
import { useEffect, useState } from "react";

import { useBilldata, useLedgerdata } from "../../store/provider/data-provider";
import { useGlobalState } from "../../store/provider/state-provider";
import LedgerCard from "../../components/card/ledgerCard";
import { BillIpc } from "../../store/ipc";
import { nanoid } from "nanoid";
import dayjs from "dayjs";


export default function LedgerPage() {

    const [ledgerData, dispatchLedgerData] = useLedgerdata()
    const [globalState, dispatchGlobalStateData] = useGlobalState()

    const [allBillData, setAllBillData] = useState([])
    const [activeLedger, setActiveLedger] = useState('')

    useEffect(() => {
        BillIpc.get().then((res) => {
            setAllBillData(res)
        })
    }, [])

    const handleClickBook = (book) => {
        if (activeLedger === book) {
            setActiveLedger('')
        } else {
            setActiveLedger(book)
        }
    }

    const selectLedger = (id) => {
        if (id !== globalState.selectedLedger) {
            dispatchGlobalStateData({ selectedLedger: id })
        }

    }
    const changeLedgerName = (id, name) => {
        const newLedger = { ...ledgerData.filter(ledger => ledger.id === id)[0], name: name }
        dispatchLedgerData({ type: 'EDIT', payload: newLedger })
    }
    const changeLedgerColor = (id, color) => {
        const newLedger = { ...ledgerData.filter(ledger => ledger.id === id)[0], color: color }
        dispatchLedgerData({ type: 'EDIT', payload: newLedger })
    }
    const deleteLedger = (id) => {
        dispatchLedgerData({ type: 'DELETE', payload: id })
    }
    const addLedger = () => {
        dispatchLedgerData({
            type: 'ADD',
            payload: {
                id: nanoid(),
                name: '新建账本',
                create_time: dayjs().format('YYYY-MM-DD HH:mm'),
                update_time: dayjs().format('YYYY-MM-DD HH:mm'),
                note: '',
                color: '#fde68a',
            }
        })
    }


    const renderLedgerCard = () => {
        return ledgerData.map(ledger => (
            <LedgerCard
                key={ledger.id}
                ledger={ledger}
                onClick={handleClickBook}
                selectedLedger={globalState.selectedLedger}
                ledgerBill={allBillData.filter(bill => bill.ledger_id === ledger.id)}
                activeLedger={activeLedger}
                onSelectLedger={selectLedger}
                onChangeName={changeLedgerName}
                onChangeColor={changeLedgerColor}
                onDelete={deleteLedger}
            />
        ))
    }

    return (
        <div className="flex-1 flex flex-col h-full overflow-hidden px-3">
            <MainHeader title="账本">
                <Button onClick={addLedger} variant='outline' className="px-2 pr-3 h-8 mr-2" ><Plus className="w-5 h-5 text-zinc-600 mr-1 " />新建账本</Button>
            </MainHeader>
            <div className="flex flex-row flex-1 py-3 gap-4 flex-wrap">
                {renderLedgerCard()}
            </div>
        </div>
    )
}