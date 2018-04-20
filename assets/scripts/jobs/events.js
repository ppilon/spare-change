const jobsUi = require('./ui')
const jobsApi = require('./api')
const getFormFields = require('../../../lib/get-form-fields')
const store = require('../store')

let timeout = null;

let directionsDisplay;

const latlngs = {
	'pickup_latlng': [],
	'dropoff_latlng': []
}


const jobHandlers = function () {
  $('#new-job-link').on('click', jobsUi.showCreateJobView)
	$('#create-job-form').on('submit', onCreateJob)
	$('#jobs-link').on('click', jobsUi.showJobsView)
	$('body').on('click', '.edit-job', onGetJob)
	$('body').on('submit', '#edit-job-form', onUpdateJob)
  $('#create-job-view').on('keydown', 'input', (event) => {
		setTimeout(function(){
			const inputName = $(event.target).attr('name')
			if(inputName === 'job[pickup_address]' || inputName === 'job[dropoff_address]' ) {
				const pickup_address = $('[name="job[pickup_address]"]').val()
				const dropoff_address = $('[name="job[dropoff_address]"]').val()
				if(pickup_address && dropoff_address) {
					if(inputName === 'job[pickup_address]') {
						store.newJobAddresses.pickup_address = pickup_address
						getDirections(pickup_address, store.newJobAddresses.dropoff_address)
						.then(jobsUi.displayDirections)
						.then(calculateDistance)
						.then(calculateCost)
						.then(jobsUi.displayJobCost)
						.catch(jobsUi.onGetDirectionsError)
					}
					else {
						store.newJobAddresses.dropoff_address = dropoff_address
						console.log("pickup address", store.newJobAddresses.pickup_address)
						console.log("dropoff address", dropoff_address)
						getDirections(store.newJobAddresses.pickup_address, dropoff_address)
						.then(jobsUi.displayDirections)
						.then(calculateDistance)
						.then(calculateCost)
						.then(jobsUi.displayJobCost)
						.catch(jobsUi.onGetDirectionsError)
					}
				}
				else if(pickup_address) {
					store.newJobAddresses.pickup_address = pickup_address
				}
				else if(dropoff_address) {
					store.newJobAddresses.dropoff_address = dropoff_address
				}
			}
		}, 300);
  })
}

const onUpdateJob = function (event) {
	event.preventDefault()
	const data = getFormFields(event.target)
	jobsApi.updateJob(data)
		.then(jobsUi.onUpdateJobSuccess)
		.catch(jobsUi.onUpdateJobError)
}

const onGetJob = function (event) {
	const jobId = $(this).parent().siblings().first().text()
	jobsApi.getJob(jobId)
	.then(jobsUi.onGetJobSuccess)
}

const calculateCost = function (distanceObject) {
	let numOfMiles = distanceObject.rows[0].elements[0].distance.text.split(" ")[0]
	let cost = numOfMiles * 0.535;
	return cost.toFixed(2)
}

const getDirections = function(origin, destination) {
  return new Promise(function(resolve, reject) {
    const directionsService = new google.maps.DirectionsService();

    const request = {
      origin,
      destination,
      travelMode: 'DRIVING'
    }
		console.log(request)
    directionsService.route(request, function(response, status) {
      if (status === 'OK') {
				resolve(response)
      }
      else {
				reject(response)
      }
    })
  })
}

const calculateDistance = function (directions) {
	console.log(directions)
	return new Promise(function(resolve, reject) {
		const service = new google.maps.DistanceMatrixService
		service.getDistanceMatrix({
			origins: [directions.request.origin.query],
			destinations: [directions.request.destination.query],
			travelMode: 'DRIVING',
			unitSystem: google.maps.UnitSystem.IMPERIAL
		}, function(response, status) {
			if (status === 'OK') {
				resolve(response)
			} else {
				reject(status)
			}
		})
	})
}

const onGetJobs = function () {
  jobsApi.getJobs()
    .then(jobsUi.onGetJobsSuccess)
}

const onGetPendingJobs = function () {
  jobsApi.getPendingJobs()
    .then(jobsUi.onGetPendingJobsSuccess)
}

const onCreateJob = function (event) {
	event.preventDefault()
	const data = getFormFields(event.target)
		console.log(data)
	data.job.cost = data.job.cost.substring(1)
  jobsApi.createJob(data)
    .then(jobsUi.onCreateJobSuccess)
    .catch(jobsUi.onCreateJobError)
}

module.exports = {
  jobHandlers,
  onGetJobs,
	onGetPendingJobs
}
