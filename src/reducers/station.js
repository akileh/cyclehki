import { Record } from 'immutable'
import {
  GET_STATION,
  GET_STATION_SUCCESS,
  GET_STATION_ERROR,
  WATCH_STATION,
  WATCH_STATION_SUCCESS,
  WATCH_STATION_ERROR
} from '../actions/station'
import StationRecord from '../records/station'

const defaultState = new Record({
  data: new StationRecord(),
  loading: true,
  error: false
})()

export default function stations(state = defaultState, action) {
  switch (action.type) {
    case GET_STATION:
    case WATCH_STATION:
      // don't set loading if we already have data to show
      if (state.get('data').stationId === state) {
        return state.set('error', false)
      }
      else {
        return state
          .set('data', new StationRecord())
          .set('loading', true)
          .set('error', false)
      }
    case GET_STATION_SUCCESS:
    case WATCH_STATION_SUCCESS:
      return state
        .mergeIn(['data'], new StationRecord(action.state))
        .set('loading', false)
        .set('error', false)
    case GET_STATION_ERROR:
    case WATCH_STATION_ERROR:
      return state
        .set('loading', false)
        .set('error', action.error)
    default:
      return state
  }
}
