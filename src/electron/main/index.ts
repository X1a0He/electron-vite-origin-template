import path from 'path';
import {app, BrowserWindow} from 'electron';
const isDev = process.env.npm_lifecycle_event === "start";
function createWindow() {
    // Create the browser window.
    const mainWindow = new BrowserWindow({
        width: 1000,
        height: 900,
        webPreferences: {
            preload: path.join(__dirname, '../preload/index.js'),
        },
    });

    if (isDev) {
        //这里的5173是yarn dev跑出来之后的地址
        //url is the `yarn dev` address
        mainWindow.loadURL(`http://localhost:5173`);// Open the DevTools.
        mainWindow.webContents.openDevTools();
    } else {
        mainWindow.loadFile(path.join(__dirname, '../../index.html'));
    }
}

app.whenReady().then(() => {
    createWindow()
    app.on('activate', function () {
        if (BrowserWindow.getAllWindows().length === 0) createWindow()
    })
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});