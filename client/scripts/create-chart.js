const Chart = require('chart.js').Chart

const createChart = function createChart(report, ctx) {
  return new Chart(ctx, { // eslint-disable-line 
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
      animation: false,
      legend: {
        labels: {
          fontColor: 'white'
        }
      }
    }
  })
}

module.exports = createChart