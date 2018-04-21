const desktop = '/Users/mattcale/Desktop'

module.exports = {
  development: {
    filePath: `${desktop}/Development`,
    rules: {
      containsValidType: {
        deduction: 50,
        validator: (tags) => {
          return ['software', 'hardware'].includes(tags.type)
        }
      }
    }
  },
  nutrition: {
    filePath: `${desktop}/Nutrition`
  },
  admin: {
    filePath: `${desktop}/Admin`
  },
  education: {
    filePath: `${desktop}/Education`
  }
}
