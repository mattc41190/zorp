const {app, BrowserWindow, ipcMain} = require('electron')
const path = require('path')
const url = require('url')

// create report html file
const getReport = (initialLoad) => {
  global._root = path.resolve(__dirname)
  return require('../app/zorp')(require('../conf/categories'), initialLoad)
}

let win

function createWindow () {
  let report = getReport(true)
  // Create the browser window.
  win = new BrowserWindow({width: 800, height: 600})

  // and load the index.html of the app.
  win.loadURL(url.format({
    pathname: path.join(__dirname, './index.html'),
    protocol: 'file:',
    slashes: true
  }))

  win.on('closed', () => {
    win = null
  })
}

app.on('ready', createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (win === null) {
    createWindow()
  }
})

ipcMain.on('refresh', () => {
  const report = getReport(true)
  win.loadURL(url.format({
    pathname: path.join(__dirname, './index.html'),
    protocol: 'file:',
    slashes: true
  }))
})
