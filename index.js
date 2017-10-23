const electron = require('electron');
const { app, BrowserWindow, Menu, ipcMain } = electron;

let mainWindow;



app.on('ready', () => {
  console.log('I am Electron!')

  // Open main window
  // mainWindow = new BrowserWindow({ frame: false });

  // Load what?
  // mainWindow.loadURL('http://www.wishpond.com/login');
  // mainWindow.loadURL(`file://${__dirname}/templates/main.html`);

  // Make your own menu
  // const mainMenu = Menu.buildFromTemplate(menuTemplate);
  // Menu.setApplicationMenu(mainMenu);

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
        // label: 'Open a small window',
        // click() { openSmallWindow('new'); }
      },
      {
        // label: 'Clear',
        // click() { mainWindow.webContents.send('command:clearAll'); }
      }
    ]
  }
];



let smallWindow;

// function openSmallWindow(template) {
//   smallWindow = new BrowserWindow({
//     width: 300,
//     height: 200,
//     title: `${template}`
//   });
//   smallWindow.loadURL(`file://${__dirname}/templates/${template}.html`);
//   smallWindow.on('closed', () => smallWindow = null);
// }



//// For Apple eyes only
// if (process.platform === 'darwin') {
//   menuTemplate.unshift({
//     submenu: [
//       {
//         label: 'About',
//         click() { openSmallWindow('about'); }
//       }
//     ]
//   });
// }



//// Devtools shouldn't be visible on production
// if (process.env.NODE_ENV !== 'production') {
//   menuTemplate.push({
//     label: 'View',
//     submenu: [
//       { role: 'reload' },
//       {
//         label: 'Toggle Developer Tools',
//         accelerator: process.platform === 'darwin' ? 'Command+Alt+J' : 'Ctrl+Shift+J',
//         click(item, focusedWindow) {
//           focusedWindow.toggleDevTools();
//         }
//       }
//     ]
//   });
// }



////
//// I didn't have a better idea of what to build...
////

const shell = require('shelljs');

//// Run `which node` or `which nodejs` to check that this path is correct for you
shell.config.execPath = '/usr/local/bin/node';

// ipcMain.on('command:execute', (event, command) => {
//   let output = shell.exec(command).stdout

//   mainWindow.webContents.send('command:executed', output);
// });

