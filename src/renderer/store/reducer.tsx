import { BillActions } from "./actions";

export type BillType = {
    id: string,
    datetime: string,
    bigType: string,
    type: string,
    count: number,
    ledger: string,
    note: string,
    options: Array<any>,
}

export function billdataReducer(billdata: BillType[], action: BillActions) {
    switch (action.type) {
        case 'ADD': {
            return [action.payload, ...billdata];
        }
        case 'EDIT': {
            return billdata.map(bill => {
                if (bill.id === action.payload.id) {
                    return action.payload;
                } else return bill;
            });
        }
        case 'DELETE': {
            return billdata.filter(bill => bill.id !== action.payload.id);
        }
        default:
            return billdata;
    }
}