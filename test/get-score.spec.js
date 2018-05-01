const expect = require('chai').expect
const mock = require('mock-fs')
const getScore = require('../lib/api/get-score')
const data = require('./fixtures/get-score/get-score.data')
const mocks = require('./fixtures/get-score/get-score.mocks')

describe('#getScore', () => {
  it('returns -10 for files of type orphan', () => {
    const score = getScore('', 'orphan', null, null, null)
    expect(score).to.equal(-10)
  })

  it('returns 10 for files of type untracked', () => {
    const score = getScore('', 'untracked', null, null, null)
    expect(score).to.equal(10)
  })

  it('returns 100 for files of type tracked that have no reductions', () => {
    const score = getScore('', 'tracked', null, null, null)
    expect(score).to.equal(100)
  })

  it('returns 30 for tracked files with a deductions value 70', () => {
    mock(mocks.trackedOnly)
    const score = getScore('__topic__/__sub-topic__/tracked-project',
      'tracked',
      '__topic__',
      '__sub-topic__',
      data.rules70
    )
    mock.restore()
    expect(score).to.equal(30)
  })

  it('returns 20 for tracked files with a deductions value that exceeds 80', () => {
    // As a rule tracked project will never be worth less than 20
    mock(mocks.trackedOnly)
    const score = getScore('__topic__/__sub-topic__/tracked-project',
      'tracked',
      '__topic__',
      '__sub-topic__',
      data.rules90
    )
    mock.restore()
    expect(score).to.equal(20)
  })
})
