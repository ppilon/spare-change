'use strict'

const moment = require('moment')

const convertDateForDropdown = (datestring) => {

  return moment(datestring).format('YYYY-MM-DD')
}

module.exports = convertDateForDropdown
