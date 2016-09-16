import { Record, List } from 'immutable'
import {
  GET_LOCATION_HISTORY,
  GET_LOCATION_HISTORY_SUCCESS,
  GET_LOCATION_HISTORY_ERROR
} from '../actions/locationHistory'
import LocationRecord from '../records/location'

const defaultState = new Record({
  data: new List(LocationRecord),
  loading: false,
  error: false
})()

export default function locations(state = defaultState, action) {
  switch (action.type) {
    case GET_LOCATION_HISTORY:
      return state
        .set('data', new List(LocationRecord))
        .set('loading', true)
        .set('error', false)
    case GET_LOCATION_HISTORY_SUCCESS:
      return state
        .set('data', new List(action.state.map(location => new LocationRecord(location))))
        .set('loading', false)
        .set('error', false)
    case GET_LOCATION_HISTORY_ERROR:
      return state
        .set('loading', false)
        .set('error', true)
    default:
      return state
  }
}

