const expect = require('chai').expect
const mock = require('mock-fs')
const mocks = require('./fixtures/get-dirs/get-dirs.mocks')
const getDirs = require('../app/get-dirs')

describe('#getDirs', () => {
  it('adds floating files to orphans array', () => {
    mock(mocks.orphansOnly)
    let dirsReport = getDirs('__path__/__orphansOnly__', 'fake')
    mock.restore()
    expect(dirsReport.orphans.length).to.be.above(0)
  })

  it('adds folders without a tags file to dirs array', () => {
    mock(mocks.untrackedOnly)
    let dirsReport = getDirs('__topic__', 'fake')
    mock.restore()
    expect(dirsReport['__sub-topic__'].dirs.length).to.be.above(0)
  })

  it('adds folders with a tags file to dirs array', () => {
    mock(mocks.trackedOnly)
    let dirsReport = getDirs('__topic__', 'fake')
    mock.restore()
    expect(dirsReport['__sub-topic__'].dirs.length).to.be.above(0)
  })

  it('adds files at project level to files array', () => {
    mock(mocks.fileAtProjectLevel)
    let dirsReport = getDirs('__topic__', 'fake')
    mock.restore()
    expect(dirsReport['__sub-topic__'].files.length).to.be.above(0)
  })
})
