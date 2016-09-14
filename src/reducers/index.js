import { combineReducers } from 'redux'
import stations from './stations'
import station from './station'
import stationsView from './stationsView'
import routes from './routes'
import geolocation from './geolocation'
import locations from './locations'
import routeSearch from './routeSearch'
import route from './route'
import mainPage from './mainPage'

export default combineReducers({
  stations,
  station,
  stationsView,
  geolocation,
  routes,
  locations,
  routeSearch,
  route,
  mainPage
})
