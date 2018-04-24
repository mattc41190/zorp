const ipc = require('electron').ipcRenderer

setInterval(function() {
  ipc.send('refresh')
}, 5000)

ipc.on('report', (event, report) => {
  const ctx = document.querySelector('.chart').getContext('2d')
  new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: [
        'Orphans', 'Untracked', 'Tracked'
      ],
      datasets: [
        {
          borderColor: 'black',
          label: 'Desktop Health Report',
          backgroundColor: [
            '#f5c6cb', '#ffeeba', '#c3e6cb'
          ],
          data: [report.orphans.count, report.untrackedProjects.count, report.trackedProjects.count]
        }
      ]
    },
    options: {
      legend: {
        labels: {
          fontColor: 'white'
        }
      }
    }
  })
})
