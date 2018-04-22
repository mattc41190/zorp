const fs = require('fs')
const path = require('path')
const pug = require('pug')

const getPotential = (tracked, untracked) => (tracked + untracked) * 100

const getGrade = (potential, score) => {
  if (score <= 0) {
    return 0
  }
  return (score / potential) * 100
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

const createReport = (report) => {
  const potential = getPotential(report['untrackedProjects']['count'], report['trackedProjects']['count'])
  report['potentialScore'] = potential
  report['grade'] = getGrade(potential, report['score'])
  report['letterGrade'] = getLetterGrade(report['score'])
  const html = pug.renderFile(path.join(__dirname, './report.pug'), report)
  fs.writeFileSync(path.join(__dirname, './index.html'), html)
}

module.exports = createReport
