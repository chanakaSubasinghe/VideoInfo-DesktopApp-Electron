// requiring modules
const electron = require('electron');
const ffmpeg = require('fluent-ffmpeg');

// defining electron application and other objects
const { app, BrowserWindow, ipcMain } = electron;

// defining windows
let mainWindow;

// create main window when our application is ready
app.on('ready', () => {
    // create new browser window
    mainWindow = new BrowserWindow({
        webPreferences: {
            nodeIntegration: true
        }
    });
    // loading html file -- __dirname is global variable of node and its provide current working directory
    mainWindow.loadURL(`file://${__dirname}/index.html`); // we can enter web url as well.
});

// receive the message from mainWindow
ipcMain.on('video:submit', (event, path) => {
    ffmpeg.ffprobe(path, (err, metadata) => {
        mainWindow.webContents.send('video:duration', metadata.format.duration);
    });
});


