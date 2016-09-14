import geolib from 'geolib'
import { Record, List } from 'immutable'
import {
  GET_STATIONS,
  GET_STATIONS_SUCCESS,
  GET_STATIONS_ERROR,
  WATCH_STATIONS,
  WATCH_STATIONS_SUCCESS,
  WATCH_STATIONS_ERROR
} from '../actions/stations'
import {
  GET_GEOLOCATION_SUCCESS,
  WATCH_GEOLOCATION_SUCCESS
} from '../actions/geolocation'

// TODO move
function sortStationsByDistance(unordered, position) {
  return unordered
    .map(station => {
      if (position) {
        return Object.assign({}, station, {
          distance: geolib.getDistance(
            {
              latitude: position.coords.latitude,
              longitude: position.coords.longitude
            },
            {
              latitude: station.latitude,
              longitude: station.longitude
            },
            10
          )
        })
      }
      else {
        return station
      }
    })
    .sort((a, b) => {
      if (a.distance === b.distance) {
        return a.name < b.name ? -1 : 1
      }
      else {
        return a.distance < b.distance ? -1 : 1
      }
    })
}

const defaultState = new Record({
  ordered: new List(),
  unordered: new List(),
  updated: 0,
  loading: false,
  error: false
})()

let position

export default function stations(state = defaultState, action) {
  switch (action.type) {
    case GET_STATIONS:
    case WATCH_STATIONS:
      if (!state.unordered && state.unordered.length === 0) {
        return state
          .set('loading', true)
          .set('error', false)
      }
      else {
        return state
      }
    case GET_STATIONS_SUCCESS:
    case WATCH_STATIONS_SUCCESS:
      return state
        .set('unordered', new List(action.state))
        .set('ordered', new List(sortStationsByDistance(action.state, position)))
        .set('updated', Date.now())
    case GET_STATIONS_ERROR:
    case WATCH_STATIONS_ERROR:
      return state
        .set('loading', false)
        .set('error', action.error)
    case GET_GEOLOCATION_SUCCESS:
    case WATCH_GEOLOCATION_SUCCESS:
      position = action.state
      return state
        .set('ordered', new List(sortStationsByDistance(state.ordered, position)))
    default:
      return state
  }
}
