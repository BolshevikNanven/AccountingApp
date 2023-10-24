import { nanoid } from "nanoid";
import { createContext, useContext, useReducer } from "react"


const dataContext = createContext(null);
const settingContext = createContext(null);


const testData = [
    {
        id: nanoid(),
        datetime: '2023-10-23 18:00:00',
        bigType: '餐饮',
        type: '小吃',
        count: -648,
        ledger: '默认账本',
        note: '吃了勾式',
        options: []
    },
    {
        id: nanoid(),
        datetime: '2023-10-23 18:10:00',
        bigType: '餐饮',
        type: '小吃',
        count: -648,
        ledger: '默认账本',
        note: '吃了勾式',
        options: []
    },
    {
        id: nanoid(),
        datetime: '2023-10-23 18:40:00',
        bigType: '餐饮',
        type: '小吃',
        count: -648,
        ledger: '默认账本',
        note: '吃了式',
        options: ['已报销']
    }
]

export function useBilldata() {
    return [useContext(dataContext)[0], useContext(dataContext)[1]];
}

export default function DataProvider({ children }) {


    const [billdata, dispatchBilldata] = useReducer(billdataReducer, initialBilldata());

    return (
        <dataContext.Provider value={[billdata, dispatchBilldata]}>
            {children}
        </dataContext.Provider>
    )
}

function billdataReducer(billdata, action) {
    switch (action.type) {
        case 'ADD':

    }
}
function initialBilldata() {
    return testData;
}