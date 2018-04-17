const ui = require('./ui')
const api = require('./api')
const getFormFields = require('../../../lib/get-form-fields.js')

const authEvents = function () {
  $('#signup-link').on('click', ui.openSignUpModal)
  $('#login-link').on('click', ui.openSignInModal)
  $('#signupForm').on('submit', onSignUp)
  $('#signinForm').on('submit', onSignIn)
}

const onSignUp = function (event) {
  event.preventDefault()
  const data = getFormFields(event.target)
  api.signUp(data)
  .then(ui.onSignUpSuccess)
  .catch(ui.onSignUpError)
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
