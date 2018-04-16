const store = require('../store')
const config = require('../config')

const getJobs = function() {
  return $.ajax({
    method: 'GET',
    url: config.apiUrl + '/jobs'
  })
}

module.exports = {
  getJobs
}
