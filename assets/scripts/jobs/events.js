const jobsUi = require('./ui')
const jobsApi = require('./api')

const onGetJobs = function () {
  jobsApi.getJobs()
    .then(jobsUi.onGetJobsSuccess)
}

module.exports = {
  onGetJobs
}
