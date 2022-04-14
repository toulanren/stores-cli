const path = require('path')
const fs = require('fs')

let TEMPLATES = []

try {
  TEMPLATES = require(path.resolve(process.env.HOME, './.stores-cli.json'))
} catch (e) {
  e
}

module.exports = {
  TEMPLATE_ORIGIN_NAME: 'store_cli_template',
  TEMPLATE_UPDATE_NAME: 'cli_update_type',
  TEMPLATES
}
