const { app, BrowserWindow, ipcMain } = require('electron');
const { autoUpdater } = require('electron-updater')
const { SerialPort } = require('serialport');
const os = require('os');
const path = require('path');

/*require('electron-reload')(__dirname, {
    electron: path.join(__dirname, 'node_modules/.bin/electron.cmd')
});*/

let win;
autoUpdater.autoDownload = false;
function createWindow() {
  
    win = new BrowserWindow({
      width: 1000,
      height: 600,
      webPreferences: {
        nodeIntegration: true,
        contextIsolation: false
      },
    });

    mainWindow.loadURL(url.format({
        pathname: path.join(__dirname, 'index.html'),
        protocol: 'file:',
        slashes: true
    }));
    win.on('closed', function () {
        win = null
    });

    //win.webContents.openDevTools();
    win.on('ready-to-show', () => {
        autoUpdater.checkForUpdatesAndNotify();
    });
}
  
app.whenReady().then(createWindow);


function getSerialPorts() {
    SerialPort.list().then(res => {
        console.log("enviou as portas")
        console.log(res);
        win.webContents.send("receiveSerialPort", res);
    });
}

function getUserInfo() {
    win.webContents.send("receiveUserInfo", os.userInfo());
    console.log(os.userInfo());
}

ipcMain.on("getSerialPort", async () => {
    getSerialPorts();
});

ipcMain.on("getUserInfo", () => {
    getUserInfo();
});


// inicia o download das atualizações
ipcMain.on('get-release', () => {
    autoUpdater.downloadUpdate();
});

//fecha a app para instalar as modificações
ipcMain.on('restart-app', () => {
    autoUpdater.quitAndInstall();
});

autoUpdater.on('update-available', () => {
    win.webContents.send('update-avaliable');
});

autoUpdater.on('download-progress', (info) => {
    win.webContents.send('download-progress', info.percent);
});

autoUpdater.on('update-downloaded', () => {
    win.webContents.send('update-downloaded');
});