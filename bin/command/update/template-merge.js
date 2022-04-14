const { exec } = require('child_process')

const { TEMPLATE_ORIGIN_NAME } = require('../../utils/const')

module.exports = ({ branch }) =>
  new Promise((resolve, reject) => {
    const command = [`git merge ${TEMPLATE_ORIGIN_NAME}/${branch}`, `git remote remove ${TEMPLATE_ORIGIN_NAME}`]

    exec(command.join(` && `), (err, stdout, stderr) => {
      resolve(err ? [true, null] : [null, true])
    })
  })
