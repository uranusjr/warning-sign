const {app, BrowserWindow} = require('electron')

let win = null

function createWindow () {
  win = new BrowserWindow({ width: 800, height: 600 })
  win.loadFile('src/index.html')
}

app.on('ready', createWindow)
app.on('window-all-closed', app.quit)
