'use strict'

const moment = require('moment')

const convertDate = (datestring) => {

  return moment(datestring).format('dddd, MMMM Do YYYY h:mm a z')
}

module.exports = convertDate
