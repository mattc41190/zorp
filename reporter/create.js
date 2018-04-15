const fs = require('fs')  
const path = require('path')
const pug = require('pug')
const report = require('../report.json')

const generate = pug.compileFile(path.join(__dirname, './report.pug'))

const html = generate(report)

fs.writeFileSync(path.join(__dirname, './index.html'), html)
