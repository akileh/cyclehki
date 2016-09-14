import { SET_MAIN_PAGE } from '../actions/mainPage'

const defaultState = 'stationsList'

export default function mainPage(state = defaultState, action) {
  if (action.type === SET_MAIN_PAGE) {
    return action.state
  }
  else {
    return state
  }
}
