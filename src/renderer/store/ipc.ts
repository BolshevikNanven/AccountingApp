import { BillType } from "./reducer";

export class BillIpc {
    static add(payload: BillType) {
        window.electron.ipcHandleInvoke('Bill', 'add', payload);
    }
    static async get(id?: string): Promise<BillType[] | undefined> {
        let resp: Array<any> = [];
        if (!id) {
            await window.electron.ipcHandleInvoke('Bill', 'getAll').then((res: any) => resp = res);
        } else {
            await window.electron.ipcHandleInvoke('Bill', 'getById', id).then((res: any) => resp = res);
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