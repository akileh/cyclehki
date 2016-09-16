import { AsyncStorage } from 'react-native'

const KEY_LOCATIONS = 'locations'

export function addLocationToHistory(location) {
  return AsyncStorage
    .getItem(KEY_LOCATIONS)
    .then(locations => {
      try {
        return JSON.parse(locations)
      }
      catch (e) {
        return []
      }
    })
    .then(locations => Array.isArray(locations) ? locations : [])
    .then(locations => {
      locations.unshift(location)
      return AsyncStorage.setItem(KEY_LOCATIONS, JSON.stringify(locations))
    })
    .catch(error => {
      console.error(error) // eslint-disable-line no-console
    })
}

export function getLocationHistory() {
  return AsyncStorage
    .getItem(KEY_LOCATIONS)
    .then(locations => {
      try {
        return JSON.parse(locations)
      }
      catch (e) {
        return []
      }
    })
    .then(locations => Array.isArray(locations) ? locations : [])
    .catch(error => {
      console.error(error) // eslint-disable-line no-console
    })
}

export function removeLocationFromHistory(location) {
  getLocationHistory()
    .then(locations => locations.filter(l => l.latitude !== location.latitude && l.longitude !== location.longitude))
    .then(locations => AsyncStorage.setItem(KEY_LOCATIONS, locations))
    .catch(error => {
      console.error(error) // eslint-disable-line no-console
    })
}
