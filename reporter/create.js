const fs = require('fs')  
const path = require('path')
const pug = require('pug')
const report = require('./report.json')
const potential = (report['untrackedProjects']['count'] + report['trackedProjects']['count']) * 100 

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
      break
    case score >= 80:
      return 'B'
      break
    case score >= 70:
      return 'C'
      break
    default:
      return 'F'
  }
}

report['potentialScore'] = potential
report['grade'] = getGrade(potential, report['score'])
report['letterGrade'] = getLetterGrade(report['score'])

const generate = pug.compileFile(path.join(__dirname, './report.pug'))

const html = generate(report)

fs.writeFileSync(path.join(__dirname, './index.html'), html)
