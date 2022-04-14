#!/usr/bin/env node

const fs = require('fs')

const inquirer = require('inquirer')
const ora = require('ora')

const { TEMPLATES } = require('../../utils/const')
const rimrafSync = require('../../utils/rimraf-sync')
const concatCatch = require('../../utils/concat-catch')
const tryCatch = require('../../utils/try-catch')
const getArgs = require('../../utils/get-args')

const createProject = require('./create-project')
const syncData = require('./sync-data')
const npmInstall = require('./npm-install')

module.exports = async function run() {
  const [folder = '.'] = getArgs('[path]')

  const [err1] = await concatCatch(tryCatch(() => fs.statSync(folder)))
  if (!err1) {
    const { next } = await inquirer.prompt([{ type: 'confirm', name: 'next', message: '当前目录已存在，将删除目录并创建项目，是否继续？' }])
    if (!next) {
      return
    }
  }

  const options = {
    folder,
    ...(await inquirer.prompt([
      { type: 'rawlist', name: 'type', message: '请选择模板类型', choices: TEMPLATES.map((i) => i.title), default: 0 },
      { type: 'input', name: 'name', message: '请输入项目名称', default: folder.split('/').pop() },
      { type: 'input', name: 'repo', message: '请输入远端库地址', default: '' },
      { type: 'rawlist', name: 'install', message: '使用哪种方式安装依赖？', choices: ['npm', 'yarn'], default: 0 }
    ]))
  }

  const spinner = ora()

  spinner.start('模板下载...')
  err1 || (await rimrafSync(folder))
  await createProject(options)
  spinner.succeed('模板下载完成')

  spinner.start('参数配置...')
  await syncData(options)
  spinner.succeed('参数配置完成')

  spinner.start('依赖安装...')
  await npmInstall(options)
  spinner.succeed('依赖安装完成')

  console.log(`\r\n项目创建完成，您可执行以下命令：\r\n`)
  console.log(`  cd ${folder}`)
  console.log('  npm run dev')
}
