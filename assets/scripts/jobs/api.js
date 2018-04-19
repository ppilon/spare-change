const store = require('../store')
const apiUrl = require('../config')

const getJobs = function() {
  return $.ajax({
    method: 'GET',
    url: apiUrl + '/jobs'
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
  getJobs,
  createJob
}
