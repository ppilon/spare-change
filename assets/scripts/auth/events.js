const ui = require('./ui')
const api = require('./api')
const getFormFields = require('../../../lib/get-form-fields.js')

const authEvents = function () {
  $('#signup-link').on('click', ui.openSignUpModal)
  $('#signupForm').on('submit', onSignUp)
}

const onSignUp = function (event) {
  event.preventDefault()
  const data = getFormFields(event.target)
  api.signUp(data)
  .then(ui.onSignUpSuccess)
  .catch(ui.onSignUpError)
}

module.exports = {
  authEvents
}
