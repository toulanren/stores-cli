const program = require('commander')

module.exports = function (usage) {
  program.usage(usage)
  program.parse(process.argv)
  return program.args
}
