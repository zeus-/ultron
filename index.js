const electron = require('electron');
const path = require('path');
const { app, BrowserWindow, Menu, ipcMain, Tray } = electron;

let mainWindow;



app.on('ready', () => {
  console.log('I am Electron!')

  // Open main window
  mainWindow = new BrowserWindow({ frame: true });

  // Load what?
  // mainWindow.loadURL('http://www.wishpond.com/login');
  mainWindow.loadURL(`file://${__dirname}/templates/main.html`);

  // Make your own menu
  const mainMenu = Menu.buildFromTemplate(menuTemplate);
  Menu.setApplicationMenu(mainMenu);

  createTrayApp()

  // Can you quit me?
});



const menuTemplate = [
  {
    label: 'File',
    submenu: [
      {
        label: 'Quit',
        accelerator: '',
        click() { console.log('I am Electron! Ha ha ha! You cant quit me!'); }
      },
      {
        label: 'Open a small window',
        click() { openSmallWindow('new'); }
      },
      {
        label: 'Clear',
        click() { mainWindow.webContents.send('command:clearAll'); }
      }
    ]
  }
];



let smallWindow;

function openSmallWindow(template) {
  smallWindow = new BrowserWindow({
    width: 300,
    height: 150,
    title: `${template}`
  });
  smallWindow.loadURL(`file://${__dirname}/templates/${template}.html`);
  smallWindow.on('closed', () => smallWindow = null);
}



//// For Apple eyes only
if (process.platform === 'darwin') {
  menuTemplate.unshift({
    submenu: [
      {
        label: 'About',
        click() { openSmallWindow('about'); }
      }
    ]
  })
}



//// Devtools shouldn't be visible on production
if (process.env.NODE_ENV !== 'production') {
  menuTemplate.push({
    label: 'View',
    submenu: [
      { role: 'reload' },
      {
        label: 'Toggle Developer Tools',
        accelerator: process.platform === 'darwin' ? 'Command+Alt+J' : 'Ctrl+Shift+J',
        click(item, focusedWindow) {
          focusedWindow.toggleDevTools();
        }
      }
    ]
  });
}



////
//// I didn't have a better idea of what to build...
////

const shell = require('shelljs');

//// Run `which node` or `which nodejs` to check that this path is correct for you
shell.config.execPath = '/usr/local/bin/node';

ipcMain.on('command:execute', (event, command) => {
  let output = shell.exec(command).stdout

  mainWindow.webContents.send('command:executed', output);
});


function createTrayApp() {
  let trayWindow = new BrowserWindow({
    frame: false,
    resizable: false,
    show: false
  });
  trayWindow.loadURL(`file://${__dirname}/templates/tray.html`);
  tray = new Tray(path.join(__dirname, `/icon.png`), trayWindow);
  trayWindow.setBounds({ x: 1100, y: 0, width: 300, height: 200 });
  tray.on('click', () => {
    if (trayWindow.isVisible()) {
      trayWindow.hide();
    } else {
      trayWindow.show();
    }
  })
}
