import { Record } from 'immutable'
import I18n from 'react-native-i18n'
import {
  SET_FROM,
  SET_TO,
  SET_TYPE,
  TYPE_OWN_BIKE
} from '../actions/routeSearch'
import {
  GET_GEOLOCATION_SUCCESS,
  WATCH_GEOLOCATION_SUCCESS
} from '../actions/geolocation'
import LocationRecord from '../records/location'

const defaultState = new Record({
  from: new LocationRecord({
    name: I18n.t('myLocation'),
    myLocation: true
  }),
  to: new LocationRecord(),
  type: TYPE_OWN_BIKE
})()

export default function locations(state = defaultState, action) {
  switch (action.type) {
    case SET_FROM:
      return state.set('from', new LocationRecord(action.state))
    case SET_TO:
      return state.set('to', new LocationRecord(action.state))
    case SET_TYPE:
      return state.set('type', action.state)
    case GET_GEOLOCATION_SUCCESS:
    case WATCH_GEOLOCATION_SUCCESS:
      if (state.from.myLocation || state.to.myLocation) {
        const target = state.from.myLocation ? 'from' : 'to'
        return state
          .updateIn([target, 'latitude'], () => action.state.coords.latitude)
          .updateIn([target, 'longitude'], () => action.state.coords.longitude)
      }
      else {
        return state
      }
    default:
      return state
  }
}
