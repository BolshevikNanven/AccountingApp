import { BillActions } from "./actions";
import { BillIpc } from "./ipc";

export type BillType = {
    id: string,
    datetime: string,
    big_type: string,
    type: string,
    count: number,
    ledger: string,
    note: string,
    options: Array<any>,
}

export function billdataReducer(billdata: BillType[], action: BillActions) {
    switch (action.type) {
        case 'ADD': {
            BillIpc.add(action.payload);
            return [action.payload, ...billdata];
        }
        case 'EDIT': {
            BillIpc.edit(action.payload);
            return billdata.map(bill => {
                if (bill.id === action.payload.id) {
                    return action.payload;
                } else return bill;
            });
        }
        case 'DELETE': {
            BillIpc.delete(action.payload.id);
            return billdata.filter(bill => bill.id !== action.payload.id);
        }
        case 'INIT': {
            return action.payload;
        }
        default: return billdata;
    }
}