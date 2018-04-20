const jobBoardTemplate = require('../templates/job-board.hbs')
const editJobTemplate = require('../templates/edit-job-form.hbs')
const Handlebars = require('handlebars')
const notification = require('../../../lib/notifications')
const jobsApi = require('./api')
const store = require('../store')
const userJobsTemplate = require('../templates/user-jobs.hbs')

let newJobMap;
let directionsDisplay;

const onGetJobsSuccess = function (response) {
  const jobBoard = jobBoardTemplate({ jobs: response.jobs })
  $('#jobTable tbody').append(jobBoard)
}

const onUpdateJobSuccess = function () {
  $('#edit-job-form .error-message').remove()
  $('#edit-job-form .modal-footer p').remove()
  const successParagraph = document.createElement("p")
  successParagraph.className = 'pull-left success'
  successParagraph.innerHTML = 'Successfully Updated Job'
  $('#edit-job-form .modal-footer').append(successParagraph)
  jobsApi.getJobs()
  .then((response) => {
    $('#edit-job-modal').modal('hide')
    $('#user-posted-jobs tbody').empty()
    const userJobs = response.jobs.filter(function (job) {
      return job.user.id === store.user.id
    })
    const jobBoard = userJobsTemplate({ jobs: userJobs })
    $('#user-posted-jobs tbody').append(jobBoard)
  })
}

const onUpdateJobError = function (jqXHR) {
  $('#edit-job-form .modal-footer p').remove()
  $('#edit-job-form .error-message').remove()
  if(jqXHR.responseJSON) {
    for(const error in jqXHR.responseJSON) {
      const inputParent = $('.' + error).parent()
      const errorParagraph = document.createElement("p")
      errorParagraph.className = 'error-message'
      errorParagraph.innerHTML = error + ' ' + jqXHR.responseJSON[error]
      $(inputParent).append(errorParagraph)
    }
  }
}

const onGetPendingJobsSuccess = function (response) {
  const jobBoard = jobBoardTemplate({ jobs: response.jobs })
  $('#jobTable tbody').append(jobBoard)
}

const onGetJobSuccess = function (response) {
  $('#edit-job-modal-content').empty()
  const jobForm = editJobTemplate({ job: response.job })
  $('#edit-job-modal-content').append(jobForm)
  $('#edit-job-modal').modal('show')
}

const onDeleteJobSuccess = function () {
  jobsApi.getJobs()
    .then((response) => {
      $('#user-posted-jobs tbody').empty()
      const userJobs = response.jobs.filter(function (job) {
        return job.user.id === store.user.id
      })
      const jobBoard = userJobsTemplate({ jobs: userJobs })
      $('#user-posted-jobs tbody').append(jobBoard)
    })
  $('#header-notification .error-message').remove()
  notification('success', "Successfully Deleted Job", 'header-notification')
}

const onCreateJobSuccess = function () {
  const createJobForm = document.getElementById('create-job-form')
  createJobForm.reset()
  $('#create-job-form .error-message').remove()
  notification('success', "Successfully Created Job", 'new-job-notification')
}

const onCreateJobError = function (jqXHR) {
  $('#create-job-form .notification-area').children().remove()
  $('#create-job-form .error-message').remove()
  if(jqXHR.responseJSON) {
    for(const error in jqXHR.responseJSON) {
      const inputParent = $('.' + error).parent()
      const errorParagraph = document.createElement("p")
      errorParagraph.className = 'error-message'
      errorParagraph.innerHTML = error + ' ' + jqXHR.responseJSON[error]
      $(inputParent).append(errorParagraph)
    }
  }
}

const displayDirections = function (directions) {
  $('#geocode-error .error-message').remove()
  const rendererOptions = {
    map: newJobMap
  }
  if(!directionsDisplay) {
    directionsDisplay = new google.maps.DirectionsRenderer(rendererOptions)
  }
  directionsDisplay.set('directions', null)
  directionsDisplay.setDirections(directions)
  return directions
}

const showCreateJobView = function () {
  $('#job-view').hide()
  $('#user-profile-view').hide()
  $('#create-job-view').show()
  newJobMap = new google.maps.Map(document.getElementById('createJobMap'), {
    center: {lat: -34.397, lng: 150.644},
    zoom: 8
  })
}

const displayJobCost = function (cost) {
  $('#jobCost').val('$' + cost)
}

const onGetNonUserJobsSuccess = function (response) {
  $('#non-user-jobs tbody').empty()
  const nonUserJobs = response.jobs.filter(function (job) {
    return job.user.id !== store.user.id
  })
  const jobBoard = jobBoardTemplate({ jobs: nonUserJobs })
  $('#non-user-jobs tbody').append(jobBoard)
}

const showJobsView = function () {
  $('#job-view').show()
  $('#create-job-view').hide()
  $('#user-profile-view').hide()
}

const onGetDirectionsError = function () {
  $('#create-job-form .error-message').remove()
  const errorParagraph = document.createElement("p")
  errorParagraph.innerHTML = 'Could not locate addresses'
  errorParagraph.className = 'error-message'
  $('#geocode-error').append(errorParagraph)
}

module.exports = {
  onGetNonUserJobsSuccess,
  onUpdateJobSuccess,
  onUpdateJobError,
  onGetJobSuccess,
  showJobsView,
  onGetPendingJobsSuccess,
  displayJobCost,
  onGetDirectionsError,
  displayDirections,
  showCreateJobView,
  onGetJobsSuccess,
  onCreateJobSuccess,
  onCreateJobError,
  onDeleteJobSuccess
}
