import { createContext, useContext, useEffect, useReducer } from "react";
import { useBilldata, useLedgerdata } from "./data-provider";
import { BillIpc, UserIpc } from "../ipc";

export type StateType = {
    selectedLedger?: string,
    theme?: string,
    chartRange?: string,
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
        const match = (ledgerData.filter(ledger => ledger.id === globalState.selectedLedger).length) !== 0

        if (!match && Object.keys(globalState).length > 0) {
            dispatchGlobalState({ ...globalState, selectedLedger: ledgerData[0].id })
        }

    }, [ledgerData?.length])

    useEffect(() => {
        if (globalState.selectedLedger) {
            BillIpc.get(globalState.selectedLedger).then((res: any) => {
                dispatchBilldata({ type: 'INIT', payload: res })
            })
        }

    }, [globalState.selectedLedger])

    useEffect(() => {
        if (Object.keys(globalState).length > 0) {
            UserIpc.set(globalState)
        }
    }, [globalState])

    useEffect(() => {
        UserIpc.get().then((res) => {
            dispatchGlobalState({ ...res })
        })

    }, [])


    return (
        <stateContext.Provider value={[globalState, dispatchGlobalState]}>
            {(Object.keys(globalState).length !== 0) && children}
        </stateContext.Provider>
    )
}

function globalStateReducer(globalState: StateType, newState: StateType) {
    return { ...globalState, ...newState }
}