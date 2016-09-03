import fetch from '../fetch'

export const GET_STATION = 'GET_STATION'
export const GET_STATION_SUCCESS = 'GET_STATION_SUCCESS'
export const GET_STATION_ERROR = 'GET_STATION_ERROR'
export const WATCH_STATION = 'WATCH_STATION'
export const WATCH_STATION_SUCCESS = 'WATCH_STATION_SUCCESS'
export const WATCH_STATION_ERROR = 'WATCH_STATION_ERROR'
export const STOP_WATCHING_STATION = 'STOP_WATCHING_STATION'

const stationFiels = `
  stationId
  name
  bikesAvailable
  spacesAvailable
  lat
  lon
  allowDropoff
`
const queryOne = (id) => {
  return (
    `
    {
      bikeRentalStation(id: "${id}") {
        ${stationFiels}
      }
    }`
  )
}

let watchInterval

function fetchStation(id) {
  return fetch(queryOne(id))
    .then(res => res.json())
    .then(res => {
      if (res && res.data && res.data.bikeRentalStation) {
        return res.data.bikeRentalStation
      }
      else {
        throw new Error('failed to parse bikeRentalStation')
      }
    })
    .then(station => Object.assign(station, {
      latitude: station.lat,
      longitude: station.lon,
      spacesTotal: station.bikesAvailable + station.spacesAvailable
    }))
}

export function getStation(id) {
  return dispatch => {
    dispatch({ type: GET_STATION })
    return fetchStation(id)
      .then(station => {
        dispatch({
          type: GET_STATION_SUCCESS,
          state: station
        })
      })
      .catch(error => {
        console.warn(error) // eslint-disable-line no-console
        dispatch({
          type: GET_STATION_ERROR,
          error
        })
      })
  }
}

export function watchStation(id) {
  return dispatch => {
    dispatch({
      type: WATCH_STATION
    })
    getStation(id)(dispatch)
    clearInterval(watchInterval)
    watchInterval = setInterval(() => {
      fetchStation(id)
        .then(station => dispatch({
          type: WATCH_STATION_SUCCESS,
          state: station
        }))
        .catch(error => {
          console.warn(error) // eslint-disable-line no-console
          dispatch({
            type: WATCH_STATION_ERROR,
            error
          })
        })
    }, 10000)
  }
}

export function stopWatchingStation() {
  clearInterval(watchInterval)
  return {
    type: STOP_WATCHING_STATION
  }
}
