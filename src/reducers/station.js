import {
  GET_STATION,
  GET_STATION_SUCCESS,
  GET_STATION_ERROR,
  WATCH_STATION,
  WATCH_STATION_SUCCESS,
  WATCH_STATION_ERROR
} from '../actions/station'

const defaultState = {
  data: null,
  updated: 0
}

export default function stations(state = defaultState, action) {
  switch (action.type) {
    case GET_STATION:
    case WATCH_STATION:
      if (state.data && state.data.length > 0) {
        return state
      }
      else {
        return Object.assign({}, state, {
          loading: true,
          error: false
        })
      }
    case GET_STATION_SUCCESS:
    case WATCH_STATION_SUCCESS:
      return {
        data: action.state,
        updated: Date.now()
      }
    case GET_STATION_ERROR:
    case WATCH_STATION_ERROR:
      return Object.assign({}, state, {
        loading: false,
        error: action.error
      })
    default:
      return state
  }
}
