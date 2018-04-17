'use strict'

const jobsEvents = require('./jobs/events')
const authEvents = require('./auth/events')

$(() => {
  jobsEvents.onGetJobs()
  authEvents.authEvents()
})
