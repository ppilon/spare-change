const store = require('../store')
const apiUrl = require('../config')

const getJobs = function() {
  return $.ajax({
    method: 'GET',
    url: apiUrl + '/jobs'
  })
}

module.exports = {
  getJobs
}
