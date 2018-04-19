const expect = require('chai').expect
const getScore = require('../app/get-score.js')

describe('#getScore', () => {
  
  it('returns -10 for files of type orphan', () => {
    const score = getScore('', 'orphan', null, null)
    expect(score).to.equal(-10)
  })
  
  it('returns 10 for files of type untracked', () => {
    const score = getScore('', 'untracked', null, null)
    expect(score).to.equal(10)
  })
  
  it('returns 100 for files of type tracked that have no reductions', () => {
    const score = getScore('', 'tracked', null, null)
    expect(score).to.equal(100)
  })

})
