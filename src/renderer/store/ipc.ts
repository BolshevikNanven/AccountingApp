import { StateType } from "./provider/state-provider";
import { BillType, LedgerType } from "./reducer";

export class BillIpc {
    static async add(payload: BillType, time: string) {
        await window.electron.ipcHandleInvoke('Bill', 'add', { ...payload, nowtime: time })
        return true
    }
    static async get(id?: string): Promise<BillType[] | undefined> {
        let resp: Array<any> = [];
        if (!id) {
            await window.electron.ipcHandleInvoke('Bill', 'getAll').then((res) => resp = res);
        } else {
            await window.electron.ipcHandleInvoke('Bill', 'getByLedger', id).then((res) => resp = res);
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
        return new Promise((resolve) => {
            window.electron.ipcHandleInvoke('Ledger', 'getAll').then((res) => resolve(res))
        })
    }
    static async edit(bill: LedgerType) {
        window.electron.ipcHandleInvoke('Ledger', 'edit', bill);
    }
    static async delete(id: string) {
        window.electron.ipcHandleInvoke('Ledger', 'delete', id);
    }
}

export class UserIpc {
    static get(): Promise<StateType | undefined> {
        return new Promise((resolve, reject) => {
            window.electron.ipcHandleInvoke('User', 'get').then((res) => resolve(res))
        })

    }
    static set(data: StateType) {
        window.electron.ipcHandleInvoke('User', 'set', data)
    }
}

export class DataIpc {
    static export(payload: { data: BillType, pattern: string, name: string }): Promise<string> {
        return window.electron.ipcHandleInvoke('Data', 'export', payload)
    }
}