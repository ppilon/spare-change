const notification = function (status, message, div) {
  const notificationElement = '#' + div
  $(notificationElement).html('')
  const successHTML = '<div class="alert alert-success alert-dismissible" role="alert">' +
  '<button type="button" class="close" data-dismiss="alert" aria-label="Close">' +
  '<span aria-hidden="true">&times;</span></button>' + message + '</div>'

  const errorHTML = '<div class="alert alert-danger alert-dismissible" role="alert">' +
  '<button type="button" class="close" data-dismiss="alert" aria-label="Close">' +
  '<span aria-hidden="true">&times;</span></button>' + message + '</div>'

  if (status === 'success') {
    $(notificationElement).append(successHTML)
  } else {
    $(notificationElement).append(errorHTML)
  }
}

const removeAllNotifications = function () {
  $(notificationElement).html('')
}

module.exports = notification
