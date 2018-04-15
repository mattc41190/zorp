const fs = require('fs')
const path = require('path')

const DIR = '/Users/mattcale/Desktop/Development'

const getDirs = function getDirs(dir, category) {
  // Initialize Return Value
  const data = {}
  
  // Get Sub-Topics
  const primaries = fs.readdirSync(dir)
    .filter(file => isDir(dir, file) && !file.startsWith('.'))
    .map(file => path.join(dir, file))

  // Get Orphans
  const orphans = fs.readdirSync(dir)
    .filter(file => !primaries.includes(`${dir}/${file}`) && !file.startsWith('.'))
    .map(file => path.join(dir, file))
  
  data['orphans'] = orphans

  // Get Children of Each Sub-Topic And Categorize Them
  primaries.forEach((primary) => {
    const children = fs.readdirSync(primary)
    const title = primary.split('/').pop()
    children.forEach(child => {
      if (isDir(primary, child)) {
        data[title] = data[title] || {}
        data[title]['dirs'] = data[title]['dirs'] || []
        data[title]['dirs'].push({title: child, filePath: path.join(primary, child), isTagged: isTagged(primary, child)})
      } else if (isFile(primary, child)) {
        data[title] = data[title] || {}
        data[title]['files'] = data[title]['files'] || []
        data[title]['files'].push({title: child, filePath: path.join(primary, child)})
      } else {
        console.error(`Item at ${child} is neither file or directory`)
      }
    })
  })
  
  // console.log(JSON.stringify(data, null, '\t'));
  return data
}

// Safely Confirm File is a Dir
const isDir = function isDir(dir, file = '') {
  try {
    return fs.statSync(path.join(dir, file)).isDirectory()
  } catch (e) {
    console.log(e);
  }
}

// Safely Confirm File is a File
const isFile = function isFile(dir, file = '') {
  try {
    return fs.statSync(path.join(dir, file)).isFile()
  } catch (e) {
    console.log(e);
  }
}

// Check Tag Status Of Child
const isTagged = function isTagged(dir, file = '') {
  const files = fs.readdirSync(path.join(dir, file))
  if (files.includes('.tags')) {
    return true
  }
  return false
}

// TEST
getDirs(DIR, 'development')


module.exports = getDirs