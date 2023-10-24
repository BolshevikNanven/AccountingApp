import { BillType } from "./reducer";

export type BillActions = ADD | EDIT | DELETE;

type ADD = {
    type: 'ADD',
    payload: BillType,
}
type EDIT = {
    type: 'EDIT',
    payload: BillType,
}
type DELETE = {
    type: 'DELETE',
    payload: BillType,
}
