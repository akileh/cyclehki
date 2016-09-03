import {
  TOGGLE_FILTER,
  FILTER_BIKES,
  FILTER_SPACES,
  TOGGLE_TYPE,
  TYPE_LIST,
  TYPE_MAP
} from '../actions/stations'

const defaultState = {
  filter: FILTER_BIKES,
  type: TYPE_LIST
}

export default function stationsView(state = defaultState, action) {
  switch (action.type) {
    case TOGGLE_FILTER:
      return Object.assign({}, state, {
        filter: state.filter === FILTER_BIKES ? FILTER_SPACES : FILTER_BIKES
      })
    case TOGGLE_TYPE:
      return Object.assign({}, state, {
        type: state.type === TYPE_LIST ? TYPE_MAP : TYPE_LIST
      })
    default:
      return state
  }
}
