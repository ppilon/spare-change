const openSignUpModal = function () {
  $('#signupModal').modal('show')
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

const onSignUpSuccess = function (response) {
  const signupForm = document.getElementById('signupForm')
  signupForm.reset()
  $('#signupModal').modal('hide')
}

module.exports = {
  openSignUpModal,
  onSignUpSuccess,
  onSignUpError
}
