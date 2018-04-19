const store = require('../store')
const openSignUpModal = function () {
  $('#signupModal').modal('show')
}

const openSignInModal = function () {
  $('#signinModal').modal('show')
}

const escapeSelector = function(s){
    return s.replace( /(:|\.|\[|\])/g, "\\$1" )
}

const onSignUpError = function (jqXHR, textStatus, errorThrown) {
  $('.error-message').remove()
  if(jqXHR.responseJSON) {
    for(const error in jqXHR.responseJSON) {
      const inputParent = $(escapeSelector('#' + error)).parent()
      const errorParagraph = document.createElement("p")
      const sanitizedName = error.match(/\.(.*)/)

      if(sanitizedName) {
        errorParagraph.className = 'error-message'
        errorParagraph.innerHTML = sanitizedName[1] + ' ' + jqXHR.responseJSON[error]
      }
      else {
        errorParagraph.className = 'error-message'
        errorParagraph.innerHTML = error + ' ' + jqXHR.responseJSON[error]
      }
      $(inputParent).append(errorParagraph)
    }
  }
}

const resetSignInForm = function () {
  const signupForm = document.getElementById('signinForm')
  signupForm.reset()
}

const onSignInSuccess = function (response) {
  $('#sign-in-error-message').hide()
  $('#signinModal').modal('hide')
  $('.logged-in-navbar-items').show()
  $('.logged-out-navbar-items').hide()
  resetSignInForm()
  store.user = response.user
  sessionStorage.setItem('user', JSON.stringify(store.user))
}

const onSignInError = function () {
  $('#sign-in-error-message').show()
}

const onSignUpSuccess = function (response) {
  $('#signupModal').modal('hide')
}

const onChangePasswordSuccess = function () {
  $('#change-password-status').empty()
  $('#change-password-status').css('color', 'green')
  $('#change-password-status').append('Password Change Successful')
}
const onChangePasswordError = function () {
  $('#change-password-status').empty()
  $('#change-password-status').css('color', 'red')
  $('#change-password-status').append('Password Change NOT Successful')
}

const openChangePasswordModal = function () {
  $('#change-password-modal').modal('show')
}

module.exports = {
  openChangePasswordModal,
  openSignUpModal,
  openSignInModal,
  onSignUpSuccess,
  onSignUpError,
  onSignInError,
  onSignInSuccess,
  onChangePasswordSuccess,
  onChangePasswordError
}
