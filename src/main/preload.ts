// Disable no-unused-vars, broken for spread args
/* eslint no-unused-vars: off */
import { contextBridge, ipcRenderer, IpcRendererEvent } from 'electron';

export type Channels = 'windowButton' | 'openExplorer' | 'openExternal'

type InvokeChannelActionsMap = {
  Bill: 'add' | 'edit' | 'delete' | 'getAll' | 'getByLedger',
  Ledger: 'add' | 'edit' | 'delete' | 'getAll',
  User: 'get' | 'set',
  Data: 'export' | 'getDatabaseFile',
}

type InvokeChannels = keyof InvokeChannelActionsMap;


const electronHandler = {
  ipcRenderer: {
    sendMessage(channel: Channels, ...args: unknown[]) {
      ipcRenderer.send(channel, ...args);
    },
    on(channel: Channels, func: (...args: unknown[]) => void) {
      const subscription = (_event: IpcRendererEvent, ...args: unknown[]) =>
        func(...args);
      ipcRenderer.on(channel, subscription);

      return () => {
        ipcRenderer.removeListener(channel, subscription);
      };
    },
    once(channel: Channels, func: (...args: unknown[]) => void) {
      ipcRenderer.once(channel, (_event: IpcRendererEvent, ...args: unknown[]) => func(...args));
    },
  },
  ipcHandleInvoke: async <T extends InvokeChannels>(channel: T, action: InvokeChannelActionsMap[T], payload?: any): Promise<any> => {
    return new Promise((resolve) => {
      ipcRenderer.invoke(channel, action, payload).then((res: any) => resolve(res))

    });
  }
};

contextBridge.exposeInMainWorld('electron', electronHandler);

export type ElectronHandler = typeof electronHandler;
