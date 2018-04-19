const mock = require('mock-fs')

const orphansOnly = {
  "__path__": {
    '__orphansOnly__': {
      'orphansOnly.md': 'I am a lonely orphan file'
    }
  }
}

const untrackedOnly = {
  "__topic__": {
    '__sub-topic__': {
      'untracked-project': {
        'index.js': 'I am not a mature project yet'
      }
    }
  }
}

const trackedOnly = {
  "__topic__": {
    '__sub-topic__': {
      'tracked-project': {
        'index.js': 'I am a very mature project',
        '.tags': 'type: code'
      }
    }
  }
}

const fileAtProjectLevel = {
  "__topic__": {
    '__sub-topic__': {
      'index.js': 'I am not a mature project yet'
    }
  }
}

module.exports = {
  orphansOnly,
  untrackedOnly,
  trackedOnly,
  fileAtProjectLevel
}