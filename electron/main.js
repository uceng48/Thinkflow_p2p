const { app, BrowserWindow } = require('electron');
const path = require('path');

function createWindow() {
    const win = new BrowserWindow({
        width: 900,
        height: 700,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            nodeIntegration: false,
            contextIsolation: true
        },
        icon: path.join(__dirname, 'build/icon.ico') // opsional
    });

    // Muat index.html dengan mode=server
    win.loadFile(path.join(__dirname, '../src/index.html'), { query: { mode: 'server' } });

    // Hapus menu bar untuk tampilan lebih bersih
    win.setMenuBarVisibility(false);

    // DevTools (komentar jika production)
    // win.webContents.openDevTools();
}

app.whenReady().then(() => {
    createWindow();

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) createWindow();
    });
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit();
});
