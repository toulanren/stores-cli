const fs = require('fs')
const { exec } = require('child_process')

const { TEMPLATE_ORIGIN_NAME } = require('../../utils/const')

module.exports = ({ repo }) =>
  new Promise((resolve, reject) => {
    exec('git remote', (err, stdout, stderr) => {
      if (err) {
        reject(stderr)
        console.log(stderr)
        return
      }

      const command = [`git fetch ${TEMPLATE_ORIGIN_NAME}`]

      if (!(stdout || '').includes(TEMPLATE_ORIGIN_NAME)) {
        command.unshift(`git remote add ${TEMPLATE_ORIGIN_NAME} ${repo}`)
      }

      exec(command.join(` && `), (err, stdout, stderr) => {
        if (err) {
          reject(stderr)
          console.log(stderr)
          return
        }

        resolve()
      })
    })
  })
