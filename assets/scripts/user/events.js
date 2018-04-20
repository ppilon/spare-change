const userUi = require('./ui')
const userApi = require('./api')
const getFormFields = require('../../../lib/get-form-fields')
const jobsApi = require('../jobs/api')
const jobsUi = require('../jobs/ui')

const userHandlers = function () {
  $('#my-profile-link').on('click', (event) => {
    onGetUserProfile(event)
    onGetUserPostedJobs(event)
  })
  $('body').on('click', '.delete-job', function() {
    const jobId = $(this).parent().siblings().first().text()
    jobsApi.deleteJob(jobId)
  		.then(jobsUi.onDeleteJobSuccess)
  })
  $('body').on('submit', '#user-profile-form', onUpdateUser)
}

const onGetUserPostedJobs = function (event) {
  event.preventDefault()
  jobsApi.getJobs()
  .then(userUi.onGetUserPostedJobsSuccess)
}

const onGetUserProfile = function () {
  userApi.getUser()
  .then(userUi.onGetUserProfileSuccess)
}

const onUpdateUser = function (event) {
  event.preventDefault()
  const data = getFormFields(event.target)
  userApi.updateUser(data)
  .then(userUi.onUpdateUserSuccess)
  .catch(userUi.onUpdateUserError)
}

module.exports = {
  userHandlers
}
