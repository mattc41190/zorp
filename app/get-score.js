const fs = require('fs')

const getScore = (_path, type, category, subcategory, rules) => {
  switch (type) {
    case 'orphan':
      return -10
    case 'untracked':
      return 10
    default:
      return 20 + calculateHealthScore(_path, category, subcategory, rules)
  }
}

const calculateHealthScore = (_path, category, subcategory, rules) => {
  let total = 80
  if (rules) {
    const tags = JSON.parse(fs.readFileSync(`${_path}/.tags`))
    for (const rule in rules) {
      let pass = rules[rule].validator(tags)
      if (!pass) {
        total -= rules[rule].deduction
        if (total <= 0) {
          return 0
        }
      }
    }
    return total
  }
  return total
}

module.exports = getScore
