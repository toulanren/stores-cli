const rimraf = require('rimraf')

module.exports = function (path) {
  return new Promise((resolve, reject) => {
    rimraf(path, (err) => (err ? reject(err) : resolve()))
  })
}
