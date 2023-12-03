/* eslint global-require: off, no-console: off, promise/always-return: off */

/**
 * This module executes inside of electron's main process. You can start
 * electron renderer process from here and communicate with the other processes
 * through IPC.
 *
 * When running `npm run build` or `npm run build:main`, this file is compiled to
 * `./src/main.js` using webpack. This gives us some performance wins.
 */
import path from 'path';
import { app, BrowserWindow, shell, ipcMain } from 'electron';
import { autoUpdater } from 'electron-updater';
import log from 'electron-log';
import { resolveHtmlPath } from './util';

import webpackPaths from '../../.erb/configs/webpack.paths'

import { SqlDatabase } from './db/db'
import { BillDbServe, LedgerDbServe, UserFileServe, DataFileServe } from './db/serve';

class AppUpdater {
  constructor() {
    autoUpdater.forceDevUpdateConfig = true
    autoUpdater.autoDownload = false
    autoUpdater.checkForUpdates().then((res) => console.log(res)).catch(err => console.log(err))
  }
}

let mainWindow = null;
const isDebug = process.env.NODE_ENV === 'development' || process.env.DEBUG_PROD === 'true';
const DATA_BASE_PATH = isDebug ? path.join(webpackPaths.appPath, 'sql') : path.join(app.getPath('userData'), 'data')

ipcMain.on('windowButton', async (event, arg) => {
  switch (arg) {
    case 'mini': {
      mainWindow?.minimize();
      break;
    }
    case 'scale': {
      if (mainWindow?.isMaximized()) {
        mainWindow?.unmaximize();
      } else {
        mainWindow?.maximize();
      }
      break;
    }
    case 'close': {
      mainWindow?.close();
      break;
    }
  }

});

ipcMain.on('openExplorer', async (_event, pathname) => {
  if (pathname === 'database') {
    shell.openPath(DATA_BASE_PATH)
  }
  else shell.openPath(pathname)
})
ipcMain.on('openExternal', async (_event, url) => {
  shell.openExternal(url)
})

if (process.env.NODE_ENV === 'production') {
  const sourceMapSupport = require('source-map-support');
  sourceMapSupport.install();
}




if (isDebug) {
  require('electron-debug')();
}

const createWindow = async () => {

  const RESOURCES_PATH = app.isPackaged
    ? path.join(process.resourcesPath, 'assets')
    : path.join(__dirname, '../../assets');

  const getAssetPath = (...paths) => {
    return path.join(RESOURCES_PATH, ...paths);
  };

  mainWindow = new BrowserWindow({
    show: false,
    width: 1078,
    height: 698,
    frame: false,
    icon: getAssetPath('icon.png'),
    webPreferences: {
      preload: app.isPackaged
        ? path.join(__dirname, 'preload.js')
        : path.join(__dirname, '../../.erb/dll/preload.js'),
    },
  });

  mainWindow.loadURL(resolveHtmlPath('index.html'));

  mainWindow.on('ready-to-show', () => {
    if (!mainWindow) {
      throw new Error('"mainWindow" is not defined');
    }
    if (process.env.START_MINIMIZED) {
      mainWindow.minimize();
    } else {
      mainWindow.show();
    }
  });

  mainWindow.on('closed', () => {
    mainWindow = null;
  });


  // Open urls in the user's browser
  mainWindow.webContents.setWindowOpenHandler((edata) => {
    shell.openExternal(edata.url);
    return { action: 'deny' };
  });

  // Remove this if your app does not use auto updates
  // eslint-disable-next-line
  // new AppUpdater();
};

/**
 * Add event listeners...
 */

app.on('window-all-closed', () => {
  // Respect the OSX convention of having the application in memory even
  // after all windows have been closed
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app
  .whenReady()
  .then(() => {
    createWindow();
    app.on('activate', () => {
      // On macOS it's common to re-create a window in the app when the
      // dock icon is clicked and there are no other windows open.
      if (mainWindow === null) createWindow();
    });

    const db = new SqlDatabase(DATA_BASE_PATH);

    ipcMain.handle('Bill', async (_event, action, payload) => {
      const dbServe = new BillDbServe(db);

      switch (action) {
        case 'getAll': return dbServe.getAll();
        case 'getByLedger': return dbServe.getByLedger(payload);
        case 'add': return dbServe.add(payload);
        case 'edit': return dbServe.edit(payload);
        case 'delete': return dbServe.delete(payload);
      }
    })

    ipcMain.handle('Ledger', async (_event, action, payload) => {
      const dbServe = new LedgerDbServe(db);

      switch (action) {
        case 'getAll': return dbServe.getAll();
        case 'add': return dbServe.add(payload);
        case 'edit': return dbServe.edit(payload);
        case 'delete': return dbServe.delete(payload);
      }
    })

    ipcMain.handle('User', async (_event, action, payload) => {
      switch (action) {
        case 'get': return UserFileServe.get()
        case 'set': return UserFileServe.set(payload)
      }
    })

    ipcMain.handle('Data', async (_event, action, payload) => {
      switch (action) {
        case 'export': return DataFileServe.exportData(payload.data, payload.pattern, payload.name)
        case 'getDatabaseFile': return DataFileServe.getDatabase(path.join(DATA_BASE_PATH, 'data.db'))
      }
    })

  })
  .catch(console.log);
