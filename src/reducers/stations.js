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
import { parseStations } from '../parseStation'

const defaultState = {
  data: [],
  updated: 0
}

let position

export default function stations(state = defaultState, action) {
  switch (action.type) {
    case GET_STATIONS:
    case WATCH_STATIONS:
      if (state.data && state.data.length > 0) {
        return state
      }
      else {
        return Object.assign({}, state, {
          loading: true,
          error: false
        })
      }
    case GET_STATIONS_SUCCESS:
    case WATCH_STATIONS_SUCCESS:
      return {
        data: parseStations(action.state, position),
        updated: Date.now()
      }
    case GET_STATIONS_ERROR:
    case WATCH_STATIONS_ERROR:
      return Object.assign({}, state, {
        loading: false,
        error: action.error
      })
    case GET_GEOLOCATION_SUCCESS:
    case WATCH_GEOLOCATION_SUCCESS:
      position = action.state
      return Object.assign({}, state, {
        data: parseStations(state.data, position)
      })
    default:
      return state
  }
}
