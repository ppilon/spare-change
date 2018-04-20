const store = require('../store')
const apiUrl = require('../config')

const getJobs = function() {
  return $.ajax({
    method: 'GET',
    url: apiUrl + '/jobs'
  })
}

const getPendingJobs = function () {
  return $.ajax({
    method: 'GET',
    url: apiUrl + '/jobs?status=pending_acceptance'
  })
}

const getJob = function (jobId) {
  return $.ajax({
    method: 'GET',
    url: apiUrl + '/jobs/' + jobId
  })
}

const deleteJob = function (jobId) {
  return $.ajax({
    url: apiUrl + '/jobs/' + jobId,
    method: 'DELETE',
    headers: {
      contentType: 'application/json',
      Authorization: 'Token token=' + store.user.token
    }
  })
}

const updateJob = function (data) {
  return $.ajax({
    method: 'PATCH',
    url: apiUrl + '/jobs/' + data.job.id,
    data,
    headers: {
      contentType: 'application/json',
      Authorization: 'Token token=' + store.user.token
    }
  })
}

const createJob = function (data) {
  return $.ajax({
    method: 'POST',
    url: apiUrl + '/jobs',
    data,
    headers: {
      contentType: 'application/json',
      Authorization: 'Token token=' + store.user.token
    }
  })
}

module.exports = {
  updateJob,
  getJobs,
  getPendingJobs,
  createJob,
  deleteJob,
  getJob
}
