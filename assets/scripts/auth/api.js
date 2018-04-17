const store = require('../store')
const apiUrl = require('../config')

const signUp = function (data) {
  return $.ajax({
    url: apiUrl + '/sign-up',
    method: 'POST',
    data
  })
}

module.exports = {
  signUp
}
