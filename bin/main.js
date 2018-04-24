const {app, BrowserWindow, ipcMain} = require('electron')
const isEqual = require('lodash.isequal')
const path = require('path')
const url = require('url')

const getReport = (initialLoad) => {
  global._root = path.resolve(__dirname, '..')
  return require('../src/zorp')(require('../conf/categories'), initialLoad)
}

let win
let report

function createWindow () {
  report = getReport(true)
  win = new BrowserWindow({
    width: 400,
    height: 650,
    titleBarStyle: 'hidden',
    transparent: true,
    frame: false,
    toolbar: false
  })

  win.loadURL(url.format({
    pathname: path.join(global._root, './client/index.html'),
    protocol: 'file:',
    slashes: true
  }))

  win.webContents.on('did-finish-load', () => {
    win.webContents.send('report', report)
  })

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
  const currentReport = getReport(true)

  if (!isEqual(currentReport, report)) {
    win.loadURL(url.format({
      pathname: path.join(global._root, './client/index.html'),
      protocol: 'file:',
      slashes: true
    }))

    win.webContents.on('did-finish-load', () => {
      win.webContents.send('report', report)
    })

    report = currentReport
  }
})
