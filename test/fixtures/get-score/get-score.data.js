module.exports = {
  rules70: {
    containsValidType: {
      deduction: 70,
      validator: (tags) => {
        return ['software', 'hardware'].includes(tags.type)
      }
    }
  },
  rules90: {
    containsValidType: {
      deduction: 90,
      validator: (tags) => {
        return ['software', 'hardware'].includes(tags.type)
      }
    }
  }
}
