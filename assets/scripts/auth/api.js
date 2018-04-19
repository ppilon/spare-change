const store = require('../store')
const apiUrl = require('../config')

const signUp = function (data) {
  return $.ajax({
    url: apiUrl + '/sign-up',
    method: 'POST',
    data
  })
}

const logout = function () {
  return $.ajax({
    url: apiUrl + '/sign-out/',
    method: 'DELETE',
    headers: {
      contentType: 'application/json',
      Authorization: 'Token token=' + store.user.token
    }
  })
}

const signIn = function (data) {
  return $.ajax({
    url: apiUrl + '/sign-in',
    method: 'POST',
    data
  })
}

const changePassword = function (data) {
  return $.ajax({
    url: apiUrl + '/change-password',
    method: 'PATCH',
    data,
    headers: {
      contentType: 'application/json',
      Authorization: 'Token token=' + store.user.token
    }
  })
}

module.exports = {
  signUp,
  signIn,
  changePassword,
  logout
}
