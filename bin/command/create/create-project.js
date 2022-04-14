const fs = require('fs')
const { exec } = require('child_process')

const { TEMPLATE_ORIGIN_NAME, TEMPLATES } = require('../../utils/const')

module.exports = ({ folder, type, repo }) =>
  new Promise((resolve, reject) => {
    const template = TEMPLATES.find((i) => i.title === type)

    fs.mkdirSync(folder)

    exec(
      [
        `cd ${folder}`,
        `git init --initial-branch=prod`,
        `git remote add ${TEMPLATE_ORIGIN_NAME} ${template.repo}`,
        `git fetch ${TEMPLATE_ORIGIN_NAME}`,
        `git merge ${TEMPLATE_ORIGIN_NAME}/${template.branch}`,
        `git remote remove ${TEMPLATE_ORIGIN_NAME}`,
        ...(repo ? [`git remote add origin ${repo}`, `git push -u origin prod`] : [])
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
