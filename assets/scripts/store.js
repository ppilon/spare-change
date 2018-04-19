'use strict'

const store = {
  newJobAddresses: {
  }
}

if ('user' in sessionStorage) {
  const userData = JSON.parse(sessionStorage.getItem('user'))
  store.user = userData
}

module.exports = store
