import { combineReducers } from 'redux'
import stations from './stations'
import station from './station'
import stationsView from './stationsView'
import routes from './routes'
import geolocation from './geolocation'

export default combineReducers({
  stations,
  station,
  stationsView,
  geolocation,
  routes
})
