module.exports = function (fn) {
  try {
    return Promise.resolve(fn())
  } catch (e) {
    return Promise.reject(e)
  }
}
