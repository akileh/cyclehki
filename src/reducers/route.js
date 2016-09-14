import { Record } from 'immutable'
import {
  GET_ROUTE,
  GET_ROUTE_SUCCESS,
  GET_ROUTE_ERROR
} from '../actions/route'
import RouteRecord from '../records/route'

const defaultState = new Record({
  data: new RouteRecord(),
  loading: false,
  error: false
})()

export default function route(state = defaultState, action) {
  switch (action.type) {
    case GET_ROUTE:
      return state
        .set('loading', true)
        .set('error', false)
    case GET_ROUTE_SUCCESS:
      return state
        .set('data', new RouteRecord(action.state))
        .set('loading', false)
        .set('error', false)
    case GET_ROUTE_ERROR:
      return state
        .set('loading', false)
        .set('error', true)
    default:
      return state
  }
}
