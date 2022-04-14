#!/usr/bin/env node

const fs = require('fs')

const ora = require('ora')

const { TEMPLATE_UPDATE_NAME, TEMPLATES } = require('../../utils/const')

const templatePull = require('./template-pull')
const templateMerge = require('./template-merge')

module.exports = async function run() {
  const package = fs.readFileSync('./package.json', 'utf-8')
  const [, type] = package.match(new RegExp(`"${TEMPLATE_UPDATE_NAME}": "(.*)",`))
  const options = TEMPLATES.find((i) => i.type === type)

  const spinner = ora()

  spinner.start('获取远端版本...')
  await templatePull(options)
  spinner.succeed('获取远端版本')

  spinner.start('同步远端版本...')
  const [err] = await templateMerge(options)
  if (err) {
    spinner.warn('远端版本存在冲突，请检查 git 暂存区处理冲突手动 merge')
  } else {
    spinner.succeed('同步远端版本完成')
  }
}
