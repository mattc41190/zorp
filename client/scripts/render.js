const ipc = require('electron').ipcRenderer
// Scripts are relative to their html file. Dislike.
const createChart = require('../scripts/create-chart')
const createList = require('../scripts/create-list')
const createTable = require('../scripts/create-table')

document.querySelectorAll('.orphan').forEach(el => {
  el.addEventListener('click', e => console.log(e.target))
})

document.querySelectorAll('.untracked').forEach(el => {
  el.addEventListener('click', e => ipc.send('add-tags', {_path: e.target.innerHTML}))
})

document.querySelectorAll('.tracked').forEach(el => {
  el.addEventListener('click', e => console.log(e.target))
})

setInterval(function () {
  ipc.send('refresh')
}, 5000)

ipc.on('report', (event, report) => {
  const ctx = document.querySelector('.chart').getContext('2d')
  createChart(report, ctx)
  createTable(document.querySelector('.tracked'), 'Tracked Projects', report.trackedProjects)
  createTable(document.querySelector('.untracked'), 'Untracked Projects', report.untrackedProjects)
})