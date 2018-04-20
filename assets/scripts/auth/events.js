const ui = require('./ui')
const api = require('./api')
const getFormFields = require('../../../lib/get-form-fields.js')

const authEvents = function () {
  $('#signupModal').on('hidden.bs.modal', function () {
    const signupForm = document.getElementById('signupForm')
    signupForm.reset()
  })
  $('#signinModal').on('hidden.bs.modal', function () {
    const signinForm = document.getElementById('signinForm')
    signinForm.reset()
  })
  $('#signup-link').on('click', ui.openSignUpModal)
  $('#login-link').on('click', ui.openSignInModal)
  $('#signupForm').on('submit', onSignUp)
  $('#signinForm').on('submit', onSignIn)
  $('#change-password-link').on('click', ui.openChangePasswordModal)
  $('#change-password-form').on('submit', onChangePassword)
  $('#logout-link').on('click', onLogout)
}

const onLogout = function (event) {
  event.preventDefault()
  api.logout()
  .then(ui.onLogoutSuccess)
}

const onSignUp = function (event) {
  event.preventDefault()
  const data = getFormFields(event.target)
  api.signUp(data)
  .then(ui.onSignUpSuccess)
  .catch(ui.onSignUpError)
}

const onChangePassword = function () {
  event.preventDefault()
  const data = getFormFields(event.target)
  api.changePassword(data)
  .then(ui.onChangePasswordSuccess)
  .catch(ui.onChangePasswordError)
}

const onSignIn = function (event) {
  event.preventDefault()
  const data = getFormFields(event.target)
  api.signIn(data)
  .then(ui.onSignInSuccess)
  .catch(ui.onSignInError)
}

module.exports = {
  authEvents
}
