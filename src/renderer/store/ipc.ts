import { BillType, LedgerType } from "./reducer";

export class BillIpc {
    static add(payload: BillType, time: string) {
        window.electron.ipcHandleInvoke('Bill', 'add', { ...payload, nowtime: time });
    }
    static async get(id?: string): Promise<BillType[] | undefined> {
        let resp: Array<any> = [];
        if (!id) {
            await window.electron.ipcHandleInvoke('Bill', 'getAll').then((res: any) => resp = res);
        } else {
            await window.electron.ipcHandleInvoke('Bill', 'getByLedger', id).then((res: any) => resp = res);
        }

        return resp;
    }
    static async edit(bill: BillType) {
        await window.electron.ipcHandleInvoke('Bill', 'edit', bill);
    }
    static async delete(id: string) {
        await window.electron.ipcHandleInvoke('Bill', 'delete', id);
    }
}

export class LedgerIpc {
    static add(payload: LedgerType) {
        window.electron.ipcHandleInvoke('Ledger', 'add', payload);
    }
    static async get(): Promise<LedgerType[] | undefined> {
        let resp: Array<any> = [];

        await window.electron.ipcHandleInvoke('Ledger', 'getAll').then((res: any) => resp = res);

        return resp;
    }
    static async edit(bill: LedgerType) {
        await window.electron.ipcHandleInvoke('Ledger', 'edit', bill);
    }
    static async delete(id: string) {
        await window.electron.ipcHandleInvoke('Ledger', 'delete', id);
    }
}