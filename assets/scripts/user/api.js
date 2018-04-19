const store = require('../store')
const apiUrl = require('../config')

const getUser = function() {
  return $.ajax({
    method: 'GET',
    url: apiUrl + '/users/' + store.user.id,
    headers: {
      contentType: 'application/json',
      Authorization: 'Token token=' + store.user.token
    }
  })
}

const updateUser = function (data) {
  return $.ajax({
    method: 'PATCH',
    url: apiUrl + '/users/' + store.user.id,
    headers: {
      contentType: 'application/json',
      Authorization: 'Token token=' + store.user.token
    },
    data
  })
}

module.exports = {
  getUser,
  updateUser
}
