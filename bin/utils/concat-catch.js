module.exports = function (fn) {
  return fn.then((data) => [null, data]).catch((error) => [error, null])
}
