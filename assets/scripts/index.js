'use strict'

const jobsEvents = require('./jobs/events')

$(() => {
  jobsEvents.onGetJobs()
})
