const { exec } = require('child_process')

module.exports = ({ folder, repo, install }) =>
  new Promise((resolve, reject) => {
    exec(
      [
        `cd ${folder}`,
        install === 'npm' ? `npm i` : 'yarn',
        `git add .`,
        `git commit -m "Initial commit"`,
        ...(repo ? [`git push`] : [])
        // init
      ].join(` && `),
      (err, stdout, stderr) => {
        if (err) {
          reject(err)
          console.log(err)
          return
        }

        resolve()
      }
    )
  })
