'use strict'

const jobsEvents = require('./jobs/events')
const authEvents = require('./auth/events')
const userEvents = require('./user/events')
const store = require('./store')

$(() => {
  jobsEvents.jobHandlers()
  jobsEvents.onGetPendingJobs()
  authEvents.authEvents()
  userEvents.userHandlers()
  if (store.user.token != null) {
    $('.logged-in-navbar-items').show()
    $('.logged-out-navbar-items').hide()
    $('#logged-in-view').show()
    $('#logged-out-view').hide()
    jobsEvents.onGetNonUserJobs()
  }
})
