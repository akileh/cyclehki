import { Record, List } from 'immutable'
import {
  GET_LOCATIONS,
  GET_LOCATIONS_SUCCESS,
  GET_LOCATIONS_ERROR
} from '../actions/locations'
import {
  SET_FROM,
  SET_TO
} from '../actions/routeSearch'
import LocationRecord from '../records/location'

const defaultState = new Record({
  data: new List(LocationRecord),
  loading: false,
  error: false,
  query: ''
})()

export default function locations(state = defaultState, action) {
  switch (action.type) {
    case GET_LOCATIONS:
      return state
        .set('data', new List(LocationRecord))
        .set('query', action.state)
        .set('loading', true)
        .set('error', false)
    case GET_LOCATIONS_SUCCESS:
      return state
        .set('data', new List(action.state.map(location => new LocationRecord(location))))
        .set('loading', false)
        .set('error', false)
    case GET_LOCATIONS_ERROR:
      return state
        .set('loading', false)
        .set('error', true)
    case SET_FROM:
    case SET_TO:
      return state
        .set('query', '')
        .set('data', new List())
    default:
      return state
  }
}
