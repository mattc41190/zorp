const getScore = (_path, type, category, subcategory) => {
  switch (type) {
    case 'orphan':
      return -10
    case 'untracked':
      return 10
    default:
      return 20 + calculateHealthScore(_path, category, subcategory)
  }
}

const calculateHealthScore = (_path, category, subcategory) => {
  total = 80

  // TODO: Read rules for items at: category[subcategory]

  return total
}

module.exports = getScore