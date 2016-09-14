import { Record } from 'immutable'
import {
  SET_FILTER,
  FILTER_BIKES
} from '../actions/stations'

const defaultState = new Record({
  filter: FILTER_BIKES
})()

export default function stationsView(state = defaultState, action) {
  switch (action.type) {
    case SET_FILTER:
      return state.set('filter', action.state)
    default:
      return state
  }
}
