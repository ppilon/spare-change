const jobBoardTemplate = require('../templates/job-board.hbs')
const Handlebars = require('handlebars')
const notification = require('../../../lib/notifications')

let newJobMap;
let directionsDisplay;

const onGetJobsSuccess = function (response) {
  const jobBoard = jobBoardTemplate({ jobs: response.jobs })
  $('#jobTable tbody').append(jobBoard)
}

const onGetPendingJobsSuccess = function (response) {
  const jobBoard = jobBoardTemplate({ jobs: response.jobs })
  $('#jobTable tbody').append(jobBoard)
}

const onCreateJobSuccess = function () {
  $('#create-job-form .error-message').remove()
  notification('success', "Successfully Created Job", 'new-job-notification')
}

const onCreateJobError = function (jqXHR) {
  $('#create-job-form .notification-area').children().remove()
  $('#create-job-form .error-message').remove()
  if(jqXHR.responseJSON) {
    console.log(jqXHR.responseJSON)
    for(const error in jqXHR.responseJSON) {
      const inputParent = $('.' + error).parent()
      console.log(inputParent)
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
  $('#create-job-view').show()
  newJobMap = new google.maps.Map(document.getElementById('createJobMap'), {
    center: {lat: -34.397, lng: 150.644},
    zoom: 8
  })
}

const displayJobCost = function (cost) {
  $('#jobCost').val('$' + cost)
}

const showJobsView = function () {
  $('#job-view').show()
  $('#create-job-view').hide()
}

const onGetDirectionsError = function (directions) {
  $('#create-job-form .error-message').remove()
  const errorParagraph = document.createElement("p")
  errorParagraph.innerHTML = 'Could not locate addresses'
  errorParagraph.className = 'error-message'
  $('#geocode-error').append(errorParagraph)
}

module.exports = {
  showJobsView,
  onGetPendingJobsSuccess,
  displayJobCost,
  onGetDirectionsError,
  displayDirections,
  showCreateJobView,
  onGetJobsSuccess,
  onCreateJobSuccess,
  onCreateJobError
}
