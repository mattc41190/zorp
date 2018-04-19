const fs = require('fs')
const path = require('path')
const categories = require('./app/conf/categories.js')
const getDirs = require('./app/get-dirs.js')
const getScore = require('./app/get-score.js')

const init = (categories) => {
  const report = {
    count: 0,
    score: 0,
    orphans: {
      files: [],
      count: 0
    },
    untrackedProjects: {
      files: [],
      count: 0
    },
    trackedProjects: {
      files: [],
      count: 0
    }
  }

  // Get Data For Dirs
  let dirs = {}
  for (const category in categories) {
    dirs[category] = []
    dirs[category].push(getDirs(categories[category], category))
  }

  // See Which Directories Have Orphans 
  Object.keys(dirs).forEach(dir => {
    dirs[dir].forEach(item => {
      item['orphans'].forEach(orphan => {
        report['orphans']['files'].push(orphan)
        report['orphans']['count'] += 1
        report.score += getScore(null, 'orphan', null, null)
        report.count++
      })

      // Categorize Un-"Directory"-ized files that belong to primaries as orphans
      Object.keys(item).forEach(primary => {
        if (primary !== 'orphans') {
          
          if (item[primary]['files']) {
            item[primary]['files'].forEach(primaryOrphan => {
              report['orphans']['files'].push(primaryOrphan.filePath)
              report['orphans']['count']++
              report.score += getScore(null, 'orphan', null, null)
              report.count++
            })
          }
          
          // Sort Tracked and Untracked Projects
          if (item[primary]['dirs']) {
            item[primary]['dirs'].forEach(dir => {
              if (dir.isTagged) {
                report['trackedProjects']['files'].push(dir)
                report['trackedProjects']['count']++
                report.score += getScore(dir.filePath, 'untracked', dir.category, dir.primary)
                report.count++

              } else {
                report['untrackedProjects']['files'].push(dir)
                report['untrackedProjects']['count']++
                report.score += getScore(dir.filePath, 'untracked', null, null)
                report.count++
              }
            })
          }
        }
      })
    })
  })

  fs.writeFileSync(`${path.join(__dirname, 'reporter', 'report.json')}`, JSON.stringify(report))
}

init(categories)