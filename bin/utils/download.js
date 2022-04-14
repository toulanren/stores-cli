const download = require('download-git-repo')

module.exports = function (repo, dest, opts) {
  return new Promise((resolve, reject) => {
    download(repo, dest, opts, (err) => (err ? reject(err) : resolve()))
  })
}
