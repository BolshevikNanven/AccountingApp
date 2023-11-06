import { BillType } from "./reducer";

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