import dayjs from "dayjs";
import { BillActions, LedgerActions } from "./actions";
import { BillIpc, LedgerIpc } from "./ipc";

export type BillType = {
    id: string,
    datetime: string,
    big_type: string,
    type: string,
    count: number,
    note: string,
    options: Array<any>,
    ledger_id: string,
}

export type LedgerType = {
    id: string,
    name: string,
    create_time: string,
    update_time: string,
    note: string,
    color: string,
}

export function billDataReducer(billdata: BillType[], action: BillActions) {

    const sortByDatetime = (data: BillType[]): BillType[] => {
        return data.sort((a: BillType, b: BillType): number => {
            if (dayjs(a.datetime).isBefore(b.datetime)) {
                return 1
            } else return -1
        })
    }

    switch (action.type) {
        case 'ADD': {
            BillIpc.add(action.payload, dayjs().format('YYYY-MM-DD HH:mm'));
            return sortByDatetime([action.payload, ...billdata])
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

export function ledgerDataReducer(ledgerData: LedgerType[], action: LedgerActions) {
    switch (action.type) {
        case 'ADD': {
            LedgerIpc.add(action.payload);
            return [...ledgerData, action.payload]
        }
        case 'EDIT': {
            LedgerIpc.edit(action.payload);
            return ledgerData.map(ledger => {
                if (ledger.id === action.payload.id) {
                    return action.payload;
                } else return ledger;
            });
        }
        case 'DELETE': {
            LedgerIpc.delete(action.payload);
            return ledgerData.filter(ledger => ledger.id !== action.payload);
        }
        case 'INIT': {
            return action.payload
        }
        default: return ledgerData;
    }
}