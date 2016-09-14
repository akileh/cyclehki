import { geocode } from '../fetch'

export const GET_LOCATIONS = 'GET_LOCATIONS'
export const GET_LOCATIONS_SUCCESS = 'GET_LOCATIONS_SUCCESS'
export const GET_LOCATIONS_ERROR = 'GET_LOCATIONS_ERROR'

function parseLocation(location) {
  return {
    name: location.properties.name,
    latitude: location.geometry.coordinates[1],
    longitude: location.geometry.coordinates[0]
  }
}

function fetchLocations(text) {
  return geocode(text)
    .then(res => res.json())
    .then(res => {
      if (res && res.features && Array.isArray(res.features)) {
        return res.features.map(parseLocation)
      }
      else {
        throw new Error('failed to parse locations')
      }
    })
}

let timeout
const delay = 500
function debounceFetchLocations(text) {
  if (timeout) {
    clearTimeout(timeout)
  }
  return (new Promise(resolve => {
    timeout = setTimeout(() => {
      fetchLocations(text)
        .then(locations => {
          resolve(locations)
        })
    }, delay)
  }))
}

export function getLocations(text) {
  return dispatch => {
    dispatch({
      type: GET_LOCATIONS,
      state: text
    })
    if (!text || text.length < 3) {
      return Promise.resolve()
    }
    else {
      return debounceFetchLocations(text)
        .then(locations => {
          dispatch({
            type: GET_LOCATIONS_SUCCESS,
            state: locations
          })
        })
        .catch(error => {
          console.warn(error) // eslint-disable-line no-console
          dispatch({
            type: GET_LOCATIONS_ERROR,
            error
          })
        })
    }
  }
}
