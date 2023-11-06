import { nanoid } from "nanoid";
import { createContext, useContext, useEffect, useReducer } from "react"

import { BillType, billdataReducer } from "./reducer";
import { BillActions } from "./actions";
import { BillIpc } from "./ipc";


const testData = [
    {
        id: nanoid(),
        datetime: '',
        big_type: '',
        type: '',
        count: 0,
        ledger: '',
        note: '',
        options: []
    }
]

const dataContext = createContext<[BillType, ({ type, payload }: BillActions) => void] | [any, any]>([null, null]);

export function useBilldata(): [BillType[], ({ type, payload }: BillActions) => void] {

    return [useContext(dataContext)[0], useContext(dataContext)[1]];
}

export default function DataProvider({ children }: { children: any }) {

    const [billdata, dispatchBilldata] = useReducer(billdataReducer, testData);

    useEffect(() => {
        BillIpc.get().then((res: any) => {
            dispatchBilldata({ type: 'INIT', payload: res })
        })
    }, [])

    return (
        <dataContext.Provider
            value={[billdata, dispatchBilldata]}
        >
            {children}
        </dataContext.Provider>
    )
}
