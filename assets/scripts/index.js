'use strict'

const jobsEvents = require('./jobs/events')
const authEvents = require('./auth/events')
const store = require('./store')

$(() => {
  jobsEvents.jobHandlers()
  jobsEvents.onGetPendingJobs()
  authEvents.authEvents()
  if (store.user.token != null) {
    $('.logged-in-navbar-items').show()
    $('.logged-out-navbar-items').hide()
  }
})
