const fs = require('fs')
const path = require('path')
const excludes = ['.git', 'node_modules']
const categories = require('./categories.js');
const primaries = {
  development: ['projects', 'learning', 'challenges']
}

let types = {
  files: [],
  taggedDirs: [],
  untaggedDirs: []
}

const init = (categories) => {
  let dirs
  for (const category in categories) {
    dirs = getDirs(categories[category], category, 0)
    // dirs.untaggedDirs = dirs.untaggedDirs.filter(dir => {
    //   let splitDir = dir.split(categories[category])
    //   console.log(splitDir.split('/'))
    //   if (splitDir.split('/')) {
    // 
    //   } else {
    //     return dir
    //   }
    // })
  }
  console.log(dirs);

}

const getDirs = (dir, category, depth) => {
  if (depth === 5) {
    return 'Maximum depth reached'
  }

  const files = fs.readdirSync(dir)
  for (const file in files) {

    if (files[file] == '.tags') {
      if (types.untaggedDirs.includes(dir)) {
        types.untaggedDirs.splice(types.untaggedDirs.indexOf(dir, 1))
      }
      types.taggedDirs.push(dir)
      break
    }

    let stats = fs.statSync(`${dir}/${files[file]}`)
    if (stats.isDirectory() && !excludes.includes(files[file])) {
      if (isChildOfPrimary(dir, category)) {
        types.untaggedDirs.push(`${dir}/${files[file]}`)
        console.log(`Child of Primary: ${dir}/${files[file]}`);
        return
      } else {
        if (types.untaggedDirs.includes(dir)) {
          types.untaggedDirs.pop()
        }
        types.untaggedDirs.push(`${dir}/${files[file]}`)
        getDirs(`${dir}/${files[file]}`, category, depth++)
      }
    }
  }

  return types
}

const isChildOfPrimary = (dir, category) => {
  let fullPrimaryPaths = createPrimaryPaths(category)
  if (fullPrimaryPaths.length < 1) {
    return false
  } else if (fullPrimaryPaths.includes(dir)) {
    return false
  }


  const splitChild = dir.split('/')
  console.log(primaries[category]);
  console.log(splitChild[splitChild.length - 1]);
  if (primaries[category].includes(splitChild[splitChild.length - 1])) {
    return true
  }
  return false
}

const createPrimaryPaths = (category) => {
  let fullPrimaryPaths = []
  for (const primary in primaries[category]) {
    fullPrimaryPaths.push(`${categories[category]}/${primaries[category][primary]}`)
  }
  return fullPrimaryPaths
}

init(categories)