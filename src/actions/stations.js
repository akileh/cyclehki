import fetch from '../fetch'

export const GET_STATIONS = 'GET_STATIONS'
export const GET_STATIONS_SUCCESS = 'GET_STATIONS_SUCCESS'
export const GET_STATIONS_ERROR = 'GET_STATIONS_ERROR'
export const WATCH_STATIONS = 'WATCH_STATIONS'
export const WATCH_STATIONS_SUCCESS = 'WATCH_STATIONS_SUCCESS'
export const WATCH_STATIONS_ERROR = 'WATCH_STATIONS_ERROR'
export const STOP_WATCHING_STATIONS = 'STOP_WATCHING_STATIONS'

const queryAll = `
{
  bikeRentalStations {
    stationId
    name
    bikesAvailable
    spacesAvailable
    lat
    lon
    allowDropoff
  }
}
`

let watchInterval

function fetchStations() {
  return fetch(queryAll)
    .then(res => res.json())
    .then(res => {
      if (res && res.data && Array.isArray(res.data.bikeRentalStations)) {
        return res.data.bikeRentalStations
      }
      else {
        throw new Error('failed to parse bikeRentalStations')
      }
    })
}

export function getStations() {
  return dispatch => {
    dispatch({ type: GET_STATIONS })
    return fetchStations()
      .then(stations => {
        dispatch({
          type: GET_STATIONS_SUCCESS,
          state: stations
        })
      })
      .catch(error => {
        console.warn(error) // eslint-disable-line no-console
        dispatch({
          type: GET_STATIONS_ERROR,
          error
        })
      })
  }
}

export function watchStations() {
  return dispatch => {
    dispatch({
      type: WATCH_STATIONS
    })
    getStations()(dispatch)
    clearInterval(watchInterval)
    watchInterval = setInterval(() => {
      fetchStations()
        .then(stations => dispatch({
          type: WATCH_STATIONS_SUCCESS,
          state: stations
        }))
        .catch(error => {
          console.warn(error) // eslint-disable-line no-console
          dispatch({
            type: WATCH_STATIONS_ERROR,
            error
          })
        })
    }, 10000)
  }
}

export function stopWatchingStations() {
  clearInterval(watchInterval)
  return {
    type: STOP_WATCHING_STATIONS
  }
}

export const TOGGLE_FILTER = 'TOGGLE_FILTER'
export const FILTER_BIKES = 'FILTER_BIKES'
export const FILTER_SPACES = 'FILTER_SPACES'

export function toggleFilter() {
  return {
    type: TOGGLE_FILTER
  }
}

export const TOGGLE_TYPE = 'TOGGLE_TYPE'
export const TYPE_LIST = 'TYPE_LIST'
export const TYPE_MAP = 'TYPE_MAP'

export function toggleType() {
  return {
    type: TOGGLE_TYPE
  }
}
