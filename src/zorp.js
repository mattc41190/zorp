const getDirs = require('./get-dirs')
const getScore = require('./get-score')
const createReport = require('./reporter/create')

const getPotential = (tracked, untracked) => (tracked + untracked) * 100

const getGrade = (potential, score) => {
  if (score <= 0) {
    return 0
  }
  return parseInt((score / potential) * 100)
}

const getLetterGrade = (score) => {
  switch (score) {
    case score >= 90:
      return 'A'
    case score >= 80:
      return 'B'
    case score >= 70:
      return 'C'
    default:
      return 'F'
  }
}

const init = (categories, create) => {
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
    dirs[category].push(getDirs(categories[category].filePath, category))
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
                report.score += getScore(dir.filePath, 'tracked', dir.category, dir.primary, categories[dir.category].rules)
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

  const potential = getPotential(report['untrackedProjects']['count'], report['trackedProjects']['count'])
  report['potentialScore'] = potential
  report['grade'] = getGrade(potential, report['score'])
  report['letterGrade'] = getLetterGrade(report['score'])

  if (create) { createReport(report) }

  return report
}

module.exports = init
