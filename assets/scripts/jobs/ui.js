const jobBoardTemplate = require('../templates/job-board.hbs')
const Handlebars = require('handlebars')

const onGetJobsSuccess = function (response) {
  console.log(response.jobs)
  console.log(Handlebars)
  const jobBoard = jobBoardTemplate({ jobs: response.jobs })
  $('#jobBoard tbody').append(jobBoard)
}

module.exports = {
  onGetJobsSuccess
}
