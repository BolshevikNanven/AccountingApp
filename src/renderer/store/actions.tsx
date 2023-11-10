import { BillType, LedgerType } from "./reducer";

export type BillActions =
    {
        type: 'ADD',
        payload: BillType,
    } |
    {
        type: 'EDIT',
        payload: BillType,
    } |
    {
        type: 'DELETE',
        payload: BillType,
    } |
    {
        type: 'INIT',
        payload: BillType[]
    };

export type LedgerActions =
    {
        type: 'ADD',
        payload: LedgerType,
    } |
    {
        type: 'DELETE',
        payload: string,
    } |
    {
        type: 'INIT',
        payload: LedgerType[],
    } |
    {
        type: 'EDIT',
        payload: LedgerType,
    }