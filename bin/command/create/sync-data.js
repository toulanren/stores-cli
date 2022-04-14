const fs = require('fs')

const { TEMPLATE_UPDATE_NAME, TEMPLATES } = require('../../utils/const')

function updatePackage({ folder, type, name }) {
  const template = TEMPLATES.find((i) => i.title === type)

  const filePath = `${folder}/package.json`
  const package = fs.readFileSync(filePath, 'utf-8')

  const replace = `
  "name": "${name}",
  "${TEMPLATE_UPDATE_NAME}": "${template.type}",  
`

  fs.writeFileSync(filePath, package.replace(/"name": ".*",/, replace), 'utf-8')
}

module.exports = async function (options) {
  await updatePackage(options)
}
