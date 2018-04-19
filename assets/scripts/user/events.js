const userUi = require('./ui')
const userApi = require('./api')
const getFormFields = require('../../../lib/get-form-fields')
const jobsApi = require('../jobs/api')

const userHandlers = function () {
  $('#my-profile-link').on('click', (event) => {
    onGetUserProfile(event)
    onGetUserPostedJobs(event)
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
  console.log('update event called')
  event.preventDefault()
  const data = getFormFields(event.target)
  userApi.updateUser(data)
  .then(userUi.onUpdateUserSuccess)
  .catch(userUi.onUpdateUserError)
}

module.exports = {
  userHandlers
}
