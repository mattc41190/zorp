const ipc = require('electron').ipcRenderer

const refreshBtn = document.getElementById('refresh')

refreshBtn.addEventListener('click', event => {
  console.log('Send signal to refresh');
  ipc.send('refresh')
}) 