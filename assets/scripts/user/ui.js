const notification = require('../../../lib/notifications')
const userProfileTemplate = require('../templates/user-profile.hbs')
const jobBoardTemplate = require('../templates/job-board.hbs')
const userJobsTemplate = require('../templates/user-jobs.hbs')
const store = require('../store')

const onGetUserProfileSuccess = function (response) {
  $('#user-profile-col').empty()
  $('#user-profile-view').show()
  $('#job-view').hide()
  $('#create-job-view').hide()
  const userProfile = userProfileTemplate({ user: response.user })
  $('#user-profile-col').append(userProfile)
}

const onGetUserPostedJobsSuccess = function (response) {
  $('#user-posted-jobs tbody').empty()
  const userJobs = response.jobs.filter(function (job) {
    return job.user.id === store.user.id
  })
  const jobBoard = userJobsTemplate({ jobs: userJobs })
  $('#user-posted-jobs tbody').append(jobBoard)
}

const onUpdateUserError = function (jqXHR) {
  if(jqXHR.responseJSON) {
    for(const error in jqXHR.responseJSON) {
      const inputParent = $('.' + error).parent()
      const errorParagraph = document.createElement("p")
      errorParagraph.className = 'error-message'
      errorParagraph.innerHTML = error + ' ' + jqXHR.responseJSON[error]
      $(inputParent).append(errorParagraph)
    }
  }
  notification('danger', 'Error Updating User', 'update-user-notification')
}

const onUpdateUserSuccess = function () {
  notification('success', 'Successfully Updated User', 'update-user-notification')
}


module.exports = {
  onGetUserPostedJobsSuccess,
  onUpdateUserSuccess,
  onUpdateUserError,
  onGetUserProfileSuccess
}
