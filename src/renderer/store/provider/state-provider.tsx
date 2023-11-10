import { createContext, useContext, useEffect, useReducer } from "react";
import { useBilldata, useLedgerdata } from "./data-provider";
import { BillIpc } from "../ipc";

type StateType = {
    selectedLedger?: string,

}

const stateContext = createContext<[StateType, (newState: StateType) => void] | [any, any]>([null, null])

export function useGlobalState(): [StateType, (newState: StateType) => void] {
    return [useContext(stateContext)[0], useContext(stateContext)[1]]
}

export function StateProvider({ children }: any) {

    const [globalState, dispatchGlobalState] = useReducer(globalStateReducer, {})

    const [ledgerData, dispatchLedgerdata] = useLedgerdata()
    const [billdata, dispatchBilldata] = useBilldata()

    useEffect(() => {
        if (ledgerData.length > 0) {
            dispatchGlobalState({ selectedLedger: ledgerData[0].id })
        }

    }, [ledgerData.length])

    useEffect(() => {
        if (globalState.selectedLedger) {
            BillIpc.get(globalState.selectedLedger).then((res: any) => {
                dispatchBilldata({ type: 'INIT', payload: res })
            })
        }

    }, [globalState.selectedLedger])

    return (
        <stateContext.Provider value={[globalState, dispatchGlobalState]}>
            {children}
        </stateContext.Provider>
    )
}

function globalStateReducer(globalState: StateType, newState: StateType) {
    return { ...globalState, ...newState }
}