import {
  GET_GEOLOCATION,
  GET_GEOLOCATION_SUCCESS,
  GET_GEOLOCATION_ERROR,
  WATCH_GEOLOCATION,
  WATCH_GEOLOCATION_SUCCESS,
  WATCH_GEOLOCATION_ERROR
} from '../actions/geolocation'

const defaultState = {}
let lastPosition

export default function geolocation(state = defaultState, action) {
  switch (action.type) {
    case GET_GEOLOCATION:
    case WATCH_GEOLOCATION:
      // don't set loading if we already have position we can use
      if (state.position && state.position.timestamp > Date.now() - (60 * 1000)) {
        return state
      }
      else {
        return {
          loading: true,
          error: false
        }
      }
    case GET_GEOLOCATION_SUCCESS:
    case WATCH_GEOLOCATION_SUCCESS:
      lastPosition = action.state
      return { position: action.state }
    case GET_GEOLOCATION_ERROR:
    case WATCH_GEOLOCATION_ERROR:
      // ignore error if we already have up to date position
      if (lastPosition && lastPosition.timestamp > Date.now() - (60 * 1000)) {
        return state
      }
      else {
        return {
          loading: false,
          error: action.error
        }
      }
    default:
      return state
  }
}

