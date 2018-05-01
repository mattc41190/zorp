const fs = require('fs')
const path = require('path')
const pug = require('pug')

const createReport = (report) => {
  const html = pug.renderFile(path.join(__dirname, './report.pug'), report)
  fs.writeFileSync(path.join(global._root, `client`, 'index.html'), html)
}

module.exports = createReport
