import { nanoid } from "nanoid";
import { createContext, useContext, useReducer } from "react"

import { BillType, billdataReducer } from "./reducer";
import { BillActions } from "./actions";



const testData = [
    {
        id: nanoid(),
        datetime: '2023-10-23 18:00:00',
        bigType: '餐饮',
        type: '小吃',
        out: true,
        count: 648,
        ledger: '默认账本',
        note: '吃了勾式',
        options: []
    },
    {
        id: nanoid(),
        datetime: '2023-10-23 18:10:00',
        bigType: '餐饮',
        type: '小吃',
        out: true,
        count: 648,
        ledger: '默认账本',
        note: '吃了勾式',
        options: []
    },
    {
        id: nanoid(),
        datetime: '2023-10-23 18:40:00',
        bigType: '餐饮',
        type: '小吃',
        out: true,
        count: 648,
        ledger: '默认账本',
        note: '吃了式',
        options: ['已报销']
    }
]

const dataContext = createContext<[BillType, ({ type, payload }: BillActions) => void] | [any, any]>([null, null]);

export function useBilldata(): [BillType[], ({ type, payload }: BillActions) => void] {

    return [useContext(dataContext)[0], useContext(dataContext)[1]];
}

export default function DataProvider({ children }: { children: any }) {

    const [billdata, dispatchBilldata] = useReducer(billdataReducer, initialBilldata());


    return (
        <dataContext.Provider
            value={[billdata, dispatchBilldata]}
        >
            {children}
        </dataContext.Provider>
    )
}

function initialBilldata() {
    return testData;
}