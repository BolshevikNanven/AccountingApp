import { createContext, useContext, useEffect, useReducer } from "react"

import { BillType, LedgerType, billDataReducer, ledgerDataReducer } from "../reducer";
import { BillActions, LedgerActions } from "../actions";
import { BillIpc, LedgerIpc } from "../ipc";


const billContext = createContext<[BillType, ({ type, payload }: { type: BillActions, payload: BillType | any }) => void] | [any, any]>([null, null])
const ledgerContext = createContext<[LedgerType, ({ type, payload }: { type: LedgerActions, payload: LedgerType | any }) => void] | [any, any]>([null, null])

export function useBilldata(): [BillType[], ({ type, payload }: BillActions) => void] {

    return [useContext(billContext)[0], useContext(billContext)[1]];
}

export function useLedgerdata(): [LedgerType[], ({ type, payload }: LedgerActions) => void] {

    return [useContext(ledgerContext)[0], useContext(ledgerContext)[1]];
}

export default function DataProvider({ children }: { children: any }) {

    const [billdata, dispatchBilldata] = useReducer(billDataReducer, []);
    const [ledgerdata, dispatchLedgerdata] = useReducer(ledgerDataReducer, [])

    useEffect(() => {
        BillIpc.get().then((res: any) => {
            dispatchBilldata({ type: 'INIT', payload: res })
        })
        LedgerIpc.get().then((res: any) => {
            dispatchLedgerdata({ type: 'INIT', payload: res })
        })

    }, [])

    return (
        <billContext.Provider value={[billdata, dispatchBilldata]}>
            <ledgerContext.Provider value={[ledgerdata, dispatchLedgerdata]}>
                {children}
            </ledgerContext.Provider>
        </billContext.Provider>
    )
}
